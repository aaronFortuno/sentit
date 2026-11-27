import { reportAvailability, reportReasons, sendReport, setExcluded, startAnalytics } from './analytics.js?v=0.1.131';
import { openDialog } from './motion.js';

export function mountErrorReport(dialog,t){
  const form=dialog.querySelector('#error-report-form'),part=form.elements.part,element=form.elements.element;
  const options=dialog.querySelector('.report-reasons'),status=dialog.querySelector('.report-status'),warning=dialog.querySelector('.report-warning');
  const fields=dialog.querySelector('.report-fields'),submit=form.querySelector('[type="submit"]');
  const sent=new Set();let active,visibleQuestions=[],audioOnly=false,busy=false,failed=false,completed=false,revision=0;
  const blocked=()=>reportAvailability();
  function availability(){
    const reason=blocked();warning.textContent=reason?t('reportBlocked')[reason]??t('reportFailed'):failed?t('reportFailed'):'';
    warning.hidden=!warning.textContent;fields.disabled=busy||completed;
    const retry=dialog.querySelector('[data-report-enable]');retry.hidden=!['disabled','script'].includes(reason);retry.textContent=t(reason==='disabled'?'reportAllow':'reportRetry');
    updateSubmit();
  }
  function updateSubmit(){submit.disabled=busy||fields.disabled||Boolean(blocked())||!part.value||!options.querySelector(':checked')||(element.required&&!element.value);}
  function updatePart(selected=''){
    let targets=[];
    if(['question','solution'].includes(part.value))targets=visibleQuestions.map((q,index)=>({id:q.id,label:t('reportQuestionLabel')(index+1)+(q.responseMode?` · ${t(q.responseMode==='choice'?'responseChoice':'responseOpen')}`:'')}));
    else if(part.value==='image')targets=[{id:'image',label:t('reportParts').image}];
    else targets=[...(active.introduction?[{id:'introduction',label:t('introduction')}]:[]),...active.transcript.filter(p=>p.speaker&&p.id).map((p,index)=>({id:p.id,label:t('reportBlock')(index+1)}))];
    element.replaceChildren(new Option(t('reportWhole'),''),...targets.map(target=>new Option(target.label,target.id)));
    element.required=['question','solution','image'].includes(part.value);
    element.closest('label').hidden=!part.value;
    element.value=targets.some(target=>target.id===selected)?selected:part.value==='image'?'image':'';
    options.replaceChildren(...Object.entries(reportReasons[part.value]??{}).map(([value,fallback])=>{
      const label=document.createElement('label'),input=document.createElement('input');input.type='radio';input.name='motiu';input.value=value;
      label.append(input,t('reportReasonLabels')[value]??fallback);return label;
    }));
    const legend=document.createElement('legend');legend.textContent=t('reportReason');options.prepend(legend);
    options.hidden=!part.value;updateSubmit();
  }
  form.addEventListener('change',event=>{status.textContent='';if(event.target===part)updatePart();else updateSubmit();});
  dialog.querySelector('[data-report-enable]').addEventListener('click',()=>blocked()==='disabled'?setExcluded(false):startAnalytics());
  for(const event of ['sentit-analytics-change','focus','storage'])window.addEventListener(event,()=>{if(dialog.open)availability();});
  dialog.addEventListener('close',()=>{revision++;busy=false;});
  form.addEventListener('submit',async event=>{
    event.preventDefault();if(!active||submit.disabled)return;
    const values={part:part.value,element:element.value,motiu:form.elements.motiu.value};
    if(['question','solution'].includes(values.part))values.responseMode=visibleQuestions.find(q=>q.id===values.element)?.responseMode??'open';
    const key=[active.language,active.code,values.part,values.element,values.motiu,values.responseMode??''].join('|');
    if(sent.has(key)){status.textContent=t('reportAlreadySent');return;}
    busy=true;failed=false;availability();status.textContent=t('reportSending');const version=revision;
    const delivered=await sendReport(active,values);
    if(version!==revision||!dialog.open)return;
    busy=false;failed=!delivered;
    if(delivered){completed=true;sent.add(key);status.textContent=t('reportSent');fields.disabled=true;submit.disabled=true;}
    else{status.textContent=t('reportFailed');availability();}
  });
  return {open(entry,{part:initial='',element:target='',audioOnly:onlyAudio=false,questions=entry.questions}={}){
    revision++;active=entry;visibleQuestions=questions;audioOnly=onlyAudio;busy=false;failed=false;completed=false;status.textContent='';
    dialog.querySelector('#error-report-context').textContent=`${entry.language}-${entry.code} · ${entry.title}`;
    part.replaceChildren(new Option(t('reportChoose'),''),...Object.entries(t('reportParts')).filter(([key])=>!audioOnly||key==='audio').filter(([key])=>key!=='image'||entry.image).map(([value,label])=>new Option(label,value)));
    part.value=audioOnly?'audio':initial;updatePart(target);availability();openDialog(dialog);
  }};
}
