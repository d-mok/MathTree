import { PenCls } from '../Pen'
import { capturable, Convas } from 'paint'


export class PenRange {

    constructor(
        private pen: PenCls,
        private cv: Convas
    ) { }


    /**
     * Set the coordinate range.
     * ```
     * pen.range.set([-5,5],[-2,4]) // -5<x<5 and -2<y<4
     * ```
     */
    set(
        [xmin, xmax]: [number, number],
        [ymin, ymax]: [number, number] = [xmin, xmax]
    ) {
        this.cv.xmin = xmin
        this.cv.xmax = xmax
        this.cv.ymin = ymin
        this.cv.ymax = ymax
        this.cv.RANGE_DONE = true
    }

    /**
     * Set the coordinate range as a square.
     * ```
     * pen.range.square(5) // -5<x<5 and -5<y<5
     * pen.range.square(5,[1,2]) // -4<x<6 and -3<y<7
     * ```
     */
    square(size: number, [x, y]: Point2D = [0, 0]) {
        this.set([x - size, x + size], [y - size, y + size])
    }

    /**
     * Set the coordinate range by capture points or objects.
     * ```
     * pen.range.capture([1,2],[3,4]) //  [1,2], [3,4] must be in-view
     * pen.range.capture([[1,2],3]) //  [1-3,2-3], [1+3,2+3] must be in-view
     * // point | circle [[h,k],r] | sphere [[a,b,c],r]
     * ```
     */
    capture(...things: any[]) {
        if (things.some($ => Array.isArray($) && $.length === 4))
            throw 'capture quad'
        if (things.some($ => Array.isArray($) && owl.point2D($[0])))
            throw 'capture circle'
        if (things.some($ => Array.isArray($) && owl.point3D($[0])))
            throw 'capture sphere'
        this.cv.capture(things)
        this.cv.AUTO_BORDER = true
    }

    /**
     * Set the coordinate range by capturing a circle.
     * ```
     * pen.range.captureCircle([1,2], 3)
     * ```
     */
    captureCircle(center: Point2D, radius: number) {
        this.cv.capture([[center, radius]])
        this.cv.AUTO_BORDER = true
    }

    /**
     * Set the coordinate range by capturing a sphere.
     * ```
     * pen.range.captureSphere([0,0,0], 3)
     * ```
     */
    captureSphere(center: Point3D, radius: number) {
        this.cv.capture([[center, radius]])
        this.cv.AUTO_BORDER = true
    }


    private capQuadX(a: number, b: number, c: number) {
        if (Discriminant(a, b, c) >= 0) {
            let [p, q] = QuadraticRoot(a, b, c)
            this.cv.capture([[p, 0], [q, 0]])
        }
    }

    private capQuadY(a: number, b: number, c: number) {
        this.cv.capture([[0, c]])
    }


    private capQuadV(a: number, b: number, c: number) {
        this.cv.capture([['quadratic', a, b, c, 1]])
    }

    /**
     * Set the coordinate range by capturing a quadratic graph (with vertex and x-int if any).
     * ```
     * pen.range.captureQuadX(1,2,3) // y=x^2+2x+3
     * ```
     */
    captureQuadX(a: number, b: number, c: number) {
        this.capQuadV(a, b, c)
        this.capQuadX(a, b, c)
        this.cv.AUTO_BORDER = true
    }

    /**
     * Set the coordinate range by capturing a quadratic graph (with vertex and y-int).
     * ```
     * pen.range.captureQuadY(1,2,3) // y=x^2+2x+3
     * ```
     */
    captureQuadY(a: number, b: number, c: number) {
        this.capQuadV(a, b, c)
        this.capQuadY(a, b, c)
        this.cv.AUTO_BORDER = true
    }

    /**
     * Set the coordinate range by capturing a quadratic graph (with vertex).
     * ```
     * pen.range.captureQuadV(1,2,3) // y=x^2+2x+3
     * ```
     */
    captureQuadV(a: number, b: number, c: number) {
        this.capQuadV(a, b, c)
        this.cv.AUTO_BORDER = true
    }

    /**
     * Set the coordinate range by capturing a quadratic graph (with vertex, y-int and x-int if any).
     * ```
     * pen.range.captureQuad(1,2,3) // y=x^2+2x+3
     * ```
     */
    captureQuad(a: number, b: number, c: number) {
        this.capQuadV(a, b, c)
        this.capQuadX(a, b, c)
        this.capQuadY(a, b, c)
        this.cv.AUTO_BORDER = true
    }

    // captureLine(m: number, c: number) {
    //     let x = -c / m
    //     if (m === 0) {
    //         this.cv.capture([[0, c]])
    //     } else {
    //         this.cv.capture([[x, 0], [0, c]])
    //     }
    //     this.cv.AUTO_BORDER = true
    // }


    /**
     * Set the coordinate range by capture points or objects, include O(0,0).
     * ```
     * pen.range.extend([1,2],[3,4]) // [0,0], [1,2], [3,4] must be in-view
     * // point | circle [[h,k],r] | sphere [[a,b,c],r]
     * ```
     */
    extend(...things: capturable[]) {
        this.capture([0, 0], ...things)
    }


    /**
     * Set the coordinate range by capturing a circle, include O(0,0).
     * ```
     * pen.range.extendCircle([1,2], 3)
     * ```
     */
    extendCircle(center: Point2D, radius: number) {
        this.cv.capture([[0, 0]])
        this.cv.capture([[center, radius]])
        this.cv.AUTO_BORDER = true
    }




}