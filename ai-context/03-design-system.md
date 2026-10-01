# Driftpilot design-system rules

- Use semantic Tailwind tokens such as `surface`, `fg`, `muted`, and `accent`; avoid raw hex in components.
- `src/app/globals.css` and `src/lib/design-tokens.ts` deliberately mirror the palette. Update both when a token value changes.
- The visual system is dark-first; do not introduce an unplanned light-mode path.
- Use the existing class recipes in `src/components/ui/` and shared cross-page components before creating another visual primitive.
- Motion must be purposeful and respect reduced-motion preferences.

## Logo

- The lockup (DP mark and DRIFTPILOT wordmark) is `src/components/ui/Logo.tsx`. It paints in `currentColor`, so it is white (`text-fg`) on the dark surfaces. Don't recolour it to the accent or add effects.
- Size it by height; the width follows. The nav, drawer and footer use `h-5` (20px, about 173px wide). Keep it at least 16px tall, or the counters in D, R, P and O close up.
- Links around the logo carry the accessible name (`aria-label="Driftpilot home"`); the SVG itself is decorative.
- The favicons follow the brand sheet: black DP on white. `src/app/icon.svg` (primary), `favicon.ico` (16/32/48 fallback) and `apple-icon.png` (180px) use the Next.js file conventions. `public/brand/driftpilot-mark-512.png` is the Organization `logo` in JSON-LD.
