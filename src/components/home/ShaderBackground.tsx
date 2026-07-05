"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { KIVO } from "@/lib/design-tokens";

// Own async chunk — never part of the route's first-load JS.
const MeshGradient = dynamic(
  () => import("@paper-design/shaders-react").then((m) => m.MeshGradient),
  { ssr: false },
);

function canRenderShader(): boolean {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const canvas = document.createElement("canvas");
  return Boolean(
    canvas.getContext("webgl2") ?? canvas.getContext("webgl"),
  );
}

/**
 * Animated Kivo-palette mesh-gradient backdrop for the homepage hero.
 * The hero-glow layer is the permanent fallback (pre-hydration,
 * reduced-motion, no-WebGL); the shader mounts on idle on top of it.
 */
export function ShaderBackground() {
  const [showShader, setShowShader] = useState(false);

  useEffect(() => {
    const arm = () => setShowShader(canRenderShader());
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(arm, { timeout: 2000 });
      return () => cancelIdleCallback(id);
    }
    const id = setTimeout(arm, 200);
    return () => clearTimeout(id);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 hero-glow" />
      {showShader && (
        <MeshGradient
          className="absolute inset-0 h-full w-full"
          colors={[KIVO.surface, KIVO.raised, KIVO.surface, KIVO.accent, KIVO.line]}
          speed={0.25}
          distortion={0.6}
          swirl={0.4}
        />
      )}
      {/* Scrim: hero text stays AA-contrasted at every animation phase. */}
      <div className="absolute inset-0 bg-black/35" />
    </div>
  );
}
