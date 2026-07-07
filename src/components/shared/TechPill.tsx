const techColors: Record<string, string> = {
  'Next.js': 'bg-overlay text-fg border-line-strong',
  TypeScript: 'bg-accent/10 text-accent border-accent/30',
  'Tailwind CSS': 'bg-accent/10 text-accent-hover border-accent/30',
  Vercel: 'bg-raised text-fg border-line',
  HubSpot: 'bg-warning/10 text-warning border-warning/30',
  'Headless WP': 'bg-overlay text-muted border-line',
};

/** Shared technology chip — used by the work index and case-study detail pages. */
export function TechPill({ tech }: { tech: string }) {
  const cls = techColors[tech] ?? 'bg-raised text-muted border-line';
  return (
    <span className={`inline-block text-[11px] font-mono font-medium px-2.5 py-1 rounded-md border ${cls}`}>
      {tech}
    </span>
  );
}
