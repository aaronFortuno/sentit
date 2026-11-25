'use strict';
const assert = require('node:assert/strict');
const { fork } = require('node:child_process');
const path = require('node:path');
const fs = require('node:fs/promises');
const { chromium } = require('C:/Users/afortun8/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async () => {
  const base='http://127.0.0.1:4298/', output=path.resolve(__dirname,'../../tmp/sentit-qa/abcd-catalogue-20261125');
  await fs.mkdir(output,{recursive:true});
  const server=fork(path.join(__dirname,'serve.cjs'),{env:{...process.env,SENTIT_PORT:'4298'},stdio:['ignore','pipe','inherit','ipc']});let browser;
  try {
    await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject);});
    browser=await chromium.launch({channel:'chrome',headless:true});
    const page=await browser.newPage({viewport:{width:1050,height:1320}}), errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.route('**/*',route=>route.request().url().startsWith(base)?route.continue():route.abort());
    await page.route(base+'__choice_checks__',route=>route.fulfill({contentType:'text/html',body:'<!doctype html><html lang="ca"><head><meta charset="utf-8"><link rel="stylesheet" href="styles.css"><link rel="stylesheet" href="worksheet.css"><style>html,body{height:auto;display:block;overflow:visible}body{padding:20px}.paper-pages{width:210mm;--sheet-zoom:1}</style></head><body><div id="check-paper" class="paper-pages"></div></body></html>'}));
    await page.goto(base+'__choice_checks__');
    const keys=await page.evaluate(async()=>{
      const {activities}=await import('./catalogue.js');
      const {registerQuestionChoices}=await import('./question-responses.js?v=0.1.116');
      await registerQuestionChoices(activities);await document.fonts.ready;
      return activities.map(a=>a.language+'-'+a.code);
    });
    const render=async(key,mode,answerKey,stress=false)=>page.evaluate(async({key,mode,answerKey,stress})=>{
      const {activities}=await import('./catalogue.js');
      const {renderWorksheet,defaultFormat}=await import('./worksheet.js');
      const {responseQuestion,openOnlyReason}=await import('./question-responses.js?v=0.1.116');
      const {strings}=await import('./locales.js');
      const {defaultSession}=await import('./session.js');
      const a=activities.find(a=>a.language+'-'+a.code===key),root=document.querySelector('#check-paper');
      const settings={questionMode:mode};
      const format=stress?{font:'verdana',size:14,leading:1.8,spacing:9}:defaultFormat;
      renderWorksheet(root,a,format,settings,{answerKey,labels:strings[a.language],toolLabels:strings.ca,listenUrl:!answerKey&&a.audio?'https://sentit.ortogra.fi/?escolta='+key+'&p=60-2-30':null,session:defaultSession});
      await document.fonts.ready;
      const resolved=a.questions.map(q=>responseQuestion(a,q,settings));
      const choice=resolved.filter(q=>q.responseMode==='choice');
      const text=root.textContent;
      const missing=resolved.flatMap(q=>[q.prompt,...(q.responseMode==='choice'?q.alternative.options.map(o=>o.text):[])]).filter(s=>!text.includes(s));
      const overflows=[...root.querySelectorAll('.paper-content')].flatMap((p,index)=>[...p.children].filter(c=>c.getBoundingClientRect().bottom>p.getBoundingClientRect().bottom+2).map(c=>({page:index+1,kind:c.className,text:c.textContent.slice(0,80)})));
      return {key,mode,answerKey,stress,choices:choice.length,total:a.questions.length,actualOptions:root.querySelectorAll('.paper-choice').length,correctMarks:root.querySelectorAll('.paper-choice.is-correct').length,answerLabels:root.querySelectorAll('.paper-answer-label').length,answers:root.querySelectorAll('.paper-answer').length,missing,overflows,pages:root.querySelectorAll('.paper').length,unclassified:a.questions.filter(q=>!responseQuestion(a,q,{questionMode:'choice'}).alternative&&!openOnlyReason(a,q)).map(q=>q.id)};
    },{key,mode,answerKey,stress});
    const rows=[];
    for(const key of keys) for(const [mode,answerKey]of [['choice',false],['choice',true],['open',false]]){
      const r=await render(key,mode,answerKey);
      assert.deepEqual(r.unclassified,[],key+': complete coverage');
      assert.equal(r.actualOptions,r.choices*4,key+': every option printed');
      assert.equal(r.correctMarks,answerKey?r.choices:0,key+': answer marks only in solution');
      assert.equal(r.answerLabels,answerKey?r.total:0,key+': solution labels');
      assert.deepEqual(r.missing,[],key+': no omitted prompt/option');
      assert.deepEqual(r.overflows,[],key+': pagination');
      if(!answerKey)assert.equal(r.answers,0,key+': no solutions on worksheet');
      rows.push(r);
    }
    for(const key of ['ca-S006','ca-S011','ca-S023','ca-S038D','ca-S067','ca-S083','ca-S099','ca-S111']){
      const r=await render(key,'choice',true,true);
      assert.deepEqual(r.missing,[],key+': larger font complete');assert.deepEqual(r.overflows,[],key+': larger font pagination');
      await page.screenshot({path:path.join(output,key+'-answers.png'),fullPage:true});
      if(['ca-S006','ca-S067','ca-S083'].includes(key))await page.pdf({path:path.join(output,key+'-answers.pdf'),preferCSSPageSize:true,printBackground:true});
    }
    await render('ca-S006','choice',false);await page.screenshot({path:path.join(output,'S006-worksheet.png'),fullPage:true});
    await render('ca-S023','choice',false);await page.screenshot({path:path.join(output,'S023-worksheet.png'),fullPage:true});
    await fs.writeFile(path.join(output,'render-results.json'),JSON.stringify(rows,null,2)+'\n');
    assert.deepEqual(errors,[]);
    console.log(`PASS · ${keys.length} readings in ABCD worksheet/solution and open mode; exact options, correct letters, no student answers, full coverage and pagination. Eight large-font solutions checked.`);
  } finally {await browser?.close();server.kill();}
})().catch(error=>{console.error(error);process.exitCode=1;});
