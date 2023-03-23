import { Rein, Constraint } from './rein'
import { List, toList } from '../array/list'
import _ from 'lodash'
import * as vec from '../math/vec'

type Point2D = [number, number]

/**
 * A subclass of array. Designed as a set of constraints.
 */
export class Reins extends List<Rein> {
    private readonly EDGE = 100

    private readonly EDGE_CONSTRAINTS: Rein[] = [
        new Rein([1, 0, '<=', this.EDGE]),
        new Rein([1, 0, '>=', -this.EDGE]),
        new Rein([0, 1, '<=', this.EDGE]),
        new Rein([0, 1, '>=', -this.EDGE]),
    ]

    private fullConstraints(): Reins {
        let cons = this.clone()
        cons.push(...this.EDGE_CONSTRAINTS)
        return cons
    }

    /**
     * Return me as array of `Constraint`.
     */
    public constraints(): Constraint[] {
        return this.map($ => $.constraint)
    }

    public onEdge(point: Point2D): boolean {
        let [x, y] = point
        return Math.abs(x) + 1 >= this.EDGE || Math.abs(y) + 1 >= this.EDGE
    }

    /**
     * Check if `point` satisfy every constraint.
     */
    public contains(point: Point2D): boolean {
        return this.every($ => $.contains(point))
    }

    /**
     * Check if `point` loosely satisfy every constraint.
     */
    public looseContains(point: Point2D): boolean {
        return this.map($ => $.loose()).every($ => $.contains(point))
    }

    /**
     * Return the vertices of the feasible polygon, including EDGE points.
     */
    public polygon(): Point2D[] {
        let cons = this.fullConstraints()
        let vs: Point2D[] = []

        for (let i = 0; i < cons.length; i++) {
            for (let j = i + 1; j < cons.length; j++) {
                let p = cons[i].intersectWith(cons[j])
                if (p === undefined) continue

                let others = cons.clone()
                others.pull(j)
                others.pull(i)

                if (others.looseContains(p)) vs.push(p)
            }
        }
        vs = _.uniqDeep(vs)
        vs = vec.sortAroundMean(...vs)
        return vs
    }

    /**
     * Return the vertices of the feasible region, excluding EDGE points.
     */
    public vertices(): Point2D[] {
        return this.polygon().filter($ => !this.onEdge($))
    }

    /**
     * Check if the feasible region is bounded.
     */
    public isBounded(): boolean {
        return this.polygon().every($ => !this.onEdge($))
    }

    /**
     * Check if this set of constraints has any solution at all.
     */
    public isConsistent(): boolean {
        return this.polygon().length > 2
    }

    /**
     * Return all the integral points inside the feasible polygon.
     */
    public integrals(): Point2D[] {
        let vs = toList(this.polygon())
        let ymax = Math.ceil(vs.maxOf(([x, y]) => y))
        let xmax = Math.ceil(vs.maxOf(([x, y]) => x))
        let xmin = Math.floor(vs.minOf(([x, y]) => x))
        let ymin = Math.floor(vs.minOf(([x, y]) => y))

        let points: Point2D[] = []
        for (let i = xmin; i <= xmax; i++) {
            for (let j = ymin; j <= ymax; j++) {
                let p: Point2D = [i, j]
                if (this.contains(p)) points.push(p)
            }
        }
        return points
    }

    /**
     * Return a shaked version of me.
     */
    public shake(): Reins {
        let cons = this.map($ => $.shake())
        return this.create(cons)
    }
}

declare module './reins' {
    interface Reins {}
    namespace Reins {
        export function of<T>(...items: T[]): Reins & List<T>
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
export function reins(...constraints: Constraint[]): Reins {
    let cs = new Reins()
    cs.push(...constraints.map($ => new Rein($)))
    return cs
}

/**
 * Return a `Reins` prefilled with `constraints`.
 * @param constraints - the constraints to put in the `Reins`
 * @returns a `Reins` array
 * @example
 * ```
 * toReins([[1,2,'<',3],[4,5,'>',6]])
 * ```
 */
export function toReins(constraints: Constraint[]): Reins {
    return reins(...constraints)
}
