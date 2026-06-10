import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Dealership Websites You Own — Driftpilot",
  description:
    "Driftpilot Drive: dealership websites you own, with performance and leads that stay yours.",
  path: "/automotive",
});

// Isolated funnel — links here go to /automotive/early-access, not /contact.
export default function AutomotivePage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-16 md:px-8 md:py-24">
      <h1 className="text-4xl font-semibold tracking-tight">
        Own your website. Own your leads.
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-600">
        Driftpilot Drive is dealership software in the making — websites you
        own, on infrastructure that performs.
      </p>
      <Link
        href="/automotive/early-access"
        className="mt-8 inline-block underline underline-offset-4"
      >
        Join Early Access
      </Link>
    </main>
  );
}
