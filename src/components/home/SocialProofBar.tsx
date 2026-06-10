const stats = [
  { figure: 'Rebuilt in 6 days.', label: 'Home services client' },
  { figure: '47% more leads in 90 days.', label: 'Lead generation project' },
  { figure: 'Lighthouse 98 on every delivery.', label: 'Performance guarantee' },
  { figure: '$0 in platform fees.', label: 'You own your infrastructure.' },
];

export function SocialProofBar() {
  return (
    <section className="bg-ink-50 border-y border-ink-100" aria-label="Social proof statistics">
      <div className="mx-auto max-w-container px-5 md:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-ink-200">
          {stats.map((stat) => (
            <div key={stat.figure} className="flex flex-col gap-1 md:px-8 first:md:pl-0 last:md:pr-0">
              <p className="text-lg font-semibold text-ink-900 leading-snug tabular-nums">
                {stat.figure}
              </p>
              <p className="text-sm text-ink-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
