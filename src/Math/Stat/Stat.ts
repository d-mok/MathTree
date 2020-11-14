
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

/**
 * Return the sorted array of numbers.
 * @category Stat
 * @param {...number} nums - The numbers to sort.
 * @return {number[]} The sorted array of numbers.
 * @example
 * Sort(2,3,1) // return [1,2,3]
 */
function Sort(...nums:number[]):number[]{
    return nums.sort((a, b) => a - b)
}
globalThis.Sort = Sort