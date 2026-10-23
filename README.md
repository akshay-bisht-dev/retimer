# retimer — cinematic light therapy landing page

A scroll-driven product film for the **retimer 3** light therapy glasses, built with React, Vite, GSAP/ScrollTrigger and Lenis. It runs as nine chapters, from an opening shot to a final frame. Product content is verified against retimer.com.au, and every purchase link goes to the official store.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build + prerender → dist/
npm run preview    # serve dist/ locally
```

Node 20+ is required. The build uses Vite 8.

## The nine chapters

| # | Section (`src/sections/`) | What happens on scroll |
|---|---|---|
| 01 | `HeroSection` | Opens on black. Ambient cyan light and a beam appear, the product comes into focus, then a masked headline, CTAs and a scroll cue. |
| 02 | `ProblemSection` | Pinned. Four scenes crossfade with a slow push-in and clock captions, and the headline builds word by word. Lighting moves from night blue to sunrise. |
| 03 | `ProductRevealSection` | Pinned. A spotlight reveals the glasses (scaling 85% → 100%), the camera pushes into the light-delivery area, then pulls back to annotated details. |
| 04 | `LightScienceSection` | Pinned SVG diagram. A 24-hour dial, a 500 nm source, a beam, a signal with particles moving along its path (MotionPath), and a rhythm wave that aligns with day and night. Labelled as conceptual. |
| 05 | `FeaturesSection` | Pinned on desktop. Five features change through clip-path wipes, with an index rail and tone shifts. On mobile and with reduced motion it becomes a stacked editorial list. |
| 06 | `LifestyleSection` | Three full-height scenes (morning, journey, everyday) stacked with CSS sticky. Each new scene slides over the last as it recedes. |
| 07 | `ResearchSection` | The page brightens. Count-up stats, published studies with links, and verbatim testimonials. |
| 08 | `ProductPurchaseSection` | Product on a light plinth, plus price, highlights, specs, what's in the box and the health notice. CTAs go to retimer.com.au. |
| 09 | `FinalSection` | The glasses float in a cyan glow over a sunrise horizon, followed by the footer. |

## Architecture

```
src/
  animations/   gsapConfig.js (plugins, easing tokens), motionPreferences.js (matchMedia
                conditions), scrollAnimations.js (maskReveal, fadeUp, parallax,
                sceneTimeline, countUp), heroAnimations.js
  components/   Navigation, ScrollProgress (bar + chapter rail + back-to-top), Footer,
                PrimaryButton (magnetic CTA), SmoothScroll (Lenis ↔ GSAP ticker),
                ProductImage, SplitLines, SectionLabel
  data/         product.js (verified facts + sources), content.js (all copy),
                assets.js (asset manifest), imageSizes.json (generated)
  hooks/        useReducedMotion.js
  sections/     one file per chapter
  styles/       globals, typography, layout, sections, animations (+ reduced-motion fallbacks)
  entry-server.jsx   build-time prerender entry
scripts/
  optimize-images.mjs   assets-src/ → responsive WebP in public/img/
  prerender.mjs         injects server-rendered HTML into dist/index.html
