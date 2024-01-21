import { getVars } from '../utils.js';
import { Bisection } from './bisection.js';
import _ from 'lodash';
function narrowRange(ranges, preset) {
    return _.mapValues(ranges, (value, key) => {
        let val = preset[key];
        let fixedRange = [val, val];
        return Number.isFinite(val) ? fixedRange : value;
    });
}
/**
 * Find a solution of the function under these ranges and presets.
 */
export function bisect(f, ranges, preset) {
    const vars = getVars(f);
    const narrowedRngs = narrowRange(ranges, preset);
    const bounds = vars.map($ => narrowedRngs[$]);
    const sol = Bisection(f, bounds);
    return _.zipObject(vars, sol);
}
//# sourceMappingURL=index.js.map