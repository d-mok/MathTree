import { getVars, permute } from '../utils'
import _ from 'lodash'

function isFittableOrder(fs: zeroFunction[], givens: string[]): boolean {
    const founds = [...givens]

    for (let f of fs) {
        const vars = getVars(f)
        const isFull = _.includesAll(founds, vars) // f is full if all vars in it are found.
        if (isFull) return false
        founds.push(...vars) // mock solving f
    }

    return true
}

/**
 * Randomly get a fittable order for this set of functions under these presets.
 * If no fittable order exists, return undefined.
 */
export function getFittableOrder(
    fs: zeroFunction[],
    preset: valObj
): zeroFunction[] | undefined {
    const presetted = _.pickBy(preset, _.isFinite)
    const givens = _.keys(presetted)
    return permute(fs).find($ => isFittableOrder($, givens))
}
