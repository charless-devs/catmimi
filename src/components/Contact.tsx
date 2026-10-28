import { useState, type FormEvent } from 'react';
import { useGlowFollow } from '../hooks/useTilt';

const EMAIL = 'hello@catmimi.co';

const perks = [
  'Free 30-minute intro call',
  'Fixed scope, fixed price, no surprises',
  'First concepts within 10 days',
];

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const glow = useGlowFollow<HTMLDivElement>();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get('email') ?? '');

    if (!data.get('name') || !email || !data.get('message')) {
      setError('Please fill in your name, email and project details.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('That email address doesn’t look quite right.');
      return;
    }

    setError(null);
    setSending(true);
    // Wire this to your CRM / form endpoint in production
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      form.reset();
    }, 1100);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden px-5 py-28 sm:px-8 md:px-12 md:py-36">
      {/* Aurora backdrop */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[640px] w-[1100px] -translate-x-1/2 rounded-full opacity-40 blur-[140px]"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(circle at 35% 40%, rgba(134,59,255,0.35), transparent 60%), radial-gradient(circle at 70% 60%, rgba(34,211,238,0.18), transparent 60%)',
        }}
      />

      <div className="relative mx-auto grid max-w-[1240px] items-start gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        {/* Left — pitch */}
        <div data-reveal="left">
          <span className="eyebrow">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-brand/70" aria-hidden="true" />
            Contact
          </span>
          <h2 className="mt-5 font-display text-[clamp(34px,5.2vw,60px)] font-medium text-ink">
            Let&rsquo;s craft something
            <br />
            <span className="text-gradient-brand">with nine lives.</span>
          </h2>
          <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-ink-2">
            Tell us where you&rsquo;re headed. We&rsquo;ll come back within one business day with a point of
            view, a rough scope and honest pricing — no forms-into-the-void, ever.
          </p>

          <ul className="mt-8 space-y-3.5">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-[14.5px] text-ink-2">
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, rgba(134,59,255,0.3), rgba(34,211,238,0.15))',
                    border: '1px solid rgba(183,148,255,0.3)',
                  }}
                  aria-hidden="true"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#b794ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                {perk}
              </li>
            ))}
          </ul>

          {/* Direct email */}
          <button
            onClick={copyEmail}
            className="group mt-10 inline-flex items-center gap-3 text-left hover-target"
            aria-label={`Copy email address ${EMAIL}`}
          >
            <span className="glass flex h-12 w-12 items-center justify-center rounded-2xl text-brand-light transition-all duration-500 group-hover:text-accent group-hover:shadow-[0_0_30px_-6px_rgba(34,211,238,0.6)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-10 6L2 7" />
              </svg>
            </span>
            <span>
              <span className="block text-[12px] uppercase tracking-[0.16em] text-ink-3">
                {copied ? 'Copied!' : 'Or email us directly'}
              </span>
              <span className="block font-display text-[17px] text-ink">{EMAIL}</span>
            </span>
          </button>
        </div>

        {/* Right — glass form */}
        <div data-reveal="right" className="relative">
          <div
            ref={glow.ref}
            onMouseMove={glow.onMouseMove}
            className="glass-strong glow-follow relative overflow-hidden rounded-[28px] p-7 sm:p-9"
          >
            {submitted ? (
              <div className="relative z-10 flex min-h-[420px] flex-col items-center justify-center text-center">
                <span
                  className="flex h-20 w-20 items-center justify-center rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, rgba(134,59,255,0.35), rgba(34,211,238,0.2))',
                    border: '1px solid rgba(183,148,255,0.4)',
                    boxShadow: '0 0 60px -10px rgba(134,59,255,0.7)',
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <h3 className="mt-6 font-display text-[26px] font-medium text-ink">Message received.</h3>
                <p className="mt-3 max-w-xs text-[14.5px] text-ink-2">
                  The clowder is already stirring. Expect a reply from a human (and possibly M.O.C.H.A) within one business day.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn btn-glass mt-7 text-[14px]">
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative z-10" noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-[12px] font-medium uppercase tracking-[0.14em] text-ink-3">
                      Name
                    </label>
                    <input id="name" name="name" type="text" className="input" placeholder="Ada Lovelace" autoComplete="name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-[12px] font-medium uppercase tracking-[0.14em] text-ink-3">
                      Email
                    </label>
                    <input id="email" name="email" type="email" className="input" placeholder="ada@company.com" autoComplete="email" />
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="company" className="mb-1.5 block text-[12px] font-medium uppercase tracking-[0.14em] text-ink-3">
                    Company <span className="normal-case tracking-normal text-ink-3/70">(optional)</span>
                  </label>
                  <input id="company" name="company" type="text" className="input" placeholder="Analytical Engines Inc." autoComplete="organization" />
                </div>

                <div className="mt-4">
                  <label htmlFor="budget" className="mb-1.5 block text-[12px] font-medium uppercase tracking-[0.14em] text-ink-3">
                    Budget range
                  </label>
                  <select id="budget" name="budget" className="input appearance-none" defaultValue="25-50">
                    <option value="10-25">$10k – $25k</option>
                    <option value="25-50">$25k – $50k</option>
                    <option value="50-100">$50k – $100k</option>
                    <option value="100+">$100k+</option>
                  </select>
                </div>

                <div className="mt-4">
                  <label htmlFor="message" className="mb-1.5 block text-[12px] font-medium uppercase tracking-[0.14em] text-ink-3">
                    Project details
                  </label>
                  <textarea id="message" name="message" rows={4} className="input resize-none" placeholder="What are we crafting together?" />
                </div>

                {error && (
                  <p className="mt-4 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-2.5 text-[13px] text-red-200" role="alert">
                    {error}
                  </p>
                )}

                <button type="submit" disabled={sending} className="btn btn-primary mt-6 w-full disabled:opacity-70">
                  {sending ? (
                    <>
                      <span
                        className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                        aria-hidden="true"
                      />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send message
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="mt-4 text-center text-[12px] text-ink-3">
                  We reply within one business day. No newsletters, no spam — purr-freshed.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
