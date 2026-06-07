import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getPublishedPosts } from '@/lib/sapt-blog';
import { formatPostDate } from '@/lib/blog-types';

/**
 * Field Notes — a compact "recent blog posts" section for the bottom of the
 * homepage and /about (above the footer). Pulls the latest posts from the same
 * blog source as /blog (Sapt-backed, fallback-safe). Renders nothing if there
 * are no posts. Field Notes is NOT in the top nav — this + the footer link are
 * its surfaces.
 */
export async function FieldNotesSection({
  limit = 3,
  heading = 'From the Field Notes',
}: {
  limit?: number;
  heading?: string;
}): Promise<JSX.Element | null> {
  const { posts } = await getPublishedPosts();
  if (posts.length === 0) return null;
  const latest = posts.slice(0, limit);

  return (
    <section aria-labelledby="field-notes-title" className="border-t border-brand-gold/20 bg-brand-cream">
      <div className="mx-auto w-full max-w-[1000px] px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-gold">
              <span aria-hidden className="h-px w-7 bg-brand-gold/60" />
              Field Notes
            </p>
            <h2
              id="field-notes-title"
              className="mt-4 font-display text-[clamp(1.8rem,4vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-brand-charcoal"
            >
              {heading}
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-purple transition-colors hover:text-brand-purple/80"
          >
            Read all Field Notes
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <ul className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-3">
          {latest.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-4 focus-visible:ring-offset-brand-cream"
              >
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-gold">
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
                <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-brand-charcoal transition-colors group-hover:text-brand-purple">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-[1.6] text-brand-slate">{post.excerpt}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-purple">
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
