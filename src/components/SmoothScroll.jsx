import { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../animations/gsapConfig.js';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

const ScrollContext = createContext({ scrollTo: () => {} });
export const useSmoothScroll = () => useContext(ScrollContext);

// Lenis driven by GSAP's ticker so ScrollTrigger and smooth scroll share one clock.
// Disabled entirely for reduced motion; touch devices keep native scrolling.
export function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, syncTouch: false });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  // Anchor navigation: smooth scroll, keep the URL hash in history, move focus.
  const scrollTo = (hash) => {
    const target = document.querySelector(hash);
    if (!target) return;
    const toTop = hash === '#top';
    const done = () => target.focus({ preventScroll: true });
    if (window.location.hash !== hash) history.pushState(null, '', hash);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(toTop ? 0 : target, { onComplete: done });
    } else {
      if (toTop) window.scrollTo(0, 0);
      else target.scrollIntoView();
      done();
    }
  };

  const scrollToRef = useRef(scrollTo);
  scrollToRef.current = scrollTo;

  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = e.target.closest('a[href^="#"]');
      const hash = a?.getAttribute('href');
      if (!hash || hash.length < 2) return;
      e.preventDefault();
      scrollToRef.current(hash);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return <ScrollContext.Provider value={{ scrollTo }}>{children}</ScrollContext.Provider>;
}
