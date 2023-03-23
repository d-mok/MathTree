type Point2D = [number, number];
type Field = [a: number, b: number, c: number];
export declare class Optimizer {
    private field;
    private feasiblePoints;
    constructor({ field, feasiblePoints }: {
        field: Field;
        feasiblePoints?: Point2D[];
    });
    private onEdge;
    /**
     * Evaluate `this.field` at `point`.
     */
    fieldAt(point: Point2D): number;
    /**
     * Return the points (among feasible points) where the field is max.
     * Points onEdge are excluded.
     */
    maxPoints(): Point2D[];
    /**
     * Return the points (among feasible points) where the field is min.
     * Points onEdge are excluded.
     */
    minPoints(): Point2D[];
    /**
     * Return the points (among feasible points) where the field is min or max.
     * Points onEdge are excluded.
     */
    optimalPoints(max: boolean): Point2D[];
    /**
     * Return the max field value among feasible points.
     * Points onEdge are excluded.
     */
    max(): number | null;
    /**
     * Return the min field value among feasible points.
     * Points onEdge are excluded.
     */
    min(): number | null;
    /**
     * Return the min or max field value among feasible points.
     * Points onEdge are excluded.
     */
    optimal(max: boolean): number | null;
}
/**
 * Return a `Optimizer` instance.
 * @example
 * ```
 * optimizer({
 *    field: [1,2,3],
 *    feasiblePoints: [[0,0],[1,0],[0,1]]
 * })
 * ```
 */
export declare function optimizer({ field, feasiblePoints }: {
    field: Field;
    feasiblePoints?: Point2D[];
}): Optimizer;
export {};
//# sourceMappingURL=optimizer.d.ts.map