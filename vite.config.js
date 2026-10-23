import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Absolute URL of the deployed page, e.g. SITE_URL=https://example.com/retimer/ npm run build
// When set, it adds <link rel="canonical"> and og:url and makes og:image absolute.
const SITE_URL = (process.env.SITE_URL || '').replace(/\/?$/, process.env.SITE_URL ? '/' : '');

function siteUrl() {
  return {
    name: 'site-url',
    transformIndexHtml(html) {
      const out = html.replaceAll('__SITE_URL__', SITE_URL || './');
      if (!SITE_URL) return out;
      return out.replace(
        '</title>',
        `</title>\n    <link rel="canonical" href="${SITE_URL}" />\n    <meta property="og:url" content="${SITE_URL}" />`,
      );
    },
  };
}

// base './' keeps asset paths relative so the build works from any subpath
// (GitHub Pages, a CDN folder, or a domain root).
export default defineConfig({
  base: './',
  plugins: [react(), siteUrl()],
  // Listen on IPv4 and IPv6 so http://localhost and http://127.0.0.1 both work
  // (and phones on the same network can open the LAN URL).
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/gsap') || id.includes('node_modules/lenis')) return 'motion';
          if (id.includes('node_modules/react')) return 'react';
        },
      },
    },
  },
});
