import { PenCls } from './Pen'


/**
 * @category DrawingPen
 */
export class PhyPenCls {
    /**
     * @ignore
     */
    private pen: PenCls

    /**
     * @ignore
     */
    constructor() {
        this.pen = new Pen()
    }

    /**
     * Export the canvas to image tag.
     * @category export
     * @param html - The html string to export to.
     * @param placeholder - The src field of the image tag to export to.
     * @returns The new html with src field pasted.
     * ```
     * question = autoPen.export(question,'imgQ') 
     * // paste the canvas to the image tag with src field 'imgQ'
     * ```
     */
    export(html: string, placeholder: string) {
        return this.pen.export(html, placeholder)
    }





    /**
     * A car on a banked road.
     * Circular Motion.
     * @category tool
     * @returns void
     * ```
     * let pen = new PhyPen()
     * pen.CarOnBankedRoad({
     *  carMid : 10,
     *  carWidth : 3,
     *  wheelHeight : 1,
     *  carHeight : 2,
     *  angle : 25,
     *  angleLabel : 'θ',
     *  weight : 4,
     *  weightLabel : 'mg',
     *  normal : 5,
     *  normalLabel : 'R',
     *  friction : 0,
     *  frictionLabel : 'f',
     *  showAllForces : false
     * })
     * ```
     */
    CarOnBankedRoad({
        carMid = 10,
        carWidth = 3,
        wheelHeight = 1,
        carHeight = 2,
        angle = 25,
        angleLabel = 'θ',
        weight = 4,
        weightLabel = 'mg',
        normal = 5,
        normalLabel = 'R',
        friction = 0,
        frictionLabel = 'f',
        showAllForces = false
    }: {
        carMid?: number
        carWidth?: number
        wheelHeight?: number
        carHeight?: number
        angle?: number
        angleLabel?: string
        weight?: number
        weightLabel?: string
        normal?: number
        normalLabel?: string
        friction?: number
        frictionLabel?: string
        showAllForces?: boolean
    }) {


        let O: Point2D = [0, 0]
        let l = carMid - carWidth / 2
        let r = carMid + carWidth / 2

        // wheels
        let A: Point2D = [l, 0]
        let B: Point2D = [r, 0]

        // car body
        let P = MoveY(A, wheelHeight)
        let Q = MoveY(P, carHeight)
        let R = MoveY(B, wheelHeight)
        let S = MoveY(R, carHeight);

        [A, B, P, Q, R, S] = [A, B, P, Q, R, S].map($ => Rotate($, angle, O))

        // road
        let Z: Point2D = [2 * r, 0]
        let Y = Rotate(Z, angle, O)

        // mg
        let G = Mid(P, Q, R, S)
        let W = MoveY(G, -weight)

        // normal reaction
        let N = Move(G, 90 + angle, normal)

        // friction
        let g = friction > 0 ? A : B
        let f = Move(g, friction > 0 ? 180 + angle : angle, Math.abs(friction))

        let pen = new Pen()

        pen.range.capture(O, A, B, P, Q, R, S, N, f)
        pen.size.lock(1.3)
        pen.set.labelCenter(G)
        pen.set.textLatex(true)

        pen.polygon(P, Q, S, R)
        pen.line(O, Z)
        pen.line(O, Y)
        pen.angle(Y, O, Z, angleLabel)
        pen.set.weight(4)
        pen.line(A, P)
        pen.line(B, R)

        if (showAllForces) {
            pen.set.weight(3)
            pen.set.color('red')
            pen.set.lineLabel('left')
            pen.arrow(G, W, weightLabel)
            pen.set.lineLabel()


            pen.set.weight(3)
            pen.set.color('purple')
            pen.arrow(G, N)
            pen.label.point(N, normalLabel)
            pen.set.weight(2)
            pen.arrowResolve(G, N, 90, angleLabel)

            if (friction !== 0) {
                pen.set.weight(3)
                pen.set.color('blue')
                pen.arrow(g, f)
                pen.label.point(f, frictionLabel)
                pen.set.weight(2)
                pen.arrowResolve(g, f, 0, angleLabel)
            }
        }

        pen.autoCrop()
        this.pen = pen

    }


}

