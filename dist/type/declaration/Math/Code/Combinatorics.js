"use strict";
/**
 * @category Combinatorics
 * @return the factorial n!
 * ```
 * Factorial(5) // 120
 * Factorial(1.5) // throw
 * ```
 */
function Factorial(n) {
    return ant.fac(n);
}
globalThis.Factorial = contract(Factorial).sign([owl.nonNegativeInt]);
/**
 * @category Combinatorics
 * @return nCr
 * ```
 * nCr(5,3) // 10
 * ```
 */
function nCr(n, r) {
    return ant.nCr(n, r);
}
globalThis.nCr = contract(nCr).sign([owl.nonNegativeInt]);
/**
 * @category Combinatorics
 * @return nPr
 * ```
 * nPr(5,3) // 60
 * ```
 */
function nPr(n, r) {
    return ant.nPr(n, r);
}
globalThis.nPr = contract(nPr).sign([owl.nonNegativeInt]);
