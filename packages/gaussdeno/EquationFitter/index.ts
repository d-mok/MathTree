import { Fitter } from "./fitter.ts"
import { tree, zeroFunction, rangeObj, valObj } from "../types.ts"


/**
 * Fit the system of equations under given ranges and presets.
 */
export function fit(fs: zeroFunction[], ranges: rangeObj, preset: valObj): valObj {
    let fitter = new Fitter(fs, ranges, preset)
    return fitter.fit()
}


