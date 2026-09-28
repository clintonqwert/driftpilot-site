import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
vi.mock("next/navigation", () => ({
  redirect: vi.fn((url: string) => {
    throw new Error(`NEXT_REDIRECT ${url}`);
  }),
}));
vi.mock("@/lib/deliver-lead", () => ({ deliverLead: vi.fn() }));

import { redirect } from "next/navigation";
import { deliverLead } from "@/lib/deliver-lead";
import { submitEarlyAccess } from "@/lib/actions/submit-early-access";

const deliver = vi.mocked(deliverLead);

const valid = { name: "Sam Lee", email: "sam@dealership.com", dealership: "Metro Auto Group" };

function form(fields: Record<string, string> = {}, { startedAgoMs = 5000 } = {}): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries({ ...valid, website: "", startedAt: String(Date.now() - startedAgoMs), ...fields })) {
    data.set(key, value);
  }
  return data;
}

describe("submitEarlyAccess", () => {
  beforeEach(() => {
    deliver.mockReset();
    vi.mocked(redirect).mockClear();
  });

  it("delivers to the automotive list, kept apart from the studio's CRM", async () => {
    deliver.mockResolvedValue(true);

    await expect(submitEarlyAccess(null, form())).rejects.toThrow("NEXT_REDIRECT /thank-you");

    expect(deliver).toHaveBeenCalledWith({
      tag: "early-access",
      webhookEnv: "AUTOMOTIVE_WEBHOOK_URL",
      payload: expect.objectContaining({ ...valid, source: "drive-early-access" }),
    });
  });

  it("never reports success when delivery fails: it says so and keeps the answers", async () => {
    deliver.mockResolvedValue(false);

    const result = await submitEarlyAccess(null, form());

    expect(redirect).not.toHaveBeenCalled();
    expect(result).toEqual({
      ok: false,
      errors: { form: expect.stringContaining("could not be sent") },
      values: valid,
    });
  });

  it("returns per-field errors when validation fails", async () => {
    const result = await submitEarlyAccess(null, form({ name: "A" }));

    expect(deliver).not.toHaveBeenCalled();
    expect(result).toMatchObject({ ok: false, errors: { name: expect.any(String) } });
  });

  it("silently drops spam on the normal success path", async () => {
    await expect(submitEarlyAccess(null, form({ website: "x" }))).rejects.toThrow("NEXT_REDIRECT /thank-you");
    await expect(submitEarlyAccess(null, form({}, { startedAgoMs: 100 }))).rejects.toThrow("NEXT_REDIRECT /thank-you");
    expect(deliver).not.toHaveBeenCalled();
  });
});
