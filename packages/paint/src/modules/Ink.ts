
type pixel = number
type dot = [pixel, pixel]

import { Dial } from './Dial'

function deg(radian: number): number {
    return radian / Math.PI * 180
}

function rad(degree: number): number {
    return degree * Math.PI / 180
}

function dir(A: dot, B: dot): number {
    let [dx, dy] = dotVec(A, B)
    let rad = -Math.atan2(dy, dx)
    return deg(rad)
}

function isEven(n: number): boolean {
    return n % 2 === 0
}

function isOdd(n: number): boolean {
    return n % 2 !== 0
}

function floorHalf(n: number): number {
    if (isOdd(n)) n = n - 1
    return n / 2
}

function steps(n: number): number[] {
    let N = floorHalf(n)
    let arr: number[] = []

    if (isOdd(n)) {
        arr.push(0)
        for (let i = 1; i <= N; i++) {
            arr.push(i)
            arr.push(-i)
        }
    } else {
        for (let i = 1; i <= N; i++) {
            let s = i - 0.5
            arr.push(s)
            arr.push(-s)
        }
    }
    return arr
}

function dotVec([x1, y1]: dot, [x2, y2]: dot): dot {
    return [x2 - x1, y2 - y1]
}

function scaleDot([x, y]: dot, ratio: number): dot {
    return [x * ratio, y * ratio]
}

function dist(A: dot, B: dot): number {
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

function moveDotX([x, y]: dot, dist: number): dot {
    return [x + dist, y]
}

function moveDotY([x, y]: dot, dist: number): dot {
    return [x, y + dist]
}

function mid(A: dot, B: dot): dot {
    return scaleDot(addDot(A, B), 0.5)
}






/**
 * Provide drawing function in terms of pixel.
 */
export class Ink {

    constructor(
        private readonly ctx: CanvasRenderingContext2D
    ) { }

    private dial: Dial = new Dial(this.ctx)


    // rect

    private moveTo(dot: dot) {
        let [x, y] = dot
        this.ctx.moveTo(x, y)
    }

    private lineTo(dot: dot) {
        let [x, y] = dot
        this.ctx.lineTo(x, y)
    }

    private createPath(dots: dot[]) {
        this.ctx.beginPath()
        if (dots.length === 0) return

        this.moveTo(dots[0])
        for (let i = 1; i < dots.length; i++) {
            this.lineTo(dots[i])
        }
    }

    private createShape(dots: dot[]) {
        this.createPath(dots)
        this.ctx.closePath()
    }

    track(dots: dot[]) {
        this.createPath(dots)
        this.ctx.stroke()
    }

    line(...dots: dot[]): void {
        this.track(dots)
    }



    shape(dots: dot[]) {
        this.createShape(dots)
        this.ctx.stroke()
    }


    fill(dots: dot[]) {
        this.createShape(dots)
        this.ctx.fill()
    }

    // circle

    private createArcPath(center: dot, radius: pixel, angle: [number, number]) {
        let [x, y] = center
        let [q1, q2] = angle
        q1 = -rad(q1)
        q2 = -rad(q2)
        this.ctx.beginPath()
        this.ctx.arc(x, y, radius, q1, q2, true)
    }

    arc(center: dot, radius: pixel, angle: [number, number]) {
        this.createArcPath(center, radius, angle)
        this.ctx.stroke()
    }

    segment(center: dot, radius: pixel, angle: [number, number]) {
        this.createArcPath(center, radius, angle)
        this.ctx.fill()
    }

    circle(center: dot, radius: pixel) {
        this.arc(center, radius, [0, 360])
    }

    disc(center: dot, radius: pixel) {
        this.segment(center, radius, [0, 360])
    }

    // advanced

    arrow(start: dot, end: dot, length: pixel, width: pixel, offset: pixel) {
        this.dial.save()
        this.dial.translateTo(end)
        this.dial.rotateAlong(start, end)
        let A: dot = [offset - length, -width]
        let O: dot = [offset, 0]
        let B: dot = [offset - length, +width]
        this.track([A, O, B])
        this.dial.restore()
    }

    anglePolar(A: dot, O: dot, B: dot, radius: pixel, count: number, space: pixel) {
        let q1 = dir(O, A)
        let q2 = dir(O, B)

        for (let s of steps(count)) {
            let r = radius + s * space
            this.arc(O, r, [q1, q2])
        }
    }

    rightAngle(A: dot, O: dot, B: dot, size: pixel) {
        let P = moveDot(O, A, size)
        let Q = moveDot(O, B, size)
        let R = addDot(Q, dotVec(O, P))
        this.track([P, R, Q])
    }


    parallel(start: dot, end: dot, size: pixel, count: number, space: pixel) {
        let M = mid(start, end)
        for (let i = 0; i < count; i++) {
            this.arrow(start, M, size * 2, size, i * space)
        }
    }

    tick(start: dot, end: dot, length: pixel, offset: pixel) {
        this.dial.save()
        this.dial.translateTo(end)
        this.dial.rotateAlong(start, end)
        let A: dot = [offset, -length]
        let B: dot = [offset, +length]
        this.line(A, B)
        this.dial.restore()
    }

    tickVert(dot: dot, length: pixel) {
        let A = moveDotY(dot, -length)
        let B = moveDotY(dot, +length)
        this.line(A, B)
    }


    tickHori(dot: dot, length: pixel) {
        let A = moveDotX(dot, -length)
        let B = moveDotX(dot, +length)
        this.line(A, B)
    }

    equalSide(start: dot, end: dot, length: pixel, count: number, space: pixel) {
        let M = mid(start, end)
        for (let s of steps(count)) {
            this.tick(start, M, length, s * space)
        }
    }

    compass(center: dot, xSize: pixel, ySize: pixel, arrowSize: pixel) {
        this.dial.save()
        this.dial.translateTo(center)
        let E: dot = [xSize, 0]
        let W: dot = [-xSize, 0]
        let S: dot = [0, ySize]
        let N: dot = [0, -ySize]
        let A: dot = [-arrowSize, -ySize + arrowSize * 2]
        let B: dot = [+arrowSize, -ySize + arrowSize * 2]
        this.line(E, W)
        this.line(N, S)
        this.line(A, N, B)
        this.dial.restore()
    }






}

