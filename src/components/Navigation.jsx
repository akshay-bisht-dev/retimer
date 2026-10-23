import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ScrollTrigger, useGSAP } from '../animations/gsapConfig.js';
import { assets } from '../data/assets.js';
import { navLinks } from '../data/content.js';
import { links } from '../data/product.js';

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({ solid: false, hidden: false });
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  // Transparent over the hero, solid afterwards; tucks away while scrolling down.
  useGSAP(() => {
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const y = self.scroll();
        const solid = y > window.innerHeight * 0.6;
        const hidden = solid && self.direction === 1 && y > window.innerHeight;
        setState((s) => (s.solid === solid && s.hidden === hidden ? s : { solid, hidden }));
      },
    });
  });

  useEffect(() => {
    if (!open) return undefined;
    const first = menuRef.current?.querySelector('a');
    first?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    document.documentElement.classList.add('menu-open');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.classList.remove('menu-open');
    };
  }, [open]);

  const cls = ['nav', state.solid && 'nav--solid', state.hidden && !open && 'nav--hidden', open && 'nav--open']
    .filter(Boolean)
    .join(' ');

  return (
    <header className={cls}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <nav className="nav__inner" aria-label="Primary">
        <a href="#top" className="nav__logo" aria-label="retimer — back to top">
          <img src={assets.brandLogo.src} width="104" height="22" alt="retimer" />
        </a>
        <ul className="nav__links">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
        <a className="nav__cta" href={links.product}>
          Buy retimer 3
        </a>
        <button
          ref={toggleRef}
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        </button>
      </nav>
      <div id="mobile-menu" ref={menuRef} className="menu" hidden={!open}>
        <ul>
          {navLinks.map((l, i) => (
            <li key={l.href} style={{ '--i': i }}>
              <a href={l.href} onClick={() => setOpen(false)}>
                <span className="menu__index">0{i + 1}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a className="btn btn--solid menu__cta" href={links.product}>
          <span className="btn__label">Buy retimer 3</span>
        </a>
      </div>
    </header>
  );
}
