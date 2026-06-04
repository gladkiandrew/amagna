'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/components/home/ocean/use-reduced-motion';
import {
  HeroOcean,
  DEFAULT_KNOBS,
  MOBILE_KNOBS,
  type HeroOceanKnobs,
} from './hero-ocean-engine';

/**
 * The hero ocean canvas — owns the render lifecycle for {@link HeroOcean}.
 *
 * Responsibilities (kept out of the pure engine):
 *  - size the backing store to CSS box × DPR (tiered: 2 / 1.5 / 1)
 *  - run ONE rAF loop, paused when tab hidden or the canvas scrolls offscreen
 *  - paint a single static frame under `prefers-reduced-motion` (still wavy)
 *  - thin to fewer layers on mobile (waves stay visible — never flattened)
 *
 * Decorative only: `aria-hidden`, no pointer, no scroll coupling (Layer 1).
 */
export function HeroOceanCanvas({
  knobs,
  className,
}: {
  /** Optional knob overrides for live tuning. */
  knobs?: Partial<HeroOceanKnobs>;
  className?: string;
}): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // --- Tier the device-pixel-ratio. Water is fill-rate bound; sub-native DPR
    //     is invisible on moving water but roughly halves the cost. ---
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const isMobile = coarse || window.innerWidth < 768;
    const dprCap = isMobile ? 1.5 : 2;
    const dpr = Math.min(window.devicePixelRatio || 1, dprCap);

    // Mobile keeps fewer layers but the SAME amplitude/crest contrast.
    const merged: HeroOceanKnobs = {
      ...DEFAULT_KNOBS,
      ...(isMobile ? MOBILE_KNOBS : {}),
      ...knobs,
    };
    const ocean = new HeroOcean(merged);

    const size = () => {
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ocean.layout(w, h, dpr);
    };
    size();

    // --- Reduced motion: paint one clearly-formed frame, never start the loop. ---
    if (reducedMotion) {
      ocean.draw(ctx, 9);
      const ro = new ResizeObserver(() => {
        size();
        ocean.draw(ctx, 9);
      });
      ro.observe(canvas);
      return () => ro.disconnect();
    }

    let raf = 0;
    let running = false;
    let startMs = 0;
    let pausedAccum = 0; // total paused time, so `t` doesn't lurch on resume
    let pauseStart = 0;

    const frame = (now: number) => {
      if (!running) return;
      if (!startMs) startMs = now;
      const tSec = (now - startMs - pausedAccum) / 1000;
      ocean.draw(ctx, tSec);
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      if (pauseStart) {
        pausedAccum += performance.now() - pauseStart;
        pauseStart = 0;
      }
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (!running) return;
      running = false;
      pauseStart = performance.now();
      cancelAnimationFrame(raf);
    };

    // Pause when the hero scrolls out of view (no point animating offscreen).
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(canvas);

    // Pause on tab hide.
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);

    // Debounced resize via ResizeObserver (layout reads happen here only).
    let resizeTimer = 0;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(size, 120);
    });
    ro.observe(canvas);

    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.clearTimeout(resizeTimer);
    };
  }, [reducedMotion, knobs]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      role="presentation"
      className={className}
    />
  );
}
