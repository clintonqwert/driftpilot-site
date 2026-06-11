interface PageHeroProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  dark?: boolean;
}

export function PageHero({ eyebrow, heading, subheading, dark = false }: PageHeroProps) {
  if (dark) {
    return (
      <section className="bg-ink-950 pt-28 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <div className="max-w-[720px]">
            {eyebrow && (
              <p className="text-[13px] font-mono font-medium uppercase tracking-[0.14em] text-brand-400 mb-4">
                {eyebrow}
              </p>
            )}
            <h1 className="text-4xl md:text-[3.25rem] font-semibold tracking-tight leading-[1.05] text-white text-balance">
              {heading}
            </h1>
            {subheading && (
              <p className="mt-5 text-lg md:text-xl leading-relaxed text-ink-300 max-w-xl">
                {subheading}
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white border-b border-ink-100 pt-20 pb-12 md:pt-28 md:pb-16">
      <div className="mx-auto max-w-container px-5 md:px-8">
        <div className="max-w-[680px]">
          {eyebrow && (
            <p className="text-[13px] font-mono font-medium uppercase tracking-[0.14em] text-brand-600 mb-4">
              {eyebrow}
            </p>
          )}
          <h1 className="text-4xl md:text-[3.25rem] font-semibold tracking-tight leading-[1.05] text-ink-900 text-balance">
            {heading}
          </h1>
          {subheading && (
            <p className="mt-5 text-lg md:text-xl leading-relaxed text-ink-500 max-w-xl">
              {subheading}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
