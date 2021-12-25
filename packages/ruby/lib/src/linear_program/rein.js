import { crammer } from '../math/cal';
import { ineq } from './inequal';
export class Rein {
    constructor(constraint) {
        this.constraint = constraint;
    }
    clone() {
        return new Rein(this.constraint);
    }
    /**
     * Check if this constraint contains `point`.
     */
    contains(point) {
        let [a, b, i, c] = this.constraint;
        let [x, y] = point;
        return ineq(i).compare(a * x + b * y, c);
    }
    /**
     * Check if me can equal.
     */
    canEqual() {
        let [a, b, i, c] = this.constraint;
        return ineq(i).canEqual();
    }
    /**
     * Return a strict version of this constraint.
     */
    strict() {
        let [a, b, i, c] = this.constraint;
        let j = ineq(i).strict();
        return new Rein([a, b, j, c]);
    }
    /**
     * Return a loose version of this constraint.
     */
    loose() {
        let [a, b, i, c] = this.constraint;
        let j = ineq(i).loose();
        return new Rein([a, b, j, c]);
    }
    /**
     * Return a flipped version of this constraint.
     */
    flip() {
        let [a, b, i, c] = this.constraint;
        let j = ineq(i).flip();
        return new Rein([a, b, j, c]);
    }
    /**
     * Return the intersection point of this and `another`.
     * If parallel, return `undefined`.
     */
    intersectWith(another) {
        let [a1, b1, i1, c1] = this.constraint;
        let [a2, b2, i2, c2] = another.constraint;
        if (a1 / b1 === a2 / b2)
            return undefined;
        return crammer(a1, b1, c1, a2, b2, c2);
    }
    /**
     * Return a clone or a flipped version.
     */
    shake() {
        return Math.random() > 0.5 ? this.clone() : this.flip();
    }
    /**
     * Return Linear form object from constraint.
     */
    toLinear() {
        let [a, b, i, c] = this.constraint;
        return [a, b, -c];
    }
    /**
     * Return Standard form object from constraint.
     */
    toStandard() {
        let [a, b, i, c] = this.constraint;
        return [a, b, c];
    }
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
export function rein(constraint) {
    return new Rein(constraint);
}
//# sourceMappingURL=rein.js.map