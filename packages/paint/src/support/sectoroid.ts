import { Point2D, Point3D, Point, circle, sphere, capturable } from '../global.js'
import { traceCircle } from './trace.js'

function vec(p1: Point2D, p2: Point2D): Point2D {
    let [x1, y1] = p1
    let [x2, y2] = p2
    return [x2 - x1, y2 - y1]
}

function deg(radian: number): number {
    return (radian / Math.PI) * 180
}

function magnitude([x, y]: Point2D): number {
    return (x * x + y * y) ** 0.5
}

function argument([x, y]: Point2D): number {
    let rad = Math.atan2(y, x)
    let angle = deg(rad)
    if (angle < 0) angle += 360
    return angle
}

export function sectoroid(
    O: Point2D,
    A: Point2D,
    B: Point2D,
    vertices: Point2D[]
) {
    let v1 = vec(O, A)
    let v2 = vec(O, B)
    let r = magnitude(v1)
    let q1 = argument(v1)
    let q2 = argument(v2)
    if (q2 < q1) q2 += 360
    let points = traceCircle(O, r, [q1, q2])
    return [A, ...points, B, ...vertices]
}
