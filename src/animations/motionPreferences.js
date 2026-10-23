// Media-query conditions shared by every gsap.matchMedia() block.
// Animations only run inside `desktop` / `mobile`; with reduced motion the
// CSS fallback (styles/animations.css) shows every scene in its final state.
export const MQ = {
  desktop: '(min-width: 900px) and (prefers-reduced-motion: no-preference)',
  mobile: '(max-width: 899.98px) and (prefers-reduced-motion: no-preference)',
  reduce: '(prefers-reduced-motion: reduce)',
};

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia(MQ.reduce).matches;

export const hasFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
