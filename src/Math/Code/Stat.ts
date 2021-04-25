
/**
 * @category Stat
 * @return the minimum value. Equivalent to Math.min().
 * ```typescript
 * Min(2,3,4) // 2
 * ```
 */
function Min(...nums: number[]): number {
    Should(IsNum(...nums), 'input must be num')
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
    Should(IsNum(...nums), 'input must be num')
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
    Should(IsNum(...nums), 'input must be num')
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
    Should(IsNum(...nums), 'input must be num')
    return nums.reduce((a, b) => a + b, 0)
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
    Should(IsNum(...nums), 'input must be num')
    Should(nums.length > 0, 'nums.length must be >0')
    const sum = nums.reduce((a, b) => a + b)
    return sum / nums.length
}
globalThis.Mean = Mean





/**
 * @category Stat
 * @return median of nums
 * ```typescript
 * Median(1,2,3,4,50) // 3
 * Median(1,2,3,4,5,7) // 3.5
 * ```
 */
function Median(...nums: number[]): number {
    nums = Sort(...nums)
    let n = nums.length
    if (IsOdd(n)) {
        let m = Ceil(n / 2)
        return nums[m - 1]
    } else {
        let m = n / 2
        return (nums[m - 1] + nums[m]) / 2
    }
}
globalThis.Median = Median


/**
 * @category Stat
 * @return lower quartile of nums
 * ```typescript
 * LowerQ(1,2,3,4,5) // 1.5
 * LowerQ(1,2,3,4,5,7) // 2
 * ```
 */
function LowerQ(...nums: number[]): number {
    nums = Sort(...nums)
    let n = nums.length
    let m = IsOdd(n) ? Floor(n / 2) : n / 2
    nums.length = m
    return Median(...nums)
}
globalThis.LowerQ = LowerQ

/**
 * @category Stat
 * @return lower quartile of nums
 * ```typescript
 * UpperQ(1,2,3,4,5) // 4.5
 * UpperQ(1,2,3,4,5,7) // 5
 * ```
 */
function UpperQ(...nums: number[]): number {
    nums = Sort(...nums).reverse()
    let n = nums.length
    let m = IsOdd(n) ? Floor(n / 2) : n / 2
    nums.length = m
    return Median(...nums)
}
globalThis.UpperQ = UpperQ


/**
 * @category Stat
 * @return count frequency of item in array
 * ```typescript
 * Frequency(1)(2,3,4,1,5,1,1,4,5) // 3
 * ```
 */
function Frequency(item: any) {
    return function (...items: (typeof item)[]) {
        return items.filter(x => x === item).length
    }
}
globalThis.Frequency = Frequency


/**
 * @category Stat
 * @return mode of nums
 * ```typescript
 * Mode(1,2,3,2,2,3,4) \\ 2
 * Mode(1,1,2,2,3) \\ NaN
 * ```
 */
function Mode(...nums: number[]): number {
    let s = [...new Set(nums)]
    let counts = s.map(x => Frequency(x)(...nums))
    let maxCount = Max(...counts)
    if (Frequency(maxCount)(...counts) > 1) {
        return NaN
    }
    return s.find(x => Frequency(x)(...nums) === maxCount)!
}
globalThis.Mode = Mode


/**
 * @category Stat
 * @return SD of nums
 * ```typescript
 * StdDev(1,2,3,2,2,3,4) \\ 0.903507902
 * StdDev(1,1,2,2,3) \\ 0.748331477
 * ```
 */
function StdDev(...nums: number[]): number {
    let m = Mean(...nums)
    nums = nums.map(x => (x - m) ** 2)
    let a = Mean(...nums)
    return a ** 0.5
}
globalThis.StdDev = StdDev