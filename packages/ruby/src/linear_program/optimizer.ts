type Point2D = [number, number]
type Field = [a: number, b: number, c: number]
import _ from 'lodash'
import * as reins from './reins'

export class Optimizer {
    constructor(
        private readonly field: Field = [0, 0, 0],
        private readonly feasiblePoints: Point2D[]
    ) {
        this.field = field
        this.feasiblePoints = feasiblePoints
    }

    /**
     * Evaluate `this.field` at `point`.
     */
    public fieldAt(point: Point2D): number {
        const [a, b, c] = this.field
        const [x, y] = point
        return a * x + b * y + c
    }

    /**
     * Return the points (among feasible points) where the field is max.
     * Points onEdge are excluded.
     */
    public maxPoints(): Point2D[] {
        let fieldValues = this.feasiblePoints.map($ => this.fieldAt($))
        let maxValue = Math.max(...fieldValues)
        return _(this.feasiblePoints)
            .filter($ => this.fieldAt($) === maxValue)
            .uniqWith(_.isEqual)
            .filter($ => !reins.onEdge($))
            .value()
    }

    /**
     * Return the points (among feasible points) where the field is min.
     * Points onEdge are excluded.
     */
    public minPoints(): Point2D[] {
        let fieldValues = this.feasiblePoints.map($ => this.fieldAt($))
        let minValue = Math.min(...fieldValues)
        return _(this.feasiblePoints)
            .filter($ => this.fieldAt($) === minValue)
            .uniqWith(_.isEqual)
            .filter($ => !reins.onEdge($))
            .value()
    }

    /**
     * Return the points (among feasible points) where the field is min or max.
     * Points onEdge are excluded.
     */
    public optimalPoints(max: boolean): Point2D[] {
        return max ? this.maxPoints() : this.minPoints()
    }

    /**
     * Return the max field value among feasible points.
     * Points onEdge are excluded.
     */
    public max(): number | null {
        let pts = this.maxPoints()
        if (pts.length === 0) return null
        return this.fieldAt(pts[0])
    }

    /**
     * Return the min field value among feasible points.
     * Points onEdge are excluded.
     */
    public min(): number | null {
        let pts = this.minPoints()
        if (pts.length === 0) return null
        return this.fieldAt(pts[0])
    }

    /**
     * Return the min or max field value among feasible points.
     * Points onEdge are excluded.
     */
    public optimal(max: boolean): number | null {
        return max ? this.max() : this.min()
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
export function optimizer(
    field: Field,
    feasiblePoints: Point2D[] = []
): Optimizer {
    return new Optimizer(field, feasiblePoints)
}
