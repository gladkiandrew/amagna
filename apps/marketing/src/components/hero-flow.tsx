import Image from 'next/image';

type AppLogo = {
  src: string;
  alt: string;
  hasReturn: boolean;
};

const APPS: AppLogo[] = [
  { src: '/brand/integrations/jobber icon.png', alt: 'Jobber', hasReturn: false },
  { src: '/brand/integrations/hubspot logo.png', alt: 'HubSpot', hasReturn: true },
  { src: '/brand/integrations/yardi logo.svg', alt: 'Yardi', hasReturn: false },
  { src: '/brand/integrations/Zillow Logo.svg', alt: 'Zillow', hasReturn: true },
  { src: '/brand/integrations/zoho logo.svg', alt: 'Zoho', hasReturn: true },
  { src: '/brand/integrations/gmail icon.svg', alt: 'Gmail', hasReturn: true },
  { src: '/brand/integrations/Google Drive icon.svg', alt: 'Google Drive', hasReturn: false },
  { src: '/brand/integrations/google calendar icon.svg', alt: 'Google Calendar', hasReturn: true },
];

const APP_CX: readonly number[] = [60, 140, 220, 300, 380, 460, 540, 620];

const VB_W = 640;
const VB_H = 480;

const appPath = (cx: number): string =>
  `M${cx},72 C${cx},150 320,150 320,168`;

const overlayStyle = (cx: number, cy: number, w: number, h: number) => ({
  left: `${(cx / VB_W) * 100}%`,
  top: `${(cy / VB_H) * 100}%`,
  width: `${(w / VB_W) * 100}%`,
  height: `${(h / VB_H) * 100}%`,
  transform: 'translate(-50%, -50%)',
});

