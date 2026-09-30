import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/seo";
import { KIVO } from "@/lib/design-tokens";
import { Logo } from "@/components/ui/Logo";

export const alt = `${SITE_NAME} — Web Development Studio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: KIVO.surface,
          position: "relative",
        }}
      >
        {/* Brand accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "8px",
            height: "100%",
            background: KIVO.accent,
          }}
        />

        {/* Logo — 40px tall; width follows the lockup's 1596:185 viewBox */}
        <Logo
          width={345}
          height={40}
          fill={KIVO.fg}
          style={{ marginBottom: "40px" }}
        />

        {/* Headline */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            fontFamily: "sans-serif",
            color: KIVO.fg,
            lineHeight: 1.1,
            maxWidth: "900px",
            display: "flex",
          }}
        >
          Performance-first Web Development
        </div>

        {/* Description — second sentence only to avoid repeating the headline */}
        <div
          style={{
            marginTop: "28px",
            fontSize: "28px",
            fontFamily: "sans-serif",
            color: KIVO.muted,
            lineHeight: 1.5,
            maxWidth: "820px",
            display: "flex",
          }}
        >
          High-performance websites on Next.js and headless WordPress, built to generate leads.
        </div>

        {/* Bottom badge */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            right: "80px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 24px",
            background: KIVO.raised,
            border: `1px solid ${KIVO.lineStrong}`,
            borderRadius: "12px",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: KIVO.accent,
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: "20px",
              color: KIVO.muted,
              fontFamily: "monospace",
              display: "flex",
            }}
          >
            driftpilot.ca
          </div>
        </div>
      </div>
    ),
    size,
  );
}
