/**
 * @category Numeracy
 * @return division with x/0 handling
 * ```
 * Divide(6,2) // 3
 * Divide(6,0) // throw
 * ```
 */
function Divide(dividend: number, divisor: number): number {
    return dividend / divisor
}
globalThis.Divide = contract(Divide).sign([owl.num, owl.nonZero])



/**
 * @category Numeracy
 * @return the absolute value. Equivalent to Math.abs(x).
 * ```
 * Abs(-2) // 2
 * ```
 */
function Abs(num: number): number {
    return Math.abs(num);
}
globalThis.Abs = contract(Abs).sign([owl.num])



/**
 * @category Numeracy
 * @return the sign of the number as 1,0 or -1.
 * ```
 * Sign(3) // 1
 * Sign(-4.5) // -1
 * Sign(0) // 0
 * ```
 */
function Sign(num: number): -1 | 0 | 1 {
    if (num > 0) return 1;
    if (num < 0) return -1;
    return 0;
}
globalThis.Sign = contract(Sign).sign([owl.num])



/**
 * @deprecated
 * @category Numeracy
 * @return the sign of the number as 1,0 or -1.
 * ```
 * SigFig(123.45) // 5 
 * ```
 */
function SigFig(num: number): number {
    return cal.sigfig(cal.blur(num))
}
globalThis.SigFig = contract(SigFig).sign([owl.num])






/**
 * @category Numeracy
 * @return the number rounded off to given sigfig.
 * ```
 * Round(1.23456,3) // 1.23
 * Round(1.23567,3) // 1.24
 * ```
 */
function Round(num: number, sigfig = 3): number {
    num = num * (1 + Number.EPSILON)
    return cal.round(num, sigfig).off()

}
globalThis.Round = contract(Round).sign([owl.num, owl.positiveInt])

/**
 * @category Numeracy
 * @return the number rounded up to given sigfig.
 * ```
 * RoundUp(1.23456,3) // 1.23
 * RoundUp(1.23567,1) // 2
 * ```
 */
function RoundUp(num: number, sigfig = 3): number {
    num = num * (1 - Number.EPSILON)
    return cal.round(num, sigfig).up()
}
globalThis.RoundUp = contract(RoundUp).sign([owl.num, owl.positiveInt])

/**
 * @category Numeracy
 * @return the number rounded down to given sigfig.
 * ```
 * RoundDown(1.23456,5) // 1.2345
 * RoundDown(1.6789,1) // 1
 * ```
 */
function RoundDown(num: number, sigfig = 3): number {
    num = num * (1 + Number.EPSILON)
    return cal.round(num, sigfig).down()
}
globalThis.RoundDown = contract(RoundDown).sign([owl.num, owl.positiveInt])


/**
 * @category Numeracy
 * @return the number rounded off to given decimal place.
 * ```
 * Fix(12345.678) // round to integer by default, return 12346
 * Fix(12345.678,0) // round to integer, return 12346
 * Fix(12345.678,2) // round to 2 dp, return 12345.68
 * Fix(12345.678,-2) // round to hundred, return 12300
 * ```
 */
function Fix(num: number, dp = 0): number {
    num = num * (1 + Number.EPSILON)
    return cal.fix(num, dp).off()
}
globalThis.Fix = contract(Fix).sign([owl.num, owl.int])

/**
 * @category Numeracy
 * @return the number rounded up to given decimal place.
 * ```
 * FixUp(12.34) // round to integer by default, return 13
 * FixUp(12.34,0) // round to integer, return 13
 * FixUp(12.34,1) // round to 1 dp, return 12.4
 * FixUp(12.34,-1) // round to ten, return 20
 * ```
 */
function FixUp(num: number, dp = 0): number {
    num = num * (1 - Number.EPSILON)
    return cal.fix(num, dp).up()
}
globalThis.FixUp = contract(FixUp).sign([owl.num, owl.int])



