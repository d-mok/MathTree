
/**
 * @category Assertion
 * @return check if input is a number.
 * ```typescript
 * IsNum(1.23) // true
 * IsNum(NaN) // false
 * IsNum(Infinity) // false
 * IsNum('2') // false
 * ```
 */
function IsNum(...num: number[]): boolean {
    return num.every(x => typeof x === 'number' && isFinite(x));
}
globalThis.IsNum = IsNum


/**
 * @category Assertion
 * @return check if number is an integer.
 * ```typescript
 * IsInteger(5) // true
 * IsInteger(0.5) // false
 * ```
 */
function IsInteger(...num: number[]): boolean {
    return num.every(x => Number.isInteger(x));
}
globalThis.IsInteger = IsInteger


/**
 * @category Assertion
 * @return check if the number is an integer but not -1, 0 or 1.
 * ```typescript
 * IsCoeff(2) // true
 * IsCoeff(-1) // false
 * ```
 */
function IsCoeff(...num: number[]): boolean {
    return num.every(x => IsInteger(x) && ![-1, 0, 1].includes(x));
}
globalThis.IsCoeff = IsCoeff






/**
 * @category Assertion
 * @return check if the number is an odd integer.
 * ```typescript
 * IsOdd(5) // true
 * IsOdd(-5) // true
 * IsOdd(4) // false
 * ```
 */
function IsOdd(...num: number[]): boolean {
    return num.every(x => IsInteger(x) && Math.abs(x) % 2 === 1);
}
globalThis.IsOdd = IsOdd

/**
 * @category Assertion
 * @return check if the number is an even integer.
 * ```typescript
 * IsEven(4) // true
 * IsEven(-4) // true
 * IsEven(0) // true
 * IsEven(5) // false
 * ```
 */
function IsEven(...num: number[]): boolean {
    return num.every(x => IsInteger(x) && Math.abs(x) % 2 === 0);
}
globalThis.IsEven = IsEven



/**
 * @category Assertion
 * @return check if the number is in [0,1].
 * ```typescript
 * IsProbability(0) // true
 * IsProbability(0.5467) // true
 * IsProbability(1.1) // false
 * IsProbability(-0.1) // false
 * ```
 */
function IsProbability(...num: number[]): boolean {
    return num.every(x => IsNum(x) && x >= 0 && x <= 1);
}
globalThis.IsProbability = IsProbability



/**
 * @category Assertion
 * @return check if the number is a square number.
 * ```typescript
 * IsSquareNum(9) // true
 * IsSquareNum(10) // false
 * IsSquareNum(-9) // false
 * ```
 */
function IsSquareNum(...num: number[]): boolean {
    return num.every(x => IsInteger(x) && x >= 0 && IsInteger(Math.sqrt(x)));
}
globalThis.IsSquareNum = IsSquareNum



/**
 * @category Assertion
 * @return check if the number is positive.
 * ```typescript
 * IsPositive(2) // true
 * IsPositive(0) // false
 * IsPositive(-2) // false
 * ```
 */
function IsPositive(...num: number[]): boolean {
    return num.every(x => IsNum(x) && x > 0);
}
globalThis.IsPositive = IsPositive


/**
 * @category Assertion
 * @return check if the number is non-zero.
 * ```typescript
 * IsNonZero(2) // true
 * IsNonZero(0) // false
 * IsNonZero(-2) // true
 * ```
 */
function IsNonZero(...num: number[]): boolean {
    return num.every(x => IsNum(x) && x !== 0);
}
globalThis.IsNonZero = IsNonZero
