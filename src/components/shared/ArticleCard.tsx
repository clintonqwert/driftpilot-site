import Link from 'next/link';
import type { Article } from '@/types/content';

export function formatArticleDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC', // ISO dates are date-only; render them as written
  });
}

/** Shared article card — used by the insights index, tag pages, and related-posts blocks. */
export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/insights/${article.slug}`}
      className="group block rounded-lg border border-line bg-raised p-6 transition-all duration-200 hover:border-line-strong hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <p className="text-[11px] font-mono font-medium uppercase tracking-[0.1em] text-accent mb-3">
        {article.topic}
      </p>
      <h3 className="text-base font-semibold text-fg leading-snug group-hover:underline underline-offset-2">
        {article.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-2">
        {article.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-overlay border border-line text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="mt-4 text-xs text-muted">{formatArticleDate(article.publishedAt)}</p>
    </Link>
  );
}
