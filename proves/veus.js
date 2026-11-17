const themeButton = document.getElementById('theme');
const media = matchMedia('(prefers-color-scheme: dark)');
let preference;
try { preference = localStorage.getItem('sentit-theme'); } catch { /* Use the device setting. */ }

function theme() {
  const dark = (preference ?? (media.matches ? 'dark' : 'light')) === 'dark';
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  themeButton.setAttribute('aria-pressed', String(dark));
  themeButton.setAttribute('aria-label', dark ? 'Tema clar' : 'Tema fosc');
  const shape = dark
    ? '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19m0-14-1.4 1.4M6.4 17.6 5 19"/>'
    : '<path d="M20.9 13.35A9 9 0 1 1 10.65 3.1a7 7 0 0 0 10.25 10.25Z"/>';
  themeButton.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">${shape}</svg>`;
}

themeButton.addEventListener('click', () => {
  preference = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('sentit-theme', preference); } catch { /* Keep the theme for this visit. */ }
  theme();
});
media.addEventListener('change', theme);
theme();

const players = document.querySelectorAll('audio');
for (const player of players) {
  player.addEventListener('play', () => {
    for (const other of players) if (other !== player) other.pause();
  });
}
