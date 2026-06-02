import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'dark' | 'cream';

type SectionShellProps = {
  id?: string;
  labelledBy?: string;
  variant: Variant;
  children: ReactNode;
  className?: string;
  /** Inner content max-width + horizontal padding wrapper. Default true. */
  contained?: boolean;
  seamTop?: boolean;
  seamBottom?: boolean;
  grain?: boolean;
};

/**
 * Voyage section shell. `dark` = transparent (reveals the ocean canvas, marked
 * `data-ocean` so the engine knows to run); `cream` = opaque parchment panel.
 * Gold horizon seams mark the dark↔cream coastline. See PLAN.md §B.
 */
export function SectionShell({
  id,
  labelledBy,
  variant,
  children,
  className,
  contained = true,
  seamTop = false,
  seamBottom = false,
  grain = true,
}: SectionShellProps): JSX.Element {
  const dark = variant === 'dark';
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      {...(dark ? { 'data-ocean': '' } : {})}
      className={cn(
        'relative isolate w-full overflow-hidden',
        dark ? 'text-brand-cream' : 'bg-brand-cream text-brand-charcoal',
        grain && 'grain',
        'py-[var(--space-section)]',
        className,
      )}
    >
      {seamTop ? <div aria-hidden className="gold-seam absolute inset-x-0 top-0 z-[2]" /> : null}
      {contained ? (
        <div className="relative z-[2] mx-auto w-full max-w-[1100px] px-6">{children}</div>
      ) : (
        children
      )}
      {seamBottom ? (
        <div aria-hidden className="gold-seam absolute inset-x-0 bottom-0 z-[2]" />
      ) : null}
    </section>
  );
}
