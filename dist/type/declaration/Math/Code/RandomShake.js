"use strict";
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
function RndShake(anchor) {
    if (typeof anchor === 'string') {
        // Fraction
        if (owl.dfrac(anchor)) {
            return RndShakeDfrac(anchor);
        }
        // Inequal Sign
        if (owl.ineq(anchor)) {
            return RndShakeIneq(anchor);
        }
        // else convert to number
        if (Number(anchor)) {
            anchor = Number(anchor);
        }
    }
    if (owl.point(anchor)) {
        // Point
        return RndShakePoint(anchor);
    }
    if (typeof anchor === 'number' && owl.num(anchor)) {
        anchor = ant.blur(anchor);
        // Integer
        if (owl.int(anchor)) {
            return RndShakeN(anchor);
        }
        // Decimal      
        if (owl.num(anchor)) {
            return RndShakeR(anchor);
        }
        if (isNaN(anchor)) {
            return [];
        }
    }
    if (anchor === undefined)
        return [];
    throw MathError('Fail to RndShake: ' + anchor);
}
globalThis.RndShake = RndShake;
/**
 * @category RandomShake
 * @return 3 nearby same-signed integers, range = Max(5, anchor * 10%)
 * ```
 * RndShakeN(5) // return 3 unique integers from 1-10
 * ```
 */
function RndShakeN(anchor) {
    function N() {
        anchor = ant.blur(anchor);
        if (anchor === 0)
            return RndN(1, 3);
        let a = Abs(anchor);
        let range = Max(3, a * 0.1);
        let max = Min(Floor(a + range), ant.logCeil(a) - 1);
        let min = Max(Ceil(a - range), 1, ant.logFloor(a));
        return dice.roll(() => RndN(min, max)).brute(x => x !== a) * Sign(anchor);
    }
    return dice.roll(N).unique(3);
}
globalThis.RndShakeN = contract(RndShakeN).sign([owl.int]);
/**
 * @category RandomShake
 * @return 3 nearby same-signed real number with same precision, range = anchor * 50%
 * ```
 * RndShakeR(3.5) // return 3 unique values from [1.8,5.2]
 * ```
 */
function RndShakeR(anchor) {
    let exp = ant.e(anchor);
    let m = ant.blur(ant.mantissa(anchor));
    if (IsInteger(m))
        return RndShakeN(m).map(x => Number(x + "e" + exp));
    let dp = ant.dp(m);
    let func = dice
        .roll(() => Fix(m * (1 + RndR(0, 0.5) * RndU()), dp))
        .shield(x => (x * m > 0) &&
        (ant.e(x) === ant.e(m)) &&
        (x !== m));
    return dice.roll(func).unique(3).map(x => Number(x + "e" + exp));
}
globalThis.RndShakeR = contract(RndShakeR).sign([owl.nonZero]);
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
function RndShakeQ(anchor) {
    let f = ToFrac(anchor);
    return RndShakeFrac(f).map((x) => x[0] / x[1]);
}
globalThis.RndShakeQ = contract(RndShakeR).sign([owl.rational]);
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
function RndShakeFrac(anchor) {
    let [p, q] = ant.simpFrac(...anchor);
    [p, q] = [p, q].map(ant.blur);
    Should(IsInteger(p, q), 'input should be integral fraction');
    let func = dice
        .roll(() => {
        const h = RndShakeN(p)[0];
        const k = RndShakeN(q)[0];
        return RndPick([h, k], [h, k], [p, k], [h, q]);
    })
        .shield(f => {
        let [a, b] = f;
        if (!AreCoprime(a, b))
            return false;
        if (a === 0 || b === 0)
            return false;
        if (b === 1)
            return false;
        if (IsProbability(p / q) && !IsProbability(a / b))
            return false;
        return true;
    });
    return dice.roll(func).unique(3, _ => _[0] / _[1]);
}
globalThis.RndShakeFrac = contract(RndShakeFrac).sign([owl.fraction]);
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
function RndShakeDfrac(anchor) {
    let f = ink.parseDfrac(anchor);
    return RndShakeFrac(f).map(x => Dfrac(...x));
}
globalThis.RndShakeDfrac = contract(RndShakeDfrac).sign([owl.dfrac]);
/**
 * @category RandomShake
 * @param anchor - must be a string of ineq sign
 * @return an array of 3 ineq signs, balanced in number.
 * ```
 * RndShakeIneq('\\ge')
 * // may return ['\\ge','\\le','\\le']
 * ```
 */
function RndShakeIneq(anchor) {
    let f = ink.parseIneq(anchor);
    return dice.array(IneqSign(...f).reverse()).balanced(3);
}
globalThis.RndShakeIneq = contract(RndShakeIneq).sign([owl.ineq]);
/**
 * @category RandomShake
 * @param anchor - must be a point
 * @return an array of 3 point
 * ```
 * RndShakePoint([3,4])
 * // may return [[2,5],[1,6],[4,2]]
 * ```
 */
function RndShakePoint(anchor) {
    let [x, y] = anchor;
    let func = () => {
        const h = IsInteger(x) ? RndShakeN(x)[0] : RndShakeR(x)[0];
        const k = IsInteger(y) ? RndShakeN(y)[0] : RndShakeR(y)[0];
        return [h, k];
    };
    return dice.roll(func).unique(3);
}
globalThis.RndShakePoint = contract(RndShakePoint).sign([owl.point]);