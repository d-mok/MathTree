import { checkIt, inspectIt, captureAll, exposeAll } from 'contract'
import _ from 'lodash'
import * as math from 'mathjs'

@exposeAll()
@captureAll()
export class Host {
    /**
     * array of all integers between (inclusive) the min and max of `nums`.
     * ```
     * Rng(2,6) // [2,3,4,5,6]
     * Rng(6,2) // [2,3,4,5,6]
     * Rng(-2,1) // [-2,-1,0,1]
     * Rng(1,1,4,4,3,3,3) \\ [1,2,3,4]
     * ```
     */
    @checkIt(owl.num)
    static Rng(...nums: number[]): number[] {
        let min = Math.ceil(Math.min(...nums))
        let max = Math.floor(Math.max(...nums))
        return _.range(min, max + 0.01)
    }

    /**
     * Tn in an arithmetic sequence: a+(n-1)d
     * ```
     * ASterm(2,3,10) // 29
     * ASterm(5,-2,6) // -5
     * ```
     */
    @checkIt(owl.num, owl.num, owl.positiveInt)
    static ASterm(a: number, d: number, n: number): number {
        return a + (n - 1) * d
    }

    /**
     * Sn in an arithmetic sequence: (n/2)(2a+(n-1)d).
     * ```
     * ASsum(2,3,10) // 155
     * ASsum(5,-2,6) // 0
     * ```
     */
    @checkIt(owl.num, owl.num, owl.positiveInt)
    static ASsum(a: number, d: number, n: number): number {
        return 0.5 * n * (2 * a + (n - 1) * d)
    }

    /**
     * an array of the first n terms in an arithmetic sequence.
     * ```
     * ASequence(2,3,5) // [2,5,8,11,14]
     * ASequence(5,-2,3) // [5,3,1]
     * ```
     */
    @checkIt(owl.num, owl.num, owl.positiveInt)
    static ASequence(a: number, d: number, n = 10): number[] {
        let arr = []
        for (let i = 1; i <= n; i++) {
            arr.push(ASterm(a, d, i))
        }
        return arr
    }

    /**
     * Tn in a geometric sequence: ar**(n-1)
     * ```
     * GSterm(2,3,4) // 54
     * GSterm(5,-2,6) // -160
     * ```
     */
    @checkIt(owl.num, owl.num, owl.positiveInt)
    static GSterm(a: number, r: number, n: number): number {
        return a * r ** (n - 1)
    }

    /**
     * Sn in a geometric sequence: a*(r*n-1)/(r-1)
     * ```
     * GSsum(2,3,4) // 80
     * GSsum(5,-2,3) // 15
     * GSsum(3,0.5) // 6 , sum to inf if omit n
     * ```
     */
    @checkIt(owl.num, owl.num, owl.int)
    static GSsum(a: number, r: number, n: number = -1): number {
        return n > 0 ? (a * (r ** n - 1)) / (r - 1) : a / (1 - r)
    }

    /**
     * an array of the first n terms in a geometric sequence.
     * ```
     * GSequence(2,3,5) // return [2,6,18,54,162]
     * GSequence(5,-2,3) // return [5,-10,20]
     * ```
     */
    @checkIt(owl.num, owl.num, owl.positiveInt)
    static GSequence(a: number, r: number, n = 10): number[] {
        let arr = []
        for (let i = 1; i <= n; i++) {
            arr.push(GSterm(a, r, i))
        }
        return arr
    }

    /**
     * the nth term in a quadratic sequence, 1st term = a, P_i+1=P_i + pi+q
     * ```
     * QuadraticSequence(1,2,3,4) //
     * ```
     */
    @checkIt(owl.num, owl.num, owl.num, owl.positiveInt)
    static QuadraticSequence(
        a: number,
        p: number,
        q: number,
        n: number
    ): number {
        let c = a
        for (let i = 2; i <= n; i++) {
            c += p * (i - 1) + q
        }
        return c
    }

    /**
     * the nth term in a lucas sequence, a_i = p*a_{i-1} + q*a_{i-2}
     * ```
     * LucasSequence(1,2,3,4,5) //
     * ```
     */
    @checkIt(owl.num, owl.num, owl.num, owl.num, owl.positiveInt)
    static LucasSequence(
        first: number,
        second: number,
        p: number,
        q: number,
        n: number
    ): number {
        if (n === 1) return first
        if (n === 2) return second
        let S = [first, second]
        for (let i = 3; i <= n; i++) {
            S.push(p * S[i - 2] + q * S[i - 3])
        }
        return S[n - 1]
    }
}

declare global {
    var Rng: typeof Host.Rng
    var ASterm: typeof Host.ASterm
    var ASsum: typeof Host.ASsum
    var ASequence: typeof Host.ASequence
    var GSterm: typeof Host.GSterm
    var GSsum: typeof Host.GSsum
    var GSequence: typeof Host.GSequence
    var QuadraticSequence: typeof Host.QuadraticSequence
    var LucasSequence: typeof Host.LucasSequence
}
