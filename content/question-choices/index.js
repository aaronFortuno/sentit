import { pilotChoices } from './pilot-001.js';
import { batch002Choices } from './batch-002.js';
import { batch003Choices } from './batch-003.js';
import { batch004Choices } from './batch-004.js';
import { batch005Choices } from './batch-005.js';
import { batch006Choices } from './batch-006.js';
import { batch007Choices } from './batch-007.js';
import { batch008Choices } from './batch-008.js';
import { batch009Choices } from './batch-009.js';
import { batch010Choices } from './batch-010.js';
import { batch011Choices } from './batch-011.js';
import { batch012Choices } from './batch-012.js';
import { batch013Choices } from './batch-013.js';
import { batch014Choices } from './batch-014.js';

// Each batch is authored and reviewed independently from its canonical reading.
// Register future batches here before recording their exact question reviews.
export const questionChoiceBatches = [
  { id: 'pilot-001', author: 'root', choices: pilotChoices },
  { id: 'batch-002', author: '/root/abcd_author_002', choices: batch002Choices },
  { id: 'batch-003', author: '/root/abcd_author_003', choices: batch003Choices },
  { id: 'batch-004', author: '/root/abcd_author_004', choices: batch004Choices },
  { id: 'batch-005', author: 'root', choices: batch005Choices },
  { id: 'batch-006', author: 'root', choices: batch006Choices },
  { id: 'batch-007', author: 'root', choices: batch007Choices },
  { id: 'batch-008', author: 'root', choices: batch008Choices },
  { id: 'batch-009', author: '/root/autoria_faules_131_134', choices: batch009Choices },
  { id: 'batch-010', author: '/root/autoria_llegendes_135_138', choices: batch010Choices },
  { id: 'batch-011', author: '/root/autoria_mites_139_142', choices: batch011Choices },
  { id: 'batch-012', author: 'root', choices: batch012Choices },
  { id: 'batch-013', author: 'root', choices: batch013Choices },
  { id: 'batch-014', author: 'root', choices: batch014Choices },
];
const entries = questionChoiceBatches.flatMap(batch => Object.entries(batch.choices));
if (new Set(entries.map(([key]) => key)).size !== entries.length) throw Error('Duplicate question-choice activity across batches');
export const questionChoices = Object.fromEntries(entries);
