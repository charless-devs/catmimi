import { useCallback, useEffect, useRef, useState } from 'react';
import { BrandMark, Wordmark } from './BrandMark';
import { useScrollSpy } from '../hooks/useScrollSpy';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Insights', href: '#insights' },
  { label: 'Contact', href: '#contact' },
];

const sectionIds = navLinks.map((l) => l.href.slice(1));

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const active = useScrollSpy(sectionIds);

  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sliding active pill — track the active link's geometry (relative to the links row)
  useEffect(() => {
    const update = () => {
      const idx = sectionIds.indexOf(active);
      const el = idx >= 0 ? linkRefs.current[idx] : null;
      const rowBox = linksRef.current?.getBoundingClientRect();
      if (el && rowBox) {
        const box = el.getBoundingClientRect();
        setIndicator({ left: box.left - rowBox.left, width: box.width, ready: true });
      }
    };
    update();
    window.addEventListener('resize', update);
    const t = setTimeout(update, 450); // re-measure after font swap
    return () => {
      window.removeEventListener('resize', update);
      clearTimeout(t);
    };
  }, [active, scrolled]);

  // Close menu on Escape
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen]);

  const scrollTo = useCallback((href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Primary"
        className={`fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-8 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
        style={{
          maxWidth: scrolled ? 'min(1120px, calc(100% - 1.5rem))' : '100%',
          marginInline: scrolled ? 'auto' : '0',
        }}
      >
        {/* Glass shell (fades in on scroll) */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 rounded-[22px] transition-all duration-500 ${
            scrolled ? 'glass-strong opacity-100' : 'opacity-0'
          }`}
        />

        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('#home');
          }}
          className="group relative z-10 flex items-center gap-2.5 text-ink hover-target"
          aria-label="catmimi — home"
        >
          <BrandMark size={26} className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[20deg] group-hover:scale-110" />
          <Wordmark className="text-[19px] sm:text-[21px]" />
        </a>

        {/* Desktop links + sliding indicator */}
        <div
          ref={linksRef}
          className="relative z-10 hidden items-center gap-1 rounded-full p-1 md:flex"
          style={{
            background: scrolled ? 'rgba(255,255,255,0.03)' : 'transparent',
            border: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
            transition: 'background 0.4s ease, border-color 0.4s ease',
          }}
        >
          {/* Sliding pill */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1 bottom-1 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              left: indicator.left,
              width: indicator.width,
              opacity: indicator.ready ? 1 : 0,
              background: 'linear-gradient(135deg, rgba(134,59,255,0.28), rgba(34,211,238,0.12))',
              border: '1px solid rgba(183,148,255,0.32)',
              boxShadow: '0 8px 24px -10px rgba(134,59,255,0.6), inset 0 1px 0 rgba(255,255,255,0.14)',
            }}
          />

          {navLinks.map((link, i) => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                ref={(el) => {
                  linkRefs.current[i] = el;
                }}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`relative rounded-full px-4 py-2 text-[14px] font-medium transition-colors duration-300 hover-target ${
                  isActive ? 'text-ink' : 'text-ink-2 hover:text-ink'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="relative z-10 hidden md:block">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#contact');
            }}
            className="btn btn-primary py-2.5 px-5 text-[14px] hover-target"
          >
            <span className="relative z-10">Get in touch</span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="glass relative z-10 flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-2xl md:hidden"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <span
            className="h-[2px] w-5 rounded-full bg-ink transition-all duration-300"
            style={{ transform: mobileMenuOpen ? 'rotate(45deg) translateY(6.5px)' : 'none' }}
          />
          <span
            className="h-[2px] w-5 rounded-full bg-ink transition-all duration-300"
            style={{ opacity: mobileMenuOpen ? 0 : 1 }}
          />
          <span
            className="h-[2px] w-5 rounded-full bg-ink transition-all duration-300"
            style={{ transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-6.5px)' : 'none' }}
          />
        </button>
      </nav>

      {/* Mobile overlay */}
      {mounted && (
        <div
          className={`glass-strong fixed inset-x-3 top-3 z-[99] flex flex-col rounded-[26px] px-6 pb-8 pt-24 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
            mobileMenuOpen
              ? 'pointer-events-auto translate-y-0 opacity-100'
              : 'pointer-events-none -translate-y-4 opacity-0'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          style={{
            background:
              'linear-gradient(180deg, rgba(16,13,32,0.94) 0%, rgba(8,6,18,0.97) 100%)',
          }}
        >
          {navLinks.map((link, index) => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className={`relative border-b border-white/5 py-4 font-display text-[30px] tracking-tight transition-all duration-500 hover-target ${
                  isActive ? 'text-gradient-brand' : 'text-ink'
                } ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
                style={{ transitionDelay: mobileMenuOpen ? `${120 + index * 55}ms` : '0ms' }}
              >
                <span className="mr-3 text-[13px] tabular-nums text-ink-3">
                  0{index + 1}
                </span>
                {link.label}
              </a>
            );
          })}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#contact');
            }}
            className={`btn btn-primary mt-7 w-full ${
              mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            }`}
            style={{ transitionDelay: mobileMenuOpen ? `${120 + navLinks.length * 55}ms` : '0ms' }}
          >
            Get in touch
          </a>
        </div>
      )}
    </>
  );
}
