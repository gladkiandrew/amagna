import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';

/**
 * Site-wide Open Graph / Twitter card image, generated at build time.
 * Next.js auto-wires this into openGraph.images and twitter.images for every
 * route that doesn't define its own. Brand colors come from docs/brand/brand-colors.md.
 */
export const alt = 'Amagna AI — AI growth systems for home services & real estate';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          backgroundColor: '#5D2E8C',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 92, fontWeight: 700, letterSpacing: '-3px' }}>
          <span style={{ color: '#FFFFFF' }}>Amagna</span>
          <span style={{ color: '#D4B873', marginLeft: 18 }}>AI</span>
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 36,
            lineHeight: 1.35,
            color: 'rgba(255,255,255,0.82)',
            maxWidth: 880,
          }}
        >
          {SITE.tagline}
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 26,
            color: '#D4B873',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          amagna.co
        </div>
      </div>
    ),
    { ...size },
  );
}
