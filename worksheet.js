import { clockTime } from './session.js';
import { buildEvidence, evidenceQuestions, evidenceSegments } from './evidence.js';
import { isPendingReview, reviewScript } from './review.js';

export const defaultFormat = { font: 'serif', size: 12, spacing: 7, leading: 1.6 };

const fontStacks = {
  serif: 'Georgia, serif',
  sans: 'Arial, sans-serif',
  verdana: 'Verdana, sans-serif',
};

export const maxLines = 12;

export function imageOptions(entry, settings = {}) {
  const available = Boolean(entry?.image?.src);
  const savedWidth = Number(settings.imageWidth ?? 80);
  return {
    available, visible: available && (settings.showImage ?? true),
    width: Number.isFinite(savedWidth) ? Math.max(30, Math.min(90, savedWidth)) : 80,
    position: ['left', 'center', 'right'].includes(settings.imagePosition) ? settings.imagePosition : 'right',
  };
}

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
  const titleRow = element('div', 'paper-title-row');
  titleRow.append(headerMain);
  const top = element('div', 'paper-top');
  const mark = element('div', 'paper-mark');
  const brand = element('div', 'paper-brand');
  const logo = element('img');
  Object.assign(logo, { src: './assets/sentit.svg', alt: '', width: 25, height: 25 });
  const name = element('span', null, 'sentit');
  name.append(element('span', 'brand-dot', '.'));
  brand.append(logo, name);
  mark.append(brand, element('span', 'paper-kind', labels.sheetTitle));
  top.append(mark);
  if (!answerKey) top.append(makeIdentity(labels));
  if (code) {
    const badge = element('div', 'paper-class-code');
    badge.append(element('span', null, labels.classroomCode), element('strong', null, code));
    titleRow.append(badge);
  }
  if (answerKey) headerMain.append(element('p', 'paper-solution-label', labels.answers));
  headerMain.append(element('h3', null, entry.title));
  if (entry.sample) headerMain.append(element('p', 'paper-caption', labels.sample));
  if (isPendingReview(entry)) headerMain.append(element('p', 'paper-caption paper-review-label', labels.reviewNotice));
  else if (!entry.audio) headerMain.append(element('p', 'paper-caption', labels.audioPending));
  head.append(top, titleRow);
  if (listenUrl) {
    head.classList.add('has-listening');
    const listening = element('div', 'paper-listening');
    const details = element('div', 'paper-listening-details');
    details.append(element('span', 'paper-audio-url', listenUrl.replace(/^https:\/\//, '')));
    if (session) {
      const summary = element('ul', 'paper-session-summary');
      summary.append(element('li', null, labels.paperReading(clockTime(session.reading))));
      summary.append(element('li', null, labels.paperListens(session.listens, clockTime((entry.fragment?.seconds ?? entry.seconds) / (session.rate ?? 1)))));
      if ((session.rate ?? 1) !== 1) summary.append(element('li', null, labels.paperRate(session.rate)));
      if (session.listens > 1) summary.append(element('li', null, labels.paperInterval(clockTime(session.interval))));
      const prepare = session.reading > 0 && (session.prepare ?? true);
      const repeat = session.listens > 1 && (session.repeat ?? true);
      summary.append(element('li', null, labels.paperPrompts(prepare, repeat)));
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

export function worksheetInstructions(entry, session) {
  const spanish = entry.language?.split('-')[0] === 'es';
  if (!session || session.enabled === false) {
    return spanish
      ? 'Lee las preguntas antes de empezar. Escucha el audio y responde por escrito. Puedes volver a escucharlo cuando lo necesites.'
      : 'Llegeix les preguntes abans de començar. Escolta l’àudio i respon per escrit. Pots tornar-lo a escoltar quan ho necessitis.';
  }
  const duration = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    const units = spanish
      ? { minute: 'minuto', minutes: 'minutos', second: 'segundo', seconds: 'segundos', and: ' y ' }
      : { minute: 'minut', minutes: 'minuts', second: 'segon', seconds: 'segons', and: ' i ' };
    const parts = [];
    if (minutes) parts.push(`${minutes} ${minutes === 1 ? units.minute : units.minutes}`);
    if (remainder) parts.push(`${remainder} ${remainder === 1 ? units.second : units.seconds}`);
    return parts.join(units.and);
  };
  const sentences = [];
  if (session.reading > 0) {
    sentences.push(spanish
      ? `Tienes ${duration(session.reading)} para leer las preguntas antes de escuchar el audio.`
      : `Tens ${duration(session.reading)} per llegir les preguntes abans d’escoltar l’àudio.`);
  }
  const once = spanish ? 'una vez' : 'una vegada';
  const times = session.listens === 1 ? once : `${session.listens} ${spanish ? 'veces' : 'vegades'}`;
  sentences.push(spanish ? `Escucharás el audio ${times}.` : `Escoltaràs l’àudio ${times}.`);
  if (session.listens > 1) {
    if (session.interval > 0) {
      sentences.push(spanish
        ? `Entre las escuchas tendrás ${duration(session.interval)} para revisar y completar las respuestas.`
        : `Entre les escoltes tindràs ${duration(session.interval)} per revisar i completar les respostes.`);
    } else {
      sentences.push(spanish ? 'Las escuchas se suceden sin pausa.' : 'Les escoltes se succeeixen sense pausa.');
    }
  }
  sentences.push(spanish ? 'Responde a las preguntas por escrito.' : 'Respon les preguntes per escrit.');
  return sentences.join(' ');
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

function appendTranscriptText(paragraph, text, ranges, offset) {
  for (const segment of evidenceSegments(text, ranges, offset)) {
    if (!segment.references.length) {
      paragraph.append(segment.text);
      continue;
    }
    const mark = element('mark', 'paper-evidence');
    mark.dataset.evidenceQuestions = segment.references.map(ref => ref.number).join(' ');
    const colors = segment.references.map(ref => ref.color);
    const fill = colors.length === 1 ? colors[0] : `linear-gradient(to bottom, ${colors.map((color, index) => `${color} ${index * 100 / colors.length}% ${(index + 1) * 100 / colors.length}%`).join(', ')})`;
    mark.style.setProperty('--evidence-fill', fill);
    for (const reference of segment.badges) {
      const number = element('sup', 'paper-evidence-number', reference.number);
      number.style.setProperty('--evidence-fill', reference.color);
      if (reference.target) {
        number.id = reference.target;
        number.tabIndex = -1;
      }
      mark.append(number);
    }
    mark.append(document.createTextNode(segment.text));
    paragraph.append(mark);
  }
}

function transcriptBlock({ speaker, text, kind, takeId }, heading, ranges, offset = 0) {
  const block = element('div', `paper-block paper-transcript-block${heading ? ' paper-transcript-start' : ''}`);
  if (heading) block.append(element('h4', 'paper-section-title', heading));
  const paragraph = element('p', 'paper-transcript');
  if (kind === 'direction') block.classList.add('paper-direction');
  if (kind === 'take') {
    block.classList.add('paper-take');
    if (takeId && offset === 0) { block.dataset.takeId = takeId; block.tabIndex = -1; }
  }
  if (speaker) paragraph.append(element('strong', null, `${speaker} · `));
  appendTranscriptText(paragraph, text, ranges, offset);
  block.append(paragraph);
  return block;
}

function answerBlock(text, labels, reference, first = true, last = true) {
  const answer = element('div', 'paper-answer');
  const header = element('div', 'paper-answer-header');
  if (first) header.append(element('span', 'paper-answer-label', labels.suggestedAnswer));
  if (reference && last) {
    const cue = element('a', 'paper-evidence-cue', labels.seeTranscript);
    cue.href = `#${reference.target}`;
    cue.dataset.evidenceTarget = reference.target;
    cue.style.setProperty('--evidence-fill', reference.color);
    cue.setAttribute('aria-label', labels.seeTranscriptQuestion(reference.number));
    header.append(cue);
  }
  if (header.childElementCount) answer.append(header);
  answer.append(element('p', null, text));
  return answer;
}

function illustration(entry, options) {
  const figure = element('figure', 'paper-illustration');
  figure.style.inlineSize = `${options.width}mm`;
  const image = element('img');
  Object.assign(image, { src: entry.image.src, alt: entry.image.alt ?? '', width: entry.image.width, height: entry.image.height });
  figure.append(image);
  return figure;
}

function flowingIllustration(entry, options, transcript = false) {
  const figure = illustration(entry, options);
  figure.classList.add('paper-flow-image', `image-${options.position}`);
  if (transcript) figure.classList.add('paper-transcript-image');
  return figure;
}

export function renderWorksheet(container, entry, format, settings, { answerKey, labels, toolLabels = labels, listenUrl, session }) {
  if (isPendingReview(entry)) labels = { ...labels, seeTranscript: labels.seeScript, seeTranscriptQuestion: labels.seeScriptQuestion };
  const footers = [];
  const image = imageOptions(entry, settings);
  const evidence = answerKey && (settings?.showEvidence ?? true) ? buildEvidence(entry, evidenceQuestions(entry, settings)) : { byPart: new Map(), byQuestion: new Map() };
  let content;
  container.replaceChildren();
  container.lang = entry.language;
  container.style.setProperty('--sheet-font', fontStacks[format.font] ?? fontStacks.serif);
  container.style.setProperty('--sheet-size', `${format.size}pt`);
  container.style.setProperty('--sheet-leading', format.leading);
  container.style.setProperty('--sheet-spacing', `${format.spacing}mm`);

  function startPage() {
    const page = element('article', 'paper');
    page.classList.toggle('paper-answer-key', answerKey);
    page.classList.toggle('paper-review-draft', isPendingReview(entry));
    content = element('div', 'paper-content');
    const footer = element('footer', 'paper-footer');
    footers.push(footer);
    page.append(content, footer);
    if (isPendingReview(entry)) {
      const watermark = element('span', 'paper-review-watermark', labels.reviewPending);
      watermark.setAttribute('aria-hidden', 'true');
      page.append(watermark);
    }
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
    const offsets = [0];
    for (const word of words) offsets.push(offsets.at(-1) + word.length);
    let start = 0;
    while (start < words.length) {
      let low = start + 1;
      let high = words.length;
      let end = start;
      while (low <= high) {
        const middle = Math.floor((low + high) / 2);
        const block = makeBlock(words.slice(start, middle).join(''), start === 0, offsets[start], middle === words.length);
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
      content.append(makeBlock(words.slice(start, end).join(''), start === 0, offsets[start], end === words.length));
      start = end;
      if (start < words.length) startPage();
    }
  }

  startPage();
  const header = makeHeader(entry, labels, settings?.code?.trim(), answerKey, listenUrl, session);
  const floatedImage = !answerKey && image.visible && image.position !== 'center';
  if (floatedImage) {
    const title = header.querySelector('.paper-title-row');
    title.remove();
    title.classList.add('paper-flow-title');
    content.append(header);
    placeBlock(flowingIllustration(entry, image));
    placeBlock(title);
  } else content.append(header);
  if (!answerKey) {
    if (image.visible && !floatedImage) placeBlock(flowingIllustration(entry, image));
    if (settings?.showInstructions ?? true) placeBlock(element('p', 'paper-instructions', worksheetInstructions(entry, session)));
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
      ? [answerBlock(question.answer ?? labels.noAnswer, labels, evidence.byQuestion.get(id))]
      : Array.from({ length: lines }, () => element('div', 'write-line'));
    const block = questionBlock(position, heading, [makePrompt(question.prompt), ...response]);
    block.dataset.completeQuestion = id;
    placeBlock(block, () => {
      placeText(question.prompt, (text, first) => questionBlock(first && position, first && heading, [makePrompt(text, first)]));
      if (answerKey) {
        placeText(question.answer ?? labels.noAnswer, (text, first, offset, last) => questionBlock(null, '', [answerBlock(text, labels, evidence.byQuestion.get(id), first, last)]));
      } else {
        for (const line of response) placeBlock(questionBlock(null, '', [line]));
      }
    });
  });

  // Keep a final worksheet page from containing just one complete question.
  // Move a whole block; never split the prompt from its writing space.
  if (!answerKey) {
    const pages = [...container.querySelectorAll('.paper-content')];
    const last = pages.at(-1);
    const previous = pages.at(-2);
    const complete = page => [...(page?.children ?? [])].filter(block => block.dataset.completeQuestion !== undefined);
    if (last && previous && last.childElementCount === 1 && complete(last).length === 1 && complete(previous).length >= 3) {
      const candidate = previous.lastElementChild;
      if (candidate?.dataset.completeQuestion !== undefined) {
        last.prepend(candidate);
        if (last.lastElementChild.getBoundingClientRect().bottom > last.getBoundingClientRect().bottom - 2) previous.append(candidate);
      }
    }
  }

  if (answerKey) {
    const parts = reviewScript(entry, labels, session);
    const placePart = (part, heading) => {
      const ranges = evidence.byPart.get(part.id);
      placeBlock(transcriptBlock(part, heading, ranges), () => {
        placeText(part.text, (text, first, offset) => transcriptBlock({ text, speaker: first && part.speaker, kind: part.kind, takeId: part.takeId }, first && heading, ranges, offset));
      });
    };
    if (image.visible && parts.length) placeBlock(flowingIllustration(entry, image, true));
    parts.forEach((part, index) => {
      const heading = index === 0 ? isPendingReview(entry) ? labels.productionScript : labels.transcript : '';
      placePart(part, heading);
    });
  }

  footers.forEach((footer, index) => {
    const label = index === 0 ? 'sentit.ortogra.fi' : entry.title;
    footer.append(element('span', null, `${label} · ${entry.code}`),
      element('span', null, `${labels.page} ${index + 1} / ${footers.length}`));
  });
}
