import { PenCls } from '../Pen'
import { Convas } from 'paint'

export class PenFill {
    constructor(private pen: PenCls, private cv: Convas) {}

    /**
     * Fill a circle.
     * ```
     * pen.fill.circle([1,2],3) // fill (x-1)^2+(y-2)^2 = 9.
     * ```
     */
    circle(center: Point2D, radius: number) {
        let points = cal.traceCircle(center, radius, [0, 360])
        this.pen.polyfill(...points)
    }

    /**
     * Fill a sector. AOB must be in polar direction.
     * ```
     * pen.fill.sector([0,0],[1,0],[0,1]) // fill a quarter circle sector
     * ```
     */
    sector(O: Point2D, A: Point2D, B: Point2D) {
        this.cv.sectoroidFill(O, A, B, [O])
    }

    /**
     * Fill a circle segment. AOB must be in polar direction.
     * ```
     * pen.fill.segment([0,0],[1,0],[0,1]) // fill a quarter circle segment
     * ```
     */
    segment(O: Point2D, A: Point2D, B: Point2D) {
        this.cv.sectoroidFill(O, A, B, [])
    }
    /**
     * Fill a sector-like area. AOB must be in polar direction.
     * ```
     * pen.fill.sectoroid([0,0],[1,0],[0,1],[[-1,0]]) // fill a long sector-like region
     * ```
     */
    sectoroid(O: Point2D, A: Point2D, B: Point2D, vertices: Point2D[]) {
        this.cv.sectoroidFill(O, A, B, vertices)
    }

    /**
     * Fill a rectangle.
     * ```
     * pen.fill.rect([0,0],[2,3]) // fill a rectangle [[0,0],[2,0],[2,3],[0,3]]
     * ```
     */
    rect(A: Point2D, C: Point2D) {
        let [a, b] = A
        let [c, d] = C
        this.pen.polyfill([a, b], [c, b], [c, d], [a, d])
    }
}
