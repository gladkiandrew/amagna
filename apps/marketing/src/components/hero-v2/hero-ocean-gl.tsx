'use client';

import { useEffect, useRef } from 'react';
import {
  HeroOceanGL,
  DEFAULT_GL_KNOBS,
  type HeroOceanGLKnobs,
} from './hero-ocean-gl-engine';

/**
 * The WebGL2 photoreal-ocean canvas — owns the render lifecycle for
 * {@link HeroOceanGL}. Mirrors the discipline of the Canvas-2D component:
 *
 *  - tiered DPR cap (raymarched water is fill-rate bound; sub-native is invisible)
 *  - ONE rAF loop, paused when the tab is hidden or the canvas scrolls offscreen,
 *    with `t` continuity preserved across pauses (no lurch on resume)
 *  - debounced `ResizeObserver` (the only place we read layout)
 *  - adaptive degradation: if frames run long, drop render scale a step and self-heal
 *  - on WebGL2 / shader failure it calls `onUnsupported` so the parent can swap in
 *    the Canvas-2D fallback
 *
 * Decorative only: `aria-hidden`, no pointer, no scroll coupling (Frame 1).
 */
export function HeroOceanGLCanvas({
  knobs,
  className,
  onUnsupported,
}: {
  knobs?: Partial<HeroOceanGLKnobs>;
  className?: string;
  /** Called once if WebGL2 / shader init fails, so the parent can fall back. */
  onUnsupported?: () => void;
}): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const onUnsupportedRef = useRef(onUnsupported);
  onUnsupportedRef.current = onUnsupported;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const isMobile = coarse || window.innerWidth < 768;

    // DPR cap: water needs no native DPR. Desktop renders at 1.0 (1× CSS px).
    // Mobile targets ~2× effective so the ocean is CRISP on retina phones — the
    // old 0.75×0.85≈0.64 floor looked blurry/pixelated on a DPR-3 iPhone. We
    // START sharp and let adaptive degradation (below) drop renderScale ONLY if
    // measured frame time runs long, instead of pre-emptively rendering soft.
    const dprCap = isMobile ? 2 : 1;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, dprCap);

    const merged: HeroOceanGLKnobs = {
      ...DEFAULT_GL_KNOBS,
      ...knobs,
    };

    const ocean = new HeroOceanGL(canvas, merged);
    if (!ocean.ok) {
      ocean.dispose();
      onUnsupportedRef.current?.();
      return;
    }

    const size = () => {
      const rect = canvas.getBoundingClientRect();
      ocean.layout(Math.max(1, rect.width), Math.max(1, rect.height), pixelRatio);
    };
    size();

    let raf = 0;
    let running = false;
    let startMs = 0;
    let pausedAccum = 0;
    let pauseStart = 0;

    // --- Adaptive degradation: watch a rolling average of frame time. ---
    const tiers = [merged.renderScale, 0.7, 0.5, 0.4];
    let tierIdx = 0;
    let avgFrameMs = 16;
    let lastFrameMs = 0;
    let overBudgetFrames = 0;

    const frame = (now: number) => {
      if (!running) return;
      if (!startMs) startMs = now;

      if (lastFrameMs) {
        const delta = now - lastFrameMs;
        avgFrameMs += (delta - avgFrameMs) * 0.1; // EMA
        if (avgFrameMs > 24 && tierIdx < tiers.length - 1) {
          overBudgetFrames += 1;
          if (overBudgetFrames > 45) {
            tierIdx += 1;
            ocean.setRenderScale(tiers[tierIdx]);
            size();
            avgFrameMs = 16;
            overBudgetFrames = 0;
          }
        } else {
          overBudgetFrames = Math.max(0, overBudgetFrames - 1);
        }
      }
      lastFrameMs = now;

      const tSec = (now - startMs - pausedAccum) / 1000;
      ocean.draw(tSec);
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      if (pauseStart) {
        pausedAccum += performance.now() - pauseStart;
        pauseStart = 0;
      }
      lastFrameMs = 0; // don't count the paused gap as one giant frame
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (!running) return;
      running = false;
      pauseStart = performance.now();
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);

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
      ocean.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [knobs]);

  return <canvas ref={canvasRef} aria-hidden role="presentation" className={className} />;
}
