import { activities, legacyActivities } from './catalogue.js';
import { characters } from './content/characters.js';
import { universes, universesForActivity, universeName } from './content/universes.js';
import { sessionJingles } from './session.js';
import { pendingProductionStages } from './production-stage.js';
import { multipleChoice } from './question-responses.js';
import { needsReview } from './review.js';

export const analyticsConfig={website:'6acf2cae-4b28-4d71-98dd-550d2d086dcc',hostname:'sentit.ortogra.fi',script:'https://maquestria.tail72bc84.ts.net:8443/script.js'};
const page={website:analyticsConfig.website,hostname:analyticsConfig.hostname,title:'Sentit',url:'/'};
const entries=new Map([...legacyActivities,...activities].map(entry=>[entry.code,entry]));
const readingEntries=new Map([...legacyActivities,...activities].map(entry=>[entry.language+'-'+entry.code,entry]));
const channels=['directe','ortografi','nus','vivecoding','altres'];
let sessionChannel;
export function arrivalChannel(url,referrer=''){
  try{
    const current=new URL(url),via=current.searchParams.get('via');
    if(['ortografi','nus','vivecoding'].includes(via))return via;
    if(!referrer)return 'directe';
    const source=new URL(referrer);
    if(source.hostname==='ortogra.fi'||source.hostname==='www.ortogra.fi')return 'ortografi';
    return source.origin===current.origin?'directe':'altres';
  }catch{return 'directe';}
}
function measurementContext(){
  if(sessionChannel===undefined){
    sessionChannel=arrivalChannel(location.href,document.referrer);
    try{
      if(sessionChannel==='directe'){
        const saved=sessionStorage.getItem('sentit.analytics-channel.v1');
        if(channels.includes(saved))sessionChannel=saved;
      }
      sessionStorage.setItem('sentit.analytics-channel.v1',sessionChannel);
    }catch{ /* Aggregate measurement still works without browser storage. */ }
  }
  return {mesura:2,canal:sessionChannel,entorn:new URL(location.href).searchParams.has('escolta')?'escolta':'docent'};
}
function eventEntry(data){
  if(data.lectura)return readingEntries.get(data.lectura);
  const code=data.code??data.codi;
  return data.llengua?readingEntries.get(data.llengua+'-'+code):entries.get(code);
}
function readingContext(entry){
  return {codi:entry.code,lectura:entry.language+'-'+entry.code,titol:entry.title,llengua:entry.language,curs:entry.grade,dificultat:entry.level,tipus:entry.genre,
    universos:universesForActivity(entry).map(universe=>universe.id).join('|')||'independent',estat:needsReview(entry)?'provisional':'publicada'};
}
const filters={
  'content-language':['','ca','es'],grade:['','3','4','5','6','eso1'],level:['','easy','middle','advanced'],duration:['','short','medium','long'],
  genre:['','story','dialogue','news','interview','instructions','explanation'],'character-match':['any','all'],character:characters.map(character=>character.id),
  universe:['',...universes.map(universe=>universe.id),'independent'],
  'production-phase':['',...pendingProductionStages.map(stage=>stage.id)],
};
const buckets=['0','1','2-5','6-15','16+'];
const times=Array.from({length:301},(_,index)=>String(index));
const rules={
  obre_comprensio:{code:true,colleccio:'boolean',maquetat:'boolean'},
  entra_escolta:{code:true},afegeix_colleccio:{code:true},
  us_univers:{code:true,univers:universes.map(universe=>universe.id),accio:['obre','impressio_fitxa','impressio_solucionari','inicia_escolta','completa_escolta','afegeix_colleccio','copia_enllac']},
  canvia_vista:{code:true,vista:['fitxa','solucionari']},
  obre_impressio:{code:true,contingut:['fitxa','solucionari'],colleccio:'boolean'},
  escolta_audio:{code:true,accio:['inicia','pausa','repren','finalitza','reinicia','previsualitza']},
  configura_audio:{code:true,escoltes:['1','2','3'],ritme:['0.80','0.85','0.90','0.95','1.00','1.05','1.10','1.15','1.20'],lectura:times,pausa:times,sintonia:['cap',...sessionJingles.map(jingle=>jingle.id)],pautada:'boolean'},
  maqueta_fitxa:{code:true,bloc:['font','size','spacing','leading','codi_aula','imatge','context','instruccions','pistes','preguntes'],accio:['ajusta','amaga','recupera','linies','restableix','format'],font:['serif','sans','verdana'],format_pregunta:['oberta','abcd']},
  colleccio:{accio:['crea','afegeix','selecciona','reordena','retira','elimina','canvia_nom'],quantitat:buckets},
  cerca_cataleg:{tipus:['codi','text'],resultats:buckets},neteja_filtres:{},
  copia_enllac:{code:true},obre_vista_escolta:{code:true},
  obre_v4v:{},obre_personatges:{},consulta_canvis:{},consulta_fonts:{code:true},obre_portafoli:{},copia_lightning:{},
  compara_sintonies:{},prova_sessio:{code:true,accio:['inicia','pausa','repren','finalitza','reinicia']},
  canvia_tema:{tema:['light','dark']},canvia_idioma:{idioma:['ca','es']},
  canvia_provisionals:{visible:'boolean'},
  prova_connexio:{origen:['configuracio_sentit']},
};
export const reportReasons={
  audio:{pronunciation:'Pronunciació o accent',cut:'Inici o final tallat',mix:'Música o efecte massa fort',missing:'No es reprodueix',other:'Un altre problema d’àudio'},
  text:{wording:'Errada de llengua',fact:'Dada incorrecta',coherence:'Incoherència',too_easy:'Text massa fàcil per al nivell indicat',too_difficult:'Text massa difícil per al nivell indicat'},
  image:{mismatch:'No encaixa amb el text',error:'Conté un error'},
  question:{wording:'Està mal formulada',unsupported:'No es pot respondre amb l’àudio'},
  solution:{incorrect:'Resposta incorrecta',incomplete:'Resposta incompleta'},
};
let loading=false,sessionExcluded=false;const queue=[];
export const countBucket=n=>!Number.isInteger(n)||n<0?undefined:n===0?'0':n===1?'1':n<=5?'2-5':n<=15?'6-15':'16+';
export function excluded(){try{return sessionExcluded||Boolean(localStorage.getItem('umami.disabled'));}catch{return sessionExcluded;}}
export function restriction(){
  if(location.protocol!=='https:'||location.hostname!==analyticsConfig.hostname)return 'local';
  if(navigator.globalPrivacyControl===true)return 'gpc';
  if([navigator.doNotTrack,window.doNotTrack,navigator.msDoNotTrack].some(value=>['1',1,'yes'].includes(value)))return 'dnt';
  return excluded()?'disabled':'';
}
const ready=()=>typeof window.umami?.track==='function';
export const reportAvailability=()=>restriction()||(ready()?'':loading?'loading':'script');
const notify=()=>window.dispatchEvent(new Event('sentit-analytics-change'));
export function setExcluded(value){
  sessionExcluded=value;try{if(value)localStorage.setItem('umami.disabled','1');else localStorage.removeItem('umami.disabled');}catch{}
  queue.length=0;if(!value)startAnalytics();notify();
}
export function sanitizeEvent(name,data={}){
  if(!data||typeof data!=='object'||Array.isArray(data))return false;
  if(name==='aplica_filtre'){
    const value=data.valor==='tots'?'':data.valor;
    if(!Object.hasOwn(filters,data.filtre)||!filters[data.filtre].includes(value))return false;
    return {name,data:{filtre:data.filtre,valor:data.valor||'tots'}};
  }
  if(!Object.hasOwn(rules,name))return false;
  const clean={},rule=rules[name];
  if(rule.code){const entry=eventEntry(data);if(!entry)return false;Object.assign(clean,readingContext(entry));}
  for(const [key,allowed]of Object.entries(rule)){
    if(key==='code')continue;
    if(allowed==='boolean'?typeof data[key]==='boolean':allowed.includes(data[key]))clean[key]=data[key];
  }
  for(const key of ['accio','vista','contingut','tema','idioma','tipus','origen','univers'])if(rule[key]&&!Object.hasOwn(clean,key))return false;
  if(name==='us_univers'){
    const universe=universesForActivity(eventEntry(data)).find(universe=>universe.id===clean.univers);
    if(!universe)return false;
    clean.nom_univers=universeName(universe,'ca');
  }
  return {name,...(Object.keys(clean).length?{data:clean}:{})};
}
export function universeEvents(event){
  const action=event.name==='obre_comprensio'?'obre':event.name==='obre_impressio'?'impressio_'+event.data.contingut:event.name==='copia_enllac'?'copia_enllac':event.name==='afegeix_colleccio'?'afegeix_colleccio':event.name==='escolta_audio'&&['inicia','reinicia'].includes(event.data.accio)?'inicia_escolta':event.name==='escolta_audio'&&event.data.accio==='finalitza'?'completa_escolta':null;
  if(!action)return [];
  const entry=eventEntry(event.data);if(!entry)return [];
  return universesForActivity(entry).map(universe=>sanitizeEvent('us_univers',{lectura:entry.language+'-'+entry.code,univers:universe.id,accio:action}));
}
function beforeSend(type,payload){
  if(restriction()||type!=='event'||!payload)return false;
  const context=measurementContext();
  if(payload.name===undefined){
    let referrer='';
    try{if(['ortogra.fi','www.ortogra.fi'].includes(new URL(document.referrer).hostname))referrer='https://ortogra.fi/';}catch{}
    return {...page,referrer,data:context};
  }
  const event=sanitizeEvent(payload.name,payload.data??{});
  return event?{...page,...event,data:{...event.data,...context}}:false;
}
export function startAnalytics(){
  if(restriction()||loading||ready())return;
  const script=document.createElement('script');script.id='sentit-analytics';script.src=analyticsConfig.script;script.async=true;
  script.referrerPolicy='no-referrer';
  Object.assign(script.dataset,{websiteId:analyticsConfig.website,domains:analyticsConfig.hostname,excludeSearch:'true',excludeHash:'true',doNotTrack:'true',beforeSend:'sentitBeforeSend'});
  window.sentitBeforeSend=beforeSend;loading=true;
  const timeout=setTimeout(finish,6000);
  function finish(){clearTimeout(timeout);script.removeEventListener('load',finish);script.removeEventListener('error',finish);loading=false;if(!ready())script.remove();const pending=queue.splice(0);if(ready())for(const event of pending)track(event.name,event.data);notify();}
  script.addEventListener('load',finish);script.addEventListener('error',finish);document.head.append(script);notify();
}
export function track(name,data={}){
  if(restriction())return;
  const event=sanitizeEvent(name,data);if(!event)return;
  if(!ready()){if(loading&&queue.length<40)queue.push(event);return;}
  for(const item of [event,...universeEvents(event)]){
    try{window.umami.track(item.name,item.data)?.catch?.(()=>{});}catch{}
  }
}
export async function sendReport(entry,{part,element='',motiu,responseMode}){
  const known=readingEntries.get(entry?.language+'-'+entry?.code);
  if(reportAvailability()||!known||known.id!==entry?.id||!Object.hasOwn(reportReasons,part)||!Object.hasOwn(reportReasons[part],motiu))return false;
  entry=known;
  const allowed=part==='image'?['image']:['question','solution'].includes(part)?entry.questions.map(question=>question.id):[...(entry.introduction?['introduction']:[]),...entry.transcript.filter(p=>p.speaker&&p.id).map(p=>p.id)];
  if(element&&!allowed.includes(element))return false;
  if(['question','solution'].includes(part)&&!element)return false;
  const data={codi:entry.code,llengua:entry.language,part,motiu,...(element?{element}:{})};
  if(part==='text'&&['too_easy','too_difficult'].includes(motiu))Object.assign(data,{curs:entry.grade,dificultat:entry.level});
  if(['question','solution'].includes(part)){
    if(responseMode!==undefined&&!['open','choice'].includes(responseMode))return false;
    const question=entry.questions.find(q=>q.id===element);
    if(responseMode==='choice'&&!multipleChoice(entry,question))return false;
    data.format_pregunta=responseMode==='choice'?'abcd':'oberta';
  }
  try{
    const headers={'Content-Type':'application/json','x-umami-website-id':analyticsConfig.website,'x-umami-hostname':analyticsConfig.hostname};
    const cache=window.umami.getSession?.()?.cache;if(cache)headers['x-umami-cache']=cache;
    const response=await fetch(new URL('/api/send',analyticsConfig.script),{method:'POST',headers,body:JSON.stringify({type:'event',payload:{...page,name:'notifica_error',data}}),credentials:'omit',referrerPolicy:'no-referrer',signal:AbortSignal.timeout(6000)});
    if(!response.ok)return false;
    const result=await response.json();return Boolean(result?.cache&&!result.disabled&&!result.error);
  }catch{return false;}
}
