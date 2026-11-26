// One native decoder and a single timeline over complete files. Never time-cut speech.
export function createTrackPlayer(media) {
  const events=new EventTarget(),listeners=new AbortController();
  let parts=[],index=0,running=false,finished=false,version=0,internalPauses=0,pendingOffset=null,ready=Promise.resolve(true),resolveReady;
  let rate=1,pitch=true,identity='';
  const emit=name=>events.dispatchEvent(new Event(name));
  const knownDuration=()=>parts.length&&parts.every(part=>Number.isFinite(part.seconds))?parts.reduce((n,part)=>n+part.seconds,0):NaN;
  const before=()=>parts.slice(0,index).reduce((n,part)=>n+(part.seconds??0),0);
  const pauseNative=()=>{if(!media.paused)internalPauses++;media.pause();};
  const fail=error=>{const wasPlaying=running;running=false;player.error=error;if(wasPlaying)emit('pause');emit('error');};
  const positioned=()=>{
    if(!parts.length||media.readyState<1)return;
    if(Number.isFinite(media.duration))parts[index].seconds=media.duration;
    if(pendingOffset!==null){const offset=pendingOffset;pendingOffset=null;media.currentTime=offset;}
    resolveReady?.(true);resolveReady=null;
    emit('loadedmetadata');emit('durationchange');emit('timeupdate');
  };
  const load=(partIndex,offset)=>{
    pauseNative();index=partIndex;pendingOffset=offset;
    resolveReady?.(false);resolveReady=null;
    ready=new Promise(resolve=>{resolveReady=resolve;});
    const source=parts[index].src;
    media.dataset.audioPartIndex=String(index);
    if(media.getAttribute('src')!==source){media.src=source;media.load();}
    media.playbackRate=rate;media.preservesPitch=pitch;
    if(media.readyState>=1)positioned();
    return ready;
  };
  const start=async token=>{
    const loaded=await ready;if(!loaded||token!==version||!running)return;
    try{await media.play();}catch(error){if(token===version&&running)throw error;}
    if(token!==version&&!running)pauseNative();
  };
  const seek=value=>{
    if(!parts.length||!Number.isFinite(value))return;
    const total=knownDuration();if(!Number.isFinite(total))return;
    const target=Math.max(0,Math.min(value,total));let part=0,offset=target;
    while(part<parts.length-1&&offset>=parts[part].seconds){offset-=parts[part].seconds;part++;}
    const resume=running,token=++version;finished=target>=total;
    if(finished)running=false;
    load(part,offset);emit('seeking');emit('timeupdate');
    if(resume&&!finished)start(token).catch(fail);
    else if(finished){if(resume)emit('pause');emit('ended');}
  };
  const player={
    error:null,
    addEventListener:(...args)=>events.addEventListener(...args),
    removeEventListener:(...args)=>events.removeEventListener(...args),
    get paused(){return !running;},get ended(){return finished;},
    get duration(){return knownDuration();},
    get currentTime(){return finished&&Number.isFinite(knownDuration())?knownDuration():before()+(pendingOffset??media.currentTime??0);},
    set currentTime(value){seek(Number(value));},
    get playbackRate(){return rate;},set playbackRate(value){rate=value;media.playbackRate=value;},
    get preservesPitch(){return pitch;},set preservesPitch(value){pitch=value;media.preservesPitch=value;},
    get preload(){return media.preload;},set preload(value){media.preload=value;},
    setTracks(next){
      const key=next.map(part=>part.src).join('\n');if(key===identity)return;
      player.pause();version++;identity=key;parts=next.map(part=>({...part}));index=0;finished=false;player.error=null;
      resolveReady?.(false);resolveReady=null;
      if(parts.length)load(0,0);else{pendingOffset=null;media.removeAttribute('src');media.load();}
      emit('emptied');emit('durationchange');
    },
    async play(){
      if(!parts.length)throw Error('No audio selected');
      if(running)return;
      if(player.error){const offset=pendingOffset??media.currentTime??0;media.removeAttribute('src');load(index,offset);}
      if(finished){finished=false;load(0,0);}
      running=true;player.error=null;const token=++version;emit('play');
      try{await start(token);}catch(error){if(token===version){fail(error);throw error;}}
    },
    pause(){const wasPlaying=running;running=false;version++;pauseNative();if(wasPlaying)emit('pause');},
    dispose(){player.pause();resolveReady?.(false);listeners.abort();media.removeAttribute('src');media.load();},
  };
  media.addEventListener('loadedmetadata',positioned,{signal:listeners.signal});
  media.addEventListener('durationchange',()=>{if(media.readyState>=1&&parts.length&&Number.isFinite(media.duration)){parts[index].seconds=media.duration;emit('durationchange');}},{signal:listeners.signal});
  media.addEventListener('timeupdate',()=>emit('timeupdate'),{signal:listeners.signal});
  media.addEventListener('seeked',()=>emit('seeked'),{signal:listeners.signal});
  media.addEventListener('pause',()=>{if(internalPauses){internalPauses--;return;}if(running&&!media.ended&&media.readyState>=1){running=false;version++;emit('pause');}},{signal:listeners.signal});
  media.addEventListener('ended',()=>{
    if(!running)return;
    if(index+1<parts.length){const token=++version;load(index+1,0);emit('timeupdate');start(token).catch(fail);}
    else{finished=true;running=false;emit('timeupdate');emit('ended');}
  },{signal:listeners.signal});
  media.addEventListener('error',()=>{if(parts.length){resolveReady?.(false);resolveReady=null;fail(media.error);}},{signal:listeners.signal});
  window.addEventListener('sentit-pause-playback',()=>player.pause(),{signal:listeners.signal});
  window.addEventListener('pagehide',()=>player.pause(),{signal:listeners.signal});
  return player;
}
