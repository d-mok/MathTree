import { checkIt, inspectIt, captureAll, exposeAll } from 'contract'

@exposeAll()
@captureAll()
export class Host {

    /**
     * Solve [x,y] from ax+by=c and px+qy=r.
     * ```
     * Crammer(1,1,5,1,-1,1) // [3,2] solving x+y=5 and x-y=1
     * Crammer(1,1,3,2,2,6) // throw, parallel
     * ```
     */
    @checkIt(owl.num)
    @inspectIt(function has_unique_sol(a, b, c, p, q, r) { return a * q - b * p !== 0 })
    static Crammer(a: number, b: number, c: number, p: number, q: number, r: number): [number, number] {
        const D = a * q - b * p
        const x = (c * q - b * r) / D
        const y = (a * r - c * p) / D
        return [x, y]
    }

    /**
     * The product of two polynomials.
     * ```
     * xPolynomial([1,2,3],[4,5]) // [4,13,22,15]
     * // (1x^2+2x+3)(4x+5) = 4x^3+13x^2+22x+15
     * ```
     */
    @checkIt([owl.ntuple, function non_zero_leading_coeff(_) { return _[0] !== 0 }])
    static xPolynomial(poly1: number[], poly2: number[]): number[] {
        const deg1 = poly1.length - 1
        const deg2 = poly2.length - 1
        const deg = deg1 + deg2
        const result = Array(deg + 1).fill(0)
        for (let i = 0; i <= deg1; i++) {
            for (let j = 0; j <= deg2; j++) {
                result[i + j] += poly1[i] * poly2[j]
            }
        }
        return result
    }


    /**
     * Expansion coeff of (Ax+B)^n in descending power of x.
     * ```
     * Binomial(2,3,2) // (2x+3)^2 = [4,12,9]
     * Binomial(2,3) // power default to n = 2
     * ```
     */
    @checkIt(owl.num, owl.num, owl.positiveInt)
    static Binomial(A: number, B: number, n: number = 2): number[] {
        let coeff: number[] = []
        for (let i = 0; i <= n; i++) {
            coeff.push(nCr(n, i) * (A ** (n - i)) * (B ** i))
        }
        return coeff
    }


}


declare global {
    var Crammer: typeof Host.Crammer
    var xPolynomial: typeof Host.xPolynomial
    var Binomial: typeof Host.Binomial
}



