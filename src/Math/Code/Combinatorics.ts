
/**
 * @category Combinatorics
 * @return the factorial n!
 * ```typescript
 * Factorial(5) // 120
 * Factorial(1.5) // throw
 * ```
 */
function Factorial(n: number): number {
    Must(IsNonNegativeInteger(n), 'n must be non-negative integer')
    n = Blur(n)
    return n <= 0 ? 1 : n * Factorial(n - 1)
}
globalThis.Factorial = Factorial

/**
 * @category Combinatorics
 * @return nCr
 * ```typescript
 * nCr(5,3) // 10
 * ```
 */
function nCr(n: number, r: number): number {
    Must(IsNonNegativeInteger(n, r), 'n, r must be non-negative integer')
    Must(n >= r, 'n >= r required')
    n = Blur(n)
    r = Blur(r)
    return Factorial(n) / (Factorial(r) * Factorial(n - r));
}
globalThis.nCr = nCr

/**
 * @category Combinatorics
 * @return nPr
 * ```typescript
 * nPr(5,3) // 60
 * ```
 */
function nPr(n: number, r: number): number {
    Must(IsNonNegativeInteger(n, r), 'n, r must be non-negative integer')
    Must(n >= r, 'n >= r required')
    n = Blur(n)
    r = Blur(r)
    return nCr(n, r) * Factorial(r);
}
globalThis.nPr = nPr
