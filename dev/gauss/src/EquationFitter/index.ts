import { Fitter } from './fitter.ts'
import type { zeroFunction, rangeObj, valObj } from '../globals.d.ts'

/**
 * Fit the system of equations under given ranges and presets.
 */
export function fit(
    fs: zeroFunction[],
    ranges: rangeObj,
    preset: valObj,
): valObj {
    const fitter = new Fitter(fs, ranges, preset)
    return fitter.fit()
}
