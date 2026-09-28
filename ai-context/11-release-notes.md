# Driftpilot release notes

## 2026-09-27 — Leads are never confirmed unless they arrive

- The contact and early-access forms now tell the visitor when delivery fails, with an email link carrying their answers, instead of showing the thank-you page. This works with and without JavaScript.
- A lead that fails to deliver is posted in full to Slack `#driftpilot-alerts` (`SLACK_ALERT_WEBHOOK_URL`), after the visitor's response, so someone knows and can reply.
- The CRM client makes 3 attempts with a 400 ms doubling backoff and an 8 s timeout, and no longer retries a 4xx. It asks the webhook for JSON and treats a redirect as a failure, so a rejected Formspree submission can't pass as delivered.
- The first test runner: Vitest, 46 tests over the lead pipeline, run in CI.
- No change to routes, content, the success path, or funnel isolation.

## 2026-07-30 — AI context baseline

- Added a concise project charter, architecture, roadmap, standards, and supporting context for AI-assisted work.
- Replaced the `CLAUDE.md` pointer with a real entrypoint: working rules, the `ai-context/` reading order, and the binding role contract for `.claude/skills/`.
- No product behavior, public content, configuration, or dependency changed.
