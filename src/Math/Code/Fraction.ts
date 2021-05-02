


/**
 * @category Fraction
 * @return convert num to fraction
 * ```
 * ToFrac(0.5) // [1,2]
 * ToFrac(-456/123) // [-152,41]
 * ```
 */
function ToFrac(num: number, maxDenominator = 1000): Fraction {
    return ant.nearFrac(num, maxDenominator)
}
globalThis.ToFrac = contract(ToFrac).sign([owl.rational, owl.positiveInt])
