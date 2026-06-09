# Driftpilot — Design System

**Version 1.0 · June 2026 · Tailwind CSS v4**

Companion to `driftpilot-homepage-spec.md`. All tokens use Tailwind v4 `@theme` syntax — paste the token block (§9) into `src/app/globals.css` to activate every custom class referenced in this document. Everything else uses stock Tailwind utilities.

**Brand character:** Technical, fast, trustworthy. Dark surfaces with electric blue accents. High contrast, generous whitespace, no decoration that doesn't earn its place.

---

## 1 · Color Palette

### 1.1 Brand — Electric Blue (`brand-*`)

| Token | Hex | Use |
|---|---|---|
| `brand-50` | `#EFF6FF` | Tinted backgrounds, badge fills on light |
| `brand-100` | `#DBEAFE` | Hover state of tinted backgrounds |
| `brand-200` | `#BFDBFE` | Borders on tinted elements |
| `brand-400` | `#60A5FA` | **Accent on dark** — eyebrows, stats, links on near-black |
| `brand-500` | `#3B82F6` | Hover state of accent on dark, focus rings |
| `brand-600` | `#2563EB` | **Primary** — solid CTAs, links on light |
| `brand-700` | `#1D4ED8` | Primary hover |
| `brand-800` | `#1E40AF` | Primary active/pressed |
| `brand-950` | `#172554` | Deep tints on dark sections |

Rule: on dark backgrounds always use `brand-400` for text (7.4:1 on `ink-950`); `brand-600` for text only on white/light (5.2:1). All pairings in this system pass WCAG AA.

### 1.2 Neutrals — Ink (`ink-*`, blue-tinted slate)

| Token | Hex | Use |
|---|---|---|
| `ink-50` | `#F8FAFC` | Alternate section background (light) |
| `ink-100` | `#F1F5F9` | Card hover fill, dividers on light |
| `ink-200` | `#E2E8F0` | Default borders on light |
| `ink-300` | `#CBD5E1` | Hover borders, disabled text on dark |
| `ink-400` | `#94A3B8` | Muted text on dark, placeholders |
| `ink-500` | `#64748B` | Secondary text on light (min size 14px) |
| `ink-600` | `#475569` | Body text on light |
| `ink-800` | `#1E293B` | Borders/dividers on dark |
| `ink-900` | `#0F172A` | Headings on light; dark card surface |
| `ink-950` | `#0B1120` | **Near-black** — hero, dark sections, footer |

### 1.3 Semantic

| Token | Hex | Use |
|---|---|---|
| `success-600` | `#16A34A` | Success text/icons (light bg: `success-50` `#F0FDF4`) |
| `warning-600` | `#D97706` | Warnings (bg: `#FFFBEB`) |
| `danger-600` | `#DC2626` | Errors, destructive (bg: `#FEF2F2`) |

### 1.4 Surface recipes

| Surface | Classes |
|---|---|
| Page (light) | `bg-white text-ink-600` |
| Alternate light section | `bg-ink-50` |
| Dark section (hero, CTA band, footer) | `bg-ink-950 text-ink-300` |
| On dark: headings `text-white`, accent `text-brand-400`, muted `text-ink-400` | |

---

## 2 · Typography

### 2.1 Families

Already wired via `next/font` in `layout.tsx` — keep them:

| Role | Family | Token |
|---|---|---|
| All UI + headings + body | Geist Sans | `font-sans` |
| Stats, code, timeline labels (`Days 1–3`) | Geist Mono | `font-mono` |

`font-display: swap` is handled by `next/font`. No additional preload work needed.

### 2.2 Scale

| Role | Mobile | Desktop | Classes |
|---|---|---|---|
| Display (hero H1) | 36px | 60px | `text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] text-balance` |
| H2 (section) | 30px | 40px | `text-3xl md:text-[2.5rem] font-semibold tracking-tight leading-[1.1]` |
| H3 (card/sub) | 20px | 24px | `text-xl md:text-2xl font-semibold tracking-tight` |
| H4 | 18px | 18px | `text-lg font-semibold` |
| Body large (hero subhead) | 18px | 20px | `text-lg md:text-xl leading-relaxed` |
| Body | 16px | 16px | `text-base leading-relaxed` |
| Small / captions | 14px | 14px | `text-sm leading-normal` |
| Eyebrow | 13px | 13px | `text-[13px] font-mono font-medium uppercase tracking-[0.14em] text-brand-600` (dark: `text-brand-400`) |
| Stat figure | 36px | 48px | `font-mono text-4xl md:text-5xl font-semibold tabular-nums` |

### 2.3 Rules

- Headings: `text-ink-900` on light, `text-white` on dark. Weight 600 — never 700+ at display sizes, never below 600 for headings.
- Body: `text-ink-600` on light, `text-ink-300` on dark.
- Max line length for prose: `max-w-prose` (~65ch). Hero subhead: `max-w-xl`.
- One H1 per page. Numbers always `tabular-nums`.

