/**
 * @category Stat
 * @return the minimum value. Equivalent to Math.min().
 * ```typescript
 * Min(2,3,4) // 2
 * ```
 */
declare function Min(...nums: number[]): number;
/**
 * @category Stat
 * @return the maximum value. Equivalent to Math.max().
 * ```typescript
 * Max(2,3,4) // 4
 * ```
 */
declare function Max(...nums: number[]): number;
/**
 * @category Stat
 * @return the sorted array of numbers.
 * ```typescript
 * Sort(2,3,1) // [1,2,3]
 * ```
 */
declare function Sort(...nums: number[]): number[];
/**
 * @category Stat
 * @return the sorted array of items by giving each item a value.
 * ```typescript
 * SortBy([2,3,1],x=>x) // [1,2,3]
 * SortBy(["aa", "aaa", "a"], x => x.length) // ["a", "aa", "aaa"]
 * ```
 */
declare function SortBy<T>(items: T[], valueFunc: (_: T) => number): T[];
/**
 * @category Stat
 * @return sum of nums
 * ```
 * Sum(1,2,3) // 6
 * Sum(-1,2,3,4,5) // 13
 * ```
 */
declare function Sum(...nums: number[]): number;
/**
 * @category Stat
 * @return mean of nums
 * ```typescript
 * Mean(1,2,3) // 2
 * Mean(-1,2,3,4,5) // 2.6
 * ```
 */
declare function Mean(...nums: number[]): number;
/**
 * @category Stat
 * @return median of nums
 * ```typescript
 * Median(1,2,3,4,50) // 3
 * Median(1,2,3,4,5,7) // 3.5
 * ```
 */
declare function Median(...nums: number[]): number;
/**
 * @category Stat
 * @return lower quartile of nums
 * ```typescript
 * LowerQ(1,2,3,4,5) // 1.5
 * LowerQ(1,2,3,4,5,7) // 2
 * ```
 */
declare function LowerQ(...nums: number[]): number;
/**
 * @category Stat
 * @return lower quartile of nums
 * ```typescript
 * UpperQ(1,2,3,4,5) // 4.5
 * UpperQ(1,2,3,4,5,7) // 5
 * ```
 */
declare function UpperQ(...nums: number[]): number;
/**
 * @category Stat
 * @return count frequency of item in array
 * ```typescript
 * Frequency(1)(2,3,4,1,5,1,1,4,5) // 3
 * ```
 */
declare function Frequency(item: any): (...items: (typeof item)[]) => number;
/**
 * @category Stat
 * @return mode of nums
 * ```
 * Mode(1,2,3,2,2,3,4) \\ [2]
 * Mode(1,1,2,2,3) \\ []
 * ```
 */
declare function Mode(...nums: number[]): number[];
/**
 * @category Stat
 * @return SD of nums
 * ```
 * StdDev(1,2,3,2,2,3,4) \\ 0.903507902
 * StdDev(1,1,2,2,3) \\ 0.748331477
 * ```
 */
declare function StdDev(...nums: number[]): number;
