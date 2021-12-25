import { px, dot, inch, Point2D, } from '../global'
import { Canvas00 } from './canvas00'


// pixel conversion

function toPixelX(xmin: number, xmax: number, width: px, xCoord: number): px {
    return (xCoord - xmin) / (xmax - xmin) * width
}

function toPixelY(ymin: number, ymax: number, height: px, yCoord: number): px {
    return height - (yCoord - ymin) / (ymax - ymin) * height
}



function sin(degree: number): number {
    return Math.sin(degree / 180 * Math.PI)
}


function cos(degree: number): number {
    return Math.cos(degree / 180 * Math.PI)
}



function tan(degree: number): number {
    return Math.tan(degree / 180 * Math.PI)
}

/**
 * Handle:
 * - 2D coordinate definition
 * - 2D coordinate to px conversion
 */
export class Canvas01 extends Canvas00 {

    // coord

    public xmin: number = 0
    public xmax: number = 0
    public ymin: number = 0
    public ymax: number = 0

    public dx(): number {
        return this.xmax - this.xmin
    }

    public dy(): number {
        return this.ymax - this.ymin
    }

    public yxRatio(): number {
        return this.dy() / this.dx()
    }

    public center(): Point2D {
        let x = (this.xmin + this.xmax) / 2
        let y = (this.ymin + this.ymax) / 2
        return [x, y]
    }

    public edgeTop(x: number = 0): Point2D {
        return [x, this.ymax]
    }

    public edgeBottom(x: number = 0): Point2D {
        return [x, this.ymin]
    }

    public edgeLeft(y: number = 0): Point2D {
        return [this.xmin, y]
    }

    public edgeRight(y: number = 0): Point2D {
        return [this.xmax, y]
    }

    public origin(): Point2D {
        return [0, 0]
    }

    // check in sight

    private isXVisible([x, y]: Point2D, buffer = 0): boolean {
        let X = this.dx() * buffer
        return this.xmin - X <= x && x <= this.xmax + X
    }

    private isYVisible([x, y]: Point2D, buffer = 0): boolean {
        let Y = this.dy() * buffer
        return this.ymin - Y <= y && y <= this.ymax + Y
    }

    public isVisible(point: Point2D, buffer = 0): boolean {
        return this.isXVisible(point, buffer) && this.isYVisible(point, buffer)
    }

    // find edge point

    private toTopEdge([x, y]: Point2D, dir: number): Point2D {
        let Dy = this.ymax - y
        let Dx = Dy / tan(dir)
        return [x + Dx, this.ymax]
    }


    private toBottomEdge([x, y]: Point2D, dir: number): Point2D {
        let Dy = this.ymin - y
        let Dx = Dy / tan(dir)
        return [x + Dx, this.ymin]
    }


    private toRightEdge([x, y]: Point2D, dir: number): Point2D {
        let Dx = this.xmax - x
        let Dy = Dx * tan(dir)
        return [this.xmax, y + Dy]
    }


    private toLeftEdge([x, y]: Point2D, dir: number): Point2D {
        let Dx = this.xmin - x
        let Dy = Dx * tan(dir)
        return [this.xmin, y + Dy]
    }


    public edgePoint(anchor: Point2D, dir: number): Point2D {
        if (!this.isVisible(anchor)) return anchor
        let [x, y] = anchor
        let arr = [
            this.toTopEdge(anchor, dir),
            this.toBottomEdge(anchor, dir),
            this.toRightEdge(anchor, dir),
            this.toLeftEdge(anchor, dir)
        ]
        arr = arr
            .filter($ => this.isVisible($))
            .filter(([X, Y]) => (X - x) * cos(dir) >= 0)
            .filter(([X, Y]) => (Y - y) * sin(dir) >= 0)
        if (arr.length !== 1)
            console.error('edgePoint not unique! from:' + anchor + ' to:' + arr)
        return arr[0]
    }

    // capture

    protected capturePoints2D(pts: Point2D[]): void {
        if (pts.length === 0) return
        let [first, ...rest] = pts
        let xmin = first[0]
        let xmax = first[0]
        let ymin = first[1]
        let ymax = first[1]

        for (let [x, y] of rest) {
            if (x < xmin) xmin = x
            if (x > xmax) xmax = x
            if (y < ymin) ymin = y
            if (y > ymax) ymax = y
        }

        this.xmin = xmin
        this.xmax = xmax
        this.ymin = ymin
        this.ymax = ymax
    }

    protected fixCollapsedRange(): void {
        let { xmin, xmax, ymin, ymax } = this
        let xSize = xmax - xmin
        let ySize = ymax - ymin
        if (xSize === 0 && ySize === 0) {
            xmax++
            xmin--
            ymax++
            ymin--
        }
        if (xSize === 0 && ySize !== 0) {
            xmax += ySize / 2
            xmin -= ySize / 2
        }
        if (xSize !== 0 && ySize === 0) {
            ymax += xSize / 2
            ymin -= xSize / 2
        }
        this.xmin = xmin
        this.xmax = xmax
        this.ymin = ymin
        this.ymax = ymax
    }



    // border

    public addBorder(borderInch: inch): void {
        let borderXUnit = this.dx() / this.widthInch * borderInch
        let borderYUnit = this.dy() / this.heightInch * borderInch

        this.xmin -= borderXUnit
        this.xmax += borderXUnit
        this.ymin -= borderYUnit
        this.ymax += borderYUnit

        this.widthInch += 2 * borderInch
        this.heightInch += 2 * borderInch
    }



    // conversion


    protected point2DtoPx(point: Point2D): dot {
        let [xCoord, yCoord] = point
        let x = toPixelX(this.xmin, this.xmax, this.width, xCoord)
        let y = toPixelY(this.ymin, this.ymax, this.height, yCoord)
        return [x, y]
    }


}



