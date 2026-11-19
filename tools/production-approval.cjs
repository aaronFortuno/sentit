'use strict';
const { createHash } = require('node:crypto');
function fingerprint(entry, spec, plan) {
  const { status, approvedFingerprint, reviewedAt, ...montage } = plan;
  return createHash('sha256').update(JSON.stringify({ code:entry.code, language:entry.language, introduction:entry.introduction, transcript:entry.transcript, productionNotes:entry.productionNotes, generationPlan:entry.generationPlan, direction:spec, montage })).digest('hex');
}
function assertProductionApproved(entry, spec, plan) {
  if (plan?.reviewActivity && plan.reviewActivity !== `${entry.language}-${entry.code}`) {
    throw Error(entry.code+': cal validar i preparar '+plan.reviewActivity+' com a versió independent abans de sintetitzar. Cap petició enviada.');
  }
  if (!plan || plan.status !== 'approved' || !plan.reviewedAt || plan.approvedFingerprint !== fingerprint(entry,spec,plan)) {
    throw Error(entry.code+': cal validar amb el docent el guió, les veus i l’escaleta completa abans de sintetitzar. Cap petició enviada.');
  }
}
module.exports = { fingerprint, assertProductionApproved };
