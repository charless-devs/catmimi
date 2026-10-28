import { SectionHeading } from './SectionHeading';
import { useTilt, useGlowFollow, useMergedRef } from '../hooks/useTilt';

interface Project {
  title: string;
  client: string;
  category: string;
  year: string;
  metric: string;
  metricLabel: string;
  tags: string[];
  art: { background: string; accent: string };
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: 'A banking app people actually love',
    client: 'Lumen',
    category: 'Fintech · Product design',
    year: '2025',
    metric: '+64%',
    metricLabel: 'activation rate',
    tags: ['Brand', 'Product', 'iOS'],
    art: {
      background:
        'radial-gradient(500px circle at 20% 15%, rgba(134,59,255,0.85), transparent 55%), radial-gradient(420px circle at 85% 80%, rgba(34,211,238,0.5), transparent 55%), linear-gradient(140deg, #171034 0%, #0a0815 100%)',
      accent: '#b794ff',
    },
    featured: true,
  },
  {
    title: 'Launch site that sold out in 48 hours',
    client: 'Orbit AI',
    category: 'SaaS · Marketing site',
    year: '2025',
    metric: '2.1M',
    metricLabel: 'first-week visits',
    tags: ['Web', '3D', 'Motion'],
    art: {
      background:
        'radial-gradient(460px circle at 80% 20%, rgba(34,211,238,0.75), transparent 55%), radial-gradient(380px circle at 15% 85%, rgba(134,59,255,0.6), transparent 55%), linear-gradient(160deg, #0d1424 0%, #06050c 100%)',
      accent: '#22d3ee',
    },
  },
  {
    title: 'A storefront brewed for conversion',
    client: 'Kinfolk Coffee',
    category: 'Commerce · Rebrand',
    year: '2024',
    metric: '+112%',
    metricLabel: 'revenue per visitor',
    tags: ['Brand', 'Shopify', 'Art direction'],
    art: {
      background:
        'radial-gradient(440px circle at 30% 80%, rgba(255,210,143,0.5), transparent 55%), radial-gradient(400px circle at 75% 15%, rgba(134,59,255,0.65), transparent 55%), linear-gradient(150deg, #1c1226 0%, #0a0815 100%)',
      accent: '#ffd28f',
    },
  },
  {
    title: 'One design system, eleven product teams',
    client: 'Nova Health',
    category: 'Healthtech · Design system',
    year: '2024',
    metric: '3.5x',
    metricLabel: 'faster ship cycles',
    tags: ['Systems', 'Tokens', 'React'],
    art: {
      background:
        'radial-gradient(420px circle at 70% 70%, rgba(76,29,149,0.9), transparent 60%), radial-gradient(380px circle at 20% 20%, rgba(34,211,238,0.4), transparent 55%), linear-gradient(135deg, #130d26 0%, #06050c 100%)',
      accent: '#863bff',
    },
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const tilt = useTilt<HTMLDivElement>({ max: 6, lift: 14 });
  const glow = useGlowFollow<HTMLDivElement>();
  const setRefs = useMergedRef<HTMLDivElement>(tilt.ref, glow.ref);

  return (
    <article
      data-reveal
      style={{ '--reveal-delay': `${index * 120}ms` } as React.CSSProperties}
      className={project.featured ? 'md:col-span-2' : ''}
    >
      <div
        ref={setRefs}
        onMouseMove={(e) => {
          tilt.onMouseMove(e);
          glow.onMouseMove(e);
        }}
        onMouseLeave={tilt.onMouseLeave}
        className="glass card-3d glow-follow group relative h-full overflow-hidden rounded-[26px]"
      >
        {/* Cover art */}
        <div
          className={`relative overflow-hidden ${project.featured ? 'aspect-[16/8]' : 'aspect-[16/10]'}`}
          style={{ background: project.art.background }}
        >
          {/* Floating geometry inside the cover */}
          <div
            className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            aria-hidden="true"
          >
            <span
              className="absolute left-[12%] top-[22%] h-20 w-20 rotate-12 rounded-2xl border border-white/15 backdrop-blur-md transition-all duration-700 group-hover:rotate-45 group-hover:scale-110"
              style={{
                background: `linear-gradient(135deg, ${project.art.accent}33, transparent)`,
                boxShadow: `0 20px 50px -20px ${project.art.accent}80`,
                animation: 'float-slow 9s ease-in-out infinite',
              }}
            />
            <span
              className="absolute right-[14%] top-[38%] h-14 w-14 rounded-full border border-white/15 backdrop-blur-md transition-all duration-700 group-hover:-translate-y-3"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${project.art.accent}55, transparent)`,
                animation: 'float-reverse 7s ease-in-out infinite',
              }}
            />
            <span
              className="absolute bottom-[16%] left-[42%] h-10 w-10 rotate-45 rounded-lg border border-white/10 backdrop-blur-md transition-all duration-700 group-hover:rotate-[80deg]"
              style={{
                background: `linear-gradient(135deg, ${project.art.accent}22, transparent)`,
                animation: 'float-slow 11s ease-in-out infinite',
              }}
            />
          </div>

          {/* Scrim + top row */}
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                'linear-gradient(180deg, rgba(6,5,12,0.35) 0%, transparent 35%, rgba(6,5,12,0.55) 100%)',
            }}
          />
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 sm:p-6">
            <span className="glass-strong rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-2">
              {project.category}
            </span>
            <span className="glass-strong rounded-full px-3 py-1 text-[11px] font-medium tabular-nums text-ink-2">
              {project.year}
            </span>
          </div>

          {/* Metric badge */}
          <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6">
            <div className="font-display text-[clamp(26px,3vw,40px)] font-medium leading-none text-ink">
              {project.metric}
            </div>
            <div className="mt-1 text-[12px] text-ink-2">{project.metricLabel}</div>
          </div>
        </div>

        {/* Body */}
        <div className="relative flex flex-wrap items-end justify-between gap-4 p-6 sm:p-7">
          <div>
            <div className="eyebrow text-[10.5px] text-ink-3">{project.client}</div>
            <h3 className="mt-2 max-w-md font-display text-[clamp(19px,2.2vw,24px)] font-medium text-ink">
              {project.title}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[11.5px] text-ink-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <span className="glass flex h-11 w-11 items-center justify-center rounded-full text-ink-2 transition-all duration-500 group-hover:bg-brand group-hover:text-white group-hover:shadow-[0_12px_34px_-8px_rgba(134,59,255,0.8)]">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            >
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </span>
        </div>
      </div>
    </article>
  );
}

export function Work() {
  return (
    <section id="work" className="relative px-5 py-28 sm:px-8 md:px-12 md:py-36">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeading
          eyebrow="Selected work"
          title={
            <>
              Work that pulls <span className="text-gradient-brand">its own weight.</span>
            </>
          }
          description="A few recent collaborations — each one shipped end-to-end by the same small team, from first sketch to production deploy."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 md:gap-7">
          {projects.map((p, i) => (
            <ProjectCard key={p.client} project={p} index={i} />
          ))}
        </div>

        <div data-reveal className="mt-14 text-center">
          <a href="#contact" className="btn btn-glass hover-target" onClick={(e) => {
            e.preventDefault();
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            Start your case study
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
