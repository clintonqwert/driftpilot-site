# Driftpilot AI guidelines

1. Read this directory, `AGENTS.md`, and the relevant source before proposing changes.
2. Treat the repository and deployed behavior as ground truth; never infer client claims or implementation details.
3. Preserve the content-accessor contract and server/client boundaries.
4. Work through the roles in `.claude/skills/`, not ad-hoc: `builder` is the only role that edits code; `reviewer`, `tester`, `auditor`, and `content-strategist` report independently and never write files. Every non-trivial PR gets `reviewer`; conversion-path, public-claim, and performance changes also get `tester` and `auditor`. Technical SEO belongs to `auditor` and content SEO to `content-strategist` — do not add a separate SEO role.
5. Do not make changes to pricing, public claims, legal content, funnel routing, environment variables, or deployment settings without owner approval.
6. Document accepted material decisions in `08-decisions.md` and completed milestones in `11-release-notes.md`.
