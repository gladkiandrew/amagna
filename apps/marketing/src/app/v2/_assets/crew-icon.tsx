/**
 * Minimal AI-agent silhouette. Two variants:
 *   - rower:    crew, generic working pose
 *   - helmsman: highlighted at the wheel (Claude, ChatGPT)
 * Pure SVG, monochrome gold-on-navy. Swap with Stitch artwork later.
 */
export function CrewIcon({
  variant = 'rower',
  className,
}: {
  variant?: 'rower' | 'helmsman';
  className?: string;
}): JSX.Element {
  const stroke = variant === 'helmsman' ? '#E5C783' : '#C9A961';
  const opacity = variant === 'helmsman' ? 1 : 0.85;
  return (
    <svg
      viewBox="0 0 60 60"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Head */}
      <circle cx="30" cy="16" r="6" fill="none" stroke={stroke} strokeWidth="1.4" opacity={opacity} />
      {/* Body / robe */}
      <path
        d="M16 50 Q16 30 30 26 Q44 30 44 50 Z"
        fill="none"
        stroke={stroke}
        strokeWidth="1.4"
        opacity={opacity}
      />
      {variant === 'rower' ? (
        // Oar across the body
        <line x1="10" y1="38" x2="50" y2="32" stroke={stroke} strokeWidth="1.4" opacity={opacity} />
      ) : (
        // Helm wheel
        <g opacity={opacity}>
          <circle cx="46" cy="32" r="8" fill="none" stroke={stroke} strokeWidth="1.4" />
          <line x1="46" y1="24" x2="46" y2="40" stroke={stroke} strokeWidth="1.2" />
          <line x1="38" y1="32" x2="54" y2="32" stroke={stroke} strokeWidth="1.2" />
        </g>
      )}
    </svg>
  );
}
