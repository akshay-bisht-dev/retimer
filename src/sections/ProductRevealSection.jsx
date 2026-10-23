import { useRef } from 'react';
import { gsap, useGSAP } from '../animations/gsapConfig.js';
import { MQ } from '../animations/motionPreferences.js';
import { sceneTimeline } from '../animations/scrollAnimations.js';
import { ProductImage } from '../components/ProductImage.jsx';
import { SectionLabel } from '../components/SectionLabel.jsx';
import { SplitLines } from '../components/SplitLines.jsx';
import { assets } from '../data/assets.js';
import { reveal } from '../data/content.js';

export function ProductRevealSection() {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      const build = (zoom) => {
        const [light, ...rest] = q('.annot');
        gsap.set(q('.annot'), { autoAlpha: 0 });
        gsap.set(q('.reveal__spot'), { xPercent: -35, yPercent: -25, scale: 0.6 });
        gsap.set(q('.reveal__product'), { autoAlpha: 0, scale: 0.85 });
        gsap.set(q('.reveal__img'), { opacity: 0.12 });
        gsap.set(q('.reveal__emit'), { autoAlpha: 0 });
        gsap.set(q('.reveal__title .line__inner'), { yPercent: 110 });
        gsap.set(q('.reveal__copy'), { autoAlpha: 0, y: 24 });

        const tl = sceneTimeline(root.current);
        tl
          // 1. out of darkness, under a moving spotlight
          .to(q('.reveal__spot'), { xPercent: 0, yPercent: 0, scale: 1, duration: 3, ease: 'sine.inOut' }, 0)
          .to(q('.reveal__product'), { autoAlpha: 1, scale: 1, duration: 3, ease: 'power2.out' }, 0)
          .to(q('.reveal__img'), { opacity: 1, duration: 3 }, 0)
          .to(q('.reveal__title .line__inner'), { yPercent: 0, stagger: 0.3, duration: 1.2, ease: 'power3.out' }, 0.6)
          .to(q('.reveal__copy'), { autoAlpha: 1, y: 0, duration: 1 }, 1.6)
          // text and product drift at different speeds for depth
          .fromTo(q('.reveal__text'), { y: 60 }, { y: -60, duration: 10 }, 0)
          // 2. the camera pushes toward the light-delivery area
          .to(q('.reveal__emit'), { autoAlpha: 1, duration: 1.4 }, 3.2)
          .to(q('.reveal__product'), { scale: zoom, yPercent: -12, duration: 2.2, ease: 'power2.inOut' }, 3.4)
          .to(q('.annot'), { scale: 1 / zoom, duration: 2.2, ease: 'power2.inOut' }, 3.4)
          .to(q('.reveal__bg'), { opacity: 1, duration: 2 }, 3.4)
          .to(q('.reveal__text'), { autoAlpha: 0, duration: 1 }, 3.4)
          .to(q('.reveal__text'), { autoAlpha: 1, duration: 1 }, 6.8)
          .to(light, { autoAlpha: 1, duration: 0.6 }, 4.8)
          .to(light, { autoAlpha: 0, duration: 0.5 }, 6.4)
          // 3. pull back and point out the details
          .to(q('.reveal__product'), { scale: 1, yPercent: 0, duration: 2, ease: 'power2.inOut' }, 6.6)
          .to(q('.annot'), { scale: 1, duration: 2, ease: 'power2.inOut' }, 6.6)
          .to(rest, { autoAlpha: 1, stagger: 0.5, duration: 0.6 }, 7.8)
          .to({}, { duration: 1 });
      };

      mm.add(MQ.desktop, () => build(1.75));
      mm.add(MQ.mobile, () => build(1.45));
    },
    { scope: root },
  );

  return (
    <section ref={root} id="product" className="reveal scene" tabIndex={-1} aria-labelledby="reveal-title">
      <div className="scene__sticky">
        <div className="reveal__bg" aria-hidden="true" />
        <div className="reveal__spot" aria-hidden="true" />

        <div className="reveal__text container">
          <SectionLabel>{reveal.label}</SectionLabel>
          <SplitLines id="reveal-title" className="reveal__title display" lines={reveal.headline} />
          <p className="reveal__copy lead">{reveal.copy}</p>
        </div>

        <div className="reveal__stage">
          <div className="reveal__product">
            <ProductImage asset={assets.heroProduct} sizes="(max-width: 900px) 110vw, 64vw" className="reveal__img" />
            <span className="reveal__emit" aria-hidden="true" />
            <ul className="reveal__annots" aria-label="Product details">
              {reveal.annotations.map((a) => (
                <li
                  key={a.id}
                  className={`annot annot--${a.id}`}
                  style={{ '--x': `${a.x}%`, '--y': `${a.y}%` }}
                >
                  <span className="annot__dot" aria-hidden="true" />
                  <span className="annot__card">
                    <strong>{a.title}</strong>
                    <span>{a.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
