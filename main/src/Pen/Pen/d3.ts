import { PenCls } from './core'
import { Convas } from 'paint'


export class PenD3 {

    constructor(
        private pen: PenCls,
        private cv: Convas
    ) { }

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
    circle(center: Point3D, radius: number, xVec: Point3D, yVec: Point3D, {
        line = true,
        dash = !true,
        shade = !true,
        fill = !true,
        arc = [0, 360]
    }: {
        line?: boolean
        dash?: boolean
        shade?: boolean
        fill?: boolean
        arc?: [number, number]
    } = {}): void {
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

        if (shade)
            this.pen.polyshade(...ps3D)

        if (fill)
            this.pen.polyfill(...ps3D)
    }


    /**
     * Draw a circle on XZ plane in 3D
     * ```
     * pen.d3.circleXZ([0,3,0],2) // draw a xz circle with radius 2
     * ```
     */
    circleXZ(center: Point3D, radius: number, {
        line = true,
        dash = !true,
        shade = !true,
        fill = !true,
        arc = [0, 360]
    }: {
        line?: boolean
        dash?: boolean
        shade?: boolean
        fill?: boolean
        arc?: [number, number]
    } = {}) {
        this.circle(center, radius, [1, 0, 0], [0, 0, 1], {
            line,
            dash,
            shade,
            fill,
            arc
        })
    }


    /**
     * Draw a circle on YZ plane in 3D
     * ```
     * pen.d3.circleYZ([3,0,0],2) // draw a yz circle with radius 2
     * ```
     */
    circleYZ(center: Point3D, radius: number, {
        line = true,
        dash = !true,
        shade = !true,
        fill = !true,
        arc = [0, 360]
    }: {
        line?: boolean
        dash?: boolean
        shade?: boolean
        fill?: boolean
        arc?: [number, number]
    } = {}) {
        this.circle(center, radius, [0, 1, 0], [0, 0, 1], {
            line,
            dash,
            shade,
            fill,
            arc
        })
    }



    /**
     * Draw a circle on XY plane in 3D
     * ```
     * pen.d3.circleXY([0,0,3],2) // draw a xy circle with radius 2
     * ```
     */
    circleXY(center: Point3D, radius: number, {
        line = true,
        dash = !true,
        shade = !true,
        fill = !true,
        arc = [0, 360]
    }: {
        line?: boolean
        dash?: boolean
        shade?: boolean
        fill?: boolean
        arc?: [number, number]
    } = {}) {
        this.circle(center, radius, [1, 0, 0], [0, 1, 0], {
            line,
            dash,
            shade,
            fill,
            arc
        })
    }


    /**
     * Draw a sphere in 3D
     * ```
     * pen.d3.sphere([1,0,0],3) // draw a sphere with radius 3
     * ```
     */
    sphere(center: Point3D, radius: number, {
        baseDash = !true,
        baseShade = !true,
        radiusLine = !true,
        radiusDash = !true,
        radiusLabel = '',
        lowerOnly = !true,
        upperOnly = !true
    } = {}): void {
        if (upperOnly)
            this.circleXZ(center, radius, { arc: [0, 180] })

        if (lowerOnly)
            this.circleXZ(center, radius, { arc: [180, 360] })

        if (!upperOnly && !lowerOnly)
            this.circleXZ(center, radius, { arc: [0, 360] })


        this.circleXY(center, radius, { line: true, dash: baseDash, shade: baseShade })

        let leftEnd = vec3D(center).add([radius, 0, 0]).toArray()

        if (radiusLine)
            this.pen.line(center, leftEnd)

        if (radiusDash)
            this.pen.dash(center, leftEnd)

        if (radiusLabel.length > 0)
            this.pen.label.line([leftEnd, center], radiusLabel)
    }


    /**
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
        const LB = toList(lowerBase)
        const UB = toList(upperBase)

        let isPolar = (A: Point3D, O: Point3D, B: Point3D) =>
            AnglePolar(
                this.cv.pj(A),
                this.cv.pj(O),
                this.cv.pj(B))
                < 180 ? 1 : -1

        let lastPolarwise = isPolar(LB.cyclicAt(-1)!, UB.cyclicAt(-1)!, LB.cyclicAt(0)!)
        let arr: [Point3D, Point3D][] = []

        for (let i = 0; i < LB.length; i++) {
            let polarwise = isPolar(LB.cyclicAt(i)!, UB.cyclicAt(i)!, LB.cyclicAt(i + 1)!)
            if (lastPolarwise * polarwise === -1)
                arr.push([LB.cyclicAt(i)!, UB.cyclicAt(i)!])
            lastPolarwise = polarwise
        }

        return arr
    }


    /**
     * Draw a frustum
     * ```
     * let [A,B,C] = [[0,0,0],[2,0,0],[0,2,0]]
     * let V = [0,0,5]
     * pen.d3.frustum([A,B,C],[V]) // draw a cone
     * ```
     */
    frustum(lowerBase: Point3D[], upperBase: Point3D[] | Point3D, {
        base = true,
        height = !true,
        shadeLower = !true,
        shadeUpper = !true,
        envelope = !true,
    } = {}) {


        if (owl.point3D(upperBase)) {
            upperBase = Array(lowerBase.length).fill(upperBase)
        }

        if (base) {
            this.pen.polygon(...lowerBase)
            this.pen.polygon(...upperBase)
        }

        if (envelope) {
            let env = this.envelope(lowerBase, upperBase)
            for (let e of env) {
                this.pen.line(e[0], e[1])
            }
        } else {
            for (let i = 0; i < lowerBase.length; i++) {
                this.pen.line(lowerBase[i], upperBase[i])
            }
        }

        if (height) {
            let V = toShape3D(upperBase).mean().toArray()
            let [A, B, C] = lowerBase
            let O = PdFoot3D(V, [A, B, C])
            this.pen.dash(O, V)
        }
        if (shadeLower)
            this.pen.polyshade(...lowerBase)
        if (shadeUpper)
            this.pen.polyshade(...upperBase)
    }


