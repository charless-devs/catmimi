interface MarqueeProps {
  items: string[];
  duration?: number;
  reverse?: boolean;
  className?: string;
}

/**
 * Infinite logo marquee with edge fade. Duplicated content guarantees
 * a seamless loop; pauses on hover.
 */
export function Marquee({ items, duration = 40, reverse = false, className = '' }: MarqueeProps) {
  const row = [...items, ...items];
  return (
    <div className={`marquee-group marquee-mask overflow-hidden ${className}`}>
      <div
        className={`marquee-track ${reverse ? 'reverse' : ''}`}
        style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {row.map((item, i) => (
              <span
                key={`${copy}-${i}`}
                className="mx-7 flex items-center gap-2.5 whitespace-nowrap font-display text-[17px] font-medium tracking-tight text-ink-3 transition-colors duration-300 hover:text-ink sm:mx-10 sm:text-[19px]"
              >
                <span
                  className="h-1.5 w-1.5 rotate-45 rounded-[1px] bg-gradient-to-br from-brand to-accent opacity-70"
                  aria-hidden="true"
                />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
