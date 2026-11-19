export const isPendingReview = entry => entry?.reviewStatus === 'pending';

// Editorial stage directions are part of the review script, never spoken text.
export function reviewScript(entry, labels, session) {
  const direction = text => ({ kind: 'direction', text });
  const opening = entry.introduction ? [{ speaker: labels.introduction, text: entry.introduction }] : [];
  if (!isPendingReview(entry)) return [...opening, ...(entry.transcript ?? [])];
  const plan = session ?? { reading: 60, listens: 2, interval: 30 };
  const takes = entry.generationPlan?.takes ?? [];
  const marker = take => ({ kind: 'take', takeId: take.id, text: `${take.id} · ${take.label} · ${labels.takeRequests(take.requests)}. ${take.note}` });
  const introTake = takes.find(take => take.parts[0] === 'introduction');
  const body = [];
  for (const part of entry.transcript ?? []) {
    const take = takes.find(take => take.parts[0] === part.id);
    if (take) body.push(marker(take));
    body.push(part);
    const last = takes.find(take => take.parts.at(-1) === part.id);
    if (last) body.push(direction(labels.takeEnd(last.id)));
  }
  return [
    ...(entry.productionNotes ?? []).map(direction),
    ...((plan.jingle ?? true) ? [direction(labels.reviewSignature)] : []),
    ...(introTake ? [marker(introTake)] : []),
    ...opening,
    direction(labels.reviewPreparation(plan.reading, plan.prepare ?? true)),
    direction(labels.reviewFirstListening(plan.listens)),
    ...body,
    direction(labels.reviewRepetition(plan.listens, plan.interval, plan.repeat ?? true)),
  ];
}
