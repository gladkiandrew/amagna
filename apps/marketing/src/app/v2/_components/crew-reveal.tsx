'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CrewIcon } from '../_assets/crew-icon';

const ROWERS = Array.from({ length: 50 }, (_, i) => i);

/**
 * Crew — 50 rower silhouettes reveal stagger-on-scroll, then the two
 * helmsmen (Claude + ChatGPT) light up at the wheel. The whole grid is
 * pinned to a navy panel between the hero and the voyage.
 */
export function CrewReveal(): JSX.Element {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-navy py-28 sm:py-36"
    >
      <div className="mx-auto w-full max-w-[1100px] px-6 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-gold/80">
          The Crew
        </p>
        <h2 className="mx-auto mt-5 max-w-3xl font-serif text-[36px] leading-[1.1] text-white sm:text-5xl lg:text-[58px]">
          Fifty hands on deck.
          <br />
          <span className="text-gold-bright">Two helmsmen at the wheel.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
          Every agent has a job — outreach, content, reviews, reporting, ops.
          Claude and ChatGPT navigate. We captain. You watch the ship move.
        </p>

        {/* Helmsmen row */}
        <div className="mt-14 flex items-end justify-center gap-12">
          {[
            { name: 'Claude', role: 'Reasoning & strategy' },
            { name: 'ChatGPT', role: 'Drafting & velocity' },
          ].map((helm, i) => (
            <motion.div
              key={helm.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.15, duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <CrewIcon variant="helmsman" className="h-20 w-20" />
              <p className="mt-3 font-serif text-lg text-gold-bright">{helm.name}</p>
              <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                {helm.role}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Crew grid — staggered reveal */}
        <div className="mt-16 grid grid-cols-10 gap-3 sm:gap-4">
          {ROWERS.map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.4 + (i % 10) * 0.04 + Math.floor(i / 10) * 0.05,
                duration: 0.45,
              }}
              className="flex items-center justify-center"
            >
              <CrewIcon className="h-9 w-9 sm:h-11 sm:w-11" />
            </motion.div>
          ))}
        </div>

        <p className="mt-12 text-sm text-white/50">
          Fifty AI agents working your business 24 hours a day. We captain the fleet.
        </p>
      </div>
    </section>
  );
}
