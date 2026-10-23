// Injects the server-rendered page into dist/index.html so content paints
// before JavaScript loads (faster FCP/LCP, crawlable copy). Run after both builds.
import { readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ssrEntry = pathToFileURL(path.resolve('.ssr/entry-server.js')).href;
const { render } = await import(ssrEntry);
const file = 'dist/index.html';
const html = await readFile(file, 'utf8');
if (!html.includes('<div id="root"></div>')) throw new Error('root placeholder not found in dist/index.html');
await writeFile(file, html.replace('<div id="root"></div>', `<div id="root">${render()}</div>`));
await rm('.ssr', { recursive: true, force: true });
console.log('prerendered dist/index.html');
