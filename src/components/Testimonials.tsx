import { SectionHeading } from './SectionHeading';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
  gradient: string;
}

const rowOne: Testimonial[] = [
  {
    quote:
      'catmimi rebuilt our marketing site in five weeks and doubled demo requests. I still don’t fully understand how it was this painless.',
    name: 'Maya Chen',
    role: 'CEO, Orbit AI',
    initials: 'MC',
    gradient: 'linear-gradient(135deg,#863bff,#4c1d95)',
  },
  {
    quote:
      'The 3D product scene they shipped gets screenshot in every single sales call. Worth every cent and then some.',
    name: 'Daniel Okafor',
    role: 'VP Growth, Lumen',
    initials: 'DO',
    gradient: 'linear-gradient(135deg,#22d3ee,#0e7490)',
  },
  {
    quote:
      'Working with them feels like hiring a design agency and a world-class engineering team at the same time.',
    name: 'Sofia Marin',
    role: 'Founder, Kinfolk Coffee',
    initials: 'SM',
    gradient: 'linear-gradient(135deg,#ffd28f,#863bff)',
  },
  {
    quote:
      'M.O.C.H.A turning around copy variants overnight genuinely changed how our launch team plans campaigns.',
    name: 'Arjun Patel',
    role: 'Head of Brand, Nova Health',
    initials: 'AP',
    gradient: 'linear-gradient(135deg,#b794ff,#22d3ee)',
  },
];

const rowTwo: Testimonial[] = [
  {
    quote:
      'Our design system finally made eleven product teams speak the same language. Adoption was instant.',
    name: 'Elena Rossi',
    role: 'CPO, Nova Health',
    initials: 'ER',
    gradient: 'linear-gradient(135deg,#4c1d95,#863bff)',
  },
  {
    quote:
      'Beautiful work is table stakes; they obsess over conversion too. Our checkout is up 38% since launch.',
    name: 'Tom Whitfield',
    role: 'COO, Kinfolk Coffee',
    initials: 'TW',
    gradient: 'linear-gradient(135deg,#0e7490,#22d3ee)',
  },
  {
    quote:
      'The most senior, least precious team we’ve worked with. Sharp opinions, zero ego, flawless delivery.',
    name: 'Priya Nair',
    role: 'Partner, Foundry Ventures',
    initials: 'PN',
    gradient: 'linear-gradient(135deg,#863bff,#22d3ee)',
  },
  {
    quote:
      'They treated our seed-stage budget like a Series B one. The site closed our Series A lead, honestly.',
    name: 'Lucas Berg',
    role: 'Founder, Pulse Analytics',
    initials: 'LB',
    gradient: 'linear-gradient(135deg,#b794ff,#4c1d95)',
  },
];

function QuoteCard({ t }: { t: Testimonial }) {
  return (
    <figure className="glass mx-3 flex w-[330px] shrink-0 flex-col justify-between rounded-[22px] p-6 transition-all duration-500 hover:border-brand/40 hover:shadow-[0_30px_70px_-30px_rgba(134,59,255,0.55)] sm:w-[380px] sm:p-7">
      <div>
        <div className="flex gap-1 text-gold" aria-label="5 out of 5 stars">
          {[...Array(5)].map((_, i) => (
            <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" />
            </svg>
          ))}
        </div>
        <blockquote className="mt-4 text-[14.5px] leading-relaxed text-ink-2">
          &ldquo;{t.quote}&rdquo;
        </blockquote>
      </div>
      <figcaption className="mt-6 flex items-center gap-3">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full text-[12px] font-semibold text-white"
          style={{ background: t.gradient }}
          aria-hidden="true"
        >
          {t.initials}
        </span>
        <span>
          <span className="block text-[14px] font-medium text-ink">{t.name}</span>
          <span className="block text-[12px] text-ink-3">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  return (
    <section aria-label="Testimonials" className="relative overflow-hidden py-28 md:py-36">
      <div className="px-5 sm:px-8 md:px-12">
        <SectionHeading
          eyebrow="Kind words"
          title={
            <>
              Founders keep <span className="text-gradient-brand">coming back.</span>
            </>
          }
          description="Ninety-eight percent of clients return for a second project. Here’s a little of why."
        />
      </div>

      <div className="relative mt-16 space-y-5">
        <div className="marquee-group marquee-mask overflow-hidden">
          <div className="marquee-track" style={{ '--marquee-duration': '58s' } as React.CSSProperties}>
            {[0, 1].map((copy) => (
              <div key={copy} className="flex" aria-hidden={copy === 1}>
                {rowOne.map((t) => (
                  <QuoteCard key={t.name} t={t} />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="marquee-group marquee-mask overflow-hidden">
          <div
            className="marquee-track reverse"
            style={{ '--marquee-duration': '66s' } as React.CSSProperties}
          >
            {[0, 1].map((copy) => (
              <div key={copy} className="flex" aria-hidden={copy === 1}>
                {rowTwo.map((t) => (
                  <QuoteCard key={t.name} t={t} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
