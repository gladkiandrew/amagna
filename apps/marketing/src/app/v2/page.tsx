import { NauticalHero } from './_components/nautical-hero';
import { CrewReveal } from './_components/crew-reveal';
import { Voyage } from './_components/voyage';
import { Offer } from './_components/offer';
import { Proof } from './_components/proof';
import { V2Nav } from './_components/v2-nav';
import { V2Footer } from './_components/v2-footer';

/**
 * Nautical rebrand homepage. Five sections of one narrative:
 *
 *   1. Hero  — the ship sails on a digital ocean (mouse parallax)
 *   2. Crew  — 50+ agents reveal on scroll, two helmsmen at the wheel
 *   3. Voyage— ship glides between glowing app-port shields as user scrolls
 *   4. Offer — Amagna Growth, $1,497 / month, single CTA
 *   5. Proof — founder story + Cal.com embed
 *
 * Held behind /v2 + noindex so amagna.co/ keeps selling on the current copy.
 */
export default function V2Home(): JSX.Element {
  return (
    <>
      <V2Nav />
      <NauticalHero />
      <CrewReveal />
      <Voyage />
      <Offer />
      <Proof />
      <V2Footer />
    </>
  );
}
