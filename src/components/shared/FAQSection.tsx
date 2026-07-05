import Link from 'next/link';
import { buttonClasses } from '@/components/ui/button';
import { JsonLd } from '@/components/shared/JsonLd';
import { faqSchema } from '@/lib/seo';
import type { FAQItem } from '@/types/content';

interface FAQSectionProps {
  items: FAQItem[];
  heading?: string;
  showCTA?: boolean;
}

export function FAQSection({ items, heading = 'Questions we get before the first call.', showCTA = true }: FAQSectionProps) {
  return (
    <section className="bg-surface py-16 md:py-24" aria-labelledby="faq-heading">
      <JsonLd schema={faqSchema(items)} />
      <div className="mx-auto max-w-container px-5 md:px-8">
        <div className="max-w-2xl mb-10" data-reveal>
          <h2 id="faq-heading" className="text-3xl md:text-[2.5rem] font-semibold tracking-tight leading-[1.1] text-fg">
            {heading}
          </h2>
        </div>

        <div className="max-w-3xl flex flex-col divide-y divide-line border-y border-line" data-reveal style={{ "--reveal-i": 1 } as React.CSSProperties}>
          {items.map((item, i) => (
            <details
              key={item.question}
              {...(i === 0 ? { open: true } : {})}
              className="group"
            >
              <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none text-left hover:text-fg transition-colors [&::-webkit-details-marker]:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-sm">
                <h3 className="text-base md:text-lg font-semibold text-fg">
                  {item.question}
                </h3>
                <span className="shrink-0 w-6 h-6 flex items-center justify-center text-muted group-open:text-accent transition-colors" aria-hidden="true">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="transition-transform duration-200 group-open:rotate-45"
                  >
                    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                  </svg>
                </span>
              </summary>
              <div className="pb-5 text-base leading-relaxed text-muted max-w-prose motion-safe:animate-[fadeUp_0.2s_ease-out]">
                {item.answer}
              </div>
            </details>
          ))}
        </div>

        {showCTA && (
          <div className="mt-10 text-center">
            <p className="text-muted mb-4">Still have questions? Just ask.</p>
            <Link
              href="/contact"
              className={buttonClasses({ size: 'md' })}
            >
              Book a 30-minute call →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
