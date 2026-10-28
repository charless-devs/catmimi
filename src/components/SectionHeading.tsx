interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({ eyebrow, title, description, align = 'center' }: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <header className={`max-w-3xl ${centered ? 'mx-auto text-center' : ''}`}>
      <div
        data-reveal
        className={`flex items-center gap-3 ${centered ? 'justify-center' : ''}`}
      >
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-brand/70" aria-hidden="true" />
        <span className="eyebrow">{eyebrow}</span>
        {centered && (
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-accent/70" aria-hidden="true" />
        )}
      </div>

      <h2
        data-reveal
        style={{ '--reveal-delay': '90ms' } as React.CSSProperties}
        className="mt-5 font-display text-[clamp(32px,5vw,56px)] font-medium text-ink"
      >
        {title}
      </h2>

      {description && (
        <p
          data-reveal
          style={{ '--reveal-delay': '180ms', fontSize: 'clamp(15px,1.6vw,17px)' } as React.CSSProperties}
          className={`mt-5 text-ink-2 ${centered ? 'mx-auto' : ''} max-w-2xl`}
        >
          {description}
        </p>
      )}
    </header>
  );
}
