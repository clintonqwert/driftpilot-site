"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { deliverLead } from "@/lib/deliver-lead";
import { type EarlyAccessFormResult, type EarlyAccessFormValues } from "@/types/forms";

const MIN_TIME_TO_SUBMIT_MS = 3000;

/** Shown when the sign-up could not be delivered (see submit-contact.ts). */
const DELIVERY_FAILED_MESSAGE =
  "Your request could not be sent. It didn't reach our early-access list, so you're not on it yet.";

const earlyAccessSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.email("Please enter a valid email address."),
  dealership: z.string().trim().optional(),
});

/**
 * Driftpilot Drive early-access capture. Posts to a SEPARATE webhook/list
 * (AUTOMOTIVE_WEBHOOK_URL) — the automotive funnel isolation rule applies
 * at the data layer too (handoff doc §9). Never merge with submitContact.
 */
export async function submitEarlyAccess(
  _prevState: EarlyAccessFormResult | null,
  formData: FormData,
): Promise<EarlyAccessFormResult> {
  const honeypot = formData.get("website");
  const startedAt = Number(formData.get("startedAt"));
  // A missing stamp is Number(null) === 0, which passes: the form also posts
  // without JavaScript, where the stamp is never set, and those are real
  // visitors. Only a stamp that parses to nothing (NaN) or is too recent fails.
  const isSpam =
    Boolean(honeypot) ||
    !Number.isFinite(startedAt) ||
    Date.now() - startedAt < MIN_TIME_TO_SUBMIT_MS;

  const submittedValues: EarlyAccessFormValues = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    dealership: String(formData.get("dealership") ?? ""),
  };

  const parsed = earlyAccessSchema.safeParse({
    name: submittedValues.name,
    email: submittedValues.email,
    dealership: formData.get("dealership") || undefined,
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0] ?? "form");
      errors[field] ??= issue.message;
    }
    return { ok: false, errors, values: submittedValues };
  }

  if (!isSpam) {
    const delivered = await deliverLead({
      tag: "early-access",
      webhookEnv: "AUTOMOTIVE_WEBHOOK_URL",
      payload: {
        ...parsed.data,
        source: "drive-early-access",
        submittedAt: new Date().toISOString(),
      },
    });
    // Never confirm a sign-up that didn't arrive: say so, and keep the answers.
    if (!delivered) {
      return { ok: false, errors: { form: DELIVERY_FAILED_MESSAGE }, values: submittedValues };
    }
  }

  redirect("/thank-you");
}
