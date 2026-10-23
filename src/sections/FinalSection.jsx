import { useRef } from 'react';
import { gsap, useGSAP } from '../animations/gsapConfig.js';
import { MQ } from '../animations/motionPreferences.js';
import { PrimaryButton } from '../components/PrimaryButton.jsx';
import { ProductImage } from '../components/ProductImage.jsx';
import { SplitLines } from '../components/SplitLines.jsx';
import { assets } from '../data/assets.js';
import { finale } from '../data/content.js';
import { links } from '../data/product.js';

export function FinalSection() {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(`${MQ.desktop}, ${MQ.mobile}`, () => {
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: root.current, start: 'top 85%', end: 'bottom bottom', scrub: true },
        });
        tl.fromTo(q('.final__horizon'), { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1 }, 0)
          .fromTo(q('.final__product'), { yPercent: 40, autoAlpha: 0, scale: 0.85 }, { yPercent: 0, autoAlpha: 1, scale: 1, duration: 0.8 }, 0)
          .fromTo(q('.final__glow'), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.8 }, 0.1)
          .fromTo(q('.final__title .line__inner'), { yPercent: 110 }, { yPercent: 0, stagger: 0.1, duration: 0.4 }, 0.45)
          .fromTo(q('.final__copy, .final__cta'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.3 }, 0.65);

        // the glasses hang, weightless, in the last frame
        gsap.to(q('.final__float'), { y: -14, rotation: -1.2, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="final" className="final" tabIndex={-1} aria-labelledby="final-title">
      <div className="final__horizon" aria-hidden="true" />
      <div className="final__glow" aria-hidden="true" />
      <div className="final__float">
        <ProductImage asset={assets.heroProduct} sizes="(max-width: 900px) 90vw, 46vw" className="final__product" />
      </div>
      <div className="final__text container">
        <SplitLines id="final-title" className="final__title display" lines={finale.headline} />
        <p className="final__copy lead">{finale.copy}</p>
        <PrimaryButton href={links.productOverview} className="final__cta" external>
          {finale.cta}
        </PrimaryButton>
      </div>
    </section>
  );
}
