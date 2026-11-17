import { clockTime } from './session.js';

export const defaultFormat = { font: 'serif', size: 12, spacing: 4, leading: 1.35 };

const fontStacks = {
  serif: 'Georgia, serif',
  sans: 'Arial, sans-serif',
  verdana: 'Verdana, sans-serif',
};

export const maxLines = 12;

export function questionFormat(question, index, settings) {
  const id = question.id ?? String(index);
  const override = settings?.questions?.[id];
  const lines = override?.lines ?? question.lines ?? 1;
  return { id, included: override?.included ?? true, lines: Math.min(maxLines, Math.max(0, lines)) };
}

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function makeHeader(entry, labels, code, answerKey, listenUrl, session) {
  const head = element('header', 'paper-heading');
  const headerMain = element('div', 'paper-header-main');
  const top = element('div', 'paper-top');
  const brand = element('div', 'paper-brand');
  const logo = element('img');
  Object.assign(logo, { src: './assets/sentit.svg', alt: '', width: 25, height: 25 });
  const name = element('span', null, 'sentit');
  name.append(element('span', 'brand-dot', '.'));
  brand.append(logo, name);
  top.append(brand, element('span', 'paper-kind', answerKey ? labels.answers : labels.sheetTitle));
  if (code) {
    const badge = element('div', 'paper-class-code');
    badge.append(element('span', null, labels.classroomCode), element('strong', null, code));
    top.append(badge);
  }
  headerMain.append(top, element('h3', null, entry.title));
  if (entry.sample) headerMain.append(element('p', 'paper-caption', labels.sample));
  head.append(headerMain);
  if (listenUrl) {
    const listening = element('div', 'paper-listening');
    const details = element('div', 'paper-listening-details');
    details.append(element('span', 'paper-audio-url', listenUrl.replace(/^https:\/\//, '')));
    if (session) {
      const summary = element('ul', 'paper-session-summary');
      summary.append(element('li', null, labels.paperReading(clockTime(session.reading))));
      summary.append(element('li', null, labels.paperListens(session.listens, clockTime(entry.fragment.seconds))));
      if (session.listens > 1) summary.append(element('li', null, labels.paperInterval(clockTime(session.interval))));
      details.append(summary);
    }
    listening.append(details);
    if (typeof globalThis.qrcode === 'function') {
      const qr = globalThis.qrcode(0, 'M');
      qr.addData(listenUrl);
      qr.make();
      const link = element('a', 'paper-qr');
      link.href = listenUrl;
      link.setAttribute('aria-label', labels.listen);
      link.innerHTML = qr.createSvgTag(3, 12);
      listening.append(link);
    }
    head.append(listening);
  }
  return head;
}

function makeIdentity(labels) {
  const identity = element('div', 'paper-identity');
  for (const key of ['name', 'date']) {
    const line = element('span', null, labels[key]);
    line.append(element('i'));
    identity.append(line);
  }
  return identity;
}

function questionBlock(number, heading, parts) {
  const block = element('div', 'paper-block');
  if (heading) block.append(element('h4', 'paper-section-title', heading));
  const question = element('div', 'paper-question');
  question.append(element('b', 'paper-question-number', number ? `${number}.` : ''));
  const body = element('div');
  body.append(...parts);
  question.append(body);
  block.append(question);
  return block;
}

function questionTools(id, number, count, answerKey, labels) {
  const tools = element('div', 'paper-question-tools');
  tools.dataset.questionId = id;
  tools.lang = labels.language;
  const button = (action, text, label) => {
    const control = element('button', 'paper-question-tool', text);
    control.type = 'button';
    control.dataset.questionAction = action;
    control.setAttribute('aria-label', label);
    control.title = label;
    return control;
  };
  const toggle = button('toggle', '⋯', labels.questionOptions(number));
  toggle.setAttribute('aria-expanded', 'false');
  const actions = element('div', 'paper-question-actions');
  if (!answerKey) {
    const less = button('less', '−', labels.questionLess(number));
    const more = button('more', '+', labels.questionMore(number));
    less.disabled = count === 0;
    more.disabled = count >= maxLines;
    actions.append(less, element('span', 'paper-question-units', count), more);
  }
  actions.append(button('hide', '×', labels.questionHide(number)));
  tools.append(toggle, actions);
  return tools;
}

function transcriptBlock({ speaker, text }, heading) {
  const block = element('div', 'paper-block');
  if (heading) block.append(element('h4', 'paper-section-title', heading));
  const paragraph = element('p', 'paper-transcript');
  if (speaker) paragraph.append(element('strong', null, `${speaker} · `));
  paragraph.append(text);
  block.append(paragraph);
  return block;
}

export function renderWorksheet(container, entry, format, settings, { answerKey, labels, toolLabels = labels, listenUrl, session }) {
  const footers = [];
  let content;
  container.replaceChildren();
  container.lang = entry.language;
  container.style.setProperty('--sheet-font', fontStacks[format.font] ?? fontStacks.serif);
  container.style.setProperty('--sheet-size', `${format.size}pt`);
  container.style.setProperty('--sheet-leading', format.leading);
  container.style.setProperty('--sheet-spacing', `${format.spacing}mm`);

  function startPage() {
    const page = element('article', 'paper');
    content = element('div', 'paper-content');
    const footer = element('footer', 'paper-footer');
    footers.push(footer);
    page.append(content, footer);
    container.append(page);
  }

  function tryBlock(block) {
    content.append(block);
    if (block.getBoundingClientRect().bottom <= content.getBoundingClientRect().bottom - 2) return true;
    block.remove();
    return false;
  }

  function placeBlock(block, split) {
    if (tryBlock(block)) return;
    if (content.childElementCount) {
      startPage();
      if (tryBlock(block)) return;
    }
    if (split) split();
    else content.append(block);
  }

  // Split long individual prompts, answers and paragraphs at word boundaries.
  function placeText(text, makeBlock) {
    const words = text.match(/\S{1,80}\s*|\s+/gu) ?? [text];
    let start = 0;
    while (start < words.length) {
      let low = start + 1;
      let high = words.length;
      let end = start;
      while (low <= high) {
        const middle = Math.floor((low + high) / 2);
        const block = makeBlock(words.slice(start, middle).join(''), start === 0);
        if (tryBlock(block)) {
          block.remove();
          end = middle;
          low = middle + 1;
        } else high = middle - 1;
      }
      if (end === start && content.childElementCount) {
        startPage();
        continue;
      }
      end = Math.max(start + 1, end);
      content.append(makeBlock(words.slice(start, end).join(''), start === 0));
      start = end;
      if (start < words.length) startPage();
    }
  }

  startPage();
  content.append(makeHeader(entry, labels, settings?.code?.trim(), answerKey, listenUrl, session));
  if (!answerKey) {
    content.append(makeIdentity(labels), element('p', 'paper-instructions', labels.instructions));
  }

  let number = 0;
  entry.questions.forEach((question, index) => {
    const { id, included, lines } = questionFormat(question, index, settings);
    if (!included) return;
    const position = ++number;
    const heading = position === 1 ? labels.questions : '';
    const makePrompt = (text, first = true) => {
      const wrap = element('div', 'paper-prompt-wrap');
      wrap.append(element('p', 'paper-prompt', text));
      if (first) wrap.append(questionTools(id, position, lines, answerKey, toolLabels));
      return wrap;
    };
    const response = answerKey
      ? [element('p', 'paper-answer', question.answer ?? labels.noAnswer)]
      : Array.from({ length: lines }, () => element('div', 'write-line'));
    const block = questionBlock(position, heading, [makePrompt(question.prompt), ...response]);
    placeBlock(block, () => {
      placeText(question.prompt, (text, first) => questionBlock(first && position, first && heading, [makePrompt(text, first)]));
      if (answerKey) {
        placeText(question.answer ?? labels.noAnswer, text => questionBlock(null, '', [element('p', 'paper-answer', text)]));
      } else {
        for (const line of response) placeBlock(questionBlock(null, '', [line]));
      }
    });
  });

  if (answerKey) {
    const transcript = entry.transcript ?? [];
    const parts = entry.introduction
      ? [{ speaker: labels.introduction, text: entry.introduction }, ...transcript]
      : transcript;
    parts.forEach((part, index) => {
      const heading = index === 0 ? labels.transcript : '';
      placeBlock(transcriptBlock(part, heading), () => {
        placeText(part.text, (text, first) => transcriptBlock({ text, speaker: first && part.speaker }, first && heading));
      });
    });
  }

  footers.forEach((footer, index) => {
    const label = index === 0 ? 'sentit.ortogra.fi' : entry.title;
    footer.append(element('span', null, `${label} · ${entry.code}`),
      element('span', null, `${labels.page} ${index + 1} / ${footers.length}`));
  });
}
