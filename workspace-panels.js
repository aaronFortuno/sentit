// Both panels stay visible on desktop. Compact screens open one drawer at a time.
export function mountWorkspacePanels(root) {
  const compact = matchMedia('(max-width: 1199px)');
  const panels = [...root.querySelectorAll('.workspace-panel')];
  const launchers = [...root.querySelectorAll('[data-workspace-panel]')];
  let active = null;
  function render() {
    if (compact.matches && active) root.dataset.activePanel = active;
    else delete root.dataset.activePanel;
    for (const panel of panels) {
      const visible = !compact.matches || panel.id === `${active}-panel`;
      panel.inert = !visible;
      panel.setAttribute('aria-hidden', String(!visible));
    }
    for (const button of launchers) button.setAttribute('aria-expanded', String(!compact.matches || button.dataset.workspacePanel === active));
  }
  function close({ restoreFocus = false } = {}) {
    const previous = active;
    active = null;
    render();
    if (restoreFocus && previous) launchers.find(button => button.dataset.workspacePanel === previous)?.focus({ preventScroll: true });
  }
  for (const button of launchers) button.addEventListener('click', () => {
    active = active === button.dataset.workspacePanel ? null : button.dataset.workspacePanel;
    render();
  });
  for (const button of root.querySelectorAll('[data-close-workspace-panel]')) button.addEventListener('click', () => close({ restoreFocus: true }));
  root.querySelector('#back-catalog').addEventListener('click', () => close());
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || !active || event.defaultPrevented || document.querySelector('dialog[open]')) return;
    close({ restoreFocus: true });
    event.preventDefault();
  });
  compact.addEventListener('change', () => close());
  render();
}
