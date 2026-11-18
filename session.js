export const defaultSession = { enabled: true, reading: 60, listens: 2, interval: 30, prepare: true, repeat: true, rate: 1, jingle: true };
export const jingleUrl = './assets/audio/sentit-jingle-v1.mp3';

export function validRate(value) {
  return Number.isFinite(value) && value >= .8 && value <= 1.2 && Math.abs(value * 20 - Math.round(value * 20)) < 1e-8;
}

const prompts = {
  ca: {
    prepare: './assets/audio/ca-lectura-temps-variable-v2.mp3',
    prepareMinute: './assets/audio/ca-lectura-un-minut-v2.mp3',
    repeat: './assets/audio/ca-repassa-les-respostes-v2.mp3',
  },
};

export function guidedPrompts(entry) {
  return entry?.audio && entry.fragment ? prompts[entry.language] : undefined;
}

export function encodeSession(session) {
  const interval = session.listens > 1 ? session.interval : 0;
  const prepare = session.reading > 0 && (session.prepare ?? true);
  const repeat = session.listens > 1 && (session.repeat ?? true);
  const mask = Number(prepare) + Number(repeat) * 2;
  const code = `${session.reading}-${session.listens}-${interval}`;
  return mask === 3 ? code : `${code}-${mask}`;
}

export function decodeSession(code) {
  const match = /^(\d{1,3})-([1-3])-(\d{1,3})(?:-([0-3]))?$/.exec(code);
  if (!match) return null;
  const [reading, listens, interval] = match.slice(1, 4).map(Number);
  const mask = Number(match[4] ?? 3);
  return reading <= 300 && interval <= 300
    ? { reading, listens, interval, prepare: Boolean(mask & 1), repeat: Boolean(mask & 2) }
    : null;
}

export function clockTime(seconds) {
  seconds = Math.max(0, Math.ceil(seconds));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}
