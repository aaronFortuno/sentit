// Editorial drafts only. This module never requests or generates audio.
export const direction = text => ({ kind: 'direction', text });
export const spoken = (id, speaker, text) => ({ id, speaker, text });
export const question = (id, prompt, answer, lines = 2, evidence = []) => ({ id, prompt, answer, lines, ...(evidence.length ? { evidence } : {}) });
export const evidence = (part, quote) => ({ part, quote });

export function proposal(data) {
  const { voices, delivery, soundPlan, soundCredits = 'Tots els sons seran originals procedurals de Sentit (MIT); no s’hi preveuen enregistraments externs.', editorialFocus, factualSources = [], illustrationBrief, performance, overlaps, generationPlan, strategy, ...content } = data;
  const ids = content.transcript.filter(part => part.speaker).map(part => part.id);
  const words = content.transcript.filter(part => part.speaker).map(part => part.text).join(' ').trim().split(/\s+/u).length;
  const rates = { '3': [125, 145], '4': [135, 155], '5': [140, 160], '6': [145, 165] }[content.grade];
  const min = Math.max(30, Math.floor((words / rates[1] * 60 + 4) / 5) * 5);
  const max = Math.ceil((words / rates[0] * 60 + 10) / 5) * 5;
  return {
    language: 'ca', seconds: 0, status: 'awaiting-audio', reviewStatus: 'pending', audio: null, ...content,
    introduction: content.introduction ?? `Comprensió oral. ${content.title}${/[.!?]$/u.test(content.title) ? '' : '.'}${content.genre === 'news' ? ' Notícia de ficció.' : ''}`,
    fragment: content.fragment ?? { start: 0, seconds: 0 }, durationEstimate: { min, max },
    production: { strategy: strategy ?? 'packed-title-program-v1', voices, titleSpeaker: Object.keys(voices)[0], delivery, soundPlan, words, editorialFocus, factualSources, illustrationBrief, ...(performance ? {performance} : {}), ...(overlaps ? {overlaps} : {}) },
    generationPlan: generationPlan ?? {
      note: 'Una petició proposada per al títol i tot el fragment, amb un màxim de dues veus. Separació local dins una pausa llarga. Música, efectes i temporitzadors es munten després; les acotacions no s’envien com a parla. Cap síntesi fins a validar aquesta proposta.',
      takes: [{ id: `${content.code}-T01`, label: 'Títol i fragment complets', parts: ['introduction', ...ids], requests: 1, note: `Repartiment proposat: ${Object.entries(voices).map(([name, voice]) => `${name}: ${voice}`).join('; ')}. El primer personatge llegeix també el títol. Text complet, sense peticions per frase ni paràgraf.` }],
      localCuts: [{ id: `${content.code}-L01`, after: 'introduction', label: 'Separar el títol del fragment', note: 'Tall dins el silenci després del títol, comprovat amb les mostres d’àudio i amb marges als dos costats. No s’elimina parla. Presentació una vegada; fragment complet a cada repetició.' }],
    },
    productionNotes: [
      `Proposta pendent de validar. ${editorialFocus}`,
      `Repartiment i direcció: ${delivery} Veus proposades: ${Object.entries(voices).map(([name, voice]) => `${name} — ${voice}`).join('; ')}.`,
      `Muntatge previst: ${soundPlan} ${soundCredits} Les veus seran de Gemini TTS, subjectes a les condicions del proveïdor.`,
      `${words} mots parlats al fragment; durada orientativa de ${Math.floor(min / 60)}:${String(min % 60).padStart(2, '0')}–${Math.floor(max / 60)}:${String(max % 60).padStart(2, '0')}. Es prioritzarà el ritme natural, sense alentir digitalment per assolir una durada. Les instruccions de sessió s’afegeixen amb pistes existents i temporitzadors.`,
      ...(factualSources.length ? [`Contrast factual: ${factualSources.map(source => source.label).join('; ')}. Les fonts enllaçades són al registre editorial; el guió és original i no una lectura de la font.`] : ['Situació i dades de ficció originals; tota la informació necessària per respondre és dins del fragment.']),
      `Il·lustració pendent de produir després de validar el contingut: ${illustrationBrief} No mostrarà dades, rètols ni la resolució de les preguntes.`,
    ],
  };
}
