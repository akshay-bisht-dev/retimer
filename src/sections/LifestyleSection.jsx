import { useRef } from 'react';
import { gsap, useGSAP } from '../animations/gsapConfig.js';
import { MQ } from '../animations/motionPreferences.js';
import { fadeUp, maskReveal } from '../animations/scrollAnimations.js';
import { ProductImage } from '../components/ProductImage.jsx';
import { SectionLabel } from '../components/SectionLabel.jsx';
import { SplitLines } from '../components/SplitLines.jsx';
import { lifestyle } from '../data/content.js';

// Three full-height scenes that stack: each new scene slides over the last,
// which recedes into darkness behind it.
export function LifestyleSection() {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, ({ conditions }) => {
        if (!conditions.desktop && !conditions.mobile) return;
        const scenes = q('.life__scene');
        const depth = conditions.desktop ? 1 : 0.5;

        scenes.forEach((scene, i) => {
          const img = scene.querySelector('.life__media img');
          // image window opens as the scene arrives
          gsap.fromTo(
            scene.querySelector('.life__media'),
            { clipPath: 'inset(12% 10% 12% 10% round 6px)' },
            {
              clipPath: 'inset(0% 0% 0% 0% round 0px)',
              ease: 'none',
              scrollTrigger: { trigger: scene, start: 'top 90%', end: 'top 10%', scrub: true },
            },
          );
          gsap.fromTo(img, { yPercent: -6 * depth, scale: 1.12 }, {
            yPercent: 6 * depth,
            scale: 1.02,
            ease: 'none',
            scrollTrigger: { trigger: scene, start: 'top bottom', end: 'bottom top', scrub: true },
          });
          maskReveal(scene.querySelector('.life__title'), { trigger: scene, start: 'top 45%' });
          fadeUp(scene.querySelectorAll('.life__kicker, .life__text'), { trigger: scene, start: 'top 40%' });

          // the previous scene recedes beneath the next one
          const next = scenes[i + 1];
          if (next) {
            gsap.to(scene.querySelector('.life__inner'), {
              scale: 0.9,
              ease: 'none',
              scrollTrigger: { trigger: next, start: 'top bottom', end: 'top top', scrub: true },
            });
            gsap.to(scene.querySelector('.life__shade'), {
              opacity: 0.75,
              ease: 'none',
              scrollTrigger: { trigger: next, start: 'top bottom', end: 'top top', scrub: true },
            });
          }
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="life" className="life" tabIndex={-1} aria-labelledby="life-title">
      <h2 id="life-title" className="sr-only">
        Designed around real life
      </h2>
      {lifestyle.scenes.map((s, i) => (
        <article key={s.id} className={`life__scene life__scene--${s.warmth} ${i % 2 ? 'is-flipped' : ''}`} aria-labelledby={`life-${s.id}`}>
          <div className="life__inner">
            <div className="life__media">
              <ProductImage asset={s.image} sizes="(max-width: 900px) 100vw, 56vw" />
            </div>
            <div className="life__copy">
              {i === 0 && <SectionLabel className="life__label">{lifestyle.label}</SectionLabel>}
              <p className="life__kicker">
                <span>0{i + 1}</span> {s.kicker}
              </p>
              <SplitLines as="h3" id={`life-${s.id}`} className="life__title headline" lines={s.headline} />
              <p className="life__text">{s.text}</p>
            </div>
            <div className="life__shade" aria-hidden="true" />
          </div>
        </article>
      ))}
    </section>
  );
}
