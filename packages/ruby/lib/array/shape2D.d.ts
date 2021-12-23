import { Shape } from './shape';
import { Shape3D } from './shape3D';
import { Vector3D } from './vector3D';
import { Vector2D } from './vector2D';
/**
 * An subclass of array, representing an ordered list of points in 2D.
 */
export declare class Shape2D extends Shape<Vector2D> {
    /**
     * Return an array [number,number][] of this shape.
     * @returns an array [x,y][]
     * @example
     * ```
     * [[1,2],[3,4]].toArray() // [[1,2],[3,4]]
     * ```
     */
    toArray(): [number, number][];
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
    sortAroundMean(): void;
    /**
     * Return whether this shape is a convex polygon, but not neccessarily ordered.
     * @returns a boolean
     * @example
     * ```
     * [[0,0],[1,0],[0,1]].isConvex() // true
     * [[0,0],[3,0],[1,1],[0,3]].isConvex() // false
     * [[0,0],[1,0]].isConvex() // true if length <= 3
     * ```
     */
    isConvex(): boolean;
    /**
     * Return a Shape3D by erecting this shape into 3D.
     * @param vecX - the new unit vector in x-direction
     * @param vecY - the new unit vector in y-direction
     * @returns erected Shape3D
     * @example
     * ```
     * let [A,B,C] = [[0,0],[1,0],[0,1]]
     * [A,B,C].erect([1,0,0],[0,1,0]) // [[0,0,0],[1,0,0],[0,1,0]]
     * ```
     */
    erect(vecX: Vector3D | [number, number, number], vecY: Vector3D | [number, number, number]): Shape3D;
}
/**
 * Return a `Shape2D` prefilled with `elements`.
 * @param elements - the elements to put in the `Shape2D`
 * @returns a `Shape2D` array
 * @example
 * ```
 * shape2D([1,2],[3,4],[5,6]) // Shape2D of [[1,2],[3,4],[5,6]]
 * ```
 */
export declare function shape2D(...elements: ([number, number] | Vector2D)[]): Shape2D;
/**
 * Return a `Shape2D` prefilled with `elements`.
 * @param elements - the elements to put in the `Shape2D`
 * @returns a `Shape2D` array
 * @example
 * ```
 * toShape2D([[1,2],[3,4],[5,6]]) // Shape2D of [[1,2],[3,4],[5,6]]
 * ```
 */
export declare function toShape2D(elements: ([number, number] | Vector2D)[]): Shape2D;
//# sourceMappingURL=shape2D.d.ts.map