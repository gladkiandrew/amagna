'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { CREW } from '@/lib/crew';
import { useReducedMotion } from '@/components/home/ocean/use-reduced-motion';

/**
 * Frame 2 — VoyageReveal.
 *
 * The hero's water continues down here, darkened to a near-black navy that keeps
 * a LIVE wave animation (the only animated background element) plus the ship's
 * foam wake. When Frame 2 scrolls into view a TIME-BASED sequence plays once:
 * the crew ship cruises in from the right (facing/heading left) leaving a V-foam
 * wake, stops centre, the five crew are dealt out one by one dropping into their
 * cards below, then the ship swaps to its empty version and sails off to the
 * left — wake trailing — leaving the cards behind.
 *
 * `prefers-reduced-motion` → no loop, final state (cards visible, static water,
 * no ship). Canon roster + portraits from `lib/crew.ts`; each card links to
 * `/crew#<slug>`. Zeno (captain) gets a brighter ring + a "Captain" badge.
 */

// --- Timeline (seconds) ---
const CRUISE_IN = 2.6;
const STOP_PAD = 0.35;
const DEAL_GAP = 0.52;
const DEAL_DUR = 0.7;
const AFTER_DEAL = 0.5;
const CRUISE_OUT = 2.4;
const DEAL_START = CRUISE_IN + STOP_PAD;
const LAST_DEAL = DEAL_START + (CREW.length - 1) * DEAL_GAP;
const SWAP_AT = LAST_DEAL + DEAL_DUR; // ship empties as the last card lands
const CRUISE_OUT_START = LAST_DEAL + DEAL_DUR + AFTER_DEAL;
const SEQ_END = CRUISE_OUT_START + CRUISE_OUT;

const DEAL_ROT = [-6, 4, -3, 5, -4];

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInCubic = (t: number) => t * t * t;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type WakePoint = { x: number; y: number; born: number };

