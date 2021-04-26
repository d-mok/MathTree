

/**
 * @category RandomShake
 * @param n - default to 10
 * @return an array of n nearby values around anchor, within range inclusive, auto detecting the input type.
 * ```typescript
 * RndShake(10,5,3) 
 * // equivalent to RndShakeN(10,5,3) 
 * RndShake(10.5,5,2) 
 * // equivalent to RndShakeR(10.5,5,2) 
 * RndShake(0.5,0.1,2) 
 * // equivalent to RndShakeProb(0.5,0.1,3) 
 * ```
 */
function RndShake(anchor: any): (typeof anchor)[] {
    if (typeof anchor === 'string') {
        // Fraction
        if (IsDfrac(anchor)) {
            return RndShakeDfrac(anchor)
        }
        // Inequal Sign
        if (IsIneqSign(anchor)) {
            return RndShakeIneq(anchor)
        }
        // else convert to number
        if (Number(anchor)) {
            anchor = Number(anchor)
        }
    }
    if (typeof anchor === 'number' && IsNum(anchor)) {
        anchor = Blur(anchor)
        // Integer
        if (IsInteger(anchor)) {
            return RndShakeN(anchor)
        }
        // Decimal      
        if (IsNum(anchor)) {
            return RndShakeR(anchor)
        }
        if (isNaN(anchor)) {
            return []
        }
    }
    if (anchor === undefined) return []
    throw MathError('Fail to RndShake: ' + anchor)
}
globalThis.RndShake = RndShake







/**
 * @category RandomShake
 * @param randomFunc - a function which generate a random item
 * @param predicate - a condition that the outcome item must satisfy
 * @param n - max number of trial.
 * @return a function which return a random item satisfying the predicate when called. If nothing pass the predicate after n trial, throw an error.
 * ```typescript
 * let func = Sieve(()=>RndN(1,10),x=>IsOdd(x))
 * func() // return an odd integer
 * ```
 */
function Sieve<T>(randomFunc: () => T, predicate: (x: T) => boolean, n = 1000): () => T {
    function lambda() {
        for (let i = 1; i <= n; i++) {
            let item = randomFunc()
            if (predicate(item)) return item
        }
        throw MathError('No items can pass through Sieve after ' + n + ' trials!')
    }
    return lambda
}
globalThis.Sieve = Sieve





/**
 * @category RandomShake
 * @return 3 nearby same-signed integers, range = Max(5, anchor * 10%)
 * ```typescript
 * RndShakeN(5) // return 3 unique integers from 1-10
 * ```
 */
function RndShakeN(anchor: number): [number, number, number] {
    Should(IsInteger(anchor), 'anchor must be integer')
    anchor = Blur(anchor)
    let a = Abs(anchor)
    let range = Max(3, a * 0.1)
    if (anchor === 0) {
        return chance.unique(() => RndN(1, 3), 3);
    }
    let max = Min(Floor(a + range), LogCeil(a) - 1)
    let min = Max(Ceil(a - range), 1, LogFloor(a))
    let func = Sieve(() => RndN(min, max), x => (x !== a))
    let arr = chance.unique(func, 3)
    let s = Sign(anchor)
    arr = arr.map((x: number) => s * x)
    return arr
}
globalThis.RndShakeN = RndShakeN





/**
 * @category RandomShake
 * @return 3 nearby same-signed real number with same precision, range = anchor * 50%
 * ```typescript
 * RndShakeR(3.5) // return 3 unique values from [1.8,5.2]
 * ```
 */
function RndShakeR(anchor: number): number[] {
    Should(IsNonZero(anchor), 'anchor must be non-zero')
    let [mant, exp] = anchor.toExponential().split('e').map(x => Number(x))
    mant = Blur(mant)
    let arr: number[]
    if (IsInteger(mant)) {
        arr = RndShakeN(mant)
    } else {
        let dp = DecimalPlace(mant)
        let func = Sieve(
            () => Fix(mant * (1 + RndR(0, 0.5) * RndU()), dp),
            x => (x * mant > 0) &&
                (Magnitude(x) === Magnitude(mant)) &&
                (x !== mant)
        )
        arr = chance.unique(func, 3)
    }
    return arr.map(x => Number(x + "e" + exp))
}
globalThis.RndShakeR = RndShakeR


/**
 * @category RandomShake
 * @return 3 nearby same-sign rational by shaking the numerator and denominator (simplest) within range, preserve IsProbability.
 * ```typescript
 * RndShakeQ(5/6) 
 * // return 3 unique fractions around [5,6]
 * RndShakeQ(6/-5)
 * // return 3 unique fractions around [6,-5]
 * ```
 */
function RndShakeQ(anchor: number): number[] {
    Should(IsRational(anchor), 'anchor must be rational')
    let f: Fraction = ToFrac(anchor)
    return RndShakeFrac(f).map((x: Fraction): number => x[0] / x[1])
}
globalThis.RndShakeQ = RndShakeQ



/**
 * @category RandomShake
 * @return 3 nearby same-sign fraction by shaking the numerator and denominator (simplest) within range, preserve IsProbability.
 * ```typescript
 * RndShakeFrac([5,6]) 
 * // return 3 unique fractions around [5,6]
 * RndShakeFrac([6,-5])
 * // return 3 unique fractions around [6,-5]
 * ```
 */
function RndShakeFrac(anchor: Fraction): Fraction[] {
    let [p, q] = Frac(...anchor);
    [p, q] = Blurs([p, q])
    Should(IsInteger(p, q), 'input should be integral fraction')
    let func = Sieve(
        () => {
            const h = RndShakeN(p)[0]
            const k = RndShakeN(q)[0]
            return RndPick([h, k], [h, k], [p, k], [h, q])
        },
        f => {
            let [a, b] = f
            if (!AreCoprime(a, b)) return false
            if (a === 0 || b === 0) return false
            if (b === 1) return false
            if (IsProbability(p / q) && !IsProbability(a / b)) return false
            return true
        })
    return chance.unique(func, 3, {
        comparator: function (arr: Fraction[], val: Fraction) {
            return arr.some(x => x[0] / x[1] === val[0] / val[1])
        }
    })
}
globalThis.RndShakeFrac = RndShakeFrac


/**
 * @category RandomShake
 * @return 3 nearby same-signed Dfrac by shaking the numerator and denominator (simplest) within range, preserve IsProbability.
 * ```typescript
 * RndShakeDfrac('\\dfrac{5}{6}') 
 * // return 3 unique Dfrac around [5,6]
 * RndShakeDfrac('-\\dfrac{6}{5}')
 * // return 3 unique Dfrac around [6,-5]
 * ```
 */
function RndShakeDfrac(anchor: string): string[] {
    Should(IsString(anchor), 'input must be string')
    let f = ParseDfrac(anchor)
    return RndShakeFrac(f).map(x => Dfrac(...x))
}
globalThis.RndShakeDfrac = RndShakeDfrac




/**
 * @category RandomShake
 * @param anchor - must be a string of ineq sign
 * @return an array of 3 ineq signs, balanced in number.
 * ```typescript
 * RndShakeIneq('\\ge') 
 * // may return ['\\ge','\\le','\\le']
 * ```
 */
function RndShakeIneq(anchor: string): string[] {
    Should(IsString(anchor), 'input must be string')
    let f = ParseIneqSign(anchor)
    return RndBalanced(IneqSign(...f).reverse(), 3)
}
globalThis.RndShakeIneq = RndShakeIneq

