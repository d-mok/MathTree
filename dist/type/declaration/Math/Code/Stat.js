"use strict";
/**
 * @category Stat
 * @return the minimum value. Equivalent to Math.min().
 * ```
 * Min(2,3,4) // 2
 * ```
 */
function Min(...nums) {
    return Math.min(...nums);
}
globalThis.Min = contract(Min).sign([owl.num]);
/**
 * @category Stat
 * @return the maximum value. Equivalent to Math.max().
 * ```
 * Max(2,3,4) // 4
 * ```
 */
function Max(...nums) {
    return Math.max(...nums);
}
globalThis.Max = contract(Max).sign([owl.num]);
/**
 * @category Stat
 * @return the sorted array of numbers.
 * ```
 * Sort(2,3,1) // [1,2,3]
 * ```
 */
function Sort(...nums) {
    return [...nums].sort((a, b) => a - b);
}
globalThis.Sort = contract(Sort).sign([owl.num]);
/**
 * @category Stat
 * @return the sorted array of items by giving each item a value.
 * ```
 * SortBy([2,3,1],x=>x) // [1,2,3]
 * SortBy(["aa", "aaa", "a"], x => x.length) // ["a", "aa", "aaa"]
 * ```
 */
function SortBy(items, valueFunc) {
    return [...items].sort((a, b) => valueFunc(a) - valueFunc(b));
}
globalThis.SortBy = contract(SortBy).sign([owl.array, owl.pass]);
/**
 * @category Stat
 * @return sum of nums
 * ```
 * Sum(1,2,3) // 6
 * Sum(-1,2,3,4,5) // 13
 * ```
 */
function Sum(...nums) {
    return ant.sum(...nums);
}
globalThis.Sum = contract(Sum).sign([owl.num]);
/**
 * @category Stat
 * @return mean of nums
 * ```
 * Mean(1,2,3) // 2
 * Mean(-1,2,3,4,5) // 2.6
 * ```
 */
function Mean(...nums) {
    return ant.mean(...nums);
}
globalThis.Mean = contract(Mean).sign([owl.num]);
/**
 * @category Stat
 * @return median of nums
 * ```
 * Median(1,2,3,4,50) // 3
 * Median(1,2,3,4,5,7) // 3.5
 * ```
 */
function Median(...nums) {
    return ant.median(...nums);
}
globalThis.Median = contract(Median).sign([owl.num]);
/**
 * @category Stat
 * @return lower quartile of nums
 * ```
 * LowerQ(1,2,3,4,5) // 1.5
 * LowerQ(1,2,3,4,5,7) // 2
 * ```
 */
function LowerQ(...nums) {
    nums = Sort(...nums);
    let n = nums.length;
    let m = IsOdd(n) ? Floor(n / 2) : n / 2;
    nums.length = m;
    return Median(...nums);
}
globalThis.LowerQ = contract(LowerQ).sign([owl.num]);
/**
 * @category Stat
 * @return lower quartile of nums
 * ```
 * UpperQ(1,2,3,4,5) // 4.5
 * UpperQ(1,2,3,4,5,7) // 5
 * ```
 */
function UpperQ(...nums) {
    nums = Sort(...nums).reverse();
    let n = nums.length;
    let m = IsOdd(n) ? Floor(n / 2) : n / 2;
    nums.length = m;
    return Median(...nums);
}
globalThis.UpperQ = contract(UpperQ).sign([owl.num]);
/**
 * @category Stat
 * @return count frequency of item in array
 * ```
 * Frequency(1)(2,3,4,1,5,1,1,4,5) // 3
 * ```
 */
function Frequency(item) {
    return (...items) => items.filter(x => x === item).length;
}
globalThis.Frequency = Frequency;
/**
 * @category Stat
 * @return mode of nums
 * ```
 * Mode(1,2,3,2,2,3,4) \\ [2]
 * Mode(1,1,2,2,3) \\ []
 * ```
 */
function Mode(...nums) {
    return ant.mode(...nums);
}
globalThis.Mode = contract(Mode).sign([owl.num]);
/**
 * @category Stat
 * @return SD of nums
 * ```
 * StdDev(1,2,3,2,2,3,4) \\ 0.903507902
 * StdDev(1,1,2,2,3) \\ 0.748331477
 * ```
 */
function StdDev(...nums) {
    return ant.sd(...nums);
}
globalThis.StdDev = contract(StdDev).sign([owl.num]);
