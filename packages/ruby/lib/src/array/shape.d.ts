import { List } from './list';
import { Numbers } from './numbers';
import { Vector } from './vector';
/**
 * An abstract subclass of array, representing an ordered list of points in 2D or 3D.
 */
export declare class Shape<Vec extends Vector> extends List<Vec> {
    /**
     * Return an array of mutual distances of all pairs of points.
     * @returns array of mutual distances
     * @example
     * ```
     * let A = [0,0]
     * let B = [3,0]
     * let C = [0,4]
     * [A,B,C].distances() // [3,4,5]
     * ```
     */
    distances(): Numbers;
    /**
     * Return an array of distances from `point`.
     * @param point - the point from which to measure distance
     * @returns array of distances
     * @example
     * ```
     * let A = [3,0]
     * let B = [0,4]
     * [A,B].distancesFrom([0,0]) // [3,4]
     * ```
     */
    distancesFrom(point: number[]): Numbers;
    /**
     * Return the mean of the points.
     * @returns the mean position
     * @example
     * ```
     * let A = [0,0]
     * let B = [3,0]
     * let C = [0,6]
     * [A,B,C].mean() // [1,2]
     * ```
     */
    mean(): Vec;
    /**
     * Return the points translated by `vec`.
     * @param vec - translate by this vector
     * @returns the translated shape
     * @example
     * ```
     * let A = [0,0]
     * let B = [3,0]
     * let C = [0,6]
     * [A,B,C].translate([1,2])
     * // [1,2]
     * // [4,2]
     * // [1,8]
     * ```
     */
    translate(vec: number[]): this;
    /**
     * Return the points scaled by `scale`.
     * @param scale - scale factor
     * @returns the scaled shape
     * @example
     * ```
     * let A = [1,2]
     * let B = [3,0]
     * let C = [0,6]
     * [A,B,C].scale(2)
     * // [2,4]
     * // [6,0]
     * // [0,12]
     * ```
     */
    scale(scale: number): this;
    /**
     * Return the points extruded towards `vertex` by `scale`.
     * @param vertex - the point to extrude towards
     * @param scale - 1 = do nothing, 0 = all points meet at `vertex`
     * @returns the extruded shape
     * @example
     * ```
     * let A = [10,0]
     * let B = [5,0]
     * let C = [0,20]
     * [A,B,C].extrudeTo([0,0], 0.4)
     * // [4,0]
     * // [2,0]
     * // [0,8]
     * ```
     */
    extrudeTo(vertex: number[], scale: number): this;
    /**
     * Return the points extruded towards `shape` point-by-point.
     * @param shape - the shape to extrude towards, should have same length as this shape
     * @param scale - 1 = do nothing, 0 = all points meet at `vertex`
     * @returns the extruded shape
     * @exampled
     * ```
     * let A = [10,0]
     * let B = [5,0]
     * let C = [0,20]
     * let X = [0,0]
     * let Y = [-5,0]
     * let Z = [0,10]
     * [A,B,C].extrudeTo([X,Y,Z], 0.4)
     * // [4,0]  extrude A to X
     * // [-1,0]  extrude B to Y
     * // [0,14]  extrude C to Z
     * ```
     */
    extrudeToShape(shape: number[][], scale: number): this;
}
/**
 * Return a `Shape` prefilled with `elements`.
 * @param elements - the elements to put in the `Shape`
 * @returns a `Shape` array
 * @example
 * ```
 * shape([1,2],[3,4],[5,6]) // Shape of [[1,2],[3,4],[5,6]]
 * ```
 */
export declare function shape(...elements: number[][]): Shape<Vector>;
/**
 * Return a `Shape` prefilled with `elements`.
 * @param elements - the elements to put in the `Shape`
 * @returns a `Shape` array
 * @example
 * ```
 * toShape([[1,2],[3,4],[5,6]]) // Shape of [[1,2],[3,4],[5,6]]
 * ```
 */
export declare function toShape(elements: number[][]): Shape<Vector>;
//# sourceMappingURL=shape.d.ts.map