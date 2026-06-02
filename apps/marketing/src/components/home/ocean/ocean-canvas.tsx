'use client';

import { useEffect, useRef } from 'react';
import { OceanEngine, detectTier } from './ocean-engine';
import { useReducedMotion } from './use-reduced-motion';

/**
 * The voyage ocean — one fixed full-bleed canvas behind all page content
 * (see PLAN.md §A). Cream sections are opaque and cover it; dark sections
 * (marked `data-ocean`) are transparent and reveal the live sea.
 *
 * - Inputs (scroll/pointer/resize) are write-only; the single rAF loop is the
 *   sole writer to the screen.
 * - Paused on tab-hide and when no `[data-ocean]` section is in view.
 * - One adaptive DPR downgrade on sustained slow frames.
 * - prefers-reduced-motion → one static frame, no loop.
 */
export function OceanCanvas(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const tier = detectTier();
    const engine = new OceanEngine(ctx, tier);
    let disposed = false;

    // --- layout measurement (only on load + resize, never on scroll) ---
    let dprMultiplier = 1; // lowered once if frames are slow
    const measure = (): void => {
      const cssW = window.innerWidth;
      const cssH = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, engine.dprCap) * dprMultiplier;
      canvas.width = Math.max(1, Math.round(cssW * dpr));
      canvas.height = Math.max(1, Math.round(cssH * dpr));
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      engine.resize(cssW, cssH, dpr);
      if (!running) engine.render(); // keep a fresh frame when paused/reduced
    };

    // --- write-only inputs ---
    const raw = { scrollY: typeof window !== 'undefined' ? window.scrollY : 0 };
    const onScroll = (): void => {
      raw.scrollY = window.scrollY;
    };
    const onPointer = (e: PointerEvent): void => {
      engine.setPointer(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
    };
    const pageProgress = (): number => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return max > 0 ? raw.scrollY / max : 0;
    };

    // --- the one loop ---
    let rafId: number | null = null;
    let running = false;
    let last = 0;
    let emaDt = 16;
    let slowFrames = 0;
    let downgraded = false;

    const tick = (now: number): void => {
      if (!running || disposed) {
        rafId = null;
        return;
      }
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      engine.setProgress(pageProgress());
      engine.update(dt);
      engine.render();

      // Adaptive: one DPR downgrade if we stay slow (skip first warm-up frames).
      emaDt = emaDt * 0.9 + dt * 1000 * 0.1;
      if (!downgraded && emaDt > 26) {
        if (++slowFrames > 90) {
          downgraded = true;
          dprMultiplier = 0.67;
          measure();
        }
      } else if (emaDt < 20) {
        slowFrames = 0;
      }

      rafId = requestAnimationFrame(tick);
    };

    const start = (): void => {
      if (running || disposed) return;
      running = true;
      last = performance.now();
      rafId = requestAnimationFrame(tick);
    };
    const stop = (): void => {
      running = false;
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = null;
    };

    // --- load the ship sprite (sized for cross-browser canvas rasterization) ---
    void (async () => {
      try {
        const res = await fetch('/brand/ship-display-hull-gold.svg');
        let svg = await res.text();
        const head = svg.slice(0, svg.indexOf('>'));
        if (!/\bwidth=/.test(head)) {
          svg = svg.replace('<svg ', '<svg width="720" height="600" ');
        }
        const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
        const img = new Image();
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error('ship sprite failed'));
          img.src = url;
        });
        URL.revokeObjectURL(url);
        if (disposed) return;
        engine.setShip(img);
        if (!running) engine.render(); // repaint static frame with the ship
      } catch {
        /* ship is decorative; the sea renders fine without it */
      }
    })();

    measure();

    // --- reduced motion: one static frame, no loop, no input listeners ---
    if (reduced) {
      engine.renderStatic();
      const ro = new ResizeObserver(() => {
        measure();
        engine.renderStatic();
      });
      ro.observe(document.documentElement);
      return () => {
        disposed = true;
        ro.disconnect();
      };
    }

    // --- visibility + in-view gating ---
    const visibleOcean = new Set<Element>();
    const sections = Array.from(document.querySelectorAll('[data-ocean]'));
    let io: IntersectionObserver | null = null;

    const syncRunning = (): void => {
      const shouldRun = !document.hidden && (sections.length === 0 || visibleOcean.size > 0);
      if (shouldRun) start();
      else stop();
    };

    if (sections.length > 0) {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) visibleOcean.add(e.target);
            else visibleOcean.delete(e.target);
          }
          syncRunning();
        },
        { rootMargin: '120px' },
      );
      sections.forEach((s) => io!.observe(s));
    }

    const onVisibility = (): void => syncRunning();

    window.addEventListener('scroll', onScroll, { passive: true });
    if (window.matchMedia('(pointer: fine)').matches) {
      window.addEventListener('pointermove', onPointer, { passive: true });
    }
    document.addEventListener('visibilitychange', onVisibility);

    const ro = new ResizeObserver(() => measure());
    ro.observe(document.documentElement);

    start();
    syncRunning();

    return () => {
      disposed = true;
      stop();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointer as EventListener);
      document.removeEventListener('visibilitychange', onVisibility);
      io?.disconnect();
      ro.disconnect();
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      role="presentation"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
