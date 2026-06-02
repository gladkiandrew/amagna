'use client';

import { useEffect, useRef, useState } from 'react';

type Options = {
  /** Re-toggle when leaving the viewport. Default false (reveal once, stay). */
  repeat?: boolean;
  threshold?: number;
  rootMargin?: string;
};

/**
 * IntersectionObserver reveal hook — zero per-frame JS (see PLAN.md §C).
 * Attach `ref` to an element; `inView` flips true when it enters.
 * Falls back to visible if IntersectionObserver is unavailable.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: Options = {},
): { ref: React.RefObject<T>; inView: boolean } {
  const { repeat = false, threshold = 0.18, rootMargin = '0px 0px -10% 0px' } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (!repeat) observer.unobserve(entry.target);
          } else if (repeat) {
            setInView(false);
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [repeat, threshold, rootMargin]);

  return { ref, inView };
}
