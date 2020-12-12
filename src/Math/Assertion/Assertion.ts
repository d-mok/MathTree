


/**
 * @category Assertion
 * @return check if number is an integer.
 * ```typescript
 * IsInteger(5) // return true
 * IsInteger(0.5) // return false
 * ```
 */
function IsInteger(...num: number[]): boolean {
    return num.every(x => Number.isInteger(x));
}
globalThis.IsInteger = IsInteger


/**
 * @category Assertion
 * @return check if the number is not -1, 0 or 1.
 * ```typescript
 * IsCoeff(2) // return true
 * IsCoeff(-1) // return false
 * ```
 */
function IsCoeff(...num: number[]): boolean {
    return num.every(x => (x < -1 || x > 1));
}
globalThis.IsCoeff = IsCoeff






/**
 * @category Assertion
 * @return check if the number is an odd integer.
 * ```typescript
 * IsOdd(5) // return true
 * IsOdd(-5) // return true
 * IsOdd(4) // return false
 * ```
 */
function IsOdd(...num: number[]): boolean {
    return num.every(x => Math.abs(x) % 2 === 1 && IsInteger(x));
}
globalThis.IsOdd = IsOdd

/**
 * @category Assertion
 * @return check if the number is an even integer.
 * ```typescript
 * IsEven(4) // return true
 * IsEven(-4) // return true
 * IsEven(0) // return true
 * IsEven(5) // return false
 * ```
 */
function IsEven(...num: number[]): boolean {
    return num.every(x => Math.abs(x) % 2 === 0 && IsInteger(x));
}
globalThis.IsEven = IsEven



/**
 * @category Assertion
 * @return check if the number is in [0,1].
 * ```typescript
 * IsProbability(0) // return true
 * IsProbability(0.5467) // return true
 * IsProbability(1.1) // return false
 * IsProbability(-0.1) // return false
 * ```
 */
function IsProbability(...num: number[]): boolean {
    return num.every(x => x >= 0 && x <= 1);
}
globalThis.IsProbability = IsProbability

/**
 * @category Assertion
 * @return check if the number is a square number, not negative.
 * ```typescript
 * IsSquareNum(9) // return true
 * IsSquareNum(10) // return false
 * ```
 */
function IsSquareNum(...num: number[]): boolean {
    return num.every(x => (x >= 0 && Math.sqrt(x) % 1 === 0));
}
globalThis.IsSquareNum = IsSquareNum



/**
 * @category Assertion
 * @return check if the number is positive.
 * ```typescript
 * IsPositive(2) // return true
 * IsPositive(0) // return false
 * IsPositive(-2) // return false
 * ```
 */
function IsPositive(...num: number[]): boolean {
    return num.every(x => x > 0);
}
globalThis.IsPositive = IsPositive


/**
 * @category Assertion
 * @return check if the number is non-zero.
 * ```typescript
 * IsNonZero(2) // return true
 * IsNonZero(0) // return false
 * IsNonZero(-2) // return true
 * ```
 */
function IsNonZero(...num: number[]): boolean {
    return num.every(x => x !== 0);
}
globalThis.IsNonZero = IsNonZero
