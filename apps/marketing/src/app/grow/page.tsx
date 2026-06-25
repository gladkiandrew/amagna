import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play } from 'lucide-react';
import { CALCOM_DIRECT_URL } from '@/lib/site';
import { Reveal } from './reveal';
import './grow.css';

/**
 * /grow — paid Meta-ad landing page (COLD traffic → Book a Call).
 *
 * Standalone funnel: the global SiteHeader/SiteFooter are suppressed for this
 * route (see components/chrome-gate.tsx) and replaced by minimal in-page chrome.
 * Every CTA points at Cal.com (CALCOM_DIRECT_URL). Nothing links to other site
 * pages except the logo (→ "/") and the legal footer links. noindex; not in
 * sitemap.ts.
 */

// ── Founder video: drop the file/URL here when ready. Empty string ('') renders
//    the styled placeholder (centered gold play icon). Defaults to the existing
//    founder asset (same one used on /about); set to '' to show the placeholder.
const FOUNDER_VIDEO = '/brand/founder.mp4';
const FOUNDER_POSTER = '/brand/founder-poster.jpg';

const DESCRIPTION =
  'A Michigan team of AI specialists who build and run the systems behind your marketing and automations. Book a call.';

export const metadata: Metadata = {
  // Absolute title bypasses the root layout's "%s · Amagna AI" template.
  title: { absolute: 'The AI Company You Can Actually Hire | Amagna AI' },
  description: DESCRIPTION,
  alternates: { canonical: '/grow' },
  robots: { index: false, follow: true },
};

const PROBLEMS = [
  {
    pain: 'I know AI matters — I just don’t know where to start.',
    fix: 'Everyone’s selling AI. We tell you the two moves that matter for your business.',
  },
  {
    pain: 'My marketing dies every time I get busy.',
    fix: 'The system doesn’t get busy. It runs whether you do or not.',
  },
  {
    pain: 'My tools don’t talk to each other.',
    fix: 'Leads slip through the cracks between apps. We close them.',
  },
] as const;

const BUILDS = [
  {
    name: 'Autonomous Marketing',
    body: 'Ads, content, follow-up. Built and run for you. You approve, we execute.',
  },
  {
    name: 'AI Installs & Integrations',
    body: 'AI dropped into your operations: front desk, booking, follow-up, custom builds. No tech skills needed.',
  },
  {
    name: 'AI Consulting',
    body: 'Not sure what you need? We map where AI actually helps, then build it.',
  },
] as const;

const STEPS = [
  { title: 'Book a call', body: 'Grab a time. 30 seconds.' },
  {
    title: 'Confirm with your Gold Map',
    body: 'A few questions; our AI builds your plan before we talk. That locks your spot.',
  },
  { title: 'We map it on the call', body: 'Walk your plan, decide what to build.' },
  { title: 'We build and run it', body: 'Goes live. We keep it sharp.' },
] as const;

