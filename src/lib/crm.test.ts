import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import {
  BASE_BACKOFF_MS,
  MAX_ATTEMPTS,
  REQUEST_TIMEOUT_MS,
  isRetryableStatus,
  sendToCrm,
} from "@/lib/crm";

const HOOK = "https://crm.example.test/hook";
const respond = (status: number) => new Response(null, { status });

describe("isRetryableStatus", () => {
  it.each([500, 502, 503, 504, 429])("retries %i", (status) => {
    expect(isRetryableStatus(status)).toBe(true);
  });
  it.each([400, 401, 403, 404, 422])("does not retry %i: replaying it can never succeed", (status) => {
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
    expect(init.headers).toEqual({ "Content-Type": "application/json" });
    expect(JSON.parse(init.body)).toEqual({ name: "Alex" });
  });

  it("bounds every request with a timeout", async () => {
    const timeout = vi.spyOn(AbortSignal, "timeout");
    fetchMock.mockResolvedValue(respond(200));

    await sendToCrm(HOOK, {});

    expect(timeout).toHaveBeenCalledWith(REQUEST_TIMEOUT_MS);
    expect(fetchMock.mock.calls[0][1].signal).toBe(timeout.mock.results[0].value);
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
