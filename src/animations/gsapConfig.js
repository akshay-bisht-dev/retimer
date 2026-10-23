import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, useGSAP);

// One easing vocabulary for the whole film.
export const EASE = {
  out: 'power3.out',
  inOut: 'power2.inOut',
  expo: 'expo.out',
  soft: 'sine.inOut',
};

export const DURATION = { fast: 0.6, base: 1, slow: 1.6 };

// Scrub smoothing for scroll-linked timelines (seconds of catch-up).
export const SCRUB = 0.8;

gsap.defaults({ ease: EASE.out, duration: DURATION.base });
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger, useGSAP };
