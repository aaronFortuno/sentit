export function evidenceQuestions(entry, settings = {}) {
  let number = 0;
  return entry.questions.flatMap((question, index) => {
    const id = question.id ?? String(index);
    if (settings.questions?.[id]?.included === false) return [];
    return [{ question, id, number: ++number, colorIndex: index }];
  });
}

export function buildEvidence(entry, questions = evidenceQuestions(entry)) {
  const parts = entry.transcript ?? [];
  const byPart = new Map();
  const byQuestion = new Map();
  const errors = [];
  for (const { question, id, number, colorIndex } of questions) {
    const color = `hsl(${((52 + colorIndex * 137.508) % 360).toFixed(1)} 88% 83%)`;
    const reference = { id, number, color, target: `evidence-${entry.id}-${id}` };
    const ranges = [];
    for (const anchor of question.evidence ?? []) {
      const matches = parts.filter(part => part.id === anchor.part);
      const text = matches[0]?.text ?? '';
      const quote = anchor.quote;
      const first = typeof quote === 'string' && quote.length ? text.indexOf(quote) : -1;
      const ambiguous = first >= 0 && text.indexOf(quote, first + 1) >= 0 && anchor.occurrence === undefined;
      let start = first;
      const occurrence = anchor.occurrence ?? 0;
      if (!Number.isInteger(occurrence) || occurrence < 0) start = -1;
      else for (let i = 0; i < occurrence && start >= 0; i++) start = text.indexOf(quote, start + 1);
      if (matches.length !== 1 || start < 0 || ambiguous) {
        errors.push(`${entry.id}/${id}: ${anchor.part} — ${ambiguous ? 'ambiguous quote' : 'missing or invalid quote'}`);
        continue;
      }
      ranges.push({ part: anchor.part, start, end: start + quote.length, reference });
    }
    ranges.sort((a, b) => parts.findIndex(part => part.id === a.part) - parts.findIndex(part => part.id === b.part) || a.start - b.start);
    if (!ranges.length) continue;
    ranges[0].target = reference.target;
    byQuestion.set(id, reference);
    for (const range of ranges) {
      if (!byPart.has(range.part)) byPart.set(range.part, []);
      byPart.get(range.part).push(range);
    }
  }
  return { byPart, byQuestion, errors };
}

// Offsets refer to the unmodified transcript, including when a paragraph spans pages.
export function evidenceSegments(text, ranges = [], offset = 0) {
  const end = offset + text.length;
  const relevant = ranges.filter(range => range.start < end && range.end > offset);
  const bounds = [...new Set([offset, end, ...relevant.flatMap(range => [Math.max(offset, range.start), Math.min(end, range.end)])])].sort((a, b) => a - b);
  return bounds.slice(0, -1).map((start, index) => {
    const stop = bounds[index + 1];
    const active = relevant.filter(range => range.start <= start && range.end >= stop);
    return {
      text: text.slice(start - offset, stop - offset),
      references: [...new Map(active.map(range => [range.reference.id, range.reference])).values()],
      badges: active.filter(range => range.start === start || start === offset).map(range => ({
        ...range.reference, target: range.start === start ? range.target : undefined,
      })),
    };
  });
}
