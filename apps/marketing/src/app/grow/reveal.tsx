import type { ReactNode } from 'react';

/**
 * Entrance wrapper: content is ALWAYS visible (opacity 1 by default) and plays a
 * gentle rise-in on load via the `growRiseIn` CSS keyframe. No IntersectionObserver
 * and no opacity gating — so content can never get stuck hidden if JS/observer/CSS
 * is slow or unavailable. Respects prefers-reduced-motion (motion-safe only).
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}): JSX.Element {
  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className={`motion-safe:animate-[growRiseIn_0.7s_ease-out_both] ${className}`}
    >
      {children}
    </div>
  );
}
