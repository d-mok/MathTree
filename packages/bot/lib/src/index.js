export { dress } from './dress/index.js';
export { evalCtx, exprCtx, exprCtxHTML } from './eval/index.js';
export { transpile } from './eval/ts.js';
export { cropSection } from './section/index.js';
export { loopSection } from './loop/index.js';
export { Blacksmith } from './blacksmith/index.js';
export { HTMLWorker } from './dom/index.js';
export { shuffleIndex, shuffleAs } from './coshuffle/index.js';
export { Timer } from './timer/index.js';
import * as ts from './eval/ts.js';
// @ts-ignore
globalThis.ts = ts;
//# sourceMappingURL=index.js.map