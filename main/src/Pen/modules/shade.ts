import { PenCls } from '../Pen'
import { Convas } from 'paint'

export class PenShade {
    constructor(private pen: PenCls, private cv: Convas) {}

    /**
     * Shade a circle (x-h)^2+(y-k)^2 = r^2.
     * ```
     * pen.shade.circle([1,2],3) // shade (x-1)^2+(y-2)^2 = 9.
     * ```
     */
    circle(center: Point2D, radius: number) {
        let points = cal.traceCircle(center, radius, [0, 360])
        this.pen.polyshade(...points)
    }

    /**
     * Shade a sector. AOB must be in polar direction.
     * ```
     * pen.shade.sector([0,0],[1,0],[0,1]) // shade a quarter circle sector
     * ```
     */
    sector(O: Point2D, A: Point2D, B: Point2D) {
        this.cv.sectoroidShade(O, A, B, [O])
    }

    /**
     * Shade a circle segment. AOB must be in polar direction.
     * ```
     * pen.shade.segment([0,0],[1,0],[0,1]) // shade a quarter circle segment
     * ```
     */
    segment(O: Point2D, A: Point2D, B: Point2D) {
        this.cv.sectoroidShade(O, A, B, [])
    }

    /**
     * Shade a sector-like area. AOB must be in polar direction.
     * ```
     * pen.shade.sectoroid([0,0],[1,0],[0,1],[[-1,0]]) // shade a long sector-like region
     * ```
     */
    sectoroid(O: Point2D, A: Point2D, B: Point2D, vertices: Point2D[]) {
        this.cv.sectoroidShade(O, A, B, vertices)
    }

    /**
     * Shade a rectangle.
     * ```
     * pen.shade.rect([0,0],[2,3]) // shade a rectangle [[0,0],[2,0],[2,3],[0,3]]
     * ```
     */
    rect(A: Point2D, C: Point2D) {
        let [a, b] = A
        let [c, d] = C
        this.pen.polyshade([a, b], [c, b], [c, d], [a, d])
    }
}
