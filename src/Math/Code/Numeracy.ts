/**
 * @category Numeracy
 * @return division with x/0 handling
 * ```typescript
 * Divide(6,2) // 3
 * Divide(6,0) // throw
 * ```
 */
function Divide(dividend: number, divisor: number): number {
    Should(IsNum(dividend, divisor), 'input must be num')
    Should(divisor !== 0, 'division by 0')
    return dividend / divisor
}
globalThis.Divide = Divide


/**
 * @category Numeracy
 * @return the absolute value. Equivalent to Math.abs(x).
 * ```typescript
 * Abs(-2) // 2
 * ```
 */
function Abs(num: number): number {
    Should(IsNum(num), 'input must be num')
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
function Sign(num: number): -1 | 0 | 1 {
    Should(IsNum(num), 'input must be num')
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
    Should(IsNum(num), 'input must be num')
    Should(IsPositiveInteger(sigfig), 'sigfig must be positive integer')
    if (num === 0) return 0
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
    Should(IsNum(num), 'input must be num')
    Should(IsPositiveInteger(sigfig), 'sigfig must be positive integer')
    if (num === 0) return 0
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
    Should(IsNum(num), 'input must be num')
    Should(IsPositiveInteger(sigfig), 'sigfig must be positive integer')
    if (num === 0) return 0
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
    Should(IsNum(num), 'input must be num')
    Should(IsInteger(dp), 'dp must be integer')
    const sign = Sign(num)
    num = Abs(num)
    num = Raise(num, dp)
    num = Math.round(num + Number.EPSILON);
    num = Raise(num, -dp)
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
    Should(IsNum(num), 'input must be num')
    Should(IsInteger(dp), 'dp must be integer')
    const sign = Sign(num)
    num = Abs(num)
    num = Raise(num, dp)
    num = Math.ceil(num - Number.EPSILON);
    num = Raise(num, -dp)
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
    Should(IsNum(num), 'input must be num')
    Should(IsInteger(dp), 'dp must be integer')
    const sign = Sign(num)
    num = Abs(num)
    num = Raise(num, dp)
    num = Math.floor(num + Number.EPSILON);
    num = Raise(num, -dp)
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
    Should(IsNum(num), 'input must be num')
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
    Should(IsNum(num), 'input must be num')
    return Math.floor(num);
}
globalThis.Floor = Floor


/**
 * @category Numeracy
 * @return reduce input array to simplest ratio.
 * ```typescript
 * SimpRatio(2,4,6) // [1,2,3]
 * SimpRatio(0,4,6) // [0,2,3]
 * SimpRatio(0,4) // [0,1]
 * ```
 */
function SimpRatio(...nums: number[]): number[] {
    Should(IsNum(...nums), 'input must be num')
    nums = Blurs(nums)
    if (!IsInteger(...nums)) return nums
    let nonzeros = nums.filter(x => IsNonZero(x))
    Should(nonzeros.length > 0, 'at least one non-zero num')
    let h = HCF(...nonzeros);
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
    Should(IsNum(value), 'input must be num')
    value = Blur(value)
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
    Should(IsNum(value), 'input must be num')
    value = Blur(value)
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
 * Magnitude(0.9) // -1
 * Magnitude(10) // 1
 * Magnitude(10.1) // 1
 * Magnitude(0.1) // -1
 * Magnitude(0.02) // -2
 * ```
 */
function Magnitude(num: number): number {
    // Should(IsNum(num), 'input must be num')
    return Number(num.toExponential().split('e')[1])
}
globalThis.Magnitude = Magnitude



/**
 * @category Numeracy
 * @return the mantissa
 * ```typescript
 * Mantissa(1.23) // 1.23
 * Mantissa(123) // 1.23
 * Mantissa(0.123) // 1.23
 * ```
 */
function Mantissa(num: number): number {
    return Number(num.toExponential().split('e')[0])
}
globalThis.Mantissa = Mantissa


/**
 * @category Numeracy
 * @return the lowest number with the next order of magnitude
 * ```typescript
 * LogCeil(5) // 10
 * LogCeil(23) // 100
 * LogCeil(0.456) // 1
 * LogCeil(0.00235) // 0.01
 * ```
 */
function LogCeil(num: number): number {
    let exp = Magnitude(num) + 1
    return Number('1e' + exp)
}
globalThis.LogCeil = LogCeil


/**
 * @category Numeracy
 * @return the lowest number with the same order of magnitude
 * ```typescript
 * LogFloor(5) // 1
 * LogFloor(23) // 10
 * LogFloor(0.456) // 0.1
 * LogFloor(0.00235) // 0.001
 * ```
 */
function LogFloor(num: number): number {
    let exp = Magnitude(num)
    return Number('1e' + exp)
}
globalThis.LogFloor = LogFloor





/**
 * @category Numeracy
 * @return add a constant to the magnitude
 * ```typescript
 * Raise(12.34,1) // 123.4
 * Raise(12.34,-1) // 1.234
 * ```
 */
function Raise(num: number, add: number) {
    let exp = Magnitude(num)
    let mantissa = Mantissa(num)
    exp += add
    return Number(mantissa + 'e' + exp)
}
globalThis.Raise = Raise



/**
 * @category Numeracy
 * @return correct for floating point error
 * ```typescript
 * Blur(0.1+0.2) // 0.3
 * Blur(0.81-1) // -0.19
 * Blur(1.1**2) // 1.21
 * ```
 */
function Blur(value: any, accuracy = 12): (typeof value) {
    if (typeof value !== 'number') return value
    if (!isFinite(value)) return value
    // value = parseFloat(value.toFixed(accuracy));
    value = parseFloat(value.toPrecision(accuracy));
    return value
}
globalThis.Blur = Blur


/**
 * @category Numeracy
 * @return correct for floating point error
 * ```typescript
 * Blurs([0.1+0.2,0.81-1]) // [0.3,-0.19]
 * ```
 */
function Blurs(values: any[], accuracy = 12): (typeof values) {
    return values.map(x => Blur(x, accuracy))
}
globalThis.Blurs = Blurs