/**
 * @category Numeracy
 * @return the number rounded down to given decimal place.
 * ```
 * FixDown(17.89) // round to integer by default, return 17
 * FixDown(17.89,0) // round to integer, return 17
 * FixDown(17.89,1) // round to 1 dp, return 17.8
 * FixDown(17.89,-1) // round to ten, return 10
 * ```
 */
function FixDown(num: number, dp = 0): number {
    num = num * (1 + Number.EPSILON)
    return cal.fix(num, dp).down()
}
globalThis.FixDown = contract(FixDown).sign([owl.num, owl.int])



/**
 * @category Numeracy
 * @return the ceiling integer of the number.
 * ```
 * Ceil(1.1) // 2
 * Ceil(-1.1) // -1
 * Ceil(2)) // 2
 * ```
 */
function Ceil(num: number): number {
    return Math.ceil(num);
}
globalThis.Ceil = contract(Ceil).sign([owl.num])

/**
 * @category Numeracy
 * @return the floor integer of the number.
 * ```
 * Floor(1.9) // 1
 * Floor(-1.9) // -2
 * Floor(2)) // 2
 * ```
 */
function Floor(num: number): number {
    return Math.floor(num);
}
globalThis.Floor = contract(Floor).sign([owl.num])


// /**
//  * @category Numeracy
//  * @deprecated use Ratio() instead
//  * @return reduce input array to simplest ratio.
//  * ```
//  * SimpRatio(2,4,6) // [1,2,3]
//  * SimpRatio(0,4,6) // [0,2,3]
//  * SimpRatio(0,4) // [0,1]
//  * ```
//  */
// function SimpRatio(...nums: number[]): number[] {
//     let ns = toNumbers(nums).blur()
//     // nums = nums.map(cal.blur)
//     if (!IsInteger(...ns)) return nums
//     let nonzeros = ns.filter($ => IsNonZero($))
//     Should(nonzeros.length > 0, 'at least one non-zero num')
//     return ns.reduceRatio()
// }
// globalThis.SimpRatio = contract(SimpRatio).sign([owl.num])



/**
 * @category Numeracy
 * @return reduce input array to integral ratio.
 * ```
 * IntegerRatio(2,4,6) // [1,2,3]
 * IntegerRatio(0,4,6) // [0,2,3]
 * IntegerRatio(0,4) // [0,1]
 * IntegerRatio(1/3,1/2,1/4) // [4,6,3]
 * IntegerRatio(Math.sqrt(2),1/2,1/4) // throw
 * ```
 */
function Ratio(...nums: number[]): number[] {
    return toNumbers(nums).ratio()
}
globalThis.Ratio = contract(Ratio).sign([owl.rational])





/**
 * @category Numeracy
 * @return The HCF of nums.
 * ```
 * HCF(6,8) // 2
 * HCF(6,8,9) // 1
 * HCF(1,3) // 1
 * HCF(0.5,3) // throw
 * HCF(0,3) // throw
 * ```
 */
function HCF(...nums: number[]): number {
    return toNumbers(nums).hcf()
}
globalThis.HCF = contract(HCF).sign([owl.nonZeroInt])


/**
 * @category Numeracy
 * @return The LCM of nums.
 * ```
 * LCM(2,3) // 6
 * LCM(2,3,5) // 30
 * LCM(0.5,3) // throw
 * LCM(0,3) // throw
 * ```
 */
function LCM(...nums: number[]): number {
    return toNumbers(nums).lcm()
}
globalThis.LCM = contract(LCM).sign([owl.nonZeroInt])





/**
 * @category Numeracy
 * @return convert num to fraction
 * ```
 * ToFrac(0.5) // [1,2]
 * ToFrac(-456/123) // [-152,41]
 * ```
 */
function ToFrac(num: number): Fraction {
    return cal.toFraction(num)
}
globalThis.ToFrac = contract(ToFrac).sign([owl.rational])




