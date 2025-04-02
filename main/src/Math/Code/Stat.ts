import { checkIt, inspectIt, captureAll, exposeAll } from 'contract'
import _ from 'lodash'
import * as math from 'mathjs'

@exposeAll()
@captureAll()
export class Host {
    /**
     * the minimum value. Equivalent to Math.min().
     * ```
     * Min(2,3,4) // 2
     * ```
     */
    static Min(...nums: number[]): number {
        return Math.min(...nums)
    }

    /**
     * the maximum value. Equivalent to Math.max().
     * ```
     * Max(2,3,4) // 4
     * ```
     */
    static Max(...nums: number[]): number {
        return Math.max(...nums)
    }

    /**
     * the sorted array of numbers.
     * ```
     * Sort(2,3,1) // [1,2,3]
     * ```
     */
    static Sort(...nums: number[]): number[] {
        return [...nums].sort((a, b) => a - b)
    }

    /**
     * the sorted array of items by giving each item a value.
     * ```
     * SortBy([2,3,1],x=>x) // [1,2,3]
     * SortBy(["aa", "aaa", "a"], x => x.length) // ["a", "aa", "aaa"]
     * ```
     */
    static SortBy<T>(items: T[], valueFunc: (_: T) => number): T[] {
        return [...items].sort((a, b) => valueFunc(a) - valueFunc(b))
    }

    /**
     * sum of nums
     * ```
     * Sum(1,2,3) // 6
     * Sum(-1,2,3,4,5) // 13
     * Sum() // 0
     * ```
     */
    static Sum(...nums: number[]): number {
        return _.sum(nums)
    }

    /**
     * product of nums
     * ```
     * Product(2,3) // 6
     * Product(-1,2,3,4,5) // -120
     * Product() // 1
     * ```
     */
    static Product(...nums: number[]): number {
        if (nums.length === 0) return 1
        return nums.reduce((a, b) => a * b)
    }

    /**
     * mean of nums
     * ```
     * Mean(1,2,3) // 2
     * Mean(-1,2,3,4,5) // 2.6
     * ```
     */
    static Mean(...nums: number[]): number {
        if (nums.length === 0) return NaN
        return _.mean(nums)
    }

    /**
     * median of nums
     * ```
     * Median(1,2,3,4,50) // 3
     * Median(1,2,3,4,5,7) // 3.5
     * ```
     */
    static Median(...nums: number[]): number {
        if (nums.length === 0) return NaN
        return cal.median(nums)
    }

    /**
     * lower quartile of nums
     * ```
     * LowerQ(1,2,3,4,5) // 1.5
     * LowerQ(1,2,3,4,5,7) // 2
     * ```
     */
    static LowerQ(...nums: number[]): number {
        if (nums.length === 0) return NaN
        const sorted = _.sortBy(nums)
        let n = sorted.length
        let m = n / 2
        if (n % 2 !== 0) m = Math.floor(m)
        return cal.median(_.take(sorted, m))
    }

    /**
     * lower quartile of nums
     * ```
     * UpperQ(1,2,3,4,5) // 4.5
     * UpperQ(1,2,3,4,5,7) // 5
     * ```
     */
    static UpperQ(...nums: number[]): number {
        if (nums.length === 0) return NaN
        const sorted = _.sortBy(nums)
        let n = sorted.length
        let m = n / 2
        if (n % 2 !== 0) m = Math.floor(m)
        return cal.median(_.takeRight(sorted, m))
    }

    /**
     * range of `nums`
     * ```
     * StatRange(1,2,3,4,5) // 4
     * StatRange(1,2,3,4,5,7) // 6
     * ```
     */
    static StatRange(...nums: number[]): number {
        return Math.max(...nums) - Math.min(...nums)
    }

    /**
     * inter-quartile range of nums
     * ```
     * IQR(1,2,3,4,5,6) // 3
     * ```
     */
    static IQR(...nums: number[]): number {
        return UpperQ(...nums) - LowerQ(...nums)
    }

    /**
     * count frequency of item in array
     * ```
     * Freq([2,3,4,1,5,1,1,4,5],1) // 3
     * ```
     */
    static Freq<T>(array: T[], item: T): number {
        return array.count([item])
    }

    /**
     * mode of nums
     * ```
     * Mode(1,2,3,2,2,3,4) \\ [2]
     * Mode(1,1,2,2,3) \\ [1,2]
     * ```
     */
    static Mode(...nums: number[]): number[] {
        return cal.mode(nums)
    }

