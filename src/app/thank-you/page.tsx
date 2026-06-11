import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: "Thanks — Driftpilot",
  description: "We received your message and will reply within one business day.",
  path: "/thank-you",
});

const steps = [
  {
    number: "01",
    heading: "Confirmation email on its way",
    body: "Check your inbox — we send a confirmation as soon as your message comes through.",
  },
  {
    number: "02",
    heading: "We review your brief",
    body: "We read every submission before replying. Usually within the same business day, sometimes within the hour.",
  },
  {
    number: "03",
    heading: "We book a 30-minute scope call",
    body: "If it looks like a fit, we will send a calendar link so we can ask the right questions and give you an accurate quote.",
  },
];

export default function ThankYouPage() {
  return (
    <main>
      {/* Confirmation */}
      <section className="bg-white py-20 md:py-32" aria-labelledby="thankyou-heading">
        <div className="mx-auto max-w-container px-5 md:px-8 text-center">
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-brand-50">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
              className="text-brand-600"
            >
              <path
                d="M6 16l7 7L26 9"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1
            id="thankyou-heading"
            className="text-4xl md:text-[3rem] font-semibold tracking-tight leading-[1.1] text-ink-900 text-balance"
          >
            {"We've got your message."}
          </h1>
          <p className="mt-5 text-lg md:text-xl leading-relaxed text-ink-500 max-w-xl mx-auto">
            Expect a reply within one business day — usually sooner.
          </p>
        </div>
      </section>

      {/* What happens next */}
      <section className="bg-ink-50 py-16 md:py-24" aria-labelledby="next-steps-heading">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <div className="max-w-2xl mx-auto">
            <h2
              id="next-steps-heading"
              className="text-3xl md:text-[2.5rem] font-semibold tracking-tight leading-[1.1] text-ink-900 mb-10"
            >
              What happens next.
            </h2>
            <div className="flex flex-col gap-8">
              {steps.map((step) => (
                <div key={step.number} className="flex gap-6 items-start">
                  <span className="shrink-0 font-mono text-2xl font-semibold text-brand-600 w-10 tabular-nums">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink-900">{step.heading}</h3>
                    <p className="mt-1.5 text-base leading-relaxed text-ink-600">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Back link */}
      <section className="bg-white py-12 text-center">
        <Link
          href="/"
          className="text-sm font-medium text-brand-600 hover:text-brand-700 underline-offset-4 hover:underline transition-colors"
        >
          ← Back to homepage
        </Link>
      </section>
    </main>
  );
}
