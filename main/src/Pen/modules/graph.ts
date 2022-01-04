import { PenCls } from '../Pen'
import { Convas } from 'paint'


export class PenGraph {

    constructor(
        private pen: PenCls,
        private cv: Convas
    ) { }


    /**
     * Draw a circle (x-h)^2+(y-k)^2 = r^2.
     * ```
     * pen.graph.circle([1,2],3) // (x-1)^2+(y-2)^2 = 9
     * ```
     */
    circle(center: Point2D, radius: number) {
        const [h, k] = center
        this.pen.plot(t => [h + radius * cos(t), k + radius * sin(t)], 0, 365)
    }

    /**
     * Draw an arc. AOB must be in polar direction.
     * ```
     * pen.graph.arc([0,0],[1,0],[-1,0]) // upper semi-unit circle
     *
     * ```
     */
    arc(O: Point2D, A: Point2D, B: Point2D) {
        this.cv.sectoroidLine(O, A, B, [])
    }

    /**
     * Draw a sector. AOB must be in polar direction.
     * ```
     * pen.graph.sector([0,0],[1,0],[0,1]) // quarter circle sector
     * ```
     */
    sector(O: Point2D, A: Point2D, B: Point2D) {
        this.cv.sectoroidLine(O, A, B, [O, A])
    }

    /**
     * Draw a circle segment. AOB must be in polar direction.
     * ```
     * pen.graph.segment([0,0],[1,0],[0,1]) // quarter circle segment
     * ```
     */
    segment(O: Point2D, A: Point2D, B: Point2D) {
        this.cv.sectoroidLine(O, A, B, [A])
    }

    /**
     * Draw a quadratic graph.
     * ```
     * pen.graph.quadratic(1,2,3) // y=x^2+2x+3.
     * ```
     */
    quadratic(a: number, b: number, c: number) {
        this.pen.plot(x => a * x * x + b * x + c)
    }

    /**
     * Draw a line y=mx+c.
     * ```
     * pen.graph.line(2,1) // y=2x+1
     * ```
     */
    line(m: number, c: number) {
        const { xmin, xmax } = this.cv
        const y = (x: number) => m * x + c
        this.pen.line([xmin, y(xmin)], [xmax, y(xmax)])
    }

    /**
     * Draw a horizontal line.
     * ```
     * pen.graph.horizontal(2) // y=2
     * ```
     */
    horizontal(y: number) {
        this.cv.lineHori(y)
    }

    /**
     * Draw a vertical line.
     * ```
     * pen.graph.vertical(2) // x=2
     * ```
     */
    vertical(x: number) {
        this.cv.lineVert(x)
    }

    /**
     * Draw a line ax+by+c=0.
     * ```
     * pen.graph.linear(1,2,3) // x+2y+3=0
     * ```
     */
    linear(a: number, b: number, c: number) {
        if (a === 0 && b !== 0) this.horizontal(-c / b)
        if (b == 0 && a !== 0) this.vertical(-c / a)
        if (a !== 0 && b !== 0) this.line(-a / b, -c / b)
    }

    /**
     * Draw a line through two points.
     * ```
     * pen.graph.through([0,0],[1,1]) // y = x
     * ```
     */
    through(A: Point, B: Point) {
        let ptA = this.cv.pj(A)
        let ptB = this.cv.pj(B)
        let [a, b, c] = lin().byTwoPoints(ptA, ptB).toLinear()
        this.linear(a, b, c)
    }

    /**
     * Draw the perpendicular bisector of two points.
     * ```
     * pen.graph.perpBisector([0,0],[2,2]) // y = -x+2
     * ```
     */
    perpBisector(A: Point2D, B: Point2D) {
        let [a, b, c] = lin().byBisector(A, B).toLinear()
        this.linear(a, b, c)
    }


    /**
     * Draw a rectangle.
     * ```
     * pen.graph.rect([0,0],[2,3]) // draw a rectangle [[0,0],[2,0],[2,3],[0,3]]
     * ```
     */
    rect(A: Point2D, C: Point2D) {
        let [a, b] = A
        let [c, d] = C
        this.pen.polygon([a, b], [c, b], [c, d], [a, d])
    }


}