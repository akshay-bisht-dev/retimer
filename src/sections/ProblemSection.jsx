import { useRef } from 'react';
import { gsap, useGSAP } from '../animations/gsapConfig.js';
import { MQ } from '../animations/motionPreferences.js';
import { sceneTimeline } from '../animations/scrollAnimations.js';
import { ProductImage } from '../components/ProductImage.jsx';
import { SectionLabel } from '../components/SectionLabel.jsx';
import { problem } from '../data/content.js';

const Words = ({ text, className }) => (
  <span className={className}>
    {text.split(' ').map((w, i) => (
      <span className="word" key={i}>
        {w}{' '}
      </span>
    ))}
  </span>
);

export function ProblemSection() {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(`${MQ.desktop}, ${MQ.mobile}`, () => {
        const layers = q('.problem__layer');
        const captions = q('.problem__caption');
        const n = layers.length;
        const seg = 10 / n; // timeline spans 10 units

        gsap.set(layers.slice(1), { autoAlpha: 0 });
        gsap.set(captions.slice(1), { autoAlpha: 0, y: 20 });
        gsap.set(q('.problem__a .word, .problem__b .word'), { opacity: 0.12 });
        gsap.set(q('.problem__b'), { autoAlpha: 0 });
        gsap.set(q('.problem__copy'), { autoAlpha: 0, y: 20 });

        const tl = sceneTimeline(root.current);

        // Slow push-in on every scene for the whole duration it is visible.
        layers.forEach((layer, i) => {
          tl.fromTo(layer.querySelector('img'), { scale: 1.18 }, { scale: 1, duration: seg + 1 }, Math.max(0, i * seg - 0.5));
          if (i === 0) return;
          const at = i * seg - 0.4;
          tl.to(layers[i], { autoAlpha: 1, duration: 0.8 }, at)
            .to(captions[i - 1], { autoAlpha: 0, y: -20, duration: 0.5 }, at)
            .to(captions[i], { autoAlpha: 1, y: 0, duration: 0.5 }, at + 0.4);
        });

        // Headline A builds word by word, then gives way to headline B.
        tl.to(q('.problem__a .word'), { opacity: 1, stagger: 0.4, duration: 0.4 }, 0.2)
          .to(q('.problem__a'), { autoAlpha: 0, y: -30, duration: 0.6 }, 4.6)
          .to(q('.problem__b'), { autoAlpha: 1, duration: 0.3 }, 5)
          .to(q('.problem__b .word'), { opacity: 1, stagger: 0.4, duration: 0.4 }, 5.1)
          .to(q('.problem__copy'), { autoAlpha: 1, y: 0, duration: 0.8 }, 8.2)
          // Lighting: night blue gives way to soft morning warmth.
          .to(q('.problem__tint--cool'), { opacity: 0, duration: 4 }, 5.5)
          .to(q('.problem__tint--warm'), { opacity: 1, duration: 4 }, 5.5)
          .to({}, { duration: 0.6 }); // short hold at the end
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="rhythm" className="problem scene" tabIndex={-1} aria-labelledby="problem-title">
      <div className="scene__sticky">
        <div className="problem__layers">
          {problem.scenes.map((s, i) => (
            <figure className="problem__layer" key={s.time}>
              <ProductImage asset={s.image} sizes="100vw" />
              <figcaption className="problem__caption">
                <span className="problem__time">{s.time}</span>
                <span className="problem__caption-text">{s.caption}</span>
                <span className="problem__count" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')} / {String(problem.scenes.length).padStart(2, '0')}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="problem__tint problem__tint--cool" aria-hidden="true" />
        <div className="problem__tint problem__tint--warm" aria-hidden="true" />
        <div className="problem__vignette" aria-hidden="true" />

        <div className="problem__text container">
          <SectionLabel>{problem.label}</SectionLabel>
          <h2 id="problem-title" className="problem__title display">
            <Words text={problem.headlineA} className="problem__a" />
            <Words text={problem.headlineB} className="problem__b" />
          </h2>
          <p className="problem__copy lead">{problem.copy}</p>
        </div>
      </div>
    </section>
  );
}
