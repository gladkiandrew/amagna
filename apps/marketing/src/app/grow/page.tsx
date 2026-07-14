import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { Reveal } from './reveal';
import { SecondBrain } from './second-brain';
import { StickyCta } from './sticky-cta';
import './grow.css';

/**
 * /grow — cold-traffic VSL funnel (Meta ads → Book a Call).
 *
 * Two videos up top (looping brand teaser hero → filmed VSL below), then what we
 * build, the agents, and a Michigan close. The ONE Book-a-Call lives only in the
 * sticky bottom bar (sticky-cta.tsx → CALCOM_DIRECT_URL). Global chrome suppressed
 * via grow.css; noindex; not in sitemap.ts.
 */

// ── Videos: drop files/URLs here later (MP4 path or YouTube URL). Empty → placeholder.
const TEASER_VIDEO = '/brand/amagna-teaser.mp4'; // brand teaser — HERO, autoplay muted loop
const TEASER_POSTER = '/brand/amagna-teaser-poster.jpg'; // shown on slow loads before the video paints
const VSL_VIDEO = ''; // filmed VSL (plays with sound, controls) — below the hero
const VSL_POSTER = '';

const DESCRIPTION =
  'A Michigan team of AI specialists who build and run the systems behind your marketing and operations. Watch how it works, then book a call.';

export const metadata: Metadata = {
  title: { absolute: 'The AI Company You Can Actually Hire | Amagna AI' },
  description: DESCRIPTION,
  alternates: { canonical: '/grow' },
  robots: { index: false, follow: true },
};

// Five ways, one punchy line each — the core pitch of the page.
const WAYS: readonly { lead: string; rest: string }[] = [
  {
    lead: 'Runs your marketing.',
    rest: 'Ads, content, and social — created, posted, and managed for you.',
  },
  {
    lead: 'Automates your operations.',
    rest: 'Bookings, reviews, and follow-up, handled 24/7 without you touching it.',
  },
  {
    lead: 'Gets you found.',
    rest: 'Ranked on Google and recommended inside AI answers (SEO + AEO).',
  },
  {
    lead: 'Installs in person.',
    rest: 'Bigger builds mapped on-site — custom AI wired into your business.',
  },
  {
    lead: 'Builds around you.',
    rest: 'We find where AI pays off in your business, then build exactly that.',
  },
];

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

/** Video slot — YouTube embed, self-hosted MP4, or a gold-play placeholder.
 *  mode 'vsl' = user-played with controls; mode 'loop' = autoplay muted loop. */
