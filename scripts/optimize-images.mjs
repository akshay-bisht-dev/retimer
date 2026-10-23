// Converts the originals in /assets-src into responsive WebP files in /public/img
// and writes src/data/imageSizes.json (widths + intrinsic size per asset).
// Usage: npm run images
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'assets-src';
const OUT = 'public/img';

// name: output key used by src/data/assets.js
// crop: removes baked-in marketing text from some official images
// trim: strips transparent margins from product cut-outs
const JOBS = [
  { name: 'hero-product', file: 'hero-product.png', widths: [640, 1100, 1600], trim: true, quality: 86 },
  { name: 'product-side', file: 'product-side.png', widths: [480, 960], trim: true },
  { name: 'feature-light', file: 'product-detail-worn.png', widths: [500], crop: { left: 500, top: 0, width: 500, height: 1000 } },
  { name: 'feature-wearable', file: 'feature-wearable.png', widths: [540, 1080] },
  { name: 'product-case', file: 'product-case.jpg', widths: [400], crop: { left: 38, top: 0, width: 600, height: 600 } },
  { name: 'product-charging', file: 'product-charging.png', widths: [230] },
  { name: 'product-app', file: 'product-app.png', widths: [640, 1280], quality: 84 },
  { name: 'lifestyle-morning', file: 'lifestyle-morning.png', widths: [540, 1080] },
  { name: 'lifestyle-travel', file: 'lifestyle-travel.png', widths: [540, 1080] },
  { name: 'lifestyle-everyday', file: 'lifestyle-everyday.png', widths: [540, 1080] },
  { name: 'problem-night', file: 'problem-night.png', widths: [540, 1080] },
  { name: 'problem-screens', file: 'problem-screens.png', widths: [500, 1000] },
  { name: 'problem-dark-morning', file: 'problem-dark-morning.png', widths: [489, 978] },
  { name: 'problem-sunrise', file: 'problem-sunrise.png', widths: [500, 1000] },
  { name: 'brand-logo', file: 'brand-logo.png', widths: [417], lossless: true },
];

await mkdir(OUT, { recursive: true });
const sizes = {};

for (const job of JOBS) {
  let base = sharp(path.join(SRC, job.file));
  if (job.crop) base = base.extract(job.crop);
  if (job.trim) base = base.trim({ threshold: 1 });
  const buf = await base.toBuffer();
  const meta = await sharp(buf).metadata();
  const widths = job.widths.filter((w) => w <= meta.width);
  if (!widths.length) widths.push(meta.width);

  for (const w of widths) {
    await sharp(buf)
      .resize({ width: w, withoutEnlargement: true })
      .webp(job.lossless ? { lossless: true } : { quality: job.quality ?? 80, effort: 5 })
      .toFile(path.join(OUT, `${job.name}-${w}.webp`));
  }
  sizes[job.name] = { widths, width: meta.width, height: meta.height };
  console.log(`${job.name.padEnd(22)} ${meta.width}x${meta.height} -> ${widths.join(', ')}`);
}

await writeFile('src/data/imageSizes.json', JSON.stringify(sizes, null, 2) + '\n');
console.log('wrote src/data/imageSizes.json');
