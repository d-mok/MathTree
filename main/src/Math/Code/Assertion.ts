/**
 * @category Assertion
 * @return check is a finite number.
 * ```
 * IsNum(1.23) // true
 * IsNum(NaN) // false
 * IsNum(Infinity) // false
 * IsNum('2') // false
 * ```
 */
function IsNum(...items: any[]): boolean {
    return items.every(owl.num);
}
globalThis.IsNum = IsNum


/**
 * @category Assertion
 * @return check is an integer.
 * ```
 * IsInteger(5) // true
 * IsInteger(0.5) // false
 * ```
 */
function IsInteger(...items: any[]): boolean {
    return items.every(owl.int);
}
globalThis.IsInteger = IsInteger



/**
 * @category Assertion
 * @return check is a decimal (non-integer).
 * ```
 * IsDecimal(0.5) // true
 * IsDecimal(5) // false
 * ```
 */
function IsDecimal(...items: any[]): boolean {
    return items.every(owl.dec);
}
globalThis.IsDecimal = IsDecimal



/**
 * @category Assertion
 * @return check is a terminating decimal (or integer)
 * ```
 * IsTerminating(1/4) // true
 * IsTerminating(5) // false
 * ```
 */
function IsTerminating(...items: any[]): boolean {
    return items.every(owl.terminating);
}
globalThis.IsTerminating = IsTerminating



/**
 * @category Assertion
 * @return check is a rational number with denominator <= 1000.
 * ```
 * IsRational(0.5) // true
 * IsRational(-5) // true
 * IsRational(Math.sqrt(2)) // false
 * ```
 */
function IsRational(...items: any[]): boolean {
    return items.every(owl.rational);
}
globalThis.IsRational = IsRational







/**
 * @category Assertion
 * @return check is an odd integer.
 * ```
 * IsOdd(5) // true
 * IsOdd(-5) // true
 * IsOdd(4) // false
 * ```
 */
function IsOdd(...items: any[]): boolean {
    return items.every(owl.odd);
}
globalThis.IsOdd = IsOdd




/**
 * @category Assertion
 * @return check is an even integer.
 * ```
 * IsEven(4) // true
 * IsEven(-4) // true
 * IsEven(0) // true
 * IsEven(5) // false
 * ```
 */
function IsEven(...items: any[]): boolean {
    return items.every(owl.even);
}
globalThis.IsEven = IsEven



/**
 * @category Assertion
 * @return check is in range [0,1].
 * ```
 * IsProbability(0) // true
 * IsProbability(0.5467) // true
 * IsProbability(1.1) // false
 * IsProbability(-0.1) // false
 * ```
 */
function IsProbability(...items: any[]): boolean {
    return items.every(owl.prob);
}
globalThis.IsProbability = IsProbability



/**
 * @category Assertion
 * @return check is a square number.
 * ```
 * IsSquareNum(9) // true
 * IsSquareNum(10) // false
 * IsSquareNum(-9) // false
 * ```
 */
function IsSquareNum(...items: any[]): boolean {
    return items.every(owl.sq);
}
globalThis.IsSquareNum = IsSquareNum



/**
 * @category Assertion
 * @return check is positive.
 * ```
 * IsPositive(2) // true
 * IsPositive(0) // false
 * IsPositive(-2) // false
 * ```
 */
function IsPositive(...items: any[]): boolean {
    return items.every(owl.positive);
}
globalThis.IsPositive = IsPositive



/**
 * @category Assertion
 * @return check is non-negative.
 * ```
 * IsNonNegative(2) // true
 * IsNonNegative(0) // true
 * IsNonNegative(-2) // false
 * IsNonNegative(1.5) // true
 * ```
 */
function IsNonNegative(...items: any[]): boolean {
    return items.every(owl.nonNegative);
}
globalThis.IsNonNegative = IsNonNegative




/**
 * @category Assertion
 * @return check is a positive integer.
 * ```
 * IsPositiveInteger(2) // true
 * IsPositiveInteger(0) // false
 * IsPositiveInteger(-2) // false
 * IsPositiveInteger(1.5) // false
 * ```
 */
function IsPositiveInteger(...items: any[]): boolean {
    return items.every(owl.positiveInt);
}
globalThis.IsPositiveInteger = IsPositiveInteger


/**
 * @category Assertion
 * @return check is a non-negative integer.
 * ```
 * IsNonNegativeInteger(2) // true
 * IsNonNegativeInteger(0) // true
 * IsNonNegativeInteger(-2) // false
 * IsNonNegativeInteger(1.5) // false
 * ```
 */
function IsNonNegativeInteger(...items: any[]): boolean {
    return items.every(owl.nonNegativeInt);
}
globalThis.IsNonNegativeInteger = IsNonNegativeInteger





/**
 * @category Assertion
 * @return check is negative.
 * ```
 * IsNegative(-2) // true
 * IsNegative(0) // false
 * IsNegative(2) // false
 * ```
 */
function IsNegative(...items: any[]): boolean {
    return items.every(owl.negative);
}
globalThis.IsNegative = IsNegative




/**
 * @category Assertion
 * @return check is non-zero finite number.
 * ```
 * IsNonZero(2) // true
 * IsNonZero(0) // false
 * IsNonZero(-2) // true
 * ```
 */
function IsNonZero(...items: any[]): boolean {
    return items.every(owl.nonZero);
}
globalThis.IsNonZero = IsNonZero






/**
 * @category Assertion
 * @return check is between min and max inclusive.
 * ```
 * IsBetween(2,5)(3) // true
 * IsBetween(2,5)(2) // true
 * IsBetween(2,5)(1) // false
 * ```
 */
function IsBetween(min: number, max: number) {
    return (...items: any[]): boolean => items.every(owl.between(min, max))
}
globalThis.IsBetween = contract(IsBetween).seal({
    arg: [owl.num],
    args: function is_range(min, max) { return min < max }
})




/**
 * @category Assertion
 * @return check if its abs is between min and max inclusive.
 * ```
 * IsAbsBetween(2,5)(-3) // true
 * IsAbsBetween(2,5)(-2) // true
 * IsAbsBetween(2,5)(1) // false
 * ```
 */
function IsAbsBetween(min: number, max: number) {
    return (...items: any[]): boolean => items.every(owl.absBetween(min, max))
}
globalThis.IsAbsBetween = contract(IsAbsBetween).seal({
    arg: [owl.nonNegative],
    args: function is_range(min, max) { return min < max }
})






/**
 * @category Assertion
 * @return Check if the points are chessboard around anchor.
 * ```
 * IsAroundPoint([0,0],2)([2,2]) // true
 * IsAroundPoint([0,0],2)([3,0]) // false
 * ```
 */
function IsAroundPoint(anchor: Point2D, range: number) {
    return (...points: Point2D[]): boolean => points.every(
        p => ChessboardDistance(anchor, p) <= range
    );
}
globalThis.IsAroundPoint = contract(IsAroundPoint).sign([owl.point2D, owl.positive])



/**
 * @category Assertion
 * @return Check if the array of legnths can form a triangle
 * ```
 * IsTriangle([1,1,1]) // true
 * IsTriangle([6,7,8]) // true
 * IsTriangle([1,2,3]) // false
 * IsTriangle([6,14,8]) // false
 * ```
 */
function IsTriangle(...triangles: [number, number, number][]): boolean {
    return triangles.every(owl.triangleSides)
}
globalThis.IsTriangle = contract(IsTriangle).sign([owl.triple])


