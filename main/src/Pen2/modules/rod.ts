import { PenCls } from '../Pen.js'
import { Convas } from 'paint'

export class PenRod {
    constructor(private pen: PenCls, private cv: Convas) {}

    private end(A: Point2D, dir: number, length?: number): Point2D {
        return length === undefined
            ? this.cv.edgePoint(A, dir)
            : Move(A, dir, length)
    }

    /**
     * Draw a line from `A` in `dir` with `length`.
     * ```
     * pen.rod.line([0,0],2,90) // from [0,0] to [0,2]
     * ```
     */
    line(A: Point2D, dir: number, length?: number, label?: string | number) {
        let B = this.end(A, dir, length)
        this.pen.line(A, B, label)
    }

    /**
     * Draw a dash line from `A` in `dir` with `length`.
     * ```
     * pen.rod.dash([0,0],2,90) // from [0,0] to [0,2]
     * ```
     */
    dash(A: Point2D, dir: number, length?: number, label?: string | number) {
        let B = this.end(A, dir, length)
        this.pen.dash(A, B, label)
    }

    /**
     * Draw an arrow from `A` in `dir` with `length`.
     * ```
     * pen.rod.arrow([0,0],2,90) // from [0,0] to [0,2]
     * ```
     */
    arrow(A: Point2D, dir: number, length?: number, label?: string | number) {
        let B = this.end(A, dir, length)
        this.pen.arrow(A, B, label)
    }

    /**
     * Draw a ray from `A` in `dir` with `length`.
     * ```
     * pen.rod.rayFrom([0,0],2,90) // from [0,0] to [0,2]
     * ```
     */
    rayFrom(A: Point2D, dir: number, length?: number, label?: string | number) {
        let B = this.end(A, dir, length)
        this.pen.ray(A, B, label)
    }

    /**
     * Draw a ray to `A` in `dir` with `length`.
     * ```
     * pen.rod.rayTo([0,0],2,90) // from [0,2] to [0,0]
     * ```
     */
    rayTo(A: Point2D, dir: number, length?: number, label?: string | number) {
        let B = this.end(A, dir, length)
        this.pen.ray(B, A, label)
    }
}
