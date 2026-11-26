'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path'),{fork}=require('node:child_process');
const{chromium}=require('C:/Users/afortun8/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const root=process.cwd(),base='http://127.0.0.1:4298/',server=fork(path.join(root,'tools/serve.cjs'),{env:{...process.env,SENTIT_PORT:'4298'},stdio:['ignore','pipe','inherit','ipc']});let browser;
 try{
  await new Promise(r=>server.stdout.once('data',r));browser=await chromium.launch({channel:'chrome',headless:true});const context=await browser.newContext({viewport:{width:1450,height:950}});
  await context.route('**/*',route=>route.request().url().startsWith(base)?route.continue():route.abort());
  await context.addInitScript(()=>{localStorage.setItem('sentit.question-format.v1','choice');localStorage.setItem('sentit.catalogue.show-provisional.v1','true');window.played=[];const play=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){window.played.push({src:this.src,rate:this.playbackRate,pitch:this.preservesPitch});window.activeSound=this;return play.call(this);};});
  const page=await context.newPage(),errors=[],requests=[];page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));
  const nextTrack=async()=>{await page.waitForFunction(()=>window.activeSound&&!window.activeSound.paused&&Number.isFinite(window.activeSound.duration));await page.evaluate(()=>{const audio=window.activeSound;audio.currentTime=audio.duration-.04;});};
  for(const code of['S001','S023','S069','S130']){
   await page.goto(base+'#lectura=ca-'+code);await page.locator('#workspace').waitFor({state:'visible'});const button=page.locator('#preview-fragment'),seek=page.locator('#fragment-seek input');
   await page.waitForFunction(()=>Number(document.querySelector('#fragment-seek input').max)>10);
   const parts=await page.evaluate(async code=>{const{modularAudio}=await import('./content/modular-audio.js');return modularAudio['ca-'+code];},code);
   await button.click();await page.waitForFunction(()=>{const a=document.querySelector('#teacher-audio');return !a.paused&&a.dataset.audioPartIndex==='0'&&a.currentTime>0;});
   await seek.evaluate((range,time)=>{range.value=String(time);range.dispatchEvent(new Event('input',{bubbles:true}));},parts.introduction.seconds+7);
   await page.waitForFunction(()=>{const a=document.querySelector('#teacher-audio');return !a.paused&&a.dataset.audioPartIndex==='1'&&a.currentTime>=6.9;});assert.equal(await button.getAttribute('aria-pressed'),'true');
   await seek.evaluate(range=>{range.value='1';range.dispatchEvent(new Event('input',{bubbles:true}));});
   await page.waitForFunction(()=>{const a=document.querySelector('#teacher-audio');return !a.paused&&a.dataset.audioPartIndex==='0'&&a.currentTime>=.9;});
   await nextTrack();await page.waitForFunction(()=>{const a=document.querySelector('#teacher-audio');return !a.paused&&a.dataset.audioPartIndex==='1'&&a.currentTime>0&&a.currentTime<2;});
   assert.equal(await button.getAttribute('aria-pressed'),'true','Continuous playback after title ended');
   await button.click();await page.waitForFunction(()=>document.querySelector('#teacher-audio').paused);
   await seek.evaluate((range,time)=>{range.value=String(time);range.dispatchEvent(new Event('input',{bubbles:true}));},parts.introduction.seconds+12);
   await page.waitForFunction(()=>{const a=document.querySelector('#teacher-audio');return a.paused&&Math.abs(a.currentTime-12)<.2;});assert.equal(await button.getAttribute('aria-pressed'),'false');
   await page.locator('#audio-rate').selectOption('0.85');await button.click();await page.waitForFunction(()=>!document.querySelector('#teacher-audio').paused);
   assert.equal(await page.locator('#teacher-audio').evaluate(a=>a.playbackRate),.85);assert.equal(await page.locator('#teacher-audio').evaluate(a=>a.preservesPitch),true);
   await nextTrack();await page.waitForFunction(()=>document.querySelector('#preview-fragment').getAttribute('aria-pressed')==='false');
   await button.click();await page.waitForFunction(()=>{const a=document.querySelector('#teacher-audio');return !a.paused&&a.dataset.audioPartIndex==='0';});await button.click();
  }
  await page.screenshot({path:'../tmp/sentit-qa/s130-montage-review.png'});
  // Teacher rehearsal skips configurable waits; regular pupil mode keeps its waits.
  await page.locator('#preview-session').click();await page.waitForFunction(()=>window.activeSound&&!window.activeSound.paused);
  for(let n=0;n<9;n++){const text=await page.locator('#audio-preview-status').innerText();if(/acabad|finalitzat/i.test(text))break;await nextTrack();await page.waitForTimeout(180);}
  await page.goto(base+'?escolta=ca-S001&jingle=0');await page.locator('#play').click();await page.waitForFunction(()=>window.activeSound?.src.includes('-intro.mp3')&&!window.activeSound.paused);await nextTrack();await page.waitForFunction(()=>window.activeSound?.src.includes('-cos.mp3')&&!window.activeSound.paused);await nextTrack();await page.waitForFunction(()=>/acabad|finalitzat/i.test(document.querySelector('#play-status').textContent));
  await page.goto(base+'?escolta=ca-S001&p=0-2-0-0&jingle=0&ritme=1.10');await page.locator('#play').click();await page.waitForFunction(()=>window.activeSound?.src.includes('-intro.mp3')&&!window.activeSound.paused);await nextTrack();await page.waitForFunction(()=>window.activeSound?.src.includes('-cos.mp3')&&!window.activeSound.paused);assert.equal(await page.evaluate(()=>window.activeSound.playbackRate),1.1);await nextTrack();await page.waitForFunction(()=>window.played.filter(a=>a.src.includes('-cos.mp3')).length>=2&&window.activeSound.currentTime<2&&!window.activeSound.paused);await nextTrack();await page.waitForFunction(()=>/acabad|finalitzat/i.test(document.querySelector('#play-status').textContent));
  const records=await page.evaluate(async()=>Object.values((await import('./content/modular-audio.js')).modularAudio));const masterUrls=new Set(records.map(r=>new URL(r.master,base).href));assert(!requests.some(url=>masterUrls.has(url)),'No current playback may request a local-only full master');assert.deepEqual(errors,[]);
  console.log('PASS · Four real montages including S130: one title/body timeline, cross-track and paused seek, natural transition, restart and pitch-preserving rate; teacher rehearsal, direct QR and two-listen QR; zero full-master requests or page errors. Local only.');
 }finally{await browser?.close();server.kill();}
})().catch(error=>{console.error(error.stack);process.exitCode=1;});
