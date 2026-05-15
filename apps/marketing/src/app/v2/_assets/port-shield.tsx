/**
 * Heraldic shield as a port marker on the voyage. The app label inside is a
 * placeholder until Stitch generates per-app shields with the real logos.
 */
export function PortShield({
  label,
  active = false,
  className,
}: {
  label: string;
  active?: boolean;
  className?: string;
}): JSX.Element {
  const stroke = active ? '#E5C783' : '#8A7235';
  return (
    <svg
      viewBox="0 0 120 140"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`${label} port`}
    >
      <defs>
        <linearGradient id={`shieldFill-${label}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#142646" />
          <stop offset="1" stopColor="#050D1A" />
        </linearGradient>
      </defs>
      <path
        d="M60 6 L114 24 L114 78 Q114 116 60 134 Q6 116 6 78 L6 24 Z"
        fill={`url(#shieldFill-${label})`}
        stroke={stroke}
        strokeWidth={active ? '2' : '1.2'}
      />
      <line x1="14" y1="44" x2="106" y2="44" stroke={stroke} strokeWidth="0.8" opacity="0.7" />
      <text
        x="60"
        y="82"
        textAnchor="middle"
        fontFamily="serif"
        fontSize="14"
        fill={active ? '#E5C783' : '#C9A961'}
        opacity={active ? 1 : 0.85}
      >
        {label}
      </text>
    </svg>
  );
}
