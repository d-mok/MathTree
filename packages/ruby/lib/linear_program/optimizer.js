import { Reins } from './reins';
import { toList, list } from '../array/list';
export class Optimizer {
    constructor({ field, feasiblePoints = [] }) {
        this.field = [0, 0, 0];
        this.feasiblePoints = list();
        this.field = field;
        this.feasiblePoints = toList(feasiblePoints);
    }
    onEdge(point) {
        return (new Reins()).onEdge(point);
    }
    /**
     * Evaluate `this.field` at `point`.
     */
    fieldAt(point) {
        const [a, b, c] = this.field;
        const [x, y] = point;
        return a * x + b * y + c;
    }
    /**
     * Return the points (among feasible points) where the field is max.
     * Points onEdge are excluded.
     */
    maxPoints() {
        return this.feasiblePoints
            .maxsBy($ => this.fieldAt($))
            .uniqueDeep()
            .violate($ => this.onEdge($));
    }
    /**
     * Return the points (among feasible points) where the field is min.
     * Points onEdge are excluded.
     */
    minPoints() {
        return this.feasiblePoints
            .minsBy($ => this.fieldAt($))
            .uniqueDeep()
            .violate($ => this.onEdge($));
    }
    /**
     * Return the points (among feasible points) where the field is min or max.
     * Points onEdge are excluded.
     */
    optimalPoints(max) {
        return max ? this.maxPoints() : this.minPoints();
    }
    /**
     * Return the max field value among feasible points.
     * Points onEdge are excluded.
     */
    max() {
        let pts = this.maxPoints();
        if (pts.length === 0)
            return null;
        return this.fieldAt(pts[0]);
    }
    /**
     * Return the min field value among feasible points.
     * Points onEdge are excluded.
     */
    min() {
        let pts = this.minPoints();
        if (pts.length === 0)
            return null;
        return this.fieldAt(pts[0]);
    }
    /**
     * Return the min or max field value among feasible points.
     * Points onEdge are excluded.
     */
    optimal(max) {
        return max ? this.max() : this.min();
    }
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
export function optimizer({ field, feasiblePoints = [] }) {
    return new Optimizer({ field, feasiblePoints });
}
//# sourceMappingURL=optimizer.js.map