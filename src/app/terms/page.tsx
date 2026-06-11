import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/shared/PageHero';

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Service — Driftpilot',
  description: "Terms governing the use of Driftpilot's website and professional services.",
  path: '/terms',
});

export default function TermsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Legal"
        heading="Terms of Service"
        subheading="Last updated: June 2026"
      />

      <div className="mx-auto max-w-container px-5 md:px-8 py-16 md:py-24">
        <div className="max-w-3xl">
          <div className="flex flex-col gap-10 text-base leading-relaxed text-ink-600">

            <section aria-labelledby="acceptance-heading">
              <h2 id="acceptance-heading" className="text-xl font-semibold text-ink-900 mb-3">Acceptance of terms</h2>
              <p>
                By accessing driftpilot.com or engaging Driftpilot for professional services, you agree to these terms. If you are entering into these terms on behalf of a company or organisation, you represent that you have authority to bind that entity.
              </p>
            </section>

            <section aria-labelledby="services-heading">
              <h2 id="services-heading" className="text-xl font-semibold text-ink-900 mb-3">Services</h2>
              <p>
                Driftpilot provides web development, lead generation, and related digital services. The specific scope, deliverables, timeline, and price for any engagement are defined in a written scope document or proposal agreed upon by both parties before work begins. Services described on this website are illustrative and do not constitute a binding offer.
              </p>
            </section>

            <section aria-labelledby="payment-heading">
              <h2 id="payment-heading" className="text-xl font-semibold text-ink-900 mb-3">Payment</h2>
              <p className="mb-3">
                Unless otherwise agreed in writing:
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-1.5">
                <li>50% of the agreed project fee is due before work begins</li>
                <li>The remaining 50% is due on the agreed launch date or delivery date</li>
                <li>Invoices unpaid after 14 days of the due date may result in work being paused</li>
              </ul>
              <p className="mt-3">
                All prices are in USD unless otherwise stated. Driftpilot does not bill by the hour for project work — pricing is fixed and agreed in advance.
              </p>
            </section>

            <section aria-labelledby="ip-heading">
              <h2 id="ip-heading" className="text-xl font-semibold text-ink-900 mb-3">Intellectual property</h2>
              <p>
                Upon receipt of full payment, all custom code, designs, and content created specifically for your project are transferred to you. Driftpilot retains the right to display completed work in its portfolio unless you request otherwise in writing before the project begins. Third-party libraries, frameworks, and tools used in the build are subject to their respective open-source licences.
              </p>
            </section>

            <section aria-labelledby="revisions-heading">
              <h2 id="revisions-heading" className="text-xl font-semibold text-ink-900 mb-3">Revisions and changes</h2>
              <p>
                The number of included revision rounds is specified in your scope document. Requests for work outside the agreed scope will be quoted separately and require written approval before being undertaken. Driftpilot reserves the right to decline change requests that materially alter the agreed scope after work has begun.
              </p>
            </section>

            <section aria-labelledby="liability-heading">
              <h2 id="liability-heading" className="text-xl font-semibold text-ink-900 mb-3">Limitation of liability</h2>
              <p>
                To the maximum extent permitted by law, Driftpilot&apos;s total liability for any claim arising from its services is limited to the amount paid by you for the specific engagement giving rise to the claim. Driftpilot is not liable for indirect, incidental, or consequential damages including lost revenue, lost data, or business interruption.
              </p>
            </section>

            <section aria-labelledby="law-heading">
              <h2 id="law-heading" className="text-xl font-semibold text-ink-900 mb-3">Governing law</h2>
              <p>
                These terms are governed by the laws of the State of Nevada, United States, without regard to conflict-of-law principles. Any disputes arising under these terms will be resolved in the courts of Nevada.
              </p>
            </section>

            <section aria-labelledby="contact-terms-heading">
              <h2 id="contact-terms-heading" className="text-xl font-semibold text-ink-900 mb-3">Contact</h2>
              <p>
                Questions about these terms? Email us at{' '}
                <a href="mailto:hello@driftpilot.com" className="text-brand-600 hover:text-brand-700 underline-offset-2 hover:underline">hello@driftpilot.com</a>.
              </p>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}
