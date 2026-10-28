import { useEffect, useState } from 'react';
import { BrandMark } from './BrandMark';

interface PreloaderProps {
  onDone: () => void;
}

const MIN_DURATION = 1300;
const MAX_DURATION = 2800;

/**
 * Cinematic boot sequence — brand mark, progress bar, curtain lift.
 * Locks scroll while active and always resolves (max timeout).
 */
export function Preloader({ onDone }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Freeze scroll while the curtain is up
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      // Ease toward 90% while loading, complete on window load (or max timeout)
      const p = Math.min(elapsed / MIN_DURATION, 1);
      setProgress(Math.round(easeOutCubic(p) * 90));
      if (elapsed < MAX_DURATION) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const finish = () => {
      setProgress(100);
      setTimeout(() => {
        setLeaving(true);
        document.body.style.overflow = prevOverflow;
        setTimeout(() => {
          setHidden(true);
          onDone();
        }, 850);
      }, 260);
    };

    const maxTimer = setTimeout(finish, MAX_DURATION);
    const onWindowLoad = () => {
      const elapsed = performance.now() - start;
      const wait = Math.max(0, MIN_DURATION - elapsed);
      setTimeout(finish, wait);
    };

    if (document.readyState === 'complete') onWindowLoad();
    else window.addEventListener('load', onWindowLoad, { once: true });

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(maxTimer);
      window.removeEventListener('load', onWindowLoad);
      document.body.style.overflow = prevOverflow;
    };
  }, [onDone]);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-void transition-[opacity,transform] duration-[850ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        leaving ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'
      }`}
      role="status"
      aria-label="Loading catmimi"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(600px circle at 50% 45%, rgba(134,59,255,0.18), transparent 65%), radial-gradient(500px circle at 70% 70%, rgba(34,211,238,0.08), transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="relative flex flex-col items-center gap-8">
        <div className="relative">
          <div
            className="absolute inset-0 rounded-full blur-2xl"
            style={{ background: 'radial-gradient(circle, rgba(134,59,255,0.55), transparent 70%)' }}
            aria-hidden="true"
          />
          <BrandMark size={64} spin className="relative drop-shadow-[0_0_24px_rgba(134,59,255,0.6)]" />
        </div>

        <div className="flex flex-col items-center gap-3">
          <span className="font-display text-[15px] tracking-[0.35em] uppercase text-ink-2">catmimi</span>
          <div
            className="h-[2px] w-44 overflow-hidden rounded-full bg-white/10"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full origin-left rounded-full"
              style={{
                width: '100%',
                transform: `scaleX(${progress / 100})`,
                background: 'linear-gradient(90deg, #863bff, #22d3ee)',
                transition: 'transform 0.3s ease-out',
              }}
            />
          </div>
          <span className="font-display text-[11px] tabular-nums tracking-widest text-ink-3">
            {String(progress).padStart(3, '0')}%
          </span>
        </div>
      </div>
    </div>
  );
}

function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}
