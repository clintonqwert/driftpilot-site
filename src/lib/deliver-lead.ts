import "server-only";

import { after } from "next/server";
import { escapeSlackText, sendAlert } from "@/lib/alert";
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
 * Call it from a Server Action: a failure schedules its Slack alert with
 * after(), which needs a request scope.
 */
export async function deliverLead({ tag, webhookEnv, payload }: LeadDelivery): Promise<boolean> {
  const webhookUrl = process.env[webhookEnv];

  if (webhookUrl) {
    if (await sendToCrm(webhookUrl, payload)) return true;
    // The [crm] log lines just above hold the status and attempt count.
    return reportUndelivered(tag, `the ${webhookEnv} webhook did not accept it`, payload);
  }

  if (process.env.NODE_ENV === "production") {
    // Misconfigured production: every lead would vanish, so fail loud instead.
    return reportUndelivered(tag, `${webhookEnv} is not set`, payload);
  }

  // Local development without a webhook: keep the lead readable and let the
  // happy path work end to end. (Vercel previews build with NODE_ENV set to
  // "production", so a preview without a webhook fails loud like production.)
  console.warn(`[${tag}] ${webhookEnv} not set (non-production); lead:`, JSON.stringify(payload));
  return true;
}

/**
 * Records a lead that didn't arrive in two places:
 * - the server log, which Vercel keeps for 1 hour on Hobby and 1 day on Pro;
 * - a Slack alert carrying the whole lead. That message is the record to
 *   follow up from.
 *
 * The alert runs after the response, so the visitor sees the error and the
 * email link without waiting on Slack.
 */
function reportUndelivered(tag: string, reason: string, payload: Record<string, unknown>): false {
  console.error(`[${tag}] lead NOT delivered (${reason}); lead:`, JSON.stringify(payload));

  const environment = process.env.VERCEL_ENV ?? process.env.NODE_ENV;
  const text = [
    `:rotating_light: *Lead NOT delivered* · ${tag} · ${environment}`,
    `Reason: ${reason}.`,
    "The visitor saw the error and the email link. Follow up from the details below.",
    "```",
    escapeSlackText(JSON.stringify(payload, null, 2)),
    "```",
  ].join("\n");
  after(() => sendAlert(text));

  return false;
}
