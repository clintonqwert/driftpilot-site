@AGENTS.md

# Driftpilot — Claude Code instructions

Read `ai-context/` and `docs/project-analysis.md` before planning material work. The repository is the technical source of truth; `ai-context/` records agreed product and engineering context.

## Working rules

- Preserve the static-first Next.js App Router architecture and the typed content-accessor layering in `src/lib/content/`.
- Keep components presentational — routes obtain content through accessors and pass it down.
- Do not publish unverified claims, pricing, or client proof.
- Keep one primary CTA per page and preserve automotive-funnel isolation.
- Reuse the existing token, content, SEO, and component systems before adding alternatives; `src/app/globals.css` and `src/lib/design-tokens.ts` mirror the palette, so change both together.
- Ask before changing production configuration, legal content, lead delivery, or public business claims.
- Run `npm run lint`, `npm run typecheck` and `npm test` before handoff.
- Record accepted decisions in `ai-context/08-decisions.md` and completed milestones in `ai-context/11-release-notes.md`.

## Roles

Work goes through the roles in `.claude/skills/`. They are explicit-invocation skills — invoke them by name; they do not activate on their own.

| Role | Skill | Authority | Output |
| --- | --- | --- | --- |
| Lead engineer | `builder` | The only role that edits code. One branch, one PR per task. | Working change and verification summary |
| Staff reviewer | `reviewer` | Review-only | P0/P1/P2 findings posted to the PR |
| QA engineer | `tester` | Review-only | PASS/FAIL evidence per verification step |
| CTO / technical auditor | `auditor` | Review-only. Owns technical SEO, accessibility, performance, and production readiness. | Scored P0/P1/P2 report |
| Content / SEO strategist | `content-strategist` | Review-only. Owns information architecture, messaging, SEO content, and CTAs. | Paste-ready copy and structure brief |
| UI/UX reference | `ui-ux-pro-max` | Advisory | Design recommendations |

- Feature work goes through `builder`, not ad-hoc editing in a plain session.
- Every non-trivial PR gets `reviewer`. Anything touching a conversion path, public claims, or performance also gets `tester` and `auditor`.
- Only `builder` writes files. The other roles report, the owner decides, and `builder` implements the accepted findings.
- There is no separate SEO role and one must not be created: technical SEO belongs to `auditor`, content SEO to `content-strategist`.
