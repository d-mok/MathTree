import { px, dot, Point2D, Point3D, Point, inch } from '../global.js'
import { Canvas09 } from './canvas09.js'
import { round5 } from '../support/round.js'

function degrize(text: string | number): string {
    return typeof text === 'number' ? round5(text) + '°' : text
}

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
 * - label
 */
export class Canvas10 extends Canvas09 {
    labelPoint(
        text: string | number,
        point: Point,
        dir: number,
        radius: px
    ): void {
        this.label(text, point, radius, dir)
    }

    labelPointAuto(text: string | number, point: Point, radius: px): void {
        let dir = this.getCenterDir(point)
        this.label(text, point, radius, dir)
    }

    labelAngle(
        text: string | number,
        [A, O, B]: [Point, Point, Point],
        dir: number,
        radius: px
    ): void {
        let T = degrize(text)
        let mid = this.getMidDir(A, O, B)
        this.label(T, O, radius, mid + dir)
    }

    labelLine(
        text: string | number,
        [A, B]: [Point, Point],
        dir: number,
        radius: px
    ): void {
        text = this.unitize(text)
        let M = mid(A, B)
        let normal = this.getLineDir(A, B)
        this.label(text, M, radius, normal + dir)
    }

    labelFront(
        text: string | number,
        [A, B]: [Point, Point],
        dir: number,
        radius: px
    ): void {
        let arrowDir = this.getDir(A, B)
        this.labelPoint(text, B, arrowDir + dir, radius)
    }
}
