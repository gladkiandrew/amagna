'use client';

import { useState } from 'react';
import { useReducedMotion } from '@/components/home/ocean/use-reduced-motion';
import type { BlogPost } from '@/lib/blog-types';

/** Final still-frame fallback when a post has no poster or hero image. */
const MONOGRAM_POSTER = '/brand/amagna-monogram-preview.png';

const FRAME =
  'mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-brand-gold/25 bg-brand-deep';

type Props = {
  post: Pick<BlogPost, 'heroVideo' | 'heroPoster' | 'heroImage' | 'title'>;
};

/**
 * Article hero. Renders, in priority order:
 *  1. `heroVideo` → autoplaying, muted, looping clip (e.g. from Hyperframes),
 *     with poster = heroPoster ?? heroImage ?? monogram. Reduced-motion users
 *     see the poster still instead of a moving video.
 *  2. `heroImage` → the existing static image.
 *  3. nothing-set → the AM monogram still.
 *
 * Client component because autoplay + `prefers-reduced-motion` need the browser.
 */
export function ArticleHero({ post }: Props): JSX.Element {
  const reduced = useReducedMotion();
  const [videoFailed, setVideoFailed] = useState(false);

  const poster = post.heroPoster ?? post.heroImage ?? MONOGRAM_POSTER;

  // Hero video — unless the source errored or the user prefers reduced motion.
  if (post.heroVideo && !videoFailed && !reduced) {
    return (
      <div className={FRAME}>
        <video
          src={post.heroVideo}
          poster={poster}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          aria-label={`${post.title} — hero clip`}
          onError={() => setVideoFailed(true)}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  // Reduced-motion (but a video exists) → show its poster still, not a blank frame.
  if (post.heroVideo && reduced) {
    return (
      <div className={FRAME}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={poster} alt="" className="h-full w-full object-cover" />
      </div>
    );
  }

  // Static hero image.
  if (post.heroImage) {
    return (
      <div className={FRAME}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={post.heroImage} alt="" className="h-full w-full object-cover" />
      </div>
    );
  }

  // Nothing set → AM monogram still (keeps today's look).
  return (
    <div className={FRAME}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={MONOGRAM_POSTER}
        alt=""
        aria-hidden
        className="h-full w-full object-contain p-10 opacity-90"
      />
    </div>
  );
}
