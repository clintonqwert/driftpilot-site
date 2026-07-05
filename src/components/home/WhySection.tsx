const items = [
  {
    number: '01',
    title: 'Speed-native, not speed-flavoured',
    body: 'Most agencies talk about speed. We engineer for it — component scaffolding, accelerated iteration, rigorous testing — which is why we deliver in weeks, not months. The result shows up in your timeline and your Lighthouse score, not our pitch deck.',
  },
  {
    number: '02',
    title: 'We own the outcome, not just the deliverable',
    body: 'The website is only half the job. We wire in the lead capture, the CRM integration, and the analytics from day one — because a site that doesn\'t convert is just an expensive brochure.',
  },
  {
    number: '03',
    title: 'You own your infrastructure',
    body: 'No proprietary CMS you can\'t escape. No platform fees for data you generated. No vendor lock-in dressed up as a feature. The code, the content, the leads — they\'re yours the day we launch.',
  },
  {
    number: '04',
    title: 'Vertical depth, not generalist breadth',
    body: 'We work with SMBs and automotive businesses because we know those problems deeply. Generalist agencies compete on aesthetics. We compete on domain knowledge — and that compounds every engagement.',
  },
];

export function WhySection() {
  return (
    <section className="py-16 md:py-24" aria-labelledby="why-heading">
      <div className="mx-auto max-w-container px-5 md:px-8">
        <div className="max-w-2xl mb-12">
          <h2 id="why-heading" className="text-3xl md:text-[2.5rem] font-semibold tracking-tight leading-[1.1] text-fg">
            Why teams come back.
          </h2>
          <p className="mt-3 text-lg text-muted">
            Not because we&apos;re the cheapest. Because we&apos;re the fastest path from problem to production.
          </p>
        </div>

        <div className="flex flex-col">
          {items.map((item, i) => (
            <div
              key={item.number}
              className={`flex gap-6 md:gap-10 py-8 md:py-10 border-t border-line ${
                i % 2 === 0 ? 'bg-surface' : 'bg-raised'
              } -mx-5 px-5 md:-mx-8 md:px-8`}
            >
              <div className="shrink-0 w-10 md:w-16">
                <span className="font-mono text-3xl md:text-5xl font-semibold text-line-strong select-none tabular-nums">
                  {item.number}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-fg">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted max-w-prose">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
          <div className="border-t border-line -mx-5 md:-mx-8" />
        </div>
      </div>
    </section>
  );
}
