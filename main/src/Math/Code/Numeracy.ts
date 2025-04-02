import _ from 'lodash'
import * as math from 'mathjs'

/**
 * @deprecated
 * division with x/0 handling
 * ```
 * Divide(6,2) // 3
 * Divide(6,0) // throw
 * ```
 */
export function Divide(dividend: number, divisor: number): number {
    if (divisor === 0) return NaN
    return dividend / divisor
}

/**
 * the absolute value. Equivalent to Math.abs(x).
 * ```
 * Abs(-2) // 2
 * ```
 */
export function Abs(num: number): number {
    return Math.abs(num)
}

/**
 * the sign of the number as 1,0 or -1.
 * ```
 * Sign(3) // 1
 * Sign(-4.5) // -1
 * Sign(0) // 0
 * ```
 */
export function Sign(num: number): -1 | 0 | 1 {
    if (num > 0) return 1
    if (num < 0) return -1
    return 0
}

/**
 * @deprecated
 * the sign of the number as 1,0 or -1.
 * ```
 * SigFig(123.45) // 5
 * ```
 */
export function SigFig(num: number): number {
    return cal.sigfig(cal.blur(num))
}

/**
 * the number rounded off to given sigfig.
 * ```
 * Round(1.23456,3) // 1.23
 * Round(1.23567,3) // 1.24
 * ```
 */
export function Round(num: number, sigfig = 3): number {
    num = num * (1 + Number.EPSILON)
    return cal.round(num, sigfig).off()
}

/**
 * the number rounded up to given sigfig.
 * ```
 * RoundUp(1.23456,3) // 1.23
 * RoundUp(1.23567,1) // 2
 * ```
 */
export function RoundUp(num: number, sigfig = 3): number {
    num = num * (1 - Number.EPSILON)
    return cal.round(num, sigfig).up()
}

/**
 * the number rounded down to given sigfig.
 * ```
 * RoundDown(1.23456,5) // 1.2345
 * RoundDown(1.6789,1) // 1
 * ```
 */
export function RoundDown(num: number, sigfig = 3): number {
    num = num * (1 + Number.EPSILON)
    return cal.round(num, sigfig).down()
}

/**
 * the number rounded off to given decimal place.
 * ```
 * Fix(12345.678) // round to integer by default, return 12346
 * Fix(12345.678,0) // round to integer, return 12346
 * Fix(12345.678,2) // round to 2 dp, return 12345.68
 * Fix(12345.678,-2) // round to hundred, return 12300
 * ```
 */
export function Fix(num: number, dp = 0): number {
    num = num * (1 + Number.EPSILON)
    return cal.fix(num, dp).off()
}

/**
 * the number rounded up to given decimal place.
 * ```
 * FixUp(12.34) // round to integer by default, return 13
 * FixUp(12.34,0) // round to integer, return 13
 * FixUp(12.34,1) // round to 1 dp, return 12.4
 * FixUp(12.34,-1) // round to ten, return 20
 * ```
 */
export function FixUp(num: number, dp = 0): number {
    num = num * (1 - Number.EPSILON)
    return cal.fix(num, dp).up()
}

/**
 * the number rounded down to given decimal place.
 * ```
 * FixDown(17.89) // round to integer by default, return 17
 * FixDown(17.89,0) // round to integer, return 17
 * FixDown(17.89,1) // round to 1 dp, return 17.8
 * FixDown(17.89,-1) // round to ten, return 10
 * ```
 */
export function FixDown(num: number, dp = 0): number {
    num = num * (1 + Number.EPSILON)
    return cal.fix(num, dp).down()
}

/**
 * the ceiling integer of the number.
 * ```
 * Ceil(1.1) // 2
 * Ceil(-1.1) // -1
 * Ceil(2) // 2
 * Ceil(3,5,1) // Ceil 3 to [1,6,11,...], return 6
 * ```
 */
export function Ceil(num: number, interval = 1, offset = 0): number {
    let scaleNum = (num - offset) / interval
    scaleNum -= Number.EPSILON
    return Math.ceil(scaleNum) * interval + offset
}

