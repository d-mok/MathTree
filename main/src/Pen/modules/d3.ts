import { PenCls } from '../Pen.js'
import { Convas } from 'paint'
import _ from 'lodash'
import * as math from 'mathjs'

export class PenD3 {
    constructor(private pen: PenCls, private cv: Convas) {}

    /**
     * Draw the 3D axis, for development only.
     * @deprecated
     * ```
     * pen.d3.axis3D(100) // draw 3D axis with length 100
     * ```
     */
    axis3D(length: number = 999): void {
        this.pen.line([-length, 0, 0], [length, 0, 0])
        this.pen.line([0, -length, 0], [0, length, 0])
        this.pen.dash([0, 0, -length], [0, 0, length])
    }

    /**
     * Draw a circle in 3D
     * ```
     * pen.d3.circle([0,0,1],2,[1,0,0],[0,1,0]) // draw a xy circle with radius 2
     * ```
     */
    circle(
        center: Point3D,
        radius: number,
        xVec: Point3D,
        yVec: Point3D,
        {
            line = true,
            dash = !true,
            shade = !true,
            fill = !true,
            arc = [0, 360],
        }: {
            line?: boolean
            dash?: boolean
            shade?: boolean
            fill?: boolean
            arc?: [number, number]
        } = {}
    ): void {
        let ps = cal.traceCircle([0, 0], radius, arc)
        let ps3D = Embed(ps, center, xVec, yVec)

        if (line) {
            this.cv.save()
            if (dash) this.pen.set.dash(true)
            if (arc[1] - arc[0] >= 360) {
                this.pen.polygon(...ps3D)
            } else {
                this.pen.polyline(...ps3D)
            }
            this.cv.restore()
        }

        if (shade) this.pen.polyshade(...ps3D)

        if (fill) this.pen.polyfill(...ps3D)
    }

    /**
     * Draw a circle on XZ plane in 3D
     * ```
     * pen.d3.circleXZ([0,3,0],2) // draw a xz circle with radius 2
     * ```
     */
    circleXZ(
        center: Point3D,
        radius: number,
        {
            line = true,
            dash = !true,
            shade = !true,
            fill = !true,
            arc = [0, 360],
        }: {
            line?: boolean
            dash?: boolean
            shade?: boolean
            fill?: boolean
            arc?: [number, number]
        } = {}
    ) {
        this.circle(center, radius, [1, 0, 0], [0, 0, 1], {
            line,
            dash,
            shade,
            fill,
            arc,
        })
    }

    /**
     * Draw a circle on YZ plane in 3D
     * ```
     * pen.d3.circleYZ([3,0,0],2) // draw a yz circle with radius 2
     * ```
     */
    circleYZ(
        center: Point3D,
        radius: number,
        {
            line = true,
            dash = !true,
            shade = !true,
            fill = !true,
            arc = [0, 360],
        }: {
            line?: boolean
            dash?: boolean
            shade?: boolean
            fill?: boolean
            arc?: [number, number]
        } = {}
    ) {
        this.circle(center, radius, [0, 1, 0], [0, 0, 1], {
            line,
            dash,
            shade,
            fill,
            arc,
        })
    }

    /**
     * Draw a circle on XY plane in 3D
     * ```
     * pen.d3.circleXY([0,0,3],2) // draw a xy circle with radius 2
     * ```
     */
    circleXY(
        center: Point3D,
        radius: number,
        {
            line = true,
            dash = !true,
            shade = !true,
            fill = !true,
            arc = [0, 360],
        }: {
            line?: boolean
            dash?: boolean
            shade?: boolean
            fill?: boolean
            arc?: [number, number]
        } = {}
    ) {
        this.circle(center, radius, [1, 0, 0], [0, 1, 0], {
            line,
            dash,
            shade,
            fill,
            arc,
        })
    }

