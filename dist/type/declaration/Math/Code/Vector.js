"use strict";
/**
 * @category Vector
 * @return the vector OP
 * ```
 * Vector([1,2],[10,5]) // [9,3]
 * ```
 */
function Vector(O, P) {
    return [P[0] - O[0], P[1] - O[1]];
}
globalThis.Vector = contract(Vector).sign([owl.point]);
/**
 * @category Vector
 * @return sum of all vectors
 * ```
 * VectorAdd([1,2],[3,4],[5,6]) // [9,12]
 * ```
 */
function VectorAdd(...vectors) {
    const x = Sum(...vectors.map(p => p[0]));
    const y = Sum(...vectors.map(p => p[1]));
    return [x, y];
}
globalThis.VectorAdd = contract(VectorAdd).sign([owl.vector]);
/**
 * @category Vector
 * @return mean of all vectors
 * ```
 * VectorMean([1,2],[3,4],[5,6]) // [3,4]
 * VectorMean([0,0],[2,0],[2,2],[0,2]) // [1,1]
 * ```
 */
function VectorMean(...vectors) {
    const x = Sum(...vectors.map(p => p[0])) / vectors.length;
    const y = Sum(...vectors.map(p => p[1])) / vectors.length;
    return [x, y];
}
globalThis.VectorMean = contract(VectorMean).sign([owl.vector]);
/**
 * @category Vector
 * @return length of vector
 * ```
 * VectorLength([-3,4]) // 5
 * VectorLength([0,0]) // 0
 * VectorLength([1,2]) // sqrt(5)
 * ```
 */
function VectorLength(v) {
    const [x, y] = v;
    return Math.pow((x * x + y * y), 0.5);
}
globalThis.VectorLength = contract(VectorLength).sign([owl.vector]);
/**
 * @category Vector
 * @return length of vector
 * ```
 * VectorArg([2,0]) // 0
 * VectorArg([0,2]) // 90
 * VectorArg([-2,0]) // 180
 * VectorArg([0,-2]) // 270
 * VectorArg([0,0]) // 0
 * VectorArg([1,1]) // 45
 * ```
 */
function VectorArg(v) {
    const [x, y] = v;
    let arg = Math.atan2(y, x) / Math.PI * 180;
    if (arg < 0)
        arg += 360;
    return arg;
}
globalThis.VectorArg = contract(VectorArg).sign([owl.vector]);
/**
 * @category Vector
 * @return find [kx,ky] from [x,y]
 * ```
 * VectorScale([1,2],2) // [2,4]
 * VectorScale([1,2],-2) // [-2,-4]
 * ```
 */
function VectorScale(v, k) {
    return [k * v[0], k * v[1]];
}
globalThis.VectorScale = contract(VectorScale).sign([owl.vector, owl.num]);
/**
 * @category Vector
 * @return the negative of the vector
 * ```
 * VectorRev([-3,4]) // [3,-4]
 * VectorRev([0,0]) // [0,0]
 * VectorRev([1,2]) // [-1,-2]
 * ```
 */
function VectorRev(v) {
    const [x, y] = v;
    return [-x, -y];
}
globalThis.VectorRev = contract(VectorRev).sign([owl.vector]);
/**
 * @category Vector
 * @return the unit vector of v
 * ```
 * VectorUnit([2,0]) // [1,0]
 * VectorUnit([0,-2]) // [0,-1]
 * VectorUnit([1,2]) // [1/sqrt(5),2/sqrt(5)]
 * ```
 */
function VectorUnit(v) {
    const [x, y] = v;
    const L = VectorLength(v);
    return [x / L, y / L];
}
globalThis.VectorUnit = contract(VectorUnit).sign([owl.vector]);
/**
 * @category Vector
 * @return scale the vector to the given length
 * ```
 * VectorScaleTo([2,0],10) // [10,0]
 * VectorScaleTo([0,-2],100) // [0,-100]
 * VectorScaleTo([-3,4],15) // [-9,12]
 * ```
 */
function VectorScaleTo(v, length) {
    return VectorScale(VectorUnit(v), length);
}
globalThis.VectorScaleTo = contract(VectorScaleTo).sign([owl.vector, owl.num]);
/**
 * @category Vector
 * @return rotate a vector anticlockwise by angle.
 * ```
 * VectorRotate([1,2],90) // [-2,1]
 * ```
 */
function VectorRotate(v, angle) {
    const [x, y] = v;
    const S = sin(angle);
    const C = cos(angle);
    const x1 = x * C - y * S;
    const y1 = x * S + y * C;
    return [x1, y1];
}
globalThis.VectorRotate = contract(VectorRotate).sign([owl.vector, owl.num]);