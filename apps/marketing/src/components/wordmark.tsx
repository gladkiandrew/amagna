import { cn } from '@/lib/utils';

type WordmarkProps = {
  /** 'default' for light backgrounds, 'onDark' for dark backgrounds. */
  variant?: 'default' | 'onDark';
  className?: string;
};

/**
 * The Amagna AI typographic wordmark.
 *
 * NOTE: the SVG logo files in public/brand/amagna/ are currently 21-byte
 * placeholder stubs ("This is an image file"), not real artwork. Until real
 * SVGs land, this component IS the logo — built to the lockup spec in
 * docs/brand/brand-colors.md (weight 600, tight tracking, purple + gold).
 * When real SVGs arrive, swap the internals for next/image and keep the API.
 */
export function Wordmark({ variant = 'default', className }: WordmarkProps): JSX.Element {
  const amagnaColor = variant === 'onDark' ? 'text-white' : 'text-royal-purple';
  const aiColor = variant === 'onDark' ? 'text-dark-mode-gold' : 'text-antique-gold';

  return (
    <span
      className={cn('inline-flex items-baseline gap-[0.18em] font-semibold leading-none', className)}
      aria-label="Amagna AI"
    >
      <span className={cn('tracking-[-0.03em]', amagnaColor)}>Amagna</span>
      <span className={cn('tracking-[-0.01em]', aiColor)}>AI</span>
    </span>
  );
}
