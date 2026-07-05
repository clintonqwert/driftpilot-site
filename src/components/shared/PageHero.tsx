interface PageHeroProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
}

export function PageHero({ eyebrow, heading, subheading }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-surface pt-28 pb-16 md:pt-40 md:pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 hero-glow" />
      <div className="relative mx-auto max-w-container px-5 md:px-8">
        <div className="max-w-[720px]">
          {eyebrow && (
            <p className="text-[13px] font-mono font-medium uppercase tracking-[0.14em] text-accent mb-4">
              {eyebrow}
            </p>
          )}
          <h1 className="text-display-sm md:text-display font-semibold tracking-tight text-fg text-balance">
            {heading}
          </h1>
          {subheading && (
            <p className="mt-5 text-lg md:text-xl leading-relaxed text-muted max-w-xl">
              {subheading}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
