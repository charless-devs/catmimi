import { useCallback, useRef, type RefObject } from 'react';
import { useReducedMotion } from './useReducedMotion';

/** Combines several refs into one callback ref (for elements needing two hooks). */
export function useMergedRef<T>(...refs: Array<RefObject<T | null> | undefined>) {
  return useCallback((el: T | null) => {
    for (const r of refs) {
      if (r) r.current = el;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs);
}

interface TiltOptions {
  /** Maximum tilt in degrees. */
  max?: number;
  /** Perspective depth in px. */
  perspective?: number;
  /** Translation lift on hover, in px. */
  lift?: number;
}

/**
 * Adds a springy 3D tilt that follows the pointer across an element.
 * Returns handlers to spread onto the target and a live style object.
 */
export function useTilt<T extends HTMLElement>({ max = 9, perspective = 1000, lift = 6 }: TiltOptions = {}) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<T>(null);
  const frame = useRef<number | null>(null);

  const apply = useCallback(
    (rx: number, ry: number, z: number) => {
      const el = ref.current;
      if (!el) return;
      el.style.transform = `perspective(${perspective}px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(${z}px)`;
    },
    [perspective]
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      if (reducedMotion) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const ry = (px - 0.5) * max * 2;
      const rx = (0.5 - py) * max * 2;
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => apply(rx, ry, lift));
    },
    [max, lift, apply, reducedMotion]
  );

  const onMouseLeave = useCallback(() => {
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => apply(0, 0, 0));
  }, [apply]);

  return { ref, onMouseMove, onMouseLeave };
}

/**
 * Tracks pointer position within an element as CSS custom properties
 * (--mx / --my) for cursor-tracked glow effects.
 */
export function useGlowFollow<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }, []);

  return { ref, onMouseMove };
}
