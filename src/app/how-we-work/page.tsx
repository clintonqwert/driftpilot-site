import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "How We Work — Driftpilot",
  description: "Our process from scope call to launch: fixed timelines, clear deliverables, no surprises.",
  path: "/how-we-work",
});

export default function HowWeWorkPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-16 md:px-8 md:py-24">
      <h1 className="text-4xl font-semibold tracking-tight">How We Work</h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-600">
        Content lands during the page build phase.
      </p>
    </main>
  );
}
