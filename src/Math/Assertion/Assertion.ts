
/**
 * @category Assertion
 * @return check is a finite number.
 * ```typescript
 * IsNum(1.23) // true
 * IsNum(NaN) // false
 * IsNum(Infinity) // false
 * IsNum('2') // false
 * ```
 */
function IsNum(...items: any[]): boolean {
    return items.every(
        x => Number.isFinite(x)
    );
}
globalThis.IsNum = IsNum


/**
 * @category Assertion
 * @return check is an integer.
 * ```typescript
 * IsInteger(5) // true
 * IsInteger(0.5) // false
 * ```
 */
function IsInteger(...items: any[]): boolean {
    return Blurs(items).every(
        x => Number.isInteger(x)
    );
}
globalThis.IsInteger = IsInteger



/**
 * @category Assertion
 * @return check is a decimal (non-integer).
 * ```typescript
 * IsDecimal(0.5) // true
 * IsDecimal(5) // false
 * ```
 */
function IsDecimal(...items: any[]): boolean {
    return Blurs(items).every(
        x => IsNum(x) && !IsInteger(x)
    );
}
globalThis.IsDecimal = IsDecimal





/**
 * @category Assertion
 * @ignore
 * @deprecated
 * @return check is an integer but not -1, 0 or 1.
 * ```typescript
 * IsCoeff(2) // true
 * IsCoeff(-1) // false
 * ```
 */
function IsCoeff(...items: any[]): boolean {
    return Blurs(items).every(
        x => IsInteger(x) && ![-1, 0, 1].includes(x)
    );
}
globalThis.IsCoeff = IsCoeff






/**
 * @category Assertion
 * @return check is an odd integer.
 * ```typescript
 * IsOdd(5) // true
 * IsOdd(-5) // true
 * IsOdd(4) // false
 * ```
 */
function IsOdd(...items: any[]): boolean {
    return Blurs(items).every(
        x => IsInteger(x) && Math.abs(x) % 2 === 1
    );
}
globalThis.IsOdd = IsOdd




/**
 * @category Assertion
 * @return check is an even integer.
 * ```typescript
 * IsEven(4) // true
 * IsEven(-4) // true
 * IsEven(0) // true
 * IsEven(5) // false
 * ```
 */
function IsEven(...items: any[]): boolean {
    return Blurs(items).every(
        x => IsInteger(x) && Math.abs(x) % 2 === 0
    );
}
globalThis.IsEven = IsEven



/**
 * @category Assertion
 * @return check is in range [0,1].
 * ```typescript
 * IsProbability(0) // true
 * IsProbability(0.5467) // true
 * IsProbability(1.1) // false
 * IsProbability(-0.1) // false
 * ```
 */
function IsProbability(...items: any[]): boolean {
    return items.every(
        x => IsNum(x) && x >= 0 && x <= 1
    );
}
globalThis.IsProbability = IsProbability



/**
 * @category Assertion
 * @return check is a square number.
 * ```typescript
 * IsSquareNum(9) // true
 * IsSquareNum(10) // false
 * IsSquareNum(-9) // false
 * ```
 */
function IsSquareNum(...items: any[]): boolean {
    return Blurs(items).every(
        x => IsInteger(x) && x >= 0 && IsInteger(Math.sqrt(x))
    );
}
globalThis.IsSquareNum = IsSquareNum



/**
 * @category Assertion
 * @return check is positive.
 * ```typescript
 * IsPositive(2) // true
 * IsPositive(0) // false
 * IsPositive(-2) // false
 * ```
 */
function IsPositive(...items: any[]): boolean {
    return items.every(
        x => IsNum(x) && x > 0
    );
}
globalThis.IsPositive = IsPositive



/**
 * @category Assertion
 * @return check is non-negative.
 * ```typescript
 * IsNonNegative(2) // true
 * IsNonNegative(0) // true
 * IsNonNegative(-2) // false
 * IsNonNegative(1.5) // true
 * ```
 */
function IsNonNegative(...items: any[]): boolean {
    return items.every(
        x => IsNum(x) && x >= 0
    );
}
globalThis.IsNonNegative = IsNonNegative




