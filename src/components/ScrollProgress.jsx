import { useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { gsap, ScrollTrigger, useGSAP } from '../animations/gsapConfig.js';
import { chapters } from '../data/content.js';

// Thin top progress bar + chapter rail (desktop) + back-to-top button.
export function ScrollProgress() {
  const barRef = useRef(null);
  const [active, setActive] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useGSAP(() => {
    const setScale = gsap.quickSetter(barRef.current, 'scaleX');
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        setScale(self.progress);
        const show = self.progress > 0.25;
        setShowTop((s) => (s === show ? s : show));
      },
    });
    chapters.forEach((c, i) => {
      const el = document.getElementById(c.id);
      if (!el) return;
      ScrollTrigger.create({
        trigger: el,
        start: 'top 50%',
        end: 'bottom 50%',
        onToggle: (self) => self.isActive && setActive(i),
      });
    });
  });

  return (
    <>
      <div className="progress" aria-hidden="true">
        <div ref={barRef} className="progress__bar" />
      </div>
      <nav className="rail" aria-label="Story chapters">
        <ol>
          {chapters.map((c, i) => (
            <li key={c.id}>
              <a href={`#${c.id}`} aria-current={i === active ? 'step' : undefined} className={i === active ? 'is-active' : ''}>
                <span className="rail__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="rail__label">{c.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <a href="#top" className={`to-top ${showTop ? 'is-visible' : ''}`} tabIndex={showTop ? 0 : -1} aria-hidden={!showTop}>
        <ArrowUp size={18} strokeWidth={1.75} aria-hidden="true" />
        <span className="sr-only">Back to top</span>
      </a>
    </>
  );
}
