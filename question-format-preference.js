import { responseSettings } from './question-responses.js';

export const questionFormatPreferenceKey = 'sentit.question-format.v1';
const valid = value => ['open', 'choice'].includes(value);
function browserStorage() { try { return globalThis.localStorage; } catch { return null; } }

// One browser preference, independent of saved typography, hidden questions and collections.
export function createQuestionFormatPreference(storage = browserStorage()) {
  let mode = null;
  try { const saved = storage?.getItem(questionFormatPreferenceKey); if (valid(saved)) mode = saved; } catch { /* Session memory remains usable. */ }
  return {
    mode: () => mode,
    set(value) {
      if (!valid(value)) throw new Error('Unknown question format');
      mode = value;
      try { storage?.setItem(questionFormatPreferenceKey, value); } catch { /* Keep this session's choice. */ }
    },
    clear() { mode = null; try { storage?.removeItem(questionFormatPreferenceKey); } catch { /* Do not touch other saved data. */ } },
    settings(settings = {}, legacy = false) {
      const normalized = responseSettings(settings, legacy);
      return mode ? { ...normalized, questionMode: mode } : normalized;
    },
  };
}
