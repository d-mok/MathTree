import { ArmedConvas } from './armedconvas'

import { argument, magnitude, split, trace, traceCircle, vec } from './support'

type Point2D = [number, number]
type Point3D = [number, number, number]
type Point = Point2D | Point3D

type pixel = number
type dot = [pixel, pixel]


const DEFAULT_AXIS_LABEL_OFFSET_PIXEL = 15
const DEFAULT_XAXIS_MARK_OFFSET_PIXEL = 15
const DEFAULT_YAXIS_MARK_OFFSET_PIXEL = 10
const DEFAULT_AXIS_TICK_LENGTH_PIXEL = 5




/**
 * Return an array of ticks position at `interval` within `[min,max]`.
 * Zero is always a potential tick position.
 * ```
 * getTicks(2,10,3) // [3,6,9]
 * ```
 */
function getTicks(min: number, max: number, interval: number, includeZero: boolean = false): number[] {
    const start = Math.floor(min / interval) * interval
    const arr = []
    for (let i = start; i <= max; i += interval) {
        i = parseFloat(i.toPrecision(3))
        if (i === min || i === max) continue
        if (!includeZero && i === 0) continue
        arr.push(i)
    }
    return arr
}



export class Pencil {

    protected cv: ArmedConvas = new ArmedConvas()


    private RANGE_DONE = false
    private SIZE_DONE = false


    /**
     * Set the coordinate range of the canvas.
     * @param xRange - [xmin,xmax] in coordinates
     * @param yRange - [ymin,ymax] in coordinates
     */
    protected initRange(xRange: [number, number], yRange: [number, number]): void {
        this.cv.initRange(xRange, yRange)
        this.RANGE_DONE = true
    }

    /**
     * Set the physical size of the canvas.
     * @param width - width of canvas in scaled unit, 1 unit = SIZE_SCALE (=10) * REM_PIXEL pixel
     * @param height - height of canvas in scaled unit.
     */
    protected initSize(width: number, height: number): void {
        if (!this.RANGE_DONE) throw '[Pencil] Range must be set before Size'
        this.cv.initSize(width, height)
        this.SIZE_DONE = true
    }

    /**
     * Set a border by extending the range and size.
     * The original image will be unchanged. The size will be bigger.
     */
    protected initOuterBorder(): void {
        if (!this.RANGE_DONE) throw '[Pencil] Range must be set before setting border'
        if (!this.SIZE_DONE) throw '[Pencil] Size must be set before setting border'
        this.cv.setBorder()
    }



    private pathSectoroid(center: Point2D, pStart: Point2D, pEnd: Point2D, vertices: Point2D[]) {
        let v1 = vec(center, pStart)
        let v2 = vec(center, pEnd)
        let r = magnitude(v1)
        let q1 = argument(v1)
        let q2 = argument(v2)
        if (q2 < q1) q2 += 360
        let points = traceCircle(center, r, [q1, q2])
        return [pStart, ...points, pEnd, ...vertices]
    }

    /**
     * Draw a stroke of a pseudo-sector
     */
    protected drawStrokeSectoroid(center: Point2D, pStart: Point2D, pEnd: Point2D, vertices: Point2D[]) {
        let pts = this.pathSectoroid(center, pStart, pEnd, vertices)
        this.cv.line(pts)
    }


    /**
     * Fill a pseudo-sector
     */
    protected drawFillSectoroid(center: Point2D, pStart: Point2D, pEnd: Point2D, vertices: Point2D[]) {
        let pts = this.pathSectoroid(center, pStart, pEnd, vertices)
        this.cv.fill(pts)
    }



    /**
     * Shade a pseudo-sector
     */
    protected drawShadeSectoroid(center: Point2D, pStart: Point2D, pEnd: Point2D, vertices: Point2D[]) {
        let pts = this.pathSectoroid(center, pStart, pEnd, vertices)
        this.cv.shade(pts)
    }






    /**
     * Draw an angle.
     */
    protected drawAngle(A: Point, O: Point, B: Point, radiusPixel: pixel, arcCount: number, spacePixel: pixel) {
        let flip = this.cv.polarFlip(A, O, B)
        let [P, Q] = flip ? [B, A] : [A, B]

        // draw like polar
        this.cv.anglePolar(P, O, Q, radiusPixel, arcCount, spacePixel)
    }




