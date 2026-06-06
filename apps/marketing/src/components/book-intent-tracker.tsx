'use client';

import { useEffect } from 'react';
import { trackBookIntent } from '@/lib/meta-pixel-events';

/**
 * Fires the Meta pixel `Contact` event once on the /book page (book-a-call
 * intent). Renders nothing; no-ops when the pixel isn't loaded. Decoupled from
 * the frozen Cal.com booking code — event fire only, no booking-logic changes.
 */
export function BookIntentTracker(): null {
  useEffect(() => {
    trackBookIntent();
  }, []);
  return null;
}
