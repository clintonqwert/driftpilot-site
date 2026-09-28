import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { ALERT_TIMEOUT_MS, escapeSlackText, sendAlert } from "@/lib/alert";

const HOOK = "https://hooks.slack.example.test/services/T0/B0/x";

describe("escapeSlackText", () => {
  it("neutralises Slack's control characters so visitor input shows as typed", () => {
    // <!channel> would ping the whole channel; <url|text> would render a link.
    expect(escapeSlackText("<!channel> Tom & Jerry <https://x.test|click>")).toBe(
      "&lt;!channel&gt; Tom &amp; Jerry &lt;https://x.test|click&gt;",
    );
  });
});

describe("sendAlert", () => {
  const fetchMock = vi.fn();
  let error: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
    error = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("posts the text to the Slack webhook, bounded by a timeout", async () => {
    vi.stubEnv("SLACK_ALERT_WEBHOOK_URL", HOOK);
    const timeout = vi.spyOn(AbortSignal, "timeout");
    fetchMock.mockResolvedValue(new Response("ok", { status: 200 }));

    await expect(sendAlert("hello")).resolves.toBe(true);

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(HOOK);
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body)).toEqual({ text: "hello" });
    expect(timeout).toHaveBeenCalledWith(ALERT_TIMEOUT_MS);
  });

  it("reports a Slack error without throwing", async () => {
    vi.stubEnv("SLACK_ALERT_WEBHOOK_URL", HOOK);
    fetchMock.mockResolvedValue(new Response("invalid_payload", { status: 400 }));

    await expect(sendAlert("hello")).resolves.toBe(false);
    expect(error).toHaveBeenCalledWith(expect.stringContaining("400"));
  });

  it("reports a network failure without throwing", async () => {
    vi.stubEnv("SLACK_ALERT_WEBHOOK_URL", HOOK);
    fetchMock.mockRejectedValue(new TypeError("fetch failed"));

    await expect(sendAlert("hello")).resolves.toBe(false);
    expect(error).toHaveBeenCalled();
  });

  it("says so in production when the webhook is not configured", async () => {
    vi.stubEnv("SLACK_ALERT_WEBHOOK_URL", "");
    vi.stubEnv("NODE_ENV", "production");

    await expect(sendAlert("hello")).resolves.toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(error).toHaveBeenCalledWith(expect.stringContaining("SLACK_ALERT_WEBHOOK_URL"));
  });

  it("stays quiet in local development without a webhook", async () => {
    vi.stubEnv("SLACK_ALERT_WEBHOOK_URL", "");
    vi.stubEnv("NODE_ENV", "development");

    await expect(sendAlert("hello")).resolves.toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  });
});
