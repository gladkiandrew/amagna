import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Building2,
  CalendarCheck,
  ChevronDown,
  Home,
  Megaphone,
  MessagesSquare,
  Microscope,
  PenLine,
  Play,
  Search,
  ShoppingBag,
  Star,
  Stethoscope,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { CALCOM_DIRECT_URL } from '@/lib/site';
import { Reveal } from './reveal';
import { WaysToggle, type Way } from './ways-toggle';
import { StickyCta } from './sticky-cta';
import './grow.css';

/**
 * /grow — cold-traffic VSL funnel (Meta ads → Book a Call).
 *
 * Two videos up top (filmed VSL → animated in-depth), then relevance, what/how,
 * the agents, and a single Book-a-Call close. The ONLY booking destination is
 * CALCOM_DIRECT_URL (sticky bar + close button). Global chrome suppressed via
 * grow.css; noindex; not in sitemap.ts.
 */

// ── Videos: drop files/URLs here later (MP4 path or YouTube URL). Empty → placeholder.
const VSL_VIDEO = ''; // filmed VSL (plays with sound, controls)
const VSL_POSTER = '';
const INDEPTH_VIDEO = ''; // animated deep-dive (autoplay muted loop)
const INDEPTH_POSTER = '';

const DESCRIPTION =
  'A Michigan team of AI specialists who build and run the systems behind your marketing and operations. Watch how it works, then book a call.';

export const metadata: Metadata = {
  title: { absolute: 'The AI Company You Can Actually Hire | Amagna AI' },
  description: DESCRIPTION,
  alternates: { canonical: '/grow' },
  robots: { index: false, follow: true },
};

const NICHES: readonly { Icon: LucideIcon; label: string; line: string }[] = [
  { Icon: Wrench, label: 'Home Services', line: 'HVAC, plumbing, roofing, electrical. Predictable, owned leads.' },
  { Icon: Home, label: 'Real Estate', line: 'Agents, teams, brokers. Stay top of mind 24/7.' },
  { Icon: Stethoscope, label: 'Medical Offices', line: 'Practices, dental, med-spa. Compliant patient acquisition.' },
  { Icon: ShoppingBag, label: 'Ecommerce', line: 'DTC and Shopify brands. Always-on creative + paid.' },
  { Icon: Building2, label: 'Multi-Location', line: 'Franchises and groups. One brain, every location on-brand.' },
];

const WAYS: readonly Way[] = [
  {
    tab: 'Marketing',
    title: 'Runs your marketing',
    body: 'Ads, content, and follow-up, built and run for you across Meta, TikTok, Google, and Snapchat.',
  },
  {
    tab: 'Operations',
    title: 'Automates your operations',
    body: 'Booking, reviews, and follow-up handled 24/7, wired into the tools you already use.',
  },
  {
    tab: 'Visibility',
    title: 'Gets you found',
    body: 'Rank on Google and get recommended by AI — SEO + AEO built in.',
  },
  {
    tab: 'Custom installs',
    title: 'Installed in person',
    body: 'Bigger builds, mapped on-site and installed across your business.',
  },
  {
    tab: 'Built around you',
    title: 'Built around you',
    body: 'Not sure where AI fits? We find the highest-leverage spots and build them.',
  },
];

