import { checkIt, inspectIt, captureAll, exposeAll } from 'contract'

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
        return list(...arr).cyclicAt(index)!
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
        let ls = list(...arr)
        return relativeIndices.map(i => ls.cyclicAt(centreIndex + i)!)
    }

    /**
     * Replace text in `question` and `solution`. A meta function.
     * ```
     * Repl('a','b') // replace 'a' by 'b'
     * ```
     */
    @checkIt(owl.array, owl.int, owl.arrayWith(owl.int))
    static Repl<T>(original: string, replaceBy: string): void {
        let Q = ''
        let S = ''
        eval('Q = question')
        eval('S = solution')
        Q = Q.replaceAll(original, replaceBy)
        S = S.replaceAll(original, replaceBy)
        eval('question = Q')
        eval('solution = S')
    }
}

declare global {
    var At: typeof Host.At
    var Lace: typeof Host.Lace
    var Repl: typeof Host.Repl
}
