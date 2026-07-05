import Link from 'next/link';
import { buttonClasses } from '@/components/ui/button';
import { ShaderBackground } from './ShaderBackground';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-surface -mt-16 pt-28 pb-16 md:pt-40 md:pb-28">
      <ShaderBackground />
      <div className="relative z-10 mx-auto max-w-container px-5 md:px-8">
        <div className="max-w-[880px] mx-auto text-center">
          <p
            className="text-[13px] font-mono font-medium uppercase tracking-[0.14em] text-accent motion-safe:animate-[fadeUp_0.5s_ease-out_both]"
            style={{ animationDelay: '0ms' }}
          >
            Web Development Studio
          </p>

          <h1
            className="mt-4 text-display-sm md:text-display lg:text-display-lg font-semibold tracking-tight text-fg text-balance motion-safe:animate-[fadeUp_0.5s_ease-out_both]"
            style={{ animationDelay: '100ms' }}
          >
            Your next website should generate leads before it finishes loading.
          </h1>

          <p
            className="mt-6 max-w-xl mx-auto text-lg md:text-xl leading-relaxed text-muted motion-safe:animate-[fadeUp_0.5s_ease-out_both]"
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
              className={buttonClasses({ size: 'lg', className: 'w-full sm:w-auto' })}
            >
              Book a Free Scope Call
            </Link>
            <Link
              href="/work"
              aria-label="See Driftpilot case studies"
              className={buttonClasses({ variant: 'secondary', size: 'lg', className: 'w-full sm:w-auto' })}
            >
              See How We Build →
            </Link>
          </div>

          <p
            className="mt-10 font-mono text-sm tabular-nums text-accent motion-safe:animate-[fadeUp_0.5s_ease-out_both]"
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
