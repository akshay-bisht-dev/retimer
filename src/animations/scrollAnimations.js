// Reusable scroll animation helpers. Call them inside a useGSAP/matchMedia
// scope so they are reverted automatically on unmount or breakpoint change.
import { gsap, EASE, SCRUB } from './gsapConfig.js';

const toArray = (t) => gsap.utils.toArray(t);

// Masked line reveal: expects .line > .line__inner markup (see components/SplitLines).
export function maskReveal(container, { trigger, start = 'top 80%', delay = 0, stagger = 0.1 } = {}) {
  const inners = toArray(container.querySelectorAll ? container.querySelectorAll('.line__inner') : container);
  return gsap.from(inners, {
    yPercent: 110,
    duration: 1.2,
    ease: EASE.expo,
    stagger,
    delay,
    scrollTrigger: trigger === false ? undefined : { trigger: trigger || container, start, once: true },
  });
}

// Simple fade-up entrance, toggled once when the element enters.
// Uses opacity (not autoAlpha) so links inside stay reachable by keyboard
// before the reveal fires; focusing one scrolls it into view and triggers it.
export function fadeUp(targets, { trigger, start = 'top 85%', y = 32, stagger = 0.08, delay = 0 } = {}) {
  const els = toArray(targets);
  if (!els.length) return null;
  return gsap.from(els, {
    opacity: 0,
    y,
    duration: 1,
    stagger,
    delay,
    scrollTrigger: { trigger: trigger || els[0], start, once: true },
  });
}

// Scroll-linked depth: moves an element against the scroll direction.
export function parallax(target, { trigger, amount = 80, start = 'top bottom', end = 'bottom top' } = {}) {
  return gsap.fromTo(
    target,
    { y: -amount / 2 },
    { y: amount / 2, ease: 'none', scrollTrigger: { trigger: trigger || target, start, end, scrub: true } },
  );
}

// Scrubbed timeline bound to a tall "scene" section with a sticky stage.
export function sceneTimeline(section, vars = {}) {
  return gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: SCRUB, ...vars },
  });
}

// Counts a number up once it enters the viewport.
export function countUp(el, { start = 'top 85%' } = {}) {
  const target = Number(el.dataset.value);
  const suffix = el.dataset.suffix || '';
  const fmt = new Intl.NumberFormat('en-AU');
  const state = { v: 0 };
  return gsap.to(state, {
    v: target,
    duration: 1.8,
    ease: EASE.out,
    scrollTrigger: { trigger: el, start, once: true },
    onUpdate: () => {
      el.textContent = fmt.format(Math.round(state.v)) + suffix;
    },
  });
}
