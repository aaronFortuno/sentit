'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path'),crypto=require('node:crypto'),{fork}=require('node:child_process');
const{chromium}=require('C:/Users/afortun8/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const root=process.cwd(),base='http://127.0.0.1:4299/',before=await fs.readFile('content/production-progress.js'),manifest=JSON.parse(await fs.readFile('assets/audio/music-previews/manifest.json','utf8'));
 assert.deepEqual(manifest.approvedIds,['F1','L1','L2','L3','M1','M2','M3']);assert.deepEqual(manifest.pendingIds,['F4','F5','F6','F7']);
 for(const track of manifest.tracks){const bytes=await fs.readFile(track.preview);assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),track.previewSha256);assert.deepEqual(track.usedBy,[]);}
 const server=fork(path.join(root,'tools/serve.cjs'),{env:{...process.env,SENTIT_PORT:'4299'},stdio:['ignore','pipe','inherit','ipc']});let browser;
 try{
  await new Promise(r=>server.stdout.once('data',r));browser=await chromium.launch({channel:'chrome',headless:true});const context=await browser.newContext({viewport:{width:1450,height:950}});await context.route('**/*',route=>route.request().url().startsWith(base)?route.continue():route.abort());
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(base+'?musiques=faules-mon');const dialog=page.locator('#narration-music-dialog');await dialog.waitFor({state:'visible'});
  assert.deepEqual(await dialog.locator('[data-candidate]').evaluateAll(cards=>cards.map(card=>card.dataset.candidate)),['F1','F4','F5','F6','F7']);
  assert.equal(await dialog.locator('[data-status=approved]').count(),1);assert.equal(await dialog.locator('[data-status=candidate]').count(),4);
  for(const id of['F4','F5','F6','F7']){const card=dialog.locator(`[data-candidate=${id}]`);await card.locator('button').click();await page.waitForFunction(id=>{const a=document.querySelector(`[data-candidate=${id}] audio`);return !a.paused&&a.currentTime>0&&Number.isFinite(a.duration);},id);const duration=await card.locator('audio').evaluate(a=>a.duration);assert(duration>=32&&duration<32.2);assert.equal(await page.locator('audio').evaluateAll(audios=>audios.filter(a=>!a.paused).length),1);assert.equal(await card.locator('.music-credit a').count(),2);assert(await card.locator('input[type=range]').isEnabled());}
  await dialog.evaluate(el=>Promise.all(el.getAnimations().map(a=>a.finished)));await page.screenshot({path:'../tmp/sentit-qa/fable-music-desktop.png'});
  for(const label of['Llegendes d’aquí i d’arreu','Mites de l’antiguitat']){await dialog.getByRole('button',{name:label,exact:true}).click();assert.equal(await dialog.locator('[data-candidate]').count(),3);assert.equal(await dialog.locator('[data-status=approved]').count(),3);}
  await page.keyboard.press('Escape');await dialog.waitFor({state:'hidden'});assert.equal(await page.locator('audio').evaluateAll(audios=>audios.filter(a=>!a.paused).length),0);
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>{localStorage.setItem('sentit-theme','dark');localStorage.setItem('sentit-lang','es');});await page.goto(base+'?musiques=faules-mon');await dialog.waitFor({state:'visible'});assert.equal(await dialog.locator('[data-status=candidate]').first().innerText(),'Nueva propuesta');
  const size=await dialog.evaluate(el=>({right:el.getBoundingClientRect().right,width:el.clientWidth,scroll:el.scrollWidth}));assert(size.right<=390&&size.scroll<=size.width+1,JSON.stringify(size));await dialog.evaluate(el=>Promise.all(el.getAnimations().map(a=>a.finished)));await page.screenshot({path:'../tmp/sentit-qa/fable-music-mobile.png'});
  assert.deepEqual(errors,[]);assert((await fs.readFile('content/production-progress.js')).equals(before));
  console.log('PASS · F1 reference plus 4 new playable 32-second alternatives; F2/F3 retired from active list; legends/myths labelled approved; hashes/credits, exclusive playback, mobile dark/Spanish, and all production approvals unchanged. Local only.');
 }finally{await browser?.close();server.kill();}
})().catch(error=>{console.error(error.stack);process.exitCode=1;});
