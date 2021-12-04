"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fit = void 0;
const fitter_1 = require("./fitter");
/**
 * Fit the system of equations under given ranges and presets.
 */
function fit(fs, ranges, preset) {
    let fitter = new fitter_1.Fitter(fs, ranges, preset);
    return fitter.fit();
}
exports.fit = fit;
//# sourceMappingURL=index.js.map