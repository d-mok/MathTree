import { PenCls } from './Pen'


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





    /**
     * A plane making a turn.
     * Circular Motion.
     * ```
     * let pen = new PhyPen()
     * pen.AirplaneTurning({
     *   wingWidth = 7,
     *   planeRadius = 1,
     *   angle = 35,
     *   angleLabel = 'θ',
     *   weight = 4,
     *   weightLabel = 'mg',
     *   lift = 5,
     *   liftLabel = 'L',
     *   showAllForces = false
     * })
     * ```
     */
    AirplaneTurning({
        wingWidth = 7,
        planeRadius = 1,
        angle = 35,
        angleLabel = 'θ',
        weight = 4,
        weightLabel = 'mg',
        lift = 5,
        liftLabel = 'L',
        showAllForces = false
    }: {
        planeMid?: number
        wingWidth?: number
        planeRadius?: number
        angle?: number
        angleLabel?: string
        weight?: number
        weightLabel?: string
        lift?: number
        liftLabel?: string
        showAllForces?: boolean
    }) {
        let O: Point2D = [0, 0]

        // plane centre
        let P: Point2D = [- wingWidth, 0]
        let Q: Point2D = [+ wingWidth, 0];
        [P, Q] = [P, Q].map($ => Rotate($, angle, O))

        // mg
        let W = MoveY(O, -weight)

        // lift
        let N = Move(O, 90 + angle, lift)

        let pen = new Pen()

        pen.range.capture(P, Q, W, N)
        pen.size.lock(1.3)
        pen.set.labelCenter(O)
        pen.set.textLatex(true)

        pen.graph.circle(O, planeRadius)
        pen.shade.circle(O, planeRadius)
        pen.set.weight(3)
        pen.line(P, Q)
        pen.set.weight()
        pen.set.dash(true)
        pen.graph.horizontal(0)
        pen.set.dash()
        pen.angle(Q, O, [1, 0], angleLabel)

        if (showAllForces) {
            pen.set.weight(3)
            pen.set.color('red')
            pen.set.lineLabel('left')
            pen.arrow(O, W, weightLabel)
            pen.set.lineLabel()

            pen.set.weight(3)
            pen.set.color('purple')
            pen.arrow(O, N)
            pen.label.point(N, liftLabel)
            pen.set.weight(2)
            pen.arrowResolve(O, N, 90, angleLabel)
        }

        pen.autoCrop()
        this.pen = pen

    }




    /**
     * A conical pendulum.
     * Circular Motion.
     * ```
     * let pen = new PhyPen()
     * pen.ConicalPendulum({
     *    bobRadius = 1,
     *    length = 15,
     *    angle = 50,
     *    angleLabel = 'θ',
     *    weight = 7,
     *    weightLabel = 'mg',
     *    tension = 10,
     *    tensionLabel = 'T',
     *    showAllForces = false
     * })
     * ```
     */
    ConicalPendulum({
        bobRadius = 1,
        length = 15,
        angle = 50,
        angleLabel = 'θ',
        weight = 7,
        weightLabel = 'mg',
        tension = 10,
        tensionLabel = 'T',
        showAllForces = false
    }: {
        bobRadius?: number
        length?: number
        angle?: number
        angleLabel?: string
        weight?: number
        weightLabel?: string
        tension?: number
        tensionLabel?: string
        showAllForces?: boolean
    }) {
        let O: Point2D= [0, 0]
        let P: Point2D= Rotate([0, -length], angle, O)
        let V: Point2D= [0, P[1]]

        // weight
        let W: Point2D= MoveY(P, -weight)

        // tension
        let T: Point2D= Move(P, 90 + angle, tension)


        let pen = new Pen()

        pen.set.border(0.3)
        pen.range.capture(O, P, V, ReflectY(P), W)
        pen.size.lock(1)
        pen.set.textLatex(true)

        pen.set.color('grey')
        pen.plotDash(t => [P[0] * cos(t) + V[0], 1 * sin(t) + V[1]], 0, 360)
        pen.set.color()
        pen.dash(O, V)
        pen.line(O, P)
        pen.fill.circle(P, bobRadius)
        pen.angle(P, O, V, angleLabel)

        if (showAllForces) {
            // weight
            pen.set.color('red')
            pen.set.weight(3)
            pen.arrow(P, W, weightLabel)

            // tension
            pen.set.color('blue')
            pen.arrow(P, T,)
            pen.set.weight(2)
            pen.arrowResolve(P, T, 90, angleLabel)
            pen.set.weight()
            pen.label.point(T, tensionLabel)

        }

        pen.autoCrop()
        this.pen = pen


    }


}
