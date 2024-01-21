import { getVars } from '../utils.js'
import { Bisection } from './bisection.js'
import _ from 'lodash'

function narrowRange(ranges: rangeObj, preset: valObj): rangeObj {
    return _.mapValues(ranges, (value, key) => {
        let val = preset[key]
        let fixedRange: [number, number] = [val, val]
        return Number.isFinite(val) ? fixedRange : value
    })
}

/**
 * Find a solution of the function under these ranges and presets.
 */
export function bisect(
    f: zeroFunction,
    ranges: rangeObj,
    preset: valObj
): valObj {
    const vars = getVars(f)
    const narrowedRngs = narrowRange(ranges, preset)
    const bounds = vars.map($ => narrowedRngs[$])
    const sol = Bisection(f, bounds)
    return _.zipObject(vars, sol)
}
