import { assets } from '../data/assets.js';
import { healthNotice } from '../data/content.js';
import { links, product } from '../data/product.js';

const groups = [
  {
    title: 'Product',
    items: [
      { label: 'retimer 3', href: links.productOverview },
      { label: 'Technical specifications', href: links.specs },
      { label: 'User manual', href: links.manual },
    ],
  },
  {
    title: 'Learn',
    items: [
      { label: 'About', href: links.about },
      { label: 'Research', href: links.research },
      { label: 'FAQs', href: links.faqs },
    ],
  },
  {
    title: 'Support',
    items: [
      { label: 'Contact', href: links.contact },
      { label: 'Returns & refunds', href: links.returns },
      { label: 'App Store', href: links.appStore },
      { label: 'Google Play', href: links.googlePlay },
    ],
  },
  {
    title: 'Legal',
    items: [
      { label: 'Privacy policy', href: links.privacy },
      { label: 'Terms and conditions', href: links.terms },
    ],
  },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <a href={links.site} className="footer__logo">
          <img src={assets.brandLogo.src} width="140" height="30" alt="retimer" loading="lazy" />
        </a>
        <p className="footer__tag">Rest. Reset. Renew.</p>
      </div>
      <div className="footer__grid">
        {groups.map((g) => (
          <div key={g.title}>
            <h3 className="footer__title">{g.title}</h3>
            <ul>
              {g.items.map((i) => (
                <li key={i.label}>
                  <a href={i.href}>{i.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="footer__notice">{healthNotice}</p>
      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Re-Time Pty Ltd · Lonsdale, South Australia</p>
        <p>Product details verified against retimer.com.au on {product.verifiedOn}.</p>
      </div>
    </footer>
  );
}
