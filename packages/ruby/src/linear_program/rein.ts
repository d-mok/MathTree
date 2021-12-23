
type Point2D = [number, number]
import { crammer } from '../math/cal'
import { ineq, Ineq } from './inequal'


export type Constraint = [xCoeff: number, yCoeff: number, ineq: Ineq, constant: number]

export class Rein {

    constructor(public constraint: Constraint) { }

    private clone(): Rein {
        return new Rein(this.constraint)
    }

    /**
     * Check if this constraint contains `point`.
     */
    public contains(point: Point2D): boolean {
        let [a, b, i, c] = this.constraint
        let [x, y] = point
        return ineq(i).compare(a * x + b * y, c)
    }

    /**
     * Check if me can equal.
     */
    canEqual(): boolean {
        let [a, b, i, c] = this.constraint
        return ineq(i).canEqual()
    }

    /**
     * Return a strict version of this constraint.
     */
    public strict(): Rein {
        let [a, b, i, c] = this.constraint
        let j = ineq(i).strict()
        return new Rein([a, b, j, c])
    }

    /**
     * Return a loose version of this constraint.
     */
    public loose(): Rein {
        let [a, b, i, c] = this.constraint
        let j = ineq(i).loose()
        return new Rein([a, b, j, c])
    }


    /**
     * Return a flipped version of this constraint.
     */
    public flip(): Rein {
        let [a, b, i, c] = this.constraint
        let j = ineq(i).flip()
        return new Rein([a, b, j, c])
    }

    /**
     * Return the intersection point of this and `another`.
     * If parallel, return `undefined`.
     */
    public intersectWith(another: Rein): Point2D | undefined {
        let [a1, b1, i1, c1] = this.constraint
        let [a2, b2, i2, c2] = another.constraint
        if (a1 / b1 === a2 / b2) return undefined
        return crammer(a1, b1, c1, a2, b2, c2);
    }


    /**
     * Return a clone or a flipped version.
     */
    public shake(): Rein {
        return Math.random() > 0.5 ? this.clone() : this.flip()
    }

    /**
     * Return Linear form object from constraint.
     */
    public toLinear(): [a: number, b: number, c: number] {
        let [a, b, i, c] = this.constraint
        return [a, b, -c]
    }

    /**
     * Return Standard form object from constraint.
     */
    public toStandard(): [a: number, b: number, _c: number] {
        let [a, b, i, c] = this.constraint
        return [a, b, c]
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
export function rein(constraint: Constraint): Rein {
    return new Rein(constraint);
}