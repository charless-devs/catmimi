import { useEffect, useState, type RefObject } from 'react';

interface InViewOptions {
  threshold?: number;
  rootMargin?: string;
}

/** Returns true while the referenced element is inside the viewport. */
export function useInView<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { threshold = 0.15, rootMargin = '0px' }: InViewOptions = {}
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? false),
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin]);

  return inView;
}
