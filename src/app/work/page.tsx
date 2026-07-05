import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/shared/PageHero';
import { CTABand } from '@/components/shared/CTABand';
import { getAllCaseStudies } from '@/lib/content/case-studies';

export const metadata: Metadata = buildMetadata({
  title: 'Work — Driftpilot',
  description:
    'Case studies: measurable outcomes from web development and lead generation systems.',
  path: '/work',
});

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

export default async function WorkPage() {
  const studies = await getAllCaseStudies();
  const [featured, ...grid] = studies;

  return (
    <main>
      <PageHero
        eyebrow="Case studies"
        heading="The work."
        subheading="We measure success in outcomes, not aesthetics."
      />

      <section className="bg-surface py-16 md:py-24" aria-labelledby="work-grid-heading">
        <h2 id="work-grid-heading" className="sr-only">Case studies</h2>
        <div className="mx-auto max-w-container px-5 md:px-8">

          {/* Featured */}
          {featured ? (
            <div className="rounded-lg border border-line bg-raised p-8 md:p-10 mb-8">
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="text-[11px] font-mono font-medium uppercase tracking-[0.1em] px-2.5 py-1 rounded-md bg-raised border border-line text-muted">
                  {featured.industry}
                </span>
                <span className="text-[11px] font-mono font-medium uppercase tracking-[0.1em] px-2.5 py-1 rounded-md bg-raised border border-line text-muted">
                  {featured.service.replace(/-/g, ' ')}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-fg max-w-2xl leading-snug">
                {featured.headline}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted max-w-prose">
                {featured.methodology}. {featured.result}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {featured.technologies.map((tech) => (
                  <TechPill key={tech} tech={tech} />
                ))}
              </div>
              <Link
                href={`/work/${featured.slug}`}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover underline-offset-4 hover:underline transition-colors"
              >
                Read the full case study
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          ) : (
            <div className="rounded-lg border border-line bg-raised p-8 md:p-10 mb-8">
              <p className="text-muted text-base">
                Our first case studies are in progress.{' '}
                <Link href="/how-we-work" className="text-accent hover:text-accent-hover underline-offset-4 hover:underline">
                  See how we work →
                </Link>
              </p>
            </div>
          )}

          {/* Grid */}
          {grid.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {grid.map((study) => (
                <Link
                  key={study.slug}
                  href={`/work/${study.slug}`}
                  className="group block rounded-lg p-6 md:p-8 bg-raised border border-line transition-all duration-200  hover:border-line-strong hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <p className="font-mono text-2xl md:text-3xl font-semibold text-fg tabular-nums">
                    {study.stat}
                  </p>
                  <h3 className="mt-2 text-base font-semibold text-fg group-hover:underline underline-offset-2 leading-snug">
                    {study.headline}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-2">
                    {study.methodology}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {study.technologies.map((tech) => (
                      <TechPill key={tech} tech={tech} />
                    ))}
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent group-hover:text-accent-hover transition-colors">
                    Read case study
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTABand
        headline="Ready to be the next case study?"
        primaryCTA={{ label: 'Book a Scope Call', href: '/contact' }}
        secondaryCTA={{ label: 'See how we work', href: '/how-we-work' }}
      />
    </main>
  );
}
