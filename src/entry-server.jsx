// Build-time prerender entry: renders the page to static HTML (see scripts/prerender.mjs).
import { renderToString } from 'react-dom/server';
import App from './App.jsx';

export function render() {
  return renderToString(<App />);
}
