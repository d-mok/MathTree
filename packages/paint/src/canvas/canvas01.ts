import { px, dot, inch, Point2D, } from '../global'
import { Canvas00 } from './canvas00'


// pixel conversion

function toPixelX(xmin: number, xmax: number, width: px, xCoord: number): px {
    return (xCoord - xmin) / (xmax - xmin) * width
}

function toPixelY(ymin: number, ymax: number, height: px, yCoord: number): px {
    return height - (yCoord - ymin) / (ymax - ymin) * height
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



