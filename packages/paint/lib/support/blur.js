/**
 * The number of significant digits used in {@link blur}.
 */
const STANDARD_SIGFIG = 14;
/**
 * Return the blurred value to avoid things like 0.300000000004.
 * If blurring can reduce the number of sigfig by 5 or more, return the blurred value; else, return the original value.
 * @param num - the number to blur
 * @returns the blurred number
 * @example
 * ```
 * blur(0.1+0.2) // 0.3
 * ```
 */
export function blur(num) {
    let n = parseFloat(num.toPrecision(STANDARD_SIGFIG));
    return sigfig(n) <= STANDARD_SIGFIG - 5 ? n : num;
}
/**
 * Return the number of significant figures of `num`.
 * @param num - the number
 * @returns the number of sigfig
 * @example
 * ```
 * sigfig(1.234) // 4
 * ```
 */
function sigfig(num) {
    let mant = Math.abs(num).toExponential().split('e')[0];
    return mant.replace('.', '').length;
    // return (new Decimal(num)).precision(false)
}
//# sourceMappingURL=blur.js.map