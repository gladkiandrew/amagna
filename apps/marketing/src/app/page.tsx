import { HeroFlow } from '@/components/hero-flow';
import { HowItWorks } from '@/components/sections/how-it-works';
import { Services } from '@/components/sections/services';
import { TwoNiches } from '@/components/sections/two-niches';
import { Results } from '@/components/sections/results';
import { CtaBand } from '@/components/sections/cta-band';

export default function Home() {
  return (
    <>
      <HeroFlow />
      <HowItWorks />
      <Services />
      <TwoNiches />
      <Results />
      <CtaBand />
    </>
  );
}
