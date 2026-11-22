'use strict';
const assert=require('node:assert/strict'),{fork}=require('node:child_process'),path=require('node:path'),fs=require('node:fs/promises');
const {chromium}=require('C:/Users/afortun8/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const base='http://127.0.0.1:4280/',out=path.resolve(__dirname,'../../tmp/sentit-qa/seek');await fs.mkdir(out,{recursive:true});const server=fork(path.join(__dirname,'serve.cjs'),{env:{...process.env,SENTIT_PORT:'4280'},stdio:['ignore','pipe','inherit','ipc']});let browser;
 try{
  await new Promise(r=>server.stdout.once('data',r));browser=await chromium.launch({channel:'chrome',headless:true});const page=await browser.newPage({viewport:{width:1500,height:1000}}),errors=[];await page.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin?r.continue():r.abort());page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'#lectura=ca-S024');await page.waitForFunction(()=>document.getElementById('teacher-audio').duration>0);
  const slider=page.locator('#fragment-seek input');assert(!(await slider.isDisabled()));
  await slider.evaluate(s=>{s.value='30';s.dispatchEvent(new Event('input',{bubbles:true}));});assert(Math.abs(await page.locator('#teacher-audio').evaluate(a=>a.currentTime)-30)<.1);
  await page.locator('#preview-fragment').click();await page.waitForFunction(()=>document.getElementById('teacher-audio').currentTime>30.1);await page.locator('#preview-fragment').click();
  assert((await page.locator('#fragment-seek').innerText()).includes('0:30'));const range=await slider.boundingBox(),container=await page.locator('.audio-preview-actions').boundingBox();assert(range.width>=container.width*.95);
  await page.screenshot({path:path.join(out,'s024-timeline.png')});
  await page.goto(base+'#lectura=ca-S058');await page.waitForFunction(()=>document.querySelector('#received-voice-preview audio')?.duration>0);
  assert.equal(await page.locator('#received-voice-preview audio[controls]').count(),0,'No cramped native player in sidebar');
  const received=page.locator('#received-voice-preview input[type="range"]');await received.evaluate(s=>{s.value='15';s.dispatchEvent(new Event('input',{bubbles:true}));});assert(Math.abs(await page.locator('#received-voice-preview audio').evaluate(a=>a.currentTime)-15)<.1);
  await page.locator('#received-voice-preview button').click();await page.waitForFunction(()=>document.querySelector('#received-voice-preview audio').currentTime>15.1);await page.locator('#received-voice-preview button').click();
  await page.goto(base+'#lectura=ca-S061');await page.locator('#received-voice-preview').waitFor({state:'visible'});assert((await page.locator('#received-voice-preview').innerText()).includes('Falta el títol'));
  assert.deepEqual(errors,[]);console.log('PASS · full-width custom seek bar, real playback clock, precise seeking, received-voice player, missing-title notice and no page errors. Local only.');
 }finally{await browser?.close();server.kill();}
})().catch(e=>{console.error(e);process.exitCode=1;});
