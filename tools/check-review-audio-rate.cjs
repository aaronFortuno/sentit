'use strict';
const assert=require('node:assert/strict'),path=require('node:path'),{fork}=require('node:child_process');
const{chromium}=require('C:/Users/afortun8/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const root=process.cwd(),base='http://127.0.0.1:4299/',server=fork(path.join(root,'tools/serve.cjs'),{env:{...process.env,SENTIT_PORT:'4299'},stdio:['ignore','pipe','inherit','ipc']});let browser;
 try{
  await new Promise(r=>server.stdout.once('data',r));browser=await chromium.launch({channel:'chrome',headless:true});const context=await browser.newContext({viewport:{width:1450,height:950}});
  await context.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
  await context.addInitScript(()=>{localStorage.setItem('sentit.question-format.v1','choice');localStorage.setItem('sentit.catalogue.show-provisional.v1','true');});
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  const preview=page.locator('#received-voice-preview');
  const rateState=audio=>audio.evaluate(a=>({rate:a.playbackRate,pitch:a.preservesPitch,paused:a.paused,time:a.currentTime}));
  for(const code of ['S133','S134','S141','S142']){
   await page.goto(base+'#lectura=ca-'+code);await preview.waitFor({state:'visible'});
   assert.equal(await preview.locator('.review-rate-controls button').count(),3);
   const audio=preview.locator('audio');await preview.getByRole('button',{name:'Velocitat de revisió: ×1,25',exact:true}).click();
   assert.equal((await rateState(audio)).rate,1.25);assert((await rateState(audio)).pitch);
   await preview.locator('button.button').click();await page.waitForFunction(()=>document.querySelector('#received-voice-preview audio').currentTime>.1);
   const before=await rateState(audio);await preview.getByRole('button',{name:'Velocitat de revisió: ×1,5',exact:true}).click();const after=await rateState(audio);
   assert.equal(after.rate,1.5);assert(after.pitch&&!after.paused&&after.time>=before.time);
   await preview.locator('button.button').click();assert((await rateState(audio)).paused);
   assert.equal(Number(await page.locator('#audio-rate').inputValue()),1,'Review speed does not change the pupil session');
  }
  await page.reload();await preview.waitFor({state:'visible'});assert.equal((await rateState(preview.locator('audio'))).rate,1.5);
  await page.screenshot({path:path.join(root,'../tmp/sentit-qa/voice-review-speed.png')});
  await page.goto(base+'#lectura=ca-S010');await page.locator('#repair-previews > button').click();const dialog=page.locator('#repair-preview-dialog');await dialog.waitFor({state:'visible'});
  const groups=dialog.locator('.review-rate-controls');assert(await groups.count()>=2);await groups.first().getByRole('button',{name:'Velocitat de revisió: ×1',exact:true}).click();
  assert((await dialog.locator('audio').evaluateAll(nodes=>nodes.every(a=>a.playbackRate===1&&a.preservesPitch))));
  await page.goto(base+'proves/veus-rebudes.html#S133');await page.locator('#S133 .review-rate-controls').waitFor();const article=page.locator('#S133');
  await article.getByRole('button',{name:'Velocitat de revisió: ×1,25',exact:true}).click();assert.equal((await rateState(article.locator('audio'))).rate,1.25);
  assert(await page.locator('audio').evaluateAll(nodes=>nodes.every(a=>a.playbackRate===1.25&&a.preservesPitch)));
  await page.goto(base+'proves/correccions-l44.html');await page.locator('.review-rate-controls').first().waitFor();assert(await page.locator('audio').evaluateAll(nodes=>nodes.every(a=>a.playbackRate===1.25)));
  const blocked=await browser.newContext();await blocked.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());await blocked.addInitScript(()=>{Object.defineProperty(window,'sessionStorage',{get(){throw Error('Storage unavailable');}});});
  const isolated=await blocked.newPage();isolated.on('pageerror',e=>errors.push(e.message));await isolated.goto(base+'proves/veus-rebudes.html');const first=isolated.locator('.review-rate-controls').first();await first.waitFor();await first.getByRole('button',{name:'Velocitat de revisió: ×1,5',exact:true}).click();assert.equal(await isolated.locator('audio').first().evaluate(a=>a.playbackRate),1.5);await blocked.close();
  assert.deepEqual(errors,[]);console.log('PASS · Four new voice previews; ×1/×1.25/×1.5 with pitch preservation, uninterrupted playing, navigation/reload memory, repair comparison sync, standalone review pages and unavailable storage. Pupil session unchanged. Local only.');
 }finally{await browser?.close();server.kill();}
})().catch(e=>{console.error(e.stack);process.exitCode=1;});
