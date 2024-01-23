import * as rein from './rein.js';
import _ from 'lodash';
import * as vec from '../math/vec.js';
const EDGE = 100;
const EDGE_CONSTRAINTS = [
    [1, 0, '<=', EDGE],
    [1, 0, '>=', -EDGE],
    [0, 1, '<=', EDGE],
    [0, 1, '>=', -EDGE],
];
export function onEdge(point) {
    let [x, y] = point;
    return Math.abs(x) + 1 >= EDGE || Math.abs(y) + 1 >= EDGE;
}
/**
 * Check if `point` satisfy every constraint.
 */
export function contains(cons, point, mode = 'self') {
    return cons.every($ => rein.contains($, point, mode));
}
/**
 * Return the vertices of the feasible polygon, including EDGE points.
 */
export function polygon(cons) {
    let fullCons = [...cons, ...EDGE_CONSTRAINTS];
    let vs = [];
    for (let [con1, con2] of fullCons.combinations(2)) {
        let p = rein.intersectWith(con1, con2);
        if (p === undefined)
            continue;
        let others = _.without(fullCons, con1, con2);
        if (contains(others, p, 'loose'))
            vs.push(p);
    }
    vs = vs.uniqEqual();
    vs = vec.sortAroundMean(vs);
    return vs;
}
/**
 * Return the vertices of the feasible region, excluding EDGE points.
 */
export function vertices(cons) {
    return polygon(cons).filter($ => !onEdge($));
}
/**
 * Check if the feasible region is bounded.
 */
export function isBounded(cons) {
    return polygon(cons).every($ => !onEdge($));
}
/**
 * Check if this set of constraints has any solution at all.
 */
export function isConsistent(cons) {
    return polygon(cons).length > 2;
}
/**
 * Return all the integral points inside the feasible polygon.
 */
export function integrals(cons) {
    let vs = polygon(cons);
    if (vs.length === 0)
        return [];
    let ymax = Math.ceil(_.max(vs.map(([x, y]) => y)));
    let xmax = Math.ceil(_.max(vs.map(([x, y]) => x)));
    let xmin = Math.floor(_.min(vs.map(([x, y]) => x)));
    let ymin = Math.floor(_.min(vs.map(([x, y]) => y)));
    let points = [];
    for (let i = xmin; i <= xmax; i++) {
        for (let j = ymin; j <= ymax; j++) {
            let p = [i, j];
            if (contains(cons, p))
                points.push(p);
        }
    }
    return points;
}
//# sourceMappingURL=reins.js.map