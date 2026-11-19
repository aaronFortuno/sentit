export const isPendingReview = entry => entry?.reviewStatus === 'pending';

// Editorial stage directions are part of the review script, never spoken text.
export function reviewScript(entry, labels, session) {
  const direction = text => ({ kind: 'direction', text });
  const opening = entry.introduction ? [{ speaker: labels.introduction, text: entry.introduction }] : [];
  if (!isPendingReview(entry)) {
    if (!entry.recordingCues) return [...opening, ...(entry.transcript ?? [])];
    const recorded=[];
    for (const part of entry.transcript.filter(part=>part.speaker)) {
      recorded.push(...entry.recordingCues.filter(cue=>cue.before===part.id).map(cue=>({kind:'sound',text:cue.text})),part,
        ...entry.recordingCues.filter(cue=>cue.after===part.id).map(cue=>({kind:'sound',text:cue.text})));
    }
    return [...opening,...recorded];
  }
  const plan = session ?? { reading: 60, listens: 2, interval: 30 };
  const takes = entry.generationPlan?.takes ?? [];
  const marker = take => ({ kind: 'take', takeId: take.id, text: `${take.id} · ${take.label} · ${labels.takeRequests(take.requests)}. ${take.note}` });
  const introTake = takes.find(take => take.parts[0] === 'introduction');
  const localCut = id => (entry.generationPlan?.localCuts ?? []).filter(cut=>cut.after===id).map(cut=>({kind:'local-cut',takeId:cut.id,text:`${cut.id} · ${cut.label}. ${cut.note}`}));
  const body = [];
  for (const part of entry.transcript ?? []) {
    const take = takes.find(take => take.parts[0] === part.id);
    if (take) body.push(marker(take));
    body.push(part);
    body.push(...localCut(part.id));
    const last = takes.find(take => take.parts.at(-1) === part.id);
    if (last) body.push(direction(labels.takeEnd(last.id)));
  }
  return [
    ...(entry.productionNotes ?? []).map(direction),
    ...((plan.jingle ?? true) ? [direction(labels.reviewSignature)] : []),
    ...(introTake ? [marker(introTake)] : []),
    ...opening,
    ...localCut('introduction'),
    direction(labels.reviewPreparation(plan.reading, plan.prepare ?? true)),
    direction(labels.reviewFirstListening(plan.listens)),
    ...body,
    direction(labels.reviewRepetition(plan.listens, plan.interval, plan.repeat ?? true)),
  ];
}
