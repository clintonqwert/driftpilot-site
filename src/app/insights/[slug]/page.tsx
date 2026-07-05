import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/shared/JsonLd';
import { PageHero } from '@/components/shared/PageHero';
import { CTABand } from '@/components/shared/CTABand';
import { getAllArticles, getArticleBySlug } from '@/lib/content/articles';
import { articleSchema, buildMetadata } from '@/lib/seo';

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

export default async function ArticlePage(props: PageProps<'/insights/[slug]'>) {
  const { slug } = await props.params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const paragraphs = article.body.split('\n\n').filter(Boolean);

  return (
    <main>
      <JsonLd schema={articleSchema(article)} />

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
              <span
                key={tag}
                className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-raised border border-line text-muted"
              >
                {tag}
              </span>
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
        </div>
      </section>

      <CTABand />
    </main>
  );
}
