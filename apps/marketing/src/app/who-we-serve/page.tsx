import type { Metadata } from 'next';
import Link from 'next/link';
import { Cinzel } from 'next/font/google';
import { ArrowRight } from 'lucide-react';
import { StepMark } from '@/components/sections/second-brain-steps';
import { AUDIT_HREF, OG_IMAGE, SITE } from '@/lib/site';
import { CrossingCanvas } from './crossing-canvas';
import { ServeBrain } from './serve-brain';
import { WiredIn } from './wired-in';

const DESCRIPTION =
  'Who is a Second Brain for? Any business that runs on customers. We go deepest in home services, real estate, medical offices, ecommerce, multi-location businesses, and custom AI installs — and adapt to almost any operator.';

export const metadata: Metadata = {
  title: 'Who We Serve',
  description: DESCRIPTION,
  alternates: { canonical: '/who-we-serve' },
  openGraph: {
    title: 'Who We Serve — Amagna AI',
    description: DESCRIPTION,
    type: 'website',
    url: '/who-we-serve',
    images: [OG_IMAGE],
  },
};

// Cinzel (Roman-inscription face) for the lane numerals — the "engraved"
// thread that runs through the brand. Self-hosted, lazy (never on the LCP path).
const cinzel = Cinzel({ subsets: ['latin'], display: 'swap', preload: false });

type Lane = {
  href: string;
  numeral: string;
  name: string;
  hook: string;
  chips: string[];
  /** Custom Installs breaks the gold rhythm with the brand purple. */
  accent?: 'purple';
};

/**
 * /who-we-serve — the chart of lanes. Six industries; five link to dedicated
 * landing funnels (also paid-ad targets), the sixth is Custom AI Installs.
 * Rendered as full-width lane rows, each with its own current flowing
 * through it — the horizontal-river identity of this page.
 */
const LANES: readonly Lane[] = [
  {
    href: '/home-services',
    numeral: 'I',
    name: 'Home Services',
    hook: 'Predictable, owned leads for your service area.',
    chips: ['Local lead funnels', 'GBP + reviews on autopilot', 'Instant lead follow-up'],
  },
  {
    href: '/real-estate',
    numeral: 'II',
    name: 'Real Estate',
    hook: 'Top of mind with your whole sphere, 24/7.',
    chips: ['Content in your voice', 'Listing lead funnels', 'Agents, teams & owners'],
  },
  {
    href: '/medical-offices',
    numeral: 'III',
    name: 'Medical Offices',
    hook: 'Patient acquisition, handled compliantly.',
    chips: ['Compliant campaigns', 'Reviews + reminders', 'Human-approved messaging'],
  },
  {
    href: '/ecommerce-brands',
    numeral: 'IV',
    name: 'Ecommerce Brands',
    hook: 'Always-on creative and managed paid acquisition.',
    chips: ['Meta, TikTok & Snapchat creative', 'Managed paid acquisition', 'Email & SMS flows'],
  },
  {
    href: '/multi-location',
    numeral: 'V',
    name: 'Multi-Location',
    hook: 'One central brain. Every location on-brand.',
    chips: ['Central brand, local execution', 'Listings + reviews everywhere', 'One roll-up report'],
  },
  {
    href: '/custom-ai-installs',
    numeral: 'VI',
    name: 'Custom AI Installs',
    hook: 'Bespoke, full-stack AI — installed in person.',
    chips: ['On-site discovery', 'Marketing, ops & retention', 'Your data stays yours'],
    accent: 'purple',
  },
] as const;

/** The 2030 thesis — three stops on the horizontal current. */
const THESIS_STOPS = [
  {
    when: 'Now',
    what: 'Early operators install theirs — and the learning clock starts.',
  },
  {
    when: 'The gap',
    what: 'Their system compounds context for years while everyone else starts from zero.',
  },
  {
    when: '2030',
    what: 'Owning one isn’t the edge anymore. How long yours has been learning is.',
  },
] as const;

