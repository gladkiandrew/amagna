'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { Ship } from '../_assets/ship';
import { PortShield } from '../_assets/port-shield';

const PORTS = [
  { label: 'Google', line: 'GBP, search, AI overviews — owned for you.' },
  { label: 'Meta', line: 'Targeting, creative, daily ad management.' },
  { label: 'Notion', line: 'Your client workspace, kept current daily.' },
  { label: 'Stripe', line: 'Subscriptions, invoicing, dunning — done.' },
  { label: 'Cal.com', line: 'Inbound booking on your owned domain.' },
  { label: 'Supabase', line: 'Your data, your audit trail, your asset.' },
  { label: 'Anthropic', line: 'Claude reasoning behind every decision.' },
] as const;

/**
 * Voyage — pin-scroll. The Amagna glides right across a 200vh band as the
 * user scrolls; ports light up as they enter the deck's sightline.
 *
 * useScroll measured on the outer ref → ship X interpolates from -10% to
 * +105% across the section. Each Port owns its own scroll-window via the
 * subcomponent so hooks aren't called inside a loop.
 */
export function Voyage(): JSX.Element {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const shipX = useTransform(scrollYProgress, [0.05, 0.95], ['-10%', '105%']);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-navy-deep"
      style={{ minHeight: '200vh' }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center">
        <div className="mx-auto w-full max-w-[1300px] px-6">
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.32em] text-gold/80">
              The Voyage
            </p>
            <h2 className="mx-auto mt-5 max-w-3xl font-serif text-[36px] leading-[1.1] text-white sm:text-5xl">
              We dock at every app
              <br />
              <span className="text-gold-bright">your business runs on.</span>
            </h2>
          </div>

          {/* Sail-track — long horizontal lane the ship glides across */}
          <div className="relative mt-16 h-[280px] sm:h-[320px]">
            <div className="absolute inset-x-0 top-1/2 h-px bg-gold/15" />
            <div className="absolute inset-x-0 top-[58%] flex justify-between gap-2 opacity-30">
              {Array.from({ length: 40 }).map((_, i) => (
                <span key={i} className="h-px w-3 bg-gold" />
              ))}
            </div>

            {/* Ports along the route */}
            <div className="absolute inset-x-0 top-0 grid h-full grid-cols-7">
              {PORTS.map((port, i) => (
                <Port
                  key={port.label}
                  label={port.label}
                  scrollYProgress={scrollYProgress}
                  start={i / PORTS.length}
                  end={(i + 1) / PORTS.length}
                />
              ))}
            </div>

            {/* The Amagna gliding across */}
            <motion.div
              style={{ x: shipX }}
              className="absolute top-[18%] h-32 w-32 sm:h-40 sm:w-40"
            >
              <Ship className="h-full w-full drop-shadow-[0_18px_36px_rgba(0,0,0,0.6)]" />
            </motion.div>
          </div>

          {/* Port descriptions — 7-col grid mirrors the shields above */}
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 text-left sm:grid-cols-3 lg:grid-cols-7">
            {PORTS.map((port) => (
              <div key={port.label}>
                <p className="font-serif text-base text-gold-bright">{port.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-white/55">{port.line}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Port({
  label,
  scrollYProgress,
  start,
  end,
}: {
  label: string;
  scrollYProgress: MotionValue<number>;
  start: number;
  end: number;
}): JSX.Element {
  const opacity = useTransform(
    scrollYProgress,
    [start - 0.04, start + 0.04, end + 0.04, end + 0.12],
    [0.35, 1, 1, 0.5],
  );
  const lift = useTransform(scrollYProgress, [start - 0.05, start + 0.04], [10, 0]);
  return (
    <motion.div style={{ opacity, y: lift }} className="flex flex-col items-center justify-end pb-2">
      <PortShield label={label} active className="h-24 w-20 sm:h-28 sm:w-24" />
    </motion.div>
  );
}
