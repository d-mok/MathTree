type Point2D = [number, number];
import * as INEQUAL from '../math/inequal';
export type Constraint = [
    xCoeff: number,
    yCoeff: number,
    ineq: INEQUAL.Ineq,
    constant: number
];
export declare class Rein {
    constraint: Constraint;
    constructor(constraint: Constraint);
    private clone;
    /**
     * Check if this constraint contains `point`.
     */
    contains(point: Point2D): boolean;
    /**
     * Check if me can equal.
     */
    canEqual(): boolean;
    /**
     * Return a strict version of this constraint.
     */
    strict(): Rein;
    /**
     * Return a loose version of this constraint.
     */
    loose(): Rein;
    /**
     * Return a flipped version of this constraint.
     */
    flip(): Rein;
    /**
     * Return the intersection point of this and `another`.
     * If parallel, return `undefined`.
     */
    intersectWith(another: Rein): Point2D | undefined;
    /**
     * Return a clone or a flipped version.
     */
    shake(): Rein;
    /**
     * Return Linear form object from constraint.
     */
    toLinear(): [a: number, b: number, c: number];
    /**
     * Return Standard form object from constraint.
     */
    toStandard(): [a: number, b: number, _c: number];
}
/**
 * Return a `Rein` instance.
 * @param constraint - the constraint to represent
 * @returns a `Rein` instance
 * @example
 * ```
 * rein([1,2,'<',3])
 * ```
 */
export declare function rein(constraint: Constraint): Rein;
export {};
//# sourceMappingURL=rein.d.ts.map