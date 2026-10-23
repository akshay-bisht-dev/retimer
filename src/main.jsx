import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource-variable/inter';
import '@fontsource-variable/space-grotesk';
import './styles/globals.css';
import './styles/typography.css';
import './styles/layout.css';
import './styles/sections.css';
import './styles/animations.css';
import App from './App.jsx';

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

const root = document.getElementById('root');
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);
// Production HTML is prerendered (scripts/prerender.mjs); dev renders from scratch.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
