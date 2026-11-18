const repo = 'https://github.com/aaronFortuno/sentit/blob/main/';
const gemini = { title: 'Gemini TTS · Google', url: 'https://ai.google.dev/gemini-api/docs/speech-generation', license: 'Condicions de Gemini API', licenseUrl: 'https://ai.google.dev/gemini-api/terms' };
const original = { title: 'Sentit · síntesi i muntatge originals amb FFmpeg', url: repo + 'tools/remaster-audio.cjs', license: 'MIT · projecte Sentit', licenseUrl: repo + 'LICENSE' };

// Only resources actually heard in the published master. Future cue sheets live in docs/.
export const audioResources = {
  'ca-S001': { voices: 'Leda (Laia), Puck (Biel); Aoede (presentació).', sounds: 'Tocs de ràdio i sintonia final originals. Sintonia inicial opcional de Sentit.' },
  'ca-S002': { voices: 'Aoede (mestra i presentació).', sounds: 'Separacions entre passos i sintonia inicial opcional de Sentit.' },
  'ca-S008': { voices: 'Aoede (una única narradora, sense nom en el relat; també la presentació). L’Aina i l’avi són personatges narrats, sense veu pròpia.', sounds: 'Base instrumental suau, transició de paper i sintonia inicial opcional originals de Sentit. La versió de programa de ràdio amb benvinguda i comiat encara és una proposta.' },
};

export function renderAudioResources(root, entry, t) {
  root.replaceChildren();
  if (!entry) return;
  const record = audioResources[`${entry.language}-${entry.code}`];
  const add = (tag, text, parent = root) => { const node = document.createElement(tag); node.textContent = text; parent.append(node); return node; };
  const link = (parent, text, url) => { const a = add('a', text, parent); a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer'; };
  if (!record && !entry.audio) add('p', t('audioSourcesPending'));
  if (record) {
    for (const [label, text, source] of [[t('resourceVoice'), record.voices, gemini], [t('resourceOriginal'), record.sounds, original]]) {
      add('h4', label);
      const p = add('p', text); p.lang = 'ca';
      const attribution = add('p', '');
      link(attribution, source.title, source.url);
      attribution.append(document.createTextNode(' · '));
      link(attribution, source.license, source.licenseUrl);
    }
  }
  const p = add('p', '');
  link(p, t('fullAudioCredits'), repo + 'docs/fonts-sonores.md');
}
