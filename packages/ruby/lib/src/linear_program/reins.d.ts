import { Constraint } from './rein';
type Point2D = [number, number];
export declare function onEdge(point: Point2D): boolean;
/**
 * Check if `point` satisfy every constraint.
 */
export declare function contains(cons: Constraint[], point: Point2D, mode?: 'strict' | 'loose' | 'self'): boolean;
/**
 * Return the vertices of the feasible polygon, including EDGE points.
 */
export declare function polygon(cons: Constraint[]): Point2D[];
/**
 * Return the vertices of the feasible region, excluding EDGE points.
 */
export declare function vertices(cons: Constraint[]): Point2D[];
/**
 * Check if the feasible region is bounded.
 */
export declare function isBounded(cons: Constraint[]): boolean;
/**
 * Check if this set of constraints has any solution at all.
 */
export declare function isConsistent(cons: Constraint[]): boolean;
/**
 * Return all the integral points inside the feasible polygon.
 */
export declare function integrals(cons: Constraint[]): Point2D[];
export {};
//# sourceMappingURL=reins.d.ts.map