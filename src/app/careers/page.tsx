import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Working at Driftpilot — Stack, Culture & Vision",
  description: "Our stack, how we work, and what Driftpilot is building next.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-16 md:px-8 md:py-24">
      <h1 className="text-4xl font-semibold tracking-tight">Working at Driftpilot</h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-600">
        Content lands during the page build phase.
      </p>
    </main>
  );
}