---

## 3 · Buttons

All buttons share: `inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 disabled:opacity-50 disabled:pointer-events-none select-none`.

### 3.1 Variants

| Variant | Classes (append to shared) | Use |
|---|---|---|
| **Primary** | `bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800` | One per section. Main CTA ("Book a Scope Call") |
| **Secondary (light bg)** | `bg-white text-ink-900 border border-ink-200 hover:border-ink-300 hover:bg-ink-50` | Supporting action |
| **Secondary (dark bg)** | `bg-white/10 text-white border border-white/15 hover:bg-white/15` | Supporting action on hero/CTA band |
| **Ghost / text link** | `text-brand-600 hover:text-brand-700 underline-offset-4 hover:underline` (dark: `text-brand-400 hover:text-brand-300`) | Tertiary, "See the work →" |

### 3.2 Sizes

| Size | Classes | Use |
|---|---|---|
| `lg` | `h-13 px-7 text-base` | Hero + pre-footer CTA band |
| `md` (default) | `h-12 px-6 text-base` | Nav, sections, forms |
| `sm` | `h-10 px-4 text-sm` | Inline, table rows, tags |

### 3.3 Rules

- Mobile: primary CTAs go full-width — add `w-full sm:w-auto`.
- Min touch target 44px — never use `sm` as the only tap target on mobile.
- Arrow icons: trailing `→` (lucide `ArrowRight`, `size-4`), animate `group-hover:translate-x-0.5 transition-transform`. Never animate the button itself (no scale/bounce).
- Loading state: swap label for spinner, keep width fixed (`min-w-[the rendered width]` or grid-stack trick).

---

## 4 · Cards

Shared base: `rounded-2xl p-6 md:p-8`.

| Variant | Classes (append to base) | Use |
|---|---|---|
| **Default (light)** | `bg-white border border-ink-200 shadow-xs` | Services, FAQ, content blocks |
| **Interactive (light)** | default + `transition-all duration-200 hover:shadow-md hover:border-ink-300 hover:-translate-y-0.5` | Linked cards (services, case studies) |
| **Muted** | `bg-ink-50 border border-ink-100` | Process steps, low-emphasis groupings |
| **Dark** | `bg-white/5 border border-white/10` | Cards inside dark sections |
| **Dark interactive** | dark + `transition-colors hover:bg-white/[0.08] hover:border-white/20` | Linked cards on dark |
| **Featured / case study** | `bg-ink-950 text-ink-300 border border-ink-800 shadow-lg` | Portfolio highlight (§07 of spec) |

Rules: whole card is the link (`<a>` wrapper or stretched-link pattern), never a "Read more" inside an interactive card. One shadow level jump max on hover. Card headings `text-ink-900` (light) / `text-white` (dark).

---

## 5 · Border Radius

| Token | Value | Use |
|---|---|---|
| `rounded-md` | 6px | Badges, tags, kbd, small chips |
| `rounded-lg` | 8px | **Buttons, inputs, selects** |
| `rounded-xl` | 12px | Small cards, dropdown panels, toasts |
| `rounded-2xl` | 16px | **Cards, modals, images in content** |
| `rounded-3xl` | 24px | Large feature media, CTA band container |
| `rounded-full` | — | Pills, avatars, icon buttons |

Rule: nested radii shrink — element inside a `rounded-2xl` card uses `rounded-lg` or less. Never mix radii at the same hierarchy level.

---

## 6 · Shadows

Stock Tailwind scale, used sparingly — borders carry most separation on light backgrounds; dark sections use borders only (shadows are invisible on `ink-950`).

| Token | Use |
|---|---|
| `shadow-xs` | Resting cards, inputs |
| `shadow-sm` | Sticky nav after scroll (`shadow-sm shadow-ink-950/5`) |
| `shadow-md` | Card hover, dropdowns |
| `shadow-lg` | Modals, mega-dropdown, featured card |
| `shadow-brand` *(custom, §9)* | `0 8px 24px -8px rgb(37 99 235 / 0.4)` — primary CTA glow on dark sections only |

Never stack `shadow-lg`+ on multiple sibling elements.

---

## 7 · Mobile Standards (< 768px)

