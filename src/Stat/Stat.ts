
/**
 * Return the minimum value. Equivalent to Math.min().
 * @category Stat
 * @param {...number} nums - Find min of these numbers.
 * @return {number} The min.
 * @example
 * Min(2,3,4) // return 2
 */
function Min(...nums: number[]): number {
    return Math.min(...nums);
}
globalThis.Min = Min


/**
 * Return the maximum value. Equivalent to Math.max().
 * @category Stat
 * @param {...number} nums - Find max of these numbers.
 * @return {number} The max.
 * @example
 * Max(2,3,4) // return 4
 */
function Max(...nums: number[]): number {
    return Math.max(...nums);
}
globalThis.Max = Max
