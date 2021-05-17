/**
* @category 3DPen
* @deprecated use Projector3D() instead
* @return projector function from 3D point to 2D plane
* ```
* const pj = Projector(60,0.5) // create a 3D projector function
* pj(1,1,0) // [1.25, 0.433012701892]
* ```
*/
function Projector(angle: number = 60, depth: number = 0.5) {
    return function (x: number, y: number, z: number): Point {
        let x_new = x + depth * y * cos(angle)
        let y_new = z + depth * y * sin(angle)
        return [x_new, y_new]
    }
}
globalThis.Projector = Projector



/**
* @category 3DPen
* @return projector function from 3D point to 2D plane
* ```
* const pj = Projector3D(60,0.5) // create a 3D projector function
* pj([1,1,0]) // [1.25, 0.433012701892]
* ```
*/
function Projector3D(angle: number = 60, depth: number = 0.5): (_: Point3D) => Point {
    let projector = function (point3D: Point3D): Point {
        let [x, y, z] = point3D
        let x_new = x + depth * y * cos(angle)
        let y_new = z + depth * y * sin(angle)
        return [x_new, y_new]
    }
    return contract(projector).sign([owl.point3D])
}
globalThis.Projector3D = contract(Projector3D).sign([owl.num, owl.num])



class Pen3DCls {
    constructor(
        public pen: PenCls,
        public py: (_: Point3D) => Point
    ) { }


    line(startPoint: Point3D, endPoint: Point3D): void {
        this.pen.line(this.py(startPoint), this.py(endPoint))
    }

    dash(startPoint: Point3D, endPoint: Point3D): void {
        this.pen.dash(this.py(startPoint), this.py(endPoint))
    }



    axis3D(length: number = 999): void {
        this.line([-length, 0, 0], [length, 0, 0])
        this.line([0, -length, 0], [0, length, 0])
        this.dash([0, 0, -length], [0, 0, length])
    }




    shape(point3Ds: Point3D[], {
        line = true,
        dash = !true,
        shade = !true,
        fill = !true
    } = {}): void {
        if (dash) line = false
        let ps = point3Ds.map(p => this.py(p))

        if (line) {
            this.pen.polygon(...ps)
        }

        if (dash) {
            this.pen.ctx.save()
            this.pen.set.dash(true)
            this.pen.polygon(...ps)
            this.pen.ctx.restore()
        }

        if (shade)
            this.pen.polyshade(...ps)

        if (fill)
            this.pen.polyfill(...ps)

    }

    private _circleFunc(tracing: (t: number) => Point3D) {
        return (center: Point3D, radius: number, {
            line = true,
            dash = !true,
            shade = !true,
            fill = !true,
            arc = [0, 360]
        } = {}): void => {
            let [x, y, z] = center
            let ps = Trace3D(tracing, arc[0], arc[1])
            ps = ps.map(p => [p[0] * radius, p[1] * radius, p[2] * radius])
            ps = ps.map(p => [p[0] + x, p[1] + y, p[2] + z])
            this.shape(ps, {
                line,
                dash,
                shade,
                fill
            })
        }
    }

    xzCircle = this._circleFunc(t => [cos(t), 0, sin(t)])
    xyCircle = this._circleFunc(t => [cos(t), sin(t), 0])
    yzCircle = this._circleFunc(t => [0, cos(t), sin(t)])

    sphere(center: Point3D, radius: number, {
        showCenter = !true,
        baseDash = !true,
        baseShade = !true,
        radiusLine = !true,
        radiusDash = !true,
        radiusLabel = '',
        lowerOnly = !true,
        upperOnly = !true
    } = {}): void {
        if (upperOnly)
            this.xzCircle(center, radius, { arc: [0, 180] })

        if (lowerOnly)
            this.xzCircle(center, radius, { arc: [180, 360] })

        if (!upperOnly && !lowerOnly)
            this.xzCircle(center, radius, { arc: [0, 360] })

        if (showCenter)
            this.pen.point(this.py(center))

        this.xyCircle(center, radius, { line: true, dash: baseDash, shade: baseShade })

        if (radiusLine)
            this.pen.line(this.py(center), this.py([radius, 0, 0]))

        if (radiusDash)
            this.pen.dash(this.py(center), this.py([radius, 0, 0]))

        if (radiusLabel.length > 0)
            this.pen.label.line([this.py([radius, 0, 0]), this.py(center)], radiusLabel)
    }



    frustum(lowerBase: Point3D[], upperBase: Point3D[], {
        height = !true,
        shadeLower = !true,
        shadeUpper = !true,
        envelopeOnly = !true

    } = {}) {
        lowerBase = [...lowerBase]
        upperBase = [...upperBase]
        this.shape(lowerBase)
        this.shape(upperBase)

        let max = Math.max(lowerBase.length, upperBase.length)
        for (let i = 0; i < max; i++) {
            if (i > lowerBase.length - 1)
                lowerBase.push(lowerBase[lowerBase.length - 1])
            if (i > upperBase.length - 1)
                upperBase.push(upperBase[upperBase.length - 1])
        }
        lowerBase.push(lowerBase[0])
        upperBase.push(upperBase[0])

        if (envelopeOnly) {
            this.pen.ctx.save()
            this.pen.set.alpha(0.1)
            for (let i = 0; i < max; i++) {
                let polygon = [lowerBase[i], lowerBase[i + 1], upperBase[i + 1], upperBase[i]]
                this.shape(polygon, { line: false, fill: true })
            }
            this.pen.ctx.restore()
        } else {
            for (let i = 0; i < max; i++) {
                this.line(lowerBase[i], upperBase[i])
            }
        }


        if (height) {
            let V = Vec3DMean(...upperBase)
            let [A, B, C] = lowerBase
            let O = ProjectionOnPlane(V, [A, B, C])
            this.dash(O, V)
        }
        if (shadeLower)
            this.shape(lowerBase, { line: false, shade: true })
        if (shadeUpper)
            this.shape(upperBase, { line: false, shade: true })


    }

    circularFrustum() {

    }



}

/**
 * @ignore
 */
var Pen3D = Pen3DCls
globalThis.Pen3D = Pen3D
