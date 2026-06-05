'use client';

import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { CREW } from '@/lib/crew';
import { useInView } from '@/components/home/ocean/use-in-view';
import { VoyageShip } from './voyage-ship';

/**
 * Frame 2 — VoyageReveal. The crew ship sails in as you scroll out of the hero,
 * then the five-agent crew is introduced in columns. Real portraits
 * (`public/brand/crew/<slug>.webp`); Zeno, the captain, gets a brighter double
 * ring + a captain's mark. Scroll reveals use the shared IntersectionObserver +
 * CSS-transition stagger (reduced-motion → final states). Closes into the footer
 * — the section is content-sized, no dead empty band.
 */
export function VoyageReveal(): JSX.Element {
  const head = useInView<HTMLDivElement>();
  const grid = useInView<HTMLDivElement>();

  return (
    <section
      aria-labelledby="crew-frame-title"
      className="relative w-full overflow-hidden bg-brand-deep"
    >
      {/* Gradient seam from the hero's dark water into the deep-purple night. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#05080F] to-transparent"
      />

      {/* The ship sails in across the top-right. */}
      <VoyageShip className="pointer-events-none absolute right-[3%] top-16 z-0 sm:top-12" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-24 pt-[26vh] sm:pt-[30vh]">
        {/* Heading */}
        <div
          ref={head.ref}
          className={`reveal max-w-[42rem] ${head.inView ? 'is-visible' : ''}`}
        >
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-warmgold">
            <span aria-hidden className="h-px w-7 bg-brand-warmgold/55" />
            The crew aboard
          </p>
          <h2
            id="crew-frame-title"
            className="mt-5 font-display text-[clamp(2rem,4.6vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-brand-cream"
          >
            A full team sails your marketing.
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg leading-[1.6] text-brand-cream/75">
            Five specialized agents, each with one job and a human watching the wheel —
            captained by Zeno. Meet the crew.
          </p>
        </div>

        {/* Crew columns */}
        <div
          ref={grid.ref}
          className={`reveal-stagger mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 ${grid.inView ? 'is-visible' : ''}`}
        >
          {CREW.map((member, i) => (
            <Link
              key={member.slug}
              href={`/crew#${member.slug}`}
              style={{ '--i': i } as CSSProperties}
              className="group flex flex-col rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-brand-warmgold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-deep"
            >
              {/* Portrait — gold ring on deep navy; captain gets a brighter
                  double ring. */}
              <div
                className={
                  'relative aspect-[4/5] overflow-hidden rounded-xl bg-brand-deep ' +
                  (member.captain
                    ? 'border-2 border-brand-warmgold ring-2 ring-brand-gold/40 ring-offset-2 ring-offset-brand-deep'
                    : 'border border-brand-gold/35')
                }
              >
                <Image
                  src={`/brand/crew/${member.slug}.webp`}
                  alt={`${member.name}, ${member.title}`}
                  fill
                  sizes="(min-width:1024px) 18vw, (min-width:640px) 30vw, 45vw"
                  className="object-cover object-[center_22%] transition-transform duration-500 ease-voyage group-hover:scale-[1.04]"
                />
                {member.captain && (
                  <span className="absolute left-2 top-2 rounded-full bg-brand-deep/80 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-brand-warmgold ring-1 ring-brand-warmgold/50">
                    Captain
                  </span>
                )}
              </div>

              <p className="mt-4 font-display text-xl font-semibold text-brand-cream">
                {member.name}
              </p>
              <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-warmgold">
                {member.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-brand-cream/70">{member.blurb}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-cream/60 transition-colors group-hover:text-brand-warmgold">
                Meet {member.name}
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-300 ease-voyage group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
