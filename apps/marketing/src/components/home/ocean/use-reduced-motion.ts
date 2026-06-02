'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks `prefers-reduced-motion: reduce`. Drives the voyage's static-frame
 * fallback (see PLAN.md §F). SSR-safe: starts `false`, syncs on mount.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
