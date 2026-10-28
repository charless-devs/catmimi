import { SectionHeading } from './SectionHeading';
import { useParallax } from '../hooks/useParallax';
import { useTilt } from '../hooks/useTilt';

const values = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l2.4 5.6L20 10l-4.4 3.4L16.8 19 12 15.9 7.2 19l1.2-5.6L4 10l5.6-1.4L12 3z" />
      </svg>
    ),
    title: 'Craft over clutter',
    body: 'Every pixel earns its place. We subtract until only the essential remains — then make it beautiful.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12L13 2z" />
      </svg>
    ),
    title: 'Speed without shortcuts',
    body: 'Component-driven builds and a design system tuned for velocity. Launch in weeks, not quarters.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
      </svg>
    ),
    title: 'Humans + M.O.C.H.A',
    body: 'Our creative agent handles the repetitive 40%, so the team spends its hours on ideas that move markets.',
  },
];

export function About() {
  const { ref: visualRef, offset } = useParallax<HTMLDivElement>(0.08);
  const tilt = useTilt<HTMLDivElement>({ max: 7, lift: 10 });

  return (
    <section id="about" className="relative overflow-hidden px-5 py-28 sm:px-8 md:px-12 md:py-36">
      {/* Ambient wash */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(134,59,255,0.28), transparent 65%)' }}
      />

      <div className="relative mx-auto grid max-w-[1240px] items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        {/* Copy */}
        <div>
          <SectionHeading
            align="left"
            eyebrow="About the clowder"
            title={
              <>
                A tiny studio with{' '}
                <span className="text-gradient-brand"> outsized taste.</span>
              </>
            }
            description="catmimi is a 12-person creative studio partnering with ambitious founders and product teams. We design brands, websites and interfaces that feel inevitable — and ship them faster than agencies ten times our size."
          />

          <ul className="mt-10 space-y-5">
            {values.map((v, i) => (
              <li
                key={v.title}
                data-reveal="left"
                style={{ '--reveal-delay': `${140 + i * 110}ms` } as React.CSSProperties}
                className="group flex gap-4"
              >
                <span className="glass mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-brand-light transition-all duration-500 group-hover:text-accent group-hover:shadow-[0_0_28px_-6px_rgba(34,211,238,0.55)]">
                  {v.icon}
                </span>
                <div>
                  <h3 className="font-display text-[17px] font-medium text-ink">{v.title}</h3>
                  <p className="mt-1 max-w-md text-[14.5px] leading-relaxed text-ink-2">{v.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Visual — floating portrait of the studio */}
        <div ref={visualRef} data-reveal="scale" className="relative mx-auto w-full max-w-[460px]">
          <div
            className="pointer-events-none absolute -inset-10 rounded-full opacity-60 blur-[90px]"
            aria-hidden="true"
            style={{
              background:
                'radial-gradient(circle at 40% 35%, rgba(134,59,255,0.4), transparent 60%), radial-gradient(circle at 70% 75%, rgba(34,211,238,0.2), transparent 60%)',
            }}
          />

          <div
            ref={tilt.ref}
            onMouseMove={tilt.onMouseMove}
            onMouseLeave={tilt.onMouseLeave}
            className="glass card-3d relative overflow-hidden rounded-[32px] p-6"
            style={{ transform: `translateY(${offset}px)` }}
          >
            {/* Sheen */}
            <span
              className="pointer-events-none absolute inset-x-0 top-0 h-1/2 opacity-60"
              aria-hidden="true"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.09), transparent)',
              }}
            />

            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-[10px]">Studio · EST. 2016</span>
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-brand/80" />
                </span>
              </div>

              {/* The orb — our signature render */}
              <div className="relative mt-5 aspect-[4/3] overflow-hidden rounded-2xl bg-[#08060f]">
                <div
                  className="absolute inset-0"
                  aria-hidden="true"
                  style={{
                    background:
                      'radial-gradient(420px circle at 50% 120%, rgba(134,59,255,0.35), transparent 60%)',
                  }}
                />
                <img
                  src="/orb.png"
                  alt="catmimi signature orb render"
                  className="absolute left-1/2 top-1/2 h-[128%] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_28px_60px_rgba(134,59,255,0.45)]"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    // Graceful fallback if the render is missing
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
                <span
                  className="absolute bottom-3 left-3 rounded-full bg-black/40 px-3 py-1 text-[11px] font-medium text-ink-2 backdrop-blur-md"
                >
                  M.O.C.H.A render · v3.2
                </span>
              </div>

              {/* Floating mini stats */}
              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  { k: '12', l: 'humans' },
                  { k: '9', l: 'timezones' },
                  { k: '∞', l: 'curiosity' },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="rounded-xl border border-white/5 bg-white/[0.03] px-3 py-3 text-center"
                  >
                    <div className="font-display text-[19px] font-medium text-ink">{s.k}</div>
                    <div className="text-[10.5px] uppercase tracking-[0.16em] text-ink-3">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating badge */}
          <div
            className="glass-strong absolute -bottom-6 -left-6 hidden items-center gap-3 rounded-2xl px-4 py-3 sm:flex"
            style={{ animation: 'float-slow 7s ease-in-out infinite' }}
          >
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="absolute h-full w-full rounded-full bg-accent opacity-70" style={{ animation: 'pulse-dot 2s ease-in-out infinite' }} />
            </span>
            <div className="text-[12px] leading-tight">
              <div className="font-medium text-ink">M.O.C.H.A</div>
              <div className="text-ink-3">drafting your brief…</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
