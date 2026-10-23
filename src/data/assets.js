// Central asset manifest. To replace an image:
//   1. drop the new original into /assets-src
//   2. point its job in scripts/optimize-images.mjs at the file
//   3. run `npm run images`
// Sizes come from the generated imageSizes.json, so srcset stays in sync.
import sizes from './imageSizes.json';

const base = import.meta.env.BASE_URL;

function image(key, alt) {
  const s = sizes[key];
  if (!s) throw new Error(`Unknown image asset: ${key}`);
  const largest = s.widths[s.widths.length - 1];
  return {
    key,
    alt,
    src: `${base}img/${key}-${largest}.webp`,
    srcSet: s.widths.map((w) => `${base}img/${key}-${w}.webp ${w}w`).join(', '),
    width: s.width,
    height: s.height,
  };
}

export const assets = {
  heroProduct: image('hero-product', 'retimer 3 light therapy glasses in white, shown at a three-quarter angle'),
  productSide: image('product-side', 'retimer 3 glasses seen from the side, showing the slim arms and lower light bar'),
  featureLight: image('feature-light', 'A man wearing retimer 3 with soft blue-green light falling on his eyes from below'),
  featureWearable: image('feature-wearable', 'A man wearing retimer 3 in his kitchen, holding a smoothie'),
  productCase: image('product-case', 'The white retimer 3 case'),
  productCharging: image('product-charging', 'White USB-C charging cable'),
  productApp: image('product-app', 'The retimer app showing a sleep score, a light schedule and a regularity score'),
  lifestyleMorning: image('lifestyle-morning', 'A woman in a robe smiling at her phone while wearing retimer 3 during her morning routine'),
  lifestyleTravel: image('lifestyle-travel', 'A traveller wearing retimer 3 at a plane window as the sun sets over the clouds'),
  lifestyleEveryday: image('lifestyle-everyday', 'A woman reading a book with a mug of tea while wearing retimer 3'),
  problemNight: image('problem-night', 'A person asleep in a dim blue bedroom with retimer glasses on the bedside table'),
  problemScreens: image('problem-screens', 'Two people working late in front of bright trading screens'),
  problemDarkMorning: image('problem-dark-morning', 'A woman holding a warm mug beside a dark, snowy window'),
  problemSunrise: image('problem-sunrise', 'A traveller watching the sun rise over a harbour city'),
  brandLogo: image('brand-logo', 'retimer'),
};