/**
 * @category Assertion
 * @return check is a positive integer.
 * ```typescript
 * IsPositiveInteger(2) // true
 * IsPositiveInteger(0) // false
 * IsPositiveInteger(-2) // false
 * IsPositiveInteger(1.5) // false
 * ```
 */
function IsPositiveInteger(...items: any[]): boolean {
    return items.every(
        x => IsInteger(x) && x > 0
    );
}
globalThis.IsPositiveInteger = IsPositiveInteger


/**
 * @category Assertion
 * @return check is a non-negative integer.
 * ```typescript
 * IsNonNegativeInteger(2) // true
 * IsNonNegativeInteger(0) // true
 * IsNonNegativeInteger(-2) // false
 * IsNonNegativeInteger(1.5) // false
 * ```
 */
function IsNonNegativeInteger(...items: any[]): boolean {
    return items.every(
        x => IsInteger(x) && x >= 0
    );
}
globalThis.IsNonNegativeInteger = IsNonNegativeInteger





/**
 * @category Assertion
 * @return check is negative.
 * ```typescript
 * IsNegative(-2) // true
 * IsNegative(0) // false
 * IsNegative(2) // false
 * ```
 */
function IsNegative(...items: any[]): boolean {
    return items.every(
        x => IsNum(x) && x < 0
    );
}
globalThis.IsNegative = IsNegative




/**
 * @category Assertion
 * @return check is non-zero finite number.
 * ```typescript
 * IsNonZero(2) // true
 * IsNonZero(0) // false
 * IsNonZero(-2) // true
 * ```
 */
function IsNonZero(...items: any[]): boolean {
    return items.every(
        x => IsNum(x) && x !== 0
    );
}
globalThis.IsNonZero = IsNonZero






/**
 * @category Assertion
 * @return check is between min and max inclusive.
 * ```typescript
 * IsBetween(2,5)(3) // true
 * IsBetween(2,5)(2) // true
 * IsBetween(2,5)(1) // false
 * ```
 */
function IsBetween(min: number, max: number) {
    return (...items: any[]): boolean => items.every(
        x => IsNum(x) && x >= min && x <= max
    )
}
globalThis.IsBetween = IsBetween




/**
 * @category Assertion
 * @return check if its abs is between min and max inclusive.
 * ```typescript
 * IsAbsBetween(2,5)(-3) // true
 * IsAbsBetween(2,5)(-2) // true
 * IsAbsBetween(2,5)(1) // false
 * ```
 */
function IsAbsBetween(min: number, max: number) {
    return (...items: any[]): boolean => items.every(
        x => IsNum(x) && Abs(x) >= min && Abs(x) <= max
    )
}
globalThis.IsAbsBetween = IsAbsBetween






/**
 * @category Assertion
 * @return Check if the points are chessboard around anchor.
 * ```typescript
 * IsAroundPoint([0,0],2)([2,2]) // true
 * IsAroundPoint([0,0],2)([3,0]) // false
 * ```
 */
function IsAroundPoint(anchor: Point, range: number) {
    Should(IsPoint(anchor), 'anchor must be a point')
    Should(IsPositive(range), 'range must be a positive number')
    return function (...points: Point[]): boolean {
        return points.every(
            p => ChessboardDistance(anchor, p) <= range
        );
    }
}
globalThis.IsAroundPoint = IsAroundPoint



/**
 * @category Assertion
 * @return Check if the array of legnths can form a triangle
 * ```typescript
 * IsTriangle([1,1,1]) // true
 * IsTriangle([6,7,8]) // true
 * IsTriangle([1,2,3]) // false
 * IsTriangle([6,14,8]) // false
 * ```
 */
function IsTriangle(...triangles: [number, number, number][]): boolean {
    return triangles.every(t => {
        if (!IsArrayOfLength(3)(t)) return false
        let [a, b, c] = t
        if (!IsPositive(a, b, c)) return false
        if (a + b <= c) return false
        if (b + c <= a) return false
        if (c + a <= b) return false
        return true
    })
}
globalThis.IsTriangle = IsTriangle
