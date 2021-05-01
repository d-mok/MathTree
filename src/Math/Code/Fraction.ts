
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
function FracSign(p: number, q: number): Fraction {
    Should(IsNum(p, q), 'input must be num');
    Should(IsNonZero(q), 'q should not be zero');
    [p, q] = Blurs([p, q])
    const s = Sign(p / q)
    p = Abs(p)
    q = Abs(q)
    return [s * p + 0, q]
}
globalThis.FracSign = FracSign

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
function Frac(p: number, q: number): Fraction {
    Should(IsNum(p, q), 'input must be num');
    Should(IsNonZero(q), 'q should not be zero');
    [p, q] = Blurs([p, q]);
    [p, q] = SimpRatio(p, q)
    return FracSign(p, q)
}
globalThis.Frac = Frac



/**
 * @category Fraction
 * @return convert num to fraction
 * ```
 * ToFrac(0.5) // [1,2]
 * ToFrac(-456/123) // [-152,41]
 * ```
 */
function ToFrac(num: number, maxDenominator = 1000): Fraction {
    return ant.nearFrac(num,maxDenominator)
}
globalThis.ToFrac = contract(ToFrac).sign([owl.rational, owl.positiveInt])
