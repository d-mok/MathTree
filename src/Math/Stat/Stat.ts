
/**
 * @category Stat
 * @return the minimum value. Equivalent to Math.min().
 * ```typescript
 * Min(2,3,4) // 2
 * ```
 */
function Min(...nums: number[]): number {
    return Math.min(...nums);
}
globalThis.Min = Min


/**
 * @category Stat
 * @return the maximum value. Equivalent to Math.max().
 * ```typescript
 * Max(2,3,4) // 4
 * ```
 */
function Max(...nums: number[]): number {
    return Math.max(...nums);
}
globalThis.Max = Max

/**
 * @category Stat
 * @return the sorted array of numbers.
 * ```typescript
 * Sort(2,3,1) // [1,2,3]
 * ```
 */
function Sort(...nums:number[]):number[]{
    return nums.sort((a, b) => a - b)
}
globalThis.Sort = Sort