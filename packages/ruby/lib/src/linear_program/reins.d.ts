import { Rein, Constraint } from './rein';
import { List } from '../array/list';
type Point2D = [number, number];
/**
 * A subclass of array. Designed as a set of constraints.
 */
export declare class Reins extends List<Rein> {
    private readonly EDGE;
    private readonly EDGE_CONSTRAINTS;
    private fullConstraints;
    /**
     * Return me as array of `Constraint`.
     */
    constraints(): Constraint[];
    onEdge(point: Point2D): boolean;
    /**
     * Check if `point` satisfy every constraint.
     */
    contains(point: Point2D): boolean;
    /**
     * Check if `point` loosely satisfy every constraint.
     */
    looseContains(point: Point2D): boolean;
    /**
     * Return the vertices of the feasible polygon, including EDGE points.
     */
    polygon(): Point2D[];
    /**
     * Return the vertices of the feasible region, excluding EDGE points.
     */
    vertices(): Point2D[];
    /**
     * Check if the feasible region is bounded.
     */
    isBounded(): boolean;
    /**
     * Check if this set of constraints has any solution at all.
     */
    isConsistent(): boolean;
    /**
     * Return all the integral points inside the feasible polygon.
     */
    integrals(): Point2D[];
    /**
     * Return a shaked version of me.
     */
    shake(): Reins;
}
declare module "./reins" {
    interface Reins {
    }
    namespace Reins {
        function of<T>(...items: T[]): Reins & List<T>;
    }
}
/**
 * Return a `Reins` prefilled with `constraints`.
 * @param constraints - the constraints to put in the `Numbers`
 * @returns a `Reins` array
 * @example
 * ```
 * reins([1,2,'<',3],[4,5,'>',6])
 * ```
 */
export declare function reins(...constraints: Constraint[]): Reins;
/**
 * Return a `Reins` prefilled with `constraints`.
 * @param constraints - the constraints to put in the `Reins`
 * @returns a `Reins` array
 * @example
 * ```
 * toReins([[1,2,'<',3],[4,5,'>',6]])
 * ```
 */
export declare function toReins(constraints: Constraint[]): Reins;
export {};
//# sourceMappingURL=reins.d.ts.map