'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/components/home/ocean/use-reduced-motion';

/**
 * Frame 2 ship — sails into view as the user scrolls out of the hero, per the
 * voyage contract's ship physics:
 *  - forward travel = EASED scroll progress (inertia, drifts a beat after you stop)
 *  - buoyant bob = a live sine wave (alive even when idle)
 *  - pitch = a phase-shifted slope of the same motion (rides the swell)
 *
 * One small rAF loop, gated by IntersectionObserver + tab visibility (the only
 * new loop in Frame 2). `prefers-reduced-motion` → static resting pose, no loop.
 * Decorative: aria-hidden. Uses the restored gold dragon-ship SVG (11 KB vector;
 * chosen over the 6–7 MB crew PNGs for performance — logged in REPORT-2).
 */
export function VoyageShip({ className }: { className?: string }): JSX.Element {
  const wrapRef = useRef<HTMLDivElement>(null);
  const shipRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const wrap = wrapRef.current;
    const ship = shipRef.current;
    if (!wrap || !ship) return;

    let raf = 0;
    let running = false;
    let startMs = 0;
    let pausedAccum = 0;
    let pauseStart = 0;
    let p = 0; // eased progress 0..1

    const frame = (now: number) => {
      if (!running) return;
      if (!startMs) startMs = now;
      const t = (now - startMs - pausedAccum) / 1000;

      // Raw progress: how far Frame 2 has risen into the viewport (one layout
      // read per frame, inside the loop — never in an event handler).
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const raw = Math.min(Math.max((vh - rect.top) / (vh * 0.85), 0), 1);
      p += (raw - p) * 0.07; // inertia — the ship drifts after you stop scrolling

      const travel = (1 - p) * 118; // from +118% (offscreen right) to 0 (rest)
      const bob = Math.sin(t * 1.05) * 7;
      const pitch = Math.sin(t * 1.05 + 0.7) * 2.0;
      ship.style.transform = `translate3d(${travel.toFixed(2)}%, ${bob.toFixed(2)}px, 0) rotate(${pitch.toFixed(2)}deg)`;
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

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0, rootMargin: '300px 0px 300px 0px' },
    );
    io.observe(wrap);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reduced]);

  return (
    <div ref={wrapRef} className={className} aria-hidden>
      <div
        ref={shipRef}
        className="will-change-transform"
        // Start offscreen-right under motion; rest in place under reduced motion.
        style={{ transform: reduced ? 'none' : 'translate3d(118%, 0, 0)' }}
      >
        <Image
          src="/brand/ship-display-hull-gold.svg"
          alt=""
          width={360}
          height={300}
          className="h-auto w-[clamp(150px,26vw,340px)] drop-shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
        />
      </div>
    </div>
  );
}
