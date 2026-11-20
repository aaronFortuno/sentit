'use strict';
const assert = require('node:assert/strict');
const { fork } = require('node:child_process');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require('C:/Users/afortun8/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = 'http://127.0.0.1:4244/';
function wave() {
  const rate=8000, samples=4000, buffer=Buffer.alloc(44+samples*2);
  buffer.write('RIFF'); buffer.writeUInt32LE(buffer.length-8,4); buffer.write('WAVEfmt ',8); buffer.writeUInt32LE(16,16);
  buffer.writeUInt16LE(1,20); buffer.writeUInt16LE(1,22); buffer.writeUInt32LE(rate,24); buffer.writeUInt32LE(rate*2,28); buffer.writeUInt16LE(2,32); buffer.writeUInt16LE(16,34); buffer.write('data',36); buffer.writeUInt32LE(samples*2,40);
  return buffer;
}
(async()=>{
  const server=fork(path.join(__dirname,'serve.cjs'),{env:{...process.env,SENTIT_PORT:'4244'},stdio:['ignore','pipe','inherit','ipc']});
  let browser; const errors=[];
  const output=path.resolve(__dirname,'../../tmp/sentit-qa/sound-v0123'); await fs.mkdir(output,{recursive:true});
  try {
    await new Promise((resolve,reject)=>{server.once('error',reject);server.stdout.once('data',resolve);});
    browser=await chromium.launch({channel:'chrome',headless:true});
    const context=await browser.newContext({viewport:{width:1440,height:900}});
    await context.route('https://**',route=>route.abort());
    await context.addInitScript(()=>{
      window.played=[];
      const play=HTMLMediaElement.prototype.play;
      HTMLMediaElement.prototype.play=function(){window.played.push({src:this.src,rate:this.playbackRate,pitch:this.preservesPitch});window.activeSound=this;return play.call(this);};
    });
    const page=await context.newPage(); page.on('pageerror',error=>errors.push(error.message));
    const settle=()=>page.evaluate(()=>Promise.all(document.getAnimations().map(animation=>animation.finished.catch(()=>{}))));
    await page.goto(base+'#lectura=ca-S008');
    await page.locator('#worksheet-mode').click();
    await page.locator('#audio-rate').waitFor();
    assert.equal(await page.locator('#audio-rate option').count(),9);
    await page.locator('#audio-rate').selectOption('0.85');
    assert.equal(await page.locator('#audio-jingle-choice option').count(),4);
    await page.locator('#audio-jingle-choice').selectOption('fil-de-veu');
    assert.equal(new URL(await page.locator('#open-player').getAttribute('href')).searchParams.get('sintonia'),'fil-de-veu');
    await page.reload();assert.equal(await page.locator('#audio-jingle-choice').inputValue(),'fil-de-veu');
    await page.locator('#audio-jingle').uncheck();
    assert(await page.locator('#audio-jingle-choice').isDisabled());
    const link=new URL(await page.locator('#open-player').getAttribute('href'));
    assert.equal(link.searchParams.get('ritme'),'0.85');assert.equal(link.searchParams.get('jingle'),'0');
    assert.match(await page.locator('.paper-session-summary').first().innerText(),/×0,85/);
    assert.equal(await page.locator('#teacher-audio').evaluate(node=>node.playbackRate),.85);
    await page.reload();assert.equal(await page.locator('#audio-rate').inputValue(),'0.85');assert.equal(await page.locator('#audio-jingle').isChecked(),false);
    await page.locator('.audio-sources summary').click();assert.match(await page.locator('#audio-resources').innerText(),/única narradora/);
    await settle();await page.screenshot({path:path.join(output,'editor.png')});
    await page.pdf({path:path.join(output,'fitxa.pdf'),preferCSSPageSize:true,printBackground:true});
    await page.locator('#answers-mode').click();
    await page.pdf({path:path.join(output,'solucionari.pdf'),preferCSSPageSize:true,printBackground:true});
    await page.locator('[data-open="v4v"]').click();await page.locator('#v4v').waitFor({state:'visible'});
    assert.match(await page.locator('#v4v').innerText(),/Recomanar-lo també ajuda/);
    await settle();await page.screenshot({path:path.join(output,'v4v.png')});
    await page.keyboard.press('Escape');await page.locator('#v4v').waitFor({state:'hidden'});
    for(const record of require('../assets/audio/remaster-v2-manifest.json').activities){
      const response=await page.request.get(base+'assets/audio/'+record.file);assert.equal(response.status(),200);
    }
    await page.goto(base+'?escolta=ca-S008&jingle=0&ritme=0.85');
    await page.locator('#play').click();
    await page.waitForFunction(()=>window.played.length&&window.activeSound.currentTime>.1);
    assert.equal(await page.evaluate(()=>window.activeSound.preservesPitch),true);
    assert.equal(await page.evaluate(()=>window.activeSound.playbackRate),.85);
    assert.match(await page.evaluate(()=>window.played[0].src),/s008.*v3.mp3$/);
    await page.locator('#play').click();
    assert.equal(await page.evaluate(()=>window.activeSound.paused),true);
    await page.goto(base+'?escolta=ca-S008&ritme=1.02');assert.equal(await page.locator('#play').isHidden(),true);
    // Short local fixtures exercise natural track endings and the real media element.
    await context.route('**/assets/audio/*.mp3',route=>route.fulfill({status:200,contentType:'audio/wav',body:wave()}));
    const {sessionJingles}=await import('../session.js');
    for(const jingle of sessionJingles){
      await page.goto(base+'?escolta=ca-S008&p=0-2-0-0&ritme=0.85&sintonia='+jingle.id);await page.locator('#play').click();
      await page.waitForFunction(()=>document.querySelector('#play-label').textContent==='Torna a començar');
      const played=await page.evaluate(()=>window.played);assert(played[0].src.endsWith(jingle.opening.slice(1)));assert.equal(played[0].rate,1);assert.equal(played.filter(item=>item.src.endsWith(jingle.opening.slice(1))).length,1);assert.equal(played.filter(item=>item.src.includes('-cos.mp3')).length,2);
    }
    await page.goto(base+'?escolta=ca-S008&sintonia=unknown');assert(await page.locator('#play').isHidden());
    await page.goto(base+'?escolta=ca-S008&p=0-2-1-0&ritme=0.85');
    await page.locator('#play').click();await page.waitForFunction(()=>window.played.length>=4);
    await page.waitForFunction(()=>document.querySelector('#play-label').textContent==='Torna a començar');
    const tracks=await page.evaluate(()=>window.played);
    assert.equal(tracks.filter(item=>item.src.includes('jingle')).length,1);
    assert.equal(tracks.filter(item=>item.src.includes('-cos.mp3')).length,2);
    assert(tracks.filter(item=>!item.src.includes('jingle')).every(item=>item.rate===.85&&item.pitch));
    await page.locator('#play').click();await page.waitForFunction(()=>window.played.length===5);
    for(const code of ['S003','S008','S018']){
      await page.goto(base+'#lectura=ca-'+code);await page.locator('#workspace').waitFor({state:'visible'});assert.equal(await page.locator('#worksheet-mode').getAttribute('aria-pressed'),'true');assert.equal(await page.locator('.paper-review-watermark').count(),0);assert(!(await page.locator('#print').isDisabled()));
    }
    for(const [code,file]of [['S012','s012-instruments-v2.mp3'],['S019','s019-cuinera-v2.mp3']]){
      await page.goto(base+'#lectura=ca-'+code);await page.locator('#workspace').waitFor({state:'visible'});assert((await page.locator('#teacher-audio').getAttribute('src')).endsWith(file));assert.match(await page.locator('.paper-review-label').innerText(),/àudio pendent de validar/i);
    }
    await page.goto(base);await page.locator('#search').fill('ca-S005');assert.match(await page.locator('.activity-review-label').innerText(),/Síntesi pendent d’esmena/);
    assert.equal(await page.locator('#compare-jingles').getAttribute('href'),'./proves/sintonies-mireia.html');
    await page.evaluate(async()=>{const {productionProgress}=await import('./content/production-progress.js');productionProgress['ca-S005'].feedback.forEach(f=>f.status='applied');document.querySelector('#search').dispatchEvent(new Event('input',{bubbles:true}));});
    await page.locator('#search').fill('ca-S010');await page.locator('#search').fill('ca-S005');
    await page.waitForFunction(()=>document.querySelector('.activity-review-label')?.textContent.startsWith('Àudio pendent de validar'));
    await page.goto(base+'#lectura=ca-S018');assert.match(await page.locator('#activity-meta').innerText(),/Dificultat: Avançada/);
    await page.goto(base);
    await page.setViewportSize({width:375,height:740});
    await page.locator('[data-open="v4v"]').click();await page.locator('#v4v').waitFor({state:'visible'});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    assert.equal(await page.locator('#v4v').evaluate(node=>node.scrollWidth>node.clientWidth+1),false);
    await settle();await page.screenshot({path:path.join(output,'v4v-mobile.png')});
    assert.deepEqual(errors,[]);
    console.log('PASS · Four selectable jingles and QR persistence, one opening per session, legacy and invalid links, native pitch, repeats, final publications, v2 remounts, correction-to-review lifecycle, difficulty metadata, sources, V4V desktop/mobile and two PDFs. Local checks only.');
  } finally {await browser?.close();server.kill();}
})().catch(error=>{console.error(error);process.exitCode=1;});
