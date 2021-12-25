import { Shape } from './shape';
import { Shape2D } from './shape2D';
import { Vector3D } from './vector3D';
/**
 * An subclass of array, representing an ordered list of points in 3D.
 */
export declare class Shape3D extends Shape<Vector3D> {
    /**
     * Return an array [number,number,number][] of this shape.
     * @returns an array [x,y,z][]
     * @example
     * ```
     * [[1,2,3],[3,4,5]].toArray() // [[1,2,3],[3,4,5]]
     * ```
     */
    toArray(): [number, number, number][];
    /**
     * Return the projection of this 3D shape on the 2D plane, by cabinet projection.
     * @param angle - the viewing angle
     * @param depth - the y-direction depth
     * @returns the projected 2D shape
     * @example
     * ```
     * let A = [0,0,0]
     * let B = [3,4,5]
     * [A,B].projectTo2D(60, 0.5)
     * // [0,0]
     * // [4, 6.732050807568877]
     * ```
     */
    projectTo2D(angle?: number, depth?: number): Shape2D;
}
/**
 * Return a `Shape3D` prefilled with `elements`.
 * @param elements - the elements to put in the `Shape3D`
 * @returns a `Shape3D` array
 * @example
 * ```
 * shape3D([1,2,3],[3,4,5],[5,6,7]) // Shape3D of [[1,2,3],[3,4,5],[5,6,7]]
 * ```
 */
export declare function shape3D(...elements: ([number, number, number] | Vector3D)[]): Shape3D;
/**
 * Return a `Shape3D` prefilled with `elements`.
 * @param elements - the elements to put in the `Shape3D`
 * @returns a `Shape3D` array
 * @example
 * ```
 * toShape3D([[1,2,3],[3,4,5],[5,6,7]]) // Shape3D of [[1,2,3],[3,4,5],[5,6,7]]
 * ```
 */
export declare function toShape3D(elements: ([number, number, number] | Vector3D)[]): Shape3D;
//# sourceMappingURL=shape3D.d.ts.map