import type { Metadata } from "next";
import Link from "next/link";
import { getAllTags, getArticlesByTag } from "@/lib/content/articles";
import { buildMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ tag }));
}

export async function generateMetadata(
  props: PageProps<"/insights/tag/[tag]">,
): Promise<Metadata> {
  const { tag } = await props.params;
  return buildMetadata({
    title: `${tag} — Driftpilot Insights`,
    description: `Articles tagged "${tag}" from the Driftpilot team.`,
    path: `/insights/tag/${tag}`,
  });
}

export default async function TagPage(
  props: PageProps<"/insights/tag/[tag]">,
) {
  const { tag } = await props.params;
  const articles = await getArticlesByTag(tag);

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-16 md:px-8 md:py-24">
      <h1 className="text-4xl font-semibold tracking-tight">
        Tagged: {tag}
      </h1>
      <ul className="mt-8 space-y-4">
        {articles.map((article) => (
          <li key={article.slug}>
            <Link
              href={`/insights/${article.slug}`}
              className="text-lg underline-offset-4 hover:underline"
            >
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
