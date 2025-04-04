import _ from 'lodash'

/**
 * get the element at cyclic index
 * ```
 * At([1,2,3],-1) // 3
 * At([1,2,3],3) // 1
 * ```
 */
export function At<T>(arr: T[], index: number): T {
    return arr.nth(index)!
}

/**
 * get the chain of elements around `centreIndex` in cyclic fashion
 * ```
 * Lace([1,2,3,4,5,6],0,[-1,0,1]) // [6,1,2]
 * ```
 */
export function Lace<T>(
    arr: T[],
    centreIndex: number,
    relativeIndices: number[]
): T[] {
    if (arr.length === 0) return []
    return relativeIndices.map(i => arr.nth(centreIndex + i)!)
}

/**
 * If `bool`, return `[first, second]`, else return `[second, first]`
 * ```
 * Flop(true,1,2) // [1,2]
 * Flop(false,1,2) // [2,1]
 * ```
 */
export function Flop<T>(bool: boolean, first: T, second: T): [T, T] {
    return bool ? [first, second] : [second, first]
}

/**
 * Select the displayed value in each pair in `trueFalsePairs` according to `truth`.
 * ```
 * ComboDisplay([true,false],[[1,2],[3,4]]) // [1,4]
 * ComboDisplay(0,[1,2],[3,4]) // [1,4]
 * ComboDisplay(1,[1,2],[3,4]) // [2,3]
 * ```
 */
export function ComboDisplay<T>(
    truth: boolean[] | number,
    ...trueFalsePairs: [trueValue: T, falseValue: T][]
): T[] {
    if (Array.isArray(truth)) {
        return trueFalsePairs.map((p, i) => (truth[i] ? p[0] : p[1]))
    } else if (typeof truth === 'number') {
        return trueFalsePairs.map((p, i) => (truth === i ? p[0] : p[1]))
    }
    throw 'invalid truth'
}
