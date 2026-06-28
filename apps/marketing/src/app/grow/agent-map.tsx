'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/**
 * The artifact — an interactive constellation that renders "one AI core, a team
 * of agents." The AM monogram is the glowing core; the five named crew agents
 * orbit it on a slow-rotating ring, wired to the core with gold connectors.
 * The caption auto-cycles the agents until the visitor interacts, then follows
 * their hover/tap. All motion is reduced-motion-safe.
 */

type Agent = { name: string; role: string };

const AGENTS: readonly Agent[] = [
  { name: 'Zeno', role: 'Runs the operation. Every agent answers to him.' },
  { name: 'Exodus', role: 'Creates your content, ads, and video.' },
  { name: 'Vela', role: 'Runs your paid and organic channels.' },
  { name: 'Solon', role: 'Follows up with every lead, keeps clients close.' },
  { name: 'Mansa', role: 'Remembers your business. Guards your data.' },
] as const;

const CORE: Agent = { name: 'The Core', role: 'One shared memory and brain. Every agent runs on it.' };

// Node positions on a circle (percent coordinates in a square box), evenly spaced
// from the top. Connectors use the same coordinate space (SVG viewBox 0 0 100 100).
const RADIUS = 38;
const POSITIONS = AGENTS.map((_, i) => {
  const angle = (-90 + (360 / AGENTS.length) * i) * (Math.PI / 180);
  return { x: 50 + RADIUS * Math.cos(angle), y: 50 + RADIUS * Math.sin(angle) };
});

export function AgentMap(): JSX.Element {
  const [active, setActive] = useState<number | 'core'>(0);
  const interacted = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => {
      if (interacted.current) return;
      setActive((prev) => (typeof prev === 'number' ? (prev + 1) % AGENTS.length : 0));
    }, 2800);
    return () => clearInterval(id);
  }, []);

  const pick = (v: number | 'core') => {
    interacted.current = true;
    setActive(v);
  };

  const detail = active === 'core' ? CORE : AGENTS[active];

  return (
    <div className="mx-auto w-full max-w-[600px]">
      <div className="relative mx-auto aspect-square w-full max-w-[420px] sm:max-w-[520px]">
        {/* decorative rings */}
        <div
          aria-hidden
          className="absolute inset-[8%] rounded-full border border-dashed border-brand-gold/20 motion-safe:animate-[growSpin_46s_linear_infinite]"
        />
        <div aria-hidden className="absolute inset-[22%] rounded-full border border-brand-gold/10" />

        {/* connectors */}
        <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          {POSITIONS.map((p, i) => {
            const on = active === i;
            return (
              <line
                key={i}
                x1="50"
                y1="50"
                x2={p.x}
                y2={p.y}
                stroke={on ? 'rgba(212,184,115,0.85)' : 'rgba(201,169,97,0.22)'}
                strokeWidth={on ? 0.9 : 0.5}
                vectorEffect="non-scaling-stroke"
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* core */}
        <button
          type="button"
          onClick={() => pick('core')}
          aria-label="The Core"
          className="absolute left-1/2 top-1/2 z-10 flex h-[22%] w-[22%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brand-gold/40 bg-brand-deep shadow-[0_0_60px_-8px_rgba(201,169,97,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-warmgold"
        >
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-brand-gold/25 blur-md motion-safe:animate-[growPulse_3.4s_ease-in-out_infinite]"
          />
          <Image
            src="/brand/amagna-monogram-preview.png"
            alt=""
            width={120}
            height={120}
            className="relative h-3/5 w-3/5 object-contain"
          />
        </button>

        {/* agent nodes */}
        {AGENTS.map((ag, i) => {
          const p = POSITIONS[i];
          const on = active === i;
          return (
            <button
              key={ag.name}
              type="button"
              onClick={() => pick(i)}
              onMouseEnter={() => pick(i)}
              aria-label={ag.name}
              aria-pressed={on}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              className={`absolute z-20 flex h-[15%] w-[15%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border font-display text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-warmgold sm:text-base ${
                on
                  ? 'scale-110 border-brand-warmgold bg-brand-warmgold text-brand-deep shadow-[0_0_28px_-6px_rgba(212,184,115,0.85)]'
                  : 'border-brand-gold/35 bg-brand-deep/90 text-brand-warmgold hover:border-brand-gold'
              }`}
            >
              {ag.name[0]}
            </button>
          );
        })}
      </div>

      {/* caption */}
      <div
        key={String(active)}
        className="mx-auto mt-8 min-h-[88px] max-w-[440px] text-center motion-safe:animate-[growRiseIn_0.4s_ease-out_both]"
      >
        <p className="font-display text-xl font-semibold text-brand-cream sm:text-2xl">{detail.name}</p>
        <p className="mt-2 text-sm leading-[1.6] text-brand-cream/70 sm:text-base">{detail.role}</p>
      </div>
    </div>
  );
}
