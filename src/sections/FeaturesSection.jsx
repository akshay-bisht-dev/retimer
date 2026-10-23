import { useRef } from 'react';
import { gsap, useGSAP } from '../animations/gsapConfig.js';
import { MQ } from '../animations/motionPreferences.js';
import { fadeUp, maskReveal, sceneTimeline } from '../animations/scrollAnimations.js';
import { ProductImage } from '../components/ProductImage.jsx';
import { SectionLabel } from '../components/SectionLabel.jsx';
import { SplitLines } from '../components/SplitLines.jsx';
import { assets } from '../data/assets.js';
import { features } from '../data/content.js';
import { stats } from '../data/product.js';

function FeatureMedia({ item }) {
  if (item.id === 'portable') {
    return (
      <div className="fmedia fmedia--studio">
        <ProductImage asset={assets.productSide} sizes="(max-width: 900px) 80vw, 40vw" className="fmedia__side" />
        <div className="fmedia__insets">
          <figure>
            <ProductImage asset={assets.productCase} sizes="(max-width: 900px) 40vw, 18vw" />
            <figcaption>Case</figcaption>
          </figure>
          <figure>
            <ProductImage asset={assets.productCharging} sizes="(max-width: 900px) 40vw, 18vw" />
            <figcaption>USB-C cable</figcaption>
          </figure>
        </div>
      </div>
    );
  }
  if (item.id === 'research') {
    return (
      <div className="fmedia fmedia--type">
        {stats.slice(0, 2).map((s) => (
          <p key={s.label} className="fmedia__stat">
            <span className="fmedia__num">
              {s.value}
              {s.suffix}
            </span>
            <span className="fmedia__cap">{s.label}</span>
          </p>
        ))}
        <p className="fmedia__link">Australian light science</p>
      </div>
    );
  }
  return (
    <div className={`fmedia fmedia--photo fmedia--${item.id}`}>
      <ProductImage asset={item.image} sizes="(max-width: 900px) 92vw, 46vw" />
    </div>
  );
}

export function FeaturesSection() {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(MQ.desktop, () => {
        const items = q('.feature');
        const idx = q('.findex li');
        const media = items.map((el) => el.querySelector('.fmedia'));
        const text = items.map((el) => el.querySelector('.feature__text'));
        const notes = items.map((el) => el.querySelectorAll('.note'));

        gsap.set(media.slice(1), { clipPath: 'inset(100% 0% 0% 0%)' });
        gsap.set(text.slice(1), { autoAlpha: 0, y: 40 });
        gsap.set(notes.slice(1).map((n) => [...n]).flat(), { autoAlpha: 0, x: 20 });
        gsap.set(idx.slice(1), { opacity: 0.62 });
        gsap.set(q('.findex__bar'), { scaleY: 1 / items.length, transformOrigin: 'top' });

        const tl = sceneTimeline(root.current);
        items.forEach((item, i) => {
          if (i === 0) return;
          const at = i * 2 - 0.6;
          tl.to(media[i], { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power2.inOut' }, at)
            .to(media[i - 1], { scale: 0.92, autoAlpha: 0.2, duration: 1.2, ease: 'power2.inOut' }, at)
            .fromTo(media[i].firstElementChild, { scale: 1.15 }, { scale: 1, duration: 1.6 }, at)
            .to(text[i - 1], { autoAlpha: 0, y: -40, duration: 0.6 }, at)
            .to(text[i], { autoAlpha: 1, y: 0, duration: 0.8 }, at + 0.5)
            .to(notes[i - 1], { autoAlpha: 0, duration: 0.4 }, at)
            .to(notes[i], { autoAlpha: 1, x: 0, stagger: 0.12, duration: 0.5 }, at + 0.7)
            .to(idx[i - 1], { opacity: 0.62, duration: 0.4 }, at + 0.3)
            .to(idx[i], { opacity: 1, duration: 0.4 }, at + 0.3)
            .to(q('.findex__bar'), { scaleY: (i + 1) / items.length, duration: 1 }, at)
            .to(root.current, { backgroundColor: features.items[i].tone, duration: 1.2 }, at);
        });
        tl.to({}, { duration: 1 });
      });

      mm.add(MQ.mobile, () => {
        maskReveal(q('.features__title')[0]);
        q('.feature').forEach((el) => fadeUp(el.querySelectorAll('.fmedia, .feature__text, .note'), { trigger: el }));
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="features" className="features scene" tabIndex={-1} aria-labelledby="features-title">
      <div className="scene__sticky features__sticky">
        <div className="features__head">
          <SectionLabel>{features.label}</SectionLabel>
          <SplitLines id="features-title" className="features__title headline" lines={features.headline} />
        </div>

        <ol className="findex" aria-hidden="true">
          <span className="findex__track">
            <span className="findex__bar" />
          </span>
          {features.items.map((f) => (
            <li key={f.id}>
              <span>{f.index}</span> {f.title}
            </li>
          ))}
        </ol>

        <div className="features__stage">
          {features.items.map((f) => (
            <article className={`feature feature--${f.id}`} key={f.id} aria-labelledby={`feature-${f.id}`}>
              <FeatureMedia item={f} />
              <div className="feature__text">
                <p className="feature__index">{f.index}</p>
                <h3 id={`feature-${f.id}`} className="feature__title">
                  {f.title}
                </h3>
                <p className="feature__body">{f.text}</p>
              </div>
              <ul className="feature__notes" aria-label={`${f.title} specifications`}>
                {f.notes.map((n) => (
                  <li className="note" key={n}>
                    {n}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
