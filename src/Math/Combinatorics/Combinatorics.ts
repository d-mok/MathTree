
/**
 * @category Combinatorics
 * @return the factorial n!
 * ```typescript
 * Factorial(5) // return 120
 * ```
 */
function Factorial(n: number): number {
    return n <= 0 ? 1 : n * Factorial(n - 1)
}
globalThis.Factorial = Factorial

/**
 * @category Combinatorics
 * @return nCr
 * ```typescript
 * nCr(5,3) // return 10
 * ```
 */
function nCr(n: number, r: number): number {
    return Factorial(n) / (Factorial(r) * Factorial(n - r));
}
globalThis.nCr = nCr

/**
 * @category Combinatorics
 * @return nPr
 * ```typescript
 * nPr(5,3) // return 60
 * ```
 */
function nPr(n: number, r: number): number {
    return nCr(n, r) * Factorial(r);
}
globalThis.nPr = nPr
