import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getPostBySlug, getPublishedPosts } from '@/lib/sapt-blog';
import { renderMarkdown } from '@/lib/markdown';
import { SITE, OG_IMAGE_ABSOLUTE, absoluteUrl } from '@/lib/site';
import { ArticleHero } from '@/components/blog/article-hero';

type Params = { params: { slug: string } };

// Revalidate hourly; allow on-demand rendering of slugs added in Sapt after build.
export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const { posts } = await getPublishedPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { post } = await getPostBySlug(params.slug);
  if (!post) return { title: 'Post not found' };
  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.excerpt;
  // Absolute URLs for social scrapers (LinkedIn requires them; it won't resolve
  // relative og:image/og:url via metadataBase the way a browser does).
  const canonical = `${SITE.url}/blog/${post.slug}`;
  const heroImg = absoluteUrl(post.heroPoster) ?? absoluteUrl(post.heroImage);
  const ogImages = heroImg ? [{ url: heroImg }] : [OG_IMAGE_ABSOLUTE];
  const ogImageUrl = heroImg ?? OG_IMAGE_ABSOLUTE.url;
  return {
    title,
    description,
    keywords: post.targetKeywords.length ? post.targetKeywords : undefined,
    alternates: { canonical },
    openGraph: {
      title: `${title} · Amagna AI`,
      description,
      type: 'article',
      url: canonical,
      // Dateless strategy: no article:published_time so shares don't broadcast age.
      authors: [post.author],
      images: ogImages,
      ...(post.heroVideo ? { videos: [{ url: absoluteUrl(post.heroVideo)! }] } : {}),
    },
    twitter: { card: 'summary_large_image', title, description, images: [ogImageUrl] },
  };
}

export default async function BlogPostPage({ params }: Params): Promise<JSX.Element> {
  const { post } = await getPostBySlug(params.slug);
  if (!post) notFound();

  const html = renderMarkdown(post.body);

  // Absolute image for schema (same normalization as the OG tags).
  const schemaImg = absoluteUrl(post.heroPoster) ?? absoluteUrl(post.heroImage);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.seoDescription ?? post.excerpt,
    // Dateless strategy (Andrew's call, 2026-07-08): omit datePublished so posts
    // don't broadcast age. dateModified stays REAL (never backdated/fabricated) —
    // it's the true last-known change date from the CMS.
    ...(post.publishedAt ? { dateModified: post.publishedAt } : {}),
    author: { '@type': 'Person', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: `${SITE.url}/brand/amagna-logo-mark.svg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE.url}/blog/${post.slug}` },
    ...(schemaImg ? { image: schemaImg } : {}),
    ...(post.heroVideo
      ? {
          video: {
            '@type': 'VideoObject',
            name: post.title,
            description: post.seoDescription ?? post.excerpt,
            contentUrl: absoluteUrl(post.heroVideo),
            ...(schemaImg ? { thumbnailUrl: schemaImg } : {}),
            ...(post.publishedAt ? { uploadDate: post.publishedAt } : {}),
          },
        }
      : {}),
    ...(post.targetKeywords.length ? { keywords: post.targetKeywords.join(', ') } : {}),
  };

  // Breadcrumb trail: Home › Field Notes › <post>. Helps search + AEO place the
  // article in the site hierarchy.
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Field Notes', item: `${SITE.url}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE.url}/blog/${post.slug}` },
    ],
  };

  return (
    <article className="bg-brand-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="mx-auto w-full max-w-[760px] px-6 py-16 sm:py-24">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-purple transition-colors hover:text-brand-purple/80"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Field Notes
        </Link>

        <div className="mt-8 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-gold">
          <span>{post.category}</span>
          {/* Visible publish date intentionally omitted (Andrew's call, 2026-07-08).
              Real dates stay in metadata/sitemap; nothing is shown on-page. */}
        </div>

        <h1 className="mt-4 text-balance font-display text-[clamp(2rem,4.8vw,3.2rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-brand-charcoal">
          {post.title}
        </h1>
        <p className="mt-4 text-sm text-brand-slate">By {post.author}</p>

        <ArticleHero post={post} />

        <div
          className="mt-10 text-lg [&_a]:font-medium [&_a]:text-brand-purple [&_a]:underline [&_a]:underline-offset-2 [&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-brand-gold [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-brand-slate [&_code]:rounded [&_code]:bg-brand-lightgray/60 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.9em] [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-[1.7rem] [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:tracking-[-0.01em] [&_h2]:text-brand-charcoal [&_h3]:mt-9 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-brand-charcoal [&_h4]:mt-7 [&_h4]:font-semibold [&_h4]:text-brand-charcoal [&_hr]:my-10 [&_hr]:border-brand-lightgray [&_li]:mt-2 [&_li]:leading-[1.7] [&_li]:text-brand-slate [&_ol]:mt-5 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-6 [&_p]:mt-5 [&_p]:leading-[1.75] [&_p]:text-brand-slate [&_strong]:font-semibold [&_strong]:text-brand-charcoal [&_ul]:mt-5 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="mt-14 rounded-2xl border border-brand-gold/30 bg-white p-8 text-center">
          <p className="font-display text-2xl font-semibold text-brand-charcoal">
            Want this for your business?
          </p>
          <p className="mx-auto mt-3 max-w-[40ch] text-brand-slate">
            The Gold Map builds you a specific, step-by-step plan — free.
          </p>
          <Link
            href="/audit"
            className="mt-6 inline-block rounded-full bg-brand-purple px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-purple/90"
          >
            Get your Gold Map
          </Link>
        </div>
      </div>
    </article>
  );
}
