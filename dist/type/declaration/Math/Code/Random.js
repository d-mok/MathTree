"use strict";
/**
 * @category Random
 * @return a random integer in [min, max] inclusive.
 * ```
 * RndN(2,5) // may return 2, 3, 4 or 5
 * ```
 */
function RndN(min, max) {
    return dice.integer(min, max);
}
globalThis.RndN = contract(RndN).sign([owl.num]);
/**
 * @category Random
 * @return an array of n unique random integer in [min, max] inclusive.
 * ```
 * RndNs(2,8,3) // may return [5,3,7]
 * ```
 */
function RndNs(min, max, n = 10) {
    n = Math.min(Math.floor(max - min + 1), n);
    return dice.roll(() => RndN(min, max)).unique(n);
}
globalThis.RndNs = contract(RndNs).sign([owl.num, owl.num, owl.positiveInt]);
/**
 * @category Random
 * @return a random real number in [min, max] inclusive
 * ```
 * RndR(1,2) // may return 1.242574363
 * ```
 */
function RndR(min, max) {
    return dice.real(min, max);
}
globalThis.RndR = contract(RndR).sign([owl.num]);
/**
 * @category Random
 * @return 1 or -1
 * ```
 * RndU() // may return 1 or -1
 * ```
 */
function RndU() {
    return dice.array([-1, 1]).one();
}
globalThis.RndU = RndU;
/**
 * @category Random
 * @return true or false.
 * ```
 * RndT() // may return true or false
 * ```
 */
function RndT() {
    return dice.array([true, false]).one();
}
globalThis.RndT = RndT;
/**
 * @category Random
 * @return a random integer in [min, max] or [-max, -min] inclusive.
 * ```
 * RndZ(2,4) // return -4, -3, -2, 2, 3 or 4
 * ```
 */
function RndZ(min, max) {
    return RndN(min, max) * RndU();
}
globalThis.RndZ = contract(RndZ).sign([owl.nonNegative]);
/**
 * @category Random
 * @param n - default to 10
 * @return an array of n absolutely unique random integers in [min, max] or [-max, -min] inclusive.
 * ```
 * RndZs(2,8,3) // may return [5,-3,7]
 * ```
 */
function RndZs(min, max, n = 10) {
    n = Math.min(Math.floor(max - min + 1), n);
    return dice.roll(() => RndN(min, max)).unique(n).map(x => x * RndU());
}
globalThis.RndZs = contract(RndZs).sign([owl.nonNegative, owl.nonNegative, owl.positiveInt]);
/**
 * @category Random
 * @return a random prime number less than or equal to max.
 * ```
 * RndP(10) // may return 2, 3, 5 or 7
 * ```
 */
function RndP(max) {
    return dice.prime(2, max);
}
globalThis.RndP = contract(RndP).sign([owl.positive]);
/**
 * @category Random
 * @return a random odd integer in [min, max] inclusive
 * ```
 * RndOdd(3,8) // return 3, 5 or 7
 * ```
 */
function RndOdd(min, max) {
    min = Math.ceil((min + 1) / 2);
    max = Math.floor((max + 1) / 2);
    return 2 * RndN(min, max) - 1;
}
globalThis.RndOdd = contract(RndOdd).sign([owl.num]);
/**
 * @category Random
 * @return a random even integer in [min, max] inclusive
 * ```
 * RndEven(3,8) // return 4, 6 or 8
 * ```
 */
function RndEven(min, max) {
    min = Math.ceil(min / 2);
    max = Math.floor(max / 2);
    return 2 * RndN(min, max);
}
globalThis.RndEven = contract(RndEven).sign([owl.num]);
/**
 * @category Random
 * @return an array of random polynomial coefficients
 * ```
 * RndPoly(2,3,4) // equivalent to [RndN(1,2), RndZ(1,3), RndZ(1,4)]
 * ```
 */
