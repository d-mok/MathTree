

/**
 * @category Stat
 * @return the minimum value. Equivalent to Math.min().
 * ```
 * Min(2,3,4) // 2
 * ```
 */
function Min(...nums: number[]): number {
    return Math.min(...nums);
}
globalThis.Min = contract(Min).sign([owl.num])


/**
 * @category Stat
 * @return the maximum value. Equivalent to Math.max().
 * ```
 * Max(2,3,4) // 4
 * ```
 */
function Max(...nums: number[]): number {
    return Math.max(...nums);
}
globalThis.Max = contract(Max).sign([owl.num])



/**
 * @category Stat
 * @return the sorted array of numbers.
 * ```
 * Sort(2,3,1) // [1,2,3]
 * ```
 */
function Sort(...nums: number[]): number[] {
    return [...nums].sort((a, b) => a - b)
}
globalThis.Sort = contract(Sort).sign([owl.num])



/**
 * @category Stat
 * @return the sorted array of items by giving each item a value.
 * ```
 * SortBy([2,3,1],x=>x) // [1,2,3]
 * SortBy(["aa", "aaa", "a"], x => x.length) // ["a", "aa", "aaa"]
 * ```
 */
function SortBy<T>(items: T[], valueFunc: (_: T) => number): T[] {
    return [...items].sort((a, b) => valueFunc(a) - valueFunc(b))
}
globalThis.SortBy = contract(SortBy).sign([owl.array, owl.pass])



/**
 * @category Stat
 * @return sum of nums
 * ```
 * Sum(1,2,3) // 6
 * Sum(-1,2,3,4,5) // 13
 * ```
 */
function Sum(...nums: number[]): number {
    return toData(nums).sum()
}
globalThis.Sum = contract(Sum).sign([owl.num])




/**
 * @category Stat
 * @return mean of nums
 * ```
 * Mean(1,2,3) // 2
 * Mean(-1,2,3,4,5) // 2.6
 * ```
 */
function Mean(...nums: number[]): number {
    return toData(nums).mean()
}
globalThis.Mean = contract(Mean).seal({
    arg: [owl.num],
    args: function is_not_empty(...nums) { return nums.length > 0 }
})





/**
 * @category Stat
 * @return median of nums
 * ```
 * Median(1,2,3,4,50) // 3
 * Median(1,2,3,4,5,7) // 3.5
 * ```
 */
function Median(...nums: number[]): number {
    return toData(nums).median()
}
globalThis.Median = contract(Median).sign([owl.num])


/**
 * @category Stat
 * @return lower quartile of nums
 * ```
 * LowerQ(1,2,3,4,5) // 1.5
 * LowerQ(1,2,3,4,5,7) // 2
 * ```
 */
function LowerQ(...nums: number[]): number {
    return toData(nums).lowerQuartile()
}
globalThis.LowerQ = contract(LowerQ).sign([owl.num])

/**
 * @category Stat
 * @return lower quartile of nums
 * ```
 * UpperQ(1,2,3,4,5) // 4.5
 * UpperQ(1,2,3,4,5,7) // 5
 * ```
 */
function UpperQ(...nums: number[]): number {
    return toData(nums).upperQuartile()
}
globalThis.UpperQ = contract(UpperQ).sign([owl.num])




/**
 * @category Stat
 * @return range of nums
 * ```
 * StatRange(1,2,3,4,5) // 4
 * StatRange(1,2,3,4,5,7) // 6
 * ```
 */
function StatRange(...nums: number[]): number {
    return toData(nums).range()
}
globalThis.StatRange = contract(StatRange).sign([owl.num])




/**
 * @category Stat
 * @return inter-quartile range of nums
 * ```
 * IQR(1,2,3,4,5,6) // 3
 * ```
 */
function IQR(...nums: number[]): number {
    return toData(nums).IQR()
}
globalThis.IQR = contract(IQR).sign([owl.num])







// /**
//  * @category Stat
//  * @deprecated
//  * @return count frequency of item in array
//  * ```
//  * Frequency(1)(2,3,4,1,5,1,1,4,5) // 3
//  * ```
//  */
// function Frequency<T>(item: T) {
//     return (...items: T[]) => toList(items).freq(item)
// }
// globalThis.Frequency = Frequency



/**
 * @category Stat
 * @return count frequency of item in array
 * ```
 * Freq([2,3,4,1,5,1,1,4,5],1) // 3
 * ```
 */
function Freq<T>(array: T[], item: T): number {
    return toList(array).freq(item)
}
globalThis.Freq = contract(Freq).sign([owl.array, owl.pass])


/**
 * @category Stat
 * @return mode of nums
 * ```
 * Mode(1,2,3,2,2,3,4) \\ [2]
 * Mode(1,1,2,2,3) \\ [1,2]
 * ```
 */
