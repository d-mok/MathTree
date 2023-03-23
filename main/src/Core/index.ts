import {
    cal as $cal,
    INEQUAL as $INEQUAL,
    optimizer as $optimizer,
    rein as $rein,
    toReins as $toReins,
    lin as $lin,
} from 'ruby'

import 'lodash-extension'

globalThis.cal = $cal
globalThis.INEQUAL = $INEQUAL
globalThis.optimizer = $optimizer
globalThis.rein = $rein
globalThis.toReins = $toReins
globalThis.lin = $lin

import * as $Owl from './Owl/index'
globalThis.owl = $Owl

import * as $Ink from './Ink/index'
globalThis.ink = $Ink

declare global {
    var cal: typeof $cal
    var INEQUAL: typeof $INEQUAL
    var optimizer: typeof $optimizer
    var rein: typeof $rein
    var toReins: typeof $toReins
    var lin: typeof $lin
    var owl: typeof $Owl
    var ink: typeof $Ink
}
