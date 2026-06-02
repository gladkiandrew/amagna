'use client';

import type { ReactNode } from 'react';
import { useInView } from './ocean/use-in-view';
import { cn } from '@/lib/utils';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger direct children (set style `--i` 0,1,2… on each). */
  stagger?: boolean;
};

/**
 * Scroll-reveal wrapper. Toggles `.is-visible` via IntersectionObserver; the
 * actual transition lives in globals.css (`.reveal` / `.reveal-stagger`) and is
 * disabled under prefers-reduced-motion. Compositor-only (transform/opacity).
 */
export function Reveal({ children, className, stagger = false }: RevealProps): JSX.Element {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn(stagger ? 'reveal-stagger' : 'reveal', inView && 'is-visible', className)}
    >
      {children}
    </div>
  );
}
