/**
 * @category Fraction
 * @return convert num to fraction
 * ```
 * ToFrac(0.5) // [1,2]
 * ToFrac(-456/123) // [-152,41]
 * ```
 */
declare function ToFrac(num: number, maxDenominator?: number): Fraction;
