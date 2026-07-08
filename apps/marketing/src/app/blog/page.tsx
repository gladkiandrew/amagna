import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getPublishedPosts } from '@/lib/sapt-blog';
import { formatPostDate } from '@/lib/blog-types';
import { OG_IMAGE } from '@/lib/site';

const TITLE = 'Field Notes';
const DESCRIPTION =
  'Operator-to-operator notes on autonomous marketing — plain-English plays on content, ads, follow-up, and the systems that run your growth for you.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/blog' },
  openGraph: {
    title: `${TITLE} · Amagna AI`,
    description: DESCRIPTION,
    type: 'website',
    url: '/blog',
    images: [OG_IMAGE],
  },
};

// Revalidate hourly so newly-published Sapt posts appear without a redeploy.
export const revalidate = 3600;

export default async function BlogIndexPage(): Promise<JSX.Element> {
  const { posts } = await getPublishedPosts();

  return (
    <section className="bg-brand-cream">
      <div className="mx-auto w-full max-w-[1000px] px-6 py-20 sm:py-28">
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-gold">
          <span aria-hidden className="h-px w-7 bg-brand-gold/60" />
          Field Notes
        </p>
        <h1 className="mt-5 max-w-[18ch] text-balance font-display text-[clamp(2.2rem,5vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-brand-charcoal">
          Marketing that runs itself, explained.
        </h1>
        <p className="mt-6 max-w-[60ch] text-lg leading-[1.6] text-brand-slate">
          {DESCRIPTION}
        </p>

        <ul className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-4 focus-visible:ring-offset-brand-cream"
              >
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-brand-gold/25 bg-brand-deep">
                  {post.heroPoster ?? post.heroImage ? (
                    // Plain img (not next/image) so Sapt asset hosts need no
                    // next.config remotePatterns entry. Cards stay a static still
                    // (poster preferred) — we never autoplay a grid of videos.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.heroPoster ?? post.heroImage}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div
                      aria-hidden
                      className="flex h-full w-full items-center justify-center bg-[radial-gradient(ellipse_70%_60%_at_50%_30%,rgba(212,184,115,0.18),transparent_70%)]"
                    >
                      <span className="font-display text-2xl font-semibold text-brand-warmgold/80">
                        Amagna
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-gold">
                  <span>{post.category}</span>
                  {post.publishedAt && (
                    <>
                      <span aria-hidden className="text-brand-lightgray">·</span>
                      <time dateTime={post.publishedAt} className="text-brand-slate">
                        {formatPostDate(post.publishedAt)}
                      </time>
                    </>
                  )}
                </div>
                <h2 className="mt-3 font-display text-2xl font-semibold leading-snug text-brand-charcoal transition-colors group-hover:text-brand-purple">
                  {post.title}
                </h2>
                <p className="mt-3 text-base leading-[1.6] text-brand-slate">{post.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-purple">
                  Read it
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
