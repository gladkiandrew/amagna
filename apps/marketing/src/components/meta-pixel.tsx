'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// Last pathname a PageView was fired for. Module-scoped so it survives
// StrictMode double-effects and remounts: the initial load's PageView comes
// from the inline init script, every later ROUTE CHANGE fires exactly one.
let lastTrackedPath: string | null = null;

type MetaPixelProps = {
  /** The Meta pixel ID, passed in from the server so we don't depend on
   *  build-time NEXT_PUBLIC_ inlining (works with Cloudflare runtime env). */
  pixelId?: string;
};

/**
 * Meta pixel loader + automatic PageView on route changes.
 *
 * Renders nothing (and doesn't load the script) when pixelId is unset, so the
 * site is safe to ship before the pixel ID lands. PageView fires automatically
 * on every client-side navigation; custom events (Lead, Subscribe) come from
 * lib/meta-pixel-events.ts.
 */
export function MetaPixel({ pixelId }: MetaPixelProps): JSX.Element | null {
  const pathname = usePathname();

  useEffect(() => {
    if (!pixelId) return;
    // Initial load: the inline init script below owns the first PageView —
    // firing it here too double-counted every ad landing.
    if (lastTrackedPath === null) {
      lastTrackedPath = pathname;
      return;
    }
    // Same route (re-render / StrictMode re-run): nothing new to count.
    if (lastTrackedPath === pathname) return;
    lastTrackedPath = pathname;
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'PageView');
    }
  }, [pathname, pixelId]);

  if (!pixelId) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s){
            if(f.fbq)return; n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n; n.push=n; n.loaded=!0; n.version='2.0'; n.queue=[];
            t=b.createElement(e); t.async=!0; t.src=v; s=b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t,s);
          }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init','${pixelId}');
          fbq('track','PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt=""
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
