import { Constraint } from './rein'
import * as rein from './rein'
import _ from 'lodash'
import * as vec from '../math/vec'

type Point2D = [number, number]

const EDGE = 100

const EDGE_CONSTRAINTS: Constraint[] = [
    [1, 0, '<=', EDGE],
    [1, 0, '>=', -EDGE],
    [0, 1, '<=', EDGE],
    [0, 1, '>=', -EDGE],
]

export function onEdge(point: Point2D): boolean {
    let [x, y] = point
    return Math.abs(x) + 1 >= EDGE || Math.abs(y) + 1 >= EDGE
}

/**
 * Check if `point` satisfy every constraint.
 */
export function contains(
    cons: Constraint[],
    point: Point2D,
    mode: 'strict' | 'loose' | 'self' = 'self'
): boolean {
    return cons.every($ => rein.contains($, point, mode))
}

/**
 * Return the vertices of the feasible polygon, including EDGE points.
 */
export function polygon(cons: Constraint[]): Point2D[] {
    let fullCons = [...cons, ...EDGE_CONSTRAINTS]
    let vs: Point2D[] = []

    for (let [con1, con2] of _.combinations(fullCons, 2)) {
        let p = rein.intersectWith(con1, con2)
        if (p === undefined) continue
        let others = _.without(fullCons, con1, con2)
        if (contains(others, p, 'loose')) vs.push(p)
    }
    vs = _.uniqDeep(vs)
    vs = vec.sortAroundMean(vs)
    return vs
}

/**
 * Return the vertices of the feasible region, excluding EDGE points.
 */
export function vertices(cons: Constraint[]): Point2D[] {
    return polygon(cons).filter($ => !onEdge($))
}

/**
 * Check if the feasible region is bounded.
 */
export function isBounded(cons: Constraint[]): boolean {
    return polygon(cons).every($ => !onEdge($))
}

/**
 * Check if this set of constraints has any solution at all.
 */
export function isConsistent(cons: Constraint[]): boolean {
    return polygon(cons).length > 2
}

/**
 * Return all the integral points inside the feasible polygon.
 */
export function integrals(cons: Constraint[]): Point2D[] {
    let vs = polygon(cons)
    if (vs.length === 0) return []
    let ymax = Math.ceil(_.max(vs.map(([x, y]) => y))!)
    let xmax = Math.ceil(_.max(vs.map(([x, y]) => x))!)
    let xmin = Math.floor(_.min(vs.map(([x, y]) => x))!)
    let ymin = Math.floor(_.min(vs.map(([x, y]) => y))!)

    let points: Point2D[] = []
    for (let i = xmin; i <= xmax; i++) {
        for (let j = ymin; j <= ymax; j++) {
            let p: Point2D = [i, j]
            if (contains(cons, p)) points.push(p)
        }
    }
    return points
}
