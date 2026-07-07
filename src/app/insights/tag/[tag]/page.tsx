import type { Metadata } from "next";
import Link from "next/link";
import { getAllTags, getArticlesByTag } from "@/lib/content/articles";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/PageHero";
import { CTABand } from "@/components/shared/CTABand";
import { ArticleCard } from "@/components/shared/ArticleCard";

// All tags are known at build time — unknown tag URLs must 404, not
// render thin "0 articles" pages (soft-404 SEO surface).
export const dynamicParams = false;

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ tag }));
}

export async function generateMetadata(
  props: PageProps<"/insights/tag/[tag]">,
): Promise<Metadata> {
  const tag = decodeURIComponent((await props.params).tag);
  return buildMetadata({
    title: `${tag} — Driftpilot Insights`,
    description: `Articles on ${tag} from the Driftpilot team — practical guides on performance, conversion, and modern web development.`,
    path: `/insights/tag/${encodeURIComponent(tag)}`,
  });
}

export default async function TagPage(
  props: PageProps<"/insights/tag/[tag]">,
) {
  const tag = decodeURIComponent((await props.params).tag);
  const articles = await getArticlesByTag(tag);
  if (articles.length === 0) notFound();

  return (
    <main>
      <PageHero
        eyebrow="Topic"
        heading={`${tag}.`}
        subheading={`${articles.length} ${articles.length === 1 ? "article" : "articles"} on ${tag} — written from real project work.`}
      />

      <section className="bg-surface py-16 md:py-24" aria-labelledby="tag-articles-heading">
        <h2 id="tag-articles-heading" className="sr-only">Articles tagged {tag}</h2>
        <div className="mx-auto max-w-container px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/insights"
              className="text-sm font-medium text-accent hover:text-accent-hover underline-offset-4 hover:underline transition-colors"
            >
              ← All insights
            </Link>
          </div>
        </div>
      </section>

      <CTABand />
    </main>
  );
}
