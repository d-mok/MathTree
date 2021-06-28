

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
    return ant.sum(...nums)
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
    return ant.mean(...nums)
}
globalThis.Mean = contract(Mean).sign([owl.num])





/**
 * @category Stat
 * @return median of nums
 * ```
 * Median(1,2,3,4,50) // 3
 * Median(1,2,3,4,5,7) // 3.5
 * ```
 */
function Median(...nums: number[]): number {
    return ant.median(...nums)
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
    nums = Sort(...nums)
    let n = nums.length
    let m = IsOdd(n) ? Floor(n / 2) : n / 2
    nums.length = m
    return Median(...nums)
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
    nums = Sort(...nums).reverse()
    let n = nums.length
    let m = IsOdd(n) ? Floor(n / 2) : n / 2
    nums.length = m
    return Median(...nums)
}
globalThis.UpperQ = contract(UpperQ).sign([owl.num])



/**
 * @category Stat
 * @return count frequency of item in array
 * ```
 * Frequency(1)(2,3,4,1,5,1,1,4,5) // 3
 * ```
 */
function Frequency<T>(item: T) {
    return (...items: T[]) => items.filter(x => x === item).length
}
globalThis.Frequency = Frequency


/**
 * @category Stat
 * @return mode of nums
 * ```
 * Mode(1,2,3,2,2,3,4) \\ [2]
 * Mode(1,1,2,2,3) \\ []
 * ```
 */
function Mode(...nums: number[]): number[] {
    return ant.mode(...nums)
}
globalThis.Mode = contract(Mode).sign([owl.num])


/**
 * @category Stat
 * @return SD of nums
 * ```
 * StdDev(1,2,3,2,2,3,4) \\ 0.903507902
 * StdDev(1,1,2,2,3) \\ 0.748331477
 * ```
 */
function StdDev(...nums: number[]): number {
    return ant.sd(...nums)
}
globalThis.StdDev = contract(StdDev).sign([owl.num])



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
 * @return array of the corresponding frequency of the value in a data set
 * ```
 * Frequencies(1,1,9,9,5,5,5) \\ [[1,5,9],[2,3,2]]
 * Frequencies('a','c','c','b') \\ [['a','b','c'],[1,1,2]]
 * ```
 */
 function Frequencies<T>(...data:T[]): [value:T[],frequency:number[]] {
    let values = [...new Set(data)].sort((a,b)=>a>b?1:-1)
    let arr:[value:T[],frequency:number[]] = [[],[]]
    for(let v of values){
        arr[0].push(v)
        arr[1].push(Frequency(v)(...data))
    }
    return arr   
}
globalThis.Frequencies = Frequencies


/**
 * @category Stat
 * @return array of summary of the data [Minimum,LowerQ,Median,UpperQ,Maximum]
 * ```
 * DataToSummary(1,1,2,3,3,3,3,4,5,5) \\ [1,2,3,4,5]
 * DataToSummary(1,2,3,4,5,6,7,8,9,10) \\ [1,3,5.5,8,10]
 * ```
 */
 function DataToSummary(...data:number[]):number[] {
    return [Min(...data),LowerQ(...data),Median(...data),UpperQ(...data),Max(...data)]
}
globalThis.DataToSummary= contract(DataToSummary).sign([owl.num])