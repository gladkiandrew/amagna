'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

/**
 * ServeBrain — the Who-We-Serve hero artifact: one Second Brain with the six
 * industries we serve orbiting it.
 *
 * Same family as the /grow Second Brain (brain core + glowing AM monogram +
 * connector traces + travelling gold pulses), but built for a hub page, so
 * it's alive on its own: a spotlight AUTO-CYCLES through the six industry
 * nodes every three seconds — no interaction needed — and the visitor can
 * take the wheel any time (hover/tap pins a node; the cycle resumes when
 * they leave). A slow compass ring turns behind the brain.
 *
 * Motion: pulses/ring are CSS-only and motion-safe; the auto-cycle checks
 * prefers-reduced-motion and stays still for those visitors.
 */

type Industry = { name: string; desc: string };

// Order = around the ring, left column top→bottom then right column.
const INDUSTRIES: readonly Industry[] = [
  { name: 'Home Services', desc: 'predictable, owned local leads' },
  { name: 'Real Estate', desc: 'top of mind with your sphere, 24/7' },
  { name: 'Medical Offices', desc: 'compliant patient acquisition' },
  { name: 'Ecommerce', desc: 'always-on creative + managed ads' },
  { name: 'Multi-Location', desc: 'one brain, every location on-brand' },
  { name: 'Custom Installs', desc: 'bespoke AI, installed in person' },
];

// Card placement (% of the stage) + connector anchor (1000x600 viewBox).
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

function IndustryCard({
  industry,
  align,
  active,
  ...handlers
}: {
  industry: Industry;
  align: 'right' | 'left';
  active: boolean;
} & React.ComponentProps<'button'>): JSX.Element {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`group block w-full rounded-lg border px-2 py-2 text-left backdrop-blur transition-all duration-300 sm:rounded-xl sm:px-3.5 sm:py-2.5 ${
        align === 'right' ? 'text-right' : 'text-left'
      } ${
        active
          ? 'border-brand-warmgold/70 bg-brand-deep/80 shadow-[0_0_28px_-6px_rgba(212,184,115,0.6)]'
          : 'border-white/10 bg-brand-deep/55 hover:border-brand-warmgold/40'
      }`}
      {...handlers}
    >
      <span
        className={`flex items-center gap-1.5 sm:gap-2 ${align === 'right' ? 'flex-row-reverse' : 'flex-row'}`}
      >
        <span
          aria-hidden
          className={`h-2 w-2 shrink-0 rounded-full transition-all duration-300 sm:h-2.5 sm:w-2.5 ${
            active
              ? 'bg-brand-warmgold shadow-[0_0_12px_3px_rgba(212,184,115,0.85)]'
              : 'bg-brand-warmgold/80 shadow-[0_0_8px_1px_rgba(212,184,115,0.4)]'
          }`}
        />
        <span className="whitespace-nowrap font-display text-[11.5px] font-semibold leading-tight text-brand-cream sm:text-[14px]">
          {industry.name}
        </span>
      </span>
      <span
        className={`mt-1 block text-[10.5px] leading-snug transition-colors duration-300 sm:text-[12px] ${
          active ? 'text-brand-cream/85' : 'text-brand-cream/50'
        }`}
      >
        {industry.desc}
      </span>
    </button>
  );
}

