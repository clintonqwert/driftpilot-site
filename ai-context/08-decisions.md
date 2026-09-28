# Driftpilot decision log

## 2026-07-30 — Establish AI context baseline

**Decision:** Add a fact-based `ai-context/` layer derived from the current repository and `docs/project-analysis.md`.

**Reason:** Give Claude Code and reviewers a concise, current source of project intent without treating AI-generated assumptions as code truth.

**Consequence:** Significant future product or architecture changes must update the relevant context file.

## 2026-09-27 — A failed lead delivery is reported, never confirmed

**Decision:** Port Riflessi's lead-delivery handling. `deliverLead()` returns `false` when a lead is unaccounted for, and the action returns a form error with a pre-filled email link instead of redirecting to `/thank-you`. `crm.ts` takes Riflessi's client: 3 attempts, 400 ms doubling backoff, an 8 s timeout, and retries only for 5xx, 429 and network failures.

**Reason:** A failed delivery used to show the thank-you page, and the lead was gone without anyone knowing.

**Consequence:**
- On failure the full lead is written to the server log, so it can be recovered while the logs are kept. That sits inside the privacy page's 24-month retention.
- Durable storage (backlog item 3) is still open.
- The time-to-submit gate still lets a *missing* stamp through, on purpose: these forms are progressively enhanced and post without JavaScript, where the stamp is never set. Riflessi treats a missing stamp as spam only because its form has no no-JS path.
