import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/shared/JsonLd';
import { PageHero } from '@/components/shared/PageHero';
import { FAQSection } from '@/components/shared/FAQSection';
import { CTABand } from '@/components/shared/CTABand';
import { getAllServices, getServiceBySlug } from '@/lib/content/services';
import { buildMetadata, serviceSchema } from '@/lib/seo';

export function generateStaticParams() {
  return getAllServices().map((service) => ({ slug: service.slug }));
}

export async function generateMetadata(
  props: PageProps<'/services/[slug]'>,
): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${service.slug}`,
  });
}

const processSteps = [
  {
    number: '01',
    heading: 'Scope call',
    body: 'We ask the right questions, align on the outcome metric, and produce a fixed quote within 48 hours.',
  },
  {
    number: '02',
    heading: 'Build',
    body: 'Weekly check-ins, a shared staging environment, and no surprises. You review outcomes, not pull requests.',
  },
  {
    number: '03',
    heading: 'Launch',
    body: 'Production deploy, handoff documentation, and a 30-day support window. You own everything.',
  },
];

export default async function ServicePage(props: PageProps<'/services/[slug]'>) {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const hasBenefits = service.benefits && service.benefits.length > 0;
  const hasDeliverables = service.deliverables && service.deliverables.length > 0;
  const hasFaq = service.pageFaq && service.pageFaq.length > 0;

  return (
    <main>
      <JsonLd schema={serviceSchema(service)} />

      <PageHero
        eyebrow="Service"
        heading={service.name}
        subheading={service.description}
      />

      {/* Benefits + Deliverables */}
      {(hasBenefits || hasDeliverables) && (
        <section className="bg-ink-50 py-16 md:py-24" aria-labelledby="what-you-get-heading">
          <div className="mx-auto max-w-container px-5 md:px-8">
            <h2
              id="what-you-get-heading"
              className="text-3xl md:text-[2.5rem] font-semibold tracking-tight leading-[1.1] text-ink-900 mb-10"
            >
              What you get.
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Benefits */}
              {hasBenefits && (
                <div className="rounded-2xl border border-ink-200 bg-white p-6 md:p-8 shadow-xs">
                  <h3 className="text-lg font-semibold text-ink-900 mb-5">Why it matters</h3>
                  <ul className="flex flex-col gap-4">
                    {service.benefits!.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          aria-hidden="true"
                          className="shrink-0 mt-0.5 text-brand-600"
                        >
                          <path
                            d="M4 10l4 4 8-8"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-base leading-relaxed text-ink-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Deliverables */}
              {hasDeliverables && (
                <div className="rounded-2xl border border-ink-200 bg-white p-6 md:p-8 shadow-xs">
                  <h3 className="text-lg font-semibold text-ink-900 mb-5">{"What's included"}</h3>
                  <ul className="flex flex-col gap-3">
                    {service.deliverables!.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-base text-ink-700">
                        <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-brand-500" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* How we approach it */}
      <section className="bg-white py-16 md:py-24" aria-labelledby="approach-heading">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <h2
            id="approach-heading"
            className="text-3xl md:text-[2.5rem] font-semibold tracking-tight leading-[1.1] text-ink-900 mb-10"
          >
            How we work.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {processSteps.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-ink-100 bg-ink-50 p-6 md:p-8"
              >
                <span className="font-mono text-3xl font-semibold text-brand-600 tabular-nums">
                  {step.number}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-ink-900">{step.heading}</h3>
                <p className="mt-2 text-base leading-relaxed text-ink-600">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {hasFaq && (
        <FAQSection
          items={service.pageFaq!}
          heading={`Questions about ${service.name}.`}
        />
      )}

      <CTABand
        secondaryCTA={{ label: 'See our work', href: '/work' }}
      />
    </main>
  );
}
