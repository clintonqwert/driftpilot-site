import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/shared/JsonLd';
import { PageHero } from '@/components/shared/PageHero';
import { CTABand } from '@/components/shared/CTABand';
import { ArticleCard } from '@/components/shared/ArticleCard';
import {
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
} from '@/lib/content/articles';
import { articleSchema, breadcrumbSchema, buildMetadata } from '@/lib/seo';

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata(
  props: PageProps<'/insights/[slug]'>,
): Promise<Metadata> {
  const { slug } = await props.params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return buildMetadata({
    title: `${article.title} — Driftpilot Insights`,
    description: article.description,
    path: `/insights/${article.slug}`,
  });
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** Maps each topic to the service the article ultimately supports. */
const topicServiceMap: Record<string, { label: string; href: string }> = {
  'Headless WordPress': { label: 'Explore Headless WordPress', href: '/services/headless-wordpress' },
  'Next.js': { label: 'Explore Next.js Development', href: '/services/nextjs-development' },
  'Lead Generation': { label: 'Explore Lead Generation Systems', href: '/services/lead-generation-systems' },
};

export default async function ArticlePage(props: PageProps<'/insights/[slug]'>) {
  const { slug } = await props.params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const [related] = await Promise.all([getRelatedArticles(slug, 2)]);
  const paragraphs = article.body.split('\n\n').filter(Boolean);
  const serviceCTA = topicServiceMap[article.topic];

  return (
    <main>
      <JsonLd schema={articleSchema(article)} />
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Insights', path: '/insights' },
          { name: article.title, path: `/insights/${article.slug}` },
        ])}
      />

      <PageHero
        eyebrow={article.topic}
        heading={article.title}
        subheading={article.description}
      />

      {/* Meta bar */}
      <div className="bg-surface border-b border-line">
        <div className="mx-auto max-w-container px-5 md:px-8 py-4 flex flex-wrap items-center gap-4">
          <time dateTime={article.publishedAt} className="text-sm text-muted">
            {formatDate(article.publishedAt)}
          </time>
          <div className="flex flex-wrap gap-1.5">
            {article.tags.map((tag) => (
              <Link
                key={tag}
                href={`/insights/tag/${encodeURIComponent(tag)}`}
                className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-raised border border-line text-muted hover:text-fg hover:border-line-strong transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Article body */}
      <section className="bg-surface py-12 md:py-16" aria-label="Article content">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <div className="max-w-3xl flex flex-col gap-5">
            {paragraphs.map((para, i) => (
              <p key={i} className="text-base leading-[1.85] text-fg">
                {para}
              </p>
            ))}
          </div>

          {/* Keep reading — curated internal links */}
          {article.related && article.related.length > 0 && (
            <aside
              className="mt-12 max-w-3xl rounded-lg border border-line bg-raised p-6 md:p-8"
              aria-labelledby="keep-reading-heading"
            >
              <h2
                id="keep-reading-heading"
                className="text-[13px] font-mono font-medium uppercase tracking-[0.14em] text-accent"
              >
                Keep reading
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {article.related.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-base font-medium text-fg hover:text-accent transition-colors underline-offset-4 hover:underline"
                    >
                      {link.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="bg-surface py-12 md:py-16 border-t border-line" aria-labelledby="related-heading">
          <div className="mx-auto max-w-container px-5 md:px-8">
            <h2 id="related-heading" className="text-2xl font-semibold tracking-tight text-fg mb-8">
              More on this topic.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
              {related.map((rel) => (
                <ArticleCard key={rel.slug} article={rel} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand
        {...(serviceCTA && { secondaryCTA: serviceCTA })}
      />
    </main>
  );
}
