import { useEffect } from 'react';
import { ScrollTrigger } from './animations/gsapConfig.js';
import { Footer } from './components/Footer.jsx';
import { Navigation } from './components/Navigation.jsx';
import { ScrollProgress } from './components/ScrollProgress.jsx';
import { SmoothScroll } from './components/SmoothScroll.jsx';
import { FeaturesSection } from './sections/FeaturesSection.jsx';
import { FinalSection } from './sections/FinalSection.jsx';
import { HeroSection } from './sections/HeroSection.jsx';
import { LifestyleSection } from './sections/LifestyleSection.jsx';
import { LightScienceSection } from './sections/LightScienceSection.jsx';
import { ProblemSection } from './sections/ProblemSection.jsx';
import { ProductPurchaseSection } from './sections/ProductPurchaseSection.jsx';
import { ProductRevealSection } from './sections/ProductRevealSection.jsx';
import { ResearchSection } from './sections/ResearchSection.jsx';

export default function App() {
  // Re-measure every trigger once fonts and images have settled.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);

  return (
    <SmoothScroll>
      <Navigation />
      <main id="main">
        <HeroSection />
        <ProblemSection />
        <ProductRevealSection />
        <LightScienceSection />
        <FeaturesSection />
        <LifestyleSection />
        <ResearchSection />
        <ProductPurchaseSection />
        <FinalSection />
      </main>
      <Footer />
      <ScrollProgress />
      <div className="grain" aria-hidden="true" />
    </SmoothScroll>
  );
}
