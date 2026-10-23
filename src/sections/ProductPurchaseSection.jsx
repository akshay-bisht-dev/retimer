import { useRef } from 'react';
import { Check } from 'lucide-react';
import { gsap, useGSAP } from '../animations/gsapConfig.js';
import { MQ } from '../animations/motionPreferences.js';
import { fadeUp, maskReveal } from '../animations/scrollAnimations.js';
import { PrimaryButton } from '../components/PrimaryButton.jsx';
import { ProductImage } from '../components/ProductImage.jsx';
import { SectionLabel } from '../components/SectionLabel.jsx';
import { SplitLines } from '../components/SplitLines.jsx';
import { assets } from '../data/assets.js';
import { healthNotice, purchase } from '../data/content.js';
import { highlights, inTheBox, links, product, specs } from '../data/product.js';

export function ProductPurchaseSection() {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(`${MQ.desktop}, ${MQ.mobile}`, () => {
        maskReveal(q('.buy__title')[0]);
        fadeUp(q('.buy__copy'));
        // product rises onto its plinth of light
        gsap.fromTo(
          q('.buy__product'),
          { yPercent: 18, scale: 0.9, autoAlpha: 0 },
          {
            yPercent: 0,
            scale: 1,
            autoAlpha: 1,
            ease: 'none',
            scrollTrigger: { trigger: q('.buy__stage')[0], start: 'top 95%', end: 'center 55%', scrub: true },
          },
        );
        gsap.fromTo(
          q('.buy__plinth'),
          { scaleX: 0.3, autoAlpha: 0 },
          { scaleX: 1, autoAlpha: 1, ease: 'none', scrollTrigger: { trigger: q('.buy__stage')[0], start: 'top 80%', end: 'center 55%', scrub: true } },
        );
        fadeUp(q('.buy__card > *'), { trigger: q('.buy__card')[0], stagger: 0.07 });
        fadeUp(q('.buy__col'), { stagger: 0.12 });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="buy" className="buy" tabIndex={-1} aria-labelledby="buy-title">
      <div className="container">
        <header className="buy__head">
          <SectionLabel>{purchase.label}</SectionLabel>
          <SplitLines id="buy-title" className="buy__title display" lines={purchase.headline} />
          <p className="buy__copy lead">{purchase.copy}</p>
        </header>

        <div className="buy__layout">
          <div className="buy__stage">
            <div className="buy__glow" aria-hidden="true" />
            <ProductImage asset={assets.heroProduct} sizes="(max-width: 900px) 92vw, 52vw" className="buy__product" />
            <div className="buy__plinth" aria-hidden="true" />
          </div>

          <div className="buy__card">
            <p className="buy__name">{product.name}</p>
            <p className="buy__sub">{product.tagline}</p>
            <p className="buy__price">
              <span className="buy__amount">{product.price.display}</span>
              <span className="buy__currency">{product.price.currencyNote}</span>
            </p>
            <ul className="buy__highlights">
              {highlights.map((h) => (
                <li key={h}>
                  <Check size={16} strokeWidth={2} aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
            <div className="buy__ctas">
              <PrimaryButton href={links.product} external>
                Buy on retimer.com.au
              </PrimaryButton>
              <PrimaryButton href={links.specs} variant="ghost" external>
                Full specifications
              </PrimaryButton>
            </div>
            <p className="buy__fine">
              {product.warranty}. Price verified on the official store on {product.verifiedOn}; the store shows the final
              price and currency at checkout. Looking for the earlier model?{' '}
              <a href={links.productV2}>Re-Timer (v2)</a>.
            </p>
          </div>
        </div>

        <div className="buy__details">
          <div className="buy__col">
            <h3 className="buy__h">Specifications</h3>
            <dl className="speclist">
              {specs.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="buy__col">
            <h3 className="buy__h">In the box</h3>
            <ul className="boxlist">
              {inTheBox.map((b, i) => (
                <li key={b}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="buy__col buy__col--notice">
            <h3 className="buy__h">Before you start</h3>
            <p>{healthNotice}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
