import Image from 'next/image';

/**
 * WiredIn — the "if it has a key or an MCP, we can automate it" diagram for
 * /who-we-serve frame 4.
 *
 * A live wiring chart on the dark panel: seven tool chips on the left, gold
 * traces converging into the glowing AM core on the right, with travelling
 * pulses running tool → brain (the same `.wire-pulse` motion as the hero
 * artifact, so the page's two diagrams rhyme). Server-rendered, zero JS —
 * all motion is CSS and motion-safe.
 *
 * Geometry: one absolutely-positioned stage; chips + core sit at % positions
 * that match the 1000x560 SVG viewBox underneath, so the traces stay glued
 * to their chips at every width.
 */

type Tool = { src: string; alt: string; left: string; top: string; anchor: { x: number; y: number } };

// Two staggered columns; anchors sit just east of each chip's edge.
const TOOLS: readonly Tool[] = [
  { src: '/brand/integrations/jobber.png', alt: 'Jobber', left: '12%', top: '16%', anchor: { x: 208, y: 90 } },
  { src: '/brand/integrations/shopify.svg', alt: 'Shopify', left: '12%', top: '39%', anchor: { x: 208, y: 218 } },
  { src: '/brand/integrations/gmail.svg', alt: 'Gmail', left: '12%', top: '62%', anchor: { x: 208, y: 347 } },
  { src: '/brand/integrations/google-calendar.svg', alt: 'Google Calendar', left: '12%', top: '85%', anchor: { x: 208, y: 476 } },
  { src: '/brand/integrations/hubspot.png', alt: 'HubSpot', left: '33%', top: '27.5%', anchor: { x: 418, y: 154 } },
  { src: '/brand/integrations/instagram.svg', alt: 'Instagram', left: '33%', top: '50%', anchor: { x: 418, y: 280 } },
  { src: '/brand/integrations/facebook.svg', alt: 'Facebook', left: '33%', top: '72.5%', anchor: { x: 418, y: 406 } },
] as const;

const CORE = { x: 800, y: 280 };

// Gentle eastward curve from each tool into the core.
const traceFor = (a: { x: number; y: number }): string =>
  `M${a.x} ${a.y} C ${a.x + 150} ${a.y}, 630 ${CORE.y}, ${CORE.x} ${CORE.y}`;

/** The glowing AM core — shared by the desktop stage and the mobile stack. */
function BrainCore(): JSX.Element {
  return (
    <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-brand-warmgold/40 bg-brand-deep shadow-[0_0_70px_-12px_rgba(212,184,115,0.55)] sm:h-32 sm:w-32">
      <span
        aria-hidden
        className="core-breathe absolute inset-0 rounded-full"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(93,46,140,0.5) 0%, rgba(201,169,97,0.18) 52%, rgba(201,169,97,0) 76%)',
        }}
      />
      <Image
        src="/brand/amagna-monogram.svg"
        alt=""
        width={200}
        height={210}
        aria-hidden
        className="relative h-auto w-10 opacity-80 sm:w-12"
        style={{
          filter:
            'drop-shadow(0 0 9px rgba(93,46,140,0.8)) drop-shadow(0 0 14px rgba(201,169,97,0.45))',
        }}
      />
    </div>
  );
}

export function WiredIn(): JSX.Element {
  return (
    <figure
      className="m-0"
      aria-label="Tools like Jobber, Shopify, Gmail, Google Calendar, HubSpot, Instagram, and Facebook wired into your Second Brain"
    >
      {/* ── Mobile: the same story, stacked — tool chips, one falling current,
             the core. The absolute stage below needs more width than a phone
             gives it. ── */}
      <div className="flex flex-col items-center sm:hidden">
        <ul className="flex flex-wrap items-center justify-center gap-2.5">
          {TOOLS.map((t) => (
            <li
              key={t.alt}
              className="flex h-10 w-20 items-center justify-center rounded-lg border border-white/10 bg-brand-cream px-2.5 py-1.5 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.6)]"
            >
              <div className="relative h-5 w-full">
                <Image src={t.src} alt={t.alt} fill className="object-contain" />
              </div>
            </li>
          ))}
        </ul>
        <span
          aria-hidden
          className="mt-4 h-12 w-px bg-gradient-to-b from-transparent via-brand-gold/70 to-brand-warmgold"
        />
        <div className="mt-4">
          <BrainCore />
        </div>
        <p className="mt-3 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-warmgold">
          Your Second Brain
        </p>
      </div>

      {/* ── The wiring stage — sm and up. ── */}
      <div className="relative mx-auto hidden aspect-[16/9] w-full max-w-[980px] sm:block lg:aspect-[16/8]">
        {/* traces + travelling pulses */}
        <svg
          aria-hidden
          viewBox="0 0 1000 560"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
          fill="none"
        >
          {TOOLS.map((t, i) => (
            <path
              key={`trace-${i}`}
              d={traceFor(t.anchor)}
              stroke="#C9A961"
              strokeWidth={1.3}
              opacity={0.4}
            />
          ))}
          {TOOLS.map((t, i) => (
            <circle
              key={`pulse-${i}`}
              r={4.5}
              className="wire-pulse"
              fill="#D4B873"
              style={
                {
                  offsetPath: `path("${traceFor(t.anchor)}")`,
                  '--wire-dur': '3.2s',
                  '--wire-delay': `${i * 0.5}s`,
                } as React.CSSProperties
              }
            />
          ))}
          {TOOLS.map((t, i) => (
            <circle key={`node-${i}`} cx={t.anchor.x} cy={t.anchor.y} r={3.5} fill="#C9A961" opacity={0.7} />
          ))}
        </svg>

        {/* tool chips */}
        {TOOLS.map((t) => (
          <div
            key={t.alt}
            className="absolute flex h-10 w-[17%] min-w-[64px] max-w-[150px] items-center justify-center rounded-lg border border-white/10 bg-brand-cream px-2.5 py-1.5 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.6)] sm:h-12 sm:rounded-xl sm:px-3.5"
            style={{ left: t.left, top: t.top, transform: 'translate(-50%, -50%)' }}
          >
            <div className="relative h-5 w-full sm:h-6">
              <Image src={t.src} alt={t.alt} fill className="object-contain" />
            </div>
          </div>
        ))}

        {/* the brain core */}
        <div
          className="absolute"
          style={{ left: '80%', top: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <BrainCore />
          <p className="mt-3 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-warmgold sm:text-[11px]">
            Your Second Brain
          </p>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-xs text-brand-cream/45">
        A live example — your stack will look different. That&apos;s the point.
      </figcaption>
    </figure>
  );
}
