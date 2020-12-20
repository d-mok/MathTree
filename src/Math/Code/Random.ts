/**
 * @ignore
 */
var Chance = require('chance');

/**
 * @ignore
 */
var chance = new Chance();


/**
 * @category Random
 * @return a random integer in [min, max] inclusive.
 * ```typescript
 * RndN(2,5) // may return 2, 3, 4 or 5
 * ```
 */
function RndN(min: number, max: number): number {
    return chance.integer({ min, max });
}
globalThis.RndN = RndN

/**
 * @category Random
 * @param n - default to 10
 * @return an array of n unique random integer in [min, max] inclusive.
 * ```typescript
 * RndNs(2,8,3) // may return [5,3,7]
 * ```
 */
function RndNs(min: number, max: number, n?: number): number[] {
    n ??= Math.min(Math.floor(max - min + 1), 10)
    // if (!n) n = Math.min(Math.floor(max - min + 1), 10)
    return chance.unique(() => RndN(min, max), n);
}
globalThis.RndNs = RndNs




/**
 * @category Random
 * @return a random real number in [min, max] inclusive
 * ```typescript
 * RndR(1,2) // may return 1.242574363
 * ```
 */
function RndR(min: number, max: number): number {
    return chance.floating({ min, max, fixed: 8 });
}
globalThis.RndR = RndR



/**
 * @category Random
 * @return 1 or -1
 * ```typescript
 * RndU() // may return 1 or -1
 * ```
 */
function RndU(): 1 | -1 {
    return chance.pickone([-1, 1]);
}
globalThis.RndU = RndU


/**
 * @category Random
 * @return true or false.
 * ```typescript
 * RndT() // may return true or false
 * ```
 */
function RndT(): boolean {
    return chance.pickone([true, false]);
}
globalThis.RndT = RndT




/**
 * @category Random
 * @return a random integer in [min, max] or [-max, -min] inclusive.
 * ```typescript
 * RndZ(2,4) // return -4, -3, -2, 2, 3 or 4
 * ```
 */
function RndZ(min: number, max: number): number {
    return RndN(min, max) * RndU();
}
globalThis.RndZ = RndZ




/**
 * @category Random
 * @param n - default to 10
 * @return an array of n absolutely unique random integers in [min, max] or [-max, -min] inclusive.
 * ```typescript
 * RndZs(2,8,3) // may return [5,-3,7]
 * ```
 */
function RndZs(min: number, max: number, n?: number): number[] {
    n ??= Min(Math.floor(max - min + 1), 10)
    let arr = chance.unique(() => RndN(min, max), n);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i] * RndU()
    }
    return arr
}
globalThis.RndZs = RndZs





/**
 * @category Random
 * @return a random prime number less than or equal to max.
 * ```typescript
 * RndP(10) // may return 2, 3, 5 or 7
 * ```
 */
function RndP(max: number): number {
    return chance.prime({ min: 2, max: max });
}
globalThis.RndP = RndP





/**
 * @category Random
 * @return a random odd integer in [min, max] inclusive
 * ```typescript
 * RndOdd(3,8) // return 3, 5 or 7
 * ```
 */
function RndOdd(min: number, max: number): number {
    min = Math.ceil((min + 1) / 2);
    max = Math.floor((max + 1) / 2);
    return 2 * RndN(min, max) - 1;
}
globalThis.RndOdd = RndOdd



/**
 * @category Random
 * @return a random even integer in [min, max] inclusive
 * ```typescript 
 * RndEven(3,8) // return 4, 6 or 8
 * ```
 */
function RndEven(min: number, max: number): number {
    min = Math.ceil(min / 2);
    max = Math.floor(max / 2);
    return 2 * RndN(min, max);
}
globalThis.RndEven = RndEven



/**
 * @category Random
 * @return an array of random polynomial coefficients
 * ```typescript
 * RndPoly(2,3,4) // equivalent to [RndN(1,2), RndZ(1,3), RndZ(1,4)] 
 * ```
 */
function RndPoly(...coeff: number[]): number[] {
    return coeff.map((x, i, a) => {
        return i === 0 ? RndN(1, x) : RndZ(1, x);
    });
}
globalThis.RndPoly = RndPoly








/**
 * @category Random
 * @return an array of a Pyth Triple
 * ```typescript
 * RndPyth(10) // may return [3,4,5]
 * ```
 */
function RndPyth(max = 100): [number, number, number] {
    let arr = [];
    for (let m = 1; m < 10; m++) {
        for (let n = 1; n < m; n++) {
            for (let k = 1; k < 10; k++) {
                let a = m * m - n * n;
                let b = 2 * m * n;
                let c = m * m + n * n;
                if (c <= max) arr.push([a, b, c]);
            }
        }
    }
    return chance.pickone(arr);
}
globalThis.RndPyth = RndPyth


/**
 * @category Random
 * @param min abs of intercept
 * @param max abs of intercept
 * @return a linear [a,b,c] in ax+by+c=0
 * ```typescript
 * RndLinear(1,5) // may return [2,-3,6]
 * ```
 */
function RndLinear(minInt: number, maxInt: number) {
    let xInt = RndZ(minInt, maxInt)
    let yInt = RndZ(minInt, maxInt)
    return LinearFromIntercepts(xInt, yInt)
}
globalThis.RndLinear = RndLinear


/**
 * @category Random
 * @return a point within given range
 * ```typescript
 * RndPoint([1,4],[10,14]) // may return [2,12]
 * // equivalent to [RndN(...xRange),Range(yRange)]
 * ```
 */
function RndPoint(xRange: [number, number], yRange: [number, number]): Point {
    let x = RndN(...xRange)
    let y = RndN(...yRange)
    return [x, y]
}
globalThis.RndPoint = RndPoint
