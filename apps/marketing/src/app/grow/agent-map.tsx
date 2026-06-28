'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Calendar, FileText, MessageSquare, Search, Star, Target, type LucideIcon } from 'lucide-react';

/**
 * The artifact — an interactive system map: the AM monogram core, glowing and
 * pulsing, wired to six always-on FUNCTION nodes (icon + label + live dot).
 * Light pulses travel the connectors outward on a loop; hover/tap a node to
 * brighten it and read its one-liner. Our palette only (navy / gold / purple) —
 * no crew names, no blue. Mobile-first and reduced-motion-safe.
 */

type Node = { label: string; desc: string; Icon: LucideIcon; angle: number };

const RADIUS = 37; // percent of the square box

const NODES: readonly Node[] = [
  { label: 'Content', desc: 'Posts & creates in your voice.', Icon: FileText, angle: -90 },
  { label: 'Ads', desc: 'Runs your Meta & Google campaigns.', Icon: Target, angle: -30 },
  { label: 'SEO + AEO', desc: 'Gets you found on Google & AI.', Icon: Search, angle: 30 },
  { label: 'Booking', desc: 'Captures and books leads, 24/7.', Icon: Calendar, angle: 90 },
  { label: 'Reviews', desc: 'Asks for reviews at the right moment.', Icon: Star, angle: 150 },
  { label: 'Follow-Up', desc: 'Texts & emails every lead back, instantly.', Icon: MessageSquare, angle: 210 },
] as const;

const POS = NODES.map((n) => {
  const a = (n.angle * Math.PI) / 180;
  return { x: 50 + RADIUS * Math.cos(a), y: 50 + RADIUS * Math.sin(a) };
});

export function AgentMap(): JSX.Element {
  const [active, setActive] = useState<number | null>(null);
  const [animate, setAnimate] = useState(false);

  // Enable connector pulses only when motion is allowed (also avoids SSR mismatch).
  useEffect(() => {
    setAnimate(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  return (
    <div className="mx-auto w-full max-w-[600px]">
      {/* LIVE indicator */}
      <div className="mb-6 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
          Live
        </span>
      </div>

      <div className="relative mx-auto aspect-square w-full max-w-[340px] sm:max-w-[540px]">
        {/* HUD rings */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-full border border-dashed border-brand-gold/15 motion-safe:animate-[growSpin_60s_linear_infinite]"
        />
        <div aria-hidden className="absolute inset-[14%] rounded-full border border-brand-gold/10" />
        <div aria-hidden className="absolute inset-[30%] rounded-full border border-brand-purple/20" />

        {/* connectors + traveling pulses */}
        <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          {POS.map((p, i) => (
            <line
              key={`l-${i}`}
              x1="50"
              y1="50"
              x2={p.x}
              y2={p.y}
              stroke={active === i ? 'rgba(212,184,115,0.85)' : 'rgba(201,169,97,0.25)'}
              strokeWidth={active === i ? 0.8 : 0.45}
              vectorEffect="non-scaling-stroke"
              className="transition-all duration-300"
            />
          ))}
          {animate &&
            POS.map((p, i) => (
              <circle key={`p-${i}`} r="0.9" fill="rgba(212,184,115,0.95)">
                <animate
                  attributeName="cx"
                  from="50"
                  to={String(p.x)}
                  dur="2.6s"
                  begin={`${i * 0.43}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cy"
                  from="50"
                  to={String(p.y)}
                  dur="2.6s"
                  begin={`${i * 0.43}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  dur="2.6s"
                  begin={`${i * 0.43}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
        </svg>

        {/* core */}
        <div className="absolute left-1/2 top-1/2 z-10 flex aspect-square w-[26%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brand-gold/40 bg-brand-deep shadow-[0_0_70px_-8px_rgba(201,169,97,0.55)]">
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-brand-purple/30 blur-md motion-safe:animate-[growPulse_3.4s_ease-in-out_infinite]"
          />
          <Image
            src="/brand/amagna-monogram-preview.png"
            alt="Amagna core"
            width={120}
            height={120}
            className="relative h-3/5 w-3/5 object-contain"
          />
        </div>

        {/* function nodes */}
        {NODES.map((n, i) => {
          const p = POS[i];
          const on = active === i;
          const Icon = n.Icon;
          return (
            <button
              key={n.label}
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              aria-label={`${n.label}: ${n.desc}`}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              className={`absolute z-20 flex w-[4.7rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-xl border px-2 py-2 backdrop-blur transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-warmgold sm:w-24 sm:gap-1.5 sm:px-3 sm:py-2.5 ${
                on
                  ? 'scale-105 border-brand-warmgold bg-brand-deep shadow-[0_0_30px_-6px_rgba(212,184,115,0.75)]'
                  : 'border-brand-gold/25 bg-brand-deep/80 hover:border-brand-gold/60'
              }`}
            >
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-lg sm:h-9 sm:w-9 ${
                  on ? 'bg-brand-warmgold/20' : 'bg-brand-gold/10'
                }`}
              >
                <Icon className="h-3.5 w-3.5 text-brand-warmgold sm:h-4 sm:w-4" aria-hidden />
              </span>
              <span className="text-center text-[10px] font-semibold leading-tight text-brand-cream sm:text-xs">
                {n.label}
              </span>
              <span className="flex items-center gap-1 text-[8px] font-semibold uppercase tracking-wide text-emerald-300/90 sm:text-[9px]">
                <span className="h-1 w-1 rounded-full bg-emerald-400" />
                Active
              </span>
            </button>
          );
        })}
      </div>

      {/* caption */}
      <div
        key={active === null ? 'none' : active}
        className="mx-auto mt-8 min-h-[64px] max-w-[440px] text-center motion-safe:animate-[growRiseIn_0.4s_ease-out_both]"
      >
        {active === null ? (
          <p className="text-base leading-[1.6] text-brand-cream/70 sm:text-lg">
            Six functions. One core. Always on.
          </p>
        ) : (
          <p className="text-base leading-[1.6] sm:text-lg">
            <span className="font-display font-semibold text-brand-cream">{NODES[active].label}</span>
            <span className="text-brand-cream/70"> — {NODES[active].desc}</span>
          </p>
        )}
      </div>
    </div>
  );
}