    /**
     * Draw a prism along the z-direction
     * ```
     * let [A,B,C] = [[0,0],[2,0],[0,2]]
     * pen.d3.prismZ([A,B,C],0,4) // draw a triangular prism
     * ```
     */
    prismZ(lowerBase: Point2D[], lowerZ: number, upperZ: number, {
        base = true,
        height = !true,
        shadeLower = !true,
        shadeUpper = !true,
        envelope = !true,
    } = {}) {
        let lower = EmbedZ(lowerBase, lowerZ)
        let upper = EmbedZ(lowerBase, upperZ)
        this.frustum(lower, upper, {
            base,
            height,
            shadeLower,
            shadeUpper,
            envelope
        })
    }



    /**
     * Draw a cylinder along the z-direction
     * ```
     * pen.d3.cylinderZ([0,0],2,0,4) // draw a cylinder
     * ```
     */
    cylinderZ(center: Point2D, radius: number, lowerZ: number, upperZ: number, {
        base = true,
        height = !true,
        shadeLower = !true,
        shadeUpper = !true,
        envelope = true,
    } = {}) {
        let ps = cal.traceCircle(center, radius, [0, 360])
        this.prismZ(ps, lowerZ, upperZ, {
            base,
            height,
            shadeLower,
            shadeUpper,
            envelope
        })
    }

    /**
     * Draw a pyramid along the z-direction
     * ```
     * let [A,B,C] = [[0,0],[2,0],[0,2]]
     * pen.d3.pyramidZ([A,B,C],0,[0,0,4]) // draw a triangular prism
     * ```
     */
    pyramidZ(lowerBase: Point2D[], lowerZ: number, vertex: Point3D, {
        base = true,
        height = !true,
        shadeLower = !true,
        envelope = !true,
    } = {}) {
        let lower = EmbedZ(lowerBase, lowerZ)
        this.frustum(lower, vertex, {
            base,
            height,
            shadeLower,
            envelope
        })
    }



    /**
     * Draw a cone along the z-direction
     * ```
     * pen.d3.coneZ([0,0],2,[0,0,4]) // draw a cone
     * ```
     */
    coneZ(center: Point2D, radius: number, lowerZ: number, vertex: Point3D, {
        base = true,
        height = !true,
        shadeLower = !true,
        envelope = true,
    } = {}) {
        let ps = cal.traceCircle(center, radius, [0, 360])
        this.pyramidZ(ps, lowerZ, vertex, {
            base,
            height,
            shadeLower,
            envelope
        })
    }

    /**
     * Draw a frustum along the z-direction
     * ```
     * let [A,B,C] = [[0,0],[2,0],[0,2]]
     * pen.d3.frustumZ([A,B,C],0,[0,0,4],0.25) // draw a triangular frustum
     * ```
     */
    frustumZ(lowerBase: Point2D[], lowerZ: number, vertex: Point3D, scale: number, {
        base = true,
        height = !true,
        shadeLower = !true,
        shadeUpper = !true,
        envelope = !true,
    } = {}) {
        let lower = EmbedZ(lowerBase, lowerZ)
        let upper = Extrude(lower, [vertex], scale)
        this.frustum(lower, upper, {
            base,
            height,
            shadeLower,
            shadeUpper,
            envelope
        })
    }



    /**
     * Draw a conical frustum along the z-direction
     * ```
     * pen.d3.conicalFrustumZ([0,0],2,[0,0,4],0.25) // draw a conical frustum
     * ```
     */
    conicalFrustumZ(center: Point2D, radius: number, lowerZ: number, vertex: Point3D, scale: number, {
        base = true,
        height = !true,
        shadeLower = !true,
        shadeUpper = !true,
        envelope = true,
    } = {}) {
        let ps = cal.traceCircle(center, radius, [0, 360])
        this.frustumZ(ps, lowerZ, vertex, scale, {
            base,
            height,
            shadeLower,
            shadeUpper,
            envelope
        })
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
        if (label !== undefined)
            this.pen.label.angle([P, O, Q], label)
        if (A !== undefined)
            this.pen.rightAngle(P, O, A)
        if (B !== undefined)
            this.pen.rightAngle(Q, O, B)
    }


    /**
     * Draw the dash height and right-angle.
     * ```
     * pen.d3.height([0,0,1],[0,0,0],[0,1,0])
     * ```
     */
    height(vertex: Point3D, foot: Point3D, leg: Point3D, label?: string) {
        this.pen.dash(vertex, foot)
        this.pen.rightAngle(vertex, foot, leg)
        this.pen.line(foot, leg)
        if (label !== undefined)
            this.pen.label.line([vertex, foot], label)
    }


    /**
     * Draw the solid height and right-angle.
     * ```
     * pen.d3.altitude([0,0,1],[0,0,0],[0,1,0])
     * ```
     */
    altitude(vertex: Point3D, foot: Point3D, leg: Point3D, label?: string) {
        this.pen.line(vertex, foot)
        this.pen.rightAngle(vertex, foot, leg)
        this.pen.line(foot, leg)
        if (label !== undefined)
            this.pen.label.line([vertex, foot], label)
    }


}