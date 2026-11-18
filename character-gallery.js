import { characters } from './content/characters.js';
import { animateRefresh } from './motion.js';

const make = (tag, text, className) => {
  const node = document.createElement(tag);
  if (text) node.textContent = text;
  if (className) node.className = className;
  return node;
};
const media = matchMedia('(prefers-color-scheme: dark)');
let storedTheme;
try { storedTheme = localStorage.getItem('sentit-theme'); } catch { /* Use the system theme. */ }
function theme() {
  const dark = (storedTheme ?? (media.matches ? 'dark' : 'light')) === 'dark';
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  document.querySelector('[name="theme-color"]').content = dark ? '#131f1b' : '#f7f5ee';
  const button = document.getElementById('theme');
  button.setAttribute('aria-pressed', String(dark));
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

const grid = document.getElementById('character-grid');
const index = document.getElementById('character-index');
const panel = document.querySelector('.character-main');
for (const type of ['wheel', 'touchstart', 'pointerdown']) {
  panel.addEventListener(type, () => { panel.scrollAnimation = undefined; }, { passive: true });
}
for (const character of characters) {
  const link = make('a', character.name); link.href = '#' + character.id; index.append(link);
  const card = make('article', undefined, 'character-card'); card.id = character.id; card.tabIndex = -1;
  const heading = make('header', undefined, 'character-heading');
  const title = make('div'); title.append(make('h2', character.name), make('p', character.role, 'character-role'));
  const badge = make('div', undefined, 'voice-badge' + (character.voice.status === 'candidate' ? ' is-candidate' : ''));
  badge.append(make('strong', character.voice.id), make('small', character.voice.status === 'heard' ? 'Veu escoltada' : 'Proposta · pendent de prova'));
  heading.append(title, badge);
  const sheet = make('a', undefined, 'character-sheet'); sheet.href = character.modelSheet;
  sheet.setAttribute('aria-label', 'Obre la fitxa gràfica de ' + character.name);
  const image = make('img'); Object.assign(image, { src: character.previewSheet, alt: character.name + ': vistes de davant, de perfil, de darrere i de tres quarts, i expressions de cara.', width: 1536, height: 1024, loading: 'lazy', decoding: 'async' }); sheet.append(image);
  const copy = make('div', undefined, 'character-copy');
  for (const [label, text] of [['Com és', character.personality], ['Què li interessa', character.interests], ['Com parla', character.delivery]]) {
    const p = make('p'); p.append(make('strong', label + '. '), document.createTextNode(text)); copy.append(p);
  }
  const stories = make('div', undefined, 'character-story-links');
  for (const appearance of character.appearances) {
    const a = make('a', appearance.code); a.href = './#lectura=' + appearance.code; stories.append(a);
  }
  copy.append(stories, make('p', 'La imatge obre la fitxa completa en PNG.', 'small'));
  const note = character.appearances.find(appearance => appearance.note);
  if (note) copy.append(make('p', note.note, 'small'));
  card.append(heading, sheet, copy); grid.append(card);
}
index.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link) return;
  const target = document.getElementById(link.hash.slice(1));
  if (!target) return;
  event.preventDefault();
  const start = panel.scrollTop;
  const to = start + target.getBoundingClientRect().top - panel.getBoundingClientRect().top - 15;
  const duration = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--motion'));
  const began = performance.now();
  const token = {}; panel.scrollAnimation = token;
  const step = now => {
    if (panel.scrollAnimation !== token) return;
    const progress = duration ? Math.min(1, (now - began) / duration) : 1;
    panel.scrollTop = start + (to - start) * (1 - (1 - progress) ** 3);
    if (progress < 1) requestAnimationFrame(step);
    else target.focus({ preventScroll: true });
  };
  requestAnimationFrame(step);
  history.replaceState(null, '', link.hash);
  animateRefresh(target);
});
if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