/** Plain-English explainer cards for the wired-in frame. */
const WIRE_CARDS = [
  {
    title: 'The key — API',
    body: 'Almost every serious tool ships an API: a key that lets trusted software read and write on your behalf. Your CRM, your calendar, your books — they all have one.',
  },
  {
    title: 'The socket — MCP',
    body: 'MCP is the newer standard built for AI. It lets your Second Brain operate a tool directly — not just pull data out of it, but actually use it.',
  },
  {
    title: 'The rule',
    body: 'If a tool you run has either, we can wire it into the vault: read it, write to it, automate it. No rip-and-replace. No new software to learn.',
  },
] as const;

const WIRE_CATEGORIES =
  'CRMs · Calendars · Phone systems · Invoicing · Storefronts · Ad accounts · Inboxes · Booking tools';

function LaneRow({ lane, index }: { lane: Lane; index: number }): JSX.Element {
  const numeralTone =
    lane.accent === 'purple'
      ? 'text-brand-purple/70 group-hover:text-brand-purple'
      : 'text-brand-gold/70 group-hover:text-brand-gold';
  return (
    <Link
      href={lane.href}
      className="group relative block overflow-hidden border-t border-brand-gold/25 transition-colors duration-300 last:border-b hover:bg-white/70 focus-visible:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-purple"
    >
      {/* the lane's own current — always drifting, brightens under the pointer */}
      <div
        aria-hidden
        className="lane-current opacity-40 transition-opacity duration-500 group-hover:opacity-100"
        style={
          {
            '--lane-dur': `${7 + (index % 3)}s`,
            '--lane-delay': `${index * -2.3}s`,
          } as React.CSSProperties
        }
      />
      <div className="relative mx-auto grid w-full max-w-[1100px] items-center gap-x-8 gap-y-3 px-6 py-7 sm:py-9 lg:grid-cols-[72px_minmax(0,1.05fr)_minmax(0,1fr)_44px]">
        <span
          aria-hidden
          className={`${cinzel.className} text-2xl font-bold transition-colors duration-300 sm:text-3xl ${numeralTone}`}
        >
          {lane.numeral}
        </span>
        <div>
          <h3 className="font-display text-[1.55rem] font-semibold leading-[1.08] tracking-[-0.015em] text-brand-charcoal sm:text-[1.9rem]">
            {lane.name}
          </h3>
          <p className="mt-1.5 leading-[1.55] text-brand-slate">{lane.hook}</p>
        </div>
        <ul className="flex flex-wrap gap-2">
          {lane.chips.map((chip) => (
            <li
              key={chip}
              className={`rounded-full border bg-white px-3.5 py-1.5 text-xs font-medium text-brand-slate ${
                lane.accent === 'purple' ? 'border-brand-purple/25' : 'border-brand-gold/30'
              }`}
            >
              {chip}
            </li>
          ))}
        </ul>
        <span
          aria-hidden
          className="hidden h-11 w-11 items-center justify-center rounded-full border border-brand-gold/40 text-brand-gold transition-all duration-300 ease-voyage group-hover:border-brand-gold group-hover:bg-brand-gold/10 lg:flex"
        >
          <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 ease-voyage group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

export default function WhoWeServePage(): JSX.Element {
  // Breadcrumb + the six lanes as an ItemList — the hub's structure, machine-readable.
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Who We Serve', item: `${SITE.url}/who-we-serve` },
    ],
  };
  const lanesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Industries Amagna AI serves',
    itemListElement: LANES.map((lane, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: lane.name,
      url: `${SITE.url}${lane.href}`,
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, lanesSchema]) }}
      />

      {/* ── HERO — dark water, headline west / the brain east. Base is #071221
             (the ocean's bottom-row navy) so the crossing seam below dissolves
             from exactly this color into the cream. ── */}
      <section className="relative isolate overflow-hidden bg-[#071221] text-brand-cream">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-30%] h-[80%] w-[120%] -translate-x-1/2 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(93,46,140,0.35),transparent_70%)]" />
          <div className="absolute right-[-10%] top-[30%] h-[70%] w-[60%] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(201,169,97,0.14),transparent_70%)]" />
          {/* a first taste of the crossing — two quiet horizontal currents */}
          <div
            className="river-streak-x river-streak-x--gold"
            style={{ left: '6%', top: '24%', '--river-peak': 0.3, '--river-dur': '9s', '--river-delay': '-3s' } as React.CSSProperties}
          />
          <div
            className="river-streak-x river-streak-x--purple"
            style={{ left: '30%', top: '78%', '--river-peak': 0.35, '--river-dur': '8s', '--river-delay': '-6s', '--riverx-w': '44vw' } as React.CSSProperties}
          />
        </div>
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-x-10 gap-y-12 px-6 pb-16 pt-24 sm:pt-28 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1fr)] lg:pb-24">
          <div>
            <p className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.3em] text-brand-warmgold">
              <span aria-hidden className="h-px w-7 bg-brand-warmgold/60" />
              Who We Serve
            </p>
            <h1 className="mt-6 max-w-[14ch] text-balance font-display text-[clamp(2.5rem,5.6vw,4.3rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
              Any business that runs on customers.
            </h1>
            <p className="mt-6 max-w-[52ch] text-lg leading-[1.65] text-brand-cream/80">
              One Second Brain, tuned to your lane. We install the vault and the agents, wire them
              into how your industry actually works — and the system runs your growth while you run
              the business.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link
                href={AUDIT_HREF}
                className="inline-flex items-center gap-1.5 rounded-full bg-brand-warmgold px-8 py-4 text-sm font-semibold text-brand-deep transition-colors hover:bg-brand-warmgold/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cream focus-visible:ring-offset-2 focus-visible:ring-offset-[#071221]"
              >
                Get Your Gold Map
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <a
                href="#lanes"
                className="rounded-full border border-brand-cream/30 px-7 py-4 text-sm font-medium text-brand-cream transition-colors hover:border-brand-warmgold/60 hover:text-brand-warmgold"
              >
                See the six lanes
              </a>
            </div>
          </div>
          <ServeBrain />
        </div>
      </section>

      <CrossingCanvas seam>
        {/* ── 01 · THE THESIS — second brains are coming for every industry ── */}
        <section
          aria-labelledby="thesis-title"
          className="mx-auto w-full max-w-[1100px] px-6 pb-24 pt-14 text-center sm:pb-32 sm:pt-16"
        >
          <StepMark n="01" eyebrow="The thesis" center />
          <h2
            id="thesis-title"
            className="mx-auto mt-6 max-w-[18ch] text-balance font-display text-[clamp(2.3rem,5vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-brand-charcoal"
          >
            By 2030, every serious business will run one.
          </h2>
          <p className="mx-auto mt-7 max-w-[58ch] text-lg leading-[1.65] text-brand-slate sm:text-xl">
            A Second Brain isn&apos;t a niche tool — it&apos;s the next piece of standard
            infrastructure. The website in 2005. The smartphone in 2012. One vault that holds
            everything your business knows, with agents that act on it. And because it learns your
            business as it works, the operators who install one now will be years ahead of the ones
            who wait.
          </p>

          {/* three stops on the horizontal current */}
          <div className="relative mx-auto mt-16 max-w-[920px]">
            <div aria-hidden className="gold-seam absolute inset-x-8 top-[5px] hidden sm:block" />
            <ol className="grid gap-10 sm:grid-cols-3 sm:gap-6">
              {THESIS_STOPS.map((stop) => (
                <li key={stop.when} className="relative flex flex-col items-center">
                  <span
                    aria-hidden
                    className="h-3 w-3 rotate-45 border border-brand-gold bg-brand-cream shadow-[0_0_12px_rgba(201,169,97,0.5)]"
                  />
                  <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-gold">
                    {stop.when}
                  </p>
                  <p className="mt-2 max-w-[26ch] text-balance leading-[1.55] text-brand-charcoal">
                    {stop.what}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <p className="mx-auto mt-14 max-w-[34ch] text-balance font-display text-xl font-semibold italic leading-snug text-brand-purple sm:text-2xl">
            You can&apos;t buy back the learning years. You can start them today.
          </p>
        </section>

        {/* ── 02 · THE SIX LANES — where we go deepest ── */}
        <section aria-labelledby="lanes-title" id="lanes" className="scroll-mt-24 pb-24 sm:pb-32">
          <div className="mx-auto w-full max-w-[1100px] px-6 pb-10">
            <StepMark n="02" eyebrow="The six lanes" />
            <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <h2
                id="lanes-title"
                className="max-w-[14ch] text-balance font-display text-[clamp(2.2rem,4.6vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-brand-charcoal"
              >
                Where we go deepest.
              </h2>
              <p className="max-w-[42ch] text-lg leading-[1.6] text-brand-slate lg:pb-2">
                Six lanes with dedicated funnels, playbooks, and tuning. Not on the chart? The
                system adapts — that&apos;s the point.
              </p>
            </div>
          </div>
          <div>
            {LANES.map((lane, i) => (
              <LaneRow key={lane.href} lane={lane} index={i} />
            ))}
          </div>
        </section>

        {/* ── 03 · WIRED IN — if it has a key or an MCP, we can automate it ── */}
        <section aria-labelledby="wired-title" className="mx-auto w-full max-w-[1200px] px-6 pb-16 sm:pb-20">
          <div className="rounded-[2rem] bg-brand-deep px-6 py-14 sm:px-12 sm:py-16 lg:px-16">
            <StepMark n="03" eyebrow="Works with your stack" onDark />
            <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <h2
                id="wired-title"
                className="max-w-[17ch] text-balance font-display text-[clamp(2.1rem,4.4vw,3.2rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-brand-cream"
              >
                If it has a key or an MCP, we can automate it.
              </h2>
              <p className="max-w-[42ch] text-lg leading-[1.6] text-brand-cream/75 lg:pb-2">
                Your Second Brain doesn&apos;t replace the tools you run. It plugs into them and
                puts them to work.
              </p>
            </div>

            <div className="mt-12">
              <WiredIn />
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {WIRE_CARDS.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-brand-warmgold/20 bg-white/[0.04] p-6"
                >
                  <h3 className="font-display text-lg font-semibold text-brand-cream">
                    {card.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-[1.65] text-brand-cream/70">{card.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-col gap-2 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-warmgold/80">
                {WIRE_CATEGORIES}
              </p>
              <p className="text-sm text-brand-cream/55">
                Don&apos;t see yours? If it has a key, it qualifies.
              </p>
            </div>
          </div>
        </section>

        {/* ── 04 · THE GOLD MAP — the close ── */}
        <section aria-labelledby="map-title" className="mx-auto w-full max-w-[1200px] px-6 pb-24 sm:pb-32">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#2A1650] via-brand-purple/90 to-brand-deep px-6 py-14 sm:px-12 sm:py-16 lg:px-16">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_10%,rgba(212,184,115,0.14),transparent_60%)]"
            />
            {/* one warmgold current crossing the panel */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
              <div
                className="river-streak-x river-streak-x--gold"
                style={{ left: '10%', top: '18%', '--river-peak': 0.4, '--river-dur': '8.5s', '--river-delay': '-4s' } as React.CSSProperties}
              />
            </div>
            <div className="relative">
              <StepMark n="04" eyebrow="How you start" onDark />
              <h2
                id="map-title"
                className="mt-6 max-w-[16ch] text-balance font-display text-[clamp(2.2rem,4.6vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-brand-cream"
              >
                Not sure which lane is yours?
              </h2>
              <p className="mt-5 max-w-[54ch] text-lg leading-[1.6] text-brand-cream/80">
                Chart your Gold Map — a free, custom growth plan for your business. It preps
                everything: where you stand, what to build first, and what it should return. On
                screen and in your inbox, yours to keep either way.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Link
                  href={AUDIT_HREF}
                  className="inline-flex items-center gap-1.5 rounded-full bg-brand-warmgold px-8 py-4 text-sm font-semibold text-brand-deep transition-colors hover:bg-brand-warmgold/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cream focus-visible:ring-offset-2 focus-visible:ring-offset-brand-purple"
                >
                  Chart Your Gold Map
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <p className="text-sm text-brand-cream/60">Free. No card. About three minutes.</p>
              </div>
            </div>
          </div>
        </section>
      </CrossingCanvas>
    </main>
  );
}