    /**
     * Draw a sphere in 3D
     * ```
     * pen.d3.sphere([1,0,0],3) // draw a sphere with radius 3
     * ```
     */
    sphere(
        center: Point3D,
        radius: number,
        {
            baseDash = !true,
            baseShade = !true,
            radiusLine = !true,
            radiusDash = !true,
            radiusLabel = '',
            lowerOnly = !true,
            upperOnly = !true,
        } = {}
    ): void {
        if (upperOnly) this.circleXZ(center, radius, { arc: [0, 180] })

        if (lowerOnly) this.circleXZ(center, radius, { arc: [180, 360] })

        if (!upperOnly && !lowerOnly)
            this.circleXZ(center, radius, { arc: [0, 360] })

        this.circleXY(center, radius, {
            line: true,
            dash: baseDash,
            shade: baseShade,
        })

        let leftEnd = VecAdd3D(center, [radius, 0, 0])

        if (radiusLine) this.pen.line(center, leftEnd)

        if (radiusDash) this.pen.dash(center, leftEnd)

        if (radiusLabel.length > 0)
            this.pen.label.line([leftEnd, center], radiusLabel)
    }

    /**
     * @deprecated - for dev only
     * Return the envelop of a frustum
     * @param lowerBase - the points in the lower base
     * @param upperBase - the point in the upper base, must have the same length as lowerBase
     * ```
     * let [A,B,C] = [[0,0,0],[1,0,0],[0,1,0]]
     * let [D,E,F] = [[0,0,3],[1,0,3],[0,1,3]]
     * pen.d3.envelope([A,B,C],[D,E,F])
     * ```
     */
    envelope(lowerBase: Point3D[], upperBase: Point3D[]): [Point3D, Point3D][] {
        const LB = lowerBase
        const UB = upperBase

        let isPolar = (A: Point3D, O: Point3D, B: Point3D) =>
            AnglePolar(this.cv.pj(A), this.cv.pj(O), this.cv.pj(B)) < 180
                ? 1
                : -1

        let lastPolarwise = isPolar(LB.at(-1)!, UB.at(-1)!, LB.at(0)!)
        let arr: [Point3D, Point3D][] = []

        for (let i = 0; i < LB.length; i++) {
            let polarwise = isPolar(LB.nth(i)!, UB.nth(i)!, LB.nth(i + 1)!)
            if (lastPolarwise * polarwise === -1)
                arr.push([LB.nth(i)!, UB.nth(i)!])
            lastPolarwise = polarwise
        }

        return arr
    }

    /**
     * Draw a solid
     * ```
     * let [A,B,C] = [[0,0,0],[2,0,0],[0,2,0]]
     * let V = [0,0,5]
     * pen.d3.solid([A,B,C],V) // draw a cone
     * ```
     */
    solid(
        lowerBase:
            | Point3D[]
            | Point2D[]
            | [center: Point3D, radius: number]
            | [center: Point2D, radius: number],
        upperBase:
            | Point3D[]
            | Point3D
            | [center: Point3D, radius: number]
            | [scale: number, vertex: Point3D]
            | number,
        {
            showUpper = true,
            showLower = true,
            shadeLower = !true,
            shadeUpper = !true,
            lowerZ = 0,
            height = !true,
            envelopeOnly,
        }: {
            showUpper?: boolean
            showLower?: boolean
            shadeLower?: boolean
            shadeUpper?: boolean
            lowerZ?: number
            height?: boolean
            envelopeOnly?: boolean
        } = {}
    ) {
        const isPoint3Ds = schema.be(schema.array(schema.point3D))
        const isPoint2Ds = schema.be(schema.array(schema.point2D))
        const isPoint3D = schema.be(schema.point3D)
        const isCircle3D = schema.be(schema.tuple([schema.point3D, schema.num]))
        const isCircle2D = schema.be(schema.tuple([schema.point2D, schema.num]))
        const isExtrue = schema.be(schema.tuple([schema.num, schema.point3D]))

        let LB: Point3D[] = []
        let UB: Point3D[] = []

        if (isPoint3Ds(lowerBase)) {
            LB.push(...lowerBase)
        } else if (isPoint2Ds(lowerBase)) {
            LB.push(...EmbedZ(lowerBase, lowerZ))
        } else if (isCircle3D(lowerBase)) {
            let [center, radius] = lowerBase
            let ps = cal.traceCircle([0, 0], radius, [0, 360])
            let ps3D = Embed(ps, center, [1, 0, 0], [0, 1, 0])
            LB.push(...ps3D)
        } else if (isCircle2D(lowerBase)) {
            let [[x, y], radius] = lowerBase
            let ps = cal.traceCircle([0, 0], radius, [0, 360])
            let ps3D = Embed(ps, [x, y, lowerZ], [1, 0, 0], [0, 1, 0])
            LB.push(...ps3D)
        } else {
            throw Error(
                'lowerBase must be Point3D[] | [center: Point3D, radius: number]'
            )
        }

        if (isPoint3Ds(upperBase)) {
            UB.push(...upperBase)
        } else if (isPoint3D(upperBase)) {
            UB.push(upperBase)
        } else if (isCircle3D(upperBase)) {
            let [center, radius] = upperBase
            let ps = cal.traceCircle([0, 0], radius, [0, 360])
            let ps3D = Embed(ps, center, [1, 0, 0], [0, 1, 0])
            UB.push(...ps3D)
        } else if (isExtrue(upperBase)) {
            let [scale, vertex] = upperBase
            UB.push(...Extrude(LB, [vertex], scale))
        } else if (typeof upperBase === 'number') {
            for (let [x, y] of LB) {
                UB.push([x, y, upperBase])
            }
        } else {
            throw Error(
                'upperBase must be Point3D[] | Point3D | [center: Point3D, radius: number] | [scale: number, vertex: Point3D] | number'
            )
        }

        if (showLower) this.pen.polygon(...LB)
        if (showUpper) this.pen.polygon(...UB)

        if (shadeLower) this.pen.polyshade(...LB)
        if (shadeUpper) this.pen.polyshade(...UB)

        envelopeOnly ??=
            isCircle3D(lowerBase) ||
            isCircle3D(upperBase) ||
            isCircle2D(lowerBase)

        if (envelopeOnly) {
            let env = this.envelope(LB, UB)
            for (let e of env) {
                this.pen.line(e[0], e[1])
            }
        } else {
            for (let i = 0; i < LB.length; i++) {
                this.pen.line(LB[i], UB.nth(i)!)
            }
        }

        if (height) {
            let V = vec.mean(UB)
            let [A, B, C] = LB
            let O = PdFoot3D(V, [A, B, C])
            this.pen.dash(O, V)
        }
    }