function RndPoly(...coeff) {
    let arr = coeff.map(x => RndZ(1, x));
    arr[0] = Math.abs(arr[0]);
    return arr;
}
globalThis.RndPoly = contract(RndPoly).sign([owl.positive]);
/**
 * @category Random
 * @return an array of a Pyth Triple
 * ```
 * RndPyth(10) // may return [3,4,5]
 * ```
 */
function RndPyth(max = 100) {
    let arr = [];
    for (let m = 1; m < 10; m++) {
        for (let n = 1; n < m; n++) {
            for (let k = 1; k < 10; k++) {
                let a = m * m - n * n;
                let b = 2 * m * n;
                let c = m * m + n * n;
                if (c <= max)
                    arr.push([a, b, c]);
            }
        }
    }
    return dice.array(arr).one();
}
globalThis.RndPyth = contract(RndPyth).sign([owl.positive]);
/**
 * @category Random
 * @return a linear [a,b,c] in ax+by+c=0
 * ```
 * RndLinearFromIntercept(1,5) // may return [2,-3,6]
 * ```
 */
function RndLinearFromInt(minAbsIntercept, maxAbsIntercept) {
    let xInt = RndZ(minAbsIntercept, maxAbsIntercept);
    let yInt = RndZ(minAbsIntercept, maxAbsIntercept);
    return LinearFromIntercepts(xInt, yInt);
}
globalThis.RndLinearFromInt = contract(RndLinearFromInt).sign([owl.nonNegative]);
/**
 * @category Random
 * @return a point within given range
 * ```
 * RndPoint([1,4],[10,14]) // may return [2,12]
 * // equivalent to [RndN(...xRange),Range(...yRange)]
 * RndPoint(2,4) // equivalent to RndPoint([-2,2],[-4,4])
 * ```
 */
function RndPoint(xRange, yRange = xRange) {
    if (typeof xRange === 'number')
        xRange = [-xRange, xRange];
    if (typeof yRange === 'number')
        yRange = [-yRange, yRange];
    let x = RndN(...xRange);
    let y = RndN(...yRange);
    return [x, y];
}
globalThis.RndPoint = contract(RndPoint).sign([owl.or([owl.num, owl.interval])]);
/**
 * @category Random
 * @return n angles in [0,360] at least cyclic separated by separation
 * ```
 * RndAngles(3,50) // may return [30,90,200]
 * ```
 */
function RndAngles(n, separation) {
    let f = () => Sort(...RndNs(0, 360, n));
    let p = (arr) => {
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i + 1] - arr[i] < separation)
                return false;
        }
        if (arr[0] + 360 - arr[arr.length - 1] < separation)
            return false;
        return true;
    };
    return dice.roll(f).brute(p);
}
globalThis.RndAngles = contract(RndAngles).sign([owl.positiveInt, owl.positive]);
/**
 * @category Random
 * @return n vertices of a convex polygon generated by rounding a cyclic polygon
 * ```
 * RndConvexPolygon(3,[0,0],10,50) // may return [[10,0],[-6,8],[0,-10]]
 * ```
 */
function RndConvexPolygon(n, center, radius, separation) {
    let [h, k] = center;
    let r = radius;
    let angles = RndAngles(n, separation);
    let vertices = angles.map(a => [h + r * cos(a), k + r * sin(a)]);
    vertices = vertices.map(v => [Fix(v[0]), Fix(v[1])]);
    return vertices;
}
globalThis.RndConvexPolygon = contract(RndConvexPolygon)
    .sign([owl.positiveInt, owl.point, owl.positive, owl.positive]);
/**
 * @category Random
 * @return n integers from [min, max]
 * ```
 * RndData(10,15,5) // may return [11,11,12,13,15]
 * ```
 */
function RndData(min, max, n) {
    let f = () => dice.roll(() => RndN(min, max)).sample(n);
    let p = (arr) => Mode(...arr).length === 1;
    return Sort(...dice.roll(f).brute(p));
}
globalThis.RndData = contract(RndData).sign([owl.num, owl.num, owl.positiveInt]);
