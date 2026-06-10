import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Thanks — Driftpilot",
  description: "We received your message and will reply within one business day.",
  path: "/thank-you",
});

export default function ThankYouPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-16 md:px-8 md:py-24">
      <h1 className="text-4xl font-semibold tracking-tight">Thank you — we&apos;ll be in touch within one business day.</h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-600">
        Content lands during the page build phase.
      </p>
    </main>
  );
}
