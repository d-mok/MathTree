import { Fitter } from "./fitter";
/**
 * Fit the system of equations under given ranges and presets.
 */
export function fit(fs, ranges, preset) {
    let fitter = new Fitter(fs, ranges, preset);
    return fitter.fit();
}
//# sourceMappingURL=index.js.map