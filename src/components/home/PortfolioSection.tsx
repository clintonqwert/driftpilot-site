import Link from 'next/link';
import type { CaseStudy } from '@/types/content';

interface PortfolioSectionProps {
  featured: CaseStudy | undefined;
  grid: CaseStudy[];
}

const techColors: Record<string, string> = {
  'Next.js': 'bg-overlay text-fg border-line-strong',
  'TypeScript': 'bg-accent/10 text-accent border-accent/30',
  'Tailwind CSS': 'bg-overlay text-muted border-line',
  'Vercel': 'bg-overlay text-fg border-line-strong',
  'HubSpot': 'bg-warning/10 text-warning border-warning/30',
  'Headless WP': 'bg-overlay text-muted border-line',
};

function TechPill({ tech }: { tech: string }) {
  const cls = techColors[tech] ?? 'bg-overlay text-muted border-line';
  return (
    <span className={`inline-block text-[11px] font-mono font-medium px-2.5 py-1 rounded-md border ${cls}`}>
      {tech}
    </span>
  );
}

export function PortfolioSection({ featured, grid }: PortfolioSectionProps) {
  return (
    <section className="bg-surface py-16 md:py-24" aria-labelledby="portfolio-heading">
      <div className="mx-auto max-w-container px-5 md:px-8">
        <div className="max-w-2xl mb-10">
          <h2 id="portfolio-heading" className="text-3xl md:text-[2.5rem] font-semibold tracking-tight leading-[1.1] text-fg">
            The work.
          </h2>
          <p className="mt-3 text-lg text-muted">
            Outcomes first. Technology second. Aesthetics last.
          </p>
        </div>

        {featured ? (
          <div className="rounded-lg border border-line bg-raised p-8 md:p-10 mb-8">
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="text-[11px] font-mono font-medium uppercase tracking-[0.1em] px-2.5 py-1 rounded-md bg-overlay border border-line text-muted">
                {featured.industry}
              </span>
              <span className="text-[11px] font-mono font-medium uppercase tracking-[0.1em] px-2.5 py-1 rounded-md bg-overlay border border-line text-muted">
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

        {grid.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {grid.map((study) => (
              <Link
                key={study.slug}
                href={`/work/${study.slug}`}
                className="group block rounded-lg p-6 bg-raised border border-line transition-all duration-300 hover:border-line-strong hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <p className="font-mono text-2xl md:text-3xl font-semibold text-accent tabular-nums">
                  {study.stat}
                </p>
                <h3 className="mt-2 text-base font-semibold text-fg group-hover:underline underline-offset-2 leading-snug">
                  {study.headline}
                </h3>
                <span className="mt-3 text-[11px] font-mono font-medium uppercase tracking-[0.1em] text-muted">
                  {study.service.replace(/-/g, ' ')}
                </span>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center">
          <Link
            href="/work"
            className="text-sm font-medium text-accent hover:text-accent-hover underline-offset-4 hover:underline transition-colors"
          >
            See all work →
          </Link>
        </div>
      </div>
    </section>
  );
}
