import {
    cal as $cal,
    vec as $vec,
    INEQUAL as $INEQUAL,
    optimizer as $optimizer,
    rein as $rein,
    reins as $reins,
    lin as $lin,
} from 'ruby'

globalThis.cal = $cal
globalThis.vec = $vec
globalThis.INEQUAL = $INEQUAL
globalThis.optimizer = $optimizer
globalThis.rein = $rein
globalThis.reins = $reins
globalThis.lin = $lin

import * as $Ink from './ink.js'
globalThis.ink = $Ink

import * as $schema from './schema.js'
globalThis.schema = $schema

declare global {
    var cal: typeof $cal
    var vec: typeof $vec
    var INEQUAL: typeof $INEQUAL
    var optimizer: typeof $optimizer
    var rein: typeof $rein
    var reins: typeof $reins
    var lin: typeof $lin
    var ink: typeof $Ink
    var schema: typeof $schema
}
