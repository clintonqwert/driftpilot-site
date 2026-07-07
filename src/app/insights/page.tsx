import type { Metadata } from 'next';
import Link from 'next/link';
import { blogSchema, buildMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/shared/JsonLd';
import { PageHero } from '@/components/shared/PageHero';
import { CTABand } from '@/components/shared/CTABand';
import { ArticleCard } from '@/components/shared/ArticleCard';
import { formatArticleDate } from '@/lib/format';
import { topicTag } from '@/lib/content/taxonomy';
import {
  getAllArticles,
  getAllTopics,
  getFeaturedArticle,
} from '@/lib/content/articles';

export const metadata: Metadata = buildMetadata({
  title: 'Insights — Driftpilot',
  description:
    'Practical thinking on web performance, conversion, headless WordPress, and Next.js development.',
  path: '/insights',
});

export default async function InsightsPage() {
  const [articles, featured, topics] = await Promise.all([
    getAllArticles(),
    getFeaturedArticle(),
    getAllTopics(),
  ]);
  const rest = articles.filter((a) => a.slug !== featured?.slug);

  return (
    <main>
      <PageHero
        eyebrow="Resources"
        heading="Insights."
        subheading="Practical guides on web performance, conversion, and modern development — written for the people who own the outcome, not just the codebase."
      />

      <section className="bg-surface py-16 md:py-24" aria-labelledby="articles-heading">
        <h2 id="articles-heading" className="sr-only">Articles</h2>
        <div className="mx-auto max-w-container px-5 md:px-8">
          {articles.length === 0 ? (
            <div className="rounded-lg border border-line bg-raised p-8 md:p-10 max-w-xl">
              <p className="text-base font-semibold text-fg">First articles are on the way.</p>
              <p className="mt-2 text-sm text-muted">
                In the meantime,{' '}
                <Link href="/process" className="text-accent hover:text-accent-hover underline-offset-4 hover:underline">
                  see our process
                </Link>{' '}
                or{' '}
                <Link href="/contact" className="text-accent hover:text-accent-hover underline-offset-4 hover:underline">
                  book a scope call
                </Link>.
              </p>
            </div>
          ) : (
            <>
              {/* Featured article */}
              {featured && (
                <Link
                  href={`/insights/${featured.slug}`}
                  className="group block rounded-lg border border-line bg-raised p-8 md:p-10 transition-all duration-200 hover:border-line-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="text-[11px] font-mono font-medium uppercase tracking-[0.1em] px-2.5 py-1 rounded-md bg-accent/10 text-accent border border-accent/30">
                      Featured
                    </span>
                    <span className="text-[11px] font-mono font-medium uppercase tracking-[0.1em] px-2.5 py-1 rounded-md bg-overlay border border-line text-muted">
                      {featured.topic}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-fg max-w-2xl leading-snug group-hover:underline underline-offset-4">
                    {featured.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-muted max-w-prose">
                    {featured.description}
                  </p>
                  <p className="mt-5 text-sm font-medium text-accent">
                    Read the article →
                  </p>
                  <p className="mt-2 text-xs text-muted">{formatArticleDate(featured.publishedAt)}</p>
                </Link>
              )}

              {/* Topic navigation */}
              <nav className="mt-10 flex flex-wrap items-center gap-2" aria-label="Browse by topic">
                <span className="text-sm text-muted mr-1">Browse by topic:</span>
                {topics.flatMap((topic) => {
                  const tag = topicTag(topic);
                  if (!tag) return [];
                  return (
                  <Link
                    key={topic}
                    href={`/insights/tag/${encodeURIComponent(tag)}`}
                    className="text-sm font-medium px-3.5 py-1.5 rounded-md bg-raised border border-line text-muted hover:text-fg hover:border-line-strong transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {topic}
                  </Link>
                  );
                })}
              </nav>

              {/* Remaining articles */}
              {rest.length > 0 && (
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <JsonLd schema={blogSchema(articles)} />
      <CTABand
        headline="Want this thinking applied to your site?"
        subhead={'Every article here comes from real project work.\nBook a call and we\'ll talk about your situation, not ours.'}
      />
    </main>
  );
}
