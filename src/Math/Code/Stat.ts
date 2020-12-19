
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
function Sort(...nums: number[]): number[] {
    return [...nums].sort((a, b) => a - b)
}
globalThis.Sort = Sort



/**
 * @category Stat
 * @return the sorted array of items by giving each item a value.
 * ```typescript
 * SortBy([2,3,1],x=>x) // [1,2,3]
 * SortBy(["aa", "aaa", "a"], x => x.length) // ["a", "aa", "aaa"]
 * ```
 */
function SortBy<T>(items: T[], valueFunc: (_: T) => number): T[] {
    return [...items].sort((a, b) => valueFunc(a) - valueFunc(b))
}
globalThis.SortBy = SortBy



/**
 * @category Stat
 * @return sum of nums
 * ```typescript
 * Sum(1,2,3) // 6
 * Sum(-1,2,3,4,5) // 13
 * ```
 */
function Sum(...nums: number[]): number {
    return nums.reduce((a, b) => a + b)
}
globalThis.Sum = Sum




/**
 * @category Stat
 * @return mean of nums
 * ```typescript
 * Mean(1,2,3) // 2
 * Mean(-1,2,3,4,5) // 2.6
 * ```
 */
function Mean(...nums: number[]): number {
    const sum = nums.reduce((a, b) => a + b)
    return sum / nums.length
}
globalThis.Mean = Mean


