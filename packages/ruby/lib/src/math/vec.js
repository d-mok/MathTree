import _ from 'lodash';
/**
 * Return the vector from A to B.
 * ```
 * fromTo([1,0],[3,4]) // [2,4]
 * ```
 */
export function fromTo(A, B) {
    return Math.sum(B, Math.scale(A, -1));
}
/**
 * Return the mean of the points.
 * ```
 * let A = [0,0]
 * let B = [3,0]
 * let C = [0,6]
 * [A,B,C].mean() // [1,2]
 * ```
 */
export function mean(vecs) {
    let sum = vecs.reduce((a, b) => Math.sum(a, b));
    return sum.map($ => $ / vecs.length);
}
/**
 * Return this vector scaled to the given magnitude.
 * ```
 * [6,8].scaledTo(20) // [12,16]
 * ```
 */
export function scaledTo(vec, magnitude = 1) {
    let mag = Math.hypot(...vec);
    return Math.scale(vec, magnitude / mag);
}
/**
 * Return the angle between this vector and `vec`.
 * ```
 * [1,0].angleWith([0,1]) // 90
 * ```
 */
export function angleBetween(vec1, vec2) {
    let m1 = Math.hypot(...vec1);
    let m2 = Math.hypot(...vec2);
    let dot = Math.dot(vec1, vec2);
    let cos = dot / m1 / m2;
    let angle = (Math.acos(cos) * 180) / Math.PI;
    return angle;
}
/**
 * Return the vector projection of this vector onto `vec`.
 * ```
 * [3,4].projectOn([1,0]) // [3,0]
 * ```
 */
export function projection(ofVec, onVec) {
    let unit = scaledTo(onVec, 1);
    let dot = Math.dot(ofVec, unit);
    return unit.map($ => $ * dot);
}
/**
 * Return the component of this vector normal to `vec`.
 * ```
 * [3,4].normalTo([1,0]) // [0,4]
 * ```
 */
export function normal(ofVec, onVec) {
    let parallel = projection(ofVec, onVec);
    return Math.subtract(ofVec, parallel);
}
/**
 * Return the vector extruded towards `vertex` by `scale`.
 * @param scale - 1 = do nothing, 0 = go to `vertex`
 * ```
 * [4,1].extrudeTo([0,1], 0.75) // [3,1]
 * ```
 */
export function extrude(vec, vertex, scale) {
    let d = Math.subtract(vec, vertex);
    d = d.map($ => $ * scale);
    return Math.sum(vertex, d);
}
/**
 * 2D
 */
/**
 * Return the argument of this vector.
 * i.e. the polar angle in [0,360).
 * ```
 * [1,1].argument() // 45
 * ```
 */
export function argument(vec2D) {
    let [x, y] = vec2D;
    if (x === 0 && y === 0)
        return 0;
    let angle = (Math.atan2(y, x) * 180) / Math.PI;
    if (angle < 0)
        angle += 360;
    return angle;
}
/**
 * 3D
 */
/**
 * Return the vector projection of this vector onto the plane formed by `vec1` and `vec2`.
 * ```
 * [3,4,5].projectOnPlane([1,0,0],[0,1,0]) // [3,4,0]
 * ```
 */
export function projectOnPlane(vec, planeVec1, planeVec2) {
    let normal = normalToPlane(vec, planeVec1, planeVec2);
    return Math.subtract(vec, normal);
}
/**
 * Return the normal component of this vector to the plane formed by `vec1` and `vec2`.
 * ```
 * [3,4,5].normalToPlane([1,0,0],[0,1,0]) // [0,0,5]
 * ```
 */
export function normalToPlane(vec, planeVec1, planeVec2) {
    let normal = Math.cross(planeVec1, planeVec2);
    return projection(vec, normal);
}
/**
 * Return the projection of this 3D vector on the 2D plane, by cabinet projection.
 * @param angle - the viewing angle
 * @param depth - the y-direction depth
 * ```
 * [3, 4, 5].projectTo2D(60, 0.5) // [4, 6.732050807568877]
 * ```
 */
export function projectTo2D(vec, angle = 60, depth = 0.5) {
    let a = (angle * Math.PI) / 180;
    let s = Math.sin(a);
    let c = Math.cos(a);
    let [x, y, z] = vec;
    let x_new = x + depth * y * c;
    let y_new = z + depth * y * s;
    return [x_new, y_new];
}
/**
 * Sort the points by measuring their polar angle from the mean.
 * @example
 * ```
 * let A = [0,0]
 * let B = [2,0]
 * let C = [1,1]
 * [A,B,C].sortAroundMean() //-> [C,A,B]
 * ```
 */
export function sortAroundMean(vecs) {
    let m = mean(vecs);
    return _.sortBy(vecs, $ => argument(Math.subtract($, m)));
}
/**
 * Return whether this shape is a convex polygon, but not neccessarily ordered.
 * ```
 * [[0,0],[1,0],[0,1]].isConvex() // true
 * [[0,0],[3,0],[1,1],[0,3]].isConvex() // false
 * [[0,0],[1,0]].isConvex() // true if length <= 3
 * ```
 */
export function isConvex(vecs) {
    if (vecs.length <= 3)
        return true;
    let sorted = sortAroundMean(vecs);
    let cross = [];
    for (let i = 0; i < sorted.length; i++) {
        let p1 = sorted.at(-1);
        let p2 = sorted.at(0);
        let p3 = sorted.at(1);
        let u = [...fromTo(p1, p2), 0];
        let v = [...fromTo(p2, p3), 0];
        cross.push(Math.cross(u, v)[2]);
        sorted.push(sorted.shift());
    }
    cross.filter($ => $ !== 0);
    return cross.every($ => $ > 0) || cross.every($ => $ < 0);
}
/**
 * Return a Shape3D by erecting this shape into 3D.
 * @param vecX - the new unit vector in x-direction
 * @param vecY - the new unit vector in y-direction
 * ```
 * let [A,B,C] = [[0,0],[1,0],[0,1]]
 * [A,B,C].erect([1,0,0],[0,1,0]) // [[0,0,0],[1,0,0],[0,1,0]]
 * ```
 */
export function erect(vec, vecX, vecY) {
    let [x, y] = vec;
    let vx3D = Math.scale(vecX, x);
    let vy3D = Math.scale(vecY, y);
    return Math.sum(vx3D, vy3D);
}
//# sourceMappingURL=vec.js.map