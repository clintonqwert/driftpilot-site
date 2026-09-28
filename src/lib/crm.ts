import "server-only";

/**
 * CRM webhook client (handoff doc §9).
 *
 * Phase 1: direct POST to a CRM webhook with retry.
 * Phase 3: this becomes a POST to API Gateway → SQS (§13.3) — callers
 * (the Server Actions) keep the same interface.
 *
 * Ported from Riflessi's client (ai-context/06-backlog.md, item 2). The
 * previous version made two attempts with no backoff and no timeout, and
 * replayed every failure — including 4xx, which can never succeed.
 */

export const MAX_ATTEMPTS = 3;
/** First backoff step; doubles each retry (400ms, 800ms). */
export const BASE_BACKOFF_MS = 400;
/** A hung webhook must not hold the Server Action open indefinitely. */
export const REQUEST_TIMEOUT_MS = 8000;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * A 3xx or 4xx means this request will never succeed — the URL, auth, or
 * payload shape is wrong, or the endpoint wants a browser rather than an API
 * call. Replaying it just burns the caller's time. Only transient conditions
 * (5xx, 429, network/timeout) are worth another attempt.
 */
export function isRetryableStatus(status: number): boolean {
  return status >= 500 || status === 429;
}

export async function sendToCrm(
  webhookUrl: string,
  payload: Record<string, unknown>,
): Promise<boolean> {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    let retryable = true; // network/timeout failures fall through as retryable

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        // Formspree (the live webhook) answers with JSON and a real status only
        // when asked; otherwise it redirects to an HTML page.
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        // Following a redirect would report the landing page's status — a 200
        // error page would read as a delivery. Only the webhook's own answer
        // counts, so a redirect comes back as a non-retryable 3xx.
        redirect: "manual",
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
      if (res.ok) return true;

      retryable = isRetryableStatus(res.status);
      console.error(
        `[crm] webhook responded ${res.status} (attempt ${attempt}/${MAX_ATTEMPTS}, ${
          retryable ? "retryable" : "not retryable"
        })`,
      );
    } catch (error) {
      console.error(
        `[crm] webhook request failed (attempt ${attempt}/${MAX_ATTEMPTS})`,
        error,
      );
    }

    if (!retryable) return false;
    if (attempt < MAX_ATTEMPTS) {
      await wait(BASE_BACKOFF_MS * 2 ** (attempt - 1));
    }
  }

  // The caller owns the fallback: deliverLead() logs the lead and the action
  // tells the visitor, rather than confirming something that never arrived.
  return false;
}
