export function takeParts(entry, take) {
  return take.parts.map(id => id === 'introduction'
    ? { id, speaker: 'Presentació', text: entry.introduction }
    : entry.transcript.find(part => part.id === id && part.speaker));
}

export function renderGenerationPlan(root, entry, t) {
  const plan = entry?.generationPlan;
  root.hidden = !plan || Boolean(entry.audio);
  const content = root.querySelector('.generation-plan-content');
  content.replaceChildren();
  if (!plan || entry.audio) return;
  const node = (tag, text, parent = content, className) => {
    const element = document.createElement(tag); element.textContent = text;
    if (className) element.className = className;
    parent.append(element); return element;
  };
  const requests = plan.takes.reduce((sum, take) => sum + take.requests, 0);
  node('p', t('generationSummary')(plan.takes.length, requests), content, 'generation-summary');
  const list = node('ol', '');
  for (const take of plan.takes) {
    const item = node('li', '', list);
    const button = node('button', `${take.id} · ${take.label}`, item);
    button.type = 'button'; button.dataset.take = take.id;
    button.title = t('seeTake');
    const status = node('small', t('takeRequests')(take.requests), item);
    status.className = take.requests ? 'new-take' : 'reused-take';
    const speech = takeParts(entry, take).filter(Boolean);
    const first = speech[0]?.text.split(/\s+/).slice(0, 7).join(' ');
    const last = speech.at(-1)?.text.split(/\s+/).slice(-7).join(' ');
    const excerpt = node('p', `«${first}…» → «…${last}»`, item, 'take-excerpt'); excerpt.lang = entry.language;
    const note = node('p', take.note, item); note.lang = entry.language;
  }
  for (const cut of plan.localCuts ?? []) {
    const item=node('li','',list);
    const button=node('button',`${cut.id} · ${cut.label}`,item);button.type='button';button.dataset.take=cut.id;
    node('small',t('localCutNoRequest'),item,'reused-take');
    const note=node('p',cut.note,item);note.lang=entry.language;
  }
  const note = node('p', plan.note, content, 'generation-caveat'); note.lang = entry.language;
  node('p', t('generationEstimate'), content, 'generation-caveat');
}
