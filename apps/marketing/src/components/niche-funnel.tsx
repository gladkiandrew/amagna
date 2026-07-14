import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { RiverCanvas } from '@/components/sections/river-canvas';
import { StepMark } from '@/components/sections/second-brain-steps';
import { FaqSection } from '@/components/sections/faq-section';
import { BOOK_A_CALL_HREF, AUDIT_HREF, SITE } from '@/lib/site';
import type { LanePoint, NicheContent } from '@/lib/niches';
import { getPublishedPosts } from '@/lib/sapt-blog';

type NicheFunnelProps = {
  content: NicheContent;
};

/** The onboarding flow, restated on every funnel page (Gold Map → delivered). */
const GET_STARTED_STEPS = [
  { n: '2', title: 'Book your call', body: 'We walk the map together and answer everything.' },
  { n: '3', title: 'First monthly payment', body: 'Initial payment kicks off the demo build.' },
  { n: '4', title: 'First revision call', body: 'First demo delivered within 3 business days.' },
  { n: '5', title: 'System delivered', body: 'Autonomous system live within 5 business days.' },
] as const;

/** One lane inside the 02 panel — small-caps label + four diamond-marked points. */
function Lane({ label, points }: { label: string; points: LanePoint[] }): JSX.Element {
  return (
    <div className="rounded-2xl border border-brand-warmgold/20 bg-white/[0.04] p-7 sm:p-8">
      <p className="text-[13px] font-semibold uppercase tracking-[0.3em] text-brand-warmgold">
        {label}
      </p>
      <ul className="mt-6 space-y-6">
        {points.map((point) => (
          <li key={point.title} className="relative pl-7">
            <span
              aria-hidden
              className="absolute left-0 top-[7px] h-[10px] w-[10px] rotate-45 border border-brand-warmgold bg-brand-deep shadow-[0_0_8px_rgba(212,184,115,0.45)]"
            />
            <h3 className="font-display text-lg font-semibold leading-snug text-brand-cream">
              {point.title}
            </h3>
            <p className="mt-1.5 text-sm leading-[1.65] text-brand-cream/70">{point.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Shared funnel-page layout for every niche — rebuilt (2026-07-14) to the
 * Second Brain positioning and the new homepage design language: dark hero →
 * RiverCanvas body with the numbered-section rhythm (01 their week → 02 the
 * two lanes → 03 how it fits → 04 the Gold Map close), then testimonials
 * placeholder, related posts, and the niche FAQ. All copy/logos come from the
 * NicheContent config so niches never mix assets. Entirely server-rendered,
 * zero client JS. Async: pulls related blog posts by category (degrades
 * gracefully when none exist yet).
 */
export async function NicheFunnel({ content }: NicheFunnelProps): Promise<JSX.Element> {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: content.metaTitle,
    description: content.metaDescription,
    serviceType: 'AI automation and marketing services',
    provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    areaServed: content.areaServed ?? 'US',
    url: `${SITE.url}/${content.slug}`,
  };

  // Breadcrumb: Home › Who We Serve › <niche>. Places the niche hub in the site
  // hierarchy for search + AEO.
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Who We Serve', item: `${SITE.url}/who-we-serve` },
      { '@type': 'ListItem', position: 3, name: content.eyebrow, item: `${SITE.url}/${content.slug}` },
    ],
  };

  // Related posts, filtered by this niche's category (case-insensitive
  // contains). getPublishedPosts never throws and falls back; we just take the
  // two newest matches and hide the section if there are none yet.
  const { posts } = await getPublishedPosts();
  const cat = content.category.toLowerCase();
  const related = posts.filter((p) => p.category.toLowerCase().includes(cat)).slice(0, 2);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, breadcrumbSchema]) }}
      />

      {/* ── HERO — dark water, same family as the homepage ocean. The base is
             #071221 (the ocean's bottom-row navy) so the RiverCanvas seam below
             dissolves from exactly this color into the cream. ── */}
      <section className="relative isolate overflow-hidden bg-[#071221] text-brand-cream">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-30%] h-[80%] w-[120%] -translate-x-1/2 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(93,46,140,0.35),transparent_70%)]" />
          <div className="absolute right-[-10%] top-[30%] h-[70%] w-[60%] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(201,169,97,0.14),transparent_70%)]" />
        </div>
        <div className="mx-auto w-full max-w-[1200px] px-6 pb-20 pt-24 sm:pb-28 sm:pt-32">
          <p className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.3em] text-brand-warmgold">
            <span aria-hidden className="h-px w-7 bg-brand-warmgold/60" />
            {content.eyebrow}
          </p>
          <h1 className="mt-6 max-w-[16ch] text-balance font-display text-[clamp(2.4rem,5.4vw,4.2rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
            {content.heroHeadline}
          </h1>
          <p className="mt-6 max-w-[58ch] text-lg leading-[1.65] text-brand-cream/80">
            {content.heroSub}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Link
              href={AUDIT_HREF}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-warmgold px-8 py-4 text-sm font-semibold text-brand-deep transition-colors hover:bg-brand-warmgold/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cream focus-visible:ring-offset-2 focus-visible:ring-offset-[#071221]"
            >
              Get Your Gold Map
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href={BOOK_A_CALL_HREF}
              className="rounded-full border border-brand-cream/30 px-7 py-4 text-sm font-medium text-brand-cream transition-colors hover:border-brand-warmgold/60 hover:text-brand-warmgold"
            >
              Book a 20-minute call
            </Link>
          </div>
        </div>
      </section>

      <RiverCanvas seam>
        <div className="mx-auto w-full max-w-[1200px] px-6">
          {/* ── 01 · THEIR WEEK — the operational reality the brain absorbs ── */}
          <section aria-labelledby="niche-reality-title" className="pb-16 pt-14 sm:pb-24 sm:pt-16">
            <StepMark n="01" eyebrow="Your world" />
            <h2
              id="niche-reality-title"
              className="mt-6 max-w-[18ch] text-balance font-display text-[clamp(2.2rem,4.6vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-brand-charcoal"
            >
              {content.realityHeading}
            </h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {content.reality.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-brand-gold/25 bg-white p-7 shadow-[0_1px_30px_-16px_rgba(93,46,140,0.35)]"
                >
                  <h3 className="font-display text-xl font-semibold leading-snug text-brand-charcoal">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 leading-[1.65] text-brand-slate">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── 02 · WHAT THE BRAIN RUNS — the two lanes, the centerpiece ── */}
          <section aria-labelledby="niche-runs-title" className="py-8 sm:py-12">
            <div className="rounded-[2rem] bg-brand-deep px-7 py-14 sm:px-12 sm:py-16 lg:px-16">
              <StepMark n="02" eyebrow="What the brain runs" onDark />
              <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <h2
                  id="niche-runs-title"
                  className="max-w-[16ch] text-balance font-display text-[clamp(2.2rem,4.6vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-brand-cream"
                >
                  {content.runsHeading}
                </h2>
                <p className="max-w-[44ch] text-lg leading-[1.6] text-brand-cream/75 lg:pb-2">
                  {content.runsSub}
                </p>
              </div>
              <div className="mt-11 grid gap-5 lg:grid-cols-2">
                <Lane label="The marketing lane" points={content.marketingLane} />
                <Lane label="The operations lane" points={content.opsLane} />
              </div>
              <p className="mt-9 flex items-start gap-2.5 text-sm leading-relaxed text-brand-cream/55">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-warmgold/70" aria-hidden />
                <span>
                  Every action is logged. Nothing outward-facing ships without your sign-off.
                </span>
              </p>
            </div>
          </section>

          {/* ── 03 · HOW IT FITS — tools + your own AI ── */}
          <section aria-labelledby="niche-fits-title" className="py-16 text-center sm:py-24">
            <StepMark n="03" eyebrow="How it fits" center />
            <h2
              id="niche-fits-title"
              className="mx-auto mt-6 max-w-[20ch] text-balance font-display text-[clamp(2.2rem,4.6vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-brand-charcoal"
            >
              Plugs into what you already run.
            </h2>
            <p className="mx-auto mt-5 max-w-[56ch] text-lg leading-[1.65] text-brand-slate">
              {content.integrationsNote}
            </p>
            <ul className="mx-auto mt-11 flex max-w-[760px] flex-wrap items-center justify-center gap-x-12 gap-y-7">
              {content.integrations.map((logo) => (
                <li key={logo.alt} className="relative h-8 w-28">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain grayscale transition-[filter] duration-300 hover:grayscale-0"
                  />
                </li>
              ))}
            </ul>
            <div className="mx-auto mt-12 max-w-[720px] rounded-2xl border border-brand-purple/25 bg-brand-purple/[0.06] px-7 py-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-purple">
                Runs with your AI
              </p>
              <p className="mx-auto mt-3 max-w-[52ch] leading-[1.65] text-brand-charcoal">
                We connect your Second Brain to the AI you already use — Claude, ChatGPT, or Gemini
                — so you can check status and give direction straight from your own AI. No new
                dashboard to learn.
              </p>
            </div>
          </section>

          {/* ── 04 · HOW YOU START — the Gold Map close ── */}
          <section aria-labelledby="niche-start-title" className="pb-20 pt-6 sm:pb-24 sm:pt-8">
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#2A1650] via-brand-purple/90 to-brand-deep px-7 py-14 sm:px-12 sm:py-16 lg:px-16">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_10%,rgba(212,184,115,0.14),transparent_60%)]"
              />
              <div className="relative">
                <StepMark n="04" eyebrow="How you start" onDark />
                <h2
                  id="niche-start-title"
                  className="mt-6 max-w-[16ch] text-balance font-display text-[clamp(2.2rem,4.6vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-brand-cream"
                >
                  It starts with your Gold Map.
                </h2>
                <p className="mt-5 max-w-[54ch] text-lg leading-[1.6] text-brand-cream/80">
                  {content.ctaSub}
                </p>

                <div className="mt-11 grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-start">
                  {/* Step 1 — Gold Map, the prominent step */}
                  <div className="rounded-2xl border border-brand-warmgold/50 bg-white/[0.05] p-8">
                    <span className="inline-flex items-center gap-2 rounded-full bg-brand-warmgold/15 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-warmgold">
                      Step 1 · Start here
                    </span>
                    <h3 className="mt-5 font-display text-2xl font-semibold tracking-[-0.01em] text-brand-cream">
                      Chart your Gold Map
                    </h3>
                    <p className="mt-3 leading-[1.65] text-brand-cream/75">
                      The most important step — and it&apos;s free. A custom plan that preps
                      everything and makes the build sharper: the better your map, the better the
                      brain we build on top of it. You leave with a real plan either way.
                    </p>
                    <Link
                      href={AUDIT_HREF}
                      className="mt-7 inline-flex items-center gap-1.5 rounded-full bg-brand-warmgold px-8 py-4 text-sm font-semibold text-brand-deep transition-colors hover:bg-brand-warmgold/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cream focus-visible:ring-offset-2 focus-visible:ring-offset-brand-purple"
                    >
                      Get Your Gold Map
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>

                  {/* Steps 2–5 — the rest of the flow */}
                  <ol className="grid gap-3">
                    {GET_STARTED_STEPS.map((step) => (
                      <li
                        key={step.n}
                        className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-warmgold/40 bg-brand-warmgold/10 text-sm font-semibold text-brand-warmgold">
                          {step.n}
                        </span>
                        <span>
                          <strong className="block font-semibold text-brand-cream">
                            {step.title}
                          </strong>
                          <span className="mt-0.5 block text-sm leading-relaxed text-brand-cream/65">
                            {step.body}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Testimonials — placeholder slot (real quotes only, added by Andrew). */}
        <section className="mx-auto w-full max-w-[820px] px-6 pb-6 pt-2 text-center sm:pb-10">
          <p className="flex items-center justify-center gap-3 text-[13px] font-semibold uppercase tracking-[0.3em] text-brand-gold">
            <span aria-hidden className="h-px w-7 bg-brand-gold/60" />
            In their words
            <span aria-hidden className="h-px w-7 bg-brand-gold/60" />
          </p>
          <h2 className="mt-5 text-balance font-display text-[clamp(1.7rem,3.4vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-brand-charcoal">
            Operator stories, coming soon.
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] leading-[1.65] text-brand-slate">
            We&apos;re collecting results from the operators in this lane. Real quotes only —
            we&apos;ll add them here as they come in.
          </p>
        </section>

        {/* Related blog posts — by category; hidden until posts exist. */}
        {related.length > 0 && (
          <section className="mx-auto w-full max-w-[1200px] px-6 py-14 sm:py-16">
            <p className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.3em] text-brand-gold">
              <span aria-hidden className="h-px w-7 bg-brand-gold/60" />
              Field notes
            </p>
            <h2 className="mt-5 text-balance font-display text-[clamp(1.7rem,3.4vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-brand-charcoal">
              Worth a read for your lane.
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {related.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-2xl border border-brand-gold/25 bg-white p-7 shadow-[0_1px_30px_-16px_rgba(93,46,140,0.35)] transition-transform duration-300 hover:-translate-y-1"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-gold">
                    {post.category}
                    {/* Visible publish date intentionally omitted (2026-07-08). */}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-brand-charcoal">
                    {post.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-[1.65] text-brand-slate">
                    {post.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-purple">
                    Read
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Niche-local FAQ — visible Q&A + FAQPage JSON-LD (local SEO + AEO). */}
        {content.faqs && content.faqs.length > 0 && (
          <FaqSection heading="Questions operators ask" faqs={content.faqs} />
        )}
      </RiverCanvas>
    </>
  );
}
