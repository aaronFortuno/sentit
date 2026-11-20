'use strict';
const assert=require('node:assert/strict'),{fork}=require('node:child_process'),path=require('node:path'),fs=require('node:fs/promises');
const {chromium}=require('C:/Users/afortun8/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const base='http://127.0.0.1:4269/',output=path.resolve(__dirname,'../../tmp/sentit-qa/publication-v0149');await fs.mkdir(output,{recursive:true});
 const server=fork(path.join(__dirname,'serve.cjs'),{env:{...process.env,SENTIT_PORT:'4269'},stdio:['ignore','pipe','inherit','ipc']});let browser;const errors=[];
 try{
  await new Promise(r=>server.stdout.once('data',r));browser=await chromium.launch({channel:'chrome',headless:true});const context=await browser.newContext({viewport:{width:1500,height:1000}});
  await context.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin?r.continue():r.abort());const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  const {activities}=await import('../catalogue.js'),{reviewScript}=await import('../review.js'),{imageOptions}=await import('../worksheet.js'),{strings}=await import('../locales.js');
  const codes=['S003','S004','S004D','S012','S018','S019'];
  for(const entry of activities.filter(e=>e.reviewStatus==='validated')){assert(entry.image?.src,entry.code+' publication illustration required');await fs.access(path.resolve(__dirname,'..',entry.image.src));assert(reviewScript(entry,strings.ca).every(p=>p.speaker&&!p.kind),entry.code+' speech-only final transcript');}
  for(const code of codes){
   const entry=activities.find(e=>e.code===code);assert.equal(entry.reviewStatus,'validated');const image=imageOptions(entry);assert(image.visible);assert.equal(image.width,80);assert.equal(image.position,'right');
   assert.deepEqual(reviewScript(entry,strings.ca).slice(1),entry.transcript.filter(p=>p.speaker&&!p.kind));
   await page.goto(base+'#lectura=ca-'+code);await page.locator('#workspace').waitFor({state:'visible'});await page.locator('.paper-illustration img').first().waitFor();
   await page.waitForFunction(()=>[...document.querySelectorAll('.paper-illustration img')].every(i=>i.complete&&i.naturalWidth===1536));
   assert.equal(await page.locator('.paper-review-watermark').count(),0);assert.equal(await page.locator('.paper-illustration').first().evaluate(n=>n.style.inlineSize),'80mm');
   assert(await page.locator('.paper-flow-image.image-right').count()>0);await page.locator('#answers-mode').click();
   assert.equal(await page.locator('.paper-direction,.paper-sound-cue,.paper-take,.paper-local-cut').count(),0);
   const spoken=await page.locator('.paper-transcript').evaluateAll(nodes=>nodes.map(n=>{const c=n.cloneNode(true);for(const badge of c.querySelectorAll('.paper-evidence-number'))badge.remove();return c.textContent;}));for(const part of entry.transcript.filter(p=>p.speaker))assert(spoken.join(' ').includes(part.text),code+' complete speech');
   assert.equal(await page.locator('.paper-answer-label').count(),entry.questions.length);
   assert.equal(await page.locator('.paper-illustration img').count(),1);assert.equal(await page.locator('.paper-evidence').count()>0,true);
   const overflow=await page.locator('.paper-content').evaluateAll(nodes=>nodes.some(n=>[...n.children].some(c=>c.getBoundingClientRect().bottom>n.getBoundingClientRect().bottom+2)));assert.equal(overflow,false,code+' pagination');
   if(['S004D','S018'].includes(code)){await page.screenshot({path:path.join(output,code+'-answers.png')});await page.pdf({path:path.join(output,code+'-answers.pdf'),preferCSSPageSize:true,printBackground:true});}
   await page.goto(base);await page.locator('#search').fill('ca-'+code);const card=page.locator('.activity-card').filter({has:page.locator(`.activity-card-code`,{hasText:code})}).first();assert.match(await card.locator('.activity-card-art img').getAttribute('src'),/assets\/images\//);
  }
  await page.goto(base+'#lectura=ca-S023');await page.locator('#workspace').waitFor({state:'visible'});assert(await page.locator('.paper-direction').count()>0);assert.match(await page.locator('.paper-review-label').first().innerText(),/àudio pendent de validar/);
  await page.goto(base+'#lectura=ca-S008');await page.locator('#workspace').waitFor({state:'visible'});await page.locator('#compare-jingles').click();await page.locator('#jingles-dialog').waitFor({state:'visible'});assert.equal(await page.locator('.jingle-pair').count(),4);assert.equal(await page.locator('#jingles-dialog audio').count(),8);
  await page.evaluate(()=>Promise.all(document.getAnimations().map(a=>a.finished.catch(()=>{}))));await page.screenshot({path:path.join(output,'jingles.png')});await page.keyboard.press('Escape');await page.locator('#jingles-dialog').waitFor({state:'hidden'});
  await context.addInitScript(()=>{window.previewPlays=[];window.Audio=class extends EventTarget{constructor(){super();this.preservesPitch=false;window.rehearsalAudio=this;}play(){window.previewPlays.push({src:this.src,rate:this.playbackRate,pitch:this.preservesPitch});return Promise.resolve();}pause(){}load(){}removeAttribute(){this.src='';}};});
  await page.reload();await page.locator('#audio-rate').selectOption('0.85');await page.locator('#audio-jingle-choice').selectOption('fil-de-veu');const link=await page.locator('#open-player').getAttribute('href');
  await page.locator('#preview-session').click();await page.locator('#preview-session-play').click();
  for(let i=1;i<=6;i++){await page.waitForFunction(n=>window.previewPlays.length===n,i);await page.evaluate(()=>window.rehearsalAudio.dispatchEvent(new Event('ended')));}
  await page.waitForFunction(()=>document.querySelector('#preview-session-status').textContent==='Sessió acabada');
  const clips=await page.evaluate(()=>window.previewPlays);assert.match(clips[0].src,/fil-de-veu.*obertura/);assert.match(clips[1].src,/intro/);assert.match(clips[2].src,/un-minut/);assert.match(clips[3].src,/-cos/);assert.match(clips[4].src,/repassa/);assert.equal(clips[3].src,clips[5].src);assert.equal(clips[3].rate,.85);assert(clips.every(c=>c.pitch));
  await page.keyboard.press('Escape');await page.locator('#session-preview-dialog').waitFor({state:'hidden'});await page.evaluate(()=>window.previewPlays=[]);await page.locator('#preview-session').click();await page.locator('#preview-skip-pauses').uncheck();await page.locator('#preview-session-play').click();
  for(let i=1;i<=3;i++){await page.waitForFunction(n=>window.previewPlays.length===n,i);await page.evaluate(()=>window.rehearsalAudio.dispatchEvent(new Event('ended')));}
  await page.waitForFunction(()=>document.querySelector('#preview-session-countdown').textContent==='1:00');assert(await page.locator('#preview-session-skip').isVisible());assert.equal(await page.locator('#open-player').getAttribute('href'),link);
  await page.screenshot({path:path.join(output,'session-wait.png')});await page.locator('#preview-session-skip').click();await page.waitForFunction(()=>window.previewPlays.length===4);await page.evaluate(()=>window.rehearsalAudio.dispatchEvent(new Event('ended')));await page.waitForFunction(()=>document.querySelector('#preview-session-countdown').textContent==='0:30');
  await page.evaluate(()=>window.dispatchEvent(new PageTransitionEvent('pagehide',{persisted:true})));assert.equal(await page.locator('#preview-session-label').innerText(),'Continua');await page.locator('#preview-session-play').click();assert.equal(await page.locator('#preview-session-label').innerText(),'Posa en pausa');
  await page.keyboard.press('Escape');await page.locator('#session-preview-dialog').waitFor({state:'hidden'});const stopped=await page.evaluate(()=>window.previewPlays.length);await page.evaluate(()=>window.rehearsalAudio.dispatchEvent(new Event('ended')));assert.equal(await page.evaluate(()=>window.previewPlays.length),stopped);
  for(const width of [768,375]){await page.setViewportSize({width,height:800});await page.locator('[data-workspace-panel="audio"]').click();await page.locator('#compare-jingles').click();await page.locator('#jingles-dialog').waitFor({state:'visible'});assert.equal(await page.evaluate(()=>document.querySelector('#jingles-dialog').scrollWidth>document.querySelector('#jingles-dialog').clientWidth),false);await page.keyboard.press('Escape');await page.locator('#jingles-dialog').waitFor({state:'hidden'});await page.locator('#audio-panel .panel-close').click();}
  assert.deepEqual(errors,[]);console.log('PASS · Six illustrated publications, speech-only complete transcripts, pagination and evidence, working drafts retained, compact jingle pairs, shared session preview/rate/prompts/repeats, real and skipped waits, disposal, unchanged QR and responsive dialogs.');
 }finally{await browser?.close();server.kill();}
})().catch(e=>{console.error(e);process.exitCode=1;});
