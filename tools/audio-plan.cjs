'use strict';

const baseStyle = 'Read the supplied text exactly once, verbatim, in natural Central Catalan. Keep all words and all turns. Clean studio recording, dry and close-miked. No added words, no repetitions, no nonverbal vocalizations, no music or room sounds. Use a natural clear pace, not digitally slowed speech. ';

function request(turns, spec, intro = false) {
  if (!turns.length || turns.some(turn => !turn?.speaker || !turn.text || (!intro && !spec.voices[turn.speaker]))) throw Error('Torn absent al guió o veu sense configurar.');
  const speakers = [...new Set(turns.map(turn => turn.speaker))];
  if (speakers.length > 2) throw Error('Una petició admet com a màxim dues veus.');
  const recordingStyle = spec.allowVocalTags ? baseStyle.replace('no nonverbal vocalizations, ', '') : baseStyle;
  return {
    model: 'gemini-3.8-flash-tts',
    input: [{ type: 'user_input', content: turns.map(turn => ({ type: 'text', text: turn.text, annotations: [{ type: 'speech_metadata', ...(speakers.length > 1 ? { speaker: turn.speaker } : {}), style: recordingStyle + (intro ? 'Calm, clear exercise title, with a brief pause between the sentences.' : spec.pace) }] })) }],
    response_format: { type: 'audio', mime_type: 'audio/wav', sample_rate: 24000 },
    generation_config: { speech_config: speakers.length === 1 ? [{ voice: intro ? 'Aoede' : spec.voices[speakers[0]] }] : { speakers: speakers.map(speaker => ({ speaker, voice: spec.voices[speaker] })) } },
  };
}

// The cache callback compares the exact request hash and validates the WAV.
// Published scenes stay intact; an unfinished prefix needs only one new tail take.
async function buildPlan(entry, spec, cached) {
  const turns = entry.transcript.filter(part => part.speaker);
  request(turns, spec);
  const introTurns = [{ speaker: 'Presentació', text: entry.introduction }];
  const intro = { name: 'intro', turns: introTurns, intro: true, cached: await cached('intro', introTurns, true) };
  const whole = { name: 'fragment-complet', turns, parts: turns.map(part => part.id) };
  if (await cached(whole.name, turns, false)) return finish([ { ...whole, cached: true } ], intro, 'whole');

  const legacy = spec.scenes ?? [];
  const ids = legacy.flat();
  if (legacy.length && (ids.length !== turns.length || ids.some((id, i) => id !== turns[i].id))) throw Error('Les escenes anteriors no coincideixen amb el guió actual.');
  const pieces = [];
  let missing = false;
  for (const [i, parts] of legacy.entries()) {
    const sceneTurns = parts.map(id => turns.find(part => part.id === id));
    const name = 'scene-' + (i + 1);
    const found = await cached(name, sceneTurns, false);
    if (found && missing) throw Error('Hi ha preses antigues fora d’ordre. Revisa-les abans de generar res.');
    if (found) pieces.push({ name, turns: sceneTurns, parts, cached: true });
    else missing = true;
  }
  const covered = pieces.reduce((sum, piece) => sum + piece.turns.length, 0);
  if (covered < turns.length) {
    const rest = turns.slice(covered);
    const name = covered ? 'fragment-restant' : whole.name;
    pieces.push({ name, turns: rest, parts: rest.map(part => part.id), cached: await cached(name, rest, false) });
  }
  return finish(pieces, intro, covered === turns.length ? 'legacy' : covered ? 'resume-prefix' : 'whole');
}

function finish(pieces, intro, mode) {
  return { pieces, intro, mode, requests: pieces.filter(piece => !piece.cached).length + Number(!intro.cached) };
}

module.exports = { request, buildPlan };
