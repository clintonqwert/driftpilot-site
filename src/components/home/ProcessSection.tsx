import Link from 'next/link';

const phases = [
  {
    number: '01',
    name: 'Scope',
    description: 'We get on a 30-minute call, understand your goal, and send a scoping document within 48 hours. You sign off before a line of code is written.',
    timeline: 'Days 1–3',
  },
  {
    number: '02',
    name: 'Build',
    description: 'We build in production from day one — no staging purgatory. You see real work in real time. Weekly check-ins. No email chains.',
    timeline: 'Days 4–21',
  },
  {
    number: '03',
    name: 'Launch & Hand Off',
    description: 'QA pass, performance audit (Lighthouse 95+ required to ship), CMS training, and a 30-day support window. You leave with everything you need to own it.',
    timeline: 'Days 22–28',
  },
];

export function ProcessSection() {
  return (
    <section className="bg-ink-50 py-16 md:py-24" aria-labelledby="process-heading">
      <div className="mx-auto max-w-container px-5 md:px-8">
        <div className="max-w-2xl mb-12">
          <h2 id="process-heading" className="text-3xl md:text-[2.5rem] font-semibold tracking-tight leading-[1.1] text-ink-900">
            From first call to live site.
          </h2>
          <p className="mt-3 text-lg text-ink-500">
            Three phases. No surprises. Typical project: 2–4 weeks to production.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Connecting line (desktop) */}
          <div
            className="hidden md:block absolute top-10 left-[calc(33.333%+1rem)] right-[calc(33.333%+1rem)] h-px bg-ink-200"
            aria-hidden="true"
          />

          {phases.map((phase, i) => (
            <div key={phase.number} className="relative flex flex-col gap-4">
              {/* Mobile connector arrow */}
              {i < phases.length - 1 && (
                <div className="md:hidden flex justify-center py-2" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 3v14M5 13l5 5 5-5" stroke="#CBD5E1" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}

              <div className="bg-white rounded-2xl p-6 md:p-8 border border-ink-200 shadow-xs h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-4xl font-semibold text-ink-100 select-none tabular-nums leading-none">
                    {phase.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-ink-900">
                  {phase.name}
                </h3>
                <p className="mt-1 font-mono text-[13px] font-medium text-brand-600 tracking-[0.05em]">
                  {phase.timeline}
                </p>
                <p className="mt-3 text-base leading-relaxed text-ink-600 flex-1">
                  {phase.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/how-we-work"
            className="text-sm font-medium text-brand-600 hover:text-brand-700 underline-offset-4 hover:underline transition-colors"
          >
            Curious about the details? See exactly how we work →
          </Link>
        </div>
      </div>
    </section>
  );
}
