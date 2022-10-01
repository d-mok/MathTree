import _ from 'lodash'
import { parseUnit, findUnit } from './units'

function parseRange(rng: rangeInput): [number, number] {
    if (Array.isArray(rng)) {
        return rng.length === 2 ? rng : [rng[0], rng[0]]
    } else {
        return rng > 0 ? [rng / 10, rng * 10] : [rng * 10, rng / 10]
    }
}

function toVarObj(varInput: varInput): varObj {
    let [sym, name, range, unit, display] = varInput
    return {
        sym,
        name,
        range: parseRange(range),
        unit: parseUnit(unit ?? findUnit(name) ?? ''),
        display: display ?? sym,
        val: NaN,
        subscript: '',
    }
}

export function toVarGrp(varInputs: varInput[]): varGrp {
    return _(varInputs).map(toVarObj).keyBy('sym').value()
}

export function RoundVars(
    vGrp: varGrp,
    vars: string[],
    sigfig: Record<string, number> | number
) {
    for (let v of vars) {
        let vObj = vGrp[v]
        let sf = typeof sigfig === 'number' ? sigfig : sigfig[v] ?? 2
        vObj.val = Round(vObj.val, sf)
    }
}
