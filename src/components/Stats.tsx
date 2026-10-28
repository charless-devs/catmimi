import { useCountUp } from '../hooks/useCountUp';

const stats = [
  { value: 140, suffix: '+', label: 'Projects shipped', note: 'since 2016' },
  { value: 48, suffix: '', label: 'Design awards', note: 'Awwwards · CSSDA' },
  { value: 98, suffix: '%', label: 'Client retention', note: 'year over year' },
  { value: 2.4, suffix: 'x', label: 'Avg. conversion lift', note: 'post-launch' },
];

function Stat({ value, suffix, label, note, index }: (typeof stats)[number] & { index: number }) {
  const isDecimal = !Number.isInteger(value);
  const { ref, value: current } = useCountUp(isDecimal ? Math.round(value * 10) : value, 1800);
  const display = isDecimal ? (current / 10).toFixed(1) : current.toLocaleString();

  return (
    <div
      data-reveal
      style={{ '--reveal-delay': `${index * 100}ms` } as React.CSSProperties}
      className="group relative px-6 py-8 text-center sm:px-8"
    >
      {/* Divider hairline */}
      <span
        className="absolute left-0 top-1/2 hidden h-16 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent md:block"
        aria-hidden="true"
      />

      <div
        ref={ref}
        className="font-display text-[clamp(38px,4.6vw,58px)] font-medium leading-none tracking-tight text-ink transition-all duration-500 group-hover:scale-105"
      >
        {display}
        <span className="text-gradient-brand">{suffix}</span>
      </div>
      <div className="mt-3 text-[14px] font-medium text-ink-2">{label}</div>
      <div className="mt-0.5 text-[12px] text-ink-3">{note}</div>

      {/* Hover glow */}
      <span
        className="pointer-events-none absolute inset-x-6 bottom-0 h-24 rounded-2xl opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(134,59,255,0.35), transparent 70%)' }}
      />
    </div>
  );
}

export function Stats() {
  return (
    <section aria-label="Studio results" className="px-5 sm:px-8 md:px-12">
      <div
        data-reveal="scale"
        className="glass relative mx-auto max-w-[1240px] overflow-hidden rounded-[28px]"
      >
        {/* Light sweep */}
        <span
          className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 opacity-[0.14]"
          aria-hidden="true"
          style={{
            background: 'linear-gradient(90deg, transparent, #ffffff, transparent)',
            animation: 'sheen-sweep 7s ease-in-out infinite',
          }}
        />
        <div className="grid divide-y divide-white/5 md:grid-cols-4 md:divide-x md:divide-y-0">
          {stats.map((s, i) => (
            <Stat key={s.label} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
