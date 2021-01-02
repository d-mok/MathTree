

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
function RndShake(anchor: any, range?: number, n?: number): (typeof anchor)[] {
    if (typeof anchor === 'string') {
        // Fraction
        if (IsDfrac(anchor)) {
            return RndShakeDfrac(anchor, range, n)
        }
        // Inequal Sign
        if (IsIneqSign(anchor)) {
            return RndShakeIneq(anchor, n)
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
            return RndShakeN(anchor, range, n)
        }
        // Probability
        if (anchor > 0.01 && anchor <= 1) {
            return RndShakeProb(anchor, range, n)
        }
        // Decimal
        if (IsNum(anchor)) {
            return RndShakeR(anchor, range, n)
        }
        if (isNaN(anchor)) {
            return []
        }
    }
    // console.error('Fail to RndShake: ' + anchor)
    if (anchor === undefined) return []
    Should(false, 'Fail to RndShake: ' + anchor)
    return []
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
        throw 'No items can pass through Sieve after ' + n + ' trials!'
    }
    return lambda
}
globalThis.Sieve = Sieve

/**
 * @category RandomShake
 * @param anchor - must be integer
 * @param range - default Max(5, anchor * 10%)
 * @param n - default to 10
 * @return nearby same-signed integers
 * ```typescript
 * RndShakeN(5,2,3) 
 * // return 3 unique integers from [3,4,6,7], e.g. [3,7,6]
 * RndShakeN(2,4,3) 
 * // return 3 unique integers from [1,3,4,5,6]
 * RndShakeN(-2,4,3) 
 * // return 3 unique integers from [-1,-3,-4,-5,-6]
 * RndShakeN(0,5,3) 
 * // return 3 unique integers from [1,2,3,4,5]
 * ```
 */
function RndShakeN(anchor: number, range?: number, n?: number): number[] {
    anchor = Blur(anchor)
    range ??= Max(5, Abs(anchor * 0.1))
    if (anchor === 0) {
        n ??= Min(range, 10)
        return chance.unique(() => RndN(1, range!), n);
    }
    if (!IsInteger(anchor)) return []
    let a = Abs(anchor)
    let max = Min(a + range, 10 ** (Magnitude(anchor) + 1) - 1)
    let min = Max(a - range, 1, 10 ** (Magnitude(anchor)))
    n ??= Min(10, max - min)
    let func = Sieve(() => RndN(min, max),
        x => (x !== a) && (Magnitude(x) === Magnitude(anchor))
    )
    let arr = chance.unique(func, n)
    let s = Sign(anchor)
    arr = arr.map((x: number) => s * x)
    return arr
}
globalThis.RndShakeN = RndShakeN


/**
 * @category RandomShake
 * @param anchor - must be integer
 * @param range - default Max(5, anchor * 10%)
 * @param n - default to 10
 * @return nearby integers
 * ```typescript
 * RndShakeZ(5,2,3) 
 * // return 3 unique integers from [3,4,6,7]
 * RndShakeZ(2,4,3) 
 * // return 3 unique integers from [-2,-1,0,1,3,4,5,6]
 * RndShakeZ(-2,4,3) 
 * // return 3 unique integers from [2,1,0,-1,-3,-4,-5,-6]
 * RndShakeZ(0,2,3) 
 * // return 3 unique integers from [-2,-1,1,2]
 * ```
 */
function RndShakeZ(anchor: number, range?: number, n?: number): number[] {
    anchor = Blur(anchor)
    range ??= Max(5, Abs(anchor * 0.1))
    if (!IsInteger(anchor)) return []
    n ??= Min(2 * range, 10)
    return chance.unique(() => anchor + RndZ(1, range!), n);
}
globalThis.RndShakeZ = RndShakeZ





/**
 * @category RandomShake
 * @param anchor - can be any real number
 * @param range - default Max(1, anchor * 10%)
 * @param n - default to 5
 * @return nearby same-signed real number with same precision
 * ```typescript
 * RndShakeR(3.5,2,3) 
 * // return 3 unique values from [1.5,5.5]
 * RndShakeR(1.5,2,3) 
 * // return 3 unique values from [0,3.5]
 * RndShakeR(-1.5,4,3) 
 * // return 3 unique values from [-5.5,0]
 * RndShakeR(0,2) 
 * // return 10 unique values from [0,2]
 * ```
 */
