/**
 * @category Fraction
 * @return normalize the sign of a fraction p/q
 * ```typescript
 * FracSign(2,3) // [2,3]
 * FracSign(-2,3) // [-2,3]
 * FracSign(2,-3) // [-2,3]
 * FracSign(-2,-3) // [2,3]
 * FracSign(0,-2) // [0,2]
 * FracSign(-2,0) // [-2,0]
 * ```
 */
declare function FracSign(p: number, q: number): Fraction;
/**
 * @category Fraction
 * @return simplified fraction p/q
 * ```typescript
 * Frac(6,4) // [3,2]
 * Frac(-4,2) // [-2,1]
 * Frac(18,-12) // [-3,2]
 * Frac(-10,-20) // [1,2]
 * Frac(0,2) // [0,2]
 * Frac(1.5,-2) // [-1.5,2]
 * ```
 */
declare function Frac(p: number, q: number): Fraction;
/**
 * @category Fraction
 * @return add fractions
 * ```typescript
 * FracAdd([1,2],[1,3]) // [5,6]
 * FracAdd([1,2],[-1,3]) // [1,6]
 * FracAdd([2,3],[3,4],[4,5]) // [133,60]
 * FracAdd([2,3],[4,3]) // [2,1]
 * ```
 */
declare function FracAdd(...fractions: Fraction[]): Fraction;
/**
 * @category Fraction
 * @return add fractions
 * ```typescript
 * FracMultiply([1,2],[1,3]) // [1,6]
 * FracMultiply([1,2],[-1,3]) // [-1,6]
 * FracMultiply([2,3],[3,4],[4,5]) // [2,5]
 * FracMultiply([2,3],[4,3]) // [8,9]
 * FracMultiply([0,3],[4,3]) // [0,9]
 * ```
 */
declare function FracMultiply(...fractions: Fraction[]): Fraction;
/**
 * @category Fraction
 * @return convert num to fraction
 * ```typescript
 * ToFrac(0.5) // [1,2]
 * ToFrac(-456/123) // [-152,41]
 * ```
 */
declare function ToFrac(num: number, maxDenominator?: number): Fraction;
