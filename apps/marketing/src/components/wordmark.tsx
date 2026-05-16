import Image from 'next/image';
import { cn } from '@/lib/utils';

type WordmarkProps = {
  /** 'default' for light backgrounds, 'onDark' for dark backgrounds. */
  variant?: 'default' | 'onDark';
  /** Sizing/spacing overrides. Defaults to h-7 with width kept proportional. */
  className?: string;
};

/** Brand logo SVGs in public/brand/amagna/. viewBox is 280x60 (14:3). */
const LOGO_SRC = {
  default: '/brand/amagna/logo.svg',
  onDark: '/brand/amagna/logo-dark.svg',
} as const;

/**
 * The Amagna AI wordmark.
 *
 * default  -> logo.svg      (royal purple "Amagna" + antique gold "AI")
 * onDark   -> logo-dark.svg (white "Amagna" + dark-mode gold "AI")
 *
 * Pass a Tailwind height (e.g. h-8) via className to resize — width stays
 * proportional via w-auto.
 */
export function Wordmark({ variant = 'default', className }: WordmarkProps): JSX.Element {
  return (
    <Image
      src={LOGO_SRC[variant]}
      alt="Amagna AI"
      width={280}
      height={60}
      className={cn('h-7 w-auto', className)}
    />
  );
}
