import type { CSSProperties } from 'react';

/**
 * RiverCanvas — the universal Amagna page canvas below a dark hero.
 *
 * Identity piece: the cream canvas carries a current of brand purple and
 * gold — luminous vertical streaks drifting slowly DOWN the page through a
 * meander of soft glow-pools that trace the river's course right-of-center,
 * with a faint counter-strand on the far left. Deliberately bolder than a
 * wash: the streaks are meant to be SEEN. Content floats over the layer and
 * the current glows through the whitespace, so reading contrast on the
 * cream canvas is never touched.
 *
 * Server-rendered, zero JS, CSS-only motion (`.river-streak` in globals.css:
 * transform + opacity only; parked faint and still under
 * prefers-reduced-motion).
 *
 * `seam` renders the compact dawn transition at the top: the hero's dark
 * water settles through a whisper of deep-purple haze into the cream canvas,
 * the gold hairline as the horizon. In-flow, so content below always starts
 * on clean canvas.
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
// One streak is anchored roughly every 5% of the page so EVERY viewport has
// several in frame; the travel band is tight (-28vh → 88vh, see globals.css)
// so streaks stay near their anchors, and negative delays start each one
// mid-flight so the current is always flowing, from the first paint.
const STREAKS: readonly Streak[] = [
  // main current — meanders between ~68% and ~90% on its way down
  { left: '71%', top: '0%', color: 'purple', dur: 34, delay: -6, peak: 0.85 },
  { left: '78%', top: '5%', color: 'gold', dur: 42, delay: -21, peak: 0.9, h: '56vh' },
  { left: '84%', top: '10%', color: 'purple', dur: 30, delay: -12, peak: 0.8 },
  { left: '88%', top: '15%', color: 'gold', dur: 36, delay: -2, peak: 0.75, h: '38vh' },
  { left: '73%', top: '20%', color: 'gold', dur: 38, delay: -30, peak: 0.85 },
  { left: '69%', top: '25%', color: 'purple', dur: 32, delay: -16, peak: 0.8, h: '52vh' },
  { left: '76%', top: '30%', color: 'purple', dur: 44, delay: -18, peak: 0.9, h: '58vh' },
  { left: '83%', top: '35%', color: 'gold', dur: 32, delay: -4, peak: 0.8 },
  { left: '87%', top: '40%', color: 'purple', dur: 36, delay: -28, peak: 0.75, h: '42vh' },
  { left: '79%', top: '45%', color: 'gold', dur: 40, delay: -34, peak: 0.85, h: '50vh' },
  { left: '72%', top: '50%', color: 'purple', dur: 34, delay: -11, peak: 0.8 },
  { left: '76%', top: '55%', color: 'gold', dur: 38, delay: -26, peak: 0.9, h: '54vh' },
  { left: '84%', top: '60%', color: 'purple', dur: 42, delay: -7, peak: 0.8, h: '44vh' },
  { left: '88%', top: '65%', color: 'gold', dur: 34, delay: -19, peak: 0.75 },
  { left: '80%', top: '70%', color: 'purple', dur: 36, delay: -31, peak: 0.85, h: '52vh' },
  { left: '74%', top: '75%', color: 'gold', dur: 40, delay: -14, peak: 0.9 },
  { left: '70%', top: '80%', color: 'purple', dur: 32, delay: -23, peak: 0.8, h: '46vh' },
  { left: '77%', top: '85%', color: 'gold', dur: 38, delay: -9, peak: 0.85, h: '50vh' },
  { left: '83%', top: '90%', color: 'purple', dur: 34, delay: -27, peak: 0.8 },
  { left: '79%', top: '95%', color: 'gold', dur: 36, delay: -17, peak: 0.85, h: '44vh' },
  // counter-strand — quiet balance on the far left
  { left: '6%', top: '8%', color: 'gold', dur: 46, delay: -19, peak: 0.55 },
  { left: '10%', top: '28%', color: 'purple', dur: 40, delay: -33, peak: 0.55, h: '38vh' },
  { left: '5%', top: '48%', color: 'purple', dur: 44, delay: -8, peak: 0.5 },
  { left: '11%', top: '68%', color: 'gold', dur: 38, delay: -24, peak: 0.55, h: '40vh' },
  { left: '7%', top: '88%', color: 'purple', dur: 42, delay: -15, peak: 0.5, h: '36vh' },
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

/** The riverbed — soft elliptical glows tracing the current's meander, plus
 *  two still pools on the far bank so the page never lists right. */
const BED: readonly CSSProperties[] = [
  {
    left: '58%',
    top: '-4%',
    width: '34%',
    height: '34%',
    background: 'radial-gradient(50% 50% at 50% 50%, rgb(93 46 140 / 0.09), transparent 70%)',
  },
  {
    left: '66%',
    top: '24%',
    width: '30%',
    height: '32%',
    background: 'radial-gradient(50% 50% at 50% 50%, rgb(201 169 97 / 0.11), transparent 70%)',
  },
  {
    left: '60%',
    top: '50%',
    width: '32%',
    height: '34%',
    background: 'radial-gradient(50% 50% at 50% 50%, rgb(93 46 140 / 0.08), transparent 70%)',
  },
  {
    left: '68%',
    top: '78%',
    width: '30%',
    height: '30%',
    background: 'radial-gradient(50% 50% at 50% 50%, rgb(201 169 97 / 0.10), transparent 70%)',
  },
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
      {/* The current — streaks drifting down over the glow-bed. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {BED.map((style, i) => (
          <div key={`bed-${i}`} className="absolute" style={style} />
        ))}
        {STREAKS.map((s, i) => (
          <div key={`streak-${i}`} className={`river-streak river-streak--${s.color}`} style={streakStyle(s)} />
        ))}
      </div>

      {/* Dawn seam — pulled up OVER the hero's last stretch of water (negative
          margin; net in-flow height stays 13vh), so the ocean itself fades
          through the deep-purple horizon into the cream canvas. No flat dark
          band: the gradient starts transparent on the water and is fully
          opaque only for a thin horizon line at its midpoint (which hides the
          hero→canvas boundary underneath), marked by the gold hairline. */}
      {seam && (
        <div aria-hidden className="pointer-events-none relative -mt-[13vh] h-[26vh]">
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(5,8,15,0) 0%, rgba(13,10,28,0.5) 30%, rgba(26,14,54,0.92) 46%, #1A0E36 50%, rgba(53,32,84,0.7) 58%, rgba(93,46,140,0.15) 72%, rgba(93,46,140,0.05) 84%, rgba(250,248,243,0) 100%)',
            }}
          />
          <div className="gold-seam absolute inset-x-0 top-[50%] opacity-60" />
        </div>
      )}

      {children}
    </div>
  );
}