```

### Animation system

- Each chapter builds its own timeline inside `useGSAP()` and `gsap.matchMedia()`, so ScrollTriggers are reverted on unmount and on breakpoint changes.
- Pinned chapters use a tall `.scene` with a CSS-sticky `.scene__sticky` stage and a scrubbed `sceneTimeline()`, rather than ScrollTrigger pinning. This keeps them stable with Lenis and on mobile Safari.
- Lenis is driven by GSAP's ticker. Anchor links use smooth scrolling, push the hash to history and move focus to the target. Lenis is off when reduced motion is on, and touch devices keep native scrolling.
- `ScrollTrigger.refresh()` runs again after fonts and images load.

### Reduced motion

With `prefers-reduced-motion: reduce`, no scroll timelines are created and Lenis is off. `styles/animations.css` lays out every chapter in its final state in normal reading order: chapter 02 becomes a captioned grid, the reveal annotations become a list, and all five science steps sit beside the finished diagram.

### Prerendering

`npm run build` does three things:

1. Builds the client bundle.
2. Builds `src/entry-server.jsx` for SSR.
3. Writes the rendered page into `dist/index.html`.

The client hydrates that HTML. The copy is therefore crawlable and the hero paints before JavaScript runs. In dev the page renders client-side only.

## Replacing assets

All images are listed in `src/data/assets.js`, which holds the key, alt text and responsive `srcSet`.

1. Put the new original in `assets-src/`.
2. Point its job in `scripts/optimize-images.mjs` at that file. Jobs can `crop` (used to remove marketing text baked into some official images) or `trim` (for transparent cut-outs).
3. Run `npm run images`. This writes WebP files to `public/img/` and updates `src/data/imageSizes.json`.

| Key | Source on retimer.com.au | Used in |
|---|---|---|
| `hero-product` | `/wp-content/uploads/2024/10/retimer_3.png` (transparent) | 01, 03, 08, 09 |
| `product-side` | `/2025/12/image-7-…png` | 05 portability |
| `feature-light` | `/2024/11/1000x1000.png` (text cropped out) | 05 |
| `feature-wearable` | `/2026/10/Cooking.png` | 05 |
| `product-case`, `product-charging` | `/2024/10/retimer_3_case.jpg`, `/2024/11/white-type-c-…png` | 05 |
| `product-app` | `/2026/06/retimer-3-app-1.png` | 05 |
| `lifestyle-morning / travel / everyday` | `/2026/10/Screen-Activity.png`, `Jet-lag.png`, `Winter-Blues.png` | 06 |
| `problem-*` | `/2026/10/Sleep.png`, `/2026/08/image-81.png`, `/2026/09/image.png`, `/2025/09/image-1.jpeg` | 02 |
| `brand-logo` | PNG embedded in `/2023/08/logo-main.svg` | nav, footer |

**Usage rights:** every image is official retimer imagery downloaded from retimer.com.au, and some of it is stock photography used on the retimer blog. Confirm usage rights with retimer before public deployment.

**Not available:** there is no official product video or multi-angle rotation sequence. Chapter 03 therefore uses spotlight, scale and camera-push moves on a single real photograph and does not fake a 3D rotation. No product imagery was AI-generated or altered beyond cropping.

## Verified product information

`src/data/product.js` records the source of every fact. Everything was checked on **23 October 2026**:

- **Model:** retimer 3. The `/product/re-timer/` URL is the older **Re-Timer (v2)** ($289), so CTAs point to `/product/retimer-3/`, with a small link to v2 in chapter 08.
- **Price:** $320.00. The store defaults to AUD and has a currency selector, so the page says "AUD, as listed on the official store" and leaves the final price to checkout.
- **Specs:** 36 g; blue-green 500–504 nm from 4 LEDs with a diffuser; up to 5.6 h battery; USB-C charging in under 2 h; 174 × 166 × 25 mm; LED life over 10,000 h; 1-year warranty.
- **Claims:** 25+ years of R&D, 20+ clinical studies and 200,000+ users, all attributed to retimer on the page. Four published studies link to retimer's research pages. Two testimonials are quoted verbatim from the homepage.
- **Not claimed:** safety certifications (IEC 62471 and TGA are listed on the spec page for v2 only), discounts or promo codes, delivery or stock promises.

Re-verify the price and claims before each release.

## Deployment

Live on GitHub Pages: **https://akshay-bisht-dev.github.io/retimer/** (served from the `gh-pages` branch).

To redeploy after changes:

```bash
npm run build:pages            # BASE_PATH=/retimer/ + SITE_URL, writes dist/ with .nojekyll
# then publish dist/ to the gh-pages branch, e.g.:
npx gh-pages -d dist --dotfiles
```

The output is static, so any host works (Netlify, Vercel, Cloudflare Pages, S3):

```bash
BASE_PATH=/ SITE_URL=https://your-domain.com/ npm run build
```

- `BASE_PATH` is the absolute path the site is served from. It defaults to `/`. GitHub project pages need `/retimer/`.
- `SITE_URL` adds `<link rel="canonical">` and `og:url`, and makes `og:image` absolute.
- `public/robots.txt` allows indexing. If this page should not compete with retimer.com.au in search, change it to `Disallow: /`.

## Quality checks (production build, local)

- Lighthouse, mobile: Performance 89–90, Accessibility 100, Best Practices 100, SEO 100 (LCP ~2.9 s, CLS 0).
- Lighthouse, desktop: Performance 99, Accessibility 100, Best Practices 100, SEO 100.
- No horizontal overflow and no console errors at 375, 390, 768, 1024, 1440, 1920 and 2560 px, or with reduced motion.
- All 17 external links return 200, and every in-page anchor resolves.
- Every link is reachable by keyboard. The mobile menu supports Escape and moves focus.

Scores were measured locally against `vite preview` and will vary by host and network.