/**
 * the floor integer of the number.
 * ```
 * Floor(1.9) // 1
 * Floor(-1.9) // -2
 * Floor(2)) // 2
 * Floor(3,5,1) // Floor 3 to [1,6,11,...], return 1
 * ```
 */
export function Floor(num: number, interval = 1, offset = 0): number {
    let scaleNum = (num - offset) / interval
    scaleNum += Number.EPSILON
    return Math.floor(scaleNum) * interval + offset
}

/**
 * reduce input array to integral ratio.
 * ```
 * Ratio(2,4,6) // [1,2,3]
 * Ratio(0,4,6) // [0,2,3]
 * Ratio(0,4) // [0,1]
 * Ratio(1/3,1/2,1/4) // [4,6,3]
 * Ratio(Math.sqrt(2),1/2,1/4) // throw
 * ```
 */
export function Ratio(...nums: number[]): number[] {
    if (nums.some($ => !Number.isRational($))) return nums.map($ => NaN)
    return cal.toRatio(nums)
}

/**
 * scale `nums` so that their sum becomes `total`.
 * ```
 * ScaleTo([1,2,3], 60) // [10,20,30]
 * ```
 */
export function ScaleTo(nums: number[], total: number): number[] {
    let sum = Sum(...nums)
    return nums.map($ => ($ / sum) * total)
}

/**
 * The HCF of nums.
 * ```
 * HCF(6,8) // 2
 * HCF(6,8,9) // 1
 * HCF(1,3) // 1
 * HCF(0.5,3) // throw
 * HCF(0,3) // throw
 * ```
 */
export function HCF(...nums: number[]): number {
    return cal.hcf(nums)
}

/**
 * The LCM of nums.
 * ```
 * LCM(2,3) // 6
 * LCM(2,3,5) // 30
 * LCM(0.5,3) // throw
 * LCM(0,3) // throw
 * ```
 */
export function LCM(...nums: number[]): number {
    return cal.lcm(nums)
}

/**
 * The prime factors of `num`.
 * ```
 * PrimeFactors(12) // [2,2,3]
 * ```
 */
export function PrimeFactors(num: number): number[] {
    const primes = cal.primes(num)
    let factors: number[] = []
    while (true) {
        let f = primes.find($ => num % $ === 0)
        if (f === undefined) break
        factors.push(f)
        num = num / f
    }
    return factors
}

/**
 * convert num to fraction
 * ```
 * ToFrac(0.5) // [1,2]
 * ToFrac(-456/123) // [-152,41]
 * ```
 */
export function ToFrac(num: number): Fraction {
    if (!Number.isRational(num)) return [NaN, NaN]
    return cal.toFraction(num)
}

/**
 * all integer partition of `n`.
 * ```
 * Partition(4)
 * // [ [4], [3,1], [2,2], [2,1,1], [1,1,1,1] ]
 * Partition(4, 2, false)
 * // [ [3,1], [2,2] ]
 * Partition(4, 2, true)
 * // [ [4,0], [3,1], [2,2] ]
 * ```
 */
export function Partition(
    n: number,
    length?: number,
    allowZero = false
): number[][] {
    function parti(n: number): number[][] {
        if (n === 0) return [[]]
        let arr: number[][] = []
        for (let p of parti(n - 1)) {
            arr.push([1, ...p])
            if (p.length > 0 && (p.length < 2 || p[1] > p[0])) {
                let [p0, ...rest] = p
                arr.push([p0 + 1, ...rest])
            }
        }
        return arr
    }

    function padArray<T>(arr: T[], length: number, val: T): T[] {
        arr.length = length
        return Array.from(arr, v => v ?? val)
    }

    let arr = parti(n)
    if (length === undefined) {
        return arr
    } else {
        if (allowZero) {
            return arr
                .filter($ => $.length <= length)
                .map($ => padArray($, length, 0))
        } else {
            return arr.filter($ => $.length === length)
        }
    }
}
