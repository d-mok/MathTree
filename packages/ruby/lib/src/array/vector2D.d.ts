import { Vector } from './vector';
/**
 * A class of 2D vector, implemented as a subclass of array.
 */
export declare class Vector2D extends Vector {
    /**
     * Return an array [number,number] of this vector.
     * @returns an array [x,y]
     * @example
     * ```
     * [1,2].toArray() // [1,2]
     * ```
     */
    toArray(): [number, number];
    /**
     * Return the argument of this vector.
     * i.e. the polar angle in [0,360).
     * @returns the argument
     * @example
     * ```
     * [1,1].argument() // 45
     * ```
     */
    argument(): number;
    /**
     * Return the rotated version of this vector about the origin anti-clockwise by `angle`.
     * @param angle - the anti-clockwise angle to rotate
     * @returns the rotated vector
     * @example
     * ```
     * [1,2].rotate(90) // [-2,1]
     * ```
     */
    rotate(angle: number): this;
    /**
     * Return the z-component of the cross product between this vector and `vec`.
     * @param vec - the other vector
     * @returns the z-component of the cross product
     * @example
     * ```
     * [1,2].cross2D([3,4]) // 1*4-2*3 = -2
     * ```
     */
    cross2D(vec: Vector2D | [number, number]): number;
}
/**
 * Return a `Vector2D` prefilled with `elements`.
 * @param x - x-component
 * @param y - y-component
 * @returns a `Vector2D` array
 * @example
 * ```
 * vector2D(1,2) // Vector2D of [1,2]
 * ```
 */
export declare function vector2D(x: number, y: number): Vector2D;
/**
 * Return a `Vector2D` prefilled with `elements`.
 * @param point - the point to form the vector
 * @returns a `Vector2D` array
 * @example
 * ```
 * vec2D([1,2]) // Vector2D of [1,2]
 * ```
 */
export declare function vec2D(point: [number, number] | Vector2D): Vector2D;
/**
 * Return a `Vector2D` given two points.
 * @param pointStart - start point
 * @param pointEnd - end point
 * @returns a `Vector2D` array
 * @example
 * ```
 * vec2D([1,1],[3,4]) // Vector2D of [2,3]
 * ```
 */
export declare function vec2D(pointStart: [number, number] | Vector2D, pointEnd: [number, number] | Vector2D): Vector2D;
//# sourceMappingURL=vector2D.d.ts.map