export function HeroFlow(): JSX.Element {
  return (
    <section className="mx-auto w-full max-w-[1100px] px-6 py-16 text-center sm:py-24">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#5D2E8C]">
        Amagna AI
      </p>

      <h1 className="mt-4 text-balance text-[32px] font-medium leading-[1.15] tracking-tight text-[#1A1A1A] sm:text-[48px]">
        Sync your apps with any LLM into one agentic dashboard
      </h1>

      <p className="mx-auto mt-5 max-w-[560px] text-[18px] leading-[1.5] text-[#5A5A60]">
        50+ AI agents custom fit to your business.
      </p>

      <div
        className="relative mx-auto mt-12 w-full"
        style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
      >
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-labelledby="hero-flow-title hero-flow-desc"
        >
          <title id="hero-flow-title">Amagna AI agentic flow diagram</title>
          <desc id="hero-flow-desc">
            Eight business apps connect through the Amagna AI hub to Claude and ChatGPT, powering 50+ AI agents.
          </desc>

          {APP_CX.map((cx) => (
            <path key={`base-app-${cx}`} className="flow-line" d={appPath(cx)} />
          ))}
          <path className="flow-line" d="M140,245 L265,245" />
          <path className="flow-line" d="M375,245 L500,245" />
          <path className="flow-line" d="M140,270 C160,350 200,410 228,410" />
          <path className="flow-line" d="M500,270 C480,350 440,410 412,410" />
          <path className="flow-line" d="M320,378 L320,292" />

          {APP_CX.map((cx, i) => (
            <path
              key={`down-app-${cx}`}
              className="pulse pulse-gold pulse-down"
              d={appPath(cx)}
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}

          {APPS.map((app, i) =>
            app.hasReturn ? (
              <path
                key={`up-app-${APP_CX[i]}`}
                className="pulse pulse-purple pulse-up"
                d={appPath(APP_CX[i])}
                style={{ animationDelay: `${0.4 + i * 0.45}s` }}
              />
            ) : null,
          )}

          <path className="pulse pulse-gold pulse-down" d="M140,245 L265,245" style={{ animationDelay: '0.2s' }} />
          <path className="pulse pulse-gold pulse-up"   d="M140,245 L265,245" style={{ animationDelay: '1.7s' }} />

          <path className="pulse pulse-gold pulse-down" d="M375,245 L500,245" style={{ animationDelay: '0.7s' }} />
          <path className="pulse pulse-gold pulse-up"   d="M375,245 L500,245" style={{ animationDelay: '2.2s' }} />

          <path className="pulse pulse-gold pulse-down" d="M140,270 C160,350 200,410 228,410" style={{ animationDelay: '0.4s' }} />
          <path className="pulse pulse-gold pulse-up"   d="M140,270 C160,350 200,410 228,410" style={{ animationDelay: '1.9s' }} />

          <path className="pulse pulse-gold pulse-down" d="M500,270 C480,350 440,410 412,410" style={{ animationDelay: '0.9s' }} />
          <path className="pulse pulse-gold pulse-up"   d="M500,270 C480,350 440,410 412,410" style={{ animationDelay: '2.4s' }} />

          <rect x="228" y="378" width="184" height="64" rx="32" fill="#FFFFFF" stroke="#5D2E8C" strokeWidth="1" />
          <text x="320" y="405" textAnchor="middle" fontSize="14" fontWeight="600" fill="#5D2E8C">
            50+ AI agents
          </text>
          <text x="320" y="424" textAnchor="middle" fontSize="11" fill="#5A5A60">
            and tools
          </text>

          {[0, 0.4, 0.8, 1.2, 1.6].map((delay, i) => (
            <circle
              key={`ripple-${i}`}
              className="ripple-dot"
              cx={320}
              cy={380}
              r={4}
              style={{ animationDelay: `${delay}s` }}
            />
          ))}

          <circle className="amagna-glow" cx={320} cy={230} r={80} fill="#5D2E8C" fillOpacity={0.22} />
          <circle cx={320} cy={230} r={62} fill="#5D2E8C" />
          <text
            x={320}
            y={226}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={17}
            fontWeight={600}
            fill="#FFFFFF"
            style={{ letterSpacing: '-0.5px' }}
          >
            Amagna
          </text>
          <text
            x={320}
            y={246}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={17}
            fontWeight={600}
            fill="#D4B873"
            style={{ letterSpacing: '-0.2px' }}
          >
            AI
          </text>
        </svg>

        {APPS.map((app, i) => (
          <div
            key={app.alt}
            className="absolute flex items-center justify-center rounded-lg bg-white"
            style={{
              ...overlayStyle(APP_CX[i], 50, 44, 44),
              borderColor: '#E5E5EA',
              borderWidth: '0.5px',
              borderStyle: 'solid',
              padding: '8px',
            }}
          >
            <div className="relative h-full w-full">
              <Image src={app.src} alt={app.alt} fill priority className="object-contain" />
            </div>
          </div>
        ))}

        <div
          className="absolute flex items-center justify-center rounded-full bg-white"
          style={{
            ...overlayStyle(85, 245, 110, 50),
            borderColor: '#E5E5EA',
            borderWidth: '0.5px',
            borderStyle: 'solid',
            padding: '8px 16px',
          }}
        >
          <div className="relative h-full w-full">
            <Image
              src="/brand/integrations/Claude Logo.svg"
              alt="Claude"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

        <div
          className="absolute flex items-center justify-center rounded-full bg-white"
          style={{
            ...overlayStyle(555, 245, 110, 50),
            borderColor: '#E5E5EA',
            borderWidth: '0.5px',
            borderStyle: 'solid',
            padding: '8px 16px',
          }}
        >
          <div className="relative h-full w-full">
            <Image
              src="/brand/integrations/ChatGPT Logo.png"
              alt="ChatGPT"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <a
          href="#book"
          className="rounded-full bg-[#5D2E8C] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#4a2470]"
        >
          Book a call
        </a>
        <a
          href="#how"
          className="rounded-full border border-[#5D2E8C] bg-transparent px-6 py-3 text-sm font-medium text-[#5D2E8C] transition-colors hover:bg-[#5D2E8C]/5"
        >
          See how it works
        </a>
      </div>
    </section>
  );
}
