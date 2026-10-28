interface BrandMarkProps {
  size?: number;
  className?: string;
  /** Animate the mark (used in the preloader). */
  spin?: boolean;
}

/**
 * catmimi brand mark — the faceted violet diamond from the favicon,
 * rebuilt as inline SVG with a luminous gradient.
 */
export function BrandMark({ size = 28, className = '', spin = false }: BrandMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${spin ? 'animate-[preloader-logo_2.4s_cubic-bezier(0.65,0,0.35,1)_infinite]' : ''} ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cm-mark" x1="4" y1="2" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#c9a4ff" />
          <stop offset="45%" stopColor="#863bff" />
          <stop offset="100%" stopColor="#5b21b6" />
        </linearGradient>
        <linearGradient id="cm-mark-rim" x1="24" y1="0" x2="24" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <path
        d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z"
        fill="url(#cm-mark)"
      />
      <path
        d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237"
        stroke="url(#cm-mark-rim)"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  );
}

/** Wordmark with the rotating sparkle accent. */
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-1.5 font-display tracking-tight ${className}`}>
      <span className="text-[1.35em] leading-none font-medium">catmimi</span>
      <span
        className="text-accent inline-block leading-none transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-180 group-hover:scale-125"
        style={{ fontSize: '1.05em' }}
        aria-hidden="true"
      >
        ✳︎
      </span>
    </span>
  );
}
