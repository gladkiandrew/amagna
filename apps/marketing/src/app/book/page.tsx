import type { Metadata } from 'next';
import { Clock, MessageSquare, ClipboardList } from 'lucide-react';
import { CalendlyEmbed } from '@/components/calendly-embed';

export const metadata: Metadata = {
  title: 'Book a call',
  description:
    'Book a 20-minute discovery call with Amagna AI. We look at your market, tell you what we would do, and you decide from there. No pitch deck.',
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
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  return (
    <section className="mx-auto w-full max-w-[900px] px-6 py-20">
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

      <div className="mt-10">
        <CalendlyEmbed url={calendlyUrl} />
      </div>
    </section>
  );
}
