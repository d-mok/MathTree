import * as math from 'mathjs'
import _ from 'lodash'

/**
 * Return the vector from A to B.
 * ```
 * fromTo([3,4],[1,0]) // [2,4]
 * ```
 */
export function fromTo<T extends number[]>(A: [...T], B: T): T {
    return math.subtract(B, A)
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
export function mean<T extends number[]>(vecs: [...T][]): T {
    let sum = vecs.reduce((a, b) => math.add(a, b))
    return sum.map($ => $ / vecs.length) as T
}

/**
 * Return this vector scaled to the given magnitude.
 * ```
 * [6,8].scaledTo(20) // [12,16]
 * ```
 */
export function scaledTo<T extends number[]>(vec: [...T], magnitude = 1): T {
    let mag = Number(math.norm(vec))
    return vec.map($ => ($ / mag) * magnitude) as T
}

/**
 * Return the angle between this vector and `vec`.
 * ```
 * [1,0].angleWith([0,1]) // 90
 * ```
 */
export function angleBetween(vec1: number[], vec2: number[]): number {
    let m1 = Number(math.norm(vec1))
    let m2 = Number(math.norm(vec2))
    let dot = math.dot(vec1, vec2)
    let cos = dot / m1 / m2
    let angle = (Math.acos(cos) * 180) / Math.PI
    return angle
}

/**
 * Return the vector projection of this vector onto `vec`.
 * ```
 * [3,4].projectOn([1,0]) // [3,0]
 * ```
 */
export function projection<T extends number[]>(ofVec: [...T], onVec: T): T {
    let unit = scaledTo(onVec, 1)
    let dot = math.dot(ofVec, unit)
    return unit.map($ => $ * dot) as T
}

/**
 * Return the component of this vector normal to `vec`.
 * ```
 * [3,4].normalTo([1,0]) // [0,4]
 * ```
 */
export function normal<T extends number[]>(ofVec: [...T], onVec: T): T {
    let parallel = projection(ofVec, onVec)
    return math.subtract(ofVec, parallel)
}

/**
 * Return the vector extruded towards `vertex` by `scale`.
 * @param scale - 1 = do nothing, 0 = go to `vertex`
 * ```
 * [4,1].extrudeTo([0,1], 0.75) // [3,1]
 * ```
 */
export function extrude<T extends number[]>(
    vec: [...T],
    vertex: T,
    scale: number
): T {
    let d = math.subtract(vec, vertex)
    d = d.map($ => $ * scale) as T
    return math.add(vertex, d)
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
export function argument(vec2D: [number, number]): number {
    let [x, y] = vec2D
    if (x === 0 && y === 0) return 0
    let angle = (Math.atan2(y, x) * 180) / Math.PI
    if (angle < 0) angle += 360
    return angle
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
export function projectOnPlane(
    vec: [number, number, number],
    planeVec1: [number, number, number],
    planeVec2: [number, number, number]
): [number, number, number] {
    let normal = normalToPlane(vec, planeVec1, planeVec2)
    return math.subtract(vec, normal)
}

/**
 * Return the normal component of this vector to the plane formed by `vec1` and `vec2`.
 * ```
 * [3,4,5].normalToPlane([1,0,0],[0,1,0]) // [0,0,5]
 * ```
 */
export function normalToPlane(
    vec: [number, number, number],
    planeVec1: [number, number, number],
    planeVec2: [number, number, number]
): [number, number, number] {
    let normal = math.cross(planeVec1, planeVec2) as [number, number, number]
    return projection(vec, normal)
}

/**
 * Return the projection of this 3D vector on the 2D plane, by cabinet projection.
 * @param angle - the viewing angle
 * @param depth - the y-direction depth
 * ```
 * [3, 4, 5].projectTo2D(60, 0.5) // [4, 6.732050807568877]
 * ```
 */
export function projectTo2D(
    vec: [number, number, number],
    angle: number = 60,
    depth: number = 0.5
): [number, number] {
    let a = (angle * Math.PI) / 180
    let s = Math.sin(a)
    let c = Math.cos(a)

    let [x, y, z] = vec
    let x_new = x + depth * y * c
    let y_new = z + depth * y * s
    return [x_new, y_new]
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
export function sortAroundMean(vecs: [number, number][]): [number, number][] {
    let m = mean(vecs)
    return _.sortBy(vecs, $ => argument(math.subtract($, m)))
}

/**
 * Return whether this shape is a convex polygon, but not neccessarily ordered.
 * ```
 * [[0,0],[1,0],[0,1]].isConvex() // true
 * [[0,0],[3,0],[1,1],[0,3]].isConvex() // false
 * [[0,0],[1,0]].isConvex() // true if length <= 3
 * ```
 */
export function isConvex(vecs: [number, number][]): boolean {
    if (vecs.length <= 3) return true
    let sorted = sortAroundMean(vecs)
    let cross = []
    for (let i = 0; i < sorted.length; i++) {
        let p1 = sorted.at(-1)!
        let p2 = sorted.at(0)!
        let p3 = sorted.at(1)!
        let u = [...fromTo(p1, p2), 0]
        let v = [...fromTo(p2, p3), 0]
        cross.push((math.cross(u, v) as number[])[2])
        sorted.push(sorted.shift()!)
    }
    cross.filter($ => $ !== 0)
    return cross.every($ => $ > 0) || cross.every($ => $ < 0)
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
export function erect(
    vec: [number, number],
    vecX: [number, number, number],
    vecY: [number, number, number]
): [number, number, number] {
    let [x, y] = vec
    let vx3D = math.multiply(vecX, x) as [number, number, number]
    let vy3D = math.multiply(vecY, y) as [number, number, number]
    return math.add(vx3D, vy3D)
}