function FunnelVideo({
  src,
  poster,
  mode,
  label,
}: {
  src: string;
  poster?: string;
  mode: 'vsl' | 'loop';
  label: string;
}): JSX.Element {
  const frame =
    'relative aspect-video w-full overflow-hidden rounded-2xl border border-brand-warmgold/30 bg-brand-deep shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]';

  if (!src) {
    return (
      <div className={frame}>
        <div aria-hidden className="absolute inset-0 grow-dotgrid opacity-50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <span className="flex h-20 w-20 items-center justify-center rounded-full border border-brand-warmgold/60 bg-brand-warmgold/10">
            <Play className="ml-1 h-8 w-8 fill-brand-warmgold text-brand-warmgold" aria-hidden />
          </span>
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-warmgold/80">
            {label}
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

  if (mode === 'loop') {
    return (
      <div className={frame}>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster || undefined}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>
    );
  }

  // VSL: starts playing the moment the visitor lands. Browsers only allow
  // autoplay when muted, so it opens muted with controls — one tap for sound.
  return (
    <div className={frame}>
      <video
        controls
        autoPlay
        muted
        playsInline
        preload="metadata"
        poster={poster || undefined}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

export default function GrowPage(): JSX.Element {
  return (
    <div className="overflow-x-clip bg-brand-deep text-brand-cream">
      {/* ── 1. HERO — brand teaser as a BACKGROUND strip: full-bleed edge to edge,
             no border, height capped so the VSL below is already playing inside
             the first viewport. The VSL is the main event; this sets the scene. ── */}
      <section className="relative w-full overflow-hidden bg-brand-deep">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={TEASER_POSTER}
          className="block h-[34svh] min-h-[220px] w-full object-cover sm:h-[42svh]"
        >
          <source src={TEASER_VIDEO} type="video/mp4" />
        </video>
      </section>

      {/* sentinel — sticky CTA slides up once this scrolls past the top */}
      <div id="grow-hero-end" aria-hidden className="h-px w-full" />

      {/* ── 2. VSL — the sales video, already in view as the page opens ── */}
      <section className="relative">
        <div className="mx-auto w-full max-w-[920px] px-4 pb-14 pt-5 text-center sm:px-6 sm:pb-20 sm:pt-6">
          <Reveal>
            <div className="mb-3 text-left">
              <Eyebrow>Message from the Founder</Eyebrow>
            </div>
            <FunnelVideo src={VSL_VIDEO} poster={VSL_POSTER} mode="vsl" label="VSL coming" />
            <p className="mx-auto mt-4 max-w-[56ch] text-sm italic leading-[1.6] text-brand-cream/55">
              90 seconds on the AI system we install to run your marketing and operations.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 3. SECOND BRAIN — the agent system artifact ── */}
      <section id="second-brain" className="relative isolate overflow-hidden border-t border-white/10">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[520px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(93,46,140,0.32),transparent_68%)] blur-2xl sm:w-[760px]" />
        </div>
        <div className="relative mx-auto w-full max-w-[1100px] px-6 py-16 sm:py-24">
          <Reveal>
            <div className="flex justify-center">
              <Eyebrow center>The agent system</Eyebrow>
            </div>
            <h2 className="mx-auto mt-5 max-w-[22ch] text-balance text-center font-display text-[clamp(1.6rem,3.8vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-brand-cream">
              We&rsquo;ll build your business&rsquo;s second brain.
            </h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-center text-base leading-[1.6] text-brand-cream/65">
              One AI core, a team of agents working around it — running your marketing and operations.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-10">
              <SecondBrain />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 4. FIVE WAYS — the core pitch ── */}
      <section className="relative border-t border-white/10">
        <div className="mx-auto w-full max-w-[880px] px-6 py-16 sm:py-24">
          <Reveal>
            <div className="flex justify-center">
              <Eyebrow center>What our AI does</Eyebrow>
            </div>
            <h2 className="mt-5 text-center font-display text-[clamp(1.7rem,4vw,2.6rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-brand-cream">
              5 Ways Our AI Works
            </h2>
          </Reveal>
          <ul className="mx-auto mt-12 max-w-[720px] divide-y divide-white/10">
            {WAYS.map((way, i) => (
              <Reveal key={way.lead} delay={i * 70}>
                <li className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-4 py-5 sm:gap-6">
                  <span
                    aria-hidden
                    className="font-display text-sm font-semibold tabular-nums text-brand-warmgold/60 sm:text-base"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="min-w-0 text-pretty text-[clamp(1.1rem,2.6vw,1.5rem)] leading-snug tracking-[-0.01em]">
                    <span className="font-display font-semibold text-brand-cream">{way.lead}</span>{' '}
                    <span className="text-brand-cream/55">{way.rest}</span>
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 5. CLOSE — Michigan (CTA is the sticky bar only) ── */}
      <section className="relative isolate overflow-hidden border-t border-white/10">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 grow-dotgrid opacity-50 [mask-image:radial-gradient(ellipse_at_50%_50%,#000,transparent_72%)]" />
          <div className="absolute left-1/2 top-1/2 h-[420px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,169,97,0.16),transparent_70%)] blur-2xl sm:w-[680px]" />
        </div>
        <div className="relative mx-auto w-full max-w-[680px] px-6 py-24 text-center sm:py-28">
          <Reveal>
            <h2 className="text-balance font-display text-[clamp(1.65rem,4vw,2.6rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-brand-cream">
              An AI company you can actually hire.
            </h2>
            <p className="mx-auto mt-5 max-w-[46ch] text-lg leading-[1.6] text-brand-cream/75">
              Proudly Michigan. Tell us about your business and we&rsquo;ll show you what to automate
              first.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 6. FOOTER (minimal, legal only — no CTA) ── */}
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
