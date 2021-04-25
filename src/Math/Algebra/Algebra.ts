/**
 * @category Algebra
 * @return solve [x,y] from ax+by=c and px+qy=r. 
 * ```typescript
 * Crammer(1,1,5,1,-1,1) // [3,2] solving x+y=5 and x-y=1
 * Crammer(1,1,3,2,2,6) // throw
 * ```
 */
function Crammer(a: number, b: number, c: number, p: number, q: number, r: number): [number, number] {
    Should(IsNum(a, b, c, p, q, r), 'input must be number')
    const D = a * q - b * p
    Should(IsNonZero(D), 'no unique solution')
    const x = (c * q - b * r) / D;
    const y = (a * r - c * p) / D;
    return [x, y];
}
globalThis.Crammer = Crammer





/**
 * @category Algebra
 * @return the product of two input polynomials.
 * ```typescript
 * // do (1x^2+2x+3)(4x+5) = 4x^3+13x^2+22x+15
 * xPolynomial([1,2,3],[4,5]) // [4,13,22,15]
 * ```
 */
function xPolynomial(poly1: number[], poly2: number[]): number[] {
    Should(IsArray(poly1, poly2), "input must be array")
    Should(IsNum(...poly1, ...poly2), 'input must be number array')
    Should(IsNonZero(poly1[0], poly2[0]), 'leading coeff should be non-zero')
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
globalThis.xPolynomial = xPolynomial

