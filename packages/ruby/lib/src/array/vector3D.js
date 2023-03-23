"use strict";
// import { Vector } from './vector'
// import { Vector2D, vector2D } from './vector2D'
// /**
//  * A class of 3D vector, implemented as a subclass of array.
//  */
// export class Vector3D extends Vector {
//     /**
//      * Return an array [number,number,number] of this vector.
//      * @returns an array [x,y,z]
//      * @example
//      * ```
//      * [1,2,3].toArray() // [1,2,3]
//      * ```
//      */
//     public toArray(): [number, number, number] {
//         let [x, y, z] = this
//         return [x, y, z]
//     }
//     /**
//      * Return the cross product of this vector and `vec`.
//      * @param vec - the other vector
//      * @returns the cross product
//      * @example
//      * ```
//      * [1,0,0].cross([0,1,0]) // [0,0,1]
//      * ```
//      */
//     public cross(vec: Vector3D | [number, number, number]): this {
//         let [x1, y1, z1] = this
//         let [x2, y2, z2] = vec
//         let x = y1 * z2 - z1 * y2
//         let y = z1 * x2 - x1 * z2
//         let z = x1 * y2 - y1 * x2
//         return this.create([x, y, z])
//     }
//     /**
//      * Return the rotated version of this vector, about the `axis` vector, by `angle` according to the right-hand grip rule.
//      * @param axis - the vector specifying the axis direction
//      * @param angle - the angle to rotate
//      * @returns the rotated vector
//      * @example
//      * ```
//      * [1,2,3].rotate([0,0,1],90) // [-2,1,3]
//      * ```
//      */
//     public rotate(axis: Vector3D | [number, number, number], angle: number): this {
//         let a = angle * Math.PI / 180
//         let s = Math.sin(a)
//         let c = Math.cos(a)
//         let k = this.create(axis).unit()
//         let term1 = this.times(c)
//         let term2 = k.cross(this).times(s)
//         let term3 = k.times(k.dot(this)).times(1 - c)
//         return term1.add(term2).add(term3)
//     }
//     /**
//      * Return the vector projection of this vector onto the plane formed by `vec1` and `vec2`.
//      * @param vec1 - the 1st vector on the plane
//      * @param vec2 - the 2nd vector on the plane
//      * @returns the vector projection
//      * @example
//      * ```
//      * [3,4,5].projectOnPlane([1,0,0],[0,1,0]) // [3,4,0]
//      * ```
//      */
//     public projectOnPlane(vec1: Vector3D | [number, number, number], vec2: Vector3D | [number, number, number]): this {
//         let normal = this.normalToPlane(vec1, vec2)
//         return this.minus(normal)
//     }
//     /**
//      * Return the normal component of this vector to the plane formed by `vec1` and `vec2`.
//      * @param vec1 - the 1st vector on the plane
//      * @param vec2 - the 2nd vector on the plane
//      * @returns the normal vector
//      * @example
//      * ```
//      * [3,4,5].normalToPlane([1,0,0],[0,1,0]) // [0,0,5]
//      * ```
//      */
//     public normalToPlane(vec1: Vector3D | [number, number, number], vec2: Vector3D | [number, number, number]): this {
//         let v1 = this.create(vec1)
//         let v2 = this.create(vec2)
//         let normal = v1.cross(v2)
//         return this.projectOn(normal)
//     }
//     /**
//      * Return the projection of this 3D vector on the 2D plane, by cabinet projection.
//      * @param angle - the viewing angle
//      * @param depth - the y-direction depth
//      * @returns the projected 2D vector
//      * @example
//      * ```
//      * [3, 4, 5].projectTo2D(60, 0.5) // [4, 6.732050807568877]
//      * ```
//      */
//     public projectTo2D(angle: number = 60, depth: number = 0.5): Vector2D {
//         let a = angle * Math.PI / 180
//         let s = Math.sin(a)
//         let c = Math.cos(a)
//         let [x, y, z] = this
//         let x_new = x + depth * y * c
//         let y_new = z + depth * y * s
//         return vector2D(x_new, y_new)
//     }
// }
// /**
//  * Return a `Vector3D` prefilled with `elements`.
//  * @param x - x-component
//  * @param y - y-component
//  * @param z - z-component
//  * @returns a `Vector3D` array
//  * @example
//  * ```
//  * vector3D(1,2,3) // Vector3D of [1,2,3]
//  * ```
//  */
// export function vector3D(x: number, y: number, z: number): Vector3D {
//     let vec = new Vector3D()
//     vec.push(x, y, z)
//     return vec
// }
// /**
//  * Return a `Vector3D` prefilled with `elements`.
//  * @param point - the point to form the vector
//  * @returns a `Vector3D` array
//  * @example
//  * ```
//  * vec3D([1,2,3]) // Vector3D of [1,2,3]
//  * ```
//  */
// export function vec3D(point: [number, number, number] | Vector3D): Vector3D
// /**
//  * Return a `Vector3D` given two points.
//  * @param pointStart - start point
//  * @param pointEnd - end point
//  * @returns a `Vector3D` array
//  * @example
//  * ```
//  * vec3D([1,1,1],[3,4,5]) // Vector3D of [2,3,4]
//  * ```
//  */
// export function vec3D(pointStart: [number, number, number] | Vector3D, pointEnd: [number, number, number] | Vector3D): Vector3D
// export function vec3D(p1: [number, number, number] | Vector3D, p2?: [number, number, number] | Vector3D): Vector3D {
//     if (p2 === undefined) {
//         let [x, y, z] = p1
//         return vector3D(x, y, z)
//     } else {
//         let [x1, y1, z1] = p1
//         let [x2, y2, z2] = p2
//         return vector3D(x2 - x1, y2 - y1, z2 - z1)
//     }
// }
//# sourceMappingURL=vector3D.js.map