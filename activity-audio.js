import { modularAudio } from './content/modular-audio.js?v=0.1.124';

// entry.audio identifies the approved local master; playback uses these service files.
export function activityAudioParts(entry) {
  if (!entry?.audio) return [];
  if (entry.tracks?.introduction && entry.tracks?.body) {
    const record=modularAudio[`${entry.language}-${entry.code}`];
    return ['introduction','body'].map(kind=>({src:entry.tracks[kind],seconds:record?.[kind]?.src===entry.tracks[kind]?record[kind].seconds:undefined}));
  }
  return [{src:entry.audio}];
}
