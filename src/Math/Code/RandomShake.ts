

/**
 * @category Random
 * @param n - default to 10
 * @return an unique array of n nearby values, around anchor, within range inclusive.
 * ```typescript
 * RndShake(10,5,3) 
 * // equivalent to [10+RndZ(1,5), 10+RndZ(1,5), 10+RndZ(1,5)] 
 * RndShake(10.5,5,2) 
 * // equivalent to [10.5+RndR(0,5)*RndU(), 10.5+RndR(0,5)*RndU()] 
 * ```
 */
function RndShake(anchor: number, range: number, n?: number): number[] {
    if (IsInteger(anchor)) {
        n ??= 2 * range;
        return chance.unique(() => anchor + RndZ(1, range), n);
    } else {
        n ??= 10;
        return chance.unique(() => anchor + (RndR(0, range) * RndU()), n);
    }
}
globalThis.RndShake = RndShake







/**
 * @category Random
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
 * @category Random
 * @param anchor - must be integer
 * @param n - default to 10
 * @return an unique array of n nearby same-sign integers around anchor, within range inclusive.
 * ```typescript
 * RndShakeN(5,2,3) 
 * // return 3 unique integers from [3,4,6,7]
 * RndShakeN(2,4,3) 
 * // return 3 unique integers from [1,3,4,5,6]
 * RndShakeN(-2,4,3) 
 * // return 3 unique integers from [-1,-3,-4,-5,-6]
 * RndShakeN(0,5,3) 
 * // return 3 unique integers from [1,2,3,4,5]
 * ```
 */
function RndShakeN(anchor: number, range: number, n?: number): number[] {
    if (anchor === 0) {
        n ??= range
        return chance.unique(() => RndN(1, range), n);
    }
    if (!IsInteger(anchor)) return []
    // if (anchor === 0) return []
    let a = Abs(anchor)
    let max = a + range
    let min = Max(a - range, 1)
    n ??= Min(10, max - min)
    let func = Sieve(() => RndN(min, max), x => x !== a)
    let arr = chance.unique(func, n)
    let s = Sign(anchor)
    arr = arr.map((x: number) => s * x)
    return arr
}
globalThis.RndShakeN = RndShakeN


/**
 * @category Random
 * @param anchor - must be integer
 * @param n - default to 10
 * @return an unique array of n nearby integers around anchor, within range inclusive.
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
function RndShakeZ(anchor: number, range: number, n?: number): number[] {
    if (!IsInteger(anchor)) return []
    n ??= Min(10, 2 * range)
    return chance.unique(() => anchor + RndZ(1, range), n);
}
globalThis.RndShakeZ = RndShakeZ





/**
 * @category Random
 * @param anchor - can be any real number
 * @param n - default to 10
 * @return an unique array of n nearby same-sign real number around anchor, within range inclusive.
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
function RndShakeR(anchor: number, range: number, n?: number): number[] {
    n ??= 10
    let func = Sieve(
        () => anchor + RndR(0, range) * RndU(),
        x => x * (anchor + Number.EPSILON) >= Number.EPSILON
    )
    return chance.unique(func, n)
}
globalThis.RndShakeR = RndShakeR




/**
 * @category Random
 * @param anchor - must be a probability
 * @param n - default to 10
 * @return an unique array of n nearby probability around anchor, within range inclusive.
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
function RndShakeProb(anchor: number, range: number, n?: number): number[] {
    if (anchor < 0 || anchor > 1) return []
    n ??= 10
    let func = Sieve(
        () => anchor + RndR(0, range) * RndU(),
        x => x > 0 && x < 1
    )
    return chance.unique(func, n)
}
globalThis.RndShakeProb = RndShakeProb


function RndShakeFrac(anchor: Fraction, range: number, n?: number): Fraction[] {
    const [p, q] = Frac(...anchor)
    if (!IsInteger(p, q)) return []
    const s = p / q
    n ??= 10
    let func = () => [RndShakeN(p, range, 1)[0], RndShakeN(q, range, 1)[0]]
    return chance.unique(func, n, {
        comparator: function (arr: Fraction[], val: Fraction) {
            return arr.some(x => x[0] / x[1] === val[0] / val[1])
        }
    })
}
globalThis.RndShakeProb = RndShakeProb


