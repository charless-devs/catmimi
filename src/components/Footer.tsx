import { useEffect, useState } from 'react';
import { BrandMark, Wordmark } from './BrandMark';

const footerLinks = [
  {
    title: 'Studio',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Work', href: '#work' },
      { label: 'Services', href: '#services' },
      { label: 'Insights', href: '#insights' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Contact', href: '#contact' },
      { label: 'Careers', href: '#contact' },
      { label: 'Press kit', href: '#contact' },
    ],
  },
];

const socials = [
  {
    label: 'X / Twitter',
    href: 'https://x.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.2l7.3-8.4L2.5 2h6.4l4.4 5.9L18.9 2zm-1.1 18h1.7L7.9 3.8H6L17.8 20z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Dribbble',
    href: 'https://dribbble.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9.5" />
        <path d="M5 7.5c4.5 3 10 4 14.5 3.2M3.2 14.5c5-1.5 10.5-.5 14 3.5M9 3c3.5 4.5 5.5 10 6 17.5" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.5c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9V21h-4V9z" />
      </svg>
    ),
  },
];

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/6 px-5 pb-10 pt-20 sm:px-8 md:px-12">
      <div
        className="pointer-events-none absolute bottom-[-260px] left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full opacity-30 blur-[130px]"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(134,59,255,0.35), transparent 65%)' }}
      />

      <div className="relative mx-auto max-w-[1240px]">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand column */}
          <div>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('#home');
              }}
              className="group inline-flex items-center gap-2.5 text-ink hover-target"
              aria-label="catmimi — back to top"
            >
              <BrandMark size={24} className="transition-transform duration-700 group-hover:rotate-[20deg]" />
              <Wordmark className="text-[20px]" />
            </a>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-ink-2">
              A creative studio crafting brands, websites and interfaces with nine lives.
              Built with care (and a little M.O.C.H.A magic).
            </p>
            <div className="mt-6 flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="glass flex h-10 w-10 items-center justify-center rounded-xl text-ink-2 transition-all duration-400 hover:-translate-y-1 hover:text-ink hover:shadow-[0_14px_30px_-12px_rgba(134,59,255,0.7)] hover-target"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-[12px] font-medium uppercase tracking-[0.2em] text-ink-3">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollTo(link.href);
                      }}
                      className="group inline-flex items-center gap-2 text-[14.5px] text-ink-2 transition-colors duration-300 hover:text-ink hover-target"
                    >
                      <span className="h-px w-0 bg-accent transition-all duration-400 group-hover:w-4" aria-hidden="true" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/6 pt-7 sm:flex-row">
          <p className="text-[12.5px] text-ink-3">
            © {CURRENT_YEAR} catmimi studio. All nine lives reserved.
          </p>
          <p className="text-[12.5px] text-ink-3">
            Made with <span className="text-brand-light">◆</span> curiosity &amp; too much coffee
          </p>
        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className={`glass fixed bottom-7 right-7 z-[90] flex h-12 w-12 items-center justify-center rounded-2xl text-ink-2 transition-all duration-500 hover:-translate-y-1 hover:text-ink hover:shadow-[0_18px_40px_-14px_rgba(134,59,255,0.8)] hover-target ${
          showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </footer>
  );
}
