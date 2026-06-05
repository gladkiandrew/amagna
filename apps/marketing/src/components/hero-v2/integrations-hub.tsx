import Image from 'next/image';

/**
 * Integrations hub — the orbit diagram ported from the legacy v1 homepage
 * (`hero-flow.tsx`), re-pointed at the social/commerce stack. Eight platform
 * logos arc over the Amagna AI core, which links to Claude and ChatGPT; a pill
 * below reads "The Amagna Crew / and 50+ AI Tools". Pure SVG + CSS pulse
 * animations (reduced-motion gated in globals.css) — no JS, no new deps.
 *
 * Logo assets in `public/brand/integrations/`: gmail.svg, claude.svg and
 * chatgpt.png are originals; instagram/facebook/tiktok/shopify/youtube/linkedin/x
 * are clean minimal placeholder marks created this run (swap for official ones).
 */
type AppLogo = { src: string; alt: string; hasReturn: boolean };

const APPS: AppLogo[] = [
  { src: '/brand/integrations/instagram.svg', alt: 'Instagram', hasReturn: true },
  { src: '/brand/integrations/facebook.svg', alt: 'Facebook', hasReturn: false },
  { src: '/brand/integrations/tiktok.svg', alt: 'TikTok', hasReturn: true },
  { src: '/brand/integrations/shopify.svg', alt: 'Shopify', hasReturn: true },
  { src: '/brand/integrations/youtube.svg', alt: 'YouTube', hasReturn: false },
  { src: '/brand/integrations/linkedin.svg', alt: 'LinkedIn', hasReturn: true },
  { src: '/brand/integrations/x.svg', alt: 'X', hasReturn: false },
  { src: '/brand/integrations/gmail.svg', alt: 'Gmail', hasReturn: true },
];

const APP_CX: readonly number[] = [60, 140, 220, 300, 380, 460, 540, 620];
const VB_W = 640;
const VB_H = 480;

const appPath = (cx: number): string => `M${cx},72 C${cx},150 320,150 320,168`;

const overlayStyle = (cx: number, cy: number, w: number, h: number) => ({
  left: `${(cx / VB_W) * 100}%`,
  top: `${(cy / VB_H) * 100}%`,
  width: `${(w / VB_W) * 100}%`,
  height: `${(h / VB_H) * 100}%`,
  transform: 'translate(-50%, -50%)',
});

