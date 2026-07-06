import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata, caseStudySchema } from '@/lib/seo';
import { JsonLd } from '@/components/shared/JsonLd';
import { PageHero } from '@/components/shared/PageHero';
import { CTABand } from '@/components/shared/CTABand';
import { getAllCaseStudies, getCaseStudyBySlug } from '@/lib/content/case-studies';

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

const techColors: Record<string, string> = {
  'Next.js': 'bg-overlay text-fg border-line-strong',
  TypeScript: 'bg-accent/10 text-accent border-accent/30',
  'Tailwind CSS': 'bg-accent/10 text-accent-hover border-accent/30',
  Vercel: 'bg-raised text-fg border-line',
  HubSpot: 'bg-orange-50 text-orange-700 border-orange-200',
  'Headless WP': 'bg-blue-50 text-blue-700 border-blue-200',
};

function TechPill({ tech }: { tech: string }) {
  const cls = techColors[tech] ?? 'bg-raised text-muted border-line';
  return (
    <span className={`inline-block text-[11px] font-mono font-medium px-2.5 py-1 rounded-md border ${cls}`}>
      {tech}
    </span>
  );
}

export default async function CaseStudyPage(props: PageProps<'/work/[slug]'>) {
  const { slug } = await props.params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) notFound();

  return (
    <main>
      <JsonLd schema={caseStudySchema(study)} />

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

      <CTABand
        headline="Want results like this?"
        primaryCTA={{ label: 'Book a Scope Call', href: '/contact' }}
        secondaryCTA={{ label: 'See more work', href: '/work' }}
      />
    </main>
  );
}
