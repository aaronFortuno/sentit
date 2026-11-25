import { activities, legacyActivities } from './catalogue.js';
import { characters } from './content/characters.js';
import { universes } from './content/universes.js';
import { sessionJingles } from './session.js';
import { pendingProductionStages } from './production-stage.js';
import { multipleChoice } from './question-responses.js';

export const analyticsConfig={website:'6acf2cae-4b28-4d71-98dd-550d2d086dcc',hostname:'sentit.ortogra.fi',script:'https://maquestria.tail72bc84.ts.net:8443/script.js'};
const page={website:analyticsConfig.website,hostname:analyticsConfig.hostname,title:'Sentit',url:'/'};
const entries=new Map([...activities,...legacyActivities].map(entry=>[entry.code,entry]));
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
  canvia_vista:{code:true,vista:['fitxa','solucionari']},
  obre_impressio:{code:true,contingut:['fitxa','solucionari'],colleccio:'boolean'},
  escolta_audio:{code:true,accio:['inicia','pausa','repren','finalitza','reinicia','previsualitza']},
  configura_audio:{code:true,escoltes:['1','2','3'],ritme:['0.80','0.85','0.90','0.95','1.00','1.05','1.10','1.15','1.20'],lectura:times,pausa:times,sintonia:['cap',...sessionJingles.map(jingle=>jingle.id)],pautada:'boolean'},
  maqueta_fitxa:{code:true,bloc:['font','size','spacing','leading','codi_aula','imatge','instruccions','pistes','preguntes'],accio:['ajusta','amaga','recupera','linies','restableix','format'],font:['serif','sans','verdana'],format_pregunta:['oberta','abcd']},
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
  text:{wording:'Errada de llengua',fact:'Dada incorrecta',coherence:'Incoherència'},
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
  if(rule.code){const entry=entries.get(data.code??data.codi);if(!entry)return false;Object.assign(clean,{codi:entry.code,llengua:entry.language,curs:entry.grade,dificultat:entry.level,tipus:entry.genre});}
  for(const [key,allowed]of Object.entries(rule)){
    if(key==='code')continue;
    if(allowed==='boolean'?typeof data[key]==='boolean':allowed.includes(data[key]))clean[key]=data[key];
  }
  for(const key of ['accio','vista','contingut','tema','idioma','tipus','origen'])if(rule[key]&&!Object.hasOwn(clean,key))return false;
  return {name,...(Object.keys(clean).length?{data:clean}:{})};
}
function beforeSend(type,payload){
  if(restriction()||type!=='event'||!payload)return false;
  if(payload.name===undefined)return page;
  const event=sanitizeEvent(payload.name,payload.data??{});
  return event?{...page,...event}:false;
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
  try{window.umami.track(event.name,event.data)?.catch?.(()=>{});}catch{}
}
export async function sendReport(entry,{part,element='',motiu,responseMode}){
  const known=entries.get(entry?.code);
  if(reportAvailability()||!known||known.id!==entry?.id||!Object.hasOwn(reportReasons,part)||!Object.hasOwn(reportReasons[part],motiu))return false;
  entry=known;
  const allowed=part==='image'?['image']:['question','solution'].includes(part)?entry.questions.map(question=>question.id):[...(entry.introduction?['introduction']:[]),...entry.transcript.filter(p=>p.speaker&&p.id).map(p=>p.id)];
  if(element&&!allowed.includes(element))return false;
  if(['question','solution'].includes(part)&&!element)return false;
  const data={codi:entry.code,llengua:entry.language,part,motiu,...(element?{element}:{})};
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
