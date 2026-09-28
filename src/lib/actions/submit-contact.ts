"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { deliverLead } from "@/lib/deliver-lead";
import { BUDGET_OPTIONS, type FormResult, type ContactFormValues } from "@/types/forms";

/** Minimum ms between form render and submit — bots fill instantly. */
const MIN_TIME_TO_SUBMIT_MS = 3000;

/**
 * Shown when the lead could not be delivered. Validation problems always come
 * back as per-field errors, so `errors.form` means exactly this — and the form
 * pairs it with an email link carrying the visitor's answers.
 */
const DELIVERY_FAILED_MESSAGE =
  "Your message could not be sent. It didn't reach our inbox, so we haven't received your inquiry yet.";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.email("Please enter a valid email address."),
  company: z.string().trim().optional(),
  budget: z.enum(BUDGET_OPTIONS, {
    error: "Please select a budget range.",
  }),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little about the project (10+ characters)."),
});

export async function submitContact(
  _prevState: FormResult | null,
  formData: FormData,
): Promise<FormResult> {
  // Spam checks (handoff doc §9): honeypot + minimum time-to-submit.
  // Spam takes the normal success path — never reveal detection.
  const honeypot = formData.get("website");
  const startedAt = Number(formData.get("startedAt"));
  // A missing stamp is Number(null) === 0, which passes: the form also posts
  // without JavaScript, where the stamp is never set, and those are real
  // visitors. Only a stamp that parses to nothing (NaN) or is too recent fails.
  const isSpam =
    Boolean(honeypot) ||
    !Number.isFinite(startedAt) ||
    Date.now() - startedAt < MIN_TIME_TO_SUBMIT_MS;

  // Capture safe-to-echo values before validation (excludes honeypot/startedAt).
  const submittedValues: ContactFormValues = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    company: String(formData.get("company") ?? ""),
    budget: String(formData.get("budget") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const parsed = contactSchema.safeParse({
    name: submittedValues.name,
    email: submittedValues.email,
    company: formData.get("company") || undefined,
    budget: submittedValues.budget,
    message: submittedValues.message,
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
    // Disqualification is invisible — tag it, route it, same success path.
    const tags = parsed.data.budget === "under-5k" ? ["disqualified-budget"] : [];
    const delivered = await deliverLead({
      tag: "contact",
      webhookEnv: "CRM_WEBHOOK_URL",
      payload: {
        ...parsed.data,
        tags,
        source: "contact-form",
        submittedAt: new Date().toISOString(),
      },
    });
    // Never confirm a lead that didn't arrive: say so, and keep the answers.
    if (!delivered) {
      return { ok: false, errors: { form: DELIVERY_FAILED_MESSAGE }, values: submittedValues };
    }
  }

  redirect("/thank-you");
}
