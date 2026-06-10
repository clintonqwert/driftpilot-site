import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Pricing — Driftpilot",
  description: "Transparent project pricing for AI-built websites and lead generation systems.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-16 md:px-8 md:py-24">
      <h1 className="text-4xl font-semibold tracking-tight">Pricing</h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-600">
        Content lands during the page build phase.
      </p>
    </main>
  );
}
