import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug } from "@/lib/content/articles";
import { articleSchema, buildMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata(
  props: PageProps<"/insights/[slug]">,
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

export default async function ArticlePage(
  props: PageProps<"/insights/[slug]">,
) {
  const { slug } = await props.params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-16 md:px-8 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema(article)),
        }}
      />
      <h1 className="text-4xl font-semibold tracking-tight">
        {article.title}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-600">
        {article.description}
      </p>
    </main>
  );
}
