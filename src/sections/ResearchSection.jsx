import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap, useGSAP } from '../animations/gsapConfig.js';
import { MQ } from '../animations/motionPreferences.js';
import { countUp, fadeUp, maskReveal } from '../animations/scrollAnimations.js';
import { PrimaryButton } from '../components/PrimaryButton.jsx';
import { SectionLabel } from '../components/SectionLabel.jsx';
import { SplitLines } from '../components/SplitLines.jsx';
import { research } from '../data/content.js';
import { links, product, stats, studies, testimonials } from '../data/product.js';

const fmt = new Intl.NumberFormat('en-AU');

export function ResearchSection() {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(`${MQ.desktop}, ${MQ.mobile}`, () => {
        // the page brightens as the evidence comes into view
        gsap.fromTo(
          root.current,
          { '--lit': 0 },
          { '--lit': 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top 90%', end: 'top 20%', scrub: true } },
        );
        maskReveal(q('.research__title')[0]);
        fadeUp(q('.research__intro'));
        q('.stat__num').forEach((el) => countUp(el));
        fadeUp(q('.stat'), { stagger: 0.12 });
        fadeUp(q('.study'), { stagger: 0.08 });
        fadeUp(q('.quote'), { stagger: 0.15 });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="research" className="research" tabIndex={-1} aria-labelledby="research-title">
      <div className="container">
        <div className="research__head">
          <SectionLabel>{research.label}</SectionLabel>
          <SplitLines id="research-title" className="research__title headline" lines={research.headline} />
          <p className="research__intro">{research.intro}</p>
        </div>

        <dl className="stats">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <dt className="stat__label">{s.label}</dt>
              <dd className="stat__num" data-value={s.value} data-suffix={s.suffix}>
                {fmt.format(s.value)}
                {s.suffix}
              </dd>
            </div>
          ))}
        </dl>
        <p className="research__source">
          Figures as published on retimer.com.au, verified {product.verifiedOn}.
        </p>

        <div className="research__grid">
          <div>
            <h3 className="research__sub">{research.studiesHeading}</h3>
            <ul className="studies">
              {studies.map((s) => (
                <li className="study" key={s.url}>
                  <a href={s.url}>
                    <span className="study__year">{s.year}</span>
                    <span className="study__title">{s.title}</span>
                    <span className="study__authors">{s.authors}</span>
                    <ArrowUpRight className="study__icon" size={18} strokeWidth={1.5} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="research__note">{research.note}</p>
            <PrimaryButton href={links.research} variant="dark" external>
              All research papers
            </PrimaryButton>
          </div>

          <div className="quotes">
            <h3 className="research__sub">In their words</h3>
            {testimonials.map((t) => (
              <figure className="quote" key={t.name}>
                <blockquote>“{t.quote}”</blockquote>
                <figcaption>
                  <strong>{t.name}</strong> · {t.role}
                </figcaption>
              </figure>
            ))}
            <p className="research__note">Testimonials as published on the retimer homepage.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