export function ServeBrain(): JSX.Element {
  const [active, setActive] = useState(0);
  // Pointer or focus inside the stage → the visitor drives; the cycle waits.
  const [engaged, setEngaged] = useState(false);

  useEffect(() => {
    if (engaged) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setInterval(
      () => setActive((i) => (i + 1) % INDUSTRIES.length),
      3000,
    );
    return () => window.clearInterval(timer);
  }, [engaged]);

  const cardHandlers = (i: number): React.ComponentProps<'button'> => ({
    onMouseEnter: () => setActive(i),
    onFocus: () => setActive(i),
    onClick: () => setActive(i),
  });

  return (
    <figure
      className="m-0"
      aria-label="Amagna Second Brain serving six industries — Home Services, Real Estate, Medical Offices, Ecommerce, Multi-Location, and Custom Installs"
      onMouseEnter={() => setEngaged(true)}
      onMouseLeave={() => setEngaged(false)}
      onFocusCapture={() => setEngaged(true)}
      onBlurCapture={() => setEngaged(false)}
    >
      <div className="relative mx-auto aspect-[3/4] w-full max-w-[420px] sm:max-w-[560px] sm:aspect-[5/4]">
        {/* slow compass ring behind the brain */}
        <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
          <div
            className="serve-ring aspect-square h-[64%] rounded-full opacity-60"
            style={{
              background:
                'conic-gradient(from 0deg, transparent 0deg, rgba(212,184,115,0.55) 26deg, transparent 74deg, transparent 178deg, rgba(93,46,140,0.5) 206deg, transparent 254deg)',
              WebkitMaskImage:
                'radial-gradient(farthest-side, transparent calc(100% - 2.5px), #000 calc(100% - 1px))',
              maskImage:
                'radial-gradient(farthest-side, transparent calc(100% - 2.5px), #000 calc(100% - 1px))',
            }}
          />
        </div>

        {/* brain + glowing monogram core */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="relative w-[62%] sm:w-[54%]">
            <Image
              src="/brand/second-brain-core.webp"
              alt=""
              width={1760}
              height={982}
              aria-hidden
              className="h-auto w-full [mask-image:radial-gradient(ellipse_at_center,#000_44%,transparent_74%)]"
            />
            {/* breathing purple-gold glow + spotlight boost from the core */}
            <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
              <span
                className="core-breathe block h-[34%] w-[34%] rounded-full"
                style={{
                  background:
                    'radial-gradient(circle at 50% 50%, rgba(93,46,140,0.5) 0%, rgba(201,169,97,0.2) 44%, rgba(201,169,97,0) 72%)',
                }}
              />
            </div>
            <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
              <span
                className="block h-[44%] w-[44%] rounded-full"
                style={{
                  background:
                    'radial-gradient(circle at 50% 50%, rgba(93,46,140,0.55) 0%, rgba(201,169,97,0.18) 46%, rgba(201,169,97,0) 74%)',
                }}
              />
            </div>
            <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
              <Image
                src="/brand/amagna-monogram.svg"
                alt=""
                width={200}
                height={210}
                aria-hidden
                className="h-auto w-[15%] opacity-70"
                style={{
                  filter:
                    'drop-shadow(0 0 9px rgba(93,46,140,0.8)) drop-shadow(0 0 14px rgba(201,169,97,0.45))',
                }}
              />
            </div>
          </div>
        </div>

        {/* connectors + travelling pulses */}
        <svg
          aria-hidden
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
          fill="none"
        >
          {NODES.map((n, i) => (
            <path
              key={`conn-${i}`}
              d={pathFor(n.anchor)}
              stroke={active === i ? '#D4B873' : '#C9A961'}
              strokeWidth={active === i ? 2.4 : 1.3}
              opacity={active === i ? 0.95 : 0.28}
              className="transition-all duration-500"
            />
          ))}
          {NODES.map((n, i) => (
            <circle
              key={`pulse-${i}`}
              r={active === i ? 5.5 : 4}
              className="wire-pulse"
              fill="#D4B873"
              style={
                {
                  offsetPath: `path("${pathFor(n.anchor)}")`,
                  '--wire-delay': `${i * 0.44}s`,
                } as React.CSSProperties
              }
            />
          ))}
          {NODES.map((n, i) => (
            <circle
              key={`node-${i}`}
              cx={n.anchor.x}
              cy={n.anchor.y}
              r={active === i ? 6 : 4}
              fill={active === i ? '#D4B873' : '#C9A961'}
              opacity={active === i ? 1 : 0.6}
              className="transition-all duration-500"
            />
          ))}
        </svg>

        {/* industry cards */}
        {NODES.map((n, i) => (
          <div
            key={`card-${i}`}
            className="absolute w-[29%] max-w-[228px] sm:w-[27%]"
            style={{ left: n.left, top: n.top, transform: 'translate(-50%, -50%)' }}
          >
            <IndustryCard
              industry={INDUSTRIES[i]}
              align={n.align}
              active={active === i}
              {...cardHandlers(i)}
            />
          </div>
        ))}
      </div>
    </figure>
  );
}
