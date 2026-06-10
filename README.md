# Driftpilot

AI-powered web development agency site. Next.js 16 (App Router) · TypeScript ·
Tailwind CSS v4 · Vercel. The site itself is the proof of capability:
Lighthouse 95+, LCP < 1.5s.

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in what you need; everything is optional in dev
npm run dev                  # http://localhost:3000
```

```bash
npm run lint        # ESLint
npm run typecheck   # next typegen + tsc --noEmit
npm run build       # production build (all routes static in Phase 1)
```

## Architecture in one paragraph

`src/app/` does routing and data fetching only; `src/components/` is
presentation-only and never fetches; `src/lib/content/` is the Phase 1
"database" of typed TS modules exposed **only** through async accessor
functions. In Phase 2 those accessors are re-implemented in `src/lib/cms/`
against WPGraphQL with identical signatures — pages and components don't
change. In Phase 3 (AWS), Server Actions in `src/lib/actions/` change their
POST target from CRM webhooks to API Gateway → SQS — forms don't change.
Types in `src/types/` are the contract all three phases build against.

## Structure

```
src/
├── app/          # Routes only — pages compose components, fetch via accessors
├── components/   # layout/ sections/ forms/ shared/ ui/ — see src/components/README.md
├── lib/
│   ├── content/  # Phase 1 typed content + accessor functions (the swap contract)
│   ├── cms/      # Phase 2 WPGraphQL client/queries/adapters (stubs)
│   ├── actions/  # Server Actions (contact + early-access → CRM)
│   ├── crm.ts    # Webhook client with retry
│   ├── seo.ts    # buildMetadata + JSON-LD builders
│   └── utils.ts  # cn()
└── types/        # Domain contracts: content, forms, component variants
```

## Planning docs (read before building)

- `driftpilot-strategy.md` — business context and conversion logic
- `driftpilot-sitemap.md` — page inventory, conversion paths, linking rules
- `driftpilot-homepage-spec.md` — section-by-section homepage spec
- `driftpilot-component-inventory.md` — component props and behaviour
- `driftpilot-design-system.md` — tokens, colors, type, spacing (Tailwind v4)
- `driftpilot-developer-handoff.md` — the binding engineering reference

## Deployment

`main` auto-deploys to production on Vercel; every PR gets a preview URL
(previews are staging — there is no staging branch).

**Rollback runbook:** Vercel dashboard → Deployments → ⋯ on a previous
deployment → Promote to Production.
