/**
 * Kivo palette as TS constants — the ONLY sanctioned raw-hex consumer path,
 * for the two places Tailwind classes can't reach: next/og inline styles
 * (opengraph-image.tsx) and WebGL uniforms (ShaderBackground.tsx).
 * Components must use the semantic tokens in globals.css instead.
 */
export const KIVO = {
  surface: "#000000",
  raised: "#080a0d",
  overlay: "#0d1014",
  fg: "#ffffff",
  muted: "#8f8f8f",
  accent: "#a2fa8e",
  accentFg: "#222222",
  line: "#222222",
  lineStrong: "#2f2f2f",
} as const;
