import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/shared/JsonLd';
import { PageHero } from '@/components/shared/PageHero';
import { FAQSection } from '@/components/shared/FAQSection';
import { CTABand } from '@/components/shared/CTABand';
import Link from 'next/link';
import { getAllServices, getServiceBySlug } from '@/lib/content/services';
import { getAllCaseStudies } from '@/lib/content/case-studies';
import { getArticlesByTag } from '@/lib/content/articles';
import { ArticleCard } from '@/components/shared/ArticleCard';
import { PricingStrip } from '@/components/shared/PricingStrip';
import { breadcrumbSchema, buildMetadata, serviceSchema } from '@/lib/seo';
import type { ServiceSlug } from '@/types/content';

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

/** Maps each service to the article tag that covers it. */
const serviceTagMap: Record<ServiceSlug, string> = {
  'ai-website-development': 'Next.js',
  'headless-wordpress': 'WordPress',
  'nextjs-development': 'Next.js',
  'lead-generation-systems': 'Lead Generation',
};

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

  const [allStudies, relatedArticles] = await Promise.all([
    getAllCaseStudies(),
    getArticlesByTag(serviceTagMap[service.slug]),
  ]);
  const relatedStudy = allStudies.find((study) => study.service === service.slug);
  const reading = relatedArticles.slice(0, 2);

  const hasBenefits = service.benefits && service.benefits.length > 0;
  const hasDeliverables = service.deliverables && service.deliverables.length > 0;
  const hasFaq = service.pageFaq && service.pageFaq.length > 0;

  return (
    <main>
      <JsonLd schema={serviceSchema(service)} />
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Services', path: '/services' },
          { name: service.name, path: `/services/${service.slug}` },
        ])}
      />

      <PageHero
        eyebrow="Service"
        heading={service.name}
        subheading={service.description}
      />

      {/* Benefits + Deliverables */}
      {(hasBenefits || hasDeliverables) && (
        <section className="bg-raised py-16 md:py-24" aria-labelledby="what-you-get-heading">
          <div className="mx-auto max-w-container px-5 md:px-8">
            <h2
              id="what-you-get-heading"
              className="text-3xl md:text-[2.5rem] font-semibold tracking-tight leading-[1.1] text-fg mb-10"
            >
              What you get.
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Benefits */}
              {hasBenefits && (
                <div className="rounded-lg border border-line bg-raised p-6 md:p-8">
                  <h3 className="text-lg font-semibold text-fg mb-5">Why it matters</h3>
                  <ul className="flex flex-col gap-4">
                    {service.benefits!.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          aria-hidden="true"
                          className="shrink-0 mt-0.5 text-accent"
                        >
                          <path
                            d="M4 10l4 4 8-8"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-base leading-relaxed text-fg">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Deliverables */}
              {hasDeliverables && (
                <div className="rounded-lg border border-line bg-raised p-6 md:p-8">
                  <h3 className="text-lg font-semibold text-fg mb-5">{"What's included"}</h3>
                  <ul className="flex flex-col gap-3">
                    {service.deliverables!.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-base text-fg">
                        <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-accent/100" aria-hidden="true" />
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
      <section className="bg-surface py-16 md:py-24" aria-labelledby="approach-heading">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <h2
            id="approach-heading"
            className="text-3xl md:text-[2.5rem] font-semibold tracking-tight leading-[1.1] text-fg mb-10"
          >
            How we work.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {processSteps.map((step) => (
              <div
                key={step.number}
                className="rounded-lg border border-line bg-raised p-6 md:p-8"
              >
                <span className="font-mono text-3xl font-semibold text-accent tabular-nums">
                  {step.number}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-fg">{step.heading}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related work */}
      {relatedStudy && (
        <section className="bg-raised py-16 md:py-24 border-t border-line" aria-labelledby="related-work-heading">
          <div className="mx-auto max-w-container px-5 md:px-8">
            <h2
              id="related-work-heading"
              className="text-2xl font-semibold tracking-tight text-fg mb-8"
            >
              This service, in the wild.
            </h2>
            <Link
              href={`/work/${relatedStudy.slug}`}
              className="group block max-w-3xl rounded-lg border border-line bg-surface p-6 md:p-8 transition-all duration-200 hover:border-line-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <p className="font-mono text-2xl md:text-3xl font-semibold text-accent tabular-nums">
                {relatedStudy.stat}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-fg leading-snug group-hover:underline underline-offset-2">
                {relatedStudy.headline}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-2">
                {relatedStudy.methodology}
              </p>
              <p className="mt-4 text-sm font-medium text-accent">Read the case study →</p>
            </Link>
          </div>
        </section>
      )}

      {/* Related reading */}
      {reading.length > 0 && (
        <section className="bg-surface py-16 md:py-24" aria-labelledby="related-reading-heading">
          <div className="mx-auto max-w-container px-5 md:px-8">
            <h2
              id="related-reading-heading"
              className="text-2xl font-semibold tracking-tight text-fg mb-8"
            >
              Related reading.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
              {reading.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      <PricingStrip />

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
