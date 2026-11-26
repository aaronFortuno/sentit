import { narrationMusic, narrationMusicGroups } from './content/narration-music.js';
import { openDialog } from './motion.js';
import { mountAudioSeek } from './audio-seek.js';

// Teacher audition only: neither changing a tab nor playing a sample assigns music.
export function mountNarrationMusicPreview({ t, language, icon, track }) {
  const dialog=document.getElementById('narration-music-dialog'),tabs=dialog.querySelector('.music-tabs'),list=dialog.querySelector('.music-candidates');
  let selected='faules-mon';
  const pause=()=>dialog.querySelectorAll('audio').forEach(audio=>audio.pause());
  const render=()=>{
    pause();const lang=language();
    tabs.replaceChildren(...narrationMusicGroups.map(group=>{
      const button=document.createElement('button');button.type='button';button.textContent=group[lang];button.setAttribute('aria-pressed',String(group.id===selected));
      button.addEventListener('click',()=>{selected=group.id;render();});return button;
    }));
    list.replaceChildren(...narrationMusic.filter(candidate=>candidate.universe===selected).map(candidate=>{
      const card=document.createElement('section');card.className='music-candidate';card.dataset.candidate=candidate.id;
      const heading=document.createElement('div');heading.className='music-candidate-heading';
      const title=document.createElement('h3');title.textContent=`${candidate.id} · ${candidate.title}`;
      const button=document.createElement('button');button.type='button';button.className='icon-button';
      const symbol=document.createElement('span');symbol.dataset.icon='play';symbol.setAttribute('aria-hidden','true');button.append(symbol);heading.append(title,button);
      const audio=document.createElement('audio');audio.preload='none';audio.src=candidate.preview;audio.hidden=true;
      const paint=()=>{const playing=!audio.paused&&!audio.ended;icon(symbol,playing?'pause':'play');button.setAttribute('aria-pressed',String(playing));button.setAttribute('aria-label',`${t(playing?'pauseComprehension':'previewMusic')} · ${candidate.id} · ${candidate.title}`);};
      button.addEventListener('click',async()=>{if(!audio.paused){audio.pause();return;}window.dispatchEvent(new Event('sentit-pause-playback'));document.querySelectorAll('audio').forEach(other=>{if(other!==audio)other.pause();});if(audio.ended)audio.currentTime=0;try{await audio.play();track('escolta_musica_proposta',{pista:candidate.id,univers:selected});}catch{status.textContent=t('audioError');}});
      for(const event of ['play','pause','ended'])audio.addEventListener(event,paint);
      const description=document.createElement('p');description.textContent=candidate.description[lang];
      const seek=document.createElement('div');mountAudioSeek(seek,audio,t);audio.preload='none';
      const credits=document.createElement('p');credits.className='music-credit';credits.append(`${candidate.author} · `);
      const license=document.createElement('a');license.href=candidate.licenseUrl;license.textContent=candidate.license;
      const source=document.createElement('a');source.href=candidate.sourceUrl;source.textContent=t('musicSource');
      for(const link of[license,source]){link.target='_blank';link.rel='noopener noreferrer';}credits.append(license,' · ',source);
      const status=document.createElement('p');status.className='music-status';status.setAttribute('role','status');
      card.append(heading,description,audio,seek,credits,status);paint();return card;
    }));
  };
  const open=(group)=>{selected=narrationMusicGroups.some(g=>g.id===group)?group:selected;window.dispatchEvent(new Event('sentit-pause-playback'));document.querySelectorAll('audio').forEach(audio=>audio.pause());render();openDialog(dialog);track('compara_musiques_narracio');};
  document.getElementById('compare-narration-music').addEventListener('click',()=>open());
  dialog.addEventListener('close',pause);
  window.addEventListener('hashchange',pause);
  window.addEventListener('sentit-pause-playback',pause);
  return{open};
}
