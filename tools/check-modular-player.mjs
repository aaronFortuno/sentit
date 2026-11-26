import assert from 'node:assert/strict';
import { createTrackPlayer } from '../track-player.js';
globalThis.window=new EventTarget();
const tick=()=>new Promise(resolve=>setImmediate(resolve));
class Media extends EventTarget {
  constructor(){super();this.attrs={};this.dataset={};this.currentTime=0;this.paused=true;this.ended=false;this.readyState=0;this.duration=NaN;this.plays=[];this.loadNumber=0;}
  getAttribute(key){return this.attrs[key]??null;}
  removeAttribute(key){delete this.attrs[key];}
  set src(value){this.attrs.src=value;this.readyState=0;this.ended=false;this.currentTime=0;}
  get src(){return this.attrs.src;}
  load(){const load=++this.loadNumber;this.readyState=0;queueMicrotask(()=>{if(load!==this.loadNumber||!this.src)return;this.duration=this.src.includes('intro')?2:8;this.readyState=1;this.dispatchEvent(new Event('durationchange'));this.dispatchEvent(new Event('loadedmetadata'));});}
  async play(){this.paused=false;this.ended=false;this.plays.push({src:this.src,rate:this.playbackRate,pitch:this.preservesPitch});this.dispatchEvent(new Event('play'));}
  pause(){if(this.paused)return;this.paused=true;queueMicrotask(()=>this.dispatchEvent(new Event('pause')));}
  finish(){this.currentTime=this.duration;this.ended=true;this.paused=true;queueMicrotask(()=>{this.dispatchEvent(new Event('pause'));this.dispatchEvent(new Event('ended'));});}
}
const media=new Media(),player=createTrackPlayer(media),parts=[{src:'intro',seconds:2},{src:'body',seconds:8}];let plays=0,ends=0;
player.addEventListener('play',()=>plays++);player.addEventListener('ended',()=>ends++);
player.setTracks(parts);await tick();assert.equal(player.duration,10);assert.equal(player.currentTime,0);
player.playbackRate=.8;player.preservesPitch=true;await player.play();assert.equal(media.src,'intro');
media.currentTime=1;media.dispatchEvent(new Event('timeupdate'));assert.equal(player.currentTime,1);
media.finish();await tick();assert.equal(media.src,'body');assert.equal(player.paused,false);assert.equal(player.currentTime,2);assert.equal(plays,1,'Transition is not another user play');assert.equal(media.playbackRate,.8);assert.equal(media.preservesPitch,true);
player.currentTime=5;await tick();assert.equal(media.currentTime,3);assert.equal(player.currentTime,5);assert.equal(player.paused,false);
player.currentTime=1;await tick();assert.equal(media.src,'intro');assert.equal(media.currentTime,1);assert.equal(player.paused,false,'Queued native pause from source change must not stop playback');
player.pause();await tick();assert.equal(player.paused,true);assert.equal(media.paused,true);
player.currentTime=7;await tick();assert.equal(media.src,'body');assert.equal(player.currentTime,7);assert.equal(media.paused,true,'Seeking while paused stays paused');
await player.play();media.finish();await tick();assert(player.ended);assert.equal(player.currentTime,10);assert.equal(ends,1);
await player.play();assert.equal(media.src,'intro');assert.equal(player.currentTime,0);assert(!player.ended);
media.pause();await tick();assert(player.paused,'Other media controls can stop the underlying decoder');
player.currentTime=9;const starting=player.play();player.pause();await starting;await tick();assert(media.paused);assert(player.paused,'Pause during asynchronous loading cannot resume later');
media.error={code:2};media.readyState=0;media.dispatchEvent(new Event('error'));assert(player.paused);assert(player.error);await player.play();await tick();assert(!player.paused,'A failed network load can be retried');assert.equal(media.src,'body');player.pause();
player.setTracks([{src:'other-intro',seconds:2},{src:'other-body',seconds:8}]);const pending=player.play();player.setTracks([]);await pending;await tick();assert(player.paused);assert.equal(media.getAttribute('src'),null);assert.equal(player.currentTime,0);
player.setTracks([{src:'legacy'}]);await tick();assert.equal(player.duration,8);await player.play();assert.equal(media.src,'legacy');player.dispose();
console.log('PASS · One timeline over native title/body tracks: natural transition, cross-track seek, paused seek, pitch/rate preservation, external pause, restart, navigation and async cancellation. No speech cut timers.');
