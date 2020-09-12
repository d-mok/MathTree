
/**
 * Return the factorial n!.
 * @category Combinatorics
 * @param {number} n - The input number.
 * @return {number} n!
 * @example
 * Factorial(5) // return 120
 */
function Factorial(n: number): number {
    return n <= 0 ? 1 : n * Factorial(n - 1)
}
globalThis.Factorial = Factorial

/**
 * Return nCr.
 * @category Combinatorics
 * @param {number} n - The total number of objects.
 * @param {number} r - The number of selected objects.
 * @return {number} nCr
 * @example
 * nCr(5,3) // return 10
 */
function nCr(n: number, r: number): number {
    return Factorial(n) / (Factorial(r) * Factorial(n - r));
}
globalThis.nCr = nCr

/**
 * Return nPr.
 * @category Combinatorics
 * @param {number} n - The total number of objects.
 * @param {number} r - The number of selected objects.
 * @return {number} nPr
 * @example
 * nPr(5,3) // return 60
 */
function nPr(n: number, r: number): number {
    return nCr(n, r) * Factorial(r);
}
globalThis.nPr = nPr
