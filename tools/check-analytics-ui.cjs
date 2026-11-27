'use strict';
const assert=require('node:assert/strict');const {fork}=require('node:child_process');const fs=require('node:fs/promises');const path=require('node:path');
const {chromium}=require('C:/Users/afortun8/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const publicBase='https://sentit.ortogra.fi';const receiver='https://maquestria.tail72bc84.ts.net:8443';
(async()=>{
  const server=fork(path.join(__dirname,'serve.cjs'),{env:{...process.env,SENTIT_PORT:'4248'},stdio:['ignore','pipe','inherit','ipc']});
  let browser;const errors=[],sent=[];let failReceiver=false,scriptRequests=0;
  const output=path.resolve(__dirname,'../../tmp/sentit-qa/analytics-v0125');await fs.mkdir(output,{recursive:true});
  try{
    await new Promise(r=>server.stdout.once('data',r));browser=await chromium.launch({channel:'chrome',headless:true});
    async function context(preference){
      const ctx=await browser.newContext({viewport:{width:1440,height:1000},serviceWorkers:'block'});
      await ctx.addInitScript(preference=>{
        localStorage.setItem('sentit.question-format.v1','open');
        if(preference==='gpc')Object.defineProperty(navigator,'globalPrivacyControl',{value:true});
        if(preference==='dnt')Object.defineProperty(navigator,'doNotTrack',{value:'1'});
        const play=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){window.activeSound=this;return play.call(this);};
        window.print=()=>{};
      },preference);
      await ctx.route('**/*',async route=>{
        const req=route.request(),url=new URL(req.url());
        if(url.origin===publicBase){const response=await fetch('http://127.0.0.1:4248'+url.pathname+url.search);return route.fulfill({status:response.status,contentType:response.headers.get('content-type'),body:Buffer.from(await response.arrayBuffer())});}
        if(url.origin===receiver&&url.pathname==='/script.js'){
          scriptRequests++;return route.fulfill({contentType:'application/javascript',body:`window.umami={getSession:()=>({cache:'local-test-cache'}),track(name,data){const payload=window.sentitBeforeSend('event',{name,data,url:location.href,referrer:'https://classroom.test/Joana'});if(payload===false)return Promise.resolve();return fetch('${receiver}/api/send',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({type:'event',payload})});}};window.umami.track();`});
        }
        if(url.origin===receiver&&url.pathname==='/api/send'){
          const headers={'access-control-allow-origin':'*','access-control-allow-headers':'*','access-control-allow-methods':'POST, OPTIONS'};
          if(req.method()==='OPTIONS')return route.fulfill({status:204,headers});
          const event=req.postDataJSON();sent.push(event);
          return route.fulfill({status:failReceiver?503:200,headers,contentType:'application/json',body:JSON.stringify(failReceiver?{error:'test-unavailable'}:{cache:'local-test-cache'})});
        }
        return route.abort();
      });
      const page=await ctx.newPage();page.on('pageerror',error=>{errors.push(error.message);console.error('Browser:',error.message);});return {ctx,page};
    }
    const {ctx,page}=await context();
    await page.goto(publicBase+'/?class_private=Joana#lectura=ca-S008R');await page.locator('#open-player').waitFor();
    async function checkFlag(page, selector) {
      const dimensions=await page.locator(selector).evaluate(svg=>{const rect=svg.getBoundingClientRect(),drawing=svg.getBBox();return {width:rect.width,height:rect.height,drawingRatio:drawing.width/drawing.height};});
      assert(Math.abs(dimensions.width-dimensions.height)<.1,'The flag viewport stays square');
      assert(dimensions.drawingRatio>=.75,'The flag drawing uses its full horizontal space');
    }
    await checkFlag(page,'#report-error svg');
    assert.equal(await page.locator('#report-error').evaluate(button=>getComputedStyle(button).flexShrink),'0');
    await page.waitForFunction(()=>Boolean(window.umami));
    assert.equal(await page.locator('#print').isEnabled(),true);
    assert(await page.locator('.paper-question').count()>0);
    await page.locator('#worksheet-mode').click();
    await page.locator('[data-open="v4v"]').click();await page.locator('#v4v').waitFor({state:'visible'});
    await page.locator('#analytics-excluded').check();
    const before=sent.length;await page.evaluate(()=>window.umami.track('obre_v4v'));await page.waitForTimeout(80);assert.equal(sent.length,before);
    await page.keyboard.press('Escape');await page.locator('#v4v').waitFor({state:'hidden'});
    await page.locator('#report-error').click();await page.locator('#error-report-dialog').waitFor({state:'visible'});
    assert.match(await page.locator('.report-warning').innerText(),/exclòs/);
    assert.equal(await page.locator('.report-fields').isEnabled(),true);
    assert.equal(await page.locator('#error-report-form [type="submit"]').isDisabled(),true);
    await page.locator('[data-report-enable]').click();
    await page.locator('#error-report-form [name="part"]').selectOption('audio');
    await page.locator('#error-report-form [name="motiu"][value="cut"]').check();
    failReceiver=true;await page.locator('#error-report-form [type="submit"]').click();
    await page.waitForFunction(()=>document.querySelector('.report-status').textContent.includes('No s’ha pogut'));
    failReceiver=false;await page.locator('#error-report-form [type="submit"]').click();
    await page.waitForFunction(()=>document.querySelector('.report-status').textContent.includes('Avís enviat'));
    const report=sent.findLast(event=>event.payload.name==='notifica_error');
    assert.deepEqual(report.payload.data,{codi:'S008R',llengua:'ca',part:'audio',motiu:'cut'});
    await page.screenshot({path:path.join(output,'report.png')});
    await page.keyboard.press('Escape');await page.locator('#error-report-dialog').waitFor({state:'hidden'});
    await page.locator('.paper-block').first().hover();await page.locator('[data-question-action="report"]').first().click();
    await checkFlag(page,'[data-question-action="report"] svg >> nth=0');
    assert.equal(await page.locator('#error-report-form [name="part"]').inputValue(),'question');
    assert.equal(await page.locator('#error-report-form [name="element"]').inputValue(),'treball');
    await page.keyboard.press('Escape');await page.locator('#error-report-dialog').waitFor({state:'hidden'});
    await page.locator('[data-open="v4v"]').click();await page.locator('.analytics-privacy').scrollIntoViewIfNeeded();
    await page.evaluate(()=>Promise.all(document.getAnimations().map(a=>a.finished.catch(()=>{}))));
    assert.equal(await page.locator('#analytics-excluded').evaluate(node=>Math.round(node.getBoundingClientRect().width)),34);
    await page.screenshot({path:path.join(output,'privacy.png')});
    await page.goto(publicBase+'/?escolta=ca-S008R&jingle=0');await page.locator('#play').click();
    await page.waitForFunction(()=>window.activeSound&&!window.activeSound.paused);
    await page.locator('#player-report').click();assert.equal(await page.evaluate(()=>window.activeSound.paused),true);
    assert.equal(await page.locator('#error-report-form [name="part"] option').count(),2);
    assert.equal(await page.locator('#error-report-dialog input[type="text"], #error-report-dialog textarea').count(),0);
    await page.setViewportSize({width:375,height:800});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    await ctx.close();
    for(const privacy of ['gpc','dnt']){
      const beforeScripts=scriptRequests,beforeEvents=sent.length;const test=await context(privacy);await test.page.goto(publicBase+'/#lectura=ca-S008R');
      await test.page.locator('#report-error').click();await test.page.locator('#error-report-dialog').waitFor({state:'visible'});
      assert.equal(scriptRequests,beforeScripts);assert.equal(sent.length,beforeEvents);
      assert.equal(await test.page.locator('#error-report-form [type="submit"]').isDisabled(),true);
      assert.equal(await test.page.locator('[data-report-enable]').isHidden(),true);
      await test.page.locator('#error-report-form [name="part"]').selectOption('question');
      await test.page.locator('#error-report-form [name="element"]').selectOption({index:1});
      await test.page.locator('#error-report-form [name="motiu"][value="unsupported"]').check();
      assert.equal(await test.page.locator('.report-fields').isEnabled(),true);
      assert.equal(await test.page.locator('#error-report-form [type="submit"]').isDisabled(),true,'Completing a report does not bypass GPC/DNT');
      await test.page.locator('#error-report-form').evaluate(form=>form.requestSubmit());
      assert.equal(scriptRequests,beforeScripts);assert.equal(sent.length,beforeEvents);
      await test.page.keyboard.press('Escape');
      await test.page.setViewportSize({width:375,height:800});
      await checkFlag(test.page,'#report-error svg');
      assert.equal(await test.page.locator('#report-error').evaluate(button=>button.getBoundingClientRect().width),36);
      await test.page.locator('#report-error').click();
      await test.page.locator('#error-report-form [name="part"]').selectOption('audio');
      await test.page.locator('#error-report-form [name="motiu"][value="pronunciation"]').check();
      await test.page.evaluate(()=>Promise.all(document.getAnimations().map(animation=>animation.finished.catch(()=>{}))));
      await test.page.screenshot({path:path.join(output,`report-${privacy}-mobile.png`)});
      await test.ctx.close();
    }
    assert(!JSON.stringify(sent).includes('Joana'));
    for(const event of sent){assert.equal(event.payload.url,'/');assert.equal(event.payload.website,'6acf2cae-4b28-4d71-98dd-550d2d086dcc');}
    assert.deepEqual(errors,[]);
    console.log('PASS · Square Lucide flags in desktop/mobile/question controls; GPC/DNT allow report choices but block submit and all requests; opt-out, acknowledged reports, failure/retry and audio pause. Collector mocked: no real analytics traffic.');
  }finally{await browser?.close();server.kill();}
})().catch(error=>{console.error(error);process.exitCode=1;});
