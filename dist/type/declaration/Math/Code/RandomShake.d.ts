/**
 * @category RandomShake
 * @return an array of n nearby values around anchor, within range inclusive, auto detecting the input type.
 * ```
 * RndShake(10)
 * // equivalent to RndShakeN(10)
 * RndShake(10.5)
 * // equivalent to RndShakeR(10.5)
 * ```
 */
declare function RndShake(anchor: any): (typeof anchor)[];
/**
 * @category RandomShake
 * @return 3 nearby same-signed integers, range = Max(5, anchor * 10%)
 * ```
 * RndShakeN(5) // return 3 unique integers from 1-10
 * ```
 */
declare function RndShakeN(anchor: number): [number, number, number];
/**
 * @category RandomShake
 * @return 3 nearby same-signed real number with same precision, range = anchor * 50%
 * ```
 * RndShakeR(3.5) // return 3 unique values from [1.8,5.2]
 * ```
 */
declare function RndShakeR(anchor: number): number[];
/**
 * @category RandomShake
 * @return 3 nearby same-sign rational by shaking the numerator and denominator (simplest) within range, preserve IsProbability.
 * ```
 * RndShakeQ(5/6)
 * // return 3 unique fractions around [5,6]
 * RndShakeQ(6/-5)
 * // return 3 unique fractions around [6,-5]
 * ```
 */
declare function RndShakeQ(anchor: number): number[];
/**
 * @category RandomShake
 * @return 3 nearby same-sign fraction by shaking the numerator and denominator (simplest) within range, preserve IsProbability.
 * ```
 * RndShakeFrac([5,6])
 * // return 3 unique fractions around [5,6]
 * RndShakeFrac([6,-5])
 * // return 3 unique fractions around [6,-5]
 * ```
 */
declare function RndShakeFrac(anchor: Fraction): Fraction[];
/**
 * @category RandomShake
 * @return 3 nearby same-signed Dfrac by shaking the numerator and denominator (simplest) within range, preserve IsProbability.
 * ```
 * RndShakeDfrac('\\dfrac{5}{6}')
 * // return 3 unique Dfrac around [5,6]
 * RndShakeDfrac('-\\dfrac{6}{5}')
 * // return 3 unique Dfrac around [6,-5]
 * ```
 */
declare function RndShakeDfrac(anchor: string): string[];
/**
 * @category RandomShake
 * @param anchor - must be a string of ineq sign
 * @return an array of 3 ineq signs, balanced in number.
 * ```
 * RndShakeIneq('\\ge')
 * // may return ['\\ge','\\le','\\le']
 * ```
 */
declare function RndShakeIneq(anchor: Ineq): string[];
/**
 * @category RandomShake
 * @param anchor - must be a point
 * @return an array of 3 point
 * ```
 * RndShakePoint([3,4])
 * // may return [[2,5],[1,6],[4,2]]
 * ```
 */
declare function RndShakePoint(anchor: Point): Point[];
