

/**
 * Return the absolute value. Equivalent to Math.abs(x).
 * @category Numeracy
 * @param {number} num - The input number.
 * @return {number} The absolute value.
 * @example
 * Abs(-2) // return 2
 */
function Abs(num: number): number {
    return Math.abs(num);
}
globalThis.Abs = Abs


/**
 * Return the sign of the number as 1,0 or -1.
 * @category Numeracy
 * @param {number} num - The input number.
 * @return {number} The sign of num. 1,0 or -1.
 * @example
 * Sign(3) // return 1
 * Sign(-4.5) // return -1
 * Sign(0) // return 0
 */
function Sign(num: number): number {
    if (num > 0) return 1;
    if (num < 0) return -1;
    return 0;
}
globalThis.Sign = Sign


/**
 * Return the number rounded off to given sigfig.
 * @category Numeracy
 * @param {number} num - The input number.
 * @param {number} [sigfig=3] - The sigfig to round to.
 * @return {number} The rounded number.
 * @example
 * Round(1.23456,3) // return 1.23
 * Round(1.23567,3) // return 1.24
 */
function Round(num: number, sigfig = 3): number {
    if (sigfig < 1) sigfig = 1;
    return parseFloat(num.toPrecision(sigfig));
}
globalThis.Round = Round

/**
 * Return the number rounded up to given sigfig.
 * @category Numeracy
 * @param {number} num - The input number.
 * @param {number} [sigfig=3] - The sigfig to round to.
 * @return {number} The rounded up number.
 * @example
 * RoundUp(1.23456,3) // return 1.23
 * RoundUp(1.23567,1) // return 2
 */
function RoundUp(num: number, sigfig = 3): number {
    if (sigfig < 1) sigfig = 1;
    let d = -Math.floor(Math.log(num) / Math.log(10)) + sigfig - 1;
    return FixUp(num, d);
}
globalThis.RoundUp = RoundUp

/**
 * Return the number rounded down to given sigfig.
 * @category Numeracy
 * @param {number} num - The input number.
 * @param {number} [sigfig=3] - The sigfig to round to.
 * @return {number} The rounded down number.
 * @example
 * RoundDown(1.23456,5) // return 1.2345
 * RoundDown(1.6789,1) // return 1
 */
function RoundDown(num: number, sigfig = 3): number {
    if (sigfig < 1) sigfig = 1;
    let d = -Math.floor(Math.log(num) / Math.log(10)) + sigfig - 1;
    return FixDown(num, d);
}
globalThis.RoundDown = RoundDown


/**
 * Return the number rounded off to given decimal place.
 * @category Numeracy
 * @param {number} num - The input number.
 * @param {number} [dp=0] - The decimal place to round to.
 * @return {number} The rounded number.
 * @example
 * Fix(12345.678,0) // round to integer, return 12346
 * Fix(12345.678,2) // round to 2 dp, return 12345.68
 * Fix(12345.678,-2) // round to hundred, return 12300
 */
function Fix(num: number, dp = 0): number {
    num = num * (10 ** dp);
    num = Math.round(num);
    num = num / (10 ** dp);
    if (dp < 0) num = Fix(num, 1);   // correct for floating point error
    return num;
}
globalThis.Fix = Fix

/**
 * Return the number rounded up to given decimal place.
 * @category Numeracy
 * @param {number} num - The input number.
 * @param {number} [dp=0] - The decimal place to round to.
 * @return {number} The rounded up number.
 * @example
 * FixUp(12.34,0) // round to integer, return 13
 * FixUp(12.34,1) // round to 1 dp, return 12.4
 * FixUp(12.34,-1) // round to ten, return 20
 */
function FixUp(num: number, dp = 0): number {
    num = num * (10 ** dp);
    let original = num;
    num = Math.round(num);
    if (num < original) num = num + 1;
    num = num / (10 ** dp);
    if (dp < 0) num = Fix(num, 1);   // correct for floating point error
    return num;
}
globalThis.FixUp = FixUp



/**
 * Return the number rounded down to given decimal place.
 * @category Numeracy
 * @param {number} num - The input number.
 * @param {number} [dp=0] - The decimal place to round to.
 * @return {number} The rounded down number.
 * @example
 * FixDown(17.89,0) // round to integer, return 17
 * FixDown(17.89,1) // round to 1 dp, return 17.8
 * FixDown(17.89,-1) // round to ten, return 10
 */
function FixDown(num: number, dp = 0): number {
    num = num * (10 ** dp);
    let original = num;
    num = Math.round(num);
    if (num > original) num = num - 1;
    num = num / (10 ** dp);
    if (dp < 0) num = Fix(num, 1);   // correct for floating point error
    return num;
}
globalThis.FixDown = FixDown



/**
 * Return the ceiling integer of the number.
 * @category Numeracy
 * @param {number} num - The input number.
 * @return {number} The ceiling integer.
 * @example
 * Ceil(1.1) // return 2
 * Ceil(-1.1) // return -1
 * Ceil(2)) // return 2
 */
function Ceil(num: number): number {
    return Math.ceil(num);
}
globalThis.Ceil = Ceil

/**
 * Return the floor integer of the number.
 * @category Numeracy
 * @param {number} num - The input number.
 * @return {number} The floor integer.
 * @example
 * Floor(1.9) // return 1
 * Floor(-1.9) // return -2
 * Floor(2)) // return 2
 */
function Floor(num: number): number {
    return Math.floor(num);
}
globalThis.Floor = Floor


/**
 * Return the array of reduced ratio.
 * @category Numeracy
 * @param {...number} nums - The array of ratio.
 * @return {number[]} The array of reduced ratio.
 * @example
 * SimpRatio(2,4,6) // return [1,2,3]
 */
function SimpRatio(...nums: number[]): number[] {
    let h = HCF(...nums);
    return nums.map(x => x / h);
}
globalThis.SimpRatio = SimpRatio

/**
 * Return the number of sigfig.
 * @category Numeracy
 * @param {number} value - The input number.
 * @return {number} The number of sigfig.
 * @example
 * SigFig(1.234) // return 4
 * SigFig(1200) // return 2
 * SigFig(0.00123) // return 3
 */
function SigFig(value: number): number {
    return Math.abs(value)
        .toExponential()
        .replace(/e[\+\-0-9]*$/, '')  // remove exponential notation
        .replace(/^0\.?0*|\./, '')    // remove decimal point and leading zeros
        .length;
};
globalThis.SigFig = SigFig
