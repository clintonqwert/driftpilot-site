# Driftpilot AI guidelines

1. Read this directory, `AGENTS.md`, and the relevant source before proposing changes.
2. Treat the repository and deployed behavior as ground truth; never infer client claims or implementation details.
3. Preserve the content-accessor contract and server/client boundaries.
4. For substantial work, use the existing Claude role workflow: Builder implements; Reviewer, Tester, Auditor, and Content Strategist provide independent evidence.
5. Do not make changes to pricing, public claims, legal content, funnel routing, environment variables, or deployment settings without owner approval.
6. Document accepted material decisions in `08-decisions.md` and completed milestones in `11-release-notes.md`.
