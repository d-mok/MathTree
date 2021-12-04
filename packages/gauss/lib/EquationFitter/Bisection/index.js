"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bisect = void 0;
const utils_1 = require("../../utils");
const bisection_1 = require("./bisection");
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
function bisect(f, ranges, preset) {
    const vars = (0, utils_1.getVars)(f);
    const narrowedRngs = narrowRange(ranges, preset);
    const bounds = vars.map($ => narrowedRngs[$]);
    const bi = new bisection_1.Bisection(f, bounds);
    const sol = bi.exec();
    return toObject(vars, sol);
}
exports.bisect = bisect;
//# sourceMappingURL=index.js.map