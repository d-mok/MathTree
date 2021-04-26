
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
 * @return add fractions
 * ```typescript
 * FracAdd([1,2],[1,3]) // [5,6]
 * FracAdd([1,2],[-1,3]) // [1,6]
 * FracAdd([2,3],[3,4],[4,5]) // [133,60]
 * FracAdd([2,3],[4,3]) // [2,1]
 * ```
 */
function FracAdd(...fractions: Fraction[]): Fraction {
    Should(IsFraction(...fractions), 'input must be fractions')
    function _FracAdd(A: Fraction, B: Fraction): Fraction {
        let [p1, q1] = A
        let [p2, q2] = B
        let [p, q] = [p1 * q2 + p2 * q1, q1 * q2]
        return Frac(p, q)
    }
    return fractions.reduce((a, v) => _FracAdd(a, v));
}
globalThis.FracAdd = FracAdd




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
function FracMultiply(...fractions: Fraction[]): Fraction {
    Should(IsFraction(...fractions), 'input must be fractions')
    function _FracMultiply(A: Fraction, B: Fraction): Fraction {
        let [p1, q1] = A
        let [p2, q2] = B
        let [p, q] = [p1 * p2, q1 * q2]
        return Frac(p, q)
    }
    return fractions.reduce((a, v) => _FracMultiply(a, v));
}
globalThis.FracMultiply = FracMultiply





/**
 * @category Fraction
 * @return convert num to fraction
 * ```typescript
 * ToFrac(0.5) // [1,2]
 * ToFrac(-456/123) // [-152,41]
 * ```
 */
function ToFrac(num: number, maxDenominator = 1000): Fraction {
    Should(IsNum(num), 'input must be num')
    let sign = Sign(num)
    num = Abs(num)
    let integer = Math.floor(num)
    let decimal = num - integer
    for (let q = 1; q <= maxDenominator; q++) {
        let p = decimal * q
        if (IsInteger(p)) return [(integer * q + Blur(p)) * sign, q]
    }
    Should(false, 'cannot find fraction form: ' + num)
    throw ''
}
globalThis.ToFrac = ToFrac
