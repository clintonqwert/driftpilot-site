import "server-only";

import { sendToCrm } from "@/lib/crm";

interface LeadDelivery {
  /** Log prefix, e.g. "contact" or "early-access". */
  tag: string;
  /** The env var holding this funnel's webhook — kept separate per funnel (§9). */
  webhookEnv: "CRM_WEBHOOK_URL" | "AUTOMOTIVE_WEBHOOK_URL";
  payload: Record<string, unknown>;
}

/**
 * Hands a lead to its webhook. Returns false only when the lead is genuinely
 * unaccounted for, so the caller tells the visitor instead of confirming
 * something that never arrived (ai-context/06-backlog.md, item 1 — the shape
 * Riflessi's submit-booking.ts already uses).
 *
 * On failure the full lead is written to the server log, so it can still be
 * recovered by hand while the logs are kept.
 *
 * TODO(backlog item 3): a durable fallback (the smallest being a fallback
 * email) so a failed lead survives beyond the log's retention.
 */
export async function deliverLead({ tag, webhookEnv, payload }: LeadDelivery): Promise<boolean> {
  const webhookUrl = process.env[webhookEnv];

  if (webhookUrl) {
    if (await sendToCrm(webhookUrl, payload)) return true;
    console.error(`[${tag}] webhook delivery failed after retries; lead:`, JSON.stringify(payload));
    return false;
  }

  if (process.env.NODE_ENV === "production") {
    // Misconfigured production: every lead would vanish, so fail loud instead.
    console.error(`[${tag}] ${webhookEnv} is not set — lead NOT delivered; lead:`, JSON.stringify(payload));
    return false;
  }

  // Local development without a webhook: keep the lead readable and let the
  // happy path work end to end. (Vercel previews build with NODE_ENV set to
  // "production", so a preview without a webhook fails loud like production.)
  console.warn(`[${tag}] ${webhookEnv} not set (non-production); lead:`, JSON.stringify(payload));
  return true;
}
