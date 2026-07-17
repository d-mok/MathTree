import { getVars } from '../utils.ts'
import { Bisection } from './bisection.ts'
import * as _ from 'es-toolkit'

function narrowRange(ranges: rangeObj, preset: valObj): rangeObj {
    return _.mapValues(ranges, (value, key) => {
        const val = preset[key]
        const fixedRange: [number, number] = [val, val]
        return Number.isFinite(val) ? fixedRange : value
    })
}

/**
 * Find a solution of the function under these ranges and presets.
 */
export function bisect(
    f: zeroFunction,
    ranges: rangeObj,
    preset: valObj,
): valObj {
    const vars = getVars(f)
    const narrowedRngs = narrowRange(ranges, preset)
    const bounds = vars.map($ => narrowedRngs[$])
    const sol = Bisection(f, bounds)
    return _.zipObject(vars, sol)
}
