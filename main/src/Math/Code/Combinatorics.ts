import { checkIt, inspectIt, captureAll, exposeAll } from 'contract'
import * as math from 'mathjs'

@exposeAll()
@captureAll()
export class Host {
    /**
     * the factorial n!
     * ```
     * Factorial(5) // 120
     * Factorial(1.5) // throw
     * ```
     */
    static Factorial(n: number): number {
        return math.factorial(n)
    }

    /**
     * nCr
     * ```
     * nCr(5,3) // 10
     * ```
     */
    static nCr(n: number, r: number): number {
        if (r > n) return NaN
        return math.combinations(n, r)
    }

    /**
     * nPr
     * ```
     * nPr(5,3) // 60
     * ```
     */
    static nPr(n: number, r: number): number {
        if (r > n) return NaN
        return math.permutations(n, r)
    }
}

declare global {
    var Factorial: typeof Host.Factorial
    var nCr: typeof Host.nCr
    var nPr: typeof Host.nPr
}
