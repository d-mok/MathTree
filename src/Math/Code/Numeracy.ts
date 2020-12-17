

/**
 * @category Numeracy
 * @return the absolute value. Equivalent to Math.abs(x).
 * ```typescript
 * Abs(-2) // 2
 * ```
 */
function Abs(num: number): number {
    return Math.abs(num);
}
globalThis.Abs = Abs


/**
 * @category Numeracy
 * @return the sign of the number as 1,0 or -1.
 * ```typescript
 * Sign(3) // 1
 * Sign(-4.5) // -1
 * Sign(0) // 0
 * ```
 */
function Sign(num: number): 1 | -1 | 0 {
    if (num > 0) return 1;
    if (num < 0) return -1;
    return 0;
}
globalThis.Sign = Sign



/**
 * @category Numeracy
 * @return the number rounded off to given sigfig.
 * ```typescript
 * Round(1.23456,3) // 1.23
 * Round(1.23567,3) // 1.24
 * ```
 */
function Round(num: number, sigfig = 3): number {
    if (sigfig < 1) sigfig = 1;
    let d = -Magnitude(num) + sigfig - 1;
    return Fix(num, d);
}
globalThis.Round = Round

/**
 * @category Numeracy
 * @return the number rounded up to given sigfig.
 * ```typescript
 * RoundUp(1.23456,3) // 1.23
 * RoundUp(1.23567,1) // 2
 * ```
 */
function RoundUp(num: number, sigfig = 3): number {
    if (sigfig < 1) sigfig = 1;
    let d = -Magnitude(num) + sigfig - 1;
    return FixUp(num, d);
}
globalThis.RoundUp = RoundUp

/**
 * @category Numeracy
 * @return the number rounded down to given sigfig.
 * ```typescript
 * RoundDown(1.23456,5) // 1.2345
 * RoundDown(1.6789,1) // 1
 * ```
 */
function RoundDown(num: number, sigfig = 3): number {
    if (sigfig < 1) sigfig = 1;
    let d = -Magnitude(num) + sigfig - 1;
    return FixDown(num, d);
}
globalThis.RoundDown = RoundDown


/**
 * @category Numeracy
 * @return the number rounded off to given decimal place.
 * ```typescript
 * Fix(12345.678,0) // round to integer, return 12346
 * Fix(12345.678,2) // round to 2 dp, return 12345.68
 * Fix(12345.678,-2) // round to hundred, return 12300
 * ```
 */
function Fix(num: number, dp = 0): number {
    const sign = Sign(num)
    num = Abs(num)
    num += Number.EPSILON
    num = num * (10 ** dp);
    num = Math.round(num);
    num = num / (10 ** dp);
    if (dp < 0) num = Fix(num, 1);   // correct for floating point error
    return sign * num;
}
globalThis.Fix = Fix

/**
 * @category Numeracy
 * @return the number rounded up to given decimal place.
 * ```typescript
 * FixUp(12.34,0) // round to integer, return 13
 * FixUp(12.34,1) // round to 1 dp, return 12.4
 * FixUp(12.34,-1) // round to ten, return 20
 * ```
 */
function FixUp(num: number, dp = 0): number {
    const sign = Sign(num)
    num = Abs(num)
    num -= Number.EPSILON
    num = num * (10 ** dp);
    num = Math.ceil(num);
    num = num / (10 ** dp);
    if (dp < 0) num = Fix(num, 1);   // correct for floating point error
    return sign * num;;
}
globalThis.FixUp = FixUp



/**
 * @category Numeracy
 * @return the number rounded down to given decimal place.
 * ```typescript
 * FixDown(17.89,0) // round to integer, return 17
 * FixDown(17.89,1) // round to 1 dp, return 17.8
 * FixDown(17.89,-1) // round to ten, return 10
 * ```
 */
function FixDown(num: number, dp = 0): number {
    const sign = Sign(num)
    num = Abs(num)
    num += Number.EPSILON
    num = num * (10 ** dp);
    num = Math.floor(num);
    num = num / (10 ** dp);
    if (dp < 0) num = Fix(num, 1);   // correct for floating point error
    return sign * num;;
}
globalThis.FixDown = FixDown



/**
 * @category Numeracy
 * @return the ceiling integer of the number.
 * ```typescript
 * Ceil(1.1) // 2
 * Ceil(-1.1) // -1
 * Ceil(2)) // 2
 * ```
 */
function Ceil(num: number): number {
    return Math.ceil(num);
}
globalThis.Ceil = Ceil

/**
 * @category Numeracy
 * @return the floor integer of the number.
 * ```typescript
 * Floor(1.9) // 1
 * Floor(-1.9) // -2
 * Floor(2)) // 2
 * ```
 */
function Floor(num: number): number {
    return Math.floor(num);
}
globalThis.Floor = Floor


/**
 * @category Numeracy
 * @return reduce input array to simplest ratio.
 * ```typescript
 * SimpRatio(2,4,6) // [1,2,3]
 * ```
 */
function SimpRatio(...nums: number[]): number[] {
    if (!IsInteger(...nums)) return nums
    if (!IsNonZero(...nums)) return nums
    let h = HCF(...nums);
    return nums.map(x => x / h);
}
globalThis.SimpRatio = SimpRatio

/**
 * @category Numeracy
 * @return the number of sigfig.
 * ```typescript
 * SigFig(1.234) // 4
 * SigFig(1200) // 2
 * SigFig(0.00123) // 3
 * ```
 */
function SigFig(value: number): number {
    value = parseFloat(value.toFixed(12));
    return Math.abs(value)
        .toExponential()
        .replace(/e[\+\-0-9]*$/, '')  // remove exponential notation
        .replace(/^0\.?0*|\./, '')    // remove decimal point and leading zeros
        .length;
};
globalThis.SigFig = SigFig



/**
 * @category Numeracy
 * @return count the decimal places
 * ```typescript
 * DecimalPlace(1.234) // 3
 * DecimalPlace(1200) // 0
 * DecimalPlace(0.00123) // 5
 * DecimalPlace(123.456789) // 6
 * ```
 */
function DecimalPlace(value: number): number {
    value = parseFloat(value.toFixed(12));
    if (IsInteger(value)) return 0
    return value.toString().split(".")[1]?.length ?? 0
};
globalThis.DecimalPlace = DecimalPlace



/**
 * @category Numeracy
 * @return the order of magnitude
 * ```typescript
 * Magnitude(1) // 0
 * Magnitude(2) // 0
 * Magnitude(0.9) // 0
 * Magnitude(10) // 1
 * Magnitude(10.1) // 1
 * Magnitude(0.1) // -1
 * Magnitude(0.02) // -2
 * ```
 */
function Magnitude(num: number): number {
    return Math.floor(log(10, Abs(num)))
}
globalThis.Magnitude = Magnitude
