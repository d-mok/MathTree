import { Vector } from './vector';
import { Vector2D } from './vector2D';
/**
 * A class of 3D vector, implemented as a subclass of array.
 */
export declare class Vector3D extends Vector {
    /**
     * Return an array [number,number,number] of this vector.
     * @returns an array [x,y,z]
     * @example
     * ```
     * [1,2,3].toArray() // [1,2,3]
     * ```
     */
    toArray(): [number, number, number];
    /**
     * Return the cross product of this vector and `vec`.
     * @param vec - the other vector
     * @returns the cross product
     * @example
     * ```
     * [1,0,0].cross([0,1,0]) // [0,0,1]
     * ```
     */
    cross(vec: Vector3D | [number, number, number]): this;
    /**
     * Return the rotated version of this vector, about the `axis` vector, by `angle` according to the right-hand grip rule.
     * @param axis - the vector specifying the axis direction
     * @param angle - the angle to rotate
     * @returns the rotated vector
     * @example
     * ```
     * [1,2,3].rotate([0,0,1],90) // [-2,1,3]
     * ```
     */
    rotate(axis: Vector3D | [number, number, number], angle: number): this;
    /**
     * Return the vector projection of this vector onto the plane formed by `vec1` and `vec2`.
     * @param vec1 - the 1st vector on the plane
     * @param vec2 - the 2nd vector on the plane
     * @returns the vector projection
     * @example
     * ```
     * [3,4,5].projectOnPlane([1,0,0],[0,1,0]) // [3,4,0]
     * ```
     */
    projectOnPlane(vec1: Vector3D | [number, number, number], vec2: Vector3D | [number, number, number]): this;
    /**
     * Return the normal component of this vector to the plane formed by `vec1` and `vec2`.
     * @param vec1 - the 1st vector on the plane
     * @param vec2 - the 2nd vector on the plane
     * @returns the normal vector
     * @example
     * ```
     * [3,4,5].normalToPlane([1,0,0],[0,1,0]) // [0,0,5]
     * ```
     */
    normalToPlane(vec1: Vector3D | [number, number, number], vec2: Vector3D | [number, number, number]): this;
    /**
     * Return the projection of this 3D vector on the 2D plane, by cabinet projection.
     * @param angle - the viewing angle
     * @param depth - the y-direction depth
     * @returns the projected 2D vector
     * @example
     * ```
     * [3, 4, 5].projectTo2D(60, 0.5) // [4, 6.732050807568877]
     * ```
     */
    projectTo2D(angle?: number, depth?: number): Vector2D;
}
/**
 * Return a `Vector3D` prefilled with `elements`.
 * @param x - x-component
 * @param y - y-component
 * @param z - z-component
 * @returns a `Vector3D` array
 * @example
 * ```
 * vector3D(1,2,3) // Vector3D of [1,2,3]
 * ```
 */
export declare function vector3D(x: number, y: number, z: number): Vector3D;
/**
 * Return a `Vector3D` prefilled with `elements`.
 * @param point - the point to form the vector
 * @returns a `Vector3D` array
 * @example
 * ```
 * vec3D([1,2,3]) // Vector3D of [1,2,3]
 * ```
 */
export declare function vec3D(point: [number, number, number] | Vector3D): Vector3D;
/**
 * Return a `Vector3D` given two points.
 * @param pointStart - start point
 * @param pointEnd - end point
 * @returns a `Vector3D` array
 * @example
 * ```
 * vec3D([1,1,1],[3,4,5]) // Vector3D of [2,3,4]
 * ```
 */
export declare function vec3D(pointStart: [number, number, number] | Vector3D, pointEnd: [number, number, number] | Vector3D): Vector3D;
//# sourceMappingURL=vector3D.d.ts.map