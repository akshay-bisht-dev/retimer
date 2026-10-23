import { useMemo, useRef } from 'react';
import { gsap, useGSAP } from '../animations/gsapConfig.js';
import { MQ } from '../animations/motionPreferences.js';
import { fadeUp, maskReveal, sceneTimeline } from '../animations/scrollAnimations.js';
import { SectionLabel } from '../components/SectionLabel.jsx';
import { SplitLines } from '../components/SplitLines.jsx';
import { science } from '../data/content.js';

// Geometry for the conceptual diagram (SVG user units).
const C = { x: 500, y: 290, r: 190 };
const SRC = { x: 70, y: 290 };
const WAVE = { x: 70, w: 680, mid: 625, amp: 46 };

function wavePath(phase) {
  let d = '';
  for (let i = 0; i <= 68; i += 1) {
    const x = WAVE.x + (WAVE.w * i) / 68;
    const y = WAVE.mid - WAVE.amp * Math.sin((2 * Math.PI * i) / 68 - Math.PI / 2 + phase);
    d += `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}

function polar(angleDeg, r) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return [C.x + r * Math.cos(a), C.y + r * Math.sin(a)];
}

function Diagram() {
  const ticks = useMemo(
    () =>
      Array.from({ length: 96 }, (_, i) => {
        const major = i % 4 === 0;
        const [x1, y1] = polar(i * 3.75, C.r + 14);
        const [x2, y2] = polar(i * 3.75, C.r + (major ? 30 : 20));
        return { x1, y1, x2, y2, major };
      }),
    [],
  );
  const hours = [0, 6, 12, 18].map((h) => {
    const [x, y] = polar(h * 15, C.r + 52);
    return { h, x, y };
  });
  const particles = useMemo(
    () => Array.from({ length: 40 }, (_, i) => ({ x: (i * 197) % 800, y: (i * 113) % 720, r: (i % 3) * 0.6 + 0.6 })),
    [],
  );
  const dayLen = 2 * Math.PI * (C.r - 34);

  return (
    <svg className="sci__svg" viewBox="0 0 800 720" role="img" aria-labelledby="sci-svg-title sci-svg-desc">
      <title id="sci-svg-title">Conceptual diagram of light and the body clock</title>
      <desc id="sci-svg-desc">
        A blue-green light source sends a signal toward a 24-hour clock dial. Below it, a daily rhythm wave moves
        from drifting out of step to aligning with day and night. Illustrative only.
      </desc>
      <defs>
        <radialGradient id="g-src" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#e6fbfc" />
          <stop offset="0.25" stopColor="#42c1c7" stopOpacity="0.9" />
          <stop offset="1" stopColor="#42c1c7" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="g-beam" x1="0" x2="1">
          <stop offset="0" stopColor="#42c1c7" stopOpacity="0.55" />
          <stop offset="1" stopColor="#42c1c7" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="g-core" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#42c1c7" stopOpacity="0.35" />
          <stop offset="1" stopColor="#42c1c7" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="g-day" x1="0" x2="1">
          <stop offset="0" stopColor="#ffb36b" stopOpacity="0" />
          <stop offset="0.5" stopColor="#ffc98f" stopOpacity="0.18" />
          <stop offset="1" stopColor="#ffb36b" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g className="sci__dust">
        {particles.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={p.r} />
        ))}
      </g>

      {/* light source + beam */}
      <polygon className="sci__beam" points={`${SRC.x},${SRC.y - 8} ${C.x - C.r},${C.y - 120} ${C.x - C.r},${C.y + 120} ${SRC.x},${SRC.y + 8}`} fill="url(#g-beam)" />
      <circle className="sci__src" cx={SRC.x} cy={SRC.y} r="46" fill="url(#g-src)" />
      <text className="sci__tag" x={SRC.x - 20} y={SRC.y + 74}>
        ~500 nm
      </text>

      {/* signal path toward the clock */}
      <path id="sci-signal" className="sci__signal" d={`M${SRC.x + 20} ${SRC.y} C ${SRC.x + 140} ${SRC.y - 70}, ${C.x - C.r - 90} ${C.y + 60}, ${C.x - 18} ${C.y}`} />
      <g className="sci__pulses">
        {Array.from({ length: 7 }, (_, i) => (
          <circle key={i} className="sci__pulse" r={i === 0 ? 5 : 3} cx="0" cy="0" />
        ))}
      </g>

      {/* the 24-hour dial */}
      <circle className="sci__core" cx={C.x} cy={C.y} r={C.r} fill="url(#g-core)" />
      <circle className="sci__ring" cx={C.x} cy={C.y} r={C.r} />
      <circle className="sci__night" cx={C.x} cy={C.y} r={C.r - 34} />
      <circle
        className="sci__day"
        cx={C.x}
        cy={C.y}
        r={C.r - 34}
        strokeDasharray={`${dayLen / 2} ${dayLen}`}
        transform={`rotate(0 ${C.x} ${C.y})`}
        style={{ '--len': dayLen / 2 }}
      />
      <g className="sci__ticks">
        {ticks.map((t, i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} className={t.major ? 'is-major' : ''} />
        ))}
      </g>
      {hours.map((h) => (
        <text key={h.h} className="sci__hour" x={h.x} y={h.y} textAnchor="middle" dominantBaseline="middle">
          {String(h.h).padStart(2, '0')}
        </text>
      ))}
      <line className="sci__hand" x1={C.x} y1={C.y} x2={C.x} y2={C.y - C.r + 46} />
      <circle className="sci__hub" cx={C.x} cy={C.y} r="6" />

      {/* daily rhythm timeline */}
      <g className="sci__timeline">
        <rect x={WAVE.x + WAVE.w * 0.25} y={WAVE.mid - 80} width={WAVE.w * 0.5} height="160" fill="url(#g-day)" />
        <line className="sci__axis" x1={WAVE.x} y1={WAVE.mid} x2={WAVE.x + WAVE.w} y2={WAVE.mid} />
        <path className="sci__wave sci__wave--drift" d={wavePath(1.9)} />
        <path className="sci__wave sci__wave--aligned" d={wavePath(0)} />
        {['00:00', '06:00', '12:00', '18:00', '24:00'].map((t, i) => (
          <text key={t} className="sci__time" x={WAVE.x + (WAVE.w * i) / 4} y={WAVE.mid + 92} textAnchor="middle">
            {t}
          </text>
        ))}
        <text className="sci__legend" x={WAVE.x} y={WAVE.mid - 92}>
          Alertness rhythm (illustrative)
        </text>
      </g>
    </svg>
  );
}

export function LightScienceSection() {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(`${MQ.desktop}, ${MQ.mobile}`, () => {
        maskReveal(q('.sci__title')[0]);
        fadeUp(q('.sci__intro'));
        const steps = q('.sci__step');
        const dots = q('.sci__dots li');
        const signal = q('.sci__signal')[0];
        const sigLen = signal.getTotalLength();
        const waves = q('.sci__wave--aligned');
        const waveLen = waves[0].getTotalLength();
        const day = q('.sci__day')[0];
        const dayHalf = Number(getComputedStyle(day).getPropertyValue('--len')) || 500;

        gsap.set(steps.slice(1), { autoAlpha: 0, y: 30 });
        gsap.set(q('.sci__ring, .sci__ticks, .sci__hour'), { opacity: 0.25 });
        gsap.set(q('.sci__core'), { opacity: 0 });
        gsap.set(q('.sci__src, .sci__tag'), { autoAlpha: 0, scale: 0.4, svgOrigin: '70 290' });
        gsap.set(q('.sci__beam'), { autoAlpha: 0, scaleX: 0, svgOrigin: '70 290' });
        gsap.set(signal, { strokeDasharray: sigLen, strokeDashoffset: sigLen });
        gsap.set(q('.sci__pulse'), { autoAlpha: 0 });
        gsap.set(q('.sci__timeline'), { autoAlpha: 0, y: 30 });
        gsap.set(waves, { strokeDasharray: waveLen, strokeDashoffset: waveLen });
        gsap.set(day, { strokeDashoffset: dayHalf });
        gsap.set(q('.sci__hand'), { rotation: 300, svgOrigin: '500 290' });

        const tl = sceneTimeline(q('.sci__scene')[0]);

        // Text panels: one per scene, 2 units each.
        steps.forEach((step, i) => {
          if (i === 0) return;
          tl.to(steps[i - 1], { autoAlpha: 0, y: -30, duration: 0.5 }, i * 2 - 0.3).to(
            step,
            { autoAlpha: 1, y: 0, duration: 0.6 },
            i * 2,
          );
        });
        dots.forEach((d, i) => tl.to(d, { '--fill': 1, duration: 0.4 }, i * 2));

        tl
          // scene 1 — a subdued internal clock, ticking through the night
          .to(q('.sci__hand'), { rotation: 390, duration: 6 }, 0)
          // scene 2 — a controlled beam of blue-green light
          .to(q('.sci__src, .sci__tag'), { autoAlpha: 1, scale: 1, duration: 1, ease: 'back.out(1.6)' }, 2)
          .to(q('.sci__beam'), { autoAlpha: 1, scaleX: 1, duration: 1.4, ease: 'power2.out' }, 2.4)
          // scene 3 — a simplified signal travels to the clock
          .to(signal, { strokeDashoffset: 0, duration: 1.4 }, 4)
          .to(q('.sci__beam'), { autoAlpha: 0.35, duration: 1 }, 4);
        q('.sci__pulse').forEach((p, i) => {
          tl.to(p, { autoAlpha: 1, duration: 0.1 }, 4.2 + i * 0.16)
            .to(p, { motionPath: { path: signal, align: signal, alignOrigin: [0.5, 0.5] }, duration: 1.3, ease: 'power1.inOut' }, 4.2 + i * 0.16)
            .to(p, { autoAlpha: 0, duration: 0.2 }, 5.4 + i * 0.16);
        });
        tl.to(q('.sci__ring, .sci__ticks, .sci__hour'), { opacity: 1, duration: 1 }, 5.2)
          .to(q('.sci__core'), { opacity: 1, duration: 1 }, 5.2)
          // scene 4 — day and night fall into step
          .to(q('.sci__hand'), { rotation: 450, duration: 2, ease: 'power2.inOut' }, 6)
          .to(day, { strokeDashoffset: 0, duration: 1.6 }, 6)
          .to(q('.sci__timeline'), { autoAlpha: 1, y: 0, duration: 0.8 }, 6)
          .to(q('.sci__wave--drift'), { opacity: 0.18, duration: 1.4 }, 6.8)
          .to(waves, { strokeDashoffset: 0, duration: 1.6 }, 6.6)
          .to(q('.sci__dawn'), { opacity: 1, duration: 3 }, 6)
          // scene 5 — settle on the summary
          .to(q('.sci__beam'), { autoAlpha: 0.15, duration: 1 }, 8)
          .to({}, { duration: 0.8 }, 9.4);

        // ambient drift, independent of scroll
        gsap.to(q('.sci__dust'), { y: -20, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="science" className="sci" tabIndex={-1} aria-labelledby="sci-title">
      <header className="sci__head container">
        <SectionLabel>{science.label}</SectionLabel>
        <SplitLines id="sci-title" className="sci__title display" lines={science.headline} />
        <p className="sci__intro lead">{science.copy}</p>
      </header>
      <div className="sci__scene scene">
        <div className="scene__sticky">
          <div className="sci__dawn" aria-hidden="true" />
          <div className="sci__layout container">
            <div className="sci__copy">
              <ol className="sci__steps">
                {science.steps.map((s) => (
                  <li className="sci__step" key={s.kicker}>
                    <p className="sci__kicker">{s.kicker}</p>
                    <h3 className="sci__step-title">{s.title}</h3>
                    <p className="sci__step-text">{s.text}</p>
                  </li>
                ))}
              </ol>
              <ol className="sci__dots" aria-hidden="true">
                {science.steps.map((s) => (
                  <li key={s.kicker} />
                ))}
              </ol>
            </div>
            <figure className="sci__figure">
              <Diagram />
              <figcaption className="sci__disclaimer">{science.disclaimer}</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