function RndShakeR(anchor: number, range?: number, n?: number): number[] {
    range ??= Abs(anchor * 0.5)
    n ??= 5
    let dp = Max(DecimalPlace(anchor), 1)
    if (SigFig(anchor) === 1) dp++
    let func = Sieve(
        () => Fix(anchor + RndR(0, range!) * RndU(), dp),
        x => (x * (anchor + Number.EPSILON) >= Number.EPSILON) &&
            (Magnitude(x) === Magnitude(anchor))
    )
    return chance.unique(func, n)

}
globalThis.RndShakeR = RndShakeR




/**
 * @category RandomShake
 * @param anchor - must be a probability
 * @param range - default to 0.5
 * @param n - default to 3
 * @return nearby probability with same precision
 * ```typescript
 * RndShakeProb(0.8,0.1,3) 
 * // return 3 unique values from [0.7,0.9]
 * RndShakeProb(0.8,0.5,3) 
 * // return 3 unique values from [0.3,1]
 * RndShakeProb(0.3,0.6,3) 
 * // return 3 unique values from [0,0.9]
 * RndShakeProb(1.1,2) 
 * // return [] anchor must be a probability 0<=P<=1
 * ```
 */
function RndShakeProb(anchor: number, range?: number, n?: number): number[] {
    if (anchor < 0 || anchor > 1) return []
    range ??= 0.5
    n ??= 3
    const dp = Max(DecimalPlace(anchor), 1)
    let func = Sieve(
        () => Fix(anchor + RndR(0, range!) * RndU(), dp),
        x => x > 0 && x < 1
    )
    return chance.unique(func, n)
}
globalThis.RndShakeProb = RndShakeProb

/**
 * @category RandomShake
 * @param anchor - must be a fraction
 * @param range - default to 5
 * @param n - default to 10
 * @return nearby same-sign fraction by shaking the numerator and denominator (simplest) within range, preserve IsProbability.
 * ```typescript
 * RndShakeFrac([5,6],3,3) 
 * // return 3 unique fractions around [5,6] within range 3
 * RndShakeFrac([6,-5],10,3)
 * // return 3 unique fractions around [6,-5] within range 10
 * ```
 */
function RndShakeFrac(anchor: Fraction, range?: number, n?: number): Fraction[] {
    let [p, q] = Frac(...anchor);
    [p, q] = Blurs([p, q])
    if (!IsInteger(p, q)) return []
    range ??= 5
    n ??= Min(10, range)
    let func = Sieve(
        () => {
            const h = RndShakeN(p, range, 1)[0]
            const k = RndShakeN(q, range, 1)[0]
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
    return chance.unique(func, n, {
        comparator: function (arr: Fraction[], val: Fraction) {
            return arr.some(x => x[0] / x[1] === val[0] / val[1])
        }
    })
}
globalThis.RndShakeFrac = RndShakeFrac


/**
 * @category RandomShake
 * @param anchor - must be a string of Dfrac
 * @param range - default to 5
 * @param n - default to 10
 * @return nearby same-signed Dfrac by shaking the numerator and denominator (simplest) within range, preserve IsProbability.
 * ```typescript
 * RndShakeDfrac('\\dfrac{5}{6}',3,3) 
 * // return 3 unique Dfrac around [5,6] within range 3
 * RndShakeDfrac('-\\dfrac{6}{5}',10,3)
 * // return 3 unique Dfrac around [6,-5] within range 10
 * ```
 */
function RndShakeDfrac(anchor: string, range?: number, n?: number): string[] {
    if (typeof anchor !== 'string') return []
    let f = ParseDfrac(anchor)
    if (!f) return []
    range ??= 5
    n ??= Min(10, range)
    return RndShakeFrac(f, range, n).map(x => Dfrac(...x))
}
globalThis.RndShakeDfrac = RndShakeDfrac




/**
 * @category RandomShake
 * @param anchor - must be a string of ineq sign
 * @param n - default to 3
 * @return an array of n ineq signs, balanced in number.
 * ```typescript
 * RndShakeIneq('\\ge',6) 
 * // may return ['\\ge','\\le','\\ge','\\le','\\le','\\ge']
 * RndShakeIneq('\\ge',5) 
 * // may return ['\\ge','\\le','\\le','\\le','\\ge']
 * ```
 */
function RndShakeIneq(anchor: string, n?: number) {
    if (typeof anchor !== 'string') return []
    let f = ParseIneqSign(anchor)
    if (!f) return []
    n ??= 3
    return RndBalanced(IneqSign(...f).reverse(), n)
}
globalThis.RndShakeIneq = RndShakeIneq

