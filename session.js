export const defaultSession = { enabled: true, reading: 60, listens: 2, interval: 30 };

const prompts = {
  ca: {
    prepare: './assets/audio/ca-llegeix-les-preguntes.mp3',
    repeat: './assets/audio/ca-torna-a-escoltar.mp3',
  },
};

export function guidedPrompts(entry) {
  return entry?.audio && entry.fragment ? prompts[entry.language] : undefined;
}

export function encodeSession(session) {
  const interval = session.listens > 1 ? session.interval : 0;
  return `${session.reading}-${session.listens}-${interval}`;
}

export function decodeSession(code) {
  const match = /^(\d{1,3})-([1-3])-(\d{1,3})$/.exec(code);
  if (!match) return null;
  const [reading, listens, interval] = match.slice(1).map(Number);
  return reading <= 300 && interval <= 300 ? { reading, listens, interval } : null;
}

export function clockTime(seconds) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}
