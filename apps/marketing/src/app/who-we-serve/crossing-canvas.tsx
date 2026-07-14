import type { CSSProperties } from 'react';

/**
 * CrossingCanvas — the /who-we-serve page canvas: the Amagna river turned on
 * its side.
 *
 * Identity piece: where the homepage's current runs DOWN the page, the
 * Who-We-Serve chart reads like latitudes on a map — the same luminous purple
 * and gold streaks running briskly ACROSS the cream, west to east, with a
 * few quieter counter-currents drifting back the other way so the chart
 * never feels one-directional. Content floats over the layer; the current
 * glows through the whitespace, so reading contrast is never touched.
 *
 * Server-rendered, zero JS, CSS-only motion (`.river-streak-x` in
 * globals.css: transform + opacity only; parked faint and still under
 * prefers-reduced-motion).
 *
 * `seam` renders the horizon transition at the top — the same downward fade
 * from the dark hero's navy (#071221) into the cream as RiverCanvas, so the
 * two canvases read as one system across the site.
 */

type StreakX = {
  left: string;
  top: string;
  color: 'purple' | 'gold';
  dur: number;
  delay: number;
  peak: number;
  w?: string;
  rev?: boolean;
};

// The crossing — one latitude roughly every 6% of the page so EVERY viewport
// has several in frame; negative delays start each one mid-flight so the
// current is always flowing from the first paint. Counter-currents (rev) are
// fewer and fainter — balance, not symmetry.
const STREAKS: readonly StreakX[] = [
  { left: '4%', top: '3%', color: 'gold', dur: 7.6, delay: -2.2, peak: 0.85, w: '38vw' },
  { left: '38%', top: '8%', color: 'purple', dur: 6.8, delay: -4.6, peak: 0.8 },
  { left: '12%', top: '14%', color: 'purple', dur: 8.4, delay: -1.2, peak: 0.75, w: '28vw' },
  { left: '52%', top: '19%', color: 'gold', dur: 7.2, delay: -5.8, peak: 0.9, w: '42vw' },
  { left: '26%', top: '25%', color: 'gold', dur: 6.4, delay: -3.4, peak: 0.8 },
  { left: '58%', top: '30%', color: 'purple', dur: 8.8, delay: -0.8, peak: 0.85, w: '30vw' },
  { left: '8%', top: '36%', color: 'purple', dur: 7.6, delay: -6.4, peak: 0.8, w: '40vw' },
  { left: '44%', top: '41%', color: 'gold', dur: 6.8, delay: -2.8, peak: 0.85 },
  { left: '18%', top: '47%', color: 'gold', dur: 8, delay: -5.2, peak: 0.9, w: '36vw' },
  { left: '56%', top: '52%', color: 'purple', dur: 6.4, delay: -1.8, peak: 0.75, w: '26vw' },
  { left: '30%', top: '58%', color: 'purple', dur: 7.2, delay: -4.2, peak: 0.85 },
  { left: '6%', top: '63%', color: 'gold', dur: 8.4, delay: -6.8, peak: 0.8, w: '44vw' },
  { left: '48%', top: '69%', color: 'gold', dur: 6.8, delay: -3, peak: 0.85, w: '32vw' },
  { left: '22%', top: '74%', color: 'purple', dur: 7.6, delay: -0.6, peak: 0.8 },
  { left: '54%', top: '80%', color: 'gold', dur: 7.2, delay: -5.4, peak: 0.9, w: '38vw' },
  { left: '14%', top: '85%', color: 'purple', dur: 8, delay: -2.4, peak: 0.8, w: '30vw' },
  { left: '42%', top: '91%', color: 'gold', dur: 6.4, delay: -4.8, peak: 0.85 },
  { left: '10%', top: '96%', color: 'purple', dur: 7.6, delay: -1.4, peak: 0.75, w: '34vw' },
  // counter-currents — quiet drift back west
  { left: '62%', top: '11%', color: 'gold', dur: 9.2, delay: -3.6, peak: 0.5, w: '26vw', rev: true },
  { left: '70%', top: '33%', color: 'purple', dur: 8.8, delay: -6.2, peak: 0.5, rev: true },
  { left: '66%', top: '55%', color: 'gold', dur: 9.6, delay: -1.6, peak: 0.55, w: '28vw', rev: true },
  { left: '72%', top: '77%', color: 'purple', dur: 8.4, delay: -4.4, peak: 0.5, w: '24vw', rev: true },
  { left: '64%', top: '93%', color: 'gold', dur: 9.2, delay: -2.6, peak: 0.5, rev: true },
] as const;

function streakStyle(s: StreakX): CSSProperties {
  return {
    left: s.left,
    top: s.top,
    '--river-dur': `${s.dur}s`,
    '--river-delay': `${s.delay}s`,
    '--river-peak': s.peak,
    ...(s.w ? { '--riverx-w': s.w } : null),
  } as CSSProperties;
}

/** The chart's shallows — wide, soft glow-bands the latitudes cross through. */
const BED: readonly CSSProperties[] = [
  {
    left: '-8%',
    top: '2%',
    width: '60%',
    height: '26%',
    background: 'radial-gradient(50% 50% at 50% 50%, rgb(93 46 140 / 0.08), transparent 70%)',
  },
  {
    left: '46%',
    top: '18%',
    width: '58%',
    height: '28%',
    background: 'radial-gradient(50% 50% at 50% 50%, rgb(201 169 97 / 0.1), transparent 70%)',
  },
  {
    left: '-10%',
    top: '42%',
    width: '56%',
    height: '26%',
    background: 'radial-gradient(50% 50% at 50% 50%, rgb(201 169 97 / 0.08), transparent 70%)',
  },
  {
    left: '50%',
    top: '58%',
    width: '54%',
    height: '28%',
    background: 'radial-gradient(50% 50% at 50% 50%, rgb(93 46 140 / 0.07), transparent 70%)',
  },
  {
    left: '-6%',
    top: '78%',
    width: '58%',
    height: '26%',
    background: 'radial-gradient(50% 50% at 50% 50%, rgb(93 46 140 / 0.07), transparent 70%)',
  },
  {
    left: '52%',
    top: '86%',
    width: '52%',
    height: '24%',
    background: 'radial-gradient(50% 50% at 50% 50%, rgb(201 169 97 / 0.09), transparent 70%)',
  },
] as const;

export function CrossingCanvas({
  seam = false,
  children,
}: {
  /** Render the dark-hero → cream dawn transition band at the top. */
  seam?: boolean;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="relative isolate bg-brand-cream">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {BED.map((style, i) => (
          <div key={`bed-${i}`} className="absolute" style={style} />
        ))}
        {STREAKS.map((s, i) => (
          <div
            key={`streak-${i}`}
            className={`river-streak-x river-streak-x--${s.color}${s.rev ? ' river-streak-x--rev' : ''}`}
            style={streakStyle(s)}
          />
        ))}
      </div>

      {/* Same horizon fade as RiverCanvas — dark hero water into cream. */}
      {seam && (
        <div
          aria-hidden
          className="pointer-events-none h-[8.4vh]"
          style={{
            background:
              'linear-gradient(180deg, #071221 0%, rgba(23,32,52,0.72) 32%, rgba(96,102,116,0.22) 62%, rgba(250,248,243,0) 100%)',
          }}
        />
      )}

      {children}
    </div>
  );
}
