import Link from 'next/link';
import type { CaseStudy } from '@/types/content';

interface PortfolioSectionProps {
  featured: CaseStudy | undefined;
  grid: CaseStudy[];
}

const techColors: Record<string, string> = {
  'Next.js': 'bg-ink-900 text-white border-ink-800',
  'TypeScript': 'bg-brand-950 text-brand-300 border-brand-800',
  'Tailwind CSS': 'bg-brand-50 text-brand-700 border-brand-200',
  'Vercel': 'bg-ink-50 text-ink-700 border-ink-200',
  'HubSpot': 'bg-orange-50 text-orange-700 border-orange-200',
  'Headless WP': 'bg-blue-50 text-blue-700 border-blue-200',
};

function TechPill({ tech }: { tech: string }) {
  const cls = techColors[tech] ?? 'bg-ink-50 text-ink-600 border-ink-200';
  return (
    <span className={`inline-block text-[11px] font-mono font-medium px-2.5 py-1 rounded-md border ${cls}`}>
      {tech}
    </span>
  );
}

export function PortfolioSection({ featured, grid }: PortfolioSectionProps) {
  return (
    <section className="bg-white py-16 md:py-24" aria-labelledby="portfolio-heading">
      <div className="mx-auto max-w-container px-5 md:px-8">
        <div className="max-w-2xl mb-10">
          <h2 id="portfolio-heading" className="text-3xl md:text-[2.5rem] font-semibold tracking-tight leading-[1.1] text-ink-900">
            The work.
          </h2>
          <p className="mt-3 text-lg text-ink-500">
            Outcomes first. Technology second. Aesthetics last.
          </p>
        </div>

        {featured ? (
          <div className="rounded-3xl border border-ink-200 bg-ink-50 p-8 md:p-10 mb-8">
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="text-[11px] font-mono font-medium uppercase tracking-[0.1em] px-2.5 py-1 rounded-md bg-white border border-ink-200 text-ink-500">
                {featured.industry}
              </span>
              <span className="text-[11px] font-mono font-medium uppercase tracking-[0.1em] px-2.5 py-1 rounded-md bg-white border border-ink-200 text-ink-500">
                {featured.service.replace(/-/g, ' ')}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-ink-900 max-w-2xl leading-snug">
              {featured.headline}
            </h3>

            <p className="mt-4 text-base leading-relaxed text-ink-600 max-w-prose">
              {featured.methodology}. {featured.result}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {featured.technologies.map((tech) => (
                <TechPill key={tech} tech={tech} />
              ))}
            </div>

            <Link
              href={`/work/${featured.slug}`}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 underline-offset-4 hover:underline transition-colors"
            >
              Read the full case study
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        ) : (
          <div className="rounded-3xl border border-ink-200 bg-ink-50 p-8 md:p-10 mb-8">
            <p className="text-ink-500 text-base">
              Our first case studies are in progress.{' '}
              <Link href="/how-we-work" className="text-brand-600 hover:text-brand-700 underline-offset-4 hover:underline">
                See how we work →
              </Link>
            </p>
          </div>
        )}

        {grid.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {grid.map((study) => (
              <Link
                key={study.slug}
                href={`/work/${study.slug}`}
                className="group block rounded-2xl p-6 bg-white border border-ink-200 shadow-xs transition-all duration-200 hover:shadow-md hover:border-ink-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
              >
                <p className="font-mono text-2xl md:text-3xl font-semibold text-ink-900 tabular-nums">
                  {study.stat}
                </p>
                <h3 className="mt-2 text-base font-semibold text-ink-900 group-hover:underline underline-offset-2 leading-snug">
                  {study.headline}
                </h3>
                <span className="mt-3 text-[11px] font-mono font-medium uppercase tracking-[0.1em] text-ink-500">
                  {study.service.replace(/-/g, ' ')}
                </span>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center">
          <Link
            href="/work"
            className="text-sm font-medium text-brand-600 hover:text-brand-700 underline-offset-4 hover:underline transition-colors"
          >
            See all work →
          </Link>
        </div>
      </div>
    </section>
  );
}
