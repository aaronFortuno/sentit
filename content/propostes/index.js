import { tercer } from './tercer.js';
import { quart } from './quart.js';
import { cinque } from './cinque.js';
import { sise } from './sise.js';
import { secondBatchActivities } from './tanda2/index.js';
export const firstBatchActivities = [...tercer, ...quart, ...cinque, ...sise];
export const proposedActivities = [...firstBatchActivities, ...secondBatchActivities];
export { secondBatchActivities, secondBatchSources } from './tanda2/index.js';
export { proposedVariants } from './variants.js';
