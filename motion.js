const refreshes = new WeakMap();
const disclosures = new WeakMap();
const detailsControls = new WeakMap();
const dialogAnimations = new WeakMap();
const scrolls = new WeakMap();

function duration() {
  return matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--motion'));
}

export function animate(element, frames) {
  const milliseconds = duration();
  return milliseconds && element.animate ? element.animate(frames, { duration: milliseconds, easing: 'cubic-bezier(.2,.7,.2,1)' }) : null;
}

export function scrollToTarget(target) {
  if (!target) return;
  const panel = target.closest('.paper-stage');
  if (!panel) { target.scrollIntoView({ block: 'center', behavior: 'instant' }); return; }
  const start = panel.scrollTop;
  const to = Math.max(0, Math.min(panel.scrollHeight - panel.clientHeight, start + target.getBoundingClientRect().top - panel.getBoundingClientRect().top - panel.clientHeight / 2));
  const milliseconds = duration();
  const token = {};
  scrolls.set(panel, token);
  if (!milliseconds) { panel.scrollTop = to; return; }
  const started = performance.now();
  const step = now => {
    if (scrolls.get(panel) !== token) return;
    const progress = Math.max(0, Math.min(1, (now - started) / milliseconds));
    panel.scrollTop = start + (to - start) * (1 - (1 - progress) ** 3);
    if (progress < 1) requestAnimationFrame(step);
    else scrolls.delete(panel);
  };
  requestAnimationFrame(step);
}

export function animateRefresh(element) {
  refreshes.get(element)?.cancel();
  const animation = animate(element, [{ opacity: .65, transform: 'translateY(4px)' }, { opacity: 1, transform: 'none' }]);
  if (animation) refreshes.set(element, animation);
}

export function setDisclosure(panel, open, { animated = true, settle } = {}) {
  const current = disclosures.get(panel);
  if (animated && current?.open === open) return;
  if (!current && panel.hidden === !open) { settle?.(); return; }
  const height = panel.hidden ? 0 : panel.getBoundingClientRect().height;
  const style = getComputedStyle(panel);
  const spacing = ['paddingTop', 'paddingBottom', 'marginTop', 'marginBottom'];
  const initial = Object.fromEntries(spacing.map(key => [key, panel.hidden ? '0px' : style[key]]));
  const opacity = panel.hidden ? 0 : style.opacity;
  current?.animation.cancel();
  panel.hidden = false;
  panel.inert = !open;
  const target = open ? panel.getBoundingClientRect().height : 0;
  const natural = getComputedStyle(panel);
  const final = Object.fromEntries(spacing.map(key => [key, open ? natural[key] : '0px']));
  panel.dataset.disclosing = '';
  const finish = () => {
    panel.hidden = !open;
    delete panel.dataset.disclosing;
    disclosures.delete(panel);
    settle?.();
  };
  const animation = animated && animate(panel, [{ ...initial, height: `${height}px`, opacity }, { ...final, height: `${target}px`, opacity: open ? 1 : 0 }]);
  if (animation) { disclosures.set(panel, { open, animation }); animation.onfinish = finish; }
  else finish();
}

export function setDetailsOpen(details, expanded, { animated = true } = {}) {
  const control = detailsControls.get(details);
  if (control) control(expanded, animated);
  else details.open = expanded;
}

export function mountDetails(root = document) {
  for (const details of root.querySelectorAll('details')) {
    if (detailsControls.has(details)) continue;
    const summary = details.querySelector(':scope > summary');
    const panel = document.createElement('div');
    panel.className = 'details-panel';
    for (const child of [...details.children]) if (child !== summary) panel.append(child);
    let open = details.open;
    panel.hidden = !open;
    details.append(panel);
    summary.setAttribute('aria-expanded', String(open));
    const set = (expanded, animated = true) => {
      open = expanded;
      details.open = true;
      summary.setAttribute('aria-expanded', String(open));
      setDisclosure(panel, open, { animated, settle: () => { details.open = open; } });
    };
    detailsControls.set(details, set);
    summary.addEventListener('click', event => { event.preventDefault(); set(!open); });
    details.addEventListener('toggle', () => {
      if (details.open !== open && !disclosures.has(panel)) set(details.open);
    });
  }
}

export function openDialog(dialog) {
  const wasOpen = dialog.open;
  const style = wasOpen ? getComputedStyle(dialog) : null;
  dialogAnimations.get(dialog)?.cancel();
  dialog.classList.remove('is-closing');
  if (!wasOpen) dialog.showModal();
  const animation = animate(dialog, [{ opacity: style?.opacity ?? 0, transform: style?.transform ?? 'translateY(7px)' }, { opacity: 1, transform: 'none' }]);
  if (animation) dialogAnimations.set(dialog, animation);
}

export function closeDialog(dialog, afterClose) {
  if (!dialog.open || dialog.classList.contains('is-closing')) return;
  const style = getComputedStyle(dialog);
  const start = { opacity: style.opacity, transform: style.transform };
  dialogAnimations.get(dialog)?.cancel();
  dialog.classList.add('is-closing');
  const finish = () => { dialog.close(); dialog.classList.remove('is-closing'); dialogAnimations.delete(dialog); afterClose?.(); };
  const animation = animate(dialog, [start, { opacity: 0, transform: 'translateY(7px)' }]);
  if (animation) { dialogAnimations.set(dialog, animation); animation.onfinish = finish; }
  else finish();
}

export function mountDialogs() {
  for (const dialog of document.querySelectorAll('dialog:not([data-of-v4v])')) {
    dialog.addEventListener('cancel', event => { event.preventDefault(); closeDialog(dialog); });
    dialog.addEventListener('submit', event => { if (event.target.method === 'dialog') { event.preventDefault(); closeDialog(dialog); } });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const box = dialog.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) closeDialog(dialog);
    });
  }
}
