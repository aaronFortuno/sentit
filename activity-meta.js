import { clockTime } from './session.js';

export function durationBounds(entry) {
  const seconds = entry.audio ? entry.fragment?.seconds ?? entry.seconds : null;
  if (Number.isFinite(seconds) && seconds > 0) return { min: seconds, max: seconds, estimated: false };
  const range = entry.durationEstimate;
  return range && range.min > 0 && range.max >= range.min ? { ...range, estimated: true } : null;
}

export function matchesDuration(entry, bucket) {
  if (!bucket) return true;
  const bounds = durationBounds(entry);
  if (!bounds) return false;
  if (bucket === 'short') return bounds.min <= 60;
  if (bucket === 'medium') return bounds.max > 60 && bounds.min <= 120;
  return bucket === 'long' && bounds.max > 120;
}

export function durationText(entry, t) {
  const bounds = durationBounds(entry);
  if (!bounds) return t('durationPending');
  return bounds.estimated ? t('estimatedDuration')(clockTime(bounds.min), clockTime(bounds.max)) : clockTime(bounds.min);
}

// Four fixed steps across the catalogue; estimates use their upper bound.
export function durationTier(entry) {
  const bounds = durationBounds(entry);
  return bounds ? Math.min(4, Math.ceil(bounds.max / 60)) : 0;
}