    /**
     * Draw a plot of function.
     * @param func - the function to plot
     * @param tStart - start of parameter
     * @param tEnd - end of parameter
     * @param dots - total number of dots along the curve
     */
    protected drawPlot(
        func: ((t: number) => number) | ((t: number) => Point2D),
        tStart = this.cv.xmin,
        tEnd  = this.cv.xmax,
        dots = 1000
    ): void {
        let points = trace(func, [tStart, tEnd], dots)
        let xmin = this.cv.xmin
        let xmax = this.cv.xmax
        let ymin = this.cv.ymin
        let ymax = this.cv.ymax
        let X = xmax - xmin
        let Y = ymax - ymin

        function outOfRange([x, y]: Point2D) {
            return x > xmax + X || x < xmin - X || y > ymax + Y || y < ymin - Y
        }

        let filteredPoints = points.map(pt => {
            let [x, y] = pt
            if (!Number.isFinite(x)) return null
            if (!Number.isFinite(y)) return null
            if (outOfRange(pt)) return null
            return pt
        })

        let segments = split(filteredPoints, null) as Point2D[][]
        for (let seg of segments) {
            if (seg.length === 0) continue
            this.cv.line(seg)
        }

    }





    /**
     * Draw text.
     * @param text - string to draw
     * @param position - where to draw, in coordinates
     * @param xOffset - horizontal offset in pixel, right is positive
     * @param yOffset - vertical offset in pixel, up is positive
     * @returns
     */
    protected drawText(text: string, position: Point, xOffset: pixel, yOffset: pixel): void {
        this.cv.text(text, position, [xOffset, yOffset])
    }

    /**
     * Draw a text label around a point. The label dodges the point elliptically.
     * @param text - string to write
     * @param position - where to write, in coordinates
     * @param direction - polar angle to dodge, in the visible (pixel world) sense
     * @param radiusPixel - offset distance in pixel
     */
    protected drawLabel(text: string, position: Point, direction: number | undefined, radiusPixel: pixel): void {
        direction ??= this.cv.getCenterDir(position)
        this.cv.textDodge(text, position, radiusPixel, direction)
    }




    /**
     * Find the extra pixel allowance when drawing angle arc and angle label for small angles.
     * @param A - first point, in coordinates.
     * @param O - where the angle is, in coordinates.
     * @param B - second point, in coordinates.
     * @param angleThreshold - the max angle under which extra pixel is needed
     * @param pixelPerDegree - extra pixel per degree under the threshold
     */
    protected getSmallAngleExtraPixel(A: Point, O: Point, B: Point, angleThreshold: number, pixelPerDegree: pixel): pixel {
        let angle = this.cv.getDirAngle(A, O, B)
        let angleUnderThreshold = Math.max(angleThreshold - angle, 0)
        return angleUnderThreshold * pixelPerDegree
    }



    /**
     * Get the 4 corners of a circle. For .capture() to parse circle input.
     * @param center - center of circle
     * @param radius - radius of circle
     */
    protected getCircleCorners(center: Point2D, radius: number): [Point2D, Point2D, Point2D, Point2D] {
        let [h, k] = center
        let r = radius
        return [
            [h + r, k + r],
            [h + r, k - r],
            [h - r, k + r],
            [h - r, k - r]
        ]
    }





    /**
     * Get the 8 corners of a sphere. For .capture() to parse sphere input.
     * @param center - center of sphere
     * @param radius - radius of sphere
     */
    protected getSphereCorners(center: Point3D, radius: number): [Point3D, Point3D, Point3D, Point3D, Point3D, Point3D, Point3D, Point3D] {
        let [a, b, c] = center
        let r = radius
        return [
            [a + r, b + r, c + r],
            [a + r, b + r, c - r],
            [a + r, b - r, c + r],
            [a + r, b - r, c - r],
            [a - r, b + r, c + r],
            [a - r, b + r, c - r],
            [a - r, b - r, c + r],
            [a - r, b - r, c - r],
        ]
    }














    /**
     * Draw the x-axis.
     */
    protected drawXAxis(): void {
        let A: Point2D = [this.cv.xmin, 0]
        let B: Point2D = [this.cv.xmax, 0]
        this.cv.line([A, B])
        this.cv.arrow(A, B, 5, 0)
    }