export function IntegrationsHub(): JSX.Element {
  return (
    <div className="relative mx-auto w-full max-w-[680px]" style={{ aspectRatio: `${VB_W} / ${VB_H}` }}>
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-labelledby="hub-title hub-desc"
      >
        <title id="hub-title">Amagna AI integrations hub</title>
        <desc id="hub-desc">
          Instagram, Facebook, TikTok, Shopify, YouTube, LinkedIn, X, and Gmail connect through
          the Amagna AI hub to Claude and ChatGPT — the Amagna Crew and 50+ AI tools.
        </desc>

        {APP_CX.map((cx) => (
          <path key={`base-${cx}`} className="flow-line" d={appPath(cx)} />
        ))}
        <path className="flow-line" d="M140,245 L265,245" />
        <path className="flow-line" d="M375,245 L500,245" />
        <path className="flow-line" d="M140,270 C160,350 200,410 228,410" />
        <path className="flow-line" d="M500,270 C480,350 440,410 412,410" />
        <path className="flow-line" d="M320,378 L320,292" />

        {APP_CX.map((cx, i) => (
          <path
            key={`down-${cx}`}
            className="pulse pulse-gold pulse-down"
            d={appPath(cx)}
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
        {APPS.map((app, i) =>
          app.hasReturn ? (
            <path
              key={`up-${APP_CX[i]}`}
              className="pulse pulse-purple pulse-up"
              d={appPath(APP_CX[i])}
              style={{ animationDelay: `${0.4 + i * 0.45}s` }}
            />
          ) : null,
        )}

        <path className="pulse pulse-gold pulse-down" d="M140,245 L265,245" style={{ animationDelay: '0.2s' }} />
        <path className="pulse pulse-gold pulse-up" d="M140,245 L265,245" style={{ animationDelay: '1.7s' }} />
        <path className="pulse pulse-gold pulse-down" d="M375,245 L500,245" style={{ animationDelay: '0.7s' }} />
        <path className="pulse pulse-gold pulse-up" d="M375,245 L500,245" style={{ animationDelay: '2.2s' }} />
        <path className="pulse pulse-gold pulse-down" d="M140,270 C160,350 200,410 228,410" style={{ animationDelay: '0.4s' }} />
        <path className="pulse pulse-gold pulse-up" d="M140,270 C160,350 200,410 228,410" style={{ animationDelay: '1.9s' }} />
        <path className="pulse pulse-gold pulse-down" d="M500,270 C480,350 440,410 412,410" style={{ animationDelay: '0.9s' }} />
        <path className="pulse pulse-gold pulse-up" d="M500,270 C480,350 440,410 412,410" style={{ animationDelay: '2.4s' }} />

        {/* Pill */}
        <rect className="fill-white stroke-royal-purple" x="220" y="376" width="200" height="68" rx="34" strokeWidth="1" />
        <text x="320" y="402" textAnchor="middle" fontSize="14" fontWeight="700" className="fill-royal-purple">
          The Amagna Crew
        </text>
        <text x="320" y="422" textAnchor="middle" fontSize="11" className="fill-ink-muted">
          and 50+ AI Tools
        </text>

        {[0, 0.4, 0.8, 1.2, 1.6].map((delay, i) => (
          <circle key={`ripple-${i}`} className="ripple-dot" cx={320} cy={380} r={4} style={{ animationDelay: `${delay}s` }} />
        ))}

        {/* Core */}
        <circle className="amagna-glow fill-royal-purple" cx={320} cy={230} r={80} fillOpacity={0.22} />
        <circle className="fill-royal-purple" cx={320} cy={230} r={62} />
        <text x={320} y={226} textAnchor="middle" dominantBaseline="central" fontSize={17} fontWeight={600} className="fill-white" style={{ letterSpacing: '-0.5px' }}>
          Amagna
        </text>
        <text x={320} y={246} textAnchor="middle" dominantBaseline="central" fontSize={17} fontWeight={600} className="fill-dark-mode-gold" style={{ letterSpacing: '-0.2px' }}>
          AI
        </text>
      </svg>

      {/* Top platform logos — sized up (and tighter inner padding on phones) so
          the marks stay legible when the whole diagram scales down on mobile. */}
      {APPS.map((app, i) => (
        <div
          key={app.alt}
          className="absolute flex items-center justify-center rounded-lg border border-brand-lightgray bg-white p-1 sm:p-2"
          style={overlayStyle(APP_CX[i], 50, 60, 60)}
        >
          <div className="relative h-full w-full">
            <Image src={app.src} alt={app.alt} fill className="object-contain" sizes="60px" />
          </div>
        </div>
      ))}

      {/* Claude side node */}
      <div
        className="absolute flex items-center justify-center rounded-full border border-brand-lightgray bg-white px-4 py-2"
        style={overlayStyle(85, 245, 110, 50)}
      >
        <div className="relative h-full w-full">
          <Image src="/brand/integrations/claude.svg" alt="Claude" fill className="object-contain" sizes="110px" />
        </div>
      </div>

      {/* ChatGPT side node */}
      <div
        className="absolute flex items-center justify-center rounded-full border border-brand-lightgray bg-white px-4 py-2"
        style={overlayStyle(555, 245, 110, 50)}
      >
        <div className="relative h-full w-full">
          <Image src="/brand/integrations/chatgpt.png" alt="ChatGPT" fill className="object-contain" sizes="110px" />
        </div>
      </div>
    </div>
  );
}
