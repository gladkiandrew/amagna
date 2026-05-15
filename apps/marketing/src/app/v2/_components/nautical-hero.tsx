'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Ship } from '../_assets/ship';
import { Ocean } from '../_assets/ocean';

/**
 * Hero — full viewport. The Amagna sails on a digital ocean.
 *
 *  - Mouse-move parallax on desktop only (skip on touch + reduced-motion).
 *  - Stars get a small offset, ship gets a larger one, headline barely moves.
 *  - The ship gently rocks in place via a continuous y-spring (independent of
 *    the parallax), so the scene breathes when the mouse is still.
 */
export function NauticalHero(): JSX.Element {
  const ref = useRef<HTMLElement | null>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [allowParallax, setAllowParallax] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    // Touch devices skip parallax — coarse pointer = no precise mouse.
    const isFine =
      typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;
    setAllowParallax(isFine);
  }, [reduce]);

  useEffect(() => {
    if (!allowParallax) return;
    const node = ref.current;
    if (!node) return;
    const onMove = (e: PointerEvent): void => {
      const rect = node.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setPointer({ x, y });
    };
    node.addEventListener('pointermove', onMove);
    return () => node.removeEventListener('pointermove', onMove);
  }, [allowParallax]);

  // Parallax magnitudes — keep them small so the page never feels seasick.
  const starsX = pointer.x * 14;
  const starsY = pointer.y * 8;
  const shipX = pointer.x * -36;
  const shipY = pointer.y * -16;
  const headlineX = pointer.x * 6;

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{ x: starsX, y: starsY }}
        transition={{ type: 'spring', stiffness: 60, damping: 18, mass: 0.5 }}
      >
        <Ocean />
      </motion.div>

      <div className="relative mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-10 px-6 pb-24 pt-32 sm:pt-40 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <motion.div
          animate={{ x: headlineX }}
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-gold/80">
            The Amagna · Set sail
          </p>
          <h1 className="mt-6 font-serif text-[44px] leading-[1.05] text-white sm:text-6xl lg:text-[78px]">
            Captain the AI.
            <br />
            <span className="text-gold-bright">Dock at every app.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            We crew a fleet of fifty AI agents and steer it through the apps your
            business already runs on — Google, Meta, Notion, Stripe, Cal.com, more —
            so you collect the spoils without ever touching a dashboard.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/audit"
              className="group inline-flex items-center gap-2 rounded-full bg-gold-bright px-7 py-3.5 text-sm font-semibold text-navy-deep transition-colors hover:bg-gold"
            >
              Get your free audit
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href="/checkout"
              className="text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              Or subscribe direct
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto h-[360px] w-[360px] sm:h-[460px] sm:w-[460px] lg:h-[520px] lg:w-[520px]"
          animate={{ x: shipX, y: shipY }}
          transition={{ type: 'spring', stiffness: 40, damping: 15, mass: 0.8 }}
        >
          <motion.div
            className="absolute inset-0"
            animate={reduce ? {} : { y: [0, -10, 0, 8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Ship className="h-full w-full drop-shadow-[0_24px_48px_rgba(0,0,0,0.5)]" />
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle scroll indicator */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
        <span className="text-[10px] uppercase tracking-[0.32em] text-white/40">
          Scroll · meet the crew
        </span>
      </div>
    </section>
  );
}
