import { pilotChoices } from './pilot-001.js';
import { batch002Choices } from './batch-002.js';
import { batch003Choices } from './batch-003.js';
import { batch004Choices } from './batch-004.js';

// Each batch is authored and reviewed independently from its canonical reading.
// Register future batches here before recording their exact question reviews.
export const questionChoiceBatches = [
  { id: 'pilot-001', author: 'root', choices: pilotChoices },
  { id: 'batch-002', author: '/root/abcd_author_002', choices: batch002Choices },
  { id: 'batch-003', author: '/root/abcd_author_003', choices: batch003Choices },
  { id: 'batch-004', author: '/root/abcd_author_004', choices: batch004Choices },
];
const entries = questionChoiceBatches.flatMap(batch => Object.entries(batch.choices));
if (new Set(entries.map(([key]) => key)).size !== entries.length) throw Error('Duplicate question-choice activity across batches');
export const questionChoices = Object.fromEntries(entries);