    /**
     * Draw the angle between two plane.
     * ```
     * let P = [0,0,1]
     * let O = [0,0,0]
     * let Q = [1,0,0]
     * let A = [0,1,0]
     * let B = [0,-1,0]
     * pen.d3.angleBet([P,O,Q], [A,B], 'x')
     * ```
     */
    angleBet(
        angle: [Point3D, Point3D, Point3D],
        line: [Point3D | undefined, Point3D | undefined],
        label?: string
    ) {
        let [P, O, Q] = angle
        let [A, B] = line
        this.pen.line(P, O)
        this.pen.line(Q, O)
        this.pen.angle(P, O, Q)
        if (label !== undefined) this.pen.label.angle([P, O, Q], label)
        if (A !== undefined) this.pen.rightAngle(P, O, A)
        if (B !== undefined) this.pen.rightAngle(Q, O, B)
    }

    /**
     * Draw the dash height and right-angle.
     * ```
     * pen.d3.drop([0,0,1],[0,0,0],[0,1,0])
     * ```
     */
    drop(vertex: Point3D, foot: Point3D, leg: Point3D, label?: string) {
        this.pen.dash(vertex, foot)
        this.pen.rightAngle(vertex, foot, leg)
        if (label !== undefined) this.pen.label.line([vertex, foot], label)
    }

    /**
     * Draw the dash height, right-angle and the leg.
     * ```
     * pen.d3.height([0,0,1],[0,0,0],[0,1,0])
     * ```
     */
    height(vertex: Point3D, foot: Point3D, leg: Point3D, label?: string) {
        this.pen.dash(vertex, foot)
        this.pen.rightAngle(vertex, foot, leg)
        this.pen.line(foot, leg)
        if (label !== undefined) this.pen.label.line([vertex, foot], label)
    }

    /**
     * Draw the solid height, right-angle and the leg.
     * ```
     * pen.d3.altitude([0,0,1],[0,0,0],[0,1,0])
     * ```
     */
    altitude(vertex: Point3D, foot: Point3D, leg: Point3D, label?: string) {
        this.pen.line(vertex, foot)
        this.pen.rightAngle(vertex, foot, leg)
        this.pen.line(foot, leg)
        if (label !== undefined) this.pen.label.line([vertex, foot], label)
    }
}