/** The single CTA — always Book a Call → Cal.com. */
function CtaButton({
  label = 'Book a Call',
  block = false,
  size = 'md',
  className = '',
}: {
  label?: string;
  block?: boolean;
  size?: 'md' | 'sm';
  className?: string;
}): JSX.Element {
  const pad = size === 'sm' ? 'px-5 py-2.5' : 'px-7 py-3.5';
  return (
    <a
      href={CALCOM_DIRECT_URL}
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-brand-gold text-sm font-semibold text-brand-deep transition-all hover:bg-brand-warmgold hover:shadow-[0_10px_34px_-10px_rgba(201,169,97,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-warmgold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-deep ${pad} ${
        block ? 'w-full sm:w-auto' : ''
      } ${className}`}
    >
      {label}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
    </a>
  );
}

function Eyebrow({
  children,
  onDark = false,
  center = false,
}: {
  children: React.ReactNode;
  onDark?: boolean;
  center?: boolean;
}): JSX.Element {
  return (
    <p
      className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] ${
        center ? 'justify-center' : ''
      } ${onDark ? 'text-brand-warmgold' : 'text-brand-gold'}`}
    >
      <span aria-hidden className={`h-px w-7 ${onDark ? 'bg-brand-warmgold/60' : 'bg-brand-gold/60'}`} />
      {children}
    </p>
  );
}

/** Founder video slot — YouTube embed, self-hosted MP4, or a gold-play placeholder
 *  when the src is empty. Matches the /about treatment (navy frame, warm border). */
function FounderVideo({ src, poster }: { src: string; poster?: string }): JSX.Element {
  const frame =
    'relative aspect-video w-full overflow-hidden rounded-2xl border border-brand-warmgold/30 bg-brand-deep shadow-[0_1px_50px_-12px_rgba(93,46,140,0.5)]';

  if (!src) {
    return (
      <div className={frame}>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-brand-warmgold/60 bg-brand-warmgold/10">
            <Play className="ml-0.5 h-7 w-7 fill-brand-warmgold text-brand-warmgold" aria-hidden />
          </span>
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-warmgold/80">
            Founder video — coming soon
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
          title="Amagna founder video"
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
    <>
      {/* ── HEADER (minimal) ── */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-deep/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1100px] items-center justify-between px-6 py-4">
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
          <nav className="hidden items-center gap-8 sm:flex" aria-label="Section navigation">
            <a
              href="#what-we-build"
              className="text-sm font-medium text-brand-cream/70 transition-colors hover:text-brand-warmgold"
            >
              What we build
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-brand-cream/70 transition-colors hover:text-brand-warmgold"
            >
              How it works
            </a>
          </nav>
          <CtaButton size="sm" />
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative isolate overflow-hidden bg-brand-deep">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-44 left-1/2 h-[640px] w-[940px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,169,97,0.20),transparent_68%)] blur-2xl" />
          <div className="absolute -bottom-56 left-[6%] h-[440px] w-[560px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(93,46,140,0.45),transparent_70%)] blur-2xl" />
        </div>
        <div className="relative mx-auto flex w-full max-w-[880px] flex-col items-center px-6 py-28 text-center sm:py-36">
          <h1 className="text-balance font-display text-[clamp(2.6rem,7vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-brand-cream motion-safe:animate-[growRiseIn_0.7s_ease-out_both]">
            The AI company you can <span className="text-brand-warmgold">actually</span> hire.
          </h1>
          <p className="mt-7 max-w-[60ch] text-lg leading-[1.6] text-brand-cream/80 motion-safe:animate-[growRiseIn_0.7s_ease-out_0.12s_both] sm:text-xl">
            A Michigan team of AI specialists who build the systems that run your marketing and
            automations — and run them for you.
          </p>
          <div className="mt-10 flex w-full flex-col items-center gap-3 motion-safe:animate-[growRiseIn_0.7s_ease-out_0.24s_both] sm:w-auto sm:flex-row">
            <CtaButton block />
            <a
              href="#how-it-works"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-brand-cream transition-colors hover:border-white/50 hover:bg-white/5 sm:w-auto"
            >
              See how it works
              <span aria-hidden>↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── SOUND FAMILIAR? ── */}
      <section className="border-t border-brand-gold/20 bg-brand-cream">
        <div className="mx-auto w-full max-w-[1100px] px-6 py-20 sm:py-24">
          <Reveal>
            <Eyebrow>Sound familiar?</Eyebrow>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PROBLEMS.map((item, i) => (
              <Reveal key={item.pain} delay={i * 90}>
                <div className="group h-full rounded-2xl border border-brand-gold/30 bg-white p-7 shadow-[0_1px_30px_-12px_rgba(93,46,140,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_-20px_rgba(93,46,140,0.4)]">
                  <p className="font-display text-lg font-semibold leading-snug text-brand-charcoal">
                    “{item.pain}”
                  </p>
                  <p className="mt-4 flex gap-2.5 leading-[1.6] text-brand-slate">
                    <span aria-hidden className="font-semibold text-brand-gold">
                      →
                    </span>
                    <span>{item.fix}</span>
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE BUILD ── */}
      <section id="what-we-build" className="scroll-mt-20 border-t border-brand-gold/20 bg-white">
        <div className="mx-auto w-full max-w-[1100px] px-6 py-20 sm:py-24">
          <Reveal>
            <Eyebrow>What we build</Eyebrow>
            <h2 className="mt-5 max-w-[24ch] text-balance font-display text-[clamp(2rem,4.4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-brand-charcoal">
              Three ways AI starts working for you.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {BUILDS.map((item, i) => (
              <Reveal key={item.name} delay={i * 90}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-brand-gold/30 bg-brand-cream p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_-20px_rgba(93,46,140,0.4)]">
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-brand-gold to-brand-warmgold transition-transform duration-500 group-hover:scale-x-100"
                  />
                  <span
                    aria-hidden
                    className="font-display text-2xl font-semibold leading-none text-brand-gold"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold leading-snug text-brand-charcoal">
                    {item.name}
                  </h3>
                  <p className="mt-3 leading-[1.6] text-brand-slate">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <div className="mt-12 flex flex-col items-start gap-5 rounded-2xl border border-brand-gold/30 bg-brand-cream p-7 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-display text-lg font-semibold text-brand-charcoal">
                Not sure which fits? Book a call — we’ll figure it out.
              </p>
              <CtaButton block className="shrink-0" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── HOW WE ACTUALLY WORK ── */}
      <section id="how-it-works" className="scroll-mt-20 border-t border-brand-gold/20 bg-brand-cream">
        <div className="mx-auto w-full max-w-[1100px] px-6 py-20 sm:py-24">
          <Reveal>
            <Eyebrow>How we actually work</Eyebrow>
            <h2 className="mt-5 max-w-[20ch] text-balance font-display text-[clamp(2rem,4.4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-brand-charcoal">
              Four steps. No mystery.
            </h2>
          </Reveal>

          <div className="relative mt-14">
            {/* desktop connector line behind the step numbers */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-7 hidden h-px bg-gradient-to-r from-brand-gold/0 via-brand-gold/40 to-brand-gold/0 lg:block"
            />
            <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step, i) => (
                <Reveal key={step.title} delay={i * 90}>
                  <li className="relative">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-brand-gold/40 bg-brand-deep font-display text-lg font-semibold text-brand-warmgold shadow-[0_8px_24px_-12px_rgba(26,14,54,0.8)]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-5 font-display text-xl font-semibold leading-snug text-brand-charcoal">
                      {step.title}
                    </h3>
                    <p className="mt-2 leading-[1.6] text-brand-slate">{step.body}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal delay={120}>
            <p className="mt-12 max-w-[60ch] text-balance leading-[1.7] text-brand-slate">
              From one automation to a fully autonomous operation — we scope it to your business.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── WHO THIS IS FOR ── */}
      <section className="relative isolate overflow-hidden border-t border-brand-gold/20 bg-brand-deep">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-[10%] h-[420px] w-[520px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,169,97,0.14),transparent_70%)] blur-2xl"
        />
        <div className="relative mx-auto w-full max-w-[860px] px-6 py-24 text-center sm:py-28">
          <Reveal>
            <Eyebrow onDark center>
              Who this is for
            </Eyebrow>
            <p className="mx-auto mt-8 max-w-[40ch] text-balance font-display text-[clamp(1.6rem,3.4vw,2.4rem)] font-semibold leading-[1.3] tracking-[-0.01em] text-brand-cream">
              For Michigan owners who measure growth in customers, not logins. Local services,
              practices, multi-location teams — people who’d rather hand off the work than learn
              another dashboard.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── FOUNDER VIDEO ── */}
      <section className="border-t border-brand-gold/20 bg-white">
        <div className="mx-auto w-full max-w-[920px] px-6 py-20 sm:py-24">
          <Reveal>
            <Eyebrow>A message from our founder</Eyebrow>
            <div className="mt-8">
              <FounderVideo src={FOUNDER_VIDEO} poster={FOUNDER_POSTER} />
            </div>
            <p className="mt-5 text-sm font-medium text-brand-slate">
              Andrew Gladki, Founder of Amagna AI.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative isolate overflow-hidden border-t border-brand-gold/20 bg-brand-deep">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/2 h-[460px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,169,97,0.18),transparent_70%)] blur-2xl" />
        </div>
        <div className="relative mx-auto w-full max-w-[760px] px-6 py-24 text-center sm:py-32">
          <Reveal>
            <h2 className="text-balance font-display text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-brand-cream">
              Let’s figure out what your business actually needs.
            </h2>
            <p className="mx-auto mt-6 max-w-[44ch] text-lg leading-[1.6] text-brand-cream/80">
              No jargon. No pressure. One honest conversation.
            </p>
            <div className="mt-10 flex justify-center">
              <CtaButton block />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER (minimal) ── */}
      <footer className="border-t border-white/10 bg-brand-deep">
        <div className="mx-auto flex w-full max-w-[1100px] flex-col items-center gap-7 px-6 py-12 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex flex-col items-center gap-3 sm:items-start">
            <Image
              src="/brand/amagna-logo-gold.png"
              alt="Amagna AI"
              width={2276}
              height={492}
              className="h-7 w-auto"
            />
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-cream/60">
              Proudly Michigan.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 sm:items-end">
            <CtaButton size="sm" />
            <div className="flex items-center gap-4 text-xs text-brand-cream/50">
              <Link href="/privacy" className="transition-colors hover:text-brand-warmgold">
                Privacy
              </Link>
              <span aria-hidden>·</span>
              <Link href="/terms" className="transition-colors hover:text-brand-warmgold">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
