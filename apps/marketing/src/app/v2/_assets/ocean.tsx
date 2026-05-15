/**
 * Digital ocean — dark navy gradient with a randomized starfield and two
 * slow gold "current" lines suggesting horizon and depth. Pure SVG so it
 * scales without raster artifacts and weighs almost nothing.
 *
 * Pure presentational: any parent layer can stack content above by using
 * `relative` siblings; this component renders absolutely.
 */
function DeterministicStars({ count, seed }: { count: number; seed: number }): JSX.Element {
  // Tiny deterministic PRNG so the starfield doesn't shift on hydration.
  let s = seed >>> 0;
  const rand = (): number => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
  const stars = Array.from({ length: count }, () => ({
    cx: rand() * 100,
    cy: rand() * 100,
    r: 0.3 + rand() * 1.2,
    o: 0.35 + rand() * 0.55,
  }));
  return (
    <g>
      {stars.map((star, i) => (
        <circle
          key={i}
          cx={`${star.cx}%`}
          cy={`${star.cy}%`}
          r={star.r}
          fill="#E5C783"
          opacity={star.o}
        />
      ))}
    </g>
  );
}

export function Ocean({ className }: { className?: string }): JSX.Element {
  return (
    <div className={className ?? 'absolute inset-0 -z-0 overflow-hidden'}>
      {/* Vertical gradient — sky on top, deeper sea below */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, #142646 0%, #0A1628 45%, #050D1A 100%)',
        }}
      />

      {/* Starfield SVG */}
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <DeterministicStars count={120} seed={1337} />
      </svg>

      {/* Horizon — two slow gold currents */}
      <svg
        className="absolute inset-x-0 bottom-0 h-1/2 w-full"
        viewBox="0 0 1200 600"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 320 Q300 290 600 320 T1200 320"
          stroke="#C9A961"
          strokeWidth="1"
          fill="none"
          opacity="0.25"
        />
        <path
          d="M0 420 Q300 390 600 420 T1200 420"
          stroke="#C9A961"
          strokeWidth="0.8"
          fill="none"
          opacity="0.18"
        />
        <path
          d="M0 520 Q300 490 600 520 T1200 520"
          stroke="#C9A961"
          strokeWidth="0.6"
          fill="none"
          opacity="0.12"
        />
      </svg>

      {/* Top vignette so headlines sit on a darker patch */}
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-navy-deep/80 to-transparent" />
    </div>
  );
}
