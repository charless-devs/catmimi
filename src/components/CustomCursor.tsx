import { useEffect, useRef, useState } from 'react';

/**
 * Desktop-only luminous cursor: an instant dot, a trailing glow ring and a
 * soft light bloom. Disabled for coarse pointers and reduced motion.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  // Enable only for fine pointers without reduced motion
  useEffect(() => {
    if (!window.matchMedia) return;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add('has-custom-cursor');
    return () => document.documentElement.classList.remove('has-custom-cursor');
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
    };
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    // Smooth trailing ring
    const loop = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.16;
      ring.current.y += (pos.current.y - ring.current.y) * 0.16;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%,-50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%,-50%)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%,-50%)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [enabled]);

  // Hover detection on interactive elements
  useEffect(() => {
    if (!enabled) return;
    const selector = 'a, button, [role="button"], input, textarea, select, .hover-target';
    const onOver = (e: Event) => {
      if ((e.target as HTMLElement).closest(selector)) setHovering(true);
    };
    const onOut = (e: Event) => {
      if ((e.target as HTMLElement).closest(selector)) setHovering(false);
    };
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    return () => {
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, [enabled]);

  // Reflect hover/click states via classes for CSS sizing
  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle('hovering', hovering);
    html.classList.toggle('clicking', clicking);
  }, [hovering, clicking]);

  if (!enabled || !visible) return null;

  return (
    <>
      <div ref={glowRef} className="custom-cursor-glow" style={{ left: 0, top: 0 }} aria-hidden="true" />
      <div
        ref={ringRef}
        className="custom-cursor-follower"
        style={{
          left: 0,
          top: 0,
          transition: 'width 0.25s ease, height 0.25s ease, border-color 0.25s ease, opacity 0.3s ease',
          opacity: clicking ? 0.7 : 1,
        }}
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{ left: 0, top: 0, transform: 'translate(-50%,-50%)' }}
        aria-hidden="true"
      />
    </>
  );
}
