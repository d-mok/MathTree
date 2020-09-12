var Chance = require('chance');
var chance = new Chance();


/**
 * Return a random integer in [min, max] inclusive.
 * @category Random
 * @param {number} min - The min integer.
 * @param {number} max - The max integer.
 * @return {number} A random integer in [min, max].
 * @example
 * RndN(2,5) // may return 2, 3, 4 or 5
 */
function RndN(min: number, max: number): number {
    return chance.integer({ min, max });
}
globalThis.RndN = RndN




/**
 * Return a random real number in [min, max] inclusive.
 * @category Random
 * @param {number} min - The min real number.
 * @param {number} max - The max real number.
 * @return {number} A random real number in [min, max].
 * @example
 * RndR(1,2) // may return 1.242574363
 */
function RndR(min: number, max: number): number {
    return chance.floating({ min, max, fixed: 8 });
}
globalThis.RndR = RndR



/**
 * Return 1 or -1.
 * @category Random
 * @return {number} 1 or -1.
 * @example
 * RndU() // may return 1 or -1
 */
function RndU(): number {
    return chance.pickone([-1, 1]);
}
globalThis.RndU = RndU




/**
 * Return a random integer in [min, max] or [-max, -min] inclusive.
 * @category Random
 * @param {number} min - The min integer.
 * @param {number} max - The max integer.
 * @return {number} A random integer in [min, max] or [-max, -min].
 * @example
 * RndZ(2,4) // return -4, -3, -2, 2, 3 or 4
 */
function RndZ(min: number, max: number): number {
    return RndN(min, max) * RndU();
}
globalThis.RndZ = RndZ



/**
 * Return a random prime number less than or equal to max.
 * @category Random
 * @param {number} max - The max allowed prime.
 * @return {number} A random prime.
 * @example
 * RndP(10) // may return 2, 3, 5 or 7
 */
function RndP(max: number): number {
    return chance.prime({ min: 2, max: max });
}
globalThis.RndP = RndP





/**
 * Return a random odd integer in [min, max] inclusive.
 * @category Random
 * @param {number} min - The min integer.
 * @param {number} max - The max integer.
 * @return {number} A random odd integer in [min, max].
 * @example
 * RndOdd(3,8) // return 3, 5 or 7
 */
function RndOdd(min: number, max: number): number {
    min = Math.ceil((min + 1) / 2);
    max = Math.floor((max + 1) / 2);
    return 2 * RndN(min, max) - 1;
}
globalThis.RndOdd = RndOdd



/**
 * Return a random even integer in [min, max] inclusive.
 * @category Random
 * @param {number} min - The min integer.
 * @param {number} max - The max integer.
 * @return {number} A random even integer in [min, max].
 * @example 
 * RndEven(3,8) // return 4, 6 or 8
 */
function RndEven(min: number, max: number): number {
    min = Math.ceil(min / 2);
    max = Math.floor(max / 2);
    return 2 * RndN(min, max);
}
globalThis.RndEven = RndEven



/**
 * Return an array of polynomial coefficients.
 * @category Random
 * @param {...number} coeff - Max value of corresponding coefficients.
 * @return {number[]} An array of integers.
 * @example
 * RndPoly(2,3,4) // equivalent to [RndN(1,2), RndZ(1,3), RndZ(1,4)] 
 */
function RndPoly(...coeff: number[]): number[] {
    return coeff.map((x, i, a) => {
        return i === 0 ? RndN(1, x) : RndZ(1, x);
    });
}
globalThis.RndPoly = RndPoly



/**
 * Return an unique array of nearby values.
 * @category Random
 * @param {number} anchor - The central value.
 * @param {number} range - Allowed deviation from anchor.
 * @param {integer} [n=-1] - The number of distinct values to return. Default to 2*range for integral anchor; and 10 otherwise.
 * @return {number[]} An array of numbers.
 * @example
 * RndShake(10,5,3) // equivalent to [10+RndZ(1,5), 10+RndZ(1,5), 10+RndZ(1,5)] 
 * RndShake(10.5,5,2) // equivalent to [10.5+RndR(0,5)*RndU(), 10.5+RndR(0,5)*RndU()] 
 */
function RndShake(anchor: number, range: number, n = -1): number[] {
    if (IsInteger(anchor)) {
        if (n === -1) n = 2 * range;
        return chance.unique(() => anchor + RndZ(1, range), n);
    } else {
        if (n === -1) n = 10;
        return chance.unique(() => anchor + (RndR(0, range) * RndU()), n);
    }
}
globalThis.RndShake = RndShake





/**
 * Return an array of a Pyth Triple.
 * @category Random
 * @param {number} max - The max length allowed.
 * @return {number[]} An array of Pyth Triple (3 numbers).
 * @example
 * RndPyth(10) // may return [3,4,5]
 */
function RndPyth(max = 100): number[] {
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


