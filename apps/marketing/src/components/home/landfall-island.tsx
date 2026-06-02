import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export type IslandProps = {
  href: string;
  side: 'left' | 'right';
  eyebrow: string;
  title: ReactNode;
  body: string;
  motif: ReactNode;
  /** Accessible name for the whole destination link. */
  ariaLabel: string;
  /** Earthier (home services) vs cooler (real estate) cream — never identical. */
  warmth: 'warm' | 'cool';
};

/**
 * One landfall island — a full destination, not a card. Rises from the water
 * (Reveal in the parent), carries its own niche identity, lifts + lights on
 * hover/focus while the sibling recedes (`:has()` rule in globals.css).
 * A single focusable <Link>. See PLAN.md §E.
 */
export function LandfallIsland({
  href,
  side,
  eyebrow,
  title,
  body,
  motif,
  ariaLabel,
  warmth,
}: IslandProps): JSX.Element {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cn(
        'island group relative flex min-h-[clamp(22rem,42vh,30rem)] flex-col justify-end overflow-hidden rounded-[28px] border p-8 sm:p-10',
        'transition duration-500 ease-voyage will-change-transform',
        'hover:-translate-y-2 focus-visible:-translate-y-2 focus-visible:outline-none',
        'focus-visible:ring-2 focus-visible:ring-brand-warmgold focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1a]',
        side === 'left' ? 'island--left' : 'island--right',
        warmth === 'warm'
          ? 'border-brand-gold/35 bg-gradient-to-b from-[#fbf6ea] via-brand-cream to-[#f3ead6]'
          : 'border-brand-warmgold/30 bg-gradient-to-b from-[#fbfaf6] via-brand-cream to-[#ece9e2]',
      )}
    >
      {/* Coastline foam line — light on water meeting the shore. */}
      <span
        aria-hidden
        className="gold-seam absolute inset-x-0 top-0 opacity-90 transition-opacity duration-500 group-hover:opacity-100"
      />
      {/* Niche motif worked into the land — low-key, classy, not clip-art. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 flex h-1/2 items-start justify-center overflow-hidden opacity-[0.13] transition-opacity duration-500 group-hover:opacity-[0.2]"
      >
        {motif}
      </div>
      {/* Purple action glow blooms behind the CTA on hover (purple = land/action). */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-10 left-8 h-40 w-40 rounded-full bg-brand-purple/0 blur-3xl transition-all duration-500 group-hover:bg-brand-purple/25"
      />

      <div className="relative z-[1]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-brand-purple">
          {eyebrow}
        </p>
        <h3 className="mt-4 text-balance font-display text-[clamp(1.7rem,2.6vw,2.4rem)] font-medium leading-[1.08] tracking-[-0.015em] text-brand-charcoal">
          {title}
        </h3>
        <p className="mt-4 max-w-[40ch] text-[1.02rem] leading-[1.6] text-brand-slate">{body}</p>
        <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-purple">
          Chart this course
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 ease-voyage group-hover:translate-x-1"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}
