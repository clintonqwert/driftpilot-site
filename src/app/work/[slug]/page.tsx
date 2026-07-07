import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { breadcrumbSchema, buildMetadata, caseStudySchema } from '@/lib/seo';
import { JsonLd } from '@/components/shared/JsonLd';
import { PageHero } from '@/components/shared/PageHero';
import { CTABand } from '@/components/shared/CTABand';
import { getAllCaseStudies, getCaseStudyBySlug } from '@/lib/content/case-studies';
import { getServiceBySlug } from '@/lib/content/services';
import { TechPill } from '@/components/shared/TechPill';

export async function generateStaticParams() {
  const studies = await getAllCaseStudies();
  return studies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata(
  props: PageProps<'/work/[slug]'>,
): Promise<Metadata> {
  const { slug } = await props.params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) return {};
  return buildMetadata({
    title: `${study.headline} — Driftpilot Work`,
    description: `${study.stat} for a ${study.industry} client — ${study.methodology}.`,
    path: `/work/${study.slug}`,
  });
}

export default async function CaseStudyPage(props: PageProps<'/work/[slug]'>) {
  const { slug } = await props.params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) notFound();

  const service = getServiceBySlug(study.service);

  return (
    <main>
      <JsonLd schema={caseStudySchema(study)} />
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Work', path: '/work' },
          { name: study.headline, path: `/work/${study.slug}` },
        ])}
      />

      <PageHero
        eyebrow={`${study.industry} · ${study.service.replace(/-/g, ' ')}`}
        heading={study.headline}
        subheading={`${study.stat} in ${study.timeframe}`}
      />

      {/* The challenge */}
      <section className="bg-surface py-16 md:py-24" aria-labelledby="challenge-heading">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <div className="max-w-3xl">
            <h2
              id="challenge-heading"
              className="text-2xl font-semibold tracking-tight text-fg mb-4"
            >
              The challenge.
            </h2>
            <p className="text-base leading-relaxed text-muted">{study.problem}</p>
          </div>
        </div>
      </section>

      {/* The build */}
      <section className="bg-raised py-16 md:py-24" aria-labelledby="build-heading">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <div className="max-w-3xl">
            <h2
              id="build-heading"
              className="text-2xl font-semibold tracking-tight text-fg mb-4"
            >
              The build.
            </h2>
            <p className="text-base leading-relaxed text-muted">{study.build}</p>
            {service && (
              <p className="mt-4 text-sm text-muted">
                Built with our{' '}
                <Link
                  href={`/services/${service.slug}`}
                  className="font-medium text-accent hover:text-accent-hover underline-offset-4 hover:underline transition-colors"
                >
                  {service.name}
                </Link>{' '}
                service.
              </p>
            )}
            {study.technologies.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {study.technologies.map((tech) => (
                  <TechPill key={tech} tech={tech} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* The result */}
      <section className="bg-surface py-16 md:py-24" aria-labelledby="result-heading">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <div className="max-w-3xl">
            <h2
              id="result-heading"
              className="text-2xl font-semibold tracking-tight text-fg mb-8"
            >
              The result.
            </h2>
            <div className="rounded-lg border border-accent/30 bg-accent/10 p-8 md:p-10 mb-8">
              <p className="font-mono text-4xl md:text-5xl font-semibold text-accent tabular-nums">
                {study.stat}
              </p>
              <p className="mt-2 text-sm text-muted font-mono uppercase tracking-[0.1em]">
                in {study.timeframe}
              </p>
            </div>
            <p className="text-base leading-relaxed text-muted">{study.result}</p>
          </div>
        </div>
      </section>

      {/* Where it stands now */}
      {(study.status ?? study.futureDirection) && (
        <section className="bg-raised py-16 md:py-24 border-t border-line" aria-labelledby="status-heading">
          <div className="mx-auto max-w-container px-5 md:px-8">
            <h2
              id="status-heading"
              className="text-2xl font-semibold tracking-tight text-fg mb-8"
            >
              Where it stands now.
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl">
              {study.status && (
                <div className="rounded-lg border border-line bg-surface p-6 md:p-8">
                  <p className="text-[13px] font-mono font-medium uppercase tracking-[0.14em] text-accent mb-3">
                    Current status
                  </p>
                  <p className="text-base leading-relaxed text-muted">{study.status}</p>
                </div>
              )}
              {study.futureDirection && (
                <div className="rounded-lg border border-line bg-surface p-6 md:p-8">
                  <p className="text-[13px] font-mono font-medium uppercase tracking-[0.14em] text-accent mb-3">
                    What&apos;s next
                  </p>
                  <p className="text-base leading-relaxed text-muted">{study.futureDirection}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <CTABand
        headline="Want results like this?"
        primaryCTA={{ label: "Let's build something similar", href: '/contact' }}
        secondaryCTA={{ label: 'See transparent pricing', href: '/pricing' }}
      />
    </main>
  );
}
