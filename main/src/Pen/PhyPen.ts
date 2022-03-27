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
        return this.pen.exportTrim(html, placeholder)
    }

    /**
     * Return the originally pen object.
     * ```
     * let pen2 = pen.exposePen()
     * ```
     */
    exposePen(): PenCls {
        return this.pen
    }

    /**
     * Box on incline plane.
     * Force.
     * ```
     * let pen = new PhyPen()
     * pen.InclinedPlane({
     *  boxMid: 10,
     *  boxWidth: 6,
     *  boxHeight: 3,
     *  angle: 30,
     *  angleLabel: 'θ',
     *  weight: 5,
     *  weightLabel: 'mg',
     *  weightXLabel: 'mg\\sinθ',
     *  weightYLabel: 'mg\\cosθ',
     *  weightAngleLabel: true,
     *  normal: 4,
     *  normalLabel: 'R',
     *  friction: 0,
     *  frictionLabel: 'f',
     *  applied: 0,
     *  appliedLabel: 'F',
     *  appliedXLabel: 'F\\cosφ',
     *  appliedYLabel: 'F\\sinφ',
     *  appliedAngle: 0,
     *  appliedAngleLabel: 'φ',
     *  showForces: false,
     *  showWeightCompo: false,
     *  showAppliedCompo: false
     * })
     * ```
     */
    InclinedPlane({
        boxMid = 10,
        boxWidth = 6,
        boxHeight = 3,
        length = boxMid * 2,
        angle = 30,
        angleLabel = 'θ',
        weight = 5,
        weightLabel = 'mg',
        weightXLabel = 'mg\\sinθ',
        weightYLabel = 'mg\\cosθ',
        weightAngleLabel = true,
        normal = 4,
        normalLabel = 'R',
        friction = 0,
        frictionLabel = 'f',
        applied = 0,
        appliedLabel = 'F',
        appliedXLabel = 'F\\cosφ',
        appliedYLabel = 'F\\sinφ',
        appliedAngle = 0,
        appliedAngleLabel = 'φ',
        showForces = false,
        showWeightCompo = showForces,
        showAppliedCompo = showForces
    }: {
        boxMid?: number
        boxWidth?: number
        boxHeight?: number
        length?: number
        angle?: number
        angleLabel?: string
        weight?: number
        weightLabel?: string
        weightXLabel?: string
        weightYLabel?: string
        weightAngleLabel?: string | boolean
        normal?: number
        normalLabel?: string
        friction?: number
        frictionLabel?: string
        applied?: number
        appliedLabel?: string
        appliedXLabel?: string
        appliedYLabel?: string
        appliedAngle?: number
        appliedAngleLabel?: string | boolean
        showForces?: boolean
        showWeightCompo?: boolean
        showAppliedCompo?: boolean
    }) {


        let O: Point2D = [0, 0]
        let l = boxMid - boxWidth / 2
        let r = boxMid + boxWidth / 2

        // car body
        let P: Point2D = [l, 0]
        let Q = MoveY(P, boxHeight)
        let R: Point2D = [r, 0]
        let S = MoveY(R, boxHeight);

        [P, Q, R, S] = [P, Q, R, S].map($ => Rotate($, angle, O))

        // road
        let Z: Point2D = [length, 0]
        let Y = Rotate(Z, angle, O)
        Z = [Y[0], 0]

        // mg
        let G = Mid(P, Q, R, S)
        let W = MoveY(G, -weight)

        // normal reaction
        let M = Slide(P, R, 0.6)
        let N = Move(M, 90 + angle, normal)

        // friction
        let g = friction < 0 ? P : R
        let f = Move(g, friction < 0 ? 180 + angle : angle, Math.abs(friction))

        // applied force
        let E = S
        let F = Move(E, angle + appliedAngle, applied)
        let apA = applied === 0 ? 0 : Dir(E, F)
        if (apA > angle + 90 && apA < angle + 270) {
            F = Rotate(F, 180, E);
            [E, F] = [F, E]
        }

        let pen = new Pen()

        pen.set.border(0.5)
        pen.range.capture(O, P, Q, R, S, N, f, E, F, Y, Z)
        pen.size.lock(1.8)
        pen.set.labelCenter(G)
        pen.set.textLatex(true)

        pen.polygon(P, Q, S, R)
        pen.polygon(O, Y, Z)
        pen.angle(Y, O, Z, angleLabel)
        pen.set.weight(4)

        if (showForces) {
            pen.set.arrowLabel('head')

            // weight
            if (weight !== 0) {
                pen.set.weight(3)
                pen.set.color('red')
                pen.arrow(G, W, weightLabel)

                if (showWeightCompo) {
                    pen.set.labelCenter(G)
                    pen.set.weight(2)
                    pen.set.color('red')
                    pen.set.dash(true)
                    // mgsin
                    pen.arrowCompo(G, W, angle, weightXLabel)
                    // mgcos
                    let a: string | undefined
                    if (weightAngleLabel === true) a = angleLabel
                    if (weightAngleLabel === false) a = undefined
                    if (typeof weightAngleLabel === 'string') a = weightAngleLabel
                    pen.arrowCompo(G, W, angle + 90, weightYLabel, a)
                    pen.set.labelCenter()
                    pen.set.dash()
                }
            }

            // normal

            if (normal !== 0) {
                pen.set.weight(3)
                pen.set.color('purple')
                pen.arrow(M, N, normalLabel)
            }


            // friction
            if (friction !== 0) {
                pen.set.weight(3)
                pen.set.color('blue')
                pen.arrow(g, f, frictionLabel)
            }


            // applied
            if (applied !== 0) {
                pen.set.labelCenter(R, S)
                pen.set.weight(3)
                pen.set.color('grey')
                pen.arrow(E, F, appliedLabel)

                // applied comp
                if (showAppliedCompo) {
                    pen.set.labelCenter(E)
                    pen.set.weight(2)
                    pen.set.dash(true)
                    // Fsin
                    pen.arrowCompo(E, F, angle + 90, appliedYLabel)
                    // Fcos
                    let a: string | undefined
                    if (appliedAngleLabel === true) a = ''
                    if (appliedAngleLabel === false) a = undefined
                    if (typeof appliedAngleLabel === 'string') a = appliedAngleLabel
                    pen.arrowCompo(E, F, angle, appliedXLabel, a)
                    pen.set.dash()
                }
                pen.set.labelCenter()
            }

        }

        this.pen = pen

    }



    /**
     * A projectile trajectory.
     * ```
     * let pen = new PhyPen()
     * pen.Projectile({
     *    speed: 20,
     *    angle: 50,
     *    time: 4,
     *    arrowScale: 0.5,
     *    ground: false
     * })
     * ```
     */
    Projectile({
        speed,
        angle = 0,
        time,
        arrowScale = 0.5,
        ground = false,
    }: {
        speed: number
        angle?: number
        time?: number
        arrowScale?: number
        ground?: boolean
    }) {
        let pen = new Pen()

        let ux = speed * cos(angle)
        let uy = speed * sin(angle)

        time ??= 2 * uy / 9.81

        let x = (t: number) => ux * t
        let y = (t: number) => uy * t - 0.5 * 9.81 * t * t

        let O: Point2D = [0, 0]
        let U: Point2D = [ux * arrowScale, uy * arrowScale]
        let P: Point2D = [x(time), y(time)]

        pen.range.capture(O, U, P)
        pen.size.lock(1.5)

        pen.disc(O, 5)
        pen.arrow(O, U)
        pen.set.color('grey')
        pen.plotDash(t => [x(t), y(t)], 0, time)
        pen.circle(P, 5)
        if (ground) {
            pen.graph.horizontal(0)
        }

        this.pen = pen
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
            pen.arrowResolve(G, N, 90, [], angleLabel)

            if (friction !== 0) {
                pen.set.weight(3)
                pen.set.color('blue')
                pen.arrow(g, f)
                pen.label.point(f, frictionLabel)
                pen.set.weight(2)
                pen.arrowResolve(g, f, 0, [], angleLabel)
            }
        }

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
            pen.arrowResolve(O, N, 90, [], angleLabel)
        }

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
        let O: Point2D = [0, 0]
        let P: Point2D = Rotate([0, -length], angle, O)
        let V: Point2D = [0, P[1]]

        // weight
        let W: Point2D = MoveY(P, -weight)

        // tension
        let T: Point2D = Move(P, 90 + angle, tension)


        let pen = new Pen()

        pen.set.border(0.3)
        pen.range.capture(O, P, V, ReflectY(P), W)
        pen.size.lock(1.3)
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
            pen.arrowResolve(P, T, 90, [], angleLabel)
            pen.set.weight()
            pen.label.point(T, tensionLabel)

        }

        this.pen = pen


    }





    /**
     * A satellite orbits around a planet.
     * Gravitation.
     * ```
     * let pen = new PhyPen()
     * pen.SatelliteOrbit({
     *    planetRadius = 1.3,
     *    orbitRadius = 2,
     *    angle = 30,
     * })
     * ```
     */
    SatelliteOrbit({
        planetRadius = 1.3,
        orbitRadius = 2,
        angle = 30,
        showHeight = false
    }: {
        planetRadius?: number
        orbitRadius?: number
        angle?: number
        showHeight?: boolean
    }) {

        let pen = new Pen()
        let O: Point2D = [0, 0]
        //satellite
        let P: Point2D = PolToRect([orbitRadius, angle])
        // r line
        let Q: Point2D = PolToRect([orbitRadius, -angle])
        // R line
        let A: Point2D = [-planetRadius, 0]
        // h line
        let B: Point2D = PolToRect([planetRadius, angle])
        // M label
        let C: Point2D = [0, -planetRadius]

        pen.range.captureCircle(O, orbitRadius)
        pen.size.set(1.2)

        pen.shade.circle(O, planetRadius)
        pen.graph.circle(O, planetRadius)
        pen.label.point(C, 'M', 270)
        pen.point(P, 'm')
        pen.point(O)
        if (showHeight) {
            pen.set.color('red')
            pen.line(B, P, 'h')
        }
        pen.set.color('blue')
        pen.line(O, Q, 'r')
        pen.set.color('grey')
        pen.line(O, A, 'R')
        pen.set.color()
        pen.set.dash(true)
        pen.graph.circle(O, orbitRadius)

        this.pen = pen
    }












    /**
     * Refraction between two media.
     * ```
     * let pen = new PhyPen()
     * pen.RefractionMedia({
     *  rays: [
     *     [60,true,'a','b'],
     *     [250, false, false, true],
     *  ],
     *  upMedLabel: 'A',
     *  lowMedLabel: 'B',
     *  upMedColor: 'white',
     *  lowMedColor: 'black',
     *  roundTo: 5
     * })
     * ```
     */
    RefractionMedia(
        {
            rays = [],
            upMedLabel = '',
            lowMedLabel = '',
            upMedColor = 'white',
            lowMedColor = 'black',
            roundTo = 5
        }: {
            rays: [dir: number, to: boolean, angleV: boolean | string, angleH: boolean | string][]
            upMedLabel: string
            lowMedLabel: string
            upMedColor: string
            lowMedColor: string
            roundTo: number
        }) {

        let O: Point2D = [0, 0]

        // pen setup
        let pen = new Pen()
        pen.range.square(10)
        pen.size.lock(1.5)

        //shade media
        pen.set.color(upMedColor)
        pen.linProg.shadeConstraints([[0, 1, '>', 0]])
        pen.set.color(lowMedColor)
        pen.linProg.shadeConstraints([[0, 1, '<', 0]])
        pen.set.color()

        //normal
        pen.rod.dash(O, 90, 10)
        pen.rod.dash(O, -90, 10)

        //label the medium
        let B: Point2D = [-10, 0]
        pen.label.point(B, upMedLabel, 45, 20)
        pen.label.point(B, lowMedLabel, -45, 20)

        function angleWtihYAxis(dir: number) {
            dir = PolarReduce(dir)
            return Math.min(
                Math.abs(dir - 90),
                Math.abs(dir - 270)
            )
        }

        function angleWtihXAxis(dir: number) {
            return 90 - angleWtihYAxis(dir)
        }


        for (let ray of rays) {
            let [dir, isTo, angleV, angleH] = ray
            dir = PolarReduce(dir)

            //draw ray
            isTo
                ? pen.rod.rayTo(O, dir)
                : pen.rod.rayFrom(O, dir)

            // draw angle with vertical
            if (angleV !== undefined && angleV !== false) {
                let V: Point2D = [0, sin(dir)]
                let label = angleV === true
                    ? angleWtihYAxis(dir)
                    : angleV
                if (typeof label === 'number')
                    label = Round(label, roundTo)
                pen.angleDir(V, O, dir, label)
            }

            // draw angle with horizontal
            if (angleH !== undefined && angleH !== false) {
                let H: Point2D = [cos(dir), 0]
                let label = angleH === true
                    ? angleWtihXAxis(dir)
                    : angleH
                if (typeof label === 'number')
                    label = Round(label, roundTo)
                pen.angleDir(H, O, dir, label)
            }

        }
        this.pen = pen
    }




}

