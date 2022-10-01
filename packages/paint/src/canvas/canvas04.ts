import { px, dot, Point2D, Point3D, Point, inch } from '../global'
import { Canvas03 } from './canvas03'

function rad(degree: number): number {
    return (degree * Math.PI) / 180
}

function deg(radian: number): number {
    return (radian / Math.PI) * 180
}

function dotVec([x1, y1]: dot, [x2, y2]: dot): dot {
    return [x2 - x1, y2 - y1]
}

function dir(A: dot, B: dot): number {
    let [dx, dy] = dotVec(A, B)
    let rad = -Math.atan2(dy, dx)
    return deg(rad)
}

function scaleDot([x, y]: dot, ratio: number): dot {
    return [x * ratio, y * ratio]
}

function dist(A: dot, B: dot): px {
    let [dx, dy] = dotVec(A, B)
    return (dx * dx + dy * dy) ** 0.5
}

function addDot([x1, y1]: dot, [x2, y2]: dot): dot {
    return [x1 + x2, y1 + y2]
}

function scaleDotTo(A: dot, length: number): dot {
    let oldLength = dist([0, 0], A)
    let ratio = length / oldLength
    return scaleDot(A, ratio)
}

function moveDot(A: dot, B: dot, dist: number): dot {
    let AB = dotVec(A, B)
    let d = scaleDotTo(AB, dist)
    return addDot(A, d)
}

/**
 * Handle:
 * - transform
 * - drawing in pixel and coordinates
 */
export class Canvas04 extends Canvas03 {
    // transform

    protected translateTo(pt: Point): void {
        let [x, y] = this.toPx(pt)
        this.ctx.translate(x, y)
    }

    protected rotate(degreePolar: number): void {
        this.ctx.rotate(-rad(degreePolar))
    }

    protected rotateTo(start: Point, end: Point): void {
        let [x1, y1] = this.toPx(start)
        let [x2, y2] = this.toPx(end)
        let dx = x2 - x1
        let dy = y2 - y1
        let q = Math.atan2(dy, dx)
        this.ctx.rotate(q)
    }

    protected alignTo(start: Point, end: Point): void {
        this.translateTo(end)
        this.rotateTo(start, end)
    }

    // straight drawer in px

    protected moveToPx([x, y]: dot) {
        this.ctx.moveTo(x, y)
    }

    protected lineToPx([x, y]: dot) {
        this.ctx.lineTo(x, y)
    }

    protected createPathPx(dots: dot[]) {
        this.ctx.beginPath()
        if (dots.length === 0) return
        let [first, ...rest] = dots
        this.moveToPx(first)
        for (let d of rest) {
            this.lineToPx(d)
        }
    }

    protected createShapePx(dots: dot[]) {
        this.createPathPx(dots)
        this.ctx.closePath()
    }

    // straight drawer in coord

    protected moveTo(pt: Point) {
        let [x, y] = this.toPx(pt)
        this.ctx.moveTo(x, y)
    }

    protected lineTo(pt: Point) {
        let [x, y] = this.toPx(pt)
        this.ctx.lineTo(x, y)
    }

    protected createPath(pts: Point[]) {
        this.ctx.beginPath()
        if (pts.length === 0) return
        let [first, ...rest] = pts
        this.moveTo(first)
        for (let p of rest) {
            this.lineTo(p)
        }
    }

    protected createShape(pts: Point[]) {
        this.createPath(pts)
        this.ctx.closePath()
    }

    // arc drawer

    protected createArc(center: Point, radius: px, angle: [number, number]) {
        let [x, y] = this.toPx(center)
        let [q1, q2] = angle
        q1 = -rad(q1)
        q2 = -rad(q2)
        this.ctx.beginPath()
        this.ctx.arc(x, y, radius, q1, q2, true)
    }

    protected createArcByPoints(P: Point, O: Point, Q: Point, radius: px) {
        let p = this.toPx(P)
        let o = this.toPx(O)
        let q = this.toPx(Q)
        let q1 = dir(o, p)
        let q2 = dir(o, q)
        this.createArc(O, radius, [q1, q2])
    }

    protected createRightAnglePath(P: Point, O: Point, Q: Point, size: px) {
        let p = this.toPx(P)
        let o = this.toPx(O)
        let q = this.toPx(Q)
        let a = moveDot(o, p, size)
        let b = moveDot(o, q, size)
        let c = addDot(b, dotVec(o, a))
        this.createPathPx([a, c, b])
    }

    // finishing

    protected doStroke() {
        this.ctx.stroke()
    }

    protected doSolid() {
        let dash = this.$DASH
        this.$DASH = false
        this.ctx.stroke()
        this.$DASH = dash
    }

    protected doDash() {
        let dash = this.$DASH
        this.$DASH = true
        this.ctx.stroke()
        this.$DASH = dash
    }

    protected doFill() {
        this.ctx.fill()
    }

    protected doShade() {
        const DEFAULT_SHADE_ALPHA = 0.1
        let alpha = this.$ALPHA
        this.$ALPHA = DEFAULT_SHADE_ALPHA
        this.ctx.fill()
        this.$ALPHA = alpha
    }
}
