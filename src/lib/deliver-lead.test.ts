import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
vi.mock("@/lib/crm", () => ({ sendToCrm: vi.fn() }));

import { sendToCrm } from "@/lib/crm";
import { deliverLead } from "@/lib/deliver-lead";

const send = vi.mocked(sendToCrm);
const lead = { name: "Alex", email: "alex@company.com" };

describe("deliverLead", () => {
  let error: ReturnType<typeof vi.spyOn>;
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    send.mockReset();
    error = vi.spyOn(console, "error").mockImplementation(() => {});
    warn = vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("delivers to the funnel's own webhook", async () => {
    vi.stubEnv("CRM_WEBHOOK_URL", "https://crm.example.test/contact");
    vi.stubEnv("AUTOMOTIVE_WEBHOOK_URL", "https://crm.example.test/drive");
    send.mockResolvedValue(true);

    await expect(
      deliverLead({ tag: "early-access", webhookEnv: "AUTOMOTIVE_WEBHOOK_URL", payload: lead }),
    ).resolves.toBe(true);

    // Funnel isolation (handoff doc §9): the automotive list, never the studio's.
    expect(send).toHaveBeenCalledWith("https://crm.example.test/drive", lead);
  });

  it("reports failure, and logs the whole lead so it can be recovered", async () => {
    vi.stubEnv("CRM_WEBHOOK_URL", "https://crm.example.test/contact");
    send.mockResolvedValue(false);

    await expect(deliverLead({ tag: "contact", webhookEnv: "CRM_WEBHOOK_URL", payload: lead })).resolves.toBe(false);

    expect(error).toHaveBeenCalledWith(expect.stringContaining("[contact]"), JSON.stringify(lead));
  });

  it("fails loud in production when the webhook is not configured", async () => {
    vi.stubEnv("CRM_WEBHOOK_URL", "");
    vi.stubEnv("NODE_ENV", "production");

    await expect(deliverLead({ tag: "contact", webhookEnv: "CRM_WEBHOOK_URL", payload: lead })).resolves.toBe(false);

    expect(send).not.toHaveBeenCalled();
    expect(error).toHaveBeenCalledWith(expect.stringContaining("NOT delivered"), JSON.stringify(lead));
  });

  it("lets local development through without a webhook, keeping the lead readable", async () => {
    vi.stubEnv("CRM_WEBHOOK_URL", "");
    vi.stubEnv("NODE_ENV", "development");

    await expect(deliverLead({ tag: "contact", webhookEnv: "CRM_WEBHOOK_URL", payload: lead })).resolves.toBe(true);

    expect(send).not.toHaveBeenCalled();
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("non-production"), JSON.stringify(lead));
  });
});