    /**
     * Draw the label of x-axis.
     * @param text - string to write
     */
    protected drawXAxisLabel(text: string): void {
        this.cv.save()
        this.cv.$TEXT_ALIGN = "right"
        this.cv.$TEXT_BASELINE = "middle"
        this.drawText(text, [this.cv.xmax, 0], 0, DEFAULT_AXIS_LABEL_OFFSET_PIXEL)
        this.cv.restore()
    }




    /**
     * Draw the y-axis.
     */
    protected drawYAxis(): void {
        let A: Point2D = [0, this.cv.ymin]
        let B: Point2D = [0, this.cv.ymax]
        this.cv.line([A, B])
        this.cv.arrow(A, B, 5, 0)
    }


    /**
     * Draw the label of y-axis.
     * @param text - string to write
     */
    protected drawYAxisLabel(text: string): void {
        this.cv.save()
        this.cv.$TEXT_ALIGN = "left"
        this.cv.$TEXT_BASELINE = "top"
        this.drawText(text, [0, this.cv.ymax], DEFAULT_AXIS_LABEL_OFFSET_PIXEL, 0)
        this.cv.restore()
    }


    private xTicks(interval: number): number[] {
        return getTicks(this.cv.xmin, this.cv.xmax, interval)
    }


    private yTicks(interval: number): number[] {
        return getTicks(this.cv.ymin, this.cv.ymax, interval)
    }


    /**
     * Draw the ticks on x-axis.
     * @param interval - distance between tick, in coordinates.
     */
    protected drawXAxisTick(interval: number): void {
        for (let x of this.xTicks(interval)) {
            this.cv.tickVert([x, 0], DEFAULT_AXIS_TICK_LENGTH_PIXEL)
        }
    }

    /**
     * Draw the ticks on y-axis.
     * @param interval - distance between tick, in coordinates.
     */
    protected drawYAxisTick(interval: number): void {
        for (let y of this.yTicks(interval)) {
            this.cv.tickHori([0, y], DEFAULT_AXIS_TICK_LENGTH_PIXEL)
        }
    }



    /**
     * Draw the number mark on the ticks on x-axis.
     * @param interval - distance between tick, in coordinates.
     */
    protected drawXAxisTickMark(interval: number): void {
        this.cv.save()
        this.cv.$TEXT_ITALIC = false
        this.cv.$TEXT_ALIGN = "center"
        this.cv.$TEXT_BASELINE = "middle"
        for (let x of this.xTicks(interval)) {
            this.drawText(String(x), [x, 0], 0, -DEFAULT_XAXIS_MARK_OFFSET_PIXEL)
        }
        this.cv.restore()
    }


    /**
     * Draw the number mark on the ticks on y-axis.
     * @param interval - distance between tick, in coordinates.
     */
    protected drawYAxisTickMark(interval: number): void {
        this.cv.save()
        this.cv.$TEXT_ITALIC = false
        this.cv.$TEXT_ALIGN = "right"
        this.cv.$TEXT_BASELINE = "middle"
        for (let y of this.yTicks(interval)) {
            this.drawText(String(y), [0, y], -DEFAULT_YAXIS_MARK_OFFSET_PIXEL, 0)
        }
        this.cv.restore()
    }



    /**
     * Draw the vertical grid lines on the x-axis.
     * @param interval - distance between grids, in coordinates.
     */
    protected drawXAxisGrid(interval: number): void {
        this.cv.save()
        this.cv.$COLOR = "#d3d5db"
        const drawLine = (x: number): void => {
            this.cv.line([
                [x, this.cv.ymin],
                [x, this.cv.ymax]
            ])
        }
        drawLine(0)
        for (let x of this.xTicks(interval)) {
            drawLine(x)
        }
        this.cv.restore()
    }



    /**
     * Draw the horizontal grid lines on the y-axis.
     * @param interval - distance between grids, in coordinates.
     */
    protected drawYAxisGrid(interval: number): void {
        this.cv.save()
        this.cv.$COLOR = "#d3d5db"
        const drawLine = (y: number): void => {
            this.cv.line([
                [this.cv.xmin, y],
                [this.cv.xmax, y]
            ])
        }
        drawLine(0)
        for (let y of this.yTicks(interval)) {
            drawLine(y)
        }
        this.cv.restore()
    }







};


