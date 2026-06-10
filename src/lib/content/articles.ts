import type { Article } from "@/types/content";

/**
 * Phase 1 articles placeholder — /insights moves to WPGraphQL in Phase 2.
 * Same swap contract as case-studies.ts: pages only call these accessors.
 */
const articles: Article[] = [];

export async function getAllArticles(): Promise<Article[]> {
  return articles;
}

export async function getArticleBySlug(
  slug: string,
): Promise<Article | undefined> {
  return articles.find((article) => article.slug === slug);
}

export async function getArticlesByTag(tag: string): Promise<Article[]> {
  return articles.filter((article) => article.tags.includes(tag));
}

export async function getAllTags(): Promise<string[]> {
  return [...new Set(articles.flatMap((article) => article.tags))];
}
