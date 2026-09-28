# Driftpilot — Project Analysis

**Prepared by:** Staff Software Architect review
**Date:** 2026-07-30
**Scope:** Full repository at HEAD (`9981512`, `main`) — static analysis only, no source changes made.

This document is a from-scratch architectural read of the codebase. It complements (and occasionally cross-checks) the existing maintenance docs in `docs/maintenance/` — [`ARCHITECTURE-GUARDRAILS.md`](maintenance/ARCHITECTURE-GUARDRAILS.md), [`ROADMAP.md`](maintenance/ROADMAP.md), and [`DESIGN-SYSTEM-ROADMAP.md`](maintenance/DESIGN-SYSTEM-ROADMAP.md) — rather than replacing them. Where this report and those docs agree, that agreement is itself a signal the finding is real.

---

## 1. Executive Summary

Driftpilot is a marketing website for a web-development studio, built on **Next.js 16 (App Router) + React 19 + TypeScript (strict) + Tailwind CSS v4**, fully statically prerendered (37 routes), and deployed to Vercel. It is simultaneously the company's product: the performance budget it enforces on itself (Lighthouse ≥ 95, LCP < 1.5s) is the same budget sold to clients.

**Architecturally, the standout decision is the content-swap contract**: every page fetches content through async accessor functions in `src/lib/content/*`, typed against contracts in `src/types/content.ts`. Nothing in `src/app/` or `src/components/` imports content data directly. This means Phase 2 (a headless WordPress CMS, stubbed in `src/lib/cms/`) can be dropped in behind the same function signatures without touching a single page or component — a real, working instance of the "swappable data layer" pattern many codebases claim but don't actually achieve.

**The codebase is healthy but has two structural gaps that matter more than typical technical debt:**