const AGENTS: readonly { Icon: LucideIcon; name: string; line: string }[] = [
  { Icon: Microscope, name: 'Research Agent', line: 'Studies your market, competitors, and customers.' },
  { Icon: PenLine, name: 'Content Agent', line: 'Writes and generates posts, blogs, and creative.' },
  { Icon: Megaphone, name: 'Ads Agent', line: 'Builds and runs paid campaigns across platforms.' },
  { Icon: CalendarCheck, name: 'Booking Agent', line: 'Captures leads and books them onto your calendar.' },
  { Icon: MessagesSquare, name: 'Follow-Up Agent', line: 'Nurtures every lead until they convert.' },
  { Icon: Star, name: 'Reviews Agent', line: 'Requests and manages reviews automatically.' },
  { Icon: Search, name: 'SEO + AEO Agent', line: 'Gets you found on Google and inside AI answers.' },
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

function CtaButton({ label = 'Book a Call' }: { label?: string }): JSX.Element {
  return (
    <a
      href={CALCOM_DIRECT_URL}
      className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-gold px-8 py-4 text-base font-semibold text-brand-deep transition-all hover:bg-brand-warmgold hover:shadow-[0_14px_40px_-12px_rgba(201,169,97,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-warmgold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-deep sm:w-auto"
    >
      {label}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
    </a>
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
          poster={poster}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={src} type="video/mp4" />
        </video>
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
      {/* ── 0. HEADER (logo only) ── */}
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

      {/* ── 1. HERO — the VSL ── */}
      <section className="relative isolate overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 grow-dotgrid opacity-60 [mask-image:radial-gradient(ellipse_at_50%_28%,#000,transparent_72%)]" />
          <div className="absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,169,97,0.18),transparent_68%)] blur-2xl" />
          <div className="absolute -bottom-48 left-[8%] h-[420px] w-[520px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(93,46,140,0.5),transparent_70%)] blur-2xl" />
        </div>
        <div className="relative mx-auto w-full max-w-[860px] px-6 pb-14 pt-14 text-center sm:pt-20">
          <h1 className="text-balance font-display text-[clamp(2.2rem,5.6vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-brand-cream [text-shadow:0_2px_40px_rgba(0,0,0,0.3)] motion-safe:animate-[growRiseIn_0.7s_ease-out_both]">
            Watch how we build your AI system in{' '}
            <span className="text-brand-warmgold">90 seconds</span>.
          </h1>
          <div className="mt-10 motion-safe:animate-[growRiseIn_0.7s_ease-out_0.12s_both]">
            <FunnelVideo src={VSL_VIDEO} poster={VSL_POSTER} mode="vsl" label="VSL coming" />
          </div>
          <p className="mt-4 text-sm italic leading-[1.6] text-brand-cream/55 motion-safe:animate-[growRiseIn_0.7s_ease-out_0.2s_both]">
            90 seconds on the AI system we install to run your marketing and operations.
          </p>
          <div className="mt-8 flex justify-center text-brand-warmgold/50 motion-safe:animate-[growRiseIn_0.7s_ease-out_0.3s_both]">
            <ChevronDown className="h-5 w-5 motion-safe:animate-bounce" aria-hidden />
          </div>
        </div>
      </section>

      {/* sentinel — sticky CTA slides up once this scrolls past the top */}
      <div id="grow-hero-end" aria-hidden className="h-px w-full" />

      {/* ── 2. IN-DEPTH SERVICES VIDEO ── */}
      <section className="relative border-t border-white/10">
        <div className="mx-auto w-full max-w-[920px] px-6 py-16 text-center sm:py-20">
          <Reveal>
            <div className="flex justify-center">
              <Eyebrow center>Go deeper</Eyebrow>
            </div>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,4.2vw,2.9rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-brand-cream">
              The full system, explained.
            </h2>
            <p className="mx-auto mt-4 max-w-[56ch] text-base leading-[1.6] text-brand-cream/70">
              A closer look at what we build, how the agents work together, and what it does for your
              business.
            </p>
            <div className="mt-10">
              <FunnelVideo src={INDEPTH_VIDEO} poster={INDEPTH_POSTER} mode="loop" label="Video coming" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 3. WHO IT'S FOR ── */}
      <section className="relative border-t border-white/10">
        <div className="mx-auto w-full max-w-[1100px] px-6 py-16 sm:py-20">
          <Reveal>
            <div className="flex justify-center">
              <Eyebrow center>Who it&rsquo;s for</Eyebrow>
            </div>
            <h2 className="mx-auto mt-5 max-w-[24ch] text-balance text-center font-display text-[clamp(1.8rem,4vw,2.7rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-brand-cream">
              Built for operators who&rsquo;d rather run their business than their marketing.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {NICHES.map((n, i) => {
              const Icon = n.Icon;
              return (
                <Reveal key={n.label} delay={i * 80}>
                  <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/40">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-gold/10">
                      <Icon className="h-5 w-5 text-brand-warmgold" aria-hidden />
                    </span>
                    <h3 className="mt-4 font-display text-base font-semibold text-brand-cream">{n.label}</h3>
                    <p className="mt-1.5 text-sm leading-[1.55] text-brand-cream/65">{n.line}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. WHAT WE BUILD — rotating cards ── */}
      <section className="relative border-t border-white/10">
        <div className="mx-auto w-full max-w-[1100px] px-6 py-16 sm:py-20">
          <Reveal>
            <div className="flex justify-center">
              <Eyebrow center>What we build</Eyebrow>
            </div>
            <h2 className="mt-5 text-center font-display text-[clamp(1.9rem,4.2vw,2.9rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-brand-cream">
              Five ways our AI works for you.
            </h2>
          </Reveal>
          <WaysToggle ways={WAYS} />
        </div>
      </section>

      {/* ── 5. TYPE OF AI AGENTS ── */}
      <section className="relative border-t border-white/10">
        <div className="mx-auto w-full max-w-[1100px] px-6 py-16 sm:py-20">
          <Reveal>
            <div className="flex justify-center">
              <Eyebrow center>The agents we deploy</Eyebrow>
            </div>
            <h2 className="mt-5 text-center font-display text-[clamp(1.9rem,4.2vw,2.9rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-brand-cream">
              A team of AI agents, working together.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {AGENTS.map((a, i) => {
              const Icon = a.Icon;
              return (
                <Reveal key={a.name} delay={i * 70}>
                  <div className="group flex h-full items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/40">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-gold/10">
                      <Icon className="h-5 w-5 text-brand-warmgold" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold leading-snug text-brand-cream">
                        {a.name}
                      </h3>
                      <p className="mt-1 text-sm leading-[1.55] text-brand-cream/65">{a.line}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. CLOSE — Michigan + Book a Call ── */}
      <section className="relative isolate overflow-hidden border-t border-white/10">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 grow-dotgrid opacity-50 [mask-image:radial-gradient(ellipse_at_50%_50%,#000,transparent_72%)]" />
          <div className="absolute left-1/2 top-1/2 h-[420px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,169,97,0.16),transparent_70%)] blur-2xl" />
        </div>
        <div className="relative mx-auto w-full max-w-[680px] px-6 py-24 text-center sm:py-28">
          <Reveal>
            <h2 className="text-balance font-display text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-brand-cream">
              An AI company you can actually hire.
            </h2>
            <p className="mx-auto mt-5 max-w-[46ch] text-lg leading-[1.6] text-brand-cream/75">
              Proudly Michigan. Tell us about your business and we&rsquo;ll show you what to automate
              first.
            </p>
            <div className="mt-9 flex justify-center">
              <CtaButton />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 7. FOOTER (minimal, legal only — no CTA) ── */}
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
