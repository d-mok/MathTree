import _ from 'lodash';
import { parseUnit, findUnit } from './units.js';
function parseRange(r) {
    if (Array.isArray(r)) {
        return r.length === 2 ? r : [r[0], r[0]];
    }
    else {
        return r > 0 ? [r / 10, r * 10] : [r * 10, r / 10];
    }
}
function toVarObj(varInput) {
    let [sym, name, range, unit, display] = varInput;
    return {
        sym,
        name,
        range: parseRange(range),
        unit: parseUnit(unit ?? findUnit(name) ?? ''),
        display: display ?? sym,
        val: NaN,
        subscript: '',
    };
}
export function toVarGrp(varInputs) {
    return _(varInputs).map(toVarObj).keyBy('sym').value();
}
export function RoundVars(vGrp, vars, sigfig, integer) {
    for (let v of vars) {
        let vObj = vGrp[v];
        let sf = typeof sigfig === 'number' ? sigfig : sigfig[v] ?? 2;
        vObj.val = Round(vObj.val, sf);
        if (integer)
            vObj.val = Fix(vObj.val, 0);
    }
}
