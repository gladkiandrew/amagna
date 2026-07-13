'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Cinzel } from 'next/font/google';
import { ArrowRight } from 'lucide-react';
import { AUDIT_HREF } from '@/lib/site';

/**
 * Homepage Frame 2 — the Second Brain, scroll-driven.
 *
 * A ~355vh scroll runway wraps a `position: sticky` full-viewport stage: the
 * frame holds the screen while the visitor's own scrolling walks them through
 * the three chapters (01 Core Memory → 02 24/7 Execution → 03 Continuous
 * Feedback), then the sticky container runs out and native scroll releases
 * them into Frame 3. Scrolling up walks back. NOTHING intercepts wheel/touch —
 * the only JS is a passive, rAF-throttled scroll listener that maps runway
 * progress to the active chapter and fills the label progress bars
 * (transform-only writes through refs; React re-renders only on chapter
 * change). No timers.
 *
 * Chapter labels sit ABOVE the stage as a tablist; clicking one smooth-scrolls
 * to that chapter's segment of the runway.
 *
 * Perf posture: the page's only client island below the hero; no canvas, no
 * images, no deps. All copy ships in the server HTML — the pre-hydration
 * render is the static stacked variant, which is also what no-JS and
 * prefers-reduced-motion visitors keep (no runway, no pin, no listeners).
 * Cinzel is self-hosted by next/font with `preload: false`, so it never
 * touches the LCP-critical network — it lazy-loads when this below-the-fold
 * heading first needs it.
 *
 * Stays typographic on purpose — Frame 3 (integrations hub) owns the
 * "central node + radiating connections" visual.
 */

// Roman-capital display face for the chapter headings (lowercase renders as
// small caps — the engraved look is the point).
const cinzel = Cinzel({ subsets: ['latin'], display: 'swap', preload: false });

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

const SEGMENTS = CHAPTERS.length;

const GOLD = 'text-[#C7A863]';

function ChapterHeading({
  chapter,
  className,
}: {
  chapter: (typeof CHAPTERS)[number];
  className: string;
}): JSX.Element {
  return (
    <h3
      className={`${cinzel.className} text-balance font-bold leading-[1.08] tracking-[0.01em] text-brand-cream ${className}`}
    >
      {chapter.lead} <span className={GOLD}>{chapter.key}</span>
    </h3>
  );
}

