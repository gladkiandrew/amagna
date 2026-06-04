'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/components/home/ocean/use-reduced-motion';
import { HeroOceanCanvas } from './hero-ocean-canvas';
import { HeroOceanGLCanvas } from './hero-ocean-gl';
import { supportsWebGL2 } from './hero-ocean-gl-engine';

/**
 * Selects the hero ocean renderer (PLAN.md §1A):
 *
 *  - `prefers-reduced-motion` → Canvas-2D static frame (no loop). The 2D engine
 *    is the accessible fallback the contract requires; we never delete it.
 *  - no WebGL2 (or GL init fails at runtime) → Canvas-2D animated seascape.
 *  - otherwise → the photoreal WebGL2 ocean.
 *
 * Capability is resolved in an effect (client-only) to avoid an SSR/client
 * mismatch. Until it resolves we render the Canvas-2D engine, which works
 * everywhere — so there's never a blank hero, and the GL upgrade swaps in
 * seamlessly behind the same legibility scrim.
 */
type Renderer = 'pending' | 'gl' | 'canvas2d';

export function HeroOcean({ className }: { className?: string }): JSX.Element {
  const reducedMotion = useReducedMotion();
  const [renderer, setRenderer] = useState<Renderer>('pending');

  useEffect(() => {
    if (reducedMotion) {
      setRenderer('canvas2d');
      return;
    }
    setRenderer(supportsWebGL2() ? 'gl' : 'canvas2d');
  }, [reducedMotion]);

  if (renderer === 'gl') {
    return (
      <HeroOceanGLCanvas
        className={className}
        // If the GL context is lost or the shader fails post-mount, degrade
        // gracefully to the Canvas-2D seascape rather than show a dead canvas.
        onUnsupported={() => setRenderer('canvas2d')}
      />
    );
  }

  // 'pending' and 'canvas2d' both render the 2D engine (it handles its own
  // reduced-motion static-frame branch internally).
  return <HeroOceanCanvas className={className} />;
}
