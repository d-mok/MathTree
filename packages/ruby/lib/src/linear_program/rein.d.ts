type Point2D = [number, number];
import * as INEQUAL from '../math/inequal.js';
export type Constraint = [
    xCoeff: number,
    yCoeff: number,
    ineq: INEQUAL.Ineq,
    constant: number
];
/**
 * Check if this constraint contains `point`.
 */
export declare function contains([a, b, i, c]: Constraint, point: Point2D, mode?: 'strict' | 'loose' | 'self'): boolean;
/**
 * Check if me can equal.
 */
export declare function canEqual([a, b, i, c]: Constraint): boolean;
/**
 * Return a strict version of this constraint.
 */
export declare function strict([a, b, i, c]: Constraint): Constraint;
/**
 * Return a loose version of this constraint.
 */
export declare function loose([a, b, i, c]: Constraint): Constraint;
/**
 * Return a flipped version of this constraint.
 */
export declare function flip([a, b, i, c]: Constraint): Constraint;
/**
 * Return the intersection point of this and `another`.
 * If parallel, return `undefined`.
 */
export declare function intersectWith([a1, b1, i1, c1]: Constraint, [a2, b2, i2, c2]: Constraint): Point2D | undefined;
/**
 * Return Linear form object from constraint.
 */
export declare function toLinear([a, b, i, c]: Constraint): [
    a: number,
    b: number,
    c: number
];
/**
 * Return Standard form object from constraint.
 */
export declare function toStandard([a, b, i, c]: Constraint): [
    a: number,
    b: number,
    _c: number
];
export {};
//# sourceMappingURL=rein.d.ts.map