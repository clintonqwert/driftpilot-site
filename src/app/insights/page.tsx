import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/shared/PageHero';
import { CTABand } from '@/components/shared/CTABand';
import { getAllArticles } from '@/lib/content/articles';

export const metadata: Metadata = buildMetadata({
  title: 'Insights — Driftpilot',
  description:
    'Practical thinking on web performance, conversion, headless WordPress, and Next.js development.',
  path: '/insights',
});

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function InsightsPage() {
  const articles = await getAllArticles();

  return (
    <main>
      <PageHero
        eyebrow="Blog"
        heading="Insights."
        subheading="Thinking on web performance, conversion, and modern development."
      />

      <section className="bg-white py-16 md:py-24" aria-labelledby="articles-heading">
        <h2 id="articles-heading" className="sr-only">Articles</h2>
        <div className="mx-auto max-w-container px-5 md:px-8">
          {articles.length === 0 ? (
            <div className="rounded-2xl border border-ink-200 bg-ink-50 p-8 md:p-10 max-w-xl">
              <p className="text-base font-semibold text-ink-900">First articles are on the way.</p>
              <p className="mt-2 text-sm text-ink-500">
                In the meantime,{' '}
                <Link href="/how-we-work" className="text-brand-600 hover:text-brand-700 underline-offset-4 hover:underline">
                  see how we work
                </Link>{' '}
                or{' '}
                <Link href="/contact" className="text-brand-600 hover:text-brand-700 underline-offset-4 hover:underline">
                  book a scope call
                </Link>.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/insights/${article.slug}`}
                  className="group block rounded-2xl border border-ink-200 bg-white p-6 shadow-xs transition-all duration-200 hover:shadow-md hover:border-ink-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
                >
                  <p className="text-[11px] font-mono font-medium uppercase tracking-[0.1em] text-brand-600 mb-3">
                    {article.topic}
                  </p>
                  <h3 className="text-base font-semibold text-ink-900 leading-snug group-hover:underline underline-offset-2">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500 line-clamp-2">
                    {article.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-ink-50 border border-ink-200 text-ink-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-ink-400">{formatDate(article.publishedAt)}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTABand />
    </main>
  );
}
