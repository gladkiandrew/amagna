'use client';

import { useRef, useState } from 'react';
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react';
import { Play, ArrowLeft, ArrowRight } from 'lucide-react';
import { useReducedMotion } from '@/components/home/ocean/use-reduced-motion';

/**
 * "See the output" — a Tinder-style swipe deck of three 9:16 example videos.
 *
 * The front card can be dragged left (touch + mouse); past a threshold it flies
 * off and the next card rotates forward, looping infinitely through the three
 * slots. Prev/Next buttons and ←/→ keys are a full non-drag, keyboard-accessible
 * fallback. Cards are drop-in ready: when `public/brand/examples/example-N.mp4`
 * exists the card plays it (muted, looped, inline); until then a styled
 * placeholder shows. `prefers-reduced-motion` removes the slide animation and
 * does not autoplay.
 */
const SLIDES = [
  { src: '/brand/examples/example-1.mp4', label: 'Hook that stops the scroll' },
  { src: '/brand/examples/example-2.mp4', label: 'Offer, made watchable' },
  { src: '/brand/examples/example-3.mp4', label: 'Proof in 20 seconds' },
] as const;

export function VideoExamples(): JSX.Element {
  const reduced = useReducedMotion();
  const [order, setOrder] = useState<number[]>(SLIDES.map((_, i) => i));
  const [dx, setDx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [failed, setFailed] = useState<Record<number, boolean>>({});
  const [ready, setReady] = useState<Record<number, boolean>>({});
  const startX = useRef(0);

  const advance = () => {
    if (leaving) return;
    if (reduced) {
      setOrder((o) => [...o.slice(1), o[0]]);
      return;
    }
    setLeaving(true);
    window.setTimeout(() => {
      setOrder((o) => [...o.slice(1), o[0]]);
      setLeaving(false);
      setDx(0);
    }, 430);
  };
  const retreat = () => {
    if (leaving) return;
    setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (reduced || leaving) return;
    setDragging(true);
    startX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setDx(e.clientX - startX.current);
  };
  const onPointerUp = () => {
    if (!dragging) return;
    setDragging(false);
    if (dx < -110) advance();
    else setDx(0);
  };

  return (
    <section
      aria-labelledby="examples-title"
      className="relative w-full overflow-hidden bg-brand-deep"
    >
      <div className="mx-auto w-full max-w-[1100px] px-6 py-24 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <p className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-warmgold lg:justify-start">
              <span aria-hidden className="h-px w-7 bg-brand-warmgold/55" />
              See the output
            </p>
            <h2
              id="examples-title"
              className="mt-5 text-balance font-display text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-brand-cream"
            >
              Scroll-stopping video, made by your crew.
            </h2>
            <p className="mx-auto mt-5 max-w-[46ch] text-lg leading-[1.6] text-brand-cream/75 lg:mx-0">
              Here&apos;s what Exodus (Creative Specialist) ships — built for Ads, Reels, and
              Shorts. Swipe through a few.
            </p>

            {/* Controls (non-drag fallback, keyboard accessible) */}
            <div className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
              <button
                type="button"
                onClick={retreat}
                aria-label="Previous example"
                className="inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-brand-warmgold/50 text-brand-warmgold transition-colors hover:border-brand-warmgold hover:bg-brand-warmgold/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-warmgold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-deep"
              >
                <ArrowLeft className="h-7 w-7" aria-hidden />
              </button>
              <button
                type="button"
                onClick={advance}
                aria-label="Next example"
                className="inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-brand-warmgold/50 text-brand-warmgold transition-colors hover:border-brand-warmgold hover:bg-brand-warmgold/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-warmgold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-deep"
              >
                <ArrowRight className="h-7 w-7" aria-hidden />
              </button>
            </div>
          </div>

          {/* Deck */}
          <div
            role="group"
            aria-roledescription="carousel"
            aria-label="Example videos — swipe or use the arrow keys"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') {
                e.preventDefault();
                advance();
              } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                retreat();
              }
            }}
            className="relative mx-auto h-[clamp(380px,62vh,560px)] w-[clamp(214px,35vh,315px)] rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-warmgold focus-visible:ring-offset-4 focus-visible:ring-offset-brand-deep"
          >
            {SLIDES.map((slide, i) => {
              const slot = order.indexOf(i);
              const isFront = slot === 0;
              let transform: string;
              let opacity = 1;
              let transition: string;
              if (isFront && leaving) {
                transform = 'translateX(-130%) rotate(-18deg)';
                opacity = 0;
                transition = 'transform 0.43s cubic-bezier(0.4,0,0.2,1), opacity 0.43s';
              } else if (isFront) {
                transform = `translateX(${dx}px) rotate(${(dx * 0.04).toFixed(2)}deg)`;
                transition = dragging || reduced ? 'none' : 'transform 0.3s ease';
              } else if (slot === 1) {
                transform = 'translateY(16px) scale(0.94)';
                opacity = 0.9;
                transition = reduced ? 'none' : 'transform 0.43s ease, opacity 0.43s';
              } else {
                transform = 'translateY(32px) scale(0.88)';
                opacity = 0.78;
                transition = reduced ? 'none' : 'transform 0.43s ease, opacity 0.43s';
              }
              const style: CSSProperties = {
                transform,
                opacity,
                transition,
                zIndex: 30 - slot * 10,
                touchAction: 'pan-y',
                cursor: isFront ? (dragging ? 'grabbing' : 'grab') : 'default',
              };
              return (
                <div
                  key={slide.src}
                  style={style}
                  onPointerDown={isFront ? onPointerDown : undefined}
                  onPointerMove={isFront ? onPointerMove : undefined}
                  onPointerUp={isFront ? onPointerUp : undefined}
                  onPointerCancel={isFront ? onPointerUp : undefined}
                  className="absolute inset-0 overflow-hidden rounded-2xl border-2 border-brand-gold/45 bg-[#0a1322] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)]"
                >
                  {/* Styled placeholder (shown until a real MP4 loads). */}
                  {(!ready[i] || failed[i]) && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#0c1626] to-[#05080f] p-6 text-center">
                      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-brand-warmgold/50 bg-brand-warmgold/10">
                        <Play className="h-6 w-6 translate-x-0.5 text-brand-warmgold" aria-hidden />
                      </span>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-warmgold">
                        Example drop incoming
                      </p>
                      <p className="max-w-[22ch] text-sm leading-relaxed text-brand-cream/70">
                        {slide.label}
                      </p>
                    </div>
                  )}

                  {/* Real video — drop the MP4 at the documented path and it plays. */}
                  {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                  <video
                    src={slide.src}
                    muted
                    loop
                    playsInline
                    autoPlay={!reduced}
                    preload="metadata"
                    aria-label={`Example video: ${slide.label}`}
                    onCanPlay={() => setReady((r) => ({ ...r, [i]: true }))}
                    onError={() => setFailed((f) => ({ ...f, [i]: true }))}
                    className="h-full w-full object-cover"
                    style={{ opacity: ready[i] && !failed[i] ? 1 : 0 }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
