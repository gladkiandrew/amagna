import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play } from 'lucide-react';
import { AgentMap } from './agent-map';
import { StickyCta } from './sticky-cta';
import './grow.css';

/**
 * /grow — paid Meta-ad VSL funnel (COLD Michigan traffic → Book a Call).
 *
 * One objective, one CTA: the sticky bottom bar (sticky-cta.tsx). The hero CTA
 * only scrolls to the artifact. Global SiteHeader/SiteFooter are suppressed via
 * grow.css; this route ships its own minimal chrome. noindex; not in sitemap.ts.
 */

// ── VSL video: drop the file/URL here when ready (MP4 path or YouTube URL).
//    Empty string ('') renders the styled placeholder (gold play icon + label).
const VSL_VIDEO = '';
const VSL_POSTER = '';

const DESCRIPTION =
  'A Michigan team of AI specialists who build and run the systems behind your marketing and operations. Watch the 2-minute breakdown, then book a call.';

export const metadata: Metadata = {
  title: { absolute: 'The AI Company You Can Actually Hire | Amagna AI' },
  description: DESCRIPTION,
  alternates: { canonical: '/grow' },
  robots: { index: false, follow: true },
};

const BUILDS = [
  { title: 'Runs your marketing', body: 'Ads, content, follow-up — built and run for you.' },
  { title: 'Automates your operations', body: 'Bookings, reviews, follow-up — handled 24/7.' },
  { title: 'Gets you found', body: 'Rank on Google and get recommended by AI (SEO + AEO).' },
  {
    title: 'Installed in person',
    body: 'Bigger builds, mapped on-site and installed across your business.',
  },
  { title: 'Built around you', body: 'Not sure where AI fits? We find it and build it.' },
] as const;

