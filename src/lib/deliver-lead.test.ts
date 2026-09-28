import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
vi.mock("@/lib/crm", () => ({ sendToCrm: vi.fn() }));
vi.mock("@/lib/alert", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/lib/alert")>()),
  sendAlert: vi.fn(),
}));
// after() needs a request scope; run the callback straight away instead.
vi.mock("next/server", () => ({ after: vi.fn((task: () => unknown) => task()) }));

import { after } from "next/server";
import { sendAlert } from "@/lib/alert";
import { sendToCrm } from "@/lib/crm";
import { deliverLead } from "@/lib/deliver-lead";

const send = vi.mocked(sendToCrm);
const alert = vi.mocked(sendAlert);
const lead = { name: "Alex", email: "alex@company.com", message: "<!channel> call me" };

describe("deliverLead", () => {
  let error: ReturnType<typeof vi.spyOn>;
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    send.mockReset();
    alert.mockReset().mockResolvedValue(true);
    vi.mocked(after).mockClear();
    error = vi.spyOn(console, "error").mockImplementation(() => {});
    warn = vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("delivers to the funnel's own webhook, and raises no alert", async () => {
    vi.stubEnv("CRM_WEBHOOK_URL", "https://crm.example.test/contact");
    vi.stubEnv("AUTOMOTIVE_WEBHOOK_URL", "https://crm.example.test/drive");
    send.mockResolvedValue(true);

    await expect(
      deliverLead({ tag: "early-access", webhookEnv: "AUTOMOTIVE_WEBHOOK_URL", payload: lead }),
    ).resolves.toBe(true);

    // Funnel isolation (handoff doc §9): the automotive list, never the studio's.
    expect(send).toHaveBeenCalledWith("https://crm.example.test/drive", lead);
    expect(alert).not.toHaveBeenCalled();
  });

  it("reports failure, and logs the whole lead so it can be recovered", async () => {
    vi.stubEnv("CRM_WEBHOOK_URL", "https://crm.example.test/contact");
    send.mockResolvedValue(false);

    await expect(deliverLead({ tag: "contact", webhookEnv: "CRM_WEBHOOK_URL", payload: lead })).resolves.toBe(false);

    expect(error).toHaveBeenCalledWith(expect.stringContaining("[contact] lead NOT delivered"), JSON.stringify(lead));
  });

  it("sends the whole lead to Slack after the response, escaped, when delivery fails", async () => {
    vi.stubEnv("CRM_WEBHOOK_URL", "https://crm.example.test/contact");
    vi.stubEnv("VERCEL_ENV", "production");
    send.mockResolvedValue(false);

    await deliverLead({ tag: "contact", webhookEnv: "CRM_WEBHOOK_URL", payload: lead });

    // Scheduled with after(), so the visitor never waits on Slack.
    expect(after).toHaveBeenCalledTimes(1);
    const text = alert.mock.calls[0][0];
    expect(text).toContain("Lead NOT delivered");
    expect(text).toContain("contact");
    expect(text).toContain("production");
    expect(text).toContain("the CRM_WEBHOOK_URL webhook did not accept it");
    // The Slack message is the record to follow up from: every field is there.
    expect(text).toContain("alex@company.com");
    // Visitor input cannot ping the channel.
    expect(text).toContain("&lt;!channel&gt; call me");
    expect(text).not.toContain("<!channel>");
  });

  it("fails loud in production when the webhook is not configured, and alerts", async () => {
    vi.stubEnv("CRM_WEBHOOK_URL", "");
    vi.stubEnv("NODE_ENV", "production");

    await expect(deliverLead({ tag: "contact", webhookEnv: "CRM_WEBHOOK_URL", payload: lead })).resolves.toBe(false);

    expect(send).not.toHaveBeenCalled();
    expect(error).toHaveBeenCalledWith(expect.stringContaining("NOT delivered"), JSON.stringify(lead));
    expect(alert).toHaveBeenCalledWith(expect.stringContaining("CRM_WEBHOOK_URL is not set"));
  });

  it("lets local development through without a webhook, keeping the lead readable", async () => {
    vi.stubEnv("CRM_WEBHOOK_URL", "");
    vi.stubEnv("NODE_ENV", "development");

    await expect(deliverLead({ tag: "contact", webhookEnv: "CRM_WEBHOOK_URL", payload: lead })).resolves.toBe(true);

    expect(send).not.toHaveBeenCalled();
    expect(alert).not.toHaveBeenCalled();
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("non-production"), JSON.stringify(lead));
  });
});
