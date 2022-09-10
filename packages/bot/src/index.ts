export { dress } from './dress'
export { evalCtx, exprCtx, exprCtxHTML } from './eval'
export { transpile } from './eval/ts'
export { cropSection } from './section'
export { Blacksmith } from './blacksmith'
export { HTMLWorker } from './dom'
export { shuffleIndex, shuffleAs } from './coshuffle'
export { Timer } from './timer'

import * as ts from './eval/ts'

// @ts-ignore
globalThis.ts = ts
