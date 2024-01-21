import { px, dot, Point2D, Point3D, Point, inch } from '../global.js'
import { Canvas08 } from './canvas08.js'
import { trace, splitNull } from '../support/trace.js'
import { sectoroid } from '../support/sectoroid.js'

/**
 * Handle:
 * - plot
 */
export class Canvas09 extends Canvas08 {
    plot(
        func: ((t: number) => number) | ((t: number) => Point2D),
        tStart = this.xmin,
        tEnd = this.xmax,
        dots = 1000
    ): void {
        let points = trace(func, [tStart, tEnd], dots)
        // let { xmin, xmax, ymin, ymax } = this
        // let X = xmax - xmin
        // let Y = ymax - ymin

        // function outOfRange([x, y]: Point2D): boolean {
        //     return x > xmax + X || x < xmin - X || y > ymax + Y || y < ymin - Y
        // }

        let isIll = (p: Point2D): boolean => {
            let [x, y] = p
            return (
                !Number.isFinite(x) ||
                !Number.isFinite(y) ||
                !this.isVisible(p, 1)
            )
        }

        let filteredPoints = points.map(p => (isIll(p) ? null : p))

        let segments = splitNull(filteredPoints)
        for (let seg of segments) this.line(seg)
    }

    sectoroidLine(O: Point2D, A: Point2D, B: Point2D, vertices: Point2D[]) {
        let pts = sectoroid(O, A, B, vertices)
        this.line(pts)
    }

    sectoroidFill(O: Point2D, A: Point2D, B: Point2D, vertices: Point2D[]) {
        let pts = sectoroid(O, A, B, vertices)
        this.fill(pts)
    }

    sectoroidShade(O: Point2D, A: Point2D, B: Point2D, vertices: Point2D[]) {
        let pts = sectoroid(O, A, B, vertices)
        this.shade(pts)
    }
}
