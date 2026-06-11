import Link from 'next/link';
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
    <section className="bg-white py-16 md:py-24" aria-labelledby="faq-heading">
      <JsonLd schema={faqSchema(items)} />
      <div className="mx-auto max-w-container px-5 md:px-8">
        <div className="max-w-2xl mb-10">
          <h2 id="faq-heading" className="text-3xl md:text-[2.5rem] font-semibold tracking-tight leading-[1.1] text-ink-900">
            {heading}
          </h2>
        </div>

        <div className="max-w-3xl flex flex-col divide-y divide-ink-100 border-y border-ink-100">
          {items.map((item, i) => (
            <details
              key={item.question}
              {...(i === 0 ? { open: true } : {})}
              className="group"
            >
              <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none text-left hover:text-ink-900 transition-colors [&::-webkit-details-marker]:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 rounded-sm">
                <h3 className="text-base md:text-lg font-semibold text-ink-900">
                  {item.question}
                </h3>
                <span className="shrink-0 w-6 h-6 flex items-center justify-center text-ink-400 group-open:text-brand-600 transition-colors" aria-hidden="true">
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
              <div className="pb-5 text-base leading-relaxed text-ink-600 max-w-prose motion-safe:animate-[fadeUp_0.2s_ease-out]">
                {item.answer}
              </div>
            </details>
          ))}
        </div>

        {showCTA && (
          <div className="mt-10 text-center">
            <p className="text-ink-500 mb-4">Still have questions? Just ask.</p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-lg bg-brand-600 text-white text-base font-semibold transition-colors duration-150 hover:bg-brand-700 active:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            >
              Book a 30-minute call →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
