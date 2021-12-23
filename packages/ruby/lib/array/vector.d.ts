import { List } from './list';
import { Numbers } from './numbers';
/**
 * An abstract subclass of array, designed for physical vectors of any dimensions.
 */
export declare class Vector extends Numbers {
    /**
     * Return the magnitude of this vector.
     * @returns the magnitude of this vector
     * @example
     * ```
     * [6,8].magnitude() // 10
     * ```
     */
    magnitude(): number;
    /**
     * Return the unit vector of this vector.
     * @returns the unit vector
     * @example
     * ```
     * [6,8].unit() // [0.6,0.8]
     * ```
     */
    unit(): this;
    /**
     * Return this vector scaled to the given magnitude.
     * @param magnitude - the required magnitude
     * @returns the scaled vector
     * @example
     * ```
     * [6,8].scaledTo(20) // [12,16]
     * ```
     */
    scaledTo(magnitude: number): this;
    /**
     * Return the dot product of this vector and `vec`.
     * @param vec - the other vector
     * @returns the dot product
     * @example
     * ```
     * [1,2].dot([3,4]) // 1*3+2*4 = 11
     * ```
     */
    dot(vec: number[]): number;
    /**
     * Return the angle between this vector and `vec`.
     * @param vec - the other vector
     * @returns the angle between this and `vec`
     * @example
     * ```
     * [1,0].angleWith([0,1]) // 90
     * ```
     */
    angleWith(vec: number[]): number;
    /**
     * Return the vector projection of this vector onto `vec`.
     * @param vec - the vector to project onto
     * @returns the vector projection
     * @example
     * ```
     * [3,4].projectOn([1,0]) // [3,0]
     * ```
     */
    projectOn(vec: number[]): this;
    /**
     * Return the component of this vector normal to `vec`.
     * @param vec - the vector to project onto
     * @returns the normal vector
     * @example
     * ```
     * [3,4].normalTo([1,0]) // [0,4]
     * ```
     */
    normalTo(vec: number[]): this;
    /**
     * Return the distance between the tip of this vector and `vec`.
     * @param vec - the other vector
     * @returns the distance between the tips
     * @example
     * ```
     * [0,3].distanceWith([0,4]) // 5
     * ```
     */
    distanceWith(vec: number[]): number;
    /**
     * Return the vector extruded towards `vertex` by `scale`.
     * @param vertex - the point to extrude towards
     * @param scale - 1 = do nothing, 0 = go to `vertex`
     * @returns the extruded vector
     * @example
     * ```
     * [4,1].extrudeTo([0,1], 0.75) // [3,1]
     * ```
     */
    extrudeTo(vertex: number[], scale: number): this;
}
declare module "./vector" {
    interface Vector {
    }
    namespace Vector {
        function of<T>(...items: T[]): Vector & List<T>;
    }
}
/**
 * Return a `Vector` prefilled with `elements`.
 * @param elements - the elements to put in the `Vector`
 * @returns a `Vector` array
 * @example
 * ```
 * vector(1,2,3) // Vector of [1,2,3]
 * ```
 */
export declare function vector(...elements: number[]): Vector;
/**
 * Return a `Vector` prefilled with `elements`.
 * @param elements - the elements to put in the `Vector`
 * @returns a `Vector` array
 * @example
 * ```
 * toVector([1,2,3]) // Vector of [1,2,3]
 * ```
 */
export declare function toVector(elements: number[]): Vector;
//# sourceMappingURL=vector.d.ts.map