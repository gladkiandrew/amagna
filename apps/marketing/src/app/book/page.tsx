import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, MessageSquare, ClipboardList, ArrowRight } from 'lucide-react';
import { CalcomEmbed } from '@/components/calcom-embed';
import { BookIntentTracker } from '@/components/book-intent-tracker';
import { env } from '@/lib/env';

// The Cal.com URL is a Cloudflare runtime env var — reading it forces this
// route to render dynamically so the iframe URL reflects the current value.
// Under @opennextjs/cloudflare we use the default Node runtime
// (compatibility_date >= 2025-04-01 + nodejs_compat make process.env work).
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Book a call',
  description:
    'Book a 20-minute discovery call with Amagna AI. We look at your market, tell you what we would do, and you decide from there. No pitch deck.',
  alternates: { canonical: '/book' },
};

const WHAT_TO_EXPECT = [
  {
    icon: Clock,
    title: 'Twenty minutes',
    body: 'Short and focused. We respect your time — you run a business.',
  },
  {
    icon: MessageSquare,
    title: 'Straight talk, no jargon',
    body: 'We look at your market and tell you what we would actually do. No pitch deck, no pressure.',
  },
  {
    icon: ClipboardList,
    title: 'You leave with a plan',
    body: 'Whether or not we work together, you walk away knowing what would move the needle.',
  },
] as const;

export default function BookPage() {
  const calcomUrl = env('NEXT_PUBLIC_CALCOM_URL');

  return (
    <section className="mx-auto w-full max-w-[900px] px-6 py-20">
      <BookIntentTracker />
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-antique-gold">
        Book a call
      </p>
      <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        Let&apos;s look at your market together
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
        Pick a time that works. Twenty minutes, no pitch deck — just a straight conversation
        about what we would do to grow your business.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {WHAT_TO_EXPECT.map((item) => (
          <div key={item.title} className="rounded-2xl border border-black/5 bg-white p-5">
            <item.icon className="h-5 w-5 text-royal-purple" aria-hidden="true" />
            <h2 className="mt-3 text-sm font-semibold text-ink">{item.title}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{item.body}</p>
          </div>
        ))}
      </div>

      {/* Gold Map advisory — the recommended first step (run 7 North Star). */}
      <div className="mt-10 rounded-2xl border border-royal-purple/20 bg-royal-purple/[0.04] p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-antique-gold">
          Want a sharper call?
        </p>
        <h2 className="mt-2 text-balance text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          Chart your Gold Map first — we&apos;ll come ready.
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
          The Gold Map is a free, custom growth plan for your business. Chart it before we talk and
          the crew shows up already briefed on your background and goals — so the call is all
          strategy, no catch-up.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href="/audit"
            className="inline-flex items-center gap-1.5 rounded-full bg-royal-purple px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-royal-purple/90"
          >
            Get Your Gold Map
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <a
            href="#book-calendar"
            className="text-sm font-medium text-royal-purple underline decoration-1 underline-offset-4 transition-colors hover:text-royal-purple/80"
          >
            I&apos;d rather just book
          </a>
        </div>
      </div>

      <div id="book-calendar" className="mt-10 scroll-mt-24">
        <CalcomEmbed url={calcomUrl} />
      </div>
    </section>
  );
}
