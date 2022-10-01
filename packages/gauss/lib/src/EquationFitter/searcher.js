import { getVars, permute } from '../utils';
import _ from 'lodash';
function includesAll(superset, subset) {
    return _.difference(subset, superset).length === 0;
}
function isFittableOrder(fs, givens) {
    const founds = [...givens];
    for (let f of fs) {
        const vars = getVars(f);
        // f is full if all vars in it are found.
        const isFull = includesAll(founds, vars);
        if (isFull)
            return false;
        founds.push(...vars); // mock solving f
    }
    return true;
}
/**
 * Randomly get a fittable order for this set of functions under these presets.
 * If no fittable order exists, return undefined.
 */
export function getFittableOrder(fs, preset) {
    const presetted = _.pickBy(preset, _.isFinite);
    const givens = _.keys(presetted);
    return permute(fs).find($ => isFittableOrder($, givens));
}
//# sourceMappingURL=searcher.js.map