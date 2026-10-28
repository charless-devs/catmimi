import { SectionHeading } from './SectionHeading';
import { useGlowFollow, useTilt, useMergedRef } from '../hooks/useTilt';

const services = [
  {
    title: 'Brand & Identity',
    body: 'Positioning, naming, visual identity and guidelines that make you unmistakable in a crowded feed.',
    features: ['Strategy', 'Logo systems', 'Guidelines'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: 'Web Design',
    body: 'Editorial layouts, cinematic scroll narratives and design systems that scale past launch day.',
    features: ['UX/UI', 'Design systems', 'Prototyping'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    title: 'Webflow & React Builds',
    body: 'Pixel-faithful, blisteringly fast builds — headless CMS, analytics and CI wired in from day one.',
    features: ['Next.js', 'Headless CMS', 'Core Web Vitals'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 6-6 6 6 6M16 6l6 6-6 6" />
      </svg>
    ),
  },
  {
    title: 'Motion & 3D',
    body: 'WebGL scenes, product renders and micro-interactions that make interfaces feel physically real.',
    features: ['Three.js', 'Rive', 'Art direction'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
      </svg>
    ),
  },
  {
    title: 'Product Design',
    body: 'From fuzzy idea to shipped feature — research, flows and interfaces for SaaS and fintech teams.',
    features: ['Discovery', 'App UI', 'Design ops'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
    ),
  },
  {
    title: 'Growth & Experimentation',
    body: 'CRO programs, landing systems and A/B testing that turn a beautiful site into a revenue engine.',
    features: ['CRO', 'A/B testing', 'Analytics'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="m7 14 4-4 3 3 5-6" />
      </svg>
    ),
  },
];

function ServiceCard({ service, index }: { service: (typeof services)[number]; index: number }) {
  const tilt = useTilt<HTMLDivElement>({ max: 5, lift: 10 });
  const glow = useGlowFollow<HTMLDivElement>();
  const setRefs = useMergedRef<HTMLDivElement>(tilt.ref, glow.ref);

  return (
    <div
      data-reveal
      style={{ '--reveal-delay': `${(index % 3) * 110 + Math.floor(index / 3) * 60}ms` } as React.CSSProperties}
    >
      <div
        ref={setRefs}
        onMouseMove={(e) => {
          tilt.onMouseMove(e);
          glow.onMouseMove(e);
        }}
        onMouseLeave={tilt.onMouseLeave}
        className="glass card-3d glow-follow group relative h-full overflow-hidden rounded-[24px] p-7"
      >
        <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />

        <div className="relative z-10">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-2xl text-brand-light transition-all duration-500 group-hover:scale-110 group-hover:text-accent"
            style={{
              background: 'linear-gradient(135deg, rgba(134,59,255,0.22), rgba(34,211,238,0.1))',
              border: '1px solid rgba(183,148,255,0.22)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.14), 0 12px 30px -14px rgba(134,59,255,0.6)',
            }}
            aria-hidden="true"
          >
            {service.icon}
          </div>

          <h3 className="mt-5 font-display text-[19px] font-medium text-ink">{service.title}</h3>
          <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-2">{service.body}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {service.features.map((f) => (
              <span
                key={f}
                className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[11.5px] text-ink-3 transition-colors duration-500 group-hover:text-ink-2"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden px-5 py-28 sm:px-8 md:px-12 md:py-36">
      {/* Section aurora */}
      <div
        className="pointer-events-none absolute right-[-10%] top-1/4 h-[560px] w-[720px] rounded-full opacity-30 blur-[130px]"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.28), transparent 65%)' }}
      />
      <div
        className="pointer-events-none absolute left-[-12%] bottom-0 h-[480px] w-[640px] rounded-full opacity-30 blur-[130px]"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(134,59,255,0.32), transparent 65%)' }}
      />

      <div className="relative mx-auto max-w-[1240px]">
        <SectionHeading
          eyebrow="Services"
          title={
            <>
              Everything you need. <span className="text-gradient-brand">Nothing you don&rsquo;t.</span>
            </>
          }
          description="Six disciplines, one senior team. Pick a single service or hand us the whole arc — from positioning to production."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
