# Driftpilot backlog

## Protect leads — start here

**Status, 2026-09-27:** items 1, 2 and 4 are done (branch `fix/lead-delivery-failure`). Item 3 is still open: it needs an owner decision on where a failed lead goes durably, because an email provider is a new service with production secrets.

Scoped 2026-07-30. One PR covers items 1–3; they touch the same three files and splitting them leaves the repository in a half-fixed state. Riflessi is the reference implementation throughout — read its versions of these files first.

**1. A failed delivery still shows a confirmation.** (Done 2026-09-27.)

`src/lib/actions/submit-contact.ts:83` and `src/lib/actions/submit-early-access.ts` call `redirect("/thank-you")` unconditionally. When `sendToCrm` returns `false`, the failure is written to the console and the visitor is told their message arrived. On Vercel that console line is ephemeral, so the lead is gone and nobody knows.

The same applies when the webhook variable is unset — the action logs "lead not delivered" and still confirms.

Riflessi solved this in `src/lib/actions/submit-booking.ts`: `deliverLead()` returns a boolean, `false` means the lead is genuinely unaccounted for, and the caller tells the visitor to email instead of confirming. Mirror that shape. Note that Driftpilot has **two** actions and **two** webhooks (`CRM_WEBHOOK_URL`, `AUTOMOTIVE_WEBHOOK_URL`), so the helper is shared rather than copied.

**2. `src/lib/crm.ts` is behind Riflessi's.** (Done 2026-09-27.)

Ours: `MAX_ATTEMPTS = 2`, no backoff, no timeout, and every failed status is retried — including 4xx, which can never succeed on replay.

Riflessi's has `MAX_ATTEMPTS = 3`, `BASE_BACKOFF_MS = 400` doubling per retry, `AbortSignal.timeout(8000)` so a hung webhook cannot hold the Server Action open, and `isRetryableStatus()` limiting retries to 5xx and 429. Copy it; the interfaces are identical, so no caller changes.

**3. The `TODO(phase 1)` fallback.**

Once item 1 lands, the visitor knows delivery failed — but the lead itself still only exists in a log line. Decide where it goes durably. A fallback email is the smallest thing that works and needs no new infrastructure. The `sendToCrm` signature is deliberately a seam, so this stays behind it.

**4. Then tests.** (Done 2026-09-27: Vitest, run in CI.)

After 1–3, the logic worth pinning exists: Zod validation, the honeypot and `MIN_TIME_TO_SUBMIT_MS` gate, retry and backoff behavior, status classification, and the failure path. All pure functions and server actions — no browser harness. Vitest, a handful of cases. This is also what makes the backport safe to repeat.

## Improve discovery and credibility

- Create local SEO location pages.
- Add route-specific Open Graph images where the return is worthwhile.
- Replace temporary imagery with verified client proof and assets.

## Maintainability

- Enforce or generate the mirrored design tokens.
- Add a scoped Content-Security-Policy.
- Review duplicated UI patterns before adding further variants.
