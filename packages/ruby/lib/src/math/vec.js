import * as math from 'mathjs';
/**
 * ====================================
 * NEW
 * ====================================
 */
/**
 * Return this vector scaled to the given magnitude.
 * ```
 * [6,8].scaledTo(20) // [12,16]
 * ```
 */
export function scaledTo(vec, magnitude = 1) {
    let mag = Number(math.norm(vec));
    return vec.map($ => ($ / mag) * magnitude);
}
/**
 * Return the angle between this vector and `vec`.
 * ```
 * [1,0].angleWith([0,1]) // 90
 * ```
 */
export function angleBetween(vec1, vec2) {
    let m1 = Number(math.norm(vec1));
    let m2 = Number(math.norm(vec2));
    let dot = math.dot(vec1, vec2);
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
    let dot = math.dot(ofVec, unit);
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
    return math.subtract(ofVec, parallel);
}
/**
 * Return the vector extruded towards `vertex` by `scale`.
 * @param scale - 1 = do nothing, 0 = go to `vertex`
 * ```
 * [4,1].extrudeTo([0,1], 0.75) // [3,1]
 * ```
 */
export function extrude(vec, vertex, scale) {
    let d = math.subtract(vec, vertex);
    d = d.map($ => $ * scale);
    return math.add(vertex, d);
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
    return math.subtract(vec, normal);
}
/**
 * Return the normal component of this vector to the plane formed by `vec1` and `vec2`.
 * ```
 * [3,4,5].normalToPlane([1,0,0],[0,1,0]) // [0,0,5]
 * ```
 */
export function normalToPlane(vec, planeVec1, planeVec2) {
    let normal = math.cross(planeVec1, planeVec2);
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
//# sourceMappingURL=vec.js.map