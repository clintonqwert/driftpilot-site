"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { sendToCrm } from "@/lib/crm";
import { type EarlyAccessFormResult, type EarlyAccessFormValues } from "@/types/forms";

const MIN_TIME_TO_SUBMIT_MS = 3000;

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
    const webhookUrl = process.env.AUTOMOTIVE_WEBHOOK_URL;
    if (webhookUrl) {
      const delivered = await sendToCrm(webhookUrl, {
        ...parsed.data,
        source: "drive-early-access",
        submittedAt: new Date().toISOString(),
      });
      if (!delivered) {
        console.error("[early-access] delivery failed; lead logged above");
      }
    } else {
      console.error(
        "[early-access] AUTOMOTIVE_WEBHOOK_URL not set; lead not delivered",
      );
    }
  }

  redirect("/thank-you");
}