function Eyebrow({ children, center = false }: { children: React.ReactNode; center?: boolean }): JSX.Element {
  return (
    <p
      className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-warmgold ${
        center ? 'justify-center' : ''
      }`}
    >
      <span aria-hidden className="h-px w-7 bg-brand-warmgold/60" />
      {children}
    </p>
  );
}

/** VSL slot — YouTube embed, self-hosted MP4, or a gold-play placeholder. */
function VslVideo({ src, poster }: { src: string; poster?: string }): JSX.Element {
  const frame =
    'relative aspect-video w-full overflow-hidden rounded-2xl border border-brand-warmgold/30 bg-brand-deep shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]';

  if (!src) {
    return (
      <div className={frame}>
        <div className="absolute inset-0 grow-dotgrid opacity-50" aria-hidden />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <span className="flex h-20 w-20 items-center justify-center rounded-full border border-brand-warmgold/60 bg-brand-warmgold/10">
            <Play className="ml-1 h-8 w-8 fill-brand-warmgold text-brand-warmgold" aria-hidden />
          </span>
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-warmgold/80">
            VSL coming
          </p>
        </div>
      </div>
    );
  }

  if (/youtu\.?be/.test(src)) {
    const id = src.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/)?.[1];
    const embed = id ? `https://www.youtube.com/embed/${id}` : src;
    return (
      <div className={frame}>
        <iframe
          src={embed}
          title="Amagna AI"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  return (
    <div className={frame}>
      <video controls preload="metadata" poster={poster} className="absolute inset-0 h-full w-full object-cover">
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

export default function GrowPage(): JSX.Element {
  return (
    <div className="bg-brand-deep text-brand-cream">
      {/* ── HEADER (logo only) ── */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-brand-deep/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1100px] items-center justify-center px-6 py-4 sm:justify-start">
          <Link href="/" aria-label="Amagna AI — home" className="flex shrink-0 items-center">
            <Image
              src="/brand/amagna-logo-gold.png"
              alt="Amagna AI"
              width={2276}
              height={492}
              priority
              className="h-7 w-auto md:h-8"
            />
          </Link>
        </div>
      </header>

      {/* ── HERO — the VSL ── */}
      <section className="relative isolate overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 grow-dotgrid opacity-60 [mask-image:radial-gradient(ellipse_at_50%_30%,#000,transparent_72%)]" />
          <div className="absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,169,97,0.18),transparent_68%)] blur-2xl" />
          <div className="absolute -bottom-48 left-[8%] h-[420px] w-[520px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(93,46,140,0.5),transparent_70%)] blur-2xl" />
        </div>
        <div className="relative mx-auto w-full max-w-[860px] px-6 pb-16 pt-14 text-center sm:pb-20 sm:pt-20">
          <div className="flex justify-center motion-safe:animate-[growRiseIn_0.7s_ease-out_both]">
            <Eyebrow center>For Michigan business owners</Eyebrow>
          </div>
          <h1 className="mt-5 text-balance font-display text-[clamp(2.4rem,6.4vw,4.2rem)] font-semibold leading-[1.03] tracking-[-0.02em] text-brand-cream [text-shadow:0_2px_40px_rgba(0,0,0,0.3)] motion-safe:animate-[growRiseIn_0.7s_ease-out_0.1s_both]">
            The AI company you can <span className="text-brand-warmgold">actually</span> hire.
          </h1>
          <div className="mt-10 motion-safe:animate-[growRiseIn_0.7s_ease-out_0.2s_both]">
            <VslVideo src={VSL_VIDEO} poster={VSL_POSTER} />
          </div>
          <div className="mt-8 flex justify-center motion-safe:animate-[growRiseIn_0.7s_ease-out_0.3s_both]">
            <a
              href="#system"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-brand-warmgold/40 px-7 py-3.5 text-sm font-semibold text-brand-cream transition-colors hover:border-brand-warmgold hover:bg-white/5"
            >
              Check Out Our AI Tools
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </a>
          </div>
        </div>
      </section>

      {/* sentinel — the sticky CTA slides up once this scrolls past the top */}
      <div id="grow-hero-end" aria-hidden className="h-px w-full" />

      {/* ── INTRO ── */}
      <section className="relative border-t border-white/10">
        <div className="mx-auto w-full max-w-[760px] px-6 py-16 text-center sm:py-20">
          <div className="flex justify-center">
            <Eyebrow center>The system</Eyebrow>
          </div>
          <h2 className="mt-5 text-balance font-display text-[clamp(1.9rem,4.2vw,2.9rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-brand-cream">
            One AI core. A team of agents. Running your business.
          </h2>
          <p className="mx-auto mt-5 max-w-[56ch] text-lg leading-[1.6] text-brand-cream/70">
            Built around your marketing, your operations, and how you actually work — installed and
            run for you.
          </p>
        </div>
      </section>

      {/* ── THE ARTIFACT ── */}
      <section
        id="system"
        className="relative isolate scroll-mt-24 overflow-hidden border-t border-white/10"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(93,46,140,0.4),transparent_65%)] blur-2xl" />
        </div>
        <div className="relative mx-auto w-full max-w-[1100px] px-6 py-16 sm:py-24">
          <AgentMap />
        </div>
      </section>

      {/* ── WHAT WE BUILD ── */}
      <section className="relative border-t border-white/10">
        <div className="mx-auto w-full max-w-[1100px] px-6 py-16 sm:py-20">
          <div className="flex justify-center">
            <Eyebrow center>What we build</Eyebrow>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {BUILDS.map((b, i) => (
              <div
                key={b.title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-gold/40 hover:bg-white/[0.05] hover:shadow-[0_22px_50px_-24px_rgba(0,0,0,0.7)]"
              >
                {/* animated gold gradient top-edge */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,#C9A961,#D4B873,#C9A961)] bg-[length:200%_100%] opacity-70 transition-opacity duration-300 group-hover:opacity-100 motion-safe:animate-[growShimmer_3s_linear_infinite]"
                />
                <span aria-hidden className="font-display text-2xl font-semibold text-brand-gold/80">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-brand-cream">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm leading-[1.6] text-brand-cream/65">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER (minimal, legal only — no CTA) ── */}
      <footer className="border-t border-white/10 pb-28 pt-12 sm:pb-32">
        <div className="mx-auto flex w-full max-w-[1100px] flex-col items-center gap-5 px-6 text-center">
          <Image
            src="/brand/amagna-logo-gold.png"
            alt="Amagna AI"
            width={2276}
            height={492}
            className="h-7 w-auto"
          />
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-cream/55">
            Proudly Michigan.
          </p>
          <div className="flex items-center gap-4 text-xs text-brand-cream/45">
            <Link href="/privacy" className="transition-colors hover:text-brand-warmgold">
              Privacy
            </Link>
            <span aria-hidden>·</span>
            <Link href="/terms" className="transition-colors hover:text-brand-warmgold">
              Terms
            </Link>
          </div>
        </div>
      </footer>

      <StickyCta />
    </div>
  );
}
