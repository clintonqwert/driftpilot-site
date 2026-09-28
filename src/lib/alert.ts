import "server-only";

/**
 * Operational alerts to Slack (#driftpilot-alerts) through an incoming
 * webhook. That URL can post to one channel and nothing else, so it is the
 * narrowest credential that does the job.
 *
 * Best effort by design: one attempt, bounded by a timeout, and it never
 * throws — an alert must not change what the visitor sees. Callers keep
 * their own log line as the backup record.
 */

/** Slack answers in well under a second; don't hold the function open for a hung one. */
export const ALERT_TIMEOUT_MS = 5000;

/**
 * Slack reads `&`, `<` and `>` as control characters: `<!channel>` pings
 * everyone and `<url|text>` renders a link. Escape anything a visitor typed
 * so it shows exactly as written.
 */
export function escapeSlackText(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Posts `text` (Slack mrkdwn) to the alerts channel. Returns whether it arrived. */
export async function sendAlert(text: string): Promise<boolean> {
  const webhookUrl = process.env.SLACK_ALERT_WEBHOOK_URL;

  if (!webhookUrl) {
    if (process.env.NODE_ENV === "production") {
      console.error("[alert] SLACK_ALERT_WEBHOOK_URL is not set — alert not sent");
    }
    return false;
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
      signal: AbortSignal.timeout(ALERT_TIMEOUT_MS),
    });
    if (res.ok) return true;
    console.error(`[alert] Slack responded ${res.status} — alert not sent`);
  } catch (error) {
    console.error("[alert] Slack request failed — alert not sent", error);
  }
  return false;
}
