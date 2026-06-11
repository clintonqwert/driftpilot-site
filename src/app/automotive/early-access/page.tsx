import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/shared/PageHero';
import { EarlyAccessForm } from '@/components/forms/EarlyAccessForm';

export const metadata: Metadata = buildMetadata({
  title: 'Driftpilot Drive Early Access — Driftpilot',
  description:
    'Get early access to Driftpilot Drive — dealership websites and lead infrastructure you own.',
  path: '/automotive/early-access',
});

const benefits = [
  {
    heading: "Priority onboarding",
    body: "Early access members move to the front of the queue when we launch. Your site gets built before the waitlist opens.",
  },
  {
    heading: "Locked pricing",
    body: "The price you see at early access is the price you pay — no surprises when public pricing goes live.",
  },
  {
    heading: "Direct input on the product",
    body: "We talk to early access members before making product decisions. Your real-world requirements shape what we build.",
  },
];

export default function EarlyAccessPage() {
  return (
    <main>
      <PageHero
        eyebrow="Early Access"
        heading="Join the Driftpilot Drive waitlist."
        subheading="No commitment. First to know. We will reach out before public launch."
      />

      <section className="bg-ink-50 py-16 md:py-24">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-ink-200 bg-white p-6 md:p-8 shadow-xs">
                <h2 className="text-xl font-semibold text-ink-900 mb-1">Request early access</h2>
                <p className="text-sm text-ink-500 mb-6">Takes 30 seconds. No card required.</p>
                <EarlyAccessForm />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2">
              <h2 className="text-lg font-semibold text-ink-900 mb-6">
                What early access gets you.
              </h2>
              <div className="flex flex-col gap-5">
                {benefits.map((item, i) => (
                  <div key={item.heading} className="flex gap-4 items-start">
                    <span className="shrink-0 font-mono text-xl font-semibold text-brand-600 w-7 tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-ink-900">{item.heading}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-600">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-xl border border-ink-200 bg-white p-4">
                <p className="text-xs text-ink-400 leading-relaxed">
                  Your information is used only to contact you about Driftpilot Drive. We do not share it with anyone.{' '}
                  <a href="/privacy" className="text-brand-600 hover:text-brand-700 underline-offset-2 hover:underline">
                    Privacy policy →
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
