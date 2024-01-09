import { checkIt, inspectIt, captureAll, exposeAll } from 'contract'
import _ from 'lodash'
import * as math from 'mathjs'

@exposeAll()
@captureAll()
export class Host {
    /**
     * get the element at cyclic index
     * ```
     * At([1,2,3],-1) // 3
     * At([1,2,3],3) // 1
     * ```
     */
    @checkIt([owl.array, $ => $.length > 0], owl.int)
    static At<T>(arr: T[], index: number): T {
        return _.cyclicAt(arr, index)!
    }

    /**
     * get the chain of elements around `centreIndex` in cyclic fashion
     * ```
     * Lace([1,2,3,4,5,6],0,[-1,0,1]) // [6,1,2]
     * ```
     */
    @checkIt(owl.array, owl.int, owl.arrayWith(owl.int))
    static Lace<T>(
        arr: T[],
        centreIndex: number,
        relativeIndices: number[]
    ): T[] {
        if (arr.length === 0) return []
        return relativeIndices.map(i => _.cyclicAt(arr, centreIndex + i)!)
    }

    /**
     * If `bool`, return `[first, second]`, else return `[second, first]`
     * ```
     * Flop(true,1,2) // [1,2]
     * Flop(false,1,2) // [2,1]
     * ```
     */
    // @checkIt(owl.bool)
    static Flop<T>(bool: boolean, first: T, second: T): [T, T] {
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
    // @checkIt(owl.or([owl.bool, owl.nonNegativeInt]))
    static ComboDisplay<T>(
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
}

declare global {
    var At: typeof Host.At
    var Lace: typeof Host.Lace
    var Flop: typeof Host.Flop
    var ComboDisplay: typeof Host.ComboDisplay
}
