import _ from 'lodash';
import * as reins from './reins';
export class Optimizer {
    constructor(field = [0, 0, 0], feasiblePoints) {
        this.field = field;
        this.feasiblePoints = feasiblePoints;
        this.field = field;
        this.feasiblePoints = feasiblePoints;
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
        let fieldValues = this.feasiblePoints.map($ => this.fieldAt($));
        let maxValue = Math.max(...fieldValues);
        return _(this.feasiblePoints)
            .filter($ => this.fieldAt($) === maxValue)
            .uniqWith(_.isEqual)
            .filter($ => !reins.onEdge($))
            .value();
    }
    /**
     * Return the points (among feasible points) where the field is min.
     * Points onEdge are excluded.
     */
    minPoints() {
        let fieldValues = this.feasiblePoints.map($ => this.fieldAt($));
        let minValue = Math.min(...fieldValues);
        return _(this.feasiblePoints)
            .filter($ => this.fieldAt($) === minValue)
            .uniqWith(_.isEqual)
            .filter($ => !reins.onEdge($))
            .value();
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
 * ```
 * optimizer(
 *     [1,2,3],
 *     [[0,0],[1,0],[0,1]]
 * )
 * ```
 */
export function optimizer(field, feasiblePoints = []) {
    return new Optimizer(field, feasiblePoints);
}
//# sourceMappingURL=optimizer.js.map