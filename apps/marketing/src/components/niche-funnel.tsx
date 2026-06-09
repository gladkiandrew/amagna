import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CtaBand } from '@/components/sections/cta-band';
import { BOOK_A_CALL_HREF, AUDIT_HREF, SITE } from '@/lib/site';
import type { NicheContent } from '@/lib/niches';
import { getPublishedPosts } from '@/lib/sapt-blog';
import { formatPostDate } from '@/lib/blog-types';

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

/**
 * Shared funnel-page layout for every niche. Frame order (run 8): hero →
 * What We Built → How to Get Started → plug-into-your-AI → tools → testimonials
 * → related posts. Pain-points frame removed. All copy/logos come from the
 * NicheContent config so niches never mix assets. Async: pulls related blog
 * posts by category (degrades gracefully when none exist yet).
 */
export async function NicheFunnel({ content }: NicheFunnelProps): Promise<JSX.Element> {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: content.metaTitle,
    description: content.metaDescription,
    serviceType: 'Marketing services',
    provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    areaServed: 'US',
    url: `${SITE.url}/${content.slug}`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {/* Hero */}
      <section className="mx-auto w-full max-w-[1100px] px-6 py-20 sm:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-antique-gold">
          {content.eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl">
          {content.heroHeadline}
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">{content.heroSub}</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href={AUDIT_HREF}
            className="rounded-full bg-royal-purple px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-royal-purple/90"
          >
            Get Your Gold Map
          </Link>
          <Link
            href={BOOK_A_CALL_HREF}
            className="rounded-full border border-royal-purple bg-transparent px-6 py-3 text-sm font-medium text-royal-purple transition-colors hover:bg-royal-purple/5"
          >
            Book a 20-minute call
          </Link>
        </div>
      </section>

      {/* What We Built — now the first frame below the hero */}
      <section className="border-t border-black/5 bg-white">
        <div className="mx-auto w-full max-w-[1100px] px-6 py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-antique-gold">
            What We Built
          </p>
          <h2 className="mt-3 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {content.systemHeading}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
            {content.systemSub}
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {content.systemPoints.map((point, i) => (
              <div key={point.title} className="flex gap-4">
                <span className="font-mono text-sm font-medium text-antique-gold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-ink">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{point.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Get Started — the onboarding flow, Gold Map front and center */}
      <section className="border-t border-black/5">
        <div className="mx-auto w-full max-w-[1100px] px-6 py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-antique-gold">
            How to get started
          </p>
          <h2 className="mt-3 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            It starts with your Gold Map.
          </h2>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-start">
            {/* Step 1 — Gold Map, the prominent step */}
            <div className="rounded-2xl border-2 border-antique-gold bg-white p-8 shadow-sm">
              <span className="inline-flex items-center gap-2 rounded-full bg-antique-gold/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-antique-gold">
                Step 1 · Start here
              </span>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-ink">
                Chart your Gold Map
              </h3>
              <p className="mt-3 text-base leading-relaxed text-ink-muted">
                This is the most important step — and it is free. The Gold Map is a custom plan
                that preps everything and makes the build sharper: the better your map, the better
                the system we build on top of it. You leave with a real plan either way.
              </p>
              <Link
                href={AUDIT_HREF}
                className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-royal-purple px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-royal-purple/90"
              >
                Get Your Gold Map
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            {/* Steps 2–5 — the rest of the flow */}
            <ol className="grid gap-3">
              {GET_STARTED_STEPS.map((step) => (
                <li
                  key={step.n}
                  className="flex gap-4 rounded-xl border border-black/5 bg-white px-5 py-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream font-semibold text-ink">
                    {step.n}
                  </span>
                  <span>
                    <strong className="block font-semibold text-ink">{step.title}</strong>
                    <span className="mt-0.5 block text-sm leading-relaxed text-ink-muted">
                      {step.body}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Plug it into the AI you already use — key differentiator */}
      <section className="border-t border-black/5 bg-white">
        <div className="mx-auto w-full max-w-[1100px] px-6 py-16">
          <div className="rounded-3xl bg-royal-purple px-8 py-12 text-center sm:px-12">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-dark-mode-gold">
              Runs with your AI
            </p>
            <h2 className="mx-auto mt-3 max-w-3xl text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Plug it into the AI you already use.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/80">
              We connect your Autonomous Marketing System to the AI you already use — Claude,
              ChatGPT, or Gemini — so you can check status and give updates straight from your own
              AI. No new dashboard to learn.
            </p>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="border-t border-black/5">
        <div className="mx-auto w-full max-w-[1100px] px-6 py-20">
          <h2 className="max-w-2xl text-balance text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Works with the tools you already run on
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
            {content.integrationsNote}
          </p>
          <ul className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-6">
            {content.integrations.map((logo) => (
              <li key={logo.alt} className="relative h-8 w-28">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain object-left grayscale"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonials — placeholder slot (real quotes only, added by Andrew). */}
      <section className="border-t border-black/5 bg-white">
        <div className="mx-auto w-full max-w-[1100px] px-6 py-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-antique-gold">
            In their words
          </p>
          <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Operator stories, coming soon.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">
            We&apos;re collecting results from the operators in this lane. Real quotes only —
            we&apos;ll add them here as they come in.
          </p>
        </div>
      </section>

      {/* Related blog posts — by category; hidden until posts exist. */}
      {related.length > 0 && (
        <section className="border-t border-black/5">
          <div className="mx-auto w-full max-w-[1100px] px-6 py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-antique-gold">
              Field notes
            </p>
            <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Worth a read for your lane.
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {related.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-2xl border border-black/5 bg-white p-6 transition-transform duration-300 hover:-translate-y-1"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-antique-gold">
                    {post.category}
                    {post.publishedAt ? ` · ${formatPostDate(post.publishedAt)}` : ''}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold leading-snug text-ink">{post.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{post.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-royal-purple">
                    Read
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand heading={content.ctaHeading} subheading={content.ctaSub} />
    </>
  );
}
