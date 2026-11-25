'use strict';
// Planning only: no approval changes, credentials, quota or provider calls.
const { packedProposalRequests } = require('./proposal-plan.cjs');
const { estimateSynthesis } = require('./audio-batch-policy.cjs');

function plainSpeechForecast(entries, additionalSpeech = []) {
  const content = entries.flatMap(entry => {
    const requests = packedProposalRequests(entry);
    if (requests.length !== 1) throw Error(entry.code + ': forecast requires one complete take');
    return requests[0].input[0].content.map(item => {
      const text = item.text.replace(/<long pause>|<short pause>/gu, '').trim();
      if (/[<>|]/u.test(text)) throw Error(entry.code + ': plain forecast cannot include vocal tags or overlap');
      return { type: 'text', text };
    });
  });
  // Include only actual pending correction text, never estimated padding.
  for (const text of additionalSpeech) {
    if (typeof text !== 'string' || !text.trim() || /[<>|]/u.test(text)) throw Error('Invalid additional spoken text');
    content.push({type:'text',text});
  }
  return estimateSynthesis({ input: [{ content }] });
}

module.exports = { plainSpeechForecast };
