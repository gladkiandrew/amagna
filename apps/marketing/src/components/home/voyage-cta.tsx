import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AUDIT_HREF, CALCOM_DIRECT_URL } from '@/lib/site';
import { cn } from '@/lib/utils';

/**
 * The two primary voyage CTAs (free audit + book a call), reused by the hero
 * and the dock. Quiet, premium treatment: a gold-filled editorial button (not
 * a loud pill) plus an understated hairline-underlined text link. `onDark`
 * swaps the palette for the dark-water hero (see PLAN.md §F).
 */
export function VoyageCtas({
  onDark = false,
  align = 'start',
  size = 'default',
  className,
}: {
  onDark?: boolean;
  align?: 'start' | 'center';
  /** `lg` enlarges the letters + button padding for the hero. */
  size?: 'default' | 'lg';
  className?: string;
}): JSX.Element {
  const ring = onDark ? 'focus-visible:ring-brand-warmgold' : 'focus-visible:ring-brand-purple';
  const lg = size === 'lg';
  const buttonText = lg ? 'px-8 py-4 text-[15px]' : 'px-7 py-3.5 text-[13px]';
  const linkText = lg ? 'text-[15px]' : 'text-[13px]';
  return (
    <div
      className={cn(
        'flex flex-col gap-4 sm:flex-row sm:gap-7',
        align === 'center'
          ? 'items-stretch sm:items-center sm:justify-center'
          : 'items-stretch sm:items-center',
        className,
      )}
    >
      <Link
        href={AUDIT_HREF}
        className={cn(
          'group inline-flex items-center justify-center gap-2 rounded-[3px] font-semibold uppercase tracking-[0.14em] transition duration-300 ease-voyage focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
          buttonText,
          onDark
            ? 'border border-brand-warmgold/80 bg-brand-warmgold/[0.12] text-brand-warmgold hover:border-brand-warmgold hover:bg-brand-warmgold hover:text-brand-deep'
            : 'border border-brand-purple/70 bg-brand-purple/[0.06] text-brand-purple hover:bg-brand-purple hover:text-white',
          ring,
        )}
      >
        Get Your Gold Map
        <ArrowRight
          className="h-3.5 w-3.5 transition-transform duration-300 ease-voyage group-hover:translate-x-0.5"
          aria-hidden
        />
      </Link>
      <a
        href={CALCOM_DIRECT_URL}
        className={cn(
          'inline-flex items-center justify-center gap-1.5 py-2 font-medium uppercase tracking-[0.14em] underline decoration-1 underline-offset-[6px] transition duration-300 ease-voyage focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent',
          linkText,
          onDark
            ? 'text-brand-cream/85 decoration-brand-warmgold/50 hover:text-brand-cream hover:decoration-brand-warmgold'
            : 'text-brand-charcoal/85 decoration-brand-purple/40 hover:text-brand-charcoal hover:decoration-brand-purple',
          ring,
        )}
      >
        Book a call
      </a>
    </div>
  );
}