1. **Zero automated tests.** The lead-capture forms — the only revenue-relevant code path — have no regression protection. Every review cycle documented in git history (PR #17–#23) caught real bugs manually; none of that is codified as a test. *(Resolved 2026-09-28: Vitest covers the lead pipeline, run in CI.)*
2. **Silent lead loss on webhook failure.** `src/lib/crm.ts:35` has a `TODO` for a fallback path that doesn't exist. If the CRM webhook fails twice, the form still redirects to `/thank-you` and the lead is gone except for a `console.error` in ephemeral function logs. *(Resolved 2026-09-28: the visitor is told, and the lead is posted in full to Slack `#driftpilot-alerts`.)*

Everything else — SEO, accessibility, performance engineering, design-token discipline, funnel isolation for the automotive vertical — is well above the bar for a project this size, and in most cases better-documented than the code that implements it (the three maintenance docs are unusually candid and specific, e.g. exact CSS class names of "load-bearing" components).

---

## 2. Folder Structure

```
driftpilot-site/
├── .github/workflows/ci.yml        # lint → typecheck → build → Lighthouse CI, on every PR + push to main
├── .claude/                        # Agent role skills (builder/reviewer/tester/auditor/content-strategist) + ui-ux-pro-max toolkit
├── docs/
│   └── maintenance/                # ARCHITECTURE-GUARDRAILS.md, ROADMAP.md, DESIGN-SYSTEM-ROADMAP.md
├── public/
│   ├── logos/, og/                 # empty (.gitkeep only) — no client logos or per-route OG images yet
├── src/
│   ├── app/                        # Routes ONLY — pages compose components + fetch via accessors
│   │   ├── layout.tsx              # Root layout: fonts, NavBar, ScrollReveal, SiteFooter, Analytics, SpeedInsights
│   │   ├── globals.css             # Tailwind v4 @theme tokens, keyframes, [data-reveal] motion system
│   │   ├── page.tsx                # Home
│   │   ├── about/, careers/, contact/, pricing/, process/, privacy/, terms/, thank-you/
│   │   ├── automotive/             # + automotive/early-access/  (isolated funnel)
│   │   ├── services/               # + services/[slug]/
│   │   ├── work/                   # + work/[slug]/
│   │   ├── insights/               # + insights/[slug]/, insights/tag/[tag]/
│   │   ├── sitemap.ts, robots.ts, opengraph-image.tsx, not-found.tsx
│   │   └── favicon.ico
│   ├── components/
│   │   ├── layout/                 # NavBar (client), SiteFooter (server)
│   │   ├── home/                   # HeroSection, ShaderBackground, SocialProofBar, ServicesGrid, WhySection, ProcessSection, PortfolioSection
│   │   ├── shared/                 # PageHero, CTABand, FAQSection, JsonLd, ArticleCard, TechPill, PricingStrip, AutomotiveBanner, CalendlyEmbed, CalendlySection, ScrollReveal
│   │   ├── forms/                  # ContactForm, EarlyAccessForm (both client)
│   │   ├── ui/                     # button.ts, field.ts (class recipes), Card.tsx (unused — see §16)
│   │   ├── sections/                # empty (.gitkeep) — reserved, unused
│   │   └── README.md               # layout rules doc, enforced by convention not tooling
│   ├── lib/
│   │   ├── content/                # Phase-1 "database": services.ts, case-studies.ts, articles.ts, pricing.ts, process.ts, navigation.ts, taxonomy.ts, faq/*.ts
│   │   ├── cms/                    # Phase-2 stub: client.ts (WPGraphQL fetch wrapper), queries.ts, adapters.ts — nothing imports these yet
│   │   ├── actions/                # submit-contact.ts, submit-early-access.ts (Server Actions)
│   │   ├── crm.ts                  # Webhook client with retry (server-only)
│   │   ├── seo.ts                  # buildMetadata() + all JSON-LD builders — canonical authority
│   │   ├── design-tokens.ts        # KIVO palette — the ONLY sanctioned raw-hex consumer path
│   │   ├── format.ts, utils.ts     # formatArticleDate, cn()
│   └── types/                      # content.ts, forms.ts, components.ts — the cross-layer contracts
├── eslint.config.mjs, tsconfig.json, next.config.ts, postcss.config.mjs
├── lighthouserc.json               # perf/a11y/SEO/CWV budget definitions
└── .env.example                    # documented env inventory by phase
```

**Route count:** 37 static pages at build time (per README; consistent with the sitemap generator, which enumerates 4 services + N case studies + N articles + N tags + ~14 static routes).

**Notable absences:** no `src/hooks/`, no `src/context/`, no `middleware.ts`, no `api/` route handlers, no test directory, no `.storybook/`. This is deliberate for a Phase-1 static site — see §7 and §9.

---

## 3. Tech Stack

| Layer | Technology | Version | Notes |
|---|---|---|---|
| Framework | Next.js | 16.2.7 | App Router only; **this is a non-standard/future build — see caveat below** |
| UI library | React / React DOM | 19.2.4 | Server Components by default |
| Language | TypeScript | ^5, strict mode | `tsconfig.json`: `strict: true`, path alias `@/*` → `src/*` |
| Styling | Tailwind CSS | v4 (`@tailwindcss/postcss`) | CSS-first config via `@theme` in `globals.css`, no `tailwind.config.js` |
| Validation | Zod | ^4.4.3 | Used only in Server Actions (`z.email`, `.trim()`, `.enum()`) |
| Utility | clsx + tailwind-merge | — | Combined in `lib/utils.ts` as `cn()` |
| Motion/visual | `@paper-design/shaders-react` | ^0.0.77 | WebGL mesh-gradient hero, dynamically imported, gated (see §12) |
| Analytics | `@vercel/analytics`, `@vercel/speed-insights` | ^2.0.1 / ^2.0.0 | Cookieless, zero-config, mounted in root layout |
| CI perf tooling | `@lhci/cli` | ^0.15.1 | Lighthouse CI, 3 URLs, median of 3 runs |
| Server-only guard | `server-only` | ^0.0.1 | Imported in `crm.ts`, `cms/client.ts` |
| Lint | ESLint 9 + `eslint-config-next` | ^9 / 16.2.7 | Flat config (`eslint.config.mjs`) |
| Fonts | `next/font/google` | — | Inter (variable, `opsz` axis) + Geist Mono |
| Hosting | Vercel | — | Static prerender + preview deployments |
| Node | ≥18.17.0 declared, CI runs 22 | — | **Stale — see §16** |

**⚠️ Framework caveat:** `AGENTS.md` states this Next.js build has *breaking changes vs. training data* and instructs consulting `node_modules/next/dist/docs/` before touching any Next.js API. `next@16.2.7` and `react@19.2.4` are both ahead of any publicly documented stable release as of this environment's knowledge cutoff. Treat API assumptions (e.g. `PageProps<'/route'>` typed params seen throughout `src/app/**/page.tsx`, `next typegen` in the typecheck script) as version-specific and verify against the bundled docs before modification, not against general Next.js familiarity.

**No state-management library, no data-fetching library (SWR/React Query), no ORM/database client, no test runner, no component library, no CSS-in-JS.** The stack is intentionally minimal for a static-content marketing site.

---

## 4. Routing Architecture

Next.js **App Router** exclusively (confirmed explicitly in `about/page.tsx` FAQ copy: *"App Router exclusively... We do not take on new projects built on the legacy Pages Router"*).

### Static routes (14)
`/`, `/about`, `/careers`, `/contact`, `/pricing`, `/process`, `/privacy`, `/terms`, `/thank-you`, `/services`, `/work`, `/insights`, `/automotive`, `/automotive/early-access`

### Dynamic routes (3 segment types, statically generated via `generateStaticParams`)
| Pattern | Source | `dynamicParams` |
|---|---|---|
| `/services/[slug]` | `getAllServices()` → 4 params | default (true) |
| `/work/[slug]` | `getAllCaseStudies()` → 4 params | default (true) |
| `/insights/[slug]` | `getAllArticles()` → 3 params | default (true) |
| `/insights/tag/[tag]` | `getAllTags()` → N params | **`false`** — explicit, so unknown tags 404 instead of soft-404ing a "0 articles" page (`src/app/insights/tag/[tag]/page.tsx:12`) |

All dynamic routes call `notFound()` when the slug/tag accessor returns nothing, so 404s are real 404s, not silently-empty pages (the tag route is the one place this is enforced at the routing layer via `dynamicParams = false` rather than a runtime check).

### Special Next.js file conventions in use
- `sitemap.ts` — generates `sitemap.xml` from the same content accessors pages use (so new CMS content in Phase 2 appears automatically)
- `robots.ts` — disallows only `/thank-you`
- `opengraph-image.tsx` — one global 1200×630 OG image via `next/og`'s `ImageResponse` (no per-route images yet — flagged in maintenance docs as the top SEO gap)
- `not-found.tsx` — custom 404 with service links + CTA, never a dead end
- `layout.tsx` — single root layout; **no nested layouts** anywhere in `src/app/` (every section has a flat one-level route tree)

### Redirects
`next.config.ts` defines one permanent redirect: `/how-we-work → /process` (308), explicitly called out in `ARCHITECTURE-GUARDRAILS.md` as append-only — never remove a redirect once shipped.

### Funnel isolation as a routing rule
`/automotive*` pages never link to `/contact` — every CTA under that tree routes to `/automotive/early-access`, enforced by a grep gate in review (not by any runtime/build check). This is a **process guardrail, not a code guardrail** — see §16.

---

## 5. Component Hierarchy

```
RootLayout (app/layout.tsx)
├── <a> Skip-to-content link
├── NavBar (client)                        — sticky header, scroll-aware, mobile drawer w/ focus trap
├── ScrollReveal (client, renders null)     — global IntersectionObserver for [data-reveal]
├── #main-content
│   └── {page}
│       └── <main> (every page wraps its content in a bare <main>)
│           ├── JsonLd (0..n)               — structured data, zero client JS
│           ├── PageHero | HeroSection      — interior pages vs. home
│           └── page-specific <section>s
├── SiteFooter (server)                     — 4-column grid, renders from navigation.ts
├── Analytics (Vercel)
└── SpeedInsights (Vercel)
```

**Home page composition** (`src/app/page.tsx`) — the deepest composition in the app:
```
HomePage
├── JsonLd × 2 (organizationSchema, websiteSchema)
├── HeroSection
│   └── ShaderBackground (client, dynamic-imported MeshGradient)
├── SocialProofBar          — infinite CSS marquee, reduced-motion fallback
├── ServicesGrid            — reads getAllServices()
├── WhySection               — static 4-item list
├── ProcessSection            — static 3-phase summary (drifted from /process's 6 steps — see §16)
├── PortfolioSection          — reads getAllCaseStudies(), splits featured + grid
├── AutomotiveBanner
├── FAQSection                — reads homeFAQ
└── CTABand
```

**Detail-page pattern** (services/[slug], work/[slug], insights/[slug] all follow the same shape):
```
DetailPage
├── generateStaticParams()          — from content accessor
├── generateMetadata()              — buildMetadata() with entity-specific title/description
├── notFound() guard
├── JsonLd (entity schema + breadcrumbSchema)
├── PageHero (eyebrow/heading/subheading from entity data)
├── 2–4 content <section>s (entity-specific)
├── related content (PricingStrip, ArticleCard grid, or related case study card)
├── FAQSection (conditional)
└── CTABand
```

This repetition across 3 detail-page types is intentional consistency, not copy-paste drift — each follows `PageHero → content → cross-link → FAQ → CTABand`, which is itself a strong argument for extracting a `DetailPageShell` (not currently done — see §16/§17).

---

## 6. Shared Components

Per `src/components/README.md`, the folder taxonomy is a **hard rule, not a convention**: `layout/` (chrome), `sections/` (page sections — currently unused, reserved), `forms/`, `shared/` (cross-page fragments), `ui/` (primitives). Client-component boundary is explicitly enumerated: `"use client"` should appear **only** in NavBar, MobileDrawer (doesn't exist as a separate file — folded into NavBar), PortfolioFilter (doesn't exist — unused reservation), ContactForm, EarlyAccessForm. In practice, `ShaderBackground.tsx` and `CalendlyEmbed.tsx` are also client components, which the README doesn't enumerate — a **doc/code drift**, not a violation of intent (both are justified: WebGL and third-party iframe control both require client state).

| Component | Location | Reused on | Notes |
|---|---|---|---|
| `PageHero` | `shared/` | 10+ interior pages | eyebrow/heading/subheading, `hero-glow` fallback |
| `CTABand` | `shared/` | 10+ pages | headline/subhead/2×CTA, all props optional with sensible defaults |
| `FAQSection` | `shared/` | 6 pages | native `<details>` accordion, auto-emits `faqSchema()` JSON-LD |
| `JsonLd` | `shared/` | every page with schema | escapes `<` to prevent script-tag injection from future CMS content |
| `ArticleCard` | `shared/` | insights index, tag pages, related-articles blocks | |
| `TechPill` | `shared/` | work index, case-study detail | **duplicated** inline in `PortfolioSection.tsx` (see §16) |
| `CalendlyEmbed` / `CalendlySection` | `shared/` | `/contact` | click-to-load facade; **near-duplicate placeholder cards** (see §16) |
| `PricingStrip` | `shared/` | services index, service detail | single-row band, always points at `/pricing` |
| `AutomotiveBanner` | `shared/` | home | isolated-funnel CTA |
| `ScrollReveal` | `shared/` | root layout (once) | infrastructure, not visual |
| `buttonClasses()` | `ui/button.ts` | everywhere | class-recipe function, not a component — deliberate, so `<Link>` call sites don't need a wrapper |
| `field.ts` recipes | `ui/` | both forms | `inputBase`, `inputError`, `labelBase`, `errorText`, `errorBanner` |
| `Card` | `ui/Card.tsx` | **zero call sites** | dead code — 17 places hand-roll the same recipe instead (flagged in maintenance docs, P1-1) |

---

## 7. State Management

**There is no client-side state-management library, and almost no client-side state at all.** This is a deliberate consequence of the static-first architecture:

- **Server state:** none — no database, no runtime queries. All "data" is either build-time TS modules (`lib/content/*`) or (in Phase 2) tag-based ISR via `cmsFetch()`'s `next: { tags }` option.
- **Form state:** React 19's `useActionState` hook drives both `ContactForm` and `EarlyAccessForm` — the Server Action itself is the state machine (`FormResult | null` → pending → success redirect or validation-error re-render with echoed values). No Formik/React Hook Form/Zustand.
- **UI-local state:** `useState` in exactly two client components — `NavBar` (menu open/closed) and `ShaderBackground` (shader-visible boolean, resolved via `requestIdleCallback` + a WebGL capability probe).
- **Scroll state:** `NavBar` uses `useSyncExternalStore` (not `useState` + a scroll listener) to read `window.scrollY > 60` — the React-19-idiomatic way to subscribe to external mutable state without tearing, with a correct SSR snapshot (`getServerScrollSnapshot` returns `false`).
- **No global context, no Redux/Zustand/Jotai, no client-side caching library.** There is nothing to synchronize because there is no client-fetched data anywhere in the app.

This is the correct minimal-state choice for the current phase. The one thing to watch: **Phase 3's plan to swap Server Action POST targets (CRM webhook → API Gateway/SQS)** doesn't change this analysis — the interface (`FormResult`) stays a server-driven state machine either way, per the guardrails doc.

---

## 8. Styling System

**Tailwind CSS v4**, configured entirely in CSS via `@theme` in `src/app/globals.css` — there is no `tailwind.config.js/ts`. This is the v4-native pattern (`@import "tailwindcss"` + `@theme { --color-*: ... }`), consistent with `AGENTS.md`'s warning that tooling conventions may differ from trained expectations.

**Design token architecture ("Kivo" palette):**
- Two synchronized sources of truth that must never drift: `globals.css`'s `@theme` block (consumed by Tailwind utility classes — `bg-surface`, `text-accent`, etc.) and `src/lib/design-tokens.ts`'s `KIVO` constant (raw hex, for the two contexts Tailwind classes can't reach: `next/og` inline styles and WebGL shader uniforms).
- Semantic token names only in components (`surface`, `raised`, `overlay`, `fg`, `muted`, `accent`, `line`, `line-strong`, `danger`, `success`, `warning`) — no raw hex outside the two sanctioned consumers. This is enforced by convention/review, not lint tooling.
- A dark-only design (`color-scheme: dark` on `body`, `bg-surface text-muted` base) — there is no light theme and no theme toggle.
- Custom type scale (`--text-display` through `--text-display-xl`) layered additively on top of Tailwind's default scale, plus a Kivo base override (18px/1.4 body text vs. Tailwind's 16px default).
- Custom radii (`--radius-pill: 100px` for buttons; `xs/sm/md/lg` otherwise match Tailwind defaults, deliberately not overridden so the standard scale isn't silently repurposed).

**Motion system:**
- `[data-reveal]` scroll-entrance pattern: CSS-only hidden state gated behind `html.js` (stamped by `ScrollReveal.tsx` on mount) so no-JS visitors never see hidden content; `prefers-reduced-motion: no-preference` media guard; per-element stagger via a `--reveal-i` CSS custom property.
- `fadeUp` / `riseIn` keyframes — `riseIn` is transform-only (no opacity animation) specifically so it's safe to use on the LCP element (`h1`) without delaying paint — a documented, deliberate performance decision (`globals.css:90-92`).
- `marquee` keyframe for `SocialProofBar`'s infinite scroll, paused on hover, with a `motion-reduce` static fallback that avoids duplicate DOM in reduced-motion mode via `aria-hidden`/`.contents` tricks.

**Class composition patterns:**
- `buttonClasses()` and the `field.ts` exports are **string-returning functions, not components** — the stated reason (`button.ts:24-29`) is that most call sites are `<Link>`, and using `tailwind-merge` in `buttonClasses` would pull the merge runtime into `NavBar`'s client bundle. `Card.tsx` (a real component) does use `cn()`/`tailwind-merge`, which is consistent — it's a server component so the runtime cost is free.
- No CSS Modules, no styled-components, no CSS-in-JS. Tailwind utility classes directly in JSX throughout, occasionally combined with small conditional template-literal logic (e.g. `NavBar`'s scrolled-state classes).

---

## 9. API Architecture

**There are no traditional REST/GraphQL API routes in this codebase** (`src/app/**/route.ts` — none exist). All "API" surface is:

1. **React Server Actions** (`"use server"` files in `src/lib/actions/`) — the entire mutation surface of the app:
   - `submitContact` (`src/lib/actions/submit-contact.ts`) — Zod-validates, runs honeypot + 3-second minimum-time-to-submit spam checks, tags budget-disqualified leads (`under-5k`), hands the lead to `deliverLead()` (`src/lib/deliver-lead.ts`) for `CRM_WEBHOOK_URL`, then redirects to `/thank-you`. Spam takes the same redirect ("never reveal detection"). A delivery failure does not: the action returns a form error, and the form offers a pre-filled `mailto:` fallback. *(Updated 2026-09-28; originally the redirect happened regardless of delivery.)*
   - `submitEarlyAccess` (`src/lib/actions/submit-early-access.ts`) — same shape, POSTs to a **separate** `AUTOMOTIVE_WEBHOOK_URL`, enforcing funnel isolation at the data layer (not just the UI layer).
   - Both return a discriminated union `FormResult`/`EarlyAccessFormResult` (`{ok: true} | {ok: false, errors, values}`) consumed by `useActionState` — validation errors echo back safe-to-redisplay values (name/email/company/budget/message) excluding the honeypot and timestamp fields.

2. **Outbound webhook client** (`src/lib/crm.ts`) — `sendToCrm(url, payload)`, `server-only`-guarded, returns `boolean`. 3 attempts with a 400 ms doubling backoff and an 8 s timeout. It retries only 5xx, 429 and network errors, asks for JSON, and treats a redirect as a failure. On failure, `deliverLead()` logs the lead and posts it in full to Slack `#driftpilot-alerts` (`src/lib/alert.ts`). *(Updated 2026-09-28; this closes the "no fallback path" defect in §15/§16.)*

3. **Planned but unimplemented: `lib/cms/*`** — a full WPGraphQL client (`cmsFetch<T>()` with tag-based Next.js caching for `revalidateTag()`-driven ISR) and a query (`CASE_STUDIES_QUERY`) exist as **Phase 2 scaffolding that nothing imports**. `adapters.ts` is currently an empty module (`export {}`) with a large doc comment describing the exact shape future adapter functions must have to match `lib/content/case-studies.ts`'s signatures. No `/api/revalidate` webhook receiver exists yet despite `REVALIDATE_SECRET` being documented in `.env.example`.

4. **Planned but unimplemented: Phase 3 AWS pipeline** — `LEADS_QUEUE_URL` is documented in `.env.example` with no implementation; the stated plan is for Server Actions to swap their POST target from CRM webhook to API Gateway → SQS without changing their external interface.

**Net assessment:** this is correct minimalism for a static marketing site with two lead-capture forms — building out unused REST endpoints would be premature. The risk is entirely concentrated in `crm.ts`'s missing failure path, not in the API surface's shape.

---

## 10. Deployment Architecture

- **Host:** Vercel. `main` auto-deploys to production; every PR gets a preview URL (previews double as staging — there is no separate staging branch/environment).
- **CI pipeline** (`.github/workflows/ci.yml`, GitHub Actions, `ubuntu-latest`, Node 22):
  1. `npm ci` (frozen lockfile)
  2. `npm run lint` (ESLint)
  3. `npm run typecheck` (`next typegen && tsc --noEmit`)
  4. `npm run build` with `NEXT_PUBLIC_SITE_URL=https://driftpilot.ca` forced (build-time throw guard — see §11)
  5. `npx lhci autorun` — Lighthouse CI against the local production build (3 URLs × 3 runs, median aggregation)
  6. On failure only: upload `.lighthouseci/reports` as a build artifact (14-day retention)
- **No separate deploy step in CI** — Vercel's own GitHub integration handles the actual deployment (build/push triggers it independently of the Actions workflow, which is a pure gate).
- **Rollback:** manual, via Vercel dashboard → Deployments → *Promote to Production* on a prior deployment. No redeploy or `git revert` required — documented explicitly in README as the incident-response path.
- **Headers/redirects at the platform edge** (`next.config.ts`): `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-DNS-Prefetch-Control: on`, `poweredByHeader: false` — applied to `/(.*)`, all routes.
- **No containerization** (no Dockerfile), no IaC (no Terraform/Pulumi/CDK) — appropriate for a Vercel-native static Next.js deployment with zero backing infrastructure in Phase 1.
- **Build output:** fully static — every route prerendered at build time, confirmed by the README's "37 pages prerendered at build time" claim and the absence of any `export const dynamic = 'force-dynamic'` or runtime-only code paths in the pages reviewed.

---

## 11. Environment Variables

Fully inventoried in `.env.example` with phase annotations. All variables are optional in development; only `NEXT_PUBLIC_SITE_URL` is hard-required in production (enforced by a throw in `src/lib/seo.ts:6-10`, which only fires when `NODE_ENV === "production"` and the var is unset — this is why CI explicitly sets it for the build step).

| Variable | Phase | Purpose | Client-exposed? |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | 1 | Canonical origin for metadata/sitemap; **required in prod builds** | Yes |
| `CRM_WEBHOOK_URL` | 1 | Contact form → CRM | No (server-only) |
| `AUTOMOTIVE_WEBHOOK_URL` | 1 | Early-access form → separate list (funnel isolation) | No |
| `SLACK_ALERT_WEBHOOK_URL` | 1 | Slack `#driftpilot-alerts`: a lead that failed to deliver is posted there in full | No |
| `NEXT_PUBLIC_CALENDLY_URL` | 1 | Gates the Calendly embed; unset → zero-JS placeholder card | Yes |
| `WPGRAPHQL_ENDPOINT` | 2 | WPGraphQL fetch target (unused today) | No |
| `WPGRAPHQL_AUTH_TOKEN` | 2 | Bearer auth for the above (unused today) | No |
| `REVALIDATE_SECRET` | 2 | Would verify a WP publish webhook → `/api/revalidate` (route doesn't exist yet) | No |
| `LEADS_QUEUE_URL` | 3 | Planned SQS target (unused today) | No |

No `.env.local` is committed (correctly gitignored). Secrets are documented as living exclusively in Vercel project settings, encrypted, never in the repo. The `server-only` package import in `crm.ts` and `cms/client.ts` provides a build-time guardrail against accidentally importing server secrets into a client bundle.

---

## 12. Performance Analysis

Performance is the project's most rigorously engineered dimension — enforced, not aspirational.

**Budget (`lighthouserc.json`, gated in CI as hard errors, median of 3 runs, desktop preset):**
| Metric | Threshold |
|---|---|
| Performance score | ≥ 0.95 |
| Accessibility score | ≥ 0.98 |
| SEO score | ≥ 0.95 |
| Best Practices score | ≥ 0.90 |
| LCP | < 1500ms |
| CLS | < 0.05 |
| Total Blocking Time | < 150ms |
| Script payload | < 260 kB |

**Coverage gap:** only 3 URLs are gated (`/`, `/pricing`, `/contact`). `/process` (the heaviest page, six-step timeline) and `/automotive` ship ungated — flagged as P1-5 in the maintenance roadmap.

**Concrete engineering patterns observed:**
- **`ShaderBackground.tsx`** — the homepage's animated WebGL hero is not simply lazy — it's *capability-gated three ways*: (1) `requestIdleCallback`-deferred mount (falls back to a 200ms `setTimeout` where unsupported), (2) a `prefers-reduced-motion` check, (3) a WebGL renderer-string probe that explicitly rejects software rasterizers (`swiftshader|llvmpipe|software|basic render`) — the code comment cites a measured **39-second TBT** on GitHub Actions runners before this fix. A static `hero-glow` CSS gradient is the permanent fallback layer underneath, so there's never a blank hero.
- **`CalendlyEmbed.tsx`** — click-to-load facade; the ~1.8 MB third-party iframe payload never loads unless the visitor explicitly opts in, keeping `/contact` inside the script budget. Theme params are sourced from `KIVO` tokens so the embed can't visually drift from the design system.
- **`MeshGradient`** is `next/dynamic`-imported with `ssr: false` specifically so it never contributes to the route's first-load JS chunk.
- **`riseIn` keyframe is transform-only** (§8) to avoid delaying the h1's LCP paint via an opacity transition.
- **Script budget headroom is 237/260 kB** per the maintenance doc — thin margin; any new client component is a real risk to the gate, not a rounding error.
- **Zero content images anywhere in the site today** — no `next/image` usage observed in any component reviewed. This is a currently-free pass that will need deliberate `next/image` + AVIF discipline the moment case-study screenshots or blog imagery are added (flagged in maintenance docs).
- **Font loading**: Inter loaded with the `opsz` (optical size) variable-font axis site-wide via `next/font/google` (automatic self-hosting, no external font requests); a `text`-subset audit is flagged as unexplored headroom.

**No image CDN config, no `next.config.ts` `images` block** — consistent with the "zero content images" finding above; nothing to configure yet.

---

## 13. Accessibility

Accessibility is treated as CI-enforced (≥0.98 Lighthouse score on the 3 gated URLs), not just aspirational, and several patterns go beyond what an automated score alone would catch:

- **Skip-to-content link** (`layout.tsx:48-53`) — `sr-only` until focused, jumps to `#main-content` (a focusable `tabIndex={-1}` wrapper around every page's content).
- **`NavBar` mobile drawer** — full manual focus trap: `Tab`/`Shift+Tab` cycling confined to the drawer (`handleDrawerKeyDown`), `Escape` closes and returns focus to the hamburger button, first focusable element auto-focused on open, `aria-modal="true"` + `role="dialog"` + `aria-label`, body scroll locked while open and restored on close/unmount.
- **`CalendlyEmbed`** — moves focus to the iframe on open specifically because the trigger button unmounts, which would otherwise strand keyboard/screen-reader focus at `<body>` (documented inline as a deliberate fix, not an incidental behavior).
- **Every interactive element** uses a consistent `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent` treatment (or the `-fg` variant on accent-background surfaces) — checked across NavBar, buttons, form fields, FAQ `<summary>` elements, footer links.
- **Forms**: every input has an associated `<label htmlFor>`, `aria-invalid`, and `aria-describedby` pointing at a `role="alert"` error element; the honeypot field is `aria-hidden`, `tabIndex={-1}`, and visually hidden via `className="hidden"` rather than `display:none` alone stacked with off-screen tricks — straightforward and correct.
- **`ScrollReveal`** motion system explicitly exempts `prefers-reduced-motion: reduce` users from any hidden-then-revealed state (§8) — content is never hidden from a reduced-motion user, only animated for everyone else.
- **`FAQSection`** uses native `<details>/<summary>` (real disclosure semantics, not a JS-simulated accordion) with the marker icon `aria-hidden`; first item defaults open — the maintenance roadmap flags this as worth a real screen-reader verification pass once user feedback exists, since default-open-first-item screen-reader announcement order is a known subtle issue class.
- **Tag/topic chip navigation, breadcrumb nav, footer nav** all carry distinct `aria-label`s (`"Footer services navigation"`, `"Browse by topic"`, etc.) so multiple `<nav>` landmarks on one page remain distinguishable to assistive tech.

**Coverage gap (matches maintenance doc):** the a11y gate only runs against 3 URLs; `/process` (custom `<ol>` timeline semantics with a decorative `::before` rail) and one article page are unguarded by CI, though nothing observed in `process/page.tsx` looks structurally risky — the `<ol>`-only-has-`<li>`-children discipline is explicitly commented as intentional valid-HTML care.

**No automated axe/jest-axe integration** — accessibility verification today is entirely Lighthouse-CI-score-based plus manual review; this is the same "no automated regression tests" gap as §7/§16, just for a11y specifically.

---

## 14. SEO

SEO is architecturally centralized, not scattered — this is one of the codebase's clearest strengths.

- **Single metadata authority**: every page calls `buildMetadata()` (`src/lib/seo.ts`) rather than hand-rolling `<Metadata>` objects. It normalizes canonical URLs (absolute, no trailing slash, `/`-root special-cased), sets OpenGraph + Twitter card metadata consistently, and is explicitly marked in `ARCHITECTURE-GUARDRAILS.md` as never-fork-per-page.
- **Structured data (JSON-LD)** — nine distinct schema builders in `seo.ts`: `organizationSchema`, `websiteSchema`, `faqSchema`, `serviceSchema`, `articleSchema`, `blogSchema`, `offerCatalogSchema` (excludes `comingSoon` plans from schema — price/availability integrity), `automotiveServiceSchema` (deliberately scoped to *current* offering only, excluding the in-development Drive platform from schema claims), `breadcrumbSchema`, `caseStudySchema`. Rendered via a single `<JsonLd>` component that escapes `<` in the serialized output — a real XSS-adjacent hardening for the day this data becomes CMS-supplied and untrusted.
- **`sitemap.ts`** is generated from the *same* content accessors the pages use — meaning Phase-2 CMS content will appear in the sitemap automatically with no separate maintenance. Priorities are hand-tuned per content type (home/contact 1.0, services/work/automotive 0.9, about/process/pricing/careers 0.8, case studies 0.8 with `lastModified`, insights/tags 0.7, legal 0.5).
- **`robots.ts`** allows everything except `/thank-you` (correctly kept out of the index — it's a post-conversion confirmation page, not content).
- **Canonical URL discipline** extends to `dynamicParams = false` on the tag route (§4) — a soft-404 (thin/empty content page serving 200) is a real SEO anti-pattern this codebase explicitly engineers against.
- **Breadcrumb schema** is emitted on most detail pages but not uniformly — e.g. `/services/[slug]` and `/work/[slug]` have it; verify consistency before adding new detail-page types.

**Known gaps (also flagged in maintenance docs, consistent with this review):**
1. **One global OG image** (`opengraph-image.tsx`) serves all 37 routes — no per-route images despite `next/og` already being wired up and ready to extend. This is the single largest visible/social-sharing SEO gap.
2. **No `dateModified`** on articles — only `datePublished`; relevant once content editing begins.
3. **Organization schema only on `/` and `/about`** — correct today (no reviews/testimonials to back `AggregateRating`), but worth revisiting when real client testimonials exist.
4. **Terms of Service currency/jurisdiction language says "USD"** and "State of Nevada" while `pricing.ts` prices everything in **CAD** — see §16, this is a real content-correctness issue with SEO/legal (not just architectural) weight, since it's user-facing published copy that a careful visitor or lawyer would notice.

---

## 15. Security

- **Server/client boundary enforcement**: `server-only` package imported at the top of `crm.ts` and `cms/client.ts` — a build-time guard against a secret-holding module accidentally being pulled into a client bundle. No secrets (webhook URLs, future WP auth tokens) are ever read outside these files or the Server Actions that call them.
- **Spam mitigation without user friction**: honeypot field (hidden, `tabIndex={-1}`, never revealed as "detected" to the submitter — spam takes the identical success path as a real submission) + a 3-second minimum time-to-submit check, computed server-side from a client-stamped `startedAt` timestamp. No CAPTCHA (deliberate choice, matches the site's own published advice in `articles.ts`'s "contact-form-conversion-mistakes" post — the code and the content marketing are consistent with each other).
- **Input validation**: Zod schemas server-side for both forms (`z.email()`, `.trim()`, length minimums, `z.enum(BUDGET_OPTIONS)`). Errors are field-scoped and returned as a typed `Record<string, string>`, not raw Zod error dumps — no internal validation-library detail leaks to the client.
- **JSON-LD injection hardening**: `JsonLd.tsx` escapes `<` → `<` before `dangerouslySetInnerHTML` — closes the classic "attacker-controlled data breaking out of a `<script>` tag" vector, forward-looking for Phase 2 when this data becomes CMS-editable rather than hardcoded.
- **Security headers** (`next.config.ts`): `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `poweredByHeader: false` (removes the `X-Powered-By: Next.js` fingerprinting header). **No `Content-Security-Policy` header is set** — notable given the site embeds a third-party iframe (Calendly) and loads WebGL/canvas content; a CSP isn't strictly required for a static site with no user-generated content, but its absence is worth a deliberate decision rather than an oversight, especially before Phase 2 introduces CMS-authored content into the trust boundary.
- **No CSRF-specific handling** — not needed in the traditional sense, since Next.js Server Actions carry built-in origin-checking protection (POST-only, same-origin action IDs) as part of the framework; verify this is still the behavior in the pinned Next 16.2.7 build per the caveat in §3, rather than assuming based on general Server Actions familiarity.
- **Dependency posture**: no `npm audit`/Snyk/Dependabot configuration observed in the repo (no `.github/dependabot.yml`); the maintenance roadmap recommends Renovate/Dependabot as unshipped future work (P1-4).
- **The one real gap with security-adjacent consequence**: `crm.ts`'s silent-failure path (§9/§16) is not a security bug, but it's a **data-integrity** bug with the same blast radius character — a form that appears to succeed to the user while silently discarding their submitted PII server-side, with no operator alerting. Worth flagging alongside security findings because "the user believes their data was received and it wasn't" is the kind of failure a security/privacy review would also catch.

---

## 16. Technical Debt

Cross-checked against and consistent with `docs/maintenance/ROADMAP.md` §2–3; items below are either confirmations of that doc's findings (marked ✓) or new observations from this pass (marked **NEW**).

| # | Item | Severity | Detail |
|---|---|---|---|
| 1 ✓ | **Silent lead loss on webhook failure** | Critical | `crm.ts:35` — `TODO(phase 1): queue fallback email on total failure — never lose a lead.` Two attempts, then a `console.error` in ephemeral function logs is the only trace. The user sees `/thank-you` regardless. |
| 2 ✓ | **Zero automated tests** | Critical | No test files anywhere in the repo (confirmed by filesystem search). The only revenue path has no regression coverage. |
| 3 ✓ | **`ui/Card.tsx` is dead code** | Medium | Zero import sites found; ~17 places (PageHero cards, FAQ items, pricing cards, process steps, etc.) hand-roll `rounded-lg border border-line bg-raised p-6 md:p-8` instead. |
| 4 ✓ | **Scheduler card near-duplication** | Low | `CalendlyEmbed.tsx`'s closed-state placeholder and `CalendlySection.tsx`'s unset-env placeholder render near-identical markup independently. |
| 5 ✓ | **`TechPill` duplicated** | Low | Full component defined independently in both `shared/TechPill.tsx` and inline inside `home/PortfolioSection.tsx` (identical `techColors` map, same implementation) — confirmed by direct comparison of both files. |
| 6 ✓ | **Home `ProcessSection` (3 phases) vs. `/process` (6 steps)** | Low–Medium | Both trace to the same published day-ranges, but a careful prospect reading both pages will notice the step count mismatch. |
| 7 ✓ | **`services.ts` "Analytics setup (Plausible or GA4)"** | Low | Deliverables copy for Lead Generation Systems names tools that aren't what the site itself uses (Vercel Analytics + Speed Insights) — may be an intentional *client-deliverable* description rather than drift, but reads as inconsistent without a comment saying so. |
| 8 ✓ | **Stale version/engines metadata** | Low | `package.json`: `"version": "0.1.0"` for a site the README calls "v1.0 — feature complete, live in production"; `engines.node: ">=18.17.0"` while Node 18 is EOL and CI/Vercel run 22/24. |
| 9 **NEW** | **Terms of Service currency/jurisdiction mismatch** | Medium | `src/app/terms/page.tsx:49` states *"All prices are in USD"* and governing law is *"the State of Nevada"* — but every price on the site (`pricing.ts`) is denominated in **CAD**, and the brand voice throughout (`.ca` domain, "driftpilot.ca") reads as Canadian. This is real published legal copy a customer or their lawyer could rely on; worth a deliberate correction, not a code fix. |
| 10 **NEW** | **`components/README.md`'s client-component enumeration is stale** | Low | The doc lists the only permitted `"use client"` locations as NavBar, MobileDrawer, PortfolioFilter, ContactForm, EarlyAccessForm — but `ShaderBackground.tsx` and `CalendlyEmbed.tsx` are also client components today, and "MobileDrawer"/"PortfolioFilter" don't exist as separate files (folded into NavBar / never built). The rule's *intent* (client JS stays minimal and deliberate) is upheld in practice; the *document* just hasn't been updated to match. |
| 11 **NEW** | **`sections/` and `forms/.gitkeep`** | Trivial | `src/components/sections/` is empty and reserved but never used — `HeroSection`, `ServicesGrid`, etc. all live under `home/` instead, which is arguably the more honest name for home-page-specific compositions, but it means the `sections/` folder promised in the README's architecture diagram doesn't correspond to anything real. |
| 12 ✓ | **No Prettier / format check in CI** | Low–Medium | Confirmed — no `.prettierrc`, no format step in `ci.yml`. The maintenance doc notes a 28-line indentation regression once shipped because lint alone didn't catch it. |
| 13 **NEW** | **`getAllServices()` is sync but called with `Promise.resolve()` wrapping in `sitemap.ts`** | Trivial | `src/lib/content/services.ts` exports `getAllServices` as a plain synchronous function (no `async`), while every other content accessor (`case-studies.ts`, `articles.ts`) is `async` for Phase-2-swap consistency. `sitemap.ts:13` has to wrap it in `Promise.resolve()` to fit the `Promise.all([...])` pattern — a small but real inconsistency in the "swap contract," since a future CMS-backed `getAllServices()` will need to become async and every synchronous call site (`ServicesGrid.tsx`, `services/page.tsx`, `services/[slug]/page.tsx`) will need an `await` added at that point. Not a bug today, but a **change amplifier** for Phase 2 that the other three content modules already avoided. |

**Debt NOT found despite being worth checking:** no circular imports observed between `lib/content` and `components`; no components importing `lib/content` directly (the accessor-only rule holds); no raw hex colors found outside `design-tokens.ts` and its two sanctioned consumers in the files reviewed; no orphaned/unused exports beyond `Card.tsx` noticed in this pass.

---

## 17. Reusable Modules

This section restates `DESIGN-SYSTEM-ROADMAP.md`'s tiering with this review's independent confirmation, since it's directly relevant to "what's reusable" as an architecture question.

**Genuinely design-system-ready today (Tier 1 — confirmed):**
- `buttonClasses()` — 4 variants × 3 sizes, full interactive/disabled states, the recipe-over-component pattern is clean and the stated rationale (`<Link>` compatibility, avoiding `tailwind-merge` in client bundles) is sound engineering, not just a style preference.
- `CTABand`, `PageHero`, `FAQSection` — all fully prop-driven, zero content-layer imports, reused 6–10+ times each. `FAQSection`'s automatic JSON-LD emission is a genuine differentiator (most agencies' FAQ components don't self-schema).
- `field.ts` + the Server-Action/Zod/spam-gate/error-echo pattern demonstrated in `ContactForm`/`EarlyAccessForm` — this is the most valuable non-visual asset in the repo; it's a *pattern*, not just styling, and both form implementations are a faithful reference pair (nearly line-for-line structural parity, appropriately, since they're variations on one triad).
- `JsonLd` + the `seo.ts` builder set — schema-as-a-first-class-feature is a real product differentiator worth productizing.

**Reusable after hardening (Tier 2 — confirmed, with this review's additions):**
- `Card` — needs the adopt-or-delete decision before it can be called reusable; today it's aspirational.
- `PlanCard` (inline in `pricing/page.tsx`) — well-structured, data-driven from `pricing.ts`, but trapped in a page file instead of `components/`.
- The **case-study surface pattern** appears in *three* independently hand-rolled forms (`PortfolioSection`'s featured card, `work/page.tsx`'s featured card, `automotive/page.tsx`'s proof-strip card) — all render the same `{stat, headline, methodology/result, technologies}` shape with slightly different markup. A single `CaseStudyCard` with a `variant` prop (as the design-system doc proposes) would remove real duplication, not just theoretical duplication — this review confirms all three call sites independently.
- `TechPill` — confirmed duplicated (§16), the clearest concrete case where "should be reusable" has already partially failed (one copy drifted into existence instead of being imported).

**Correctly kept site-specific (Tier 3 — confirmed, no disagreement):**
- `ShaderBackground`/`HeroSection` (brand signature, not a template primitive), `AutomotiveBanner` and automotive-page sections (funnel-specific), `NavBar`/`SiteFooter` (chrome pattern is reusable, the specific chrome isn't), the home-page narrative sections (`WhySection`, `ProcessSection`, `PortfolioSection` — brand-voice compositions of Tier-1/2 primitives, not primitives themselves).

**This review's one addition to the roadmap:** the **detail-page shell pattern** identified in §5 (`PageHero → content sections → cross-link → FAQ → CTABand`, repeated near-identically across `services/[slug]`, `work/[slug]`, and to a lesser extent `insights/[slug]`) is itself a reusable composition that isn't listed in the design-system doc's component inventory — worth considering as a `DetailPageLayout` wrapper or a documented convention if a fourth detail-page type is ever added.

---

## 18. Current Features

**Public-facing:**
- Marketing site: home, about, careers, pricing (2 one-time packages + 3 monthly plans), a six-step process page, privacy/terms
- Case-study system (`/work`, `/work/[slug]`) — 4 curated case studies (Home Services, SaaS, Automotive, Professional Services), with "current status" and "future direction" sections per study, deliberately non-metric qualitative status language
- Services catalog (`/services`, `/services/[slug]`) — 4 services, each with benefits, deliverables, and a service-specific FAQ
- Insights/blog hub (`/insights`, `/insights/[slug]`, `/insights/tag/[tag]`) — 3 articles today, topic-based navigation, tag pages, related-article recommendation (shared-tag-count ranking), curated "keep reading" internal links per article
- Automotive vertical (`/automotive`, `/automotive/early-access`) — separately funneled dealership pitch + Driftpilot Drive (a not-yet-launched platform) waitlist signup
- Contact flow (`/contact` → `/thank-you`) — form + optional Calendly booking (env-gated) + FAQ
- Custom 404 with recovery links (never a dead end)

**Engineering-facing:**
- Fully static prerendering, 37 routes
- Two independent lead-capture funnels with spam protection, CRM webhook delivery, and funnel isolation enforced at the routing and data layer
- Sitewide JSON-LD structured data (9 schema types)
- Auto-generated sitemap and robots.txt
- Lighthouse CI performance/a11y/SEO gate on every PR
- Vercel Analytics + Speed Insights (cookieless, zero-config)
- Dark-only "Kivo" design system with a token layer built for future re-theming
- Scroll-reveal motion system with full no-JS/reduced-motion correctness
- Capability-gated WebGL hero with a static fallback

---

## 19. Missing Features

Consolidating this review's findings with the maintenance roadmap's explicit backlog (cross-referenced, not duplicated blindly):

**Structural / reliability gaps:**
- No automated test suite of any kind (unit, integration, or E2E) — highest-priority gap given the revenue-path exposure
- No error monitoring/alerting (Sentry or equivalent) — failures are invisible today, including the crm.ts silent-failure path
- No lead-delivery fallback (retry queue, fallback email, or dead-letter capture) on total webhook failure
- No CSP header (§15)
- No `/api/revalidate` endpoint despite `REVALIDATE_SECRET` being documented — Phase 2 CMS webhook receiver doesn't exist yet
- No dependency-update automation (Renovate/Dependabot)
- No Prettier / format-check in CI

**Content/product gaps:**
- Per-route OG images (only one global image for all 37 routes)
- `dateModified` support on articles
- Testimonials/reviews module (blocked on client permission, not engineering)
- Newsletter capture
- Insights search/filter (explicitly deferred until ≥10 posts; currently 3)
- Reading time / progress indicator on articles
- Funnel-specific thank-you page for automotive leads (currently shares the generic `/thank-you`)
- Live chat, referral program, downloadable guides, video content (explicitly "nice to have / future" in the roadmap)
- Logo strip / client-logo social proof (`public/logos/` exists but is empty — `.gitkeep` only)

**Platform-level (explicitly Phase 2/3, by design not yet built):**
- Headless WordPress CMS integration (`lib/cms/*` is a complete stub with no live connection)
- AWS lead pipeline (API Gateway → SQS) — Phase 3, currently CRM-webhook-only
- Driftpilot Drive itself (the automotive platform product) — currently early-access waitlist only, no product exists yet
- CRM upgrade path to native HubSpot/Pipedrive integration (currently generic webhook POST)

---

## 20. Recommended Next Milestones

Prioritized against both this review's findings and the existing `ROADMAP.md` P0/P1/P2 backlog (this section adds sequencing rationale rather than re-deriving priorities from scratch, since the existing backlog is already well-reasoned).

### Milestone 1 — Close the revenue-path risk (do first)
1. **Lead-delivery fallback** on `sendToCrm()` failure — even a minimal fallback (send a plain-text email via a transactional provider, or write to a durable log a human checks) closes the single highest-severity gap in the codebase. This blocks nothing else and should ship before any feature work. *(Done 2026-09-28: Slack alert carrying the whole lead.)*
2. **Error monitoring with alerting** wired to the form/webhook failure paths specifically (not just generic APM) — pairs directly with #1; a fallback path that fails silently is only marginally better than no fallback at all. *(Done 2026-09-28 for the failure path itself: the Slack alert is the alert. Generic error monitoring is still open.)*
3. **Server-action test suite** — happy path, Zod validation failures, honeypot/time-gate spam detection, and the webhook-failure branch, for both forms. This is the cheapest possible test investment for the highest-value coverage (two files, one shared pattern). *(Done 2026-09-28.)*

### Milestone 2 — Consolidate identified duplication (low-risk, high-clarity)
4. Adopt-or-delete `ui/Card.tsx` — pick one, then migrate the 17 hand-rolled recipes or remove the dead file. Either answer is fine; the current in-between state is what's actually costly (new contributors will hit dead code and copy it, compounding the problem).
5. De-duplicate `TechPill` (delete the `PortfolioSection` inline copy, import the shared one) and the Calendly placeholder-card pair — both are small, mechanical, and remove real drift risk (a future edit to one copy silently not reaching the other).
6. Fix the Terms of Service USD/Nevada vs. CAD/`.ca` mismatch (§16 #9) — this is copy, not code, but it's the kind of published-fact inconsistency the guardrails doc explicitly calls a "no invention" violation risk if left uncorrected.
7. Align home `ProcessSection`'s 3-phase summary with `/process`'s 6-step vocabulary (or explicitly document why they're allowed to differ, e.g. "home is a compressed teaser by design").

### Milestone 3 — Extend the enforcement surface
8. Extend Lighthouse CI to `/process` and `/automotive` (cheap — ~90s of CI time per the roadmap's own estimate).
9. Add Prettier + `--check` in CI to prevent the class of formatting regressions the roadmap documents as having already shipped once.
10. Version/engines hygiene: bump `package.json` to `1.0.0`, `engines.node` to `>=20`, and establish a monthly dependency-currency cadence (Renovate or a scheduled `npm outdated` check).

### Milestone 4 — Design-system packaging (per `DESIGN-SYSTEM-ROADMAP.md`, this review concurs with sequencing)
11. In-repo consolidation of Tier-1 components under `src/components/ui/` with documented prop APIs — no new package yet.
12. Extract a `CaseStudyCard` with a `variant` prop to remove the three-way duplication confirmed in §17 — this is a concrete, scoped task with a clear "done" state (three call sites → one component, three variants).
13. Build the first genuinely new landing page (the roadmap's proposed "Free Website Audit" lead magnet, P1-7) using *only* existing/extracted design-system components as a forcing function — any gap or awkward API surfaced during that build is a real DDS bug to fix upstream, per the roadmap's own stated dry-run strategy.

### Sequencing rationale
Milestone 1 is ahead of everything else because it's the only category where a defect actively costs the business money today (every hour `crm.ts`'s TODO stays open is an hour of un-alerted lead-loss risk). Milestones 2–3 are ordered by effort-to-clarity ratio — they're all small, mechanical, and reduce the chance that the next contributor (human or agent) copies an already-duplicated pattern a third time. Milestone 4 is deliberately last: packaging a design system before the component APIs have been proven out by a second real consumer (per the roadmap's own "not before — premature packaging is overhead with one consumer" principle) would be solving a problem the codebase doesn't have yet.
