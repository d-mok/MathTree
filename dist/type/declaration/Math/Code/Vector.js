"use strict";
/**
 * @category Vector
 * @return the vector OP
 * ```typescript
 * Vector([1,2],[10,5]) // [9,3]
 * ```
 */
function Vector(O, P) {
    Should(IsPoint(O, P), 'input must be point');
    return [P[0] - O[0], P[1] - O[1]];
}
globalThis.Vector = Vector;
/**
 * @category Vector
 * @return sum of all vectors
 * ```typescript
 * VectorAdd([1,2],[3,4],[5,6]) // [9,12]
 * ```
 */
function VectorAdd(...vectors) {
    Should(IsVector(...vectors), 'input must be vector');
    const x = Sum(...vectors.map(p => p[0]));
    const y = Sum(...vectors.map(p => p[1]));
    return [x, y];
}
globalThis.VectorAdd = VectorAdd;
/**
 * @category Vector
 * @return mean of all vectors
 * ```typescript
 * VectorMean([1,2],[3,4],[5,6]) // [3,4]
 * VectorMean([0,0],[2,0],[2,2],[0,2]) // [1,1]
 * ```
 */
function VectorMean(...vectors) {
    Should(IsVector(...vectors), 'input must be vector');
    const x = Sum(...vectors.map(p => p[0])) / vectors.length;
    const y = Sum(...vectors.map(p => p[1])) / vectors.length;
    return [x, y];
}
globalThis.VectorMean = VectorMean;
/**
 * @category Vector
 * @return length of vector
 * ```typescript
 * VectorLength([-3,4]) // 5
 * VectorLength([0,0]) // 0
 * VectorLength([1,2]) // sqrt(5)
 * ```
 */
function VectorLength(v) {
    Should(IsVector(v), 'input must be vector');
    const [x, y] = v;
    return Math.pow((x * x + y * y), 0.5);
}
globalThis.VectorLength = VectorLength;
/**
 * @category Vector
 * @return length of vector
 * ```typescript
 * VectorArg([2,0]) // 0
 * VectorArg([0,2]) // 90
 * VectorArg([-2,0]) // 180
 * VectorArg([0,-2]) // 270
 * VectorArg([0,0]) // 0
 * VectorArg([1,1]) // 45
 * ```
 */
function VectorArg(v) {
    Should(IsVector(v), 'input must be vector');
    const [x, y] = v;
    let arg = Math.atan2(y, x) / Math.PI * 180;
    if (arg < 0)
        arg += 360;
    return arg;
}
globalThis.VectorArg = VectorArg;
/**
 * @category Vector
 * @return find [kx,ky] from [x,y]
 * ```typescript
 * VectorScale([1,2],2) // [2,4]
 * VectorScale([1,2],-2) // [-2,-4]
 * ```
 */
function VectorScale(v, k) {
    Should(IsVector(v), 'input must be vector');
    Should(IsNum(k), 'k must be num');
    return [k * v[0], k * v[1]];
}
globalThis.VectorScale = VectorScale;
/**
 * @category Vector
 * @return the negative of the vector
 * ```typescript
 * VectorRev([-3,4]) // [3,-4]
 * VectorRev([0,0]) // [0,0]
 * VectorRev([1,2]) // [-1,-2]
 * ```
 */
function VectorRev(v) {
    Should(IsVector(v), 'input must be vector');
    const [x, y] = v;
    return [-x, -y];
}
globalThis.VectorRev = VectorRev;
/**
 * @category Vector
 * @return the unit vector of v
 * ```typescript
 * VectorUnit([2,0]) // [1,0]
 * VectorUnit([0,-2]) // [0,-1]
 * VectorUnit([1,2]) // [1/sqrt(5),2/sqrt(5)]
 * ```
 */
function VectorUnit(v) {
    Should(IsVector(v), 'input must be vector');
    const [x, y] = v;
    const L = VectorLength(v);
    return [x / L, y / L];
}
globalThis.VectorUnit = VectorUnit;
/**
 * @category Vector
 * @return scale the vector to the given length
 * ```typescript
 * VectorScaleTo([2,0],10) // [10,0]
 * VectorScaleTo([0,-2],100) // [0,-100]
 * VectorScaleTo([-3,4],15) // [-9,12]
 * ```
 */
function VectorScaleTo(v, length) {
    Should(IsVector(v), 'input must be vector');
    Should(IsNum(length), 'length must be num');
    return VectorScale(VectorUnit(v), length);
}
globalThis.VectorScaleTo = VectorScaleTo;
/**
 * @category Vector
 * @return rotate a vector anticlockwise by angle.
 * ```typescript
 * VectorRotate([1,2],90) // [-2,1]
 * ```
 */
function VectorRotate(v, angle) {
    Should(IsVector(v), 'input must be vector');
    Should(IsNum(angle), 'angle must be num');
    const [x, y] = v;
    const S = sin(angle);
    const C = cos(angle);
    const x1 = x * C - y * S;
    const y1 = x * S + y * C;
    return [x1, y1];
}
globalThis.VectorRotate = VectorRotate;
