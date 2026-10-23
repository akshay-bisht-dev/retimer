import { useRef } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { gsap, useGSAP } from '../animations/gsapConfig.js';
import { hasFinePointer, prefersReducedMotion } from '../animations/motionPreferences.js';

// CTA link with a subtle magnetic pull on fine pointers.
// variant: 'solid' | 'ghost'. External links open the official site in the same tab.
export function PrimaryButton({ href, children, variant = 'solid', external = false, className = '', ...rest }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !hasFinePointer() || prefersReducedMotion()) return undefined;
      const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
      const move = (e) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.22);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
      };
      const leave = () => {
        xTo(0);
        yTo(0);
      };
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
      return () => {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerleave', leave);
      };
    },
    { scope: ref },
  );

  const Icon = external ? ArrowUpRight : ArrowRight;
  return (
    <a ref={ref} href={href} className={`btn btn--${variant} ${className}`} {...rest}>
      <span className="btn__label">{children}</span>
      <span className="btn__icon" aria-hidden="true">
        <Icon size={16} strokeWidth={1.75} />
      </span>
    </a>
  );
}
