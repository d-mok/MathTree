/**
 * the factorial n!
 * ```
 * Factorial(5) // 120
 * Factorial(1.5) // throw
 * ```
 */
export function Factorial(n) {
    n = n.blur();
    if (!Number.isInteger(n))
        return NaN;
    if (n < 0)
        return NaN;
    if (n === 0)
        return 1;
    return Math.range(1, n).reduce((a, b) => a * b);
}
/**
 * nCr
 * ```
 * nCr(5,3) // 10
 * ```
 */
export function nCr(n, r) {
    if (r > n)
        return NaN;
    return Factorial(n) / (Factorial(r) * Factorial(n - r));
}
/**
 * nPr
 * ```
 * nPr(5,3) // 60
 * ```
 */
export function nPr(n, r) {
    if (r > n)
        return NaN;
    return Factorial(n) / Factorial(n - r);
}
