import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles } from "@/lib/content/articles";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Insights — Driftpilot",
  description:
    "Practical thinking on AI web development, headless WordPress, Next.js, and lead generation.",
  path: "/insights",
});

export default async function InsightsPage() {
  const articles = await getAllArticles();
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-16 md:px-8 md:py-24">
      <h1 className="text-4xl font-semibold tracking-tight">Insights</h1>
      {articles.length === 0 ? (
        <p className="mt-8 text-zinc-600">First articles are on the way.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {articles.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/insights/${article.slug}`}
                className="text-lg underline-offset-4 hover:underline"
              >
                {article.title}
              </Link>
              <p className="text-zinc-600">{article.description}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
