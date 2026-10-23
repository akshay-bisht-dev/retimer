import { useRef } from 'react';
import { gsap, useGSAP } from '../animations/gsapConfig.js';
import { MQ } from '../animations/motionPreferences.js';
import { heroExit, heroIntro } from '../animations/heroAnimations.js';
import { PrimaryButton } from '../components/PrimaryButton.jsx';
import { ProductImage } from '../components/ProductImage.jsx';
import { SplitLines } from '../components/SplitLines.jsx';
import { assets } from '../data/assets.js';
import { hero } from '../data/content.js';

export function HeroSection() {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        heroIntro(q);
        heroExit(root.current, q);
      });
      mm.add(MQ.mobile, () => {
        heroIntro(q);
        heroExit(root.current, q, { amount: 0.5 });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="top" className="hero" tabIndex={-1} aria-labelledby="hero-title">
      <div className="hero__veil" aria-hidden="true" />
      <div className="hero__ambient" aria-hidden="true" />
      <div className="hero__beam" aria-hidden="true" />

      <div className="hero__product-wrap">
        <div className="hero__product">
          <ProductImage
            asset={assets.heroProduct}
            priority
            sizes="(max-width: 900px) 94vw, 64vw"
            className="hero__img"
          />
          <span className="hero__emit" aria-hidden="true" />
          <div className="hero__reflection" aria-hidden="true">
            <ProductImage asset={assets.heroProduct} alt="" sizes="(max-width: 900px) 94vw, 64vw" priority />
          </div>
        </div>
      </div>

      <div className="hero__text container">
        <p className="hero__eyebrow label">
          <span className="label__dot" aria-hidden="true" />
          {hero.eyebrow}
        </p>
        <SplitLines as="h1" id="hero-title" className="hero__title display" lines={hero.headline} />
        <p className="hero__copy lead">{hero.copy}</p>
        <div className="hero__ctas">
          <PrimaryButton href={hero.primary.href}>{hero.primary.label}</PrimaryButton>
          <PrimaryButton href={hero.secondary.href} variant="ghost">
            {hero.secondary.label}
          </PrimaryButton>
        </div>
      </div>

      <a href="#rhythm" className="hero__cue" aria-label="Scroll to the story">
        <span className="hero__cue-line" aria-hidden="true" />
        <span className="hero__cue-text">Scroll</span>
      </a>
    </section>
  );
}
