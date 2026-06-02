import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AUDIT_HREF, BOOK_A_CALL_HREF } from '@/lib/site';
import { cn } from '@/lib/utils';

/**
 * The two primary voyage CTAs (free audit + book a call), reused by the hero
 * and the dock. Purple = action (on-brand even on dark water). `onDark` swaps
 * the secondary button + focus ring to warm-gold for contrast (see PLAN.md §F).
 */
export function VoyageCtas({
  onDark = false,
  align = 'start',
  className,
}: {
  onDark?: boolean;
  align?: 'start' | 'center';
  className?: string;
}): JSX.Element {
  const ring = onDark ? 'focus-visible:ring-brand-warmgold' : 'focus-visible:ring-brand-purple';
  return (
    <div
      className={cn(
        'flex flex-col gap-3 sm:flex-row sm:gap-4',
        align === 'center'
          ? 'items-stretch sm:items-center sm:justify-center'
          : 'items-start sm:items-center',
        className,
      )}
    >
      <Link
        href={AUDIT_HREF}
        className={cn(
          'group inline-flex items-center justify-center gap-2 rounded-full bg-brand-purple px-7 py-3.5 text-sm font-semibold tracking-wide text-white shadow-[0_14px_34px_-16px_rgba(93,46,140,0.9)] transition duration-300 ease-voyage hover:-translate-y-0.5 hover:bg-[#6c39a4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
          ring,
        )}
      >
        Get your free audit
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 ease-voyage group-hover:translate-x-0.5"
          aria-hidden
        />
      </Link>
      <Link
        href={BOOK_A_CALL_HREF}
        className={cn(
          'inline-flex items-center justify-center rounded-full border px-7 py-3.5 text-sm font-medium transition duration-300 ease-voyage hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
          onDark
            ? 'border-brand-warmgold/55 text-brand-cream hover:border-brand-warmgold hover:bg-white/[0.06]'
            : 'border-brand-purple/40 text-brand-purple hover:border-brand-purple hover:bg-brand-purple/[0.05]',
          ring,
        )}
      >
        Book a 20-minute call
      </Link>
    </div>
  );
}
