import { px, dot, Point2D, Point3D, Point, inch } from '../global'
import { Canvas06 } from "./canvas06"


// step


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


// vector

function mid(A: Point, B: Point): Point {
    if (A.length === 3 && B.length === 3) {
        let [x, y, z] = A
        let [X, Y, Z] = B
        return [(x + X) / 2, (y + Y) / 2, (z + Z) / 2]
    } else {
        let [x, y] = A
        let [X, Y] = B
        return [(x + X) / 2, (y + Y) / 2]
    }
}



/**
 * Handle:
 * - basic elements
 */
export class Canvas07 extends Canvas06 {

    private linePx(dots: dot[]) {
        this.createPathPx(dots)
        this.doStroke()
    }

    private solidPx(dots: dot[]) {
        this.createPathPx(dots)
        this.doSolid()
    }



    line(pts: Point[]) {
        this.createPath(pts)
        this.doStroke()
    }

    lineVert(x: number) {
        let A = this.edgeBottom(x)
        let B = this.edgeTop(x)
        this.line([A, B])
    }

    lineHori(y: number) {
        let A = this.edgeLeft(y)
        let B = this.edgeRight(y)
        this.line([A, B])
    }

    solid(pts: Point[]) {
        this.createPath(pts)
        this.doSolid()
    }

    dash(pts: Point[]) {
        this.createPath(pts)
        this.doDash()
    }


    shape(pts: Point[]) {
        this.createShape(pts)
        this.doStroke()
    }


    fill(pts: Point[]) {
        this.createShape(pts)
        this.doFill()
    }

    shade(pts: Point[]) {
        this.createShape(pts)
        this.doShade()
    }

    arc(P: Point, O: Point, Q: Point, radius: px) {
        this.createArcByPoints(P, O, Q, radius)
        this.doStroke()
    }

    circle(center: Point, radius: px) {
        this.createArc(center, radius, [0, 360])
        this.doStroke()
    }

    disc(center: Point, radius: px) {
        this.createArc(center, radius, [0, 360])
        this.doFill()
    }


    halo(center: Point, radius: px) {
        this.createArc(center, radius, [0, 360])
        this.doShade()
    }

    // advanced

    arrowHead(start: Point, end: Point, size: px, offset: px) {
        this.save()
        this.translateTo(end)
        this.rotateTo(start, end)
        let A: dot = [offset - 2 * size, -size]
        let O: dot = [offset, 0]
        let B: dot = [offset - 2 * size, +size]
        this.solidPx([A, O, B])
        this.restore()
    }


    arrow(start: Point, end: Point, size: px) {
        this.line([start, end])
        this.arrowHead(start, end, size, 0)
    }


    anglePolar(A: Point, O: Point, B: Point, radius: px, count: number, space: px) {
        for (let s of steps(count)) {
            let r = radius + s * space
            this.arc(A, O, B, r)
        }
    }


    angle(A: Point, O: Point, B: Point, radius: px, count: number, space: px) {
        let flip = this.polarFlip(A, O, B)
        let [P, Q] = flip ? [B, A] : [A, B]
        // draw like polar
        this.anglePolar(P, O, Q, radius, count, space)
    }




    rightAngle(A: Point, O: Point, B: Point, size: px) {
        this.createRightAnglePath(A, O, B, size)
        this.doSolid()
    }



    parallel(start: Point, end: Point, size: px, count: number, space: px) {
        let M = mid(start, end)
        for (let i = 0; i < count; i++) {
            this.arrowHead(start, M, size, i * space)
        }
    }


    tick(start: Point, end: Point, length: px, offset: px) {
        this.save()
        this.translateTo(end)
        this.rotateTo(start, end)
        let A: dot = [offset, -length]
        let B: dot = [offset, +length]
        this.solidPx([A, B])
        this.restore()
    }


    tickVert(pt: Point, length: px) {
        let [x, y] = pt
        this.tick([x - 1, y], pt, length, 0)
    }



    tickHori(pt: Point, length: px) {
        let [x, y] = pt
        this.tick([x, y - 1], pt, length, 0)
    }


    equalSide(start: Point, end: Point, length: px, count: number, space: px) {
        let M = mid(start, end)
        for (let s of steps(count)) {
            this.tick(start, M, length, s * space)
        }
    }


    compass(center: Point, xSize: px, ySize: px, arrowSize: px) {
        this.save()
        this.translateTo(center)
        let E: dot = [xSize, 0]
        let W: dot = [-xSize, 0]
        let S: dot = [0, ySize]
        let N: dot = [0, -ySize]
        let A: dot = [-arrowSize, -ySize + arrowSize * 2]
        let B: dot = [+arrowSize, -ySize + arrowSize * 2]
        this.solidPx([E, W])
        this.solidPx([N, S])
        this.solidPx([A, N, B])
        this.restore()
    }


}
