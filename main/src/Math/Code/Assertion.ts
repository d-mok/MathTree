/**
 * check is a finite number.
 * ```
 * IsNum(1.23) // true
 * IsNum(NaN) // false
 * IsNum(Infinity) // false
 * IsNum('2') // false
 * ```
 */
export function IsNum(...items: unknown[]) {
    return items.every($ => typeof $ === 'number' && !isNaN($) && isFinite($))
}

/**
 * check is an integer.
 * ```
 * IsInteger(5) // true
 * IsInteger(0.5) // false
 * ```
 */
export function IsInteger(...items: unknown[]): boolean {
    return items.every(
        $ => typeof $ === 'number' && IsNum($) && Number.isInteger($.blur())
    )
}

/**
 * check is a decimal (non-integer).
 * ```
 * IsDecimal(0.5) // true
 * IsDecimal(5) // false
 * ```
 */
export function IsDecimal(...items: unknown[]): boolean {
    return items.every($ => IsNum($) && !IsInteger($))
}

/**
 * check is a terminating decimal (or integer)
 * ```
 * IsTerminating(1/4) // true
 * IsTerminating(5) // false
 * ```
 */
export function IsTerminating(...items: unknown[]): boolean {
    return items.every(
        $ => typeof $ === 'number' && IsNum($) && cal.sigfig($) < 10
    )
}

/**
 * check is a rational number with denominator <= 1000.
 * ```
 * IsRational(0.5) // true
 * IsRational(-5) // true
 * IsRational(Math.sqrt(2)) // false
 * ```
 */
export function IsRational(...items: unknown[]): boolean {
    return items.every(
        $ => typeof $ === 'number' && IsNum($) && Number.isRational($)
    )
}

/**
 * check is an odd integer.
 * ```
 * IsOdd(5) // true
 * IsOdd(-5) // true
 * IsOdd(4) // false
 * ```
 */
export function IsOdd(...items: unknown[]): boolean {
    return items.every(
        $ =>
            typeof $ === 'number' &&
            IsInteger($) &&
            Math.abs(cal.blur($)) % 2 === 1
    )
}

/**
 * check is an even integer.
 * ```
 * IsEven(4) // true
 * IsEven(-4) // true
 * IsEven(0) // true
 * IsEven(5) // false
 * ```
 */
export function IsEven(...items: unknown[]): boolean {
    return items.every(
        $ =>
            typeof $ === 'number' &&
            IsInteger($) &&
            Math.abs(cal.blur($)) % 2 === 0
    )
}

/**
 * check is in range [0,1].
 * ```
 * IsProbability(0) // true
 * IsProbability(0.5467) // true
 * IsProbability(1.1) // false
 * IsProbability(-0.1) // false
 * ```
 */
export function IsProbability(...items: unknown[]): boolean {
    return items.every(
        $ => typeof $ === 'number' && IsNum($) && $ >= 0 && $ <= 1
    )
}

/**
 * check is a square number.
 * ```
 * IsSquareNum(9) // true
 * IsSquareNum(10) // false
 * IsSquareNum(-9) // false
 * ```
 */
export function IsSquareNum(...items: unknown[]): boolean {
    return items.every(
        $ => typeof $ === 'number' && IsInteger($) && IsInteger(Math.sqrt($))
    )
}

/**
 * check is positive.
 * ```
 * IsPositive(2) // true
 * IsPositive(0) // false
 * IsPositive(-2) // false
 * ```
 */
export function IsPositive(...items: unknown[]): boolean {
    return items.every($ => typeof $ === 'number' && IsNum($) && $ > 0)
}

/**
 * check is non-negative.
 * ```
 * IsNonNegative(2) // true
 * IsNonNegative(0) // true
 * IsNonNegative(-2) // false
 * IsNonNegative(1.5) // true
 * ```
 */
export function IsNonNegative(...items: unknown[]): boolean {
    return items.every($ => typeof $ === 'number' && IsNum($) && $ >= 0)
}

/**
 * check is a positive integer.
 * ```
 * IsPositiveInteger(2) // true
 * IsPositiveInteger(0) // false
 * IsPositiveInteger(-2) // false
 * IsPositiveInteger(1.5) // false
 * ```
 */
export function IsPositiveInteger(...items: unknown[]): boolean {
    return items.every($ => typeof $ === 'number' && IsInteger($) && $ > 0)
}

/**
 * check is a non-negative integer.
 * ```
 * IsNonNegativeInteger(2) // true
 * IsNonNegativeInteger(0) // true
 * IsNonNegativeInteger(-2) // false
 * IsNonNegativeInteger(1.5) // false
 * ```
 */
export function IsNonNegativeInteger(...items: unknown[]): boolean {
    return items.every($ => typeof $ === 'number' && IsInteger($) && $ >= 0)
}

/**
 * check is negative.
 * ```
 * IsNegative(-2) // true
 * IsNegative(0) // false
 * IsNegative(2) // false
 * ```
 */
export function IsNegative(...items: unknown[]): boolean {
    return items.every($ => typeof $ === 'number' && IsNum($) && $ < 0)
}

/**
 * check is non-zero finite number.
 * ```
 * IsNonZero(2) // true
 * IsNonZero(0) // false
 * IsNonZero(-2) // true
 * ```
 */
export function IsNonZero(...items: unknown[]): boolean {
    return items.every(
        $ => typeof $ === 'number' && IsNum($) && Math.abs($) >= 1e-14
    )
}

/**
 * check is between min and max inclusive.
 * ```
 * IsBetween(2,5)(3) // true
 * IsBetween(2,5)(2) // true
 * IsBetween(2,5)(1) // false
 * ```
 */
export function IsBetween(min: number, max: number) {
    return (...items: unknown[]): boolean =>
        items.every(
            $ => typeof $ === 'number' && IsNum($) && $ >= min && $ <= max
        )
}

/**
 * check if its abs is between min and max inclusive.
 * ```
 * IsAbsBetween(2,5)(-3) // true
 * IsAbsBetween(2,5)(-2) // true
 * IsAbsBetween(2,5)(1) // false
 * ```
 */
export function IsAbsBetween(min: number, max: number) {
    return (...items: unknown[]): boolean =>
        items.every(
            $ => typeof $ === 'number' && IsBetween(min, max)(Math.abs($))
        )
}

/**
 * Check if the points are chessboard around anchor.
 * ```
 * IsAroundPoint([0,0],2)([2,2]) // true
 * IsAroundPoint([0,0],2)([3,0]) // false
 * ```
 */
export function IsAroundPoint(anchor: Point2D, range: number) {
    return (...points: Point2D[]): boolean =>
        points.every(p => ChessboardDistance(anchor, p) <= range)
}

/**
 * Check if the array of legnths can form a triangle
 * ```
 * IsTriangle([1,1,1]) // true
 * IsTriangle([6,7,8]) // true
 * IsTriangle([1,2,3]) // false
 * IsTriangle([6,14,8]) // false
 * ```
 */
export function IsTriangle(...triangles: [number, number, number][]): boolean {
    return triangles.every(
        ([a, b, c]) =>
            a > 0 && b > 0 && c > 0 && a + b > c && b + c > a && c + a > b
    )
}
