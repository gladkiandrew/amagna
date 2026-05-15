/**
 * The Amagna — placeholder SVG ship. Tall heraldic silhouette in navy hull
 * with gold trim and three sails. Stitch-generated artwork will replace this
 * once STITCH_API_KEY is exported. The component contract (className passed
 * through) stays stable so the swap is one line.
 */
export function Ship({ className }: { className?: string }): JSX.Element {
  return (
    <svg
      viewBox="0 0 480 480"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="The Amagna — a tall ship on a digital sea"
    >
      <defs>
        <linearGradient id="hullGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#142646" />
          <stop offset="1" stopColor="#050D1A" />
        </linearGradient>
        <linearGradient id="sailGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FAF8F3" stopOpacity="0.95" />
          <stop offset="1" stopColor="#E5C783" stopOpacity="0.55" />
        </linearGradient>
        <radialGradient id="lanternGrad" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#E5C783" />
          <stop offset="1" stopColor="#C9A961" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Three masts */}
      <line x1="120" y1="80" x2="120" y2="340" stroke="#8A7235" strokeWidth="3" />
      <line x1="240" y1="40" x2="240" y2="340" stroke="#8A7235" strokeWidth="3.5" />
      <line x1="360" y1="90" x2="360" y2="340" stroke="#8A7235" strokeWidth="3" />

      {/* Sails — billowing, layered */}
      <path
        d="M120 95 Q70 150 95 220 L120 220 Z"
        fill="url(#sailGrad)"
        opacity="0.9"
      />
      <path
        d="M120 95 Q170 150 145 220 L120 220 Z"
        fill="url(#sailGrad)"
        opacity="0.7"
      />
      <path
        d="M240 55 Q170 140 200 250 L240 250 Z"
        fill="url(#sailGrad)"
      />
      <path
        d="M240 55 Q310 140 280 250 L240 250 Z"
        fill="url(#sailGrad)"
        opacity="0.85"
      />
      <path
        d="M360 105 Q310 160 335 230 L360 230 Z"
        fill="url(#sailGrad)"
        opacity="0.9"
      />
      <path
        d="M360 105 Q410 160 385 230 L360 230 Z"
        fill="url(#sailGrad)"
        opacity="0.7"
      />

      {/* Pennants */}
      <path d="M120 80 L150 86 L120 92 Z" fill="#E5C783" />
      <path d="M240 40 L275 47 L240 54 Z" fill="#E5C783" />
      <path d="M360 90 L390 96 L360 102 Z" fill="#E5C783" />

      {/* Hull */}
      <path
        d="M60 340 L420 340 L380 410 Q240 440 100 410 Z"
        fill="url(#hullGrad)"
        stroke="#C9A961"
        strokeWidth="1.5"
      />

      {/* Gold trim — gunwale line + portholes */}
      <line x1="80" y1="360" x2="400" y2="360" stroke="#C9A961" strokeWidth="1.2" opacity="0.7" />
      <circle cx="140" cy="378" r="4" fill="none" stroke="#C9A961" strokeWidth="1" />
      <circle cx="180" cy="380" r="4" fill="none" stroke="#C9A961" strokeWidth="1" />
      <circle cx="220" cy="382" r="4" fill="none" stroke="#C9A961" strokeWidth="1" />
      <circle cx="260" cy="382" r="4" fill="none" stroke="#C9A961" strokeWidth="1" />
      <circle cx="300" cy="380" r="4" fill="none" stroke="#C9A961" strokeWidth="1" />
      <circle cx="340" cy="378" r="4" fill="none" stroke="#C9A961" strokeWidth="1" />

      {/* Stern lantern with glow */}
      <circle cx="60" cy="335" r="28" fill="url(#lanternGrad)" opacity="0.9" />
      <rect x="55" y="320" width="10" height="14" fill="#E5C783" rx="1" />

      {/* Bowsprit */}
      <line x1="420" y1="345" x2="460" y2="325" stroke="#8A7235" strokeWidth="2.5" />

      {/* Wheel/helm hint */}
      <circle cx="240" cy="320" r="8" fill="none" stroke="#C9A961" strokeWidth="1.2" />
      <circle cx="240" cy="320" r="2" fill="#C9A961" />
    </svg>
  );
}
