import Link from 'next/link';
import { CalcomEmbed } from '@/components/calcom-embed';
import { env } from '@/lib/env';

/**
 * Proof + close. Andrew's story (operator-built, Breaking the Fast as
 * proof of concept) and a Cal.com embed for the 20-minute call. The Cal.com
 * URL is read at request time so it picks up Cloudflare runtime env.
 */
export function Proof(): JSX.Element {
  const calcomUrl = env('NEXT_PUBLIC_CALCOM_URL');
  return (
    <section className="relative overflow-hidden bg-navy-deep py-28 sm:py-36">
      <div className="mx-auto grid w-full max-w-[1200px] gap-14 px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-gold/80">
            The Captain
          </p>
          <h2 className="mt-5 font-serif text-[34px] leading-[1.1] text-white sm:text-[44px]">
            I built Amagna because
            <span className="text-gold-bright">
              {' '}every operator I talked to was paying an agency that did almost nothing.
            </span>
          </h2>
          <div className="mt-8 space-y-4 text-base leading-relaxed text-white/70">
            <p>
              I run profitable Meta ads on my own consumer brand — Breaking the Fast — every
              day. The same playbook I use there is the one we run for our clients. No
              hand-waving, no &quot;we&apos;re testing.&quot;
            </p>
            <p>
              We are operators first, agency second. Productized so the price never moves.
              Month-to-month so we earn the next month. One client per zip code so we never
              compete with you.
            </p>
            <p className="font-serif text-lg text-gold-bright">— Andrew, founder</p>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/about"
              className="rounded-full border border-gold/30 px-6 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-gold/10 hover:text-white"
            >
              Read the Amagna story
            </Link>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-gold/80">
            Book the 20-minute call
          </p>
          <h3 className="mt-3 font-serif text-2xl text-white">
            One call. Either we&apos;re a fit, or we tell you who is.
          </h3>
          <div className="mt-6 overflow-hidden rounded-2xl">
            <CalcomEmbed url={calcomUrl} />
          </div>
        </div>
      </div>
    </section>
  );
}