export function VoyageReveal(): JSX.Element {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shipRef = useRef<HTMLDivElement>(null);
  const [dealt, setDealt] = useState(0);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    if (reduced) {
      setDealt(CREW.length);
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (canvas && ctx) {
        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);
        drawWater(ctx, canvas.width, canvas.height, 4, dpr, canvas.height * 0.42);
      }
      return;
    }

    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const ship = shipRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let cssW = 1;
    let shipYpx = 1; // ship waterline in canvas px (measured)
    const size = () => {
      const rect = canvas.getBoundingClientRect();
      cssW = Math.max(1, rect.width);
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(Math.max(1, rect.height) * dpr);
      if (ship) {
        const sr = ship.getBoundingClientRect();
        shipYpx = (sr.top - rect.top + sr.height * 0.72) * dpr; // hull waterline
      }
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(canvas);

    const wake: WakePoint[] = [];
    let raf = 0;
    let running = false;
    let triggered = false;
    let armed = true; // ready to play; rearmed each time Frame 2 fully leaves view
    let startMs = 0;
    let pausedAccum = 0;
    let pauseStart = 0;
    let lastSternX = 0;
    let dealtLocal = 0;
    let emptyLocal = false;

    const frame = (now: number) => {
      if (!running) return;
      const tNow = now / 1000;
      const e = triggered ? (now - startMs - pausedAccum) / 1000 : -1;

      const W = canvas.width;
      const H = canvas.height;
      drawWater(ctx, W, H, tNow, dpr, shipYpx);

      // Ship position along the waterline.
      let shipCenterFrac = 1.18;
      let moving = false;
      let gone = false;
      if (e >= 0) {
        if (e < CRUISE_IN) {
          shipCenterFrac = lerp(1.18, 0.5, easeOutCubic(e / CRUISE_IN));
          moving = true;
        } else if (e < CRUISE_OUT_START) {
          shipCenterFrac = 0.5;
        } else if (e < SEQ_END) {
          shipCenterFrac = lerp(0.5, -0.3, easeInCubic((e - CRUISE_OUT_START) / CRUISE_OUT));
          moving = true;
        } else {
          shipCenterFrac = -0.3;
          gone = true;
        }
      }

      const shipCenterX = shipCenterFrac * W;
      const shipDisplayW = W * 0.38;
      const sternX = shipCenterX + shipDisplayW * 0.42; // wake spawns behind (right)
      if (e >= 0 && moving && shipCenterFrac > -0.32 && shipCenterFrac < 1.15) {
        if (Math.abs(sternX - lastSternX) > 2 * dpr) {
          wake.push({ x: sternX, y: shipYpx + Math.sin(tNow * 1.1) * 4 * dpr, born: tNow });
          lastSternX = sternX;
          if (wake.length > 220) wake.shift();
        }
      }
      drawWake(ctx, wake, tNow, dpr);

      if (ship) {
        if (e >= 0 && !gone) {
          const bob = Math.sin(tNow * 1.05) * 6;
          const pitch = Math.sin(tNow * 1.05 + 0.7) * 1.6;
          ship.style.opacity = '1';
          ship.style.transform = `translate3d(${(shipCenterFrac * cssW).toFixed(1)}px, ${bob.toFixed(1)}px, 0) translateX(-50%) rotate(${pitch.toFixed(2)}deg)`;
        } else if (gone) {
          ship.style.opacity = '0';
        }
      }

      if (e >= 0) {
        let dc = 0;
        for (let i = 0; i < CREW.length; i++) if (e >= DEAL_START + i * DEAL_GAP) dc = i + 1;
        if (dc !== dealtLocal) {
          dealtLocal = dc;
          setDealt(dc);
        }
        if (!emptyLocal && e >= SWAP_AT) {
          emptyLocal = true;
          setEmpty(true);
        }
      }

      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      if (pauseStart) {
        pausedAccum += performance.now() - pauseStart;
        pauseStart = 0;
      }
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (!running) return;
      running = false;
      pauseStart = performance.now();
      cancelAnimationFrame(raf);
    };

    // Play once when ≥25% in view AND armed; the whole sequence restarts.
    const trigger = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && armed) {
          armed = false;
          triggered = true;
          startMs = performance.now();
          pausedAccum = 0;
          pauseStart = 0;
          wake.length = 0;
          lastSternX = 0;
          dealtLocal = 0;
          emptyLocal = false;
          setDealt(0);
          setEmpty(false);
        }
      },
      { threshold: 0.25 },
    );
    trigger.observe(section);

    // Rearm whenever Frame 2 fully leaves the viewport (above OR below), so the
    // next entry replays from the start. Reset the visuals immediately.
    const rearm = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          armed = true;
          triggered = false;
          dealtLocal = 0;
          emptyLocal = false;
          wake.length = 0;
          lastSternX = 0;
          setDealt(0);
          setEmpty(false);
          if (ship) ship.style.opacity = '0';
        }
      },
      { threshold: 0 },
    );
    rearm.observe(section);

    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), {
      rootMargin: '200px 0px 200px 0px',
    });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);

    return () => {
      stop();
      ro.disconnect();
      trigger.disconnect();
      rearm.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="crew-frame-title"
      className="relative w-full overflow-hidden bg-[#03060e]"
    >
      {/* Live dark water + wake (the only animated background element). */}
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />

      {/* Seamless hand-off: blend the hero's foreground water tone down into
          Frame 2's so there's no hard line at the boundary. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-44 bg-gradient-to-b from-[#0b1320] via-[#0b1320]/55 to-transparent"
      />

      {/* The ship — rides the waterline, cruises in, then sails off. Crew + empty
          versions cross-fade in place. */}
      {!reduced && (
        <div
          ref={shipRef}
          aria-hidden
          className="absolute left-0 top-[17vh] z-[3] w-[38%]"
          style={{ transform: 'translate3d(120%,0,0) translateX(-50%)', opacity: 0 }}
        >
          <Image
            src="/brand/ship-crew-full.webp"
            alt=""
            width={2000}
            height={1125}
            priority
            className={`h-auto w-full drop-shadow-[0_30px_50px_rgba(0,0,0,0.55)] transition-opacity duration-500 ${empty ? 'opacity-0' : 'opacity-100'}`}
          />
          <Image
            src="/brand/ship-empty-transparent.webp"
            alt=""
            width={2000}
            height={1125}
            className={`absolute inset-0 h-auto w-full drop-shadow-[0_30px_50px_rgba(0,0,0,0.55)] transition-opacity duration-500 ${empty ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
      )}

      <div className="relative z-[2] mx-auto w-full max-w-[1200px] px-6 pb-24 pt-[50vh]">
        <h2
          id="crew-frame-title"
          className="text-center font-display text-[clamp(1.9rem,4.4vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-brand-cream"
        >
          A full team sails your marketing.
        </h2>

        {/* Crew cards — dealt from the ship into place. */}
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {CREW.map((member, i) => {
            const isDealt = dealt > i;
            const cardStyle: CSSProperties = {
              opacity: isDealt ? 1 : 0,
              transform: isDealt
                ? 'translateY(0) scale(1) rotate(0deg)'
                : `translateY(-300px) scale(0.86) rotate(${DEAL_ROT[i]}deg)`,
              transition:
                'transform 0.7s cubic-bezier(0.16,1,0.3,1), opacity 0.6s cubic-bezier(0.16,1,0.3,1)',
              willChange: 'transform, opacity',
            };
            return (
              <Link
                key={member.slug}
                href={`/crew#${member.slug}`}
                style={cardStyle}
                className="group flex flex-col rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-brand-warmgold focus-visible:ring-offset-2 focus-visible:ring-offset-[#03060e]"
              >
                <div
                  className={
                    'relative aspect-[4/5] overflow-hidden rounded-xl bg-brand-deep ' +
                    (member.captain
                      ? 'border-2 border-brand-warmgold ring-2 ring-brand-gold/40 ring-offset-2 ring-offset-[#03060e]'
                      : 'border border-brand-gold/35')
                  }
                >
                  <Image
                    src={`/brand/crew/${member.slug}.webp`}
                    alt={`${member.name}, ${member.title}`}
                    fill
                    sizes="(min-width:1024px) 18vw, (min-width:640px) 30vw, 45vw"
                    className="object-cover object-[center_22%] transition-transform duration-500 ease-voyage group-hover:scale-[1.04]"
                  />
                  {member.captain && (
                    <span className="absolute left-2 top-2 rounded-full bg-[#03060e]/80 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-brand-warmgold ring-1 ring-brand-warmgold/50">
                      Captain
                    </span>
                  )}
                </div>
                <p className="mt-4 font-display text-xl font-semibold text-brand-cream">{member.name}</p>
                <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-warmgold">
                  {member.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-brand-cream/70">{member.blurb}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-cream/60 transition-colors group-hover:text-brand-warmgold">
                  Meet {member.name}
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-300 ease-voyage group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </span>
              </Link>
            );
          })}
        </div>

        {/* Descriptive line — moved BELOW the cards. */}
        <p className="mx-auto mt-14 max-w-[54ch] text-center text-lg leading-[1.6] text-brand-cream/75">
          Five specialized agents, each with one job and a human watching the wheel — captained by
          Zeno. Meet the crew.
        </p>
      </div>
    </section>
  );
}

