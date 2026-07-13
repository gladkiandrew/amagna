'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AUDIT_HREF } from '@/lib/site';

/**
 * Homepage Frame 2 — the Second Brain, as ONE viewport-height interactive
 * frame: a three-chapter switcher (Core Memory → 24/7 Execution → Continuous
 * Feedback) that auto-advances every 5s, pauses on manual interaction, and
 * only runs while on-screen (IntersectionObserver) and the tab is visible.
 *
 * Perf posture: this is the page's only client island below the hero and it
 * ships zero canvas/images/deps — all three chapters' copy is in the server
 * HTML (the pre-hydration render is the static stacked variant, which is also
 * what no-JS and prefers-reduced-motion visitors keep). The client only
 * toggles CSS classes (`sb-*` in globals.css); transitions are transform +
 * opacity, the progress bar animates scaleX.
 *
 * Stays typographic on purpose — Frame 3 (integrations hub) owns the
 * "central node + radiating connections" visual.
 */

const CHAPTERS = [
  {
    n: '01',
    lead: 'Core',
    key: 'Memory',
    body: 'Everything your business knows lives in one vault. Your voice, your customers, your numbers. Yours, and no one else’s.',
  },
  {
    n: '02',
    lead: '24/7',
    key: 'Execution',
    body: 'Agents built for your mission run the marketing, the outreach, the operations. In your name, with your approval.',
  },
  {
    n: '03',
    lead: 'Continuous',
    key: 'Feedback',
    body: 'Every finished task writes back to the vault. By month twelve it runs like it’s worked there for years.',
  },
] as const;

const CHAPTER_MS = 5000;
/** A tap/click/arrow-key means the user is driving — hold auto-advance. */
const MANUAL_HOLD_MS = 15_000;

const GOLD = 'text-[#C7A863]';

function ChapterHeading({
  chapter,
  className,
}: {
  chapter: (typeof CHAPTERS)[number];
  className: string;
}): JSX.Element {
  return (
    <h3 className={`text-balance font-display font-semibold leading-[1.05] tracking-[-0.02em] text-brand-cream ${className}`}>
      {chapter.lead} <span className={GOLD}>{chapter.key}</span>
    </h3>
  );
}

