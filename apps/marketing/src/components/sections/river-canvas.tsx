import type { CSSProperties } from 'react';

/**
 * RiverCanvas — the universal Amagna page canvas below a dark hero.
 *
 * Identity piece: the site's cream canvas carries a quiet "river" of brand
 * purple and gold — a main current running down the right side of the page
 * (wide soft bed-glow bands + thin luminous streaks drifting slowly downward)
 * and a fainter counter-strand on the far left. It reads as the light-canvas
 * cousin of the hero's ocean: the water the ship sails becomes the current
 * that runs the site.
 *
 * Server-rendered, zero JS, CSS-only motion (`.river-streak` in globals.css,
 * transform+opacity, static under prefers-reduced-motion). The layer sits at
 * -z-10 behind the page content; solid cards float over it, and it glows in
 * the whitespace — so it never competes with reading and text contrast on
 * the cream canvas is untouched.
 *
 * `seam` renders the dawn transition at the top: the hero's dark water fades
 * through the brand's deep-purple night haze into the cream canvas, with the
 * existing `.gold-seam` hairline as the horizon line. In-flow (not absolute),
 * so content below it always starts on clean canvas.
 */

type Streak = {
  left: string;
  top: string;
  color: 'purple' | 'gold';
  dur: number;
  delay: number;
  peak: number;
  h?: string;
};

// The main current (right of center) + the faint counter-strand (far left).
// Negative delays start every streak mid-flight so the river is always
// flowing, from the first paint.
const STREAKS: readonly Streak[] = [
  // main current — meanders from ~69% to ~90% across the page height
  { left: '71%', top: '2%', color: 'purple', dur: 34, delay: -6, peak: 0.55 },
  { left: '76%', top: '9%', color: 'gold', dur: 42, delay: -21, peak: 0.6, h: '52vh' },
  { left: '83%', top: '18%', color: 'purple', dur: 30, delay: -12, peak: 0.5 },
  { left: '69%', top: '30%', color: 'gold', dur: 38, delay: -30, peak: 0.55 },
  { left: '79%', top: '41%', color: 'purple', dur: 44, delay: -18, peak: 0.6, h: '56vh' },
  { left: '88%', top: '52%', color: 'gold', dur: 32, delay: -4, peak: 0.5 },
  { left: '73%', top: '63%', color: 'purple', dur: 40, delay: -26, peak: 0.55 },
  { left: '84%', top: '74%', color: 'gold', dur: 36, delay: -14, peak: 0.6, h: '48vh' },
  { left: '77%', top: '85%', color: 'purple', dur: 34, delay: -9, peak: 0.5 },
  // counter-strand — quiet balance on the far left
  { left: '6%', top: '12%', color: 'gold', dur: 46, delay: -19, peak: 0.35 },
  { left: '10%', top: '38%', color: 'purple', dur: 40, delay: -33, peak: 0.35, h: '36vh' },
  { left: '5%', top: '64%', color: 'purple', dur: 44, delay: -8, peak: 0.3 },
  { left: '11%', top: '86%', color: 'gold', dur: 38, delay: -24, peak: 0.35, h: '38vh' },
] as const;

function streakStyle(s: Streak): CSSProperties {
  return {
    left: s.left,
    top: s.top,
    '--river-dur': `${s.dur}s`,
    '--river-delay': `${s.delay}s`,
    '--river-peak': s.peak,
    ...(s.h ? { '--river-h': s.h } : null),
  } as CSSProperties;
}

/** The riverbed — soft elliptical glows (soft-edged by construction, no hard
 *  band lines) tracing a meander down the right side, plus two still pools. */
const BED: readonly CSSProperties[] = [
  // the meander: alternating purple/gold ellipses, offset left/right
  {
    left: '58%',
    top: '-4%',
    width: '34%',
    height: '34%',
    background: 'radial-gradient(50% 50% at 50% 50%, rgb(93 46 140 / 0.07), transparent 70%)',
  },
  {
    left: '66%',
    top: '24%',
    width: '30%',
    height: '32%',
    background: 'radial-gradient(50% 50% at 50% 50%, rgb(201 169 97 / 0.09), transparent 70%)',
  },
  {
    left: '60%',
    top: '50%',
    width: '32%',
    height: '34%',
    background: 'radial-gradient(50% 50% at 50% 50%, rgb(93 46 140 / 0.06), transparent 70%)',
  },
  {
    left: '68%',
    top: '78%',
    width: '30%',
    height: '30%',
    background: 'radial-gradient(50% 50% at 50% 50%, rgb(201 169 97 / 0.08), transparent 70%)',
  },
  // still pools for depth (purple high-left, gold low-left)
  {
    left: '-12%',
    top: '4%',
    width: '52%',
    height: '34%',
    background: 'radial-gradient(50% 50% at 50% 50%, rgb(93 46 140 / 0.06), transparent 70%)',
  },
  {
    left: '-8%',
    top: '62%',
    width: '44%',
    height: '30%',
    background: 'radial-gradient(50% 50% at 50% 50%, rgb(201 169 97 / 0.07), transparent 70%)',
  },
] as const;

export function RiverCanvas({
  seam = false,
  children,
}: {
  /** Render the dark-hero → cream dawn transition band at the top. */
  seam?: boolean;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="relative isolate bg-brand-cream">
      {/* The river — fixed cast of streaks over the static bed. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {BED.map((style, i) => (
          <div key={`bed-${i}`} className="absolute" style={style} />
        ))}
        {STREAKS.map((s, i) => (
          <div key={`streak-${i}`} className={`river-streak river-streak--${s.color}`} style={streakStyle(s)} />
        ))}
      </div>

      {/* Dawn seam — the ocean's night water settles into the cream canvas.
          In-flow, so everything after it starts on clean canvas. */}
      {seam && (
        <div aria-hidden className="relative h-[26vh] min-h-[160px]">
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, #05080F 0%, #0B0A1C 22%, rgba(26,14,54,0.72) 40%, rgba(93,46,140,0.13) 66%, rgba(93,46,140,0.05) 82%, rgba(250,248,243,0) 100%)',
            }}
          />
          <div className="gold-seam absolute inset-x-0 top-[32%] opacity-60" />
        </div>
      )}

      {children}
    </div>
  );
}