/**
 * Dark navy ocean continuing the hero water — filled wave layers (same visual
 * family as the hero) with subtle crest rim-light, warmer near the top sunset
 * hint and darkening downward. Waves cluster around `waterlinePx` (where the
 * ship rides); below the foreground layer it settles into flat deep navy.
 */
function drawWater(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  dpr: number,
  waterlinePx: number,
): void {
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, '#0c1626'); // continues the hero's dark foreground water
  g.addColorStop(0.5, '#070e1b');
  g.addColorStop(1, '#03060d'); // super dark navy
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  // Sunset reflection on the top of the water — starts near the hero's lit
  // foreground tone for a seamless hand-off, then darkens to deep navy. Only a
  // faint hint survives below the fade.
  const sheenH = Math.max(1, waterlinePx * 0.9);
  const sheen = ctx.createLinearGradient(0, 0, 0, sheenH);
  sheen.addColorStop(0, 'rgba(232,150,78,0.30)');
  sheen.addColorStop(0.4, 'rgba(226,140,72,0.11)');
  sheen.addColorStop(1, 'rgba(226,140,72,0)');
  ctx.fillStyle = sheen;
  ctx.fillRect(0, 0, w, sheenH);

  const LAYERS = 7;
  const bottom = waterlinePx + 26 * dpr;
  const step = 6 * dpr;
  for (let i = 0; i < LAYERS; i++) {
    const depth = i / (LAYERS - 1); // 0 far/top … 1 near
    const baseY = bottom * Math.pow(depth, 1.3);
    const amp = (3 + depth * 15) * dpr;
    const wl = 200 + depth * 460;
    const k1 = (Math.PI * 2) / wl;
    const k2 = (Math.PI * 2) / (wl * 0.45);
    const k3 = (Math.PI * 2) / (wl * 0.22);
    const sp = (0.5 + depth * 0.7) * (i % 2 ? -1 : 1);
    const phase = i * 1.7;
    const crestY = (x: number) =>
      baseY +
      amp *
        (0.6 * Math.sin(k1 * x + sp * t + phase) +
          0.28 * Math.sin(k2 * x + sp * 1.3 * t + phase * 1.3) +
          0.12 * Math.sin(k3 * x - sp * 1.8 * t + phase));

    ctx.beginPath();
    ctx.moveTo(0, h);
    ctx.lineTo(0, crestY(0));
    for (let x = step; x <= w; x += step) ctx.lineTo(x, crestY(x));
    ctx.lineTo(w, h);
    ctx.closePath();
    // Visible-but-dark wave bands: a lit navy crest fading to a deep trough, so
    // the wave forms read against each other (lighter toward the foreground).
    const crestShade = 14 + Math.round(depth * 18); // 14..32 lightness-ish
    const fg = ctx.createLinearGradient(0, baseY - amp, 0, baseY + amp * 3);
    fg.addColorStop(0, `rgb(${crestShade},${crestShade + 12},${crestShade + 30})`);
    fg.addColorStop(1, '#04070f');
    ctx.fillStyle = fg;
    ctx.fill();

    // crest rim-light — warmer near the top (sunset), cooler toward the front.
    ctx.beginPath();
    ctx.moveTo(0, crestY(0));
    for (let x = step; x <= w; x += step) ctx.lineTo(x, crestY(x));
    const warm = Math.max(0, 1 - depth * 1.7);
    const r = Math.round(120 + warm * 120);
    const gch = Math.round(150 - warm * 20);
    const b = Math.round(195 - warm * 100);
    ctx.strokeStyle = `rgba(${r},${gch},${b},${(0.12 + depth * 0.2).toFixed(3)})`;
    ctx.lineWidth = (1 + depth * 0.6) * dpr;
    ctx.lineCap = 'round';
    ctx.stroke();
  }
}

/** White foam wake — a diverging V that widens and fades behind the ship. */
function drawWake(ctx: CanvasRenderingContext2D, wake: WakePoint[], t: number, dpr: number): void {
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  for (const p of wake) {
    const age = t - p.born;
    if (age < 0 || age > 2.4) continue;
    const k = age / 2.4;
    const spread = (3 + k * 52) * dpr;
    const alpha = (1 - k) * (1 - k) * 0.5;
    const rad = (5 + k * 20) * dpr;
    for (const dy of [-spread, spread]) {
      const g = ctx.createRadialGradient(p.x, p.y + dy, 0, p.x, p.y + dy, rad);
      g.addColorStop(0, `rgba(236,243,255,${alpha})`);
      g.addColorStop(1, 'rgba(236,243,255,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y + dy, rad, 0, Math.PI * 2);
      ctx.fill();
    }
    if (k < 0.35) {
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad * 1.4);
      g.addColorStop(0, `rgba(244,248,255,${(1 - k / 0.35) * 0.4})`);
      g.addColorStop(1, 'rgba(244,248,255,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, rad * 1.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}
