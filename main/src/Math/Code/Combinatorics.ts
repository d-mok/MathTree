import * as math from 'mathjs'

/**
 * the factorial n!
 * ```
 * Factorial(5) // 120
 * Factorial(1.5) // throw
 * ```
 */
export function Factorial(n: number): number {
    return math.factorial(n)
}

/**
 * nCr
 * ```
 * nCr(5,3) // 10
 * ```
 */
export function nCr(n: number, r: number): number {
    if (r > n) return NaN
    return math.combinations(n, r)
}

/**
 * nPr
 * ```
 * nPr(5,3) // 60
 * ```
 */
export function nPr(n: number, r: number): number {
    if (r > n) return NaN
    return math.permutations(n, r)
}
