import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Book a Scope Call — Driftpilot",
  description:
    "Tell us about your project. We reply within one business day with next steps.",
  path: "/contact",
});

// ContactForm (components/forms, full variant) renders here in the build
// phase, submitting via lib/actions/submit-contact.ts.
export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-16 md:px-8 md:py-24">
      <h1 className="text-4xl font-semibold tracking-tight">
        Book a Scope Call
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-600">
        The intake form lands with the component build. Until then:{" "}
        <a href="mailto:hello@driftpilot.com" className="underline">
          hello@driftpilot.com
        </a>
      </p>
    </main>
  );
}
