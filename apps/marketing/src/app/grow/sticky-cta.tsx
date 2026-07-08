'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { CALCOM_DIRECT_URL } from '@/lib/site';

/**
 * The page's ONE Book-a-Call. A full-width bar pinned to the bottom that slides
 * up the first time the visitor scrolls down and then STAYS for the rest of the
 * page (latched — it never hides again). Safe-area inset on mobile; gold shimmer.
 */
export function StickyCta(): JSX.Element {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const THRESHOLD = 40; // px of scroll before the bar latches in
    if (window.scrollY > THRESHOLD) {
      setShow(true);
      return;
    }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (window.scrollY > THRESHOLD) {
          setShow(true); // latch on — once shown, it stays for the rest of the page
          window.removeEventListener('scroll', onScroll);
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-brand-gold/25 bg-brand-deep/95 backdrop-blur transition-transform duration-500 ease-out ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="mx-auto flex w-full max-w-[1100px] items-center justify-center px-6 py-3.5">
        <a
          href={CALCOM_DIRECT_URL}
          className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-brand-gold px-7 py-3.5 text-base font-semibold text-brand-deep shadow-[0_-2px_30px_-8px_rgba(201,169,97,0.5)] transition-colors hover:bg-brand-warmgold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-warmgold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-deep sm:w-auto sm:px-10"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_35%,rgba(255,255,255,0.45)_50%,transparent_65%)] bg-[length:250%_100%] motion-safe:animate-[growShimmer_3.6s_linear_infinite]"
          />
          <span className="relative">Book a Call</span>
          <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </a>
      </div>
    </div>
  );
}
