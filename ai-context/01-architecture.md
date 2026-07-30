# Driftpilot architecture

- Next.js App Router, React, TypeScript strict mode, Tailwind CSS v4, and Vercel.
- Routes compose components and obtain content only through typed async accessors in `src/lib/content/`.
- `src/types/content.ts` is the content contract between data and presentation.
- CMS support is intentionally stubbed behind compatible accessors in `src/lib/cms/`; it is not active.
- Lead forms use React Server Actions, Zod validation, spam controls, and `src/lib/crm.ts` webhook delivery.
- Metadata and JSON-LD are centralized in `src/lib/seo.ts`.

Read `AGENTS.md` and the relevant bundled Next.js documentation before modifying framework APIs.
