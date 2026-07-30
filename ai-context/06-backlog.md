# Driftpilot backlog

## Protect leads

- Backport Riflessi's `src/lib/crm.ts` hardening: exponential backoff, `AbortSignal.timeout`, and a retryable-status check so 4xx responses are not replayed.
- Add a durable fallback for failed CRM webhook delivery (the `TODO(phase 1)` in `src/lib/crm.ts`).
- Add focused tests for validation, spam handling, and CRM retry behavior — no test runner is installed yet.

## Improve discovery and credibility

- Create local SEO location pages.
- Add route-specific Open Graph images where the return is worthwhile.
- Replace temporary imagery with verified client proof and assets.

## Maintainability

- Enforce or generate the mirrored design tokens.
- Add a scoped Content-Security-Policy.
- Review duplicated UI patterns before adding further variants.