export function SecondBrainFrame(): JSX.Element {
  // False on the server and pre-hydration (static stacked variant — what SEO,
  // no-JS, and reduced-motion visitors get); true only for motion-OK browsers.
  const [enhanced, setEnhanced] = useState(false);
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [manualHold, setManualHold] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const holdTimer = useRef<number | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setEnhanced(!mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // The show starts when seen (threshold 0.4) and pauses off-screen / on a
  // hidden tab.
  useEffect(() => {
    if (!enhanced) return;
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.4,
    });
    io.observe(el);
    const onVisibility = () => setPageVisible(!document.hidden);
    onVisibility();
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [enhanced]);

  const playing = enhanced && inView && pageVisible && !manualHold;

  const goTo = (i: number, manual: boolean): void => {
    if (i !== active) {
      setLeaving(active);
      setActive(i);
    }
    if (manual) {
      setManualHold(true);
      if (holdTimer.current !== null) window.clearTimeout(holdTimer.current);
      holdTimer.current = window.setTimeout(() => setManualHold(false), MANUAL_HOLD_MS);
    }
  };

  // Auto-advance while playing.
  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => goTo((active + 1) % CHAPTERS.length, false), CHAPTER_MS);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, active]);

  // Drop the outgoing chapter back to idle once its exit transition is done.
  useEffect(() => {
    if (leaving === null) return;
    const t = window.setTimeout(() => setLeaving(null), 600);
    return () => window.clearTimeout(t);
  }, [leaving]);

  useEffect(
    () => () => {
      if (holdTimer.current !== null) window.clearTimeout(holdTimer.current);
    },
    [],
  );

  const onTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>): void => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next =
      e.key === 'ArrowRight'
        ? (active + 1) % CHAPTERS.length
        : (active + CHAPTERS.length - 1) % CHAPTERS.length;
    goTo(next, true);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="second-brain-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#03060e] text-brand-cream"
    >
      {/* Faint gold afterglow continuing down from the hero's horizon. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(90%_46%_at_50%_0%,rgba(212,184,115,0.07),transparent_70%)]"
      />

      <div className="mx-auto flex w-full max-w-[1100px] flex-1 flex-col items-center justify-center px-6 py-12 text-center sm:py-16">
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-warmgold">
          <span aria-hidden className="h-px w-7 bg-brand-warmgold/60" />
          The Second Brain
          <span aria-hidden className="h-px w-7 bg-brand-warmgold/60" />
        </p>
        <h2
          id="second-brain-title"
          className="mt-4 max-w-[26ch] text-balance font-display text-[clamp(1.5rem,3.2vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.02em]"
        >
          Your business, running on a Second Brain.
        </h2>

        {enhanced ? (
          <>
            {/* Chapter stage — all three share one grid cell; sb-* classes
                drive the crossfade. aria-live announces the swap politely. */}
            <div
              id="sb-stage"
              role="tabpanel"
              aria-live="polite"
              aria-labelledby={`sb-tab-${active}`}
              className="mt-10 grid w-full sm:mt-14"
            >
              {CHAPTERS.map((c, i) => (
                <div
                  key={c.n}
                  aria-hidden={i !== active}
                  className={`sb-chapter [grid-area:1/1] ${
                    i === active ? 'sb-active' : i === leaving ? 'sb-leaving' : 'sb-idle'
                  }`}
                >
                  <ChapterHeading chapter={c} className="text-[clamp(2.2rem,7vw,4.5rem)]" />
                  <p className="mx-auto mt-4 max-w-[46ch] text-base leading-[1.6] text-brand-cream/75 sm:mt-5 sm:text-lg">
                    {c.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Chapter switcher — real buttons, roving tabindex, arrow keys. */}
            <div
              role="tablist"
              aria-label="Second Brain chapters"
              className="mt-8 flex w-full max-w-[660px] items-stretch justify-center gap-2 sm:mt-10 sm:gap-4"
            >
              {CHAPTERS.map((c, i) => (
                <button
                  key={c.n}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`sb-tab-${i}`}
                  aria-selected={i === active}
                  aria-controls="sb-stage"
                  tabIndex={i === active ? 0 : -1}
                  onClick={() => goTo(i, true)}
                  onKeyDown={onTabKeyDown}
                  className={`flex min-h-[44px] min-w-[44px] flex-1 flex-col justify-end rounded px-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-warmgold/70 sm:px-2 sm:text-[11px] sm:tracking-[0.22em] ${
                    i === active ? 'text-brand-cream' : 'text-brand-cream/55 hover:text-brand-cream/85'
                  }`}
                >
                  <span className="hidden sm:inline">
                    {c.n} {c.lead} {c.key}
                  </span>
                  <span className="sm:hidden">
                    {c.n} {c.key}
                  </span>
                  <span aria-hidden className="mt-2 block h-px w-full overflow-hidden bg-brand-cream/15">
                    <span
                      className={`sb-bar block h-full w-full bg-brand-warmgold ${
                        i < active ? 'sb-bar-full' : ''
                      } ${i === active ? 'sb-bar-run' : ''} ${
                        i === active && !playing ? 'sb-bar-hold' : ''
                      }`}
                    />
                  </span>
                </button>
              ))}
            </div>
          </>
        ) : (
          /* Static stacked variant — the server HTML (SEO + no-JS) and the
             prefers-reduced-motion experience: all three chapters, no
             switcher, no timers. */
          <div className="mt-10 space-y-9 sm:mt-12">
            {CHAPTERS.map((c) => (
              <div key={c.n}>
                <ChapterHeading chapter={c} className="text-2xl sm:text-4xl" />
                <p className="mx-auto mt-3 max-w-[46ch] text-base leading-[1.6] text-brand-cream/75 sm:text-lg">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        )}

        <p className="mt-10 text-balance font-display text-lg font-semibold tracking-[-0.01em] text-brand-cream sm:mt-12 sm:text-2xl">
          One brain. <span className={GOLD}>Your whole business.</span>
        </p>
        <div className="mt-5">
          <Link
            href={AUDIT_HREF}
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-purple px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-purple/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-warmgold focus-visible:ring-offset-2 focus-visible:ring-offset-[#03060e]"
          >
            Chart Your Gold Map
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
