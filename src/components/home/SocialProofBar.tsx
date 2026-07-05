const stats = [
  { figure: 'Rebuilt in 6 days.', label: 'Home services client' },
  { figure: '47% more leads in 90 days.', label: 'Lead generation project' },
  { figure: 'Lighthouse 98 on every delivery.', label: 'Performance guarantee' },
  { figure: '$0 in platform fees.', label: 'You own your infrastructure.' },
];

function StatItem({ figure, label }: { figure: string; label: string }) {
  return (
    <div className="flex shrink-0 flex-col gap-1">
      <p className="text-lg font-semibold text-fg leading-snug tabular-nums whitespace-nowrap">
        {figure}
      </p>
      <p className="text-sm text-muted whitespace-nowrap">{label}</p>
    </div>
  );
}

export function SocialProofBar() {
  return (
    <section
      className="bg-raised border-y border-line overflow-hidden"
      aria-label="Social proof statistics"
    >
      <div className="py-10">
        {/* Infinite marquee (Kivo motion language). The list is duplicated for
            a seamless -50% loop; the clone is decorative. Reduced motion gets
            a static centered row instead. */}
        <div className="flex w-max gap-14 md:gap-20 px-7 md:px-10 motion-safe:animate-[marquee_36s_linear_infinite] motion-safe:hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center">
          {stats.map((stat) => (
            <StatItem key={stat.figure} {...stat} />
          ))}
          <div aria-hidden="true" className="contents motion-reduce:hidden">
            {stats.map((stat) => (
              <StatItem key={`clone-${stat.figure}`} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