    /**
     * the only mode of nums, if there are multiple modes, then throw error
     * ```
     * UniMode(1,2,3,2,2,3,4) \\ 2
     * UniMode(1,1,2,2,3) \\ throw error
     * ```
     */
    static UniMode(...nums: number[]): number {
        let modes = cal.mode(nums)
        if (modes.length !== 1) return NaN
        return modes[0]
    }

    /**
     * SD of nums
     * ```
     * StdDev(1,2,3,2,2,3,4) \\ 0.903507902
     * StdDev(1,1,2,2,3) \\ 0.748331477
     * ```
     */
    static StdDev(...nums: number[]): number {
        return cal.std(nums)
    }

    /**
     * z-score of `num` in a data set with `mean` and `SD`
     * ```
     * ZScore(80,60,10) \\ 2
     * ```
     */
    static ZScore(num: number, mean: number, SD: number): number {
        return (num - mean) / SD
    }

    /**
     * the location of median
     * ```
     * MedianAt(12) \\ 6.5
     * MedianAt(13) \\ 7
     * ```
     */
    static MedianAt(total: number): number {
        return (total + 1) / 2
    }

    /**
     * the location of LQ
     * ```
     * LowerQAt(12) \\ 3.5
     * LowerQAt(13) \\ 3.5
     * ```
     */
    static LowerQAt(total: number): number {
        total = Math.floor(total / 2)
        return MedianAt(total)
    }

    /**
     * the location of UQ
     * ```
     * UpperQAt(12) \\ 9.5
     * UpperQAt(13) \\ 10.5
     * ```
     */
    static UpperQAt(total: number): number {
        return total + 1 - LowerQAt(total)
    }

    /**
     * array of the corresponding frequency of `nums` in a data set. If `nums` is omitted, default to the whole range of `data`.
     * ```
     * Freqs([1,1,4,4,3,3,3],[1,2,3,4]) \\ [2,0,3,2]
     * ```
     */
    static Freqs(data: number[], nums?: number[]): number[] {
        nums ??= Rng(...data)
        return nums.map($ => data.count([$]))
    }

    /**
     * array of summary of the data [Minimum,LowerQ,Median,UpperQ,Maximum]
     * ```
     * Summary(1,1,2,3,3,3,3,4,5,5) \\ [1,2,3,4,5]
     * Summary(1,2,3,4,5,6,7,8,9,10) \\ [1,3,5.5,8,10]
     * ```
     */
    static Summary(...data: number[]): number[] {
        return [
            Min(...data),
            LowerQ(...data),
            Median(...data),
            UpperQ(...data),
            Max(...data),
        ]
    }

    /**
     * group `data` into intervals
     * ```
     * Bin([2,2,2,7,7,7,7],[1,5]) \\ group into class intervals [1,5] and [6,10]
     * ```
     */
    static Bin(data: number[], cls: [number, number]) {
        let [L, U] = cls
        let gap = U - L
        let width = gap + 1
        let l0 = Floor(Min(...data), width, L)
        let u0 = l0 + gap
        let intervals: {
            limit: [number, number]
            bound: [number, number]
            mark: number
            width: number
            freq: number
            cumFreq: number
        }[] = []

        let l = l0
        let u = u0
        let cumFreq = 0

        while (data.length > cumFreq) {
            let freq = data.filter(x => x >= l - 0.5 && x < u + 0.5).length
            cumFreq += freq
            intervals.push({
                limit: [l, u],
                bound: [l - 0.5, u + 0.5],
                mark: (l + u) / 2,
                width: width,
                freq,
                cumFreq,
            })
            l += width
            u += width
        }

        return intervals
    }
}

declare global {
    var Min: typeof Host.Min
    var Max: typeof Host.Max
    var Sort: typeof Host.Sort
    var SortBy: typeof Host.SortBy
    var Sum: typeof Host.Sum
    var Product: typeof Host.Product
    var Mean: typeof Host.Mean
    var Median: typeof Host.Median
    var LowerQ: typeof Host.LowerQ
    var UpperQ: typeof Host.UpperQ
    var StatRange: typeof Host.StatRange
    var IQR: typeof Host.IQR
    var Freq: typeof Host.Freq
    var Mode: typeof Host.Mode
    var UniMode: typeof Host.UniMode
    var StdDev: typeof Host.StdDev
    var ZScore: typeof Host.ZScore
    var MedianAt: typeof Host.MedianAt
    var LowerQAt: typeof Host.LowerQAt
    var UpperQAt: typeof Host.UpperQAt
    var Freqs: typeof Host.Freqs
    // var DataFromFreqs: typeof Host.DataFromFreqs
    var Summary: typeof Host.Summary
    var Bin: typeof Host.Bin
}
