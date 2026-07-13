import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { OG_IMAGE, AUDIT_HREF } from '@/lib/site';
import { CtaBand } from '@/components/sections/cta-band';
import { FieldNotesSection } from '@/components/sections/field-notes-section';
import { CREW } from '@/lib/crew';

const ABOUT_DESCRIPTION =
  'Amagna AI is an AI automation company — we install the systems that run marketing, outreach, reporting, and operations, so the owner does not have to. The crew, the founder, and the promise behind the name.';

export const metadata: Metadata = {
  title: 'Our Story',
  description: ABOUT_DESCRIPTION,
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'Our Story — Amagna AI',
    description: ABOUT_DESCRIPTION,
    type: 'website',
    url: '/about',
    images: [OG_IMAGE],
  },
};

/**
 * ── FOUNDER VIDEO ───────────────────────────────────────────────────────────
 * Andrew: paste the link here when the video is ready. It accepts either a
 * YouTube link (any format) OR a self-hosted MP4 path (e.g. '/brand/founder.mp4').
 * Leave it as '' to show the styled placeholder slot. No layout code to touch.
 */
const FOUNDER_VIDEO = '/brand/founder.mp4';
const FOUNDER_POSTER = '/brand/founder-poster.jpg';

const LINEAGE = [
  { term: 'Magna Carta', gloss: 'the 1215 charter that bound power to a set of rules' },
  { term: 'Magnanimous', gloss: 'magnus + animus — “great soul,” the ideal character' },
  { term: 'Magnate', gloss: 'a great person, a leader in industry' },
] as const;

const captain = CREW.find((m) => m.captain)!;
const crewmates = CREW.filter((m) => !m.captain);

