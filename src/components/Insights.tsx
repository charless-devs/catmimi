import { SectionHeading } from './SectionHeading';

interface Article {
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  art: string;
}

const articles: Article[] = [
  {
    category: 'Design',
    title: 'Depth is the new flat: designing interfaces that feel physical',
    excerpt:
      'How layered lighting, refraction and restrained glassmorphism create hierarchy without sacrificing clarity.',
    readTime: '6 min read',
    date: 'Oct 2026',
    art: 'radial-gradient(360px circle at 25% 20%, rgba(134,59,255,0.75), transparent 60%), radial-gradient(300px circle at 80% 85%, rgba(34,211,238,0.4), transparent 60%), linear-gradient(140deg,#150f2c,#06050c)',
  },
  {
    category: 'Engineering',
    title: 'Shipping WebGL that scores 95+ on Lighthouse',
    excerpt:
      'Our performance playbook for 3D heroes: lazy hydration, adaptive DPR, and knowing when to say no to post-processing.',
    readTime: '8 min read',
    date: 'Sep 2026',
    art: 'radial-gradient(340px circle at 75% 25%, rgba(34,211,238,0.65), transparent 60%), radial-gradient(300px circle at 20% 80%, rgba(134,59,255,0.5), transparent 60%), linear-gradient(150deg,#0d1424,#06050c)',
  },
  {
    category: 'Studio',
    title: 'What an AI creative agent actually does all day',
    excerpt:
      'A transparent look at how M.O.C.H.A handles briefs, variants and QA — and the work it will never touch.',
    readTime: '5 min read',
    date: 'Aug 2026',
    art: 'radial-gradient(340px circle at 30% 75%, rgba(255,210,143,0.45), transparent 60%), radial-gradient(320px circle at 80% 20%, rgba(134,59,255,0.6), transparent 60%), linear-gradient(135deg,#1c1226,#0a0815)',
  },
];

export function Insights() {
  return (
    <section id="insights" className="relative px-5 py-28 sm:px-8 md:px-12 md:py-36">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeading
          eyebrow="Insights"
          title={
            <>
              Notes from <span className="text-gradient-brand">the studio floor.</span>
            </>
          }
          description="Process teardowns, performance playbooks and honest opinions about design and the craft of building for the web."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {articles.map((a, i) => (
            <article
              key={a.title}
              data-reveal
              style={{ '--reveal-delay': `${i * 120}ms` } as React.CSSProperties}
            >
              <a
                href="#insights"
                onClick={(e) => e.preventDefault()}
                className="glass card-3d group block h-full overflow-hidden rounded-[24px] transition-all duration-500 hover-target"
              >
                {/* Cover */}
                <div className="relative aspect-[16/9] overflow-hidden" style={{ background: a.art }}>
                  <div
                    className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                    aria-hidden="true"
                  >
                    <span
                      className="absolute left-[55%] top-[30%] h-16 w-16 rounded-xl border border-white/15 backdrop-blur-md transition-transform duration-700 group-hover:rotate-[70deg]"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.16), transparent)',
                        animation: 'float-slow 8s ease-in-out infinite',
                      }}
                    />
                  </div>
                  <div
                    className="absolute inset-0"
                    aria-hidden="true"
                    style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(6,5,12,0.6))' }}
                  />
                  <span className="glass-strong absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-2">
                    {a.category}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-col p-6">
                  <div className="flex items-center gap-3 text-[11.5px] text-ink-3">
                    <span>{a.date}</span>
                    <span className="h-1 w-1 rounded-full bg-white/20" aria-hidden="true" />
                    <span>{a.readTime}</span>
                  </div>
                  <h3 className="mt-3 font-display text-[18px] font-medium leading-snug text-ink transition-colors duration-300 group-hover:text-brand-light">
                    {a.title}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-ink-2">{a.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-accent">
                    Read article
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform duration-500 group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
