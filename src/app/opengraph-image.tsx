import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/seo";

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
          background: "#0B1120",
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
            background: "#2563EB",
          }}
        />

        {/* Wordmark */}
        <div
          style={{
            fontSize: "28px",
            fontWeight: 600,
            fontFamily: "sans-serif",
            color: "#60A5FA",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            marginBottom: "32px",
            display: "flex",
          }}
        >
          {SITE_NAME}
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            fontFamily: "sans-serif",
            color: "#FFFFFF",
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
            color: "#94A3B8",
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
            background: "#172554",
            border: "1px solid #1E40AF",
            borderRadius: "12px",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#2563EB",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: "20px",
              color: "#CBD5E1",
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
