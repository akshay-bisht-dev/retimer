import { gsap, EASE } from './gsapConfig.js';

// Opening film: black → ambient light → product focus → headline → copy → CTAs → scroll cue.
export function heroIntro(q) {
  const tl = gsap.timeline({ defaults: { ease: EASE.out } });
  tl.fromTo(q('.hero__veil'), { autoAlpha: 1 }, { autoAlpha: 0, duration: 1, ease: EASE.soft })
    .from(q('.hero__ambient'), { autoAlpha: 0, scale: 0.6, duration: 2, ease: EASE.soft }, 0.1)
    .from(q('.hero__beam'), { scaleX: 0, autoAlpha: 0, duration: 1.6, ease: EASE.expo }, 0.4)
    // the product is painted from the first frame (under the veil) and pulled into focus
    .from(q('.hero__product'), { scale: 1.08, filter: 'blur(18px) brightness(0.25)', duration: 2 }, 0.2)
    .from(q('.hero__emit'), { autoAlpha: 0, duration: 1.4 }, 1.1)
    .from(q('.hero__eyebrow'), { autoAlpha: 0, y: 12, duration: 0.8 }, 0.8)
    .from(q('.hero__title .line__inner'), { yPercent: 115, duration: 1.2, ease: EASE.expo, stagger: 0.12 }, 0.9)
    .from(q('.hero__copy'), { autoAlpha: 0, y: 16, duration: 1 }, 1.4)
    .from(q('.hero__ctas > *'), { opacity: 0, y: 16, stagger: 0.1, duration: 0.9 }, 1.6)
    .from(q('.hero__cue'), { autoAlpha: 0, y: -8, duration: 0.8 }, 2.1)
    // Clear the filter so the scrubbed exit never fights it.
    .set(q('.hero__product'), { clearProps: 'filter' });
  return tl;
}

// Scroll-out: product lifts and recedes, copy drifts away at a different speed.
export function heroExit(section, q, { amount = 1 } = {}) {
  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
  });
  tl.to(q('.hero__product-wrap'), { yPercent: -18 * amount, scale: 0.9, autoAlpha: 0.25 }, 0)
    .to(q('.hero__text'), { yPercent: -30 * amount, autoAlpha: 0 }, 0)
    .to(q('.hero__ambient'), { scale: 1.4, autoAlpha: 0.2 }, 0)
    .to(q('.hero__cue'), { autoAlpha: 0, duration: 0.2 }, 0);
  return tl;
}
