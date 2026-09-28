import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
// redirect() throws a framework control-flow error; stand in with a readable one.
vi.mock("next/navigation", () => ({
  redirect: vi.fn((url: string) => {
    throw new Error(`NEXT_REDIRECT ${url}`);
  }),
}));
vi.mock("@/lib/deliver-lead", () => ({ deliverLead: vi.fn() }));

import { redirect } from "next/navigation";
import { deliverLead } from "@/lib/deliver-lead";
import { submitContact } from "@/lib/actions/submit-contact";

const deliver = vi.mocked(deliverLead);

const valid = {
  name: "Alex Johnson",
  email: "alex@company.com",
  company: "Acme Inc.",
  budget: "15k-50k",
  message: "We need a new site for our service business.",
};

function form(fields: Record<string, string> = {}, { startedAgoMs = 5000 } = {}): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries({ ...valid, website: "", startedAt: String(Date.now() - startedAgoMs), ...fields })) {
    data.set(key, value);
  }
  return data;
}

describe("submitContact", () => {
  beforeEach(() => {
    deliver.mockReset();
    vi.mocked(redirect).mockClear();
  });

  it("delivers a valid lead to the CRM webhook, then confirms", async () => {
    deliver.mockResolvedValue(true);

    await expect(submitContact(null, form())).rejects.toThrow("NEXT_REDIRECT /thank-you");

    expect(deliver).toHaveBeenCalledWith({
      tag: "contact",
      webhookEnv: "CRM_WEBHOOK_URL",
      payload: expect.objectContaining({
        name: valid.name,
        email: valid.email,
        budget: valid.budget,
        source: "contact-form",
        tags: [],
      }),
    });
  });

  it("tags an under-$5k budget but still takes the normal success path", async () => {
    deliver.mockResolvedValue(true);

    await expect(submitContact(null, form({ budget: "under-5k" }))).rejects.toThrow("NEXT_REDIRECT /thank-you");

    expect(deliver.mock.calls[0][0].payload).toMatchObject({ tags: ["disqualified-budget"] });
  });

  it("never reports success when delivery fails: it says so and keeps the answers", async () => {
    deliver.mockResolvedValue(false);

    const result = await submitContact(null, form());

    expect(redirect).not.toHaveBeenCalled();
    expect(result).toEqual({
      ok: false,
      errors: { form: expect.stringContaining("could not be sent") },
      values: valid,
    });
  });

  it("returns per-field errors and echoes the values when validation fails", async () => {
    const result = await submitContact(null, form({ email: "not-an-email", message: "short" }));

    expect(deliver).not.toHaveBeenCalled();
    expect(result).toMatchObject({
      ok: false,
      errors: { email: expect.any(String), message: expect.any(String) },
      values: { email: "not-an-email", message: "short" },
    });
    expect(result && !result.ok && result.errors.form).toBeFalsy();
  });

  it("silently drops a filled honeypot on the normal success path", async () => {
    await expect(submitContact(null, form({ website: "https://spam.example" }))).rejects.toThrow(
      "NEXT_REDIRECT /thank-you",
    );
    expect(deliver).not.toHaveBeenCalled();
  });

  it("silently drops a submission made faster than a person could type", async () => {
    await expect(submitContact(null, form({}, { startedAgoMs: 500 }))).rejects.toThrow("NEXT_REDIRECT /thank-you");
    expect(deliver).not.toHaveBeenCalled();
  });

  it("lets a submission with no time stamp through, because the form also works without JavaScript", async () => {
    // The stamp is set by an effect after hydration, and the form is
    // progressively enhanced (it renders $ACTION_KEY and posts without JS), so
    // a no-JS visitor sends no stamp. Number(null) is 0, which passes the gate.
    // Riflessi treats a missing stamp as spam, but only because its form has
    // no no-JS path; doing that here would silently drop real leads.
    deliver.mockResolvedValue(true);
    const data = form();
    data.delete("startedAt");

    await expect(submitContact(null, data)).rejects.toThrow("NEXT_REDIRECT /thank-you");
    expect(deliver).toHaveBeenCalledTimes(1);
  });
});