export function SecondBrainFrame(): JSX.Element {
  // False on the server and pre-hydration (static stacked variant — what SEO,
  // no-JS, and reduced-motion visitors get); true only for motion-OK browsers.
  const [enhanced, setEnhanced] = useState(false);
  const [active, setActive] = useState(0);
  const runwayRef = useRef<HTMLElement>(null);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setEnhanced(!mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // Scroll → chapter. Passive + rAF-gated; bar fills are imperative
  // transform writes so scrolling never re-renders React.
  useEffect(() => {
    if (!enhanced) return;
    let raf = 0;
    const measure = (): void => {
      const el = runwayRef.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const p = Math.min(1, Math.max(0, -el.getBoundingClientRect().top / total));
      const seg = Math.min(SEGMENTS - 1e-6, p * SEGMENTS);
      const idx = Math.floor(seg);
      setActive(idx);
      barRefs.current.forEach((bar, i) => {
        if (!bar) return;
        bar.style.transform = `scaleX(${i < idx ? 1 : i === idx ? seg - idx : 0})`;
      });
    };
    const onScroll = (): void => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        measure();
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    measure();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enhanced]);

  /** Scroll the page so chapter `i`'s runway segment is on screen. */
  const scrollToChapter = (i: number): void => {
    const el = runwayRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const top = window.scrollY + el.getBoundingClientRect().top;
    // Land a hair inside the segment so floor() resolves to chapter i.
    window.scrollTo({ top: top + (total * (i + 0.1)) / SEGMENTS, behavior: 'smooth' });
  };

  const onTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>): void => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next =
      e.key === 'ArrowRight' ? (active + 1) % SEGMENTS : (active + SEGMENTS - 1) % SEGMENTS;
    scrollToChapter(next);
    tabRefs.current[next]?.focus();
  };

  const frameInner = (
    <>
      {/* Faint gold afterglow continuing down from the hero's horizon. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(90%_46%_at_50%_0%,rgba(212,184,115,0.07),transparent_70%)]"
      />
      <div className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col items-center justify-center px-6 py-10 text-center">
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-warmgold">
          <span aria-hidden className="h-px w-7 bg-brand-warmgold/60" />
          The Second Brain
          <span aria-hidden className="h-px w-7 bg-brand-warmgold/60" />
        </p>
        <h2
          id="second-brain-title"
          className="mt-4 max-w-[26ch] text-balance font-display text-[clamp(1.4rem,2.4vw,2rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-brand-cream/90"
        >
          Your business, running on a Second Brain.
        </h2>

        {enhanced ? (
          <>
            {/* Chapter labels — ABOVE the stage: where you are in the
                sequence. Bars fill with scroll progress. */}
            <div
              role="tablist"
              aria-label="Second Brain chapters"
              className="mt-10 flex w-full max-w-[720px] items-stretch justify-center gap-3 sm:mt-14 sm:gap-6"
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
                  onClick={() => scrollToChapter(i)}
                  onKeyDown={onTabKeyDown}
                  className={`flex min-h-[44px] min-w-[44px] flex-1 flex-col justify-end rounded px-1 pb-1 text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-warmgold/70 sm:px-2 sm:text-[11px] sm:tracking-[0.22em] ${
                    i === active ? 'text-brand-cream' : 'text-brand-cream/50 hover:text-brand-cream/85'
                  }`}
                >
                  <span className="hidden sm:inline">
                    {c.n} {c.lead} {c.key}
                  </span>
                  {/* Mobile: uniform two-deck label (number over key word) so
                      no tab wraps differently from its neighbors. */}
                  <span className="flex flex-col items-center gap-1 sm:hidden">
                    <span className="text-brand-warmgold/80">{c.n}</span>
                    <span>{c.key}</span>
                  </span>
                  <span aria-hidden className="mt-2.5 block h-[2px] w-full overflow-hidden rounded-full bg-brand-cream/15">
                    <span
                      ref={(el) => {
                        barRefs.current[i] = el;
                      }}
                      className="sb-bar block h-full w-full bg-brand-warmgold"
                    />
                  </span>
                </button>
              ))}
            </div>

            {/* Chapter stage — the heading owns the screen. All three share
                one grid cell; position classes (above / active / below) make
                the crossfade direction-correct for both scroll directions. */}
            <div
              id="sb-stage"
              role="tabpanel"
              aria-live="polite"
              aria-labelledby={`sb-tab-${active}`}
              className="mt-8 grid w-full sm:mt-10"
            >
              {CHAPTERS.map((c, i) => (
                <div
                  key={c.n}
                  aria-hidden={i !== active}
                  className={`sb-chapter [grid-area:1/1] ${
                    i === active ? 'sb-active' : i < active ? 'sb-above' : 'sb-below'
                  }`}
                >
                  <ChapterHeading chapter={c} className="text-[clamp(2.3rem,8vw,6.5rem)]" />
                  <p className="mx-auto mt-5 max-w-[48ch] text-base leading-[1.6] text-brand-cream/75 sm:mt-7 sm:text-xl">
                    {c.body}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Static stacked variant — the server HTML (SEO + no-JS) and the
             prefers-reduced-motion experience: all three chapters, no
             labels, no pin, no listeners. */
          <div className="mt-10 space-y-10 sm:mt-14">
            {CHAPTERS.map((c) => (
              <div key={c.n}>
                <ChapterHeading chapter={c} className="text-2xl sm:text-5xl" />
                <p className="mx-auto mt-3 max-w-[48ch] text-base leading-[1.6] text-brand-cream/75 sm:mt-4 sm:text-lg">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        )}

        <p className="mt-10 text-balance font-display text-lg font-semibold tracking-[-0.01em] text-brand-cream sm:mt-14 sm:text-2xl">
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
    </>
  );

  // Enhanced: a 355vh runway (≈85vh of scroll per chapter) with the sticky
  // full-viewport stage pinned inside — native scroll does the holding and
  // the release into Frame 3. Static: a plain section, no runway.
  return enhanced ? (
    <section
      ref={runwayRef}
      aria-labelledby="second-brain-title"
      className="relative h-[355vh] bg-[#03060e] text-brand-cream"
    >
      <div className="sticky top-0 isolate flex h-[100svh] flex-col overflow-hidden">{frameInner}</div>
    </section>
  ) : (
    <section
      ref={runwayRef}
      aria-labelledby="second-brain-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#03060e] text-brand-cream"
    >
      {frameInner}
    </section>
  );
}
