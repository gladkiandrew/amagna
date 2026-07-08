'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/components/home/ocean/use-reduced-motion';

// Code-split the WebGL/Canvas ocean into its own chunk (ssr:false) so the
// engine JS is NOT in the homepage's initial hydration bundle. It only loads
// after first paint — the hero's LCP text no longer waits behind it.
const HeroOcean = dynamic(() => import('./hero-ocean').then((m) => m.HeroOcean), {
  ssr: false,
  loading: () => null,
});

/**
 * Deferred, fade-in wrapper for the photoreal ocean.
 *
 * Why this exists (mobile LCP): the ocean canvas is the largest element on the
 * page, and eagerly rendering it made it the Largest Contentful Paint — gated on
 * WebGL init. Two changes fix that WITHOUT changing how the hero looks once
 * loaded:
 *   1. The engine is dynamically imported (ssr:false) so its JS is off the
 *      initial critical path.
 *   2. It mounts only after first paint (requestIdleCallback → setTimeout
 *      fallback) and fades in from opacity 0. An element that starts at opacity
 *      0 and transitions in is excluded from LCP by Chrome, so LCP resolves to
 *      the instant, server-rendered headline over the static gradient instead.
 *
 * `prefers-reduced-motion` users never load the ocean at all — they keep the
 * static gradient backdrop (accessible + a real perf win on low-end devices).
 */
export function HeroOceanLazy({ className }: { className?: string }): JSX.Element | null {
  const reducedMotion = useReducedMotion();
  const [mount, setMount] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (reducedMotion) return; // reduced motion → gradient only, no ocean JS

    let raf = 0;
    const start = () => {
      setMount(true);
      // Next frame after mount: flip opacity so the canvas transitions in.
      raf = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
    };

    const w = window as typeof window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let idleId = 0;
    let timeoutId = 0;
    if (typeof w.requestIdleCallback === 'function') {
      idleId = w.requestIdleCallback(start, { timeout: 2000 });
    } else {
      timeoutId = window.setTimeout(start, 200);
    }

    return () => {
      if (idleId && typeof w.cancelIdleCallback === 'function') w.cancelIdleCallback(idleId);
      if (timeoutId) clearTimeout(timeoutId);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  if (!mount) return null;

  return (
    <div
      className={`${className ?? ''} transition-opacity duration-700 ease-out`}
      style={{ opacity: shown ? 1 : 0 }}
      aria-hidden
    >
      <HeroOcean className="h-full w-full" />
    </div>
  );
}