function Eyebrow({ children, onDark = false }: { children: React.ReactNode; onDark?: boolean }): JSX.Element {
  return (
    <p
      className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] ${
        onDark ? 'text-brand-warmgold' : 'text-brand-gold'
      }`}
    >
      <span aria-hidden className={`h-px w-7 ${onDark ? 'bg-brand-warmgold/60' : 'bg-brand-gold/60'}`} />
      {children}
    </p>
  );
}

/** Founder video slot — renders a YouTube embed, a self-hosted MP4, or a
 *  styled placeholder with a gold play icon when FOUNDER_VIDEO is empty. */
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

export default function AboutPage(): JSX.Element {
  return (
    <main className="bg-brand-cream">
      {/* FRAME 1 — MISSION (dark, premium — the page h1) */}
      <section className="relative isolate overflow-hidden bg-brand-deep">
        <div
          aria-hidden
          className="absolute inset-0 -z-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(199,168,99,0.10),transparent_70%)]"
        />
        <div className="mx-auto w-full max-w-[920px] px-6 py-24 sm:py-32">
          <Eyebrow onDark>Our Story</Eyebrow>
          <h1 className="mt-6 max-w-[20ch] text-balance font-display text-[clamp(2.2rem,5.6vw,4rem)] font-semibold leading-[1.04] tracking-[-0.02em] text-brand-cream">
            We install the AI that runs your business — so you don&apos;t have to.
          </h1>
          <p className="mt-7 max-w-[60ch] text-lg leading-[1.6] text-brand-cream/80 sm:text-xl">
            Amagna is an AI automation company. We build the systems that run marketing, outreach,
            reporting, and client ops — install them in your business, and operate them. You stay in
            command; the busywork runs itself.
          </p>
          <div className="mt-9">
            <Link
              href={AUDIT_HREF}
              className="inline-flex items-center rounded-full bg-brand-purple px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-purple/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-warmgold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-deep"
            >
              Get Your Gold Map
            </Link>
          </div>
        </div>
      </section>

      {/* FRAME 3 — THE FOUNDER (video slot + copy) */}
      <section className="border-t border-brand-gold/20 bg-white">
        <div className="mx-auto w-full max-w-[920px] px-6 py-20 sm:py-24">
          <Eyebrow>The founder</Eyebrow>
          <h2 className="mt-5 text-balance font-display text-3xl font-semibold tracking-[-0.015em] text-brand-charcoal sm:text-[2.6rem]">
            Built by an operator, for operators.
          </h2>

          <div className="mt-10">
            <FounderVideo src={FOUNDER_VIDEO} poster={FOUNDER_POSTER} />
          </div>

          <div className="mt-10 max-w-[62ch] space-y-4 text-lg leading-[1.7] text-brand-slate">
            <p>
              I&apos;m Andrew Gladki — a Ukrainian-American operator based in Michigan, and a fresh
              Michigan State graduate in World Politics and Entrepreneurship.
            </p>
            <p>
              Before Amagna, I built{' '}
              <strong className="font-semibold text-brand-charcoal">HydroClean LLC</strong>, my first
              company — a local service business I started from nothing. Over four years I scaled it to
              220 residential and 12 commercial clients, then exited in year four. I didn&apos;t learn
              growth from a classroom; I lived it — the slow seasons, the follow-ups that slipped, the
              marketing that ate the nights I didn&apos;t have.
            </p>
            <p>
              That&apos;s why Amagna exists. I got tired of watching good operators drown in busywork
              that software should just handle, so I started building the systems I wish I&apos;d had.
              I&apos;ve been in your shoes — now I build the machine that takes the weight off.
            </p>
          </div>
        </div>
      </section>

      {/* FRAME 4 — MEET THE CREW (reused, not redesigned) */}
      <section id="crew" className="scroll-mt-24 border-t border-brand-gold/20 bg-brand-cream">
        <div className="mx-auto w-full max-w-[1040px] px-6 py-20 sm:py-24">
          <div className="max-w-[760px]">
            <Eyebrow>Meet the crew</Eyebrow>
            <h2 className="mt-5 text-balance font-display text-3xl font-semibold tracking-[-0.015em] text-brand-charcoal sm:text-[2.6rem]">
              A full team. Mostly software.
            </h2>
            <p className="mt-6 text-lg leading-[1.7] text-brand-slate">
              Hiring Amagna feels like hiring a department. Really it&apos;s a crew of specialized AI
              agents, each owning one lane, working in sync — with a human at the helm approving
              anything that matters.{' '}
              <strong className="font-semibold text-brand-charcoal">Zeno</strong> reads the goal and
              assigns the work; the rest execute their lane and report back. Every client makes the
              whole crew sharper.
            </p>
          </div>

          {/* Captain — featured */}
          <article className="mt-12 grid gap-7 rounded-2xl border border-brand-warmgold/40 bg-white p-6 shadow-[0_1px_30px_-12px_rgba(93,46,140,0.25)] sm:grid-cols-[260px_1fr] sm:items-center sm:p-8">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-brand-deep sm:aspect-square">
              <Image
                src={`/brand/crew/${captain.slug}.webp`}
                alt={`${captain.name}, ${captain.title}`}
                fill
                sizes="(min-width:640px) 260px, 90vw"
                className="object-cover object-[center_25%]"
              />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-warmgold">
                {captain.title}
              </p>
              <h3 className="mt-1.5 font-display text-2xl font-semibold text-brand-charcoal">
                {captain.name}
              </h3>
              <p className="mt-3 leading-[1.7] text-brand-slate">{captain.description}</p>
              <p className="mt-3 text-sm leading-relaxed text-brand-slate/80">{captain.trust}</p>
            </div>
          </article>

          {/* The rest of the crew */}
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {crewmates.map((member) => (
              <article
                key={member.slug}
                className="flex flex-col rounded-2xl border border-brand-gold/30 bg-white p-6"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-brand-deep">
                    <Image
                      src={`/brand/crew/${member.slug}.webp`}
                      alt={`${member.name}, ${member.title}`}
                      fill
                      sizes="80px"
                      className="object-cover object-[center_25%]"
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-brand-charcoal">
                      {member.name}
                    </h3>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-gold">
                      {member.title}
                    </p>
                  </div>
                </div>
                <p className="mt-4 flex-1 leading-[1.6] text-brand-slate">{member.description}</p>
                <p className="mt-3 text-sm leading-relaxed text-brand-slate/80">{member.trust}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FRAME 5 — LINEAGE + THE VOYAGE (founding-document tone) */}
      <section className="bg-brand-deep">
        <div className="mx-auto w-full max-w-[860px] px-6 py-24 sm:py-28">
          <Eyebrow onDark>The name &amp; the voyage</Eyebrow>
          <h2 className="mt-6 max-w-[22ch] text-balance font-display text-[clamp(2rem,4.6vw,3.2rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-brand-cream">
            A name with a lineage. A voyage with a promise.
          </h2>

          <div className="mt-8 max-w-[60ch] space-y-5 text-lg leading-[1.75] text-brand-cream/80">
            <p>
              Amagna is named in the lineage of the{' '}
              <strong className="font-semibold text-brand-warmgold">Magna Carta</strong> — a charter,
              a covenant, a set of rules that changed who holds power. The root <em>magna</em>,
              “great,” runs through two thousand years of institutions built to last.
            </p>
          </div>

          <dl className="mt-9 grid gap-5 sm:grid-cols-3">
            {LINEAGE.map((item) => (
              <div key={item.term} className="border-l-2 border-brand-warmgold/70 pl-4">
                <dt className="font-display text-lg font-semibold text-brand-cream">{item.term}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-brand-cream/70">{item.gloss}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 max-w-[60ch] space-y-5 text-lg leading-[1.75] text-brand-cream/80">
            <p>
              Hidden inside <em>Amagna</em> are three initials —{' '}
              <strong className="font-semibold text-brand-warmgold">A·M·G</strong>, Andrew Michael
              Gladki. The name claims a standard: trust, excellence, magnitude, and order — applied
              to AI and growth.
            </p>
            <p>
              The ship is the rest of the promise. Growth feels like open water — feast and famine,
              storms without warning, a lot of rowing that doesn&apos;t obviously move you closer to
              shore. Amagna is the ship and the crew. We don&apos;t hand you a paddle and a pep talk;
              we get you to a coast you chose. The Gold Map charts where you are and the route there —
              and it&apos;s yours to keep, whether you sail with us or not.
            </p>
          </div>
        </div>
      </section>

      {/* Blog preview, moved below Frame 4 */}
      <FieldNotesSection />

      <CtaBand
        heading="Want to build with us early?"
        subheading="The first clients get the founder's full attention. Chart your Gold Map — a free, custom plan to start."
      />
    </main>
  );
}
