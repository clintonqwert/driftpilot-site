import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="bg-ink-950 text-ink-300 -mt-16 pt-28 pb-16 md:pt-40 md:pb-28">
      <div className="mx-auto max-w-container px-5 md:px-8">
        <div className="max-w-[720px] mx-auto text-center">
          <p
            className="text-[13px] font-mono font-medium uppercase tracking-[0.14em] text-brand-400 motion-safe:animate-[fadeUp_0.5s_ease-out_both]"
            style={{ animationDelay: '0ms' }}
          >
            Web Development Studio
          </p>

          <h1
            className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] text-white text-balance motion-safe:animate-[fadeUp_0.5s_ease-out_both]"
            style={{ animationDelay: '100ms' }}
          >
            Your next website should generate leads before it finishes loading.
          </h1>

          <p
            className="mt-6 max-w-xl mx-auto text-lg md:text-xl leading-relaxed text-ink-300 motion-safe:animate-[fadeUp_0.5s_ease-out_both]"
            style={{ animationDelay: '200ms' }}
          >
            We build production-ready Next.js and headless WordPress sites in 2–4 weeks — with lead generation systems built in from day one.
          </p>

          <div
            className="mt-8 flex flex-col sm:flex-row gap-3 justify-center motion-safe:animate-[fadeUp_0.5s_ease-out_both]"
            style={{ animationDelay: '300ms' }}
          >
            <Link
              href="/contact"
              aria-label="Book a free scope call with Driftpilot"
              className="inline-flex items-center justify-center gap-2 h-13 px-7 w-full sm:w-auto rounded-lg bg-brand-600 text-white text-base font-semibold transition-colors duration-150 hover:bg-brand-700 active:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 shadow-brand"
            >
              Book a Free Scope Call
            </Link>
            <Link
              href="/work"
              aria-label="See Driftpilot case studies"
              className="inline-flex items-center justify-center gap-2 h-13 px-7 w-full sm:w-auto rounded-lg bg-white/10 text-white border border-white/15 text-base font-semibold transition-colors duration-150 hover:bg-white/15 active:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            >
              See How We Build →
            </Link>
          </div>

          <p
            className="mt-10 font-mono text-sm tabular-nums text-brand-400 motion-safe:animate-[fadeUp_0.5s_ease-out_both]"
            style={{ animationDelay: '400ms' }}
            aria-label="This site scores 98 on Lighthouse with LCP of 0.9 seconds and was delivered in 9 days"
          >
            Lighthouse 98 · LCP 0.9s · Delivered in 9 days
          </p>
        </div>
      </div>
    </section>
  );
}
