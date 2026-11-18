import { animate } from './motion.js';

export function mountLanguageMenu(trigger, menu, select) {
  const items = [...menu.querySelectorAll('[data-language]')];
  let opened = false;
  let animation;
  function sync() { for (const item of items) item.setAttribute('aria-checked', String(item.dataset.language === select.value)); }
  function close(restoreFocus = false) {
    if (!opened) return;
    opened = false;
    trigger.setAttribute('aria-expanded', 'false');
    if (restoreFocus) trigger.focus({ preventScroll: true });
    menu.inert = true;
    const style = getComputedStyle(menu);
    const start = { opacity: style.opacity, transform: style.transform };
    animation?.cancel();
    const finish = () => { menu.hidden = true; animation = null; };
    animation = animate(menu, [start, { opacity: 0, transform: 'translateY(-4px)' }]);
    if (animation) animation.onfinish = finish; else finish();
  }
  function open(last = false) {
    if (opened) return;
    opened = true;
    animation?.cancel();
    menu.hidden = false;
    menu.inert = false;
    trigger.setAttribute('aria-expanded', 'true');
    sync();
    (last ? items.at(-1) : items.find(item => item.dataset.language === select.value) ?? items[0]).focus({ preventScroll: true });
    animation = animate(menu, [{ opacity: 0, transform: 'translateY(-4px)' }, { opacity: 1, transform: 'none' }]);
  }
  trigger.addEventListener('click', () => opened ? close(true) : open());
  trigger.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); open(event.key === 'ArrowUp'); }
  });
  menu.addEventListener('click', event => {
    const item = event.target.closest('[data-language]');
    if (!item) return;
    close(true);
    if (select.value !== item.dataset.language) { select.value = item.dataset.language; select.dispatchEvent(new Event('change', { bubbles: true })); }
  });
  menu.addEventListener('keydown', event => {
    const index = items.indexOf(document.activeElement);
    if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); close(true); }
    else if (event.key === 'Tab') close(true);
    else if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      const next = { ArrowDown: (index + 1) % items.length, ArrowUp: (index + items.length - 1) % items.length, Home: 0, End: items.length - 1 }[event.key];
      items[next].focus();
    } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      const item = items.find(item => item.textContent.trim().toLocaleLowerCase().startsWith(event.key.toLocaleLowerCase()));
      if (item) { event.preventDefault(); item.focus(); }
    }
  });
  document.addEventListener('pointerdown', event => { if (opened && !menu.contains(event.target) && !trigger.contains(event.target)) close(); });
  document.addEventListener('focusin', event => { if (opened && !menu.contains(event.target) && !trigger.contains(event.target)) close(); });
  select.addEventListener('change', sync);
  sync();
  return { sync, close };
}
