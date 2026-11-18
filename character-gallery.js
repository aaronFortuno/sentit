import { activities } from './catalogue.js';
import { strings } from './locales.js';
import { mountCharacterExplorer } from './character-explorer.js';

let language = 'ca';
let storedTheme;
try {
  language = localStorage.getItem('sentit-lang') === 'es' ? 'es' : 'ca';
  storedTheme = localStorage.getItem('sentit-theme');
} catch { /* Use defaults without storage. */ }
const t = key => strings[language][key];
document.documentElement.lang = language;
document.title = t('meetCharacters') + ' · Sentit';
for (const node of document.querySelectorAll('[data-t]')) node.textContent = t(node.dataset.t);
const media = matchMedia('(prefers-color-scheme: dark)');
function theme() {
  const dark = (storedTheme ?? (media.matches ? 'dark' : 'light')) === 'dark';
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  document.querySelector('[name="theme-color"]').content = dark ? '#131f1b' : '#f7f5ee';
  const button = document.getElementById('theme');
  button.setAttribute('aria-pressed', String(dark));
  button.setAttribute('aria-label', t('theme'));
  button.querySelector('svg').innerHTML = dark
    ? '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19m0-14-1.4 1.4M6.4 17.6 5 19"/>'
    : '<path d="M20.9 13.35A9 9 0 1 1 10.65 3.1a7 7 0 0 0 10.25 10.25Z"/>';
}
theme();
media.addEventListener('change', theme);
document.getElementById('theme').addEventListener('click', () => {
  storedTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('sentit-theme', storedTheme); } catch { /* Usable without storage. */ }
  theme();
});
mountCharacterExplorer(document.getElementById('page-character-explorer'), {
  activities, t, initialId: location.hash.slice(1),
  onSelect(id) { history.replaceState(null, '', '#' + id); },
  onBrowse(id) { location.href = './?personatge=' + encodeURIComponent(id); },
  onOpen(entry) { location.href = './#lectura=' + encodeURIComponent(`${entry.language}-${entry.code}`); },
});