function Mode(...nums: number[]): number[] {
    return [...toData(nums).modes()]
}
globalThis.Mode = contract(Mode).sign([owl.num])



/**
 * @category Stat
 * @return the only mode of nums, if there are multiple modes, then throw error
 * ```
 * UniMode(1,2,3,2,2,3,4) \\ 2
 * UniMode(1,1,2,2,3) \\ throw error
 * ```
 */
function UniMode(...nums: number[]): number {
    return toData(nums).mode()
}
globalThis.UniMode = contract(UniMode).seal({
    arg: [owl.num],
    args: function has_single_mode(...nums) { return toData(nums).isSingleMode(1) }
})


/**
 * @category Stat
 * @return SD of nums
 * ```
 * StdDev(1,2,3,2,2,3,4) \\ 0.903507902
 * StdDev(1,1,2,2,3) \\ 0.748331477
 * ```
 */
function StdDev(...nums: number[]): number {
    return toData(nums).stdDev()
}
globalThis.StdDev = contract(StdDev).sign([owl.num])



/**
 * @category Stat
 * @return z-score of `num` in a data set with `mean` and `SD`
 * ```
 * ZScore(80,60,10) \\ 2
 * ```
 */
function ZScore(num: number, mean: number, SD: number): number {
    return (num - mean) / SD
}
globalThis.ZScore = contract(ZScore).sign([owl.num])





/**
 * @category Stat
 * @return the location of median
 * ```
 * MedianAt(12) \\ 6.5
 * MedianAt(13) \\ 7
 * ```
 */
function MedianAt(total: number): number {
    return (total + 1) / 2
}
globalThis.MedianAt = contract(MedianAt).sign([owl.int])




/**
 * @category Stat
 * @return the location of LQ
 * ```
 * LowerQAt(12) \\ 3.5
 * LowerQAt(13) \\ 3.5
 * ```
 */
function LowerQAt(total: number): number {
    total = Math.floor(total / 2)
    return MedianAt(total)
}
globalThis.LowerQAt = contract(LowerQAt).sign([owl.int])



/**
 * @category Stat
 * @return the location of UQ
 * ```
 * UpperQAt(12) \\ 9.5
 * UpperQAt(13) \\ 10.5
 * ```
 */
function UpperQAt(total: number): number {
    return total + 1 - LowerQAt(total)
}
globalThis.UpperQAt = contract(UpperQAt).sign([owl.int])



/**
 * @category Stat
 * @return array of all integers between the min and max of `data`.
 * ```
 * ListRange(1,1,4,4,3,3,3) \\ [1,2,3,4]
 * ```
 */
function ListRange(...data: number[]): number[] {
    let min = Math.min(...data)
    let max = Math.max(...data)
    return cal.range(min, max)
}
globalThis.ListRange = contract(ListRange).sign([owl.int])


/**
 * @category Stat
 * @return array of the corresponding frequency of `nums` in a data set. If `nums` is omitted, default to the whole range of `data`.
 * ```
 * Freqs([1,1,4,4,3,3,3],[1,2,3,4]) \\ [2,0,3,2]
 * ```
 */
function Freqs(data: number[], nums?: number[]): number[] {
    let ls = toList(data)
    nums ??= ListRange(...data)
    let arr: number[] = []
    for (let v of nums) {
        arr.push(ls.freq(v))
    }
    return arr
}
globalThis.Freqs = contract(Freqs).sign([owl.ntuple, owl.ntuple])



/**
 * @category Stat
 * @return make a data set from frequencies
 * ```
 * DataFromFreqs([1,9,5],[2,2,3])
 * // [1,1,9,9,5,5,5]
 * ```
 */
function DataFromFreqs(values: number[], frequencies: number[]): number[] {
    Should(values.length === frequencies.length, 'values and frequencies must be the same length')
    let data: number[] = []
    for (let i = 0; i < values.length; i++) {
        data.push(...Array(frequencies[i]).fill(values[i]))
    }
    return data
}
globalThis.DataFromFreqs = contract(DataFromFreqs).sign([owl.ntuple])


/**
 * @category Stat
 * @return array of summary of the data [Minimum,LowerQ,Median,UpperQ,Maximum]
 * ```
 * Summary(1,1,2,3,3,3,3,4,5,5) \\ [1,2,3,4,5]
 * Summary(1,2,3,4,5,6,7,8,9,10) \\ [1,3,5.5,8,10]
 * ```
 */
function Summary(...data: number[]): number[] {
    let d = toData(data)
    return [
        d.min(),
        d.lowerQuartile(),
        d.median(),
        d.upperQuartile(),
        d.max()
    ]
}
globalThis.Summary = contract(Summary).sign([owl.num])