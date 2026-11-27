'use strict';
const assert=require('node:assert/strict'),path=require('node:path'),{fork}=require('node:child_process');
const{chromium}=require('C:/Users/afortun8/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const origin='https://sentit.ortogra.fi',collector='https://maquestria.tail72bc84.ts.net:8443',base='http://127.0.0.1:4293';
 const server=fork(path.join(__dirname,'serve.cjs'),{env:{...process.env,SENTIT_PORT:'4293'},stdio:['ignore','pipe','inherit','ipc']});let browser;
 try{
  await new Promise(r=>server.stdout.once('data',r));browser=await chromium.launch({channel:'chrome',headless:true});const context=await browser.newContext({viewport:{width:1500,height:950}}),events=[],errors=[];
  let release;const gate=new Promise(resolve=>release=resolve);
  await context.addInitScript(()=>{localStorage.setItem('sentit.question-format.v1','choice');window.print=()=>{};Object.defineProperty(navigator,'clipboard',{value:{writeText:async()=>{}}});const play=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){window.activeSound=this;return play.call(this);};});
  await context.route('**/*',async route=>{
   const request=route.request(),url=new URL(request.url());
   if(url.origin===origin){const response=await fetch(base+url.pathname+url.search);return route.fulfill({status:response.status,contentType:response.headers.get('content-type'),body:Buffer.from(await response.arrayBuffer())});}
   if(url.origin===collector&&url.pathname==='/script.js'){await gate;return route.fulfill({contentType:'application/javascript',body:`window.umami={track(name,data){const payload=window.sentitBeforeSend('event',{name,data,url:location.href,referrer:'https://classroom.test/Carla'});return payload===false?Promise.resolve():fetch('${collector}/api/send',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({type:'event',payload})});}};window.umami.track();`});}
   if(url.origin===collector&&url.pathname==='/api/send'){if(request.method()==='POST')events.push(request.postDataJSON().payload);return route.fulfill({status:200,contentType:'application/json',headers:{'access-control-allow-origin':'*','access-control-allow-headers':'*','access-control-allow-methods':'POST, OPTIONS'},body:'{"cache":"local-test"}'});}
   return route.abort();
  });
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  await page.goto(origin+'/?via=nus&classe=Carla#lectura=ca-S008R',{waitUntil:'domcontentloaded'});await page.locator('.paper-question').first().waitFor();assert.equal(events.length,0);release();
  await page.waitForFunction(()=>Boolean(window.umami));await page.waitForTimeout(150);
  const named=name=>events.filter(e=>e.name===name);
  assert.equal(named('obre_comprensio').length,1,'Delayed script keeps one direct-entry event');
  const reading=named('obre_comprensio')[0];assert.equal(reading.data.lectura,'ca-S008R');assert.equal(reading.data.titol,'La foto que faltava · Històries amb sentit');assert.equal(reading.data.estat,'publicada');assert.equal(reading.data.canal,'nus');assert.equal(reading.data.entorn,'docent');
  assert.deepEqual(new Set(named('us_univers').filter(e=>e.data.accio==='obre').map(e=>e.data.univers)),new Set(['aina-ferran']));assert.equal(named('us_univers').filter(e=>e.data.accio==='obre').length,1,'Merged source IDs do not duplicate universe events');
  await page.locator('#worksheet-mode').click();await page.locator('#print').click();await page.waitForTimeout(120);assert.equal(named('obre_impressio').length,1);assert.equal(named('obre_impressio')[0].data.contingut,'fitxa');assert.equal(named('us_univers').filter(e=>e.data.accio==='impressio_fitxa').length,1);
  await page.locator('#copy-link').click();await page.waitForTimeout(100);assert.equal(named('copia_enllac').length,1);
  await page.locator('#preview-fragment').click();await page.waitForFunction(()=>!document.querySelector('#teacher-audio').paused);await page.waitForTimeout(100);
  assert.equal(named('escolta_audio').filter(e=>e.data.accio==='previsualitza').length,1);
  await page.evaluate(()=>{const a=document.querySelector('#teacher-audio');a.currentTime=a.duration-.03;});await page.waitForFunction(()=>document.querySelector('#teacher-audio').dataset.audioPartIndex==='1');await page.waitForTimeout(100);
  assert.equal(named('escolta_audio').filter(e=>e.data.accio==='previsualitza').length,1,'Title/body transition is not a second preview');
  await page.locator('#preview-fragment').click();
  await page.goto(origin+'/?escolta=ca-S008R&jingle=0');await page.locator('#play').waitFor();await page.waitForTimeout(100);assert.equal(named('entra_escolta').length,1);assert.equal(named('entra_escolta')[0].data.canal,'nus','Arrival channel survives the same-tab listening link');
  await page.locator('#play').click();await page.waitForFunction(()=>window.activeSound&&!window.activeSound.paused&&Number.isFinite(window.activeSound.duration));await page.waitForTimeout(100);
  assert.equal(named('escolta_audio').filter(e=>e.data.accio==='inicia').length,1);
  // Exercise both media-end callbacks without waiting through the full story.
  await page.evaluate(()=>window.activeSound.dispatchEvent(new Event('ended')));await page.waitForFunction(()=>window.activeSound.src.includes('-cos.mp3')&&!window.activeSound.paused&&window.activeSound.duration>30&&window.activeSound.currentTime>.1);await page.evaluate(()=>window.activeSound.dispatchEvent(new Event('ended')));await page.waitForTimeout(200);
  assert.equal(named('escolta_audio').filter(e=>e.data.accio==='finalitza').length,1);
  for(const action of ['inicia_escolta','completa_escolta']){const list=named('us_univers').filter(e=>e.data.accio===action);assert.equal(list.length,1);assert(list.every(e=>e.data.entorn==='escolta'&&e.data.estat==='publicada'));}
  await page.goto(origin+'/');await page.locator('.activity-card').first().waitFor();assert.equal(await page.locator('#show-provisional').isChecked(),false,'New visitors start with published material');
  assert(await page.locator('.activity-card').evaluateAll(async cards=>{const{activities}=await import('./catalogue.js');return cards.every(card=>{const entry=activities.find(e=>e.id===card.dataset.id);return entry&&!['pending','audio-review'].includes(entry.reviewStatus);});}));
  await page.locator('#show-provisional').check();await page.reload();await page.locator('.activity-card').first().waitFor();assert.equal(await page.locator('#show-provisional').isChecked(),true,'Saved review preference survives the new default');
  assert(!JSON.stringify(events).includes('Carla'));assert(events.every(e=>e.url==='/'&&e.data.mesura===2));assert.deepEqual(errors,[]);
  console.log('PASS · Locally mocked collector: queued direct entry once, every linked universe once per action, print intent, copied link, one modular preview, pupil arrival/start/completion and bounded acquisition channel. No private query values or real analytics traffic.');
 }finally{await browser?.close();server.kill();}
})().catch(e=>{console.error(e.stack);process.exitCode=1;});
