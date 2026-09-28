import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import {
  BASE_BACKOFF_MS,
  DELIVERY_DEADLINE_MS,
  MAX_ATTEMPTS,
  REQUEST_TIMEOUT_MS,
  isRetryableStatus,
  sendToCrm,
} from "@/lib/crm";

const HOOK = "https://crm.example.test/hook";
const respond = (status: number) => new Response(null, { status });

/** A webhook that answers `status` after `ms` of (fake) time. */
const answerAfter = (ms: number, status: number) => () =>
  new Promise<Response>((resolve) => setTimeout(() => resolve(respond(status)), ms));

/** A webhook that never answers: the request ends only when its signal aborts. */
const hang = (_url: string, init: RequestInit) =>
  new Promise<Response>((_, reject) => {
    init.signal!.addEventListener("abort", () => reject(init.signal!.reason));
  });

/**
 * AbortSignal.timeout runs on Node's internal timers, which fake timers don't
 * control. This stand-in fires on the faked setTimeout instead.
 */
const fakeTimeoutSignals = () =>
  vi.spyOn(AbortSignal, "timeout").mockImplementation((ms) => {
    const controller = new AbortController();
    setTimeout(() => controller.abort(new DOMException("The operation timed out.", "TimeoutError")), ms);
    return controller.signal;
  });

/** Tracks whether a promise has settled, so a test can pin *when* it does. */
function track<T>(promise: Promise<T>) {
  const state = { settled: false, promise };
  promise.finally(() => (state.settled = true)).catch(() => {});
  return state;
}

describe("isRetryableStatus", () => {
  it.each([500, 502, 503, 504, 429])("retries %i", (status) => {
    expect(isRetryableStatus(status)).toBe(true);
  });
  it.each([302, 303, 400, 401, 403, 404, 422])("does not retry %i: replaying it can never succeed", (status) => {
    expect(isRetryableStatus(status)).toBe(false);
  });
});

describe("sendToCrm", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("POSTs the payload as JSON and succeeds on the first attempt", async () => {
    fetchMock.mockResolvedValue(respond(200));

    await expect(sendToCrm(HOOK, { name: "Alex" })).resolves.toBe(true);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(HOOK);
    expect(init.method).toBe("POST");
    // Formspree answers JSON only when asked; otherwise it redirects to HTML.
    expect(init.headers).toEqual({ "Content-Type": "application/json", Accept: "application/json" });
    expect(JSON.parse(init.body)).toEqual({ name: "Alex" });
  });

  it("never follows a redirect, so only the webhook's own answer counts", async () => {
    fetchMock.mockResolvedValue(respond(200));

    await sendToCrm(HOOK, {});

    expect(fetchMock.mock.calls[0][1].redirect).toBe("manual");
  });

  it("treats a redirect as a failure, not a delivery, and does not replay it", async () => {
    // A form backend that redirects instead of answering JSON has not
    // confirmed anything; following it could land on a 200 error page.
    fetchMock.mockResolvedValue(respond(302));

    const result = sendToCrm(HOOK, {});
    await vi.runAllTimersAsync();

    await expect(result).resolves.toBe(false);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("bounds every request with a timeout", async () => {
    const timeout = vi.spyOn(AbortSignal, "timeout");
    fetchMock.mockResolvedValue(respond(200));

    await sendToCrm(HOOK, {});

    expect(timeout).toHaveBeenCalledWith(REQUEST_TIMEOUT_MS);
    expect(fetchMock.mock.calls[0][1].signal).toBe(timeout.mock.results[0].value);
  });

  it(`answers within ${DELIVERY_DEADLINE_MS}ms however long the webhook hangs`, async () => {
    // Per-attempt timeouts alone kept the visitor on "Sending…" for ~25s.
    const timeout = fakeTimeoutSignals();
    fetchMock.mockImplementation(hang);

    const call = track(sendToCrm(HOOK, {}));

    await vi.advanceTimersByTimeAsync(DELIVERY_DEADLINE_MS - 1);
    expect(call.settled).toBe(false);
    await vi.advanceTimersByTimeAsync(1);
    expect(call.settled).toBe(true);
    await expect(call.promise).resolves.toBe(false);

    // A full first attempt, one backoff, then a second attempt cut to what's left.
    expect(timeout.mock.calls.map(([ms]) => ms)).toEqual([
      REQUEST_TIMEOUT_MS,
      DELIVERY_DEADLINE_MS - REQUEST_TIMEOUT_MS - BASE_BACKOFF_MS,
    ]);
  });

  it("does not wait out a backoff when the deadline leaves no time to retry", async () => {
    // 503 at 7s, backoff to 7.4s, 503 at 9.4s: 0.6s left is less than the next
    // 0.8s backoff, so there's no third attempt to wait for.
    fetchMock.mockImplementationOnce(answerAfter(7000, 503)).mockImplementationOnce(answerAfter(2000, 503));

    const call = track(sendToCrm(HOOK, {}));

    await vi.advanceTimersByTimeAsync(9399);
    expect(call.settled).toBe(false);
    await vi.advanceTimersByTimeAsync(1);
    expect(call.settled).toBe(true);
    await expect(call.promise).resolves.toBe(false);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("retries a 5xx after a doubling backoff, then succeeds", async () => {
    fetchMock
      .mockResolvedValueOnce(respond(503))
      .mockResolvedValueOnce(respond(502))
      .mockResolvedValueOnce(respond(200));

    const result = sendToCrm(HOOK, {});

    await vi.advanceTimersByTimeAsync(BASE_BACKOFF_MS - 1);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(1);
    expect(fetchMock).toHaveBeenCalledTimes(2);

    await vi.advanceTimersByTimeAsync(BASE_BACKOFF_MS * 2 - 1);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    await vi.advanceTimersByTimeAsync(1);

    await expect(result).resolves.toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it("retries a 429", async () => {
    fetchMock.mockResolvedValueOnce(respond(429)).mockResolvedValueOnce(respond(200));

    const result = sendToCrm(HOOK, {});
    await vi.runAllTimersAsync();

    await expect(result).resolves.toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("retries a network failure", async () => {
    fetchMock.mockRejectedValueOnce(new TypeError("fetch failed")).mockResolvedValueOnce(respond(200));

    const result = sendToCrm(HOOK, {});
    await vi.runAllTimersAsync();

    await expect(result).resolves.toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it(`gives up after ${MAX_ATTEMPTS} attempts when the failure persists`, async () => {
    fetchMock.mockResolvedValue(respond(500));

    const result = sendToCrm(HOOK, {});
    await vi.runAllTimersAsync();

    await expect(result).resolves.toBe(false);
    expect(fetchMock).toHaveBeenCalledTimes(MAX_ATTEMPTS);
  });

  it("stops at once on a 4xx", async () => {
    fetchMock.mockResolvedValue(respond(400));

    const result = sendToCrm(HOOK, {});
    await vi.runAllTimersAsync();

    await expect(result).resolves.toBe(false);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
