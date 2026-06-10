import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Driftpilot Drive Early Access — Driftpilot",
  description:
    "Get early access to Driftpilot Drive — dealership websites and lead infrastructure you own.",
  path: "/automotive/early-access",
});

// EarlyAccessForm (components/forms) renders here in the build phase,
// submitting via lib/actions/submit-early-access.ts.
export default function EarlyAccessPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-16 md:px-8 md:py-24">
      <h1 className="text-4xl font-semibold tracking-tight">
        Driftpilot Drive — Early Access
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-600">
        Early access signup opens with the form build.
      </p>
    </main>
  );
}
