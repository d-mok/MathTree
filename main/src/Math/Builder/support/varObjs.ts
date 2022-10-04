import _ from 'lodash'
import { parseUnit, findUnit } from './units'

function parseRange(r: rangeInput): [number, number] {
    if (Array.isArray(r)) {
        if (r.length === 3) {
            // angle, [point,point,point]
            let angle = Angle(...r)
            return [Math.max(0, angle - 2), angle + 2]
        }
        return r.length === 2 ? r : [r[0], r[0]]
    } else {
        return r > 0 ? [r / 10, r * 10] : [r * 10, r / 10]
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
    sigfig: Record<string, number> | number,
    integer: boolean
) {
    for (let v of vars) {
        let vObj = vGrp[v]
        let sf = typeof sigfig === 'number' ? sigfig : sigfig[v] ?? 2
        vObj.val = Round(vObj.val, sf)
        if (integer) vObj.val = Fix(vObj.val, 0)
    }
}
