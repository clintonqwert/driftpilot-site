# Components

Presentation layer only — **components never fetch data**. Pages (in `src/app/`)
fetch via `lib/content/*` accessors and pass typed props down. This is what
makes the Phase 2 CMS swap a data-layer change, not a component change.

## Layout rules (handoff doc §3–4)

| Folder | Purpose | Client JS allowed? |
|---|---|---|
| `layout/` | NavBar, MobileDrawer, SiteFooter | NavBar + MobileDrawer only |
| `sections/` | Page sections (Hero, ServicesGrid, CTABand, …) | PortfolioFilter island only |
| `forms/` | ContactForm, EarlyAccessForm | Yes (submit via Server Actions) |
| `shared/` | Cross-page fragments (AutomotiveBanner, SocialProofBar) | No |
| `ui/` | Primitives (Button, Card, Pill, SectionHeading, StatCallout) | No |

- `sections/` may import from `ui/`; `ui/` never imports from `sections/`.
- `"use client"` appears **only** in: NavBar, MobileDrawer, PortfolioFilter,
  ContactForm, EarlyAccessForm. Never on a section or page.
- No hex colors in JSX — design tokens live in `app/globals.css` (design system §9).
- `ui/` + token discipline is what makes the future `@driftpilot/ui` package
  extraction (monorepo, handoff §11.2) a one-day job.
