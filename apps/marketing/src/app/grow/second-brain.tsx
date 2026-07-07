'use client';

import { useState } from 'react';
import Image from 'next/image';

/**
 * Second Brain — the AI-core-plus-agents artifact for /grow section 4.
 *
 * A live, responsive, interactive rebuild of `second-brain-artifact.webp`:
 *  - the glowing gold brain (`/brand/second-brain-core.webp`) as the centerpiece,
 *    edges feathered into the navy,
 *  - the AM monogram (`/brand/amagna-monogram.svg`) glowing at its core — soft-edged
 *    gold glow emanating from the mark, no hard backing disc,
 *  - six functional agent nodes around it (3 left / 3 right) with connector traces and
 *    looping gold pulses (motion-safe),
 *  - hover (desktop) / tap (mobile) an agent to light its node + trace + descriptor and
 *    intensify the core glow.
 *
 * Desktop (>=640px): ringed columns. Mobile: brain + core on top, agents as a legible
 * 2-column list. Brand palette only, no blue, real text.
 */

type Agent = { name: string; desc: string };

// Functional names only — never crew names. Order = around the ring, left col then right col.
const AGENTS: readonly Agent[] = [
  { name: 'Content', desc: 'creates your content' }, // 0 — left top
  { name: 'Booking', desc: 'books your calls' }, //      1 — left mid
  { name: 'Reviews', desc: 'builds your reputation' }, //2 — left bottom
  { name: 'Ads', desc: 'runs your ads' }, //             3 — right top
  { name: 'Follow-Up', desc: 'works every lead' }, //    4 — right mid
  { name: 'SEO + AEO', desc: 'gets you found' }, //      5 — right bottom
];

// Card placement (% of the 5:3 stage) + connector anchor (1000x600 viewBox) per agent.
const NODES: readonly {
  left: string;
  top: string;
  align: 'right' | 'left';
  anchor: { x: number; y: number };
}[] = [
  { left: '15%', top: '22%', align: 'right', anchor: { x: 338, y: 132 } },
  { left: '15%', top: '50%', align: 'right', anchor: { x: 338, y: 300 } },
  { left: '15%', top: '78%', align: 'right', anchor: { x: 338, y: 468 } },
  { left: '85%', top: '22%', align: 'left', anchor: { x: 662, y: 132 } },
  { left: '85%', top: '50%', align: 'left', anchor: { x: 662, y: 300 } },
  { left: '85%', top: '78%', align: 'left', anchor: { x: 662, y: 468 } },
];

const CORE = { x: 500, y: 300 };
const pathFor = (a: { x: number; y: number }): string => `M${a.x} ${a.y} L${CORE.x} ${CORE.y}`;

function AgentCard({
  agent,
  align,
  active,
  ...handlers
}: {
  agent: Agent;
  align: 'right' | 'left';
  active: boolean;
} & React.ComponentProps<'button'>): JSX.Element {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`group block w-full rounded-xl border px-3.5 py-2.5 text-left backdrop-blur transition-all duration-300 ${
        align === 'right' ? 'text-right' : 'text-left'
      } ${
        active
          ? 'border-brand-warmgold/70 bg-brand-deep/80 shadow-[0_0_28px_-6px_rgba(212,184,115,0.6)]'
          : 'border-white/10 bg-brand-deep/55 hover:border-brand-warmgold/40'
      }`}
      {...handlers}
    >
      <span
        className={`flex items-center gap-2 ${align === 'right' ? 'flex-row-reverse' : 'flex-row'}`}
      >
        <span
          aria-hidden
          className={`h-2.5 w-2.5 shrink-0 rounded-full transition-all duration-300 ${
            active
              ? 'bg-brand-warmgold shadow-[0_0_12px_3px_rgba(212,184,115,0.85)]'
              : 'bg-brand-warmgold/80 shadow-[0_0_8px_1px_rgba(212,184,115,0.4)]'
          }`}
        />
        <span className="font-display text-[15px] font-semibold leading-tight text-brand-cream">
          {agent.name}
        </span>
      </span>
      <span
        className={`mt-1 block text-[12.5px] leading-snug transition-colors duration-300 ${
          active ? 'text-brand-cream/85' : 'text-brand-cream/50'
        }`}
      >
        {agent.desc}
      </span>
    </button>
  );
}

