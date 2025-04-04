/**
 * get the element at cyclic index
 * ```
 * At([1,2,3],-1) // 3
 * At([1,2,3],3) // 1
 * ```
 */
export function At(arr, index) {
    return arr.nth(index);
}
/**
 * get the chain of elements around `centreIndex` in cyclic fashion
 * ```
 * Lace([1,2,3,4,5,6],0,[-1,0,1]) // [6,1,2]
 * ```
 */
export function Lace(arr, centreIndex, relativeIndices) {
    if (arr.length === 0)
        return [];
    return relativeIndices.map(i => arr.nth(centreIndex + i));
}
/**
 * If `bool`, return `[first, second]`, else return `[second, first]`
 * ```
 * Flop(true,1,2) // [1,2]
 * Flop(false,1,2) // [2,1]
 * ```
 */
export function Flop(bool, first, second) {
    return bool ? [first, second] : [second, first];
}
/**
 * Select the displayed value in each pair in `trueFalsePairs` according to `truth`.
 * ```
 * ComboDisplay([true,false],[[1,2],[3,4]]) // [1,4]
 * ComboDisplay(0,[1,2],[3,4]) // [1,4]
 * ComboDisplay(1,[1,2],[3,4]) // [2,3]
 * ```
 */
export function ComboDisplay(truth, ...trueFalsePairs) {
    if (Array.isArray(truth)) {
        return trueFalsePairs.map((p, i) => (truth[i] ? p[0] : p[1]));
    }
    else if (typeof truth === 'number') {
        return trueFalsePairs.map((p, i) => (truth === i ? p[0] : p[1]));
    }
    throw 'invalid truth';
}
