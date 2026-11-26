import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { activities } from '../catalogue.js';
import { modularAudio } from '../content/modular-audio.js';
import { activityAudioParts } from '../activity-audio.js';
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const mounted=activities.filter(entry=>entry.audio&&entry.tracks?.introduction&&entry.tracks?.body);
let bytes=0;
for(const entry of mounted){
 const record=modularAudio[`${entry.language}-${entry.code}`];assert(record);assert.equal(record.master,entry.audio);
 const parts=activityAudioParts(entry);assert.equal(parts.length,2);assert(!parts.some(part=>part.src===entry.audio));
 for(const kind of ['introduction','body']){const part=record[kind];assert.equal(part.src,entry.tracks[kind]);assert(part.seconds>0);const data=await fs.readFile(new URL('../'+part.src.replace(/^\.\//u,''),import.meta.url));assert.equal(sha(data),part.sha256);bytes+=data.length;}
 const localMaster=await fs.readFile(new URL('../'+entry.audio.replace(/^\.\//u,''),import.meta.url)).catch(error=>{if(error.code==='ENOENT')return null;throw error;});if(localMaster)assert.equal(sha(localMaster),record.masterSha256,'Local reference master unchanged');
}
assert.equal(Object.keys(modularAudio).length,mounted.length);
console.log(`PASS · ${mounted.length} modular activities, ${mounted.length*2} existing service tracks, ${bytes} bytes; durations, paths and hashes correct; full masters never selected for playback.`);
