"use strict";
/**
 * @category Combinatorics
 * @return the factorial n!
 * ```typescript
 * Factorial(5) // 120
 * Factorial(1.5) // throw
 * ```
 */
function Factorial(n) {
    n = Blur(n);
    Should(IsNonNegativeInteger(n), 'n must be non-negative integer');
    return n <= 0 ? 1 : n * Factorial(n - 1);
}
globalThis.Factorial = Factorial;
/**
 * @category Combinatorics
 * @return nCr
 * ```typescript
 * nCr(5,3) // 10
 * ```
 */
function nCr(n, r) {
    n = Blur(n);
    r = Blur(r);
    Should(IsNonNegativeInteger(n, r), 'n, r must be non-negative integer');
    Should(n >= r, 'n >= r required');
    return Factorial(n) / (Factorial(r) * Factorial(n - r));
}
globalThis.nCr = nCr;
/**
 * @category Combinatorics
 * @return nPr
 * ```typescript
 * nPr(5,3) // 60
 * ```
 */
function nPr(n, r) {
    n = Blur(n);
    r = Blur(r);
    Should(IsNonNegativeInteger(n, r), 'n, r must be non-negative integer');
    Should(n >= r, 'n >= r required');
    return nCr(n, r) * Factorial(r);
}
globalThis.nPr = nPr;
