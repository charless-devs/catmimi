import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import { BackgroundVideo } from './BackgroundVideo';
import { useTypewriter } from '../hooks/useTypewriter';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useInView } from '../hooks/useInView';

const Scene3D = lazy(() => import('./Scene3D').then((m) => ({ default: m.Scene3D })));

const TYPEWRITER_TEXT =
  'Curiosity brought you here. Good taste keeps you around. What shall we craft together?';

const actionPills = [
  { label: 'Pitch a project', target: '#contact' },
  { label: 'Peek the work', target: '#work' },
  { label: 'Join the clowder', target: '#contact' },
  { label: 'Say meow', target: 'meow' },
];

const EMAIL = 'hello@catmimi.co';

export function Hero({ booted }: { booted: boolean }) {
  const reduced = useReducedMotion();
  const { displayed, done } = useTypewriter({
    text: TYPEWRITER_TEXT,
    speed: 38,
    startDelay: 600,
  });
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { threshold: 0.05 });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2400);
  }, []);

  const scrollTo = (target: string) => {
    if (target === 'meow') {
      showToast('meow 🐾 — the clowder heard you');
      return;
    }
    document.querySelector(target)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      showToast('Email copied to clipboard');
      setTimeout(() => setCopied(false), 2200);
    } catch {
      showToast(EMAIL);
    }
  };

  // Staggered entrance choreography, released once the preloader lifts
  const rise = (delay: number): React.CSSProperties => ({
    opacity: booted ? 1 : 0,
    transform: booted ? 'translateY(0)' : 'translateY(26px)',
    transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pt-32 pb-24 sm:px-8 md:px-12 md:pt-36 md:pb-28"
    >
      {/* ── Layer 0 · signature mouse-scrubbed film ─────────────────────── */}
      <div className="absolute inset-0 -z-30" aria-hidden="true">
        <BackgroundVideo />
      </div>

      {/* ── Layer 1 · cinematic scrims, aurora & grid ───────────────────── */}
      <div
        className="absolute inset-0 -z-20"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(90deg, rgba(6,5,12,0.94) 0%, rgba(6,5,12,0.82) 38%, rgba(6,5,12,0.45) 68%, rgba(6,5,12,0.72) 100%), linear-gradient(180deg, rgba(6,5,12,0.85) 0%, transparent 28%, transparent 62%, rgba(6,5,12,0.96) 100%)',
        }}
      />
      <div
        className="absolute inset-0 -z-20 opacity-70"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(720px circle at 12% 28%, rgba(134,59,255,0.22), transparent 60%), radial-gradient(640px circle at 78% 68%, rgba(34,211,238,0.12), transparent 62%)',
          animation: reduced ? 'none' : 'aurora-drift 18s ease-in-out infinite',
        }}
      />
      <div className="grid-overlay absolute inset-0 -z-20 opacity-40" aria-hidden="true" />

      {/* ── Layer 2 · immersive 3D cluster ──────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-45 sm:opacity-70 md:opacity-100"
        aria-hidden="true"
      >
        {reduced ? (
          <FallbackOrb />
        ) : (
          <Suspense fallback={<FallbackOrb />}>
            <Scene3D active={inView && booted} reduced={reduced} />
          </Suspense>
        )}
      </div>

      {/* ── Layer 3 · content ───────────────────────────────────────────── */}
      <div className="relative mx-auto w-full max-w-[1400px]">
        <div className="relative max-w-[44rem]">
          {/* Readability halo behind copy */}
          <div
            className="pointer-events-none absolute -inset-x-16 -inset-y-12 -z-10 rounded-[48px] md:-inset-x-24 md:-inset-y-16"
            aria-hidden="true"
            style={{
              background:
                'radial-gradient(closest-side, rgba(6,5,12,0.72), rgba(6,5,12,0.28) 62%, transparent)',
            }}
          />

          {/* Status badge */}
          <div style={rise(120)}>
            <span className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-[12px] font-medium tracking-[0.14em] uppercase text-ink-2">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span
                  className="absolute inline-flex h-full w-full rounded-full bg-accent"
                  style={{ animation: reduced ? 'none' : 'pulse-dot 2.2s ease-in-out infinite' }}
                />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              M.O.C.H.A · online
            </span>
          </div>

          {/* Signature blur-in intro */}
          <p
            className="mt-6 font-display text-ink-2"
            style={{
              fontSize: 'clamp(17px, 2.4vw, 22px)',
              lineHeight: 1.35,
              filter: booted ? 'blur(0px)' : 'blur(6px)',
              opacity: booted ? 1 : 0,
              transform: booted ? 'translateY(0)' : 'translateY(16px)',
              transition:
                'opacity 1s cubic-bezier(0.16,1,0.3,1) 200ms, transform 1s cubic-bezier(0.16,1,0.3,1) 200ms, filter 1s cubic-bezier(0.16,1,0.3,1) 200ms',
            }}
          >
            Hey there — meet M.O.C.H.A,
            <br className="hidden sm:block" />
            <span className="text-ink">catmimi&rsquo;s Operational Creative Helper Agent.</span>
          </p>

          {/* Headline */}
          <h1
            className="mt-5 font-display text-ink"
            style={{
              fontSize: 'clamp(42px, 6.6vw, 84px)',
              fontWeight: 500,
              ...rise(320),
            }}
          >
            The creative studio
            <br />
            for brands with{' '}
            <span className="text-gradient-brand">nine lives.</span>
          </h1>

          {/* Typewriter */}
          <p
            className="mt-6 max-w-[36rem] text-ink-2"
            style={{
              fontSize: 'clamp(16px, 1.8vw, 19px)',
              lineHeight: 1.6,
              minHeight: '3.2em',
              ...rise(460),
            }}
          >
            {displayed}
            {!done && (
              <span
                className="ml-[2px] inline-block h-[1.05em] w-[2px] translate-y-[2px] bg-accent"
                aria-hidden="true"
              />
            )}
          </p>

          {/* Action pills */}
          <div className="mt-8 flex flex-wrap items-center gap-2.5" style={rise(600)}>
            {actionPills.map((pill) => (
              <button
                key={pill.label}
                onClick={() => scrollTo(pill.target)}
                className="btn btn-glass group/pill text-[14px] py-2.5 px-5"
              >
                <span className="relative z-10">{pill.label}</span>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="relative z-10 -translate-x-1 opacity-0 transition-all duration-300 group-hover/pill:translate-x-0 group-hover/pill:opacity-100"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            ))}

            <button
              onClick={copyEmail}
              className="btn group/copy border border-white/20 bg-transparent text-[14px] py-2.5 px-5 text-ink-2 hover:text-ink hover:border-accent/50"
              aria-label={`Copy email address ${EMAIL}`}
            >
              <span className="relative z-10">
                Reach us:{' '}
                <span className="text-accent underline underline-offset-2">{EMAIL}</span>
              </span>
              {copied ? (
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="relative z-10 text-accent"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              ) : (
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="relative z-10 opacity-60 transition-opacity group-hover/copy:opacity-100"
                  aria-hidden="true"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
            </button>
          </div>

          {/* Social proof */}
          <div className="mt-10 flex items-center gap-4" style={rise(740)}>
            <div className="flex -space-x-3" aria-hidden="true">
              {['#863bff', '#22d3ee', '#b794ff', '#4c1d95'].map((c, i) => (
                <span
                  key={c}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-void text-[11px] font-semibold text-white"
                  style={{ background: `linear-gradient(135deg, ${c}, #1a1130)`, zIndex: 4 - i }}
                >
                  {['M', 'O', 'C', 'H'][i]}
                </span>
              ))}
            </div>
            <p className="text-[13px] leading-snug text-ink-3">
              <span className="text-ink-2">A clowder of 12</span> — trusted by 40+ founders
              <br className="hidden sm:block" /> &amp; product teams worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        style={{
          opacity: booted ? 1 : 0,
          transition: 'opacity 1.2s ease 1.6s',
        }}
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-ink-3">
          Scroll to explore
        </span>
        <span className="scroll-cue-line h-12 w-px bg-white/10" aria-hidden="true" />
      </div>

      {/* Toast */}
      <div
        className={`pointer-events-none fixed bottom-8 left-1/2 z-[130] -translate-x-1/2 transition-all duration-500 ${
          toast ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
        role="status"
        aria-live="polite"
      >
        <span className="glass-strong rounded-full px-5 py-2.5 text-[13px] font-medium text-ink">
          {toast}
        </span>
      </div>
    </section>
  );
}

/** Static CSS orb shown while the 3D scene loads (or for reduced motion). */
function FallbackOrb() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="h-[42vmin] w-[42vmin] rounded-full opacity-80 blur-[2px]"
        style={{
          background:
            'radial-gradient(circle at 32% 28%, #c9a4ff 0%, #863bff 32%, #3b1d73 62%, rgba(6,5,12,0) 74%)',
          boxShadow: '0 0 120px 30px rgba(134,59,255,0.35), inset 0 0 60px rgba(34,211,238,0.18)',
          animation: 'float-slow 8s ease-in-out infinite',
        }}
        aria-hidden="true"
      />
    </div>
  );
}