- **Page padding:** `px-5` (20px). Content never touches edges.
- **Section rhythm:** `py-16` (64px); hero `pt-28 pb-16` (clears sticky nav).
- **Touch targets:** ≥ 44×44px. Buttons `h-12`+, nav links `py-3`.
- **Primary CTAs:** full-width (`w-full`). Max 2 stacked buttons, `gap-3`.
- **Type:** body never below 16px; inputs ≥ 16px (`text-base`) to prevent iOS zoom.
- **Layout:** single column. Grids collapse: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`. Horizontal scroll only for the social-proof logo bar (with `overflow-x-auto` + edge fade), nothing else.
- **Nav drawer:** slides from right, full height, `bg-ink-950`, flat list `text-lg py-3`, CTA pinned bottom with `pb-[env(safe-area-inset-bottom)]`.
- **No hover-dependent UI:** every hover affordance has a visible default state. Use `@media (hover: hover)` semantics — Tailwind v4's `hover:` already only applies on hover-capable devices.
- **Tap feedback:** `active:` states on all tappable elements (e.g. `active:bg-brand-800`).

---

## 8 · Desktop Standards (≥ 768px)

- **Container:** `mx-auto max-w-[1200px] px-8` — token `max-w-container` (§9). Every section uses it.
- **Section rhythm:** `md:py-24` (96px); hero `md:pt-40 md:pb-28`.
- **Grid:** content grids `gap-6` (24px); `gap-8` between major column pairs. Services 3-up, process 4-up, stats 3-up.
- **Breakpoints:** design at `md` (768) and `lg` (1024); `xl`+ only widens whitespace, never adds columns.
- **Hover:** interactive elements respond within 150–200ms (`duration-150` controls, `duration-200` cards). Color/shadow/border transitions only — no scaling content.
- **Scroll entry animation (per spec):** `opacity-0 translate-y-4 → opacity-100 translate-y-0`, `duration-500 ease-out`, stagger siblings 75ms. Wrap in `motion-safe:` so `prefers-reduced-motion` is respected for free.
- **Sticky nav:** `sticky top-0 z-50`; transparent over hero → `bg-white/90 backdrop-blur-md shadow-sm` after 60px scroll (`transition-[background-color,box-shadow] duration-200`).
- **Focus:** all interactive elements keep the shared `focus-visible` ring — never `outline-none` without replacement.

---

## 9 · Implementation — Tailwind v4 Tokens

Paste into `src/app/globals.css` (replaces the starter `:root`/`@theme` block):

```css
@import "tailwindcss";

@theme {
  /* Brand — electric blue */
  --color-brand-50:  #EFF6FF;
  --color-brand-100: #DBEAFE;
  --color-brand-200: #BFDBFE;
  --color-brand-400: #60A5FA;
  --color-brand-500: #3B82F6;
  --color-brand-600: #2563EB;
  --color-brand-700: #1D4ED8;
  --color-brand-800: #1E40AF;
  --color-brand-950: #172554;

  /* Neutrals — ink */
  --color-ink-50:  #F8FAFC;
  --color-ink-100: #F1F5F9;
  --color-ink-200: #E2E8F0;
  --color-ink-300: #CBD5E1;
  --color-ink-400: #94A3B8;
  --color-ink-500: #64748B;
  --color-ink-600: #475569;
  --color-ink-800: #1E293B;
  --color-ink-900: #0F172A;
  --color-ink-950: #0B1120;

  /* Semantic */
  --color-success-600: #16A34A;
  --color-warning-600: #D97706;
  --color-danger-600:  #DC2626;

  /* Type */
  --font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, monospace;

  /* Layout */
  --container-container: 1200px;   /* max-w-container */
  --spacing-13: 3.25rem;           /* h-13 for lg buttons */

  /* Shadow */
  --shadow-brand: 0 8px 24px -8px rgb(37 99 235 / 0.4);
}

body {
  @apply bg-white text-ink-600 font-sans antialiased;
}
```

### Component recipes (copy-paste)

```html
<!-- Primary button (md) -->
<a href="/contact" class="inline-flex items-center justify-center gap-2 h-12 px-6 w-full sm:w-auto
  rounded-lg bg-brand-600 text-white text-base font-semibold
  transition-colors duration-150 hover:bg-brand-700 active:bg-brand-800
  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
  Book a Scope Call
</a>

<!-- Interactive card (light) -->
<a href="/work/case-study" class="block rounded-2xl p-6 md:p-8 bg-white border border-ink-200 shadow-xs
  transition-all duration-200 hover:shadow-md hover:border-ink-300 hover:-translate-y-0.5">
  <h3 class="text-xl md:text-2xl font-semibold tracking-tight text-ink-900">…</h3>
  <p class="mt-2 text-base leading-relaxed text-ink-600">…</p>
</a>

<!-- Dark section shell -->
<section class="bg-ink-950 text-ink-300">
  <div class="mx-auto max-w-container px-5 md:px-8 py-16 md:py-24">
    <p class="text-[13px] font-mono font-medium uppercase tracking-[0.14em] text-brand-400">Eyebrow</p>
    <h2 class="mt-3 text-3xl md:text-[2.5rem] font-semibold tracking-tight leading-[1.1] text-white">…</h2>
  </div>
</section>
```

---

## 10 · Do / Don't

| Do | Don't |
|---|---|
| One primary CTA per viewport | Two solid blue buttons side by side |
| `brand-400` for accent text on dark | `brand-600` text on `ink-950` (fails contrast) |
| Borders for separation on light | Heavy shadows on resting cards |
| `motion-safe:` on all entry animations | Animations that run under reduced-motion |
| `tabular-nums` on all stats | Proportional digits in metrics |
