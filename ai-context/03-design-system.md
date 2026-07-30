# Driftpilot design-system rules

- Use semantic Tailwind tokens such as `surface`, `fg`, `muted`, and `accent`; avoid raw hex in components.
- `src/app/globals.css` and `src/lib/design-tokens.ts` deliberately mirror the palette. Update both when a token value changes.
- The visual system is dark-first; do not introduce an unplanned light-mode path.
- Use the existing class recipes in `src/components/ui/` and shared cross-page components before creating another visual primitive.
- Motion must be purposeful and respect reduced-motion preferences.
