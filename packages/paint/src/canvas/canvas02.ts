import { px, dot, Point2D, Point3D, Point, capturable } from '../global'
import { Canvas01 } from './canvas01'
import { thingsToPoints } from '../support/capture'

function proj(point3D: Point3D, angle: number, depth: number): Point2D {
    let a = (angle * Math.PI) / 180
    let s = Math.sin(a)
    let c = Math.cos(a)

    let [x, y, z] = point3D
    let x_new = x + depth * y * c
    let y_new = z + depth * y * s
    return [x_new, y_new]
}

function forceProj(point: Point, angle: number, depth: number): Point2D {
    return point.length === 3 ? proj(point, angle, depth) : point
}

/**
 * Handle:
 * - 3D coordinate to px conversion
 * - capturing things
 */
export class Canvas02 extends Canvas01 {
    // setting

    protected Proj_3D_Angle = 60
    protected Proj_3D_Depth = 0.5

    // conversion

    public pj(point: Point): Point2D {
        return forceProj(point, this.Proj_3D_Angle, this.Proj_3D_Depth)
    }

    public pjs(points: Point[]): Point2D[] {
        return points.map($ => this.pj($))
    }

    protected toPx(point: Point): dot {
        let pt = this.pj(point)
        return this.point2DtoPx(pt)
    }

    // capture

    public capture(things: capturable[]): void {
        let pts = thingsToPoints(things)
        let pt2Ds = this.pjs(pts)
        this.capturePoints2D(pt2Ds)
    }
}
