import { getVars } from "../../utils";
import { Bisection } from "./bisection";
function toObject(keys, vals) {
    const obj = {};
    for (let i = 0; i < keys.length; i++) {
        obj[keys[i]] = vals[i];
    }
    return obj;
}
function narrowRange(ranges, preset) {
    const rngs = { ...ranges };
    for (let k in preset) {
        const val = preset[k];
        if (k in rngs && Number.isFinite(val))
            rngs[k] = [val, val];
    }
    return rngs;
}
/**
 * Find a solution of the function under these ranges and presets.
 */
export function bisect(f, ranges, preset) {
    const vars = getVars(f);
    const narrowedRngs = narrowRange(ranges, preset);
    const bounds = vars.map($ => narrowedRngs[$]);
    const bi = new Bisection(f, bounds);
    const sol = bi.exec();
    return toObject(vars, sol);
}
//# sourceMappingURL=index.js.map