"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { sendToCrm } from "@/lib/crm";
import { BUDGET_OPTIONS, type FormResult } from "@/types/forms";

/** Minimum ms between form render and submit — bots fill instantly. */
const MIN_TIME_TO_SUBMIT_MS = 3000;

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
  const isSpam =
    Boolean(honeypot) ||
    !Number.isFinite(startedAt) ||
    Date.now() - startedAt < MIN_TIME_TO_SUBMIT_MS;

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company") || undefined,
    budget: formData.get("budget"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0] ?? "form");
      errors[field] ??= issue.message;
    }
    return { ok: false, errors };
  }

  if (!isSpam) {
    const webhookUrl = process.env.CRM_WEBHOOK_URL;
    if (webhookUrl) {
      // Disqualification is invisible — tag it, route it, same success path.
      const tags =
        parsed.data.budget === "under-5k" ? ["disqualified-budget"] : [];
      const delivered = await sendToCrm(webhookUrl, {
        ...parsed.data,
        tags,
        source: "contact-form",
        submittedAt: new Date().toISOString(),
      });
      if (!delivered) {
        console.error("[contact] CRM delivery failed; lead logged above");
      }
    } else {
      console.error("[contact] CRM_WEBHOOK_URL not set; lead not delivered");
    }
  }

  redirect("/thank-you");
}
