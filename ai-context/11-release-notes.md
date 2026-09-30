# Driftpilot release notes

## 2026-09-30 — Brand logo and favicon

- The nav, mobile drawer and footer show the DP lockup instead of the text "Driftpilot". It is an inline SVG traced from the brand sheet, so it is sharp at any size and needs no extra request.
- New favicon set from the brand sheet's DP mark: `icon.svg`, a 16/32/48 `favicon.ico` (2.4 KB, down from the 26 KB Next.js default) and a 180px `apple-icon.png`.
- The social share card shows the lockup in place of the green uppercase wordmark.
- The Organization JSON-LD on `/` and `/about` gains a `logo`.
- The open mobile drawer now covers the sticky header instead of sitting under it.
- No change to content, routes, CTAs or lead delivery.

## 2026-09-27 — Leads are never confirmed unless they arrive

- The contact and early-access forms now tell the visitor when delivery fails, with an email link carrying their answers, instead of showing the thank-you page. This works with and without JavaScript.
- Every answer, including the contact form's budget, stays filled in after a failed send or a validation error, so pressing Send again works. Before, the budget went back to "Select a range…" whenever JavaScript was on.
- A lead that fails to deliver is posted in full to Slack `#driftpilot-alerts` (`SLACK_ALERT_WEBHOOK_URL`), after the visitor's response, so someone knows and can reply.
- The CRM client makes up to 3 attempts with a 400 ms doubling backoff and an 8 s timeout per attempt, all within a 10 s deadline, so a hung webhook can't keep the visitor waiting longer than that. It no longer retries a 4xx. It asks the webhook for JSON and treats a redirect as a failure, so a rejected Formspree submission can't pass as delivered.
- The first test runner: Vitest, 48 tests over the lead pipeline, run in CI.
- No change to routes, content, the success path, or funnel isolation.

## 2026-07-30 — AI context baseline

- Added a concise project charter, architecture, roadmap, standards, and supporting context for AI-assisted work.
- Replaced the `CLAUDE.md` pointer with a real entrypoint: working rules, the `ai-context/` reading order, and the binding role contract for `.claude/skills/`.
- No product behavior, public content, configuration, or dependency changed.
