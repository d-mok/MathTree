import { Rein } from './rein';
import { List, toList } from '../array/list';
import { shape2D } from '../array/shape2D';
import { vec2D } from '../array/vector2D';
/**
 * A subclass of array. Designed as a set of constraints.
 */
export class Reins extends List {
    constructor() {
        super(...arguments);
        this.EDGE = 100;
        this.EDGE_CONSTRAINTS = [
            new Rein([1, 0, "<=", this.EDGE]),
            new Rein([1, 0, ">=", -this.EDGE]),
            new Rein([0, 1, "<=", this.EDGE]),
            new Rein([0, 1, ">=", -this.EDGE])
        ];
    }
    fullConstraints() {
        let cons = this.clone();
        cons.push(...this.EDGE_CONSTRAINTS);
        return cons;
    }
    /**
     * Return me as array of `Constraint`.
     */
    constraints() {
        return this.map($ => $.constraint);
    }
    onEdge(point) {
        let [x, y] = point;
        return Math.abs(x) + 1 >= this.EDGE || Math.abs(y) + 1 >= this.EDGE;
    }
    /**
     * Check if `point` satisfy every constraint.
     */
    contains(point) {
        return this.every($ => $.contains(point));
    }
    /**
     * Check if `point` loosely satisfy every constraint.
     */
    looseContains(point) {
        return this.map($ => $.loose()).every($ => $.contains(point));
    }
    /**
     * Return the vertices of the feasible polygon, including EDGE points.
     */
    polygon() {
        let cons = this.fullConstraints();
        let vs = shape2D();
        for (let i = 0; i < cons.length; i++) {
            for (let j = i + 1; j < cons.length; j++) {
                let p = cons[i].intersectWith(cons[j]);
                if (p === undefined)
                    continue;
                let others = cons.clone();
                others.pull(j);
                others.pull(i);
                if (others.looseContains(p))
                    vs.push(vec2D(p));
            }
        }
        vs = vs.uniqueDeep();
        vs.sortAroundMean();
        return vs.toArray();
    }
    /**
     * Return the vertices of the feasible region, excluding EDGE points.
     */
    vertices() {
        return this.polygon().filter($ => !this.onEdge($));
    }
    /**
     * Check if the feasible region is bounded.
     */
    isBounded() {
        return this.polygon().every($ => !this.onEdge($));
    }
    /**
     * Check if this set of constraints has any solution at all.
     */
    isConsistent() {
        return this.polygon().length > 2;
    }
    /**
     * Return all the integral points inside the feasible polygon.
     */
    integrals() {
        let vs = toList(this.polygon());
        let ymax = Math.ceil(vs.maxOf(([x, y]) => y));
        let xmax = Math.ceil(vs.maxOf(([x, y]) => x));
        let xmin = Math.floor(vs.minOf(([x, y]) => x));
        let ymin = Math.floor(vs.minOf(([x, y]) => y));
        let points = [];
        for (let i = xmin; i <= xmax; i++) {
            for (let j = ymin; j <= ymax; j++) {
                let p = [i, j];
                if (this.contains(p))
                    points.push(p);
            }
        }
        return points;
    }
    /**
     * Return a shaked version of me.
     */
    shake() {
        let cons = this.map($ => $.shake());
        return this.create(cons);
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
export function reins(...constraints) {
    let cs = new Reins();
    cs.push(...constraints.map($ => new Rein($)));
    return cs;
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
export function toReins(constraints) {
    return reins(...constraints);
}
//# sourceMappingURL=reins.js.map