export function SecondBrain(): JSX.Element {
  const [active, setActive] = useState<number | null>(null);
  const anyActive = active !== null;

  const hoverProps = (i: number): React.ComponentProps<'button'> => ({
    onMouseEnter: () => setActive(i),
    onMouseLeave: () => setActive((cur) => (cur === i ? null : cur)),
    onFocus: () => setActive(i),
    onBlur: () => setActive((cur) => (cur === i ? null : cur)),
    onClick: () => setActive((cur) => (cur === i ? null : i)),
  });

  return (
    <figure
      className="m-0"
      aria-label="Amagna second brain — an AI core (AM) with Content, Ads, Booking, Follow-Up, Reviews, and SEO + AEO agents working around it"
    >
      {/* ── Desktop / tablet: ringed columns ── */}
      <div className="relative mx-auto hidden aspect-[5/3] w-full max-w-[1000px] sm:block">
        {/* brain + glowing monogram core */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="relative w-[52%]">
            <Image
              src="/brand/second-brain-core.webp"
              alt=""
              width={1760}
              height={982}
              aria-hidden
              className="h-auto w-full [mask-image:radial-gradient(ellipse_at_center,#000_44%,transparent_74%)]"
            />
            {/* faint purple-gold glow (breathes) + active boost — soft-edged, emanates from the mark */}
            <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
              <span
                className="sb-core-glow block h-[34%] w-[34%] rounded-full"
                style={{
                  background:
                    'radial-gradient(circle at 50% 50%, rgba(93,46,140,0.5) 0%, rgba(201,169,97,0.2) 44%, rgba(201,169,97,0) 72%)',
                }}
              />
            </div>
            <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
              <span
                className="block h-[42%] w-[42%] rounded-full transition-opacity duration-500"
                style={{
                  opacity: anyActive ? 1 : 0,
                  background:
                    'radial-gradient(circle at 50% 50%, rgba(93,46,140,0.55) 0%, rgba(201,169,97,0.18) 46%, rgba(201,169,97,0) 74%)',
                }}
              />
            </div>
            {/* the AM monogram — a small purple emblem (~15% brain width) embedded in the brain */}
            <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
              <Image
                src="/brand/amagna-monogram.svg"
                alt=""
                width={200}
                height={210}
                aria-hidden
                className="h-auto w-[15%] opacity-70 transition-[filter] duration-500"
                style={{
                  filter: anyActive
                    ? 'drop-shadow(0 0 10px rgba(93,46,140,0.85)) drop-shadow(0 0 16px rgba(201,169,97,0.5))'
                    : 'drop-shadow(0 0 7px rgba(93,46,140,0.7)) drop-shadow(0 0 12px rgba(201,169,97,0.38))',
                }}
              />
            </div>
          </div>
        </div>

        {/* connectors + travelling pulses (share the stage coordinate box) */}
        <svg
          aria-hidden
          viewBox="0 0 1000 600"
          className="pointer-events-none absolute inset-0 h-full w-full"
          fill="none"
        >
          {NODES.map((n, i) => (
            <path
              key={`conn-${i}`}
              d={pathFor(n.anchor)}
              stroke={active === i ? '#D4B873' : '#C9A961'}
              strokeWidth={active === i ? 2.4 : 1.3}
              opacity={active === i ? 0.95 : anyActive ? 0.22 : 0.45}
              className="transition-all duration-300"
            />
          ))}
          {NODES.map((n, i) => (
            <circle
              key={`pulse-${i}`}
              r={active === i ? 5.5 : 4.5}
              className="sb-pulse"
              fill="#D4B873"
              style={{ offsetPath: `path("${pathFor(n.anchor)}")`, animationDelay: `${i * 0.42}s` }}
            />
          ))}
          {/* node dots on the ring */}
          {NODES.map((n, i) => (
            <circle
              key={`node-${i}`}
              cx={n.anchor.x}
              cy={n.anchor.y}
              r={active === i ? 6 : 4}
              fill={active === i ? '#D4B873' : '#C9A961'}
              opacity={active === i ? 1 : 0.7}
              className="transition-all duration-300"
            />
          ))}
        </svg>

        {/* agent cards */}
        {NODES.map((n, i) => (
          <div
            key={`card-${i}`}
            className="absolute w-[26%] max-w-[228px]"
            style={{ left: n.left, top: n.top, transform: 'translate(-50%, -50%)' }}
          >
            <AgentCard agent={AGENTS[i]} align={n.align} active={active === i} {...hoverProps(i)} />
          </div>
        ))}
      </div>

      {/* ── Mobile: brain + core on top, agents as a tappable 2-column list ── */}
      <div className="sm:hidden">
        <div aria-hidden className="relative mx-auto grid aspect-square w-[220px] place-items-center">
          <Image
            src="/brand/second-brain-core.webp"
            alt=""
            width={1760}
            height={982}
            aria-hidden
            className="h-auto w-full [mask-image:radial-gradient(ellipse_at_center,#000_44%,transparent_72%)]"
          />
          <span
            className="sb-core-glow pointer-events-none absolute block h-[34%] w-[34%] rounded-full"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(93,46,140,0.5) 0%, rgba(201,169,97,0.2) 44%, rgba(201,169,97,0) 72%)',
            }}
          />
          <Image
            src="/brand/amagna-monogram.svg"
            alt=""
            width={200}
            height={210}
            aria-hidden
            className="pointer-events-none absolute h-auto w-[15%] opacity-70"
            style={{
              filter: 'drop-shadow(0 0 7px rgba(93,46,140,0.7)) drop-shadow(0 0 12px rgba(201,169,97,0.4))',
            }}
          />
        </div>
        <ul className="mx-auto mt-8 grid max-w-[440px] grid-cols-2 gap-3">
          {AGENTS.map((agent, i) => (
            <li key={agent.name}>
              <button
                type="button"
                aria-pressed={active === i}
                onClick={() => setActive((cur) => (cur === i ? null : i))}
                className={`flex w-full items-start gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-all duration-300 ${
                  active === i
                    ? 'border-brand-warmgold/70 bg-brand-deep/80'
                    : 'border-white/10 bg-brand-deep/50'
                }`}
              >
                <span
                  aria-hidden
                  className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full transition-all duration-300 ${
                    active === i
                      ? 'bg-brand-warmgold shadow-[0_0_12px_3px_rgba(212,184,115,0.8)]'
                      : 'bg-brand-warmgold/80'
                  }`}
                />
                <span>
                  <span className="block font-display text-[15px] font-semibold leading-tight text-brand-cream">
                    {agent.name}
                  </span>
                  <span
                    className={`mt-0.5 block text-[12.5px] leading-snug transition-colors duration-300 ${
                      active === i ? 'text-brand-cream/85' : 'text-brand-cream/55'
                    }`}
                  >
                    {agent.desc}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}
