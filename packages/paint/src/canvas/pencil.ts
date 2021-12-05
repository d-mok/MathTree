import { Frame } from './frame'
import { argument, atan2, cos, cross2D, force2D, IsReflex, magnitude, meanPoint, midPoint, sin, split, trace, traceCircle, vec } from './support'
import { Board, Dial, Ink, Feather } from '../modules'

type Point2D = [number, number]
type Point3D = [number, number, number]
type Point = Point2D | Point3D

type pixel = number
type dot = [pixel, pixel]



/**
 * REM_PIXEL is the default font size of the browser, usually 16px
 */
const REM_PIXEL: number = parseFloat(getComputedStyle(document.documentElement).fontSize)

const SIZE_SCALE = 10
const DEFAULT_SHADE_ALPHA = 0.1

const DEFAULT_AXIS_LABEL_OFFSET_PIXEL = 15
const DEFAULT_XAXIS_MARK_OFFSET_PIXEL = 15
const DEFAULT_YAXIS_MARK_OFFSET_PIXEL = 10
const DEFAULT_AXIS_TICK_LENGTH_PIXEL = 5


export class Pencil {

    /**
     * @deprecated
     */
    protected canvas: HTMLCanvasElement = document.createElement('canvas');
    /**
     * @deprecated
     */
    public ctx: CanvasRenderingContext2D = this.canvas.getContext("2d")!;


    protected board = new Board(this.canvas)
    private dial = new Dial(this.ctx)
    private ink = new Ink(this.ctx)
    private feather = new Feather(this.ctx)





    protected frame: Frame = new Frame();

    private imgStore: ImageData | null = null

    private INIT_RANGE_ALREADY = false
    private INIT_SIZE_ALREADY = false



    /**
     * Set the coordinate range of the canvas.
     * @param xRange - [xmin,xmax] in coordinates
     * @param yRange - [ymin,ymax] in coordinates
     */
    protected initRange(xRange: [number, number], yRange: [number, number]): void {
        this.frame.setXRange(xRange)
        this.frame.setYRange(yRange)
        this.INIT_RANGE_ALREADY = true
    }

    /**
     * Set the physical size of the canvas.
     * @param width - width of canvas in scaled unit, 1 unit = SIZE_SCALE (=10) * REM_PIXEL pixel
     * @param height - height of canvas in scaled unit.
     */
    protected initSize(width: number, height: number): void {
        if (!this.INIT_RANGE_ALREADY)
            throw '[Pencil Error] Range must be set before Size'

        const wPixel = width * SIZE_SCALE * REM_PIXEL
        const hPixel = height * SIZE_SCALE * REM_PIXEL

        this.board.init(wPixel, hPixel)
        this.frame.setSize(wPixel, hPixel)

        this.setDefault()

        this.INIT_SIZE_ALREADY = true
    }

    /**
     * Set a border by extending the range and size.
     * The original image will be unchanged. The size will be bigger.
     */
    protected initOuterBorder(): void {
        if (!this.INIT_RANGE_ALREADY)
            throw '[Pencil Error] Range must be set before setting range border'
        if (!this.INIT_SIZE_ALREADY)
            throw '[Pencil Error] Size must be set before setting range border'

        const borderPix = this.$BORDER * SIZE_SCALE * REM_PIXEL

        let [xmin, xmax] = this.frame.xRange()
        let [ymin, ymax] = this.frame.yRange()

        const wPixel = this.frame.wPixel
        const hPixel = this.frame.hPixel

        let borderXUnit = (xmax - xmin) * borderPix / wPixel
        let borderYUnit = (ymax - ymin) * borderPix / hPixel

        xmin -= borderXUnit
        xmax += borderXUnit
        ymin -= borderYUnit
        ymax += borderYUnit
        this.initRange([xmin, xmax], [ymin, ymax])

        const width = wPixel / SIZE_SCALE / REM_PIXEL
        const height = hPixel / SIZE_SCALE / REM_PIXEL
        this.initSize(width + 2 * this.$BORDER, height + 2 * this.$BORDER)
    }






    // private $TEXT_SIZE: number = 1
    private $TEXT_DIR: number = 0
    private $TEXT_LATEX: boolean = false
    private $LABEL_CENTER: Point2D | number = 0
    private $ANGLE_MODE: 'normal' | 'polar' | 'reflex' = 'normal'
    private $LENGTH_UNIT: string | undefined = undefined
    private $3D_ANGLE: number = 60
    private $3D_DEPTH: number = 0.5
    private $BORDER: number = 0.2
    private $LINE_LABEL: 'auto' | 'left' | 'right' = 'auto'

    protected pj(point: Point): Point2D {
        return force2D(point, this.$3D_ANGLE, this.$3D_DEPTH)
    }


    protected pjs(points: Point[]): Point2D[] {
        return points.map($ => this.pj($))
    }


    protected setWeight(weight = 1): void {
        this.dial.setWeight(weight)
    }

    protected setStrokeColor(color = "black"): void {
        this.dial.setStrokeColor(color)
    }

    protected setFillColor(color = "black"): void {
        this.dial.setFillColor(color)
    }

    protected setColor(color = "black"): void {
        this.dial.setColor(color)
    }

    protected setAlpha(opaque = 1): void {
        this.dial.setAlpha(opaque)
    }

    protected setDash(segments: (number[] | number | boolean) = []): void {
        this.dial.setDash(segments)
    }

    protected setTextAlign(align: CanvasTextAlign = "center"): void {
        this.dial.setTextAlign(align)
    }

    protected setTextBaseline(baseline: CanvasTextBaseline = "middle"): void {
        this.dial.setTextBaseline(baseline)
    }

    protected setTextSize(size = 1): void {
        this.dial.setTextPixel(size * REM_PIXEL)
    }

    protected setTextItalic(italic = false): void {
        this.dial.setTextItalic(italic)
    }

    protected setTextDir(angle = 0): void {
        this.$TEXT_DIR = angle
    }

    protected setTextLatex(on = false): void {
        this.$TEXT_LATEX = on
    }

    protected setLabelCenter(...centers: Point[] | [number] | [true]): void {
        if (centers.length === 0) {
            this.$LABEL_CENTER = this.frame.xyCenter()
            return
        }
        // TEMP, to be deleted
        if (centers[0] === true) {
            this.$LABEL_CENTER = this.frame.xyCenter()
            return
        }
        if (typeof centers[0] === 'number') {
            this.$LABEL_CENTER = centers[0]
            return
        }
        if (Array.isArray(centers[0])) {
            let cens = centers as Point[]
            let pts = cens.map($ => force2D($, this.$3D_ANGLE, this.$3D_DEPTH))
            this.$LABEL_CENTER = meanPoint(...pts)
        }
    }

    protected setLengthUnit(text: string | undefined = undefined): void {
        this.$LENGTH_UNIT = text
    }

    protected setAngleMode(mode: 'normal' | 'polar' | 'reflex' = 'normal'): void {
        this.$ANGLE_MODE = mode
    }

    protected setProjector3D(angle: number = 60, depth: number = 0.5): void {
        this.$3D_ANGLE = angle
        this.$3D_DEPTH = depth
    }

    protected setBorder(border: number = 0.2): void {
        this.$BORDER = border
    }

    protected setLineLabel(setting: 'auto' | 'left' | 'right' = 'auto'): void {
        this.$LINE_LABEL = setting
    }


    protected setDefault(): void {
        this.setWeight()
        this.setStrokeColor()
        this.setFillColor()
        this.setAlpha()
        this.setDash()
        this.setTextAlign()
        this.setTextBaseline()
        this.ctx.font = 'normal 10px Times New Roman'
        this.setTextSize()
        this.setTextItalic()
        this.setTextDir()
        this.setTextLatex()
        this.setLabelCenter()
        this.setLengthUnit()
        this.setAngleMode()
        this.setLineLabel()
    }

    protected setAllDefault(): void {
        this.setDefault()
        this.setProjector3D()
        this.setBorder()
    }




    private toPix(point: Point): dot {
        let pt = this.pj(point)
        return this.frame.toPix(pt)
    }

    private toPixs(points: Point[]): dot[] {
        return points.map($ => this.toPix($))
    }

    /**
     * Draw a stroke through the `points`.
     */
    protected drawStroke(points: Point[]): void {
        let dots = this.toPixs(points)
        this.ink.track(dots)
    }



    /**
     * Draw a stroke through the `points` to form a closed shape.
     */
    protected drawShape(points: Point[]): void {
        let dots = this.toPixs(points)
        this.ink.shape(dots)
    }



    /**
     * Fill the closed shape formed by `points`.
     */
    protected drawFill(points: Point[]): void {
        let dots = this.toPixs(points)
        this.ink.fill(dots)
    }



    /**
     * Shade the closed shape formed by `points`.
     */
    protected drawShade(points: Point[]): void {
        let alpha = this.ctx.globalAlpha
        this.setAlpha(DEFAULT_SHADE_ALPHA)
        this.drawFill(points)
        this.setAlpha(alpha)
    }





    /**
     * Draw an arc.
     * @param center - the center of the arc's circle
     * @param radiusPixel - the radius in pixel
     * @param angleRange - polar angle range
     */
    protected drawArc(center: Point, radiusPixel: pixel, angleRange: [number, number]): void {
        let cen = this.toPix(center)
        this.ink.arc(cen, radiusPixel, angleRange)
    }


    /**
     * Draw a filled segment.
     * @param center - the center of the segment's circle
     * @param radiusPixel - the radius in pixel
     * @param angleRange - polar angle range
     */
    protected drawSegment(center: Point, radiusPixel: pixel, angleRange: [number, number]): void {
        let cen = this.toPix(center)
        this.ink.segment(cen, radiusPixel, angleRange)
    }


    /**
     * Draw a circle.
     * @param center - the center of the circle
     * @param radiusPixel - the radius in pixel
     */
    protected drawCircle(center: Point, radiusPixel: pixel): void {
        this.drawArc(center, radiusPixel, [0, 360])
    }


    /**
     * Draw a dot, i.e. a filled circle.
     * @param center - the center of the circle
     * @param radiusPixel - the radius in pixel
     */
    protected drawDot(center: Point, radiusPixel: pixel): void {
        this.drawSegment(center, radiusPixel, [0, 360])
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
        this.drawStroke(pts)
    }


    /**
     * Fill a pseudo-sector
     */
    protected drawFillSectoroid(center: Point2D, pStart: Point2D, pEnd: Point2D, vertices: Point2D[]) {
        let pts = this.pathSectoroid(center, pStart, pEnd, vertices)
        this.drawFill(pts)
    }



    /**
     * Shade a pseudo-sector
     */
    protected drawShadeSectoroid(center: Point2D, pStart: Point2D, pEnd: Point2D, vertices: Point2D[]) {
        let alpha = this.ctx.globalAlpha
        this.setAlpha(DEFAULT_SHADE_ALPHA)
        this.drawFillSectoroid(center, pStart, pEnd, vertices)
        this.setAlpha(alpha)
    }






    /**
     * Draw an arrow head at `endPoint`.
     * @param startPoint - start point of arrow, used to determine arrow direction only
     * @param endPoint - end point of arrow, where the arrow head will be drawn
     * @param arrowLength - length pixel along the arrow head
     * @param arrowWidth - width pixel across the arrow on one side
     * @param arrowOffset - offset pixel along the arrow
     */
    protected drawArrowHead(startPoint: Point, endPoint: Point,
        { arrowLength, arrowWidth, arrowOffset }:
            { arrowLength?: pixel, arrowWidth?: pixel, arrowOffset?: pixel } = {}) {

        let p1 = this.toPix(startPoint)
        let p2 = this.toPix(endPoint)

        // original default
        arrowLength ??= 10
        arrowWidth ??= arrowLength / 2
        arrowOffset ??= 0

        this.ink.arrow(p1, p2, arrowLength, arrowWidth, arrowOffset)
    }



    /**
     * Draw an angle.
     * @param point1 - first point
     * @param vertex - where the angle is
     * @param point2 - second point
     * @param radiusPixels - radius of angle mark in pixel
     */
    protected drawAngle(point1: Point, vertex: Point, point2: Point, radiusPixel: pixel, arcCount: number, spacePixel: pixel) {
        let [A, O, B] = this.pjs([point1, vertex, point2])

        let mode = this.$ANGLE_MODE
        if (mode === 'normal' && IsReflex(A, O, B)) [A, B] = [B, A]
        if (mode === 'reflex' && !IsReflex(A, O, B)) [A, B] = [B, A]

        // draw like polar
        let [a, o, b] = this.toPixs([A, O, B])
        this.ink.anglePolar(a, o, b, radiusPixel, arcCount, spacePixel)
    }



    /**
     * Draw a right angle.
     * @param point1 - first point
     * @param vertex - where the angle is
     * @param point2 - second point
     * @param sizePixel - size in pixel
     */
    protected drawRightAngle(point1: Point, vertex: Point, point2: Point, sizePixel: pixel): void {
        let [A, O, B] = this.toPixs([point1, vertex, point2])
        this.ink.rightAngle(A, O, B, sizePixel)
    }



    /**
     * Draw parallel mark
     * @param startPoint - start point of the line to decorate
     * @param endPoint -end point of the line to decorate
     * @param sizePixel - size of mark in pixel
     * @param tickCount - how many marks
     * @param spacePixel - space between marks in pixel
     */
    protected drawParallelMark(startPoint: Point, endPoint: Point, sizePixel: pixel, tickCount: number, spacePixel: pixel): void {
        // original default
        sizePixel ??= 4
        spacePixel ??= 6

        let [A, B] = this.toPixs([startPoint, endPoint])
        this.ink.parallel(A, B, sizePixel, tickCount, spacePixel)
    }


    /**
     * Draw a tick.
     * @param startPoint - start point of the line to tick, for direction only
     * @param tickPoint - where the tick is
     * @param lengthPixel - one-sided length of the tick in pixel
     * @param offsetPixel - offset of the tick position along the line, in pixel
     */
    protected drawTick(startPoint: Point, tickPoint: Point, lengthPixel: pixel, offsetPixel: pixel): void {
        let p1 = this.toPix(startPoint)
        let p2 = this.toPix(tickPoint)

        // original default
        lengthPixel ??= 5
        offsetPixel ??= 0

        this.ink.tick(p1, p2, lengthPixel, offsetPixel)
    }


    /**
     * Draw a vertical tick.
     * @param position - where the tick is, in coordinates.
     * @param lengthPixel - one-sided length of the tick
     */
    protected drawTickVertical(position: Point, lengthPixel: pixel): void {
        let p = this.toPix(position)
        this.ink.tickVert(p, lengthPixel)
    }


    /**
     * Draw a horizontal tick.
     * @param position - where the tick is, in coordinates.
     * @param lengthPixel - one-sided length of the tick
     */
    protected drawTickHorizontal(position: Point, lengthPixel: pixel): void {
        let p = this.toPix(position)
        this.ink.tickHori(p, lengthPixel)
    }


    /**
     * Draw equal mark at the mid-pt of a line.
     * @param startPoint - start point of the line to decorate
     * @param endPoint - end point of the line to decorate
     * @param lengthPixel - one-sided length of the mark in pixel
     * @param tickCount - how many marks
     * @param spacePixel -space between the marks, in pixel
     */
    protected drawEqualMark(startPoint: Point, endPoint: Point, lengthPixel: pixel, tickCount: number, spacePixel: pixel): void {
        let A = this.toPix(startPoint)
        let B = this.toPix(endPoint)

        // original default
        lengthPixel ??= 5
        spacePixel ??= 3

        this.ink.equalSide(A, B, lengthPixel, tickCount, spacePixel)
    }



    /**
     * Draw a compass.
     * @param center - position of compass center
     * @param xSizePixel - horizontal one-sided length of compass, in pixel
     * @param ySizePixel - vertical one-sided length of compass, in pixel
     * @param arrowLength - length of arrow head
     * @param arrowWidth - one-sided width of arrow head
     */
    protected drawCompass(center: Point, xSizePixel: pixel, ySizePixel: pixel, arrowSize: pixel): void {
        let cen = this.toPix(center)

        xSizePixel ??= 17
        ySizePixel ??= 20
        // arrowLength ??= 7
        // arrowWidth ??= arrowLength / 2

        this.ink.compass(cen, xSizePixel, ySizePixel, arrowSize)
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
        tStart: number, tEnd: number, dots = 1000
    ): void {

        let points = trace(func, [tStart, tEnd], dots)

        function outOfRange(num: number[]) {
            return num.some($ => Math.abs($) > 10000)
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
            this.drawStroke(seg)
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
        let [x, y] = this.toPix(position)
        x += xOffset
        y -= yOffset
        this.feather.write(text, [x, y], this.$TEXT_DIR, this.$TEXT_LATEX)
    }


    /**
     * Find the polar direction between two points, in the pixel world.
     * @param pStart - start point in coordinates
     * @param pEnd - end point in coordinates
     */
    protected getDirInPixel(pStart: Point, pEnd: Point): number {
        let [OPoint, APoint] = this.pjs([pStart, pEnd])
        let [O, A] = this.frame.toPixs([OPoint, APoint])
        return atan2(-(A[1] - O[1]), A[0] - O[0])
    }


    /**
     * Find the mid-ray direction given 3 points, in the pixel world.
     * Obey ANGLE_MODE.
     * @param point1 - first point, in coordinates.
     * @param vertex - where the angle is, in coordinates.
     * @param point2 - second point, in coordinates.
     */
    protected getDirInPixelByAngle(point1: Point, vertex: Point, point2: Point): number {
        let [A, O, B] = this.pjs([point1, vertex, point2])

        let mode = this.$ANGLE_MODE
        if (mode === 'normal' && IsReflex(A, O, B)) [A, B] = [B, A]
        if (mode === 'reflex' && !IsReflex(A, O, B)) [A, B] = [B, A]

        // draw like polar
        let [pixelA, pixelO, pixelB] = this.frame.toPixs([A, O, B])
        let a1 = atan2(-(pixelA[1] - pixelO[1]), pixelA[0] - pixelO[0])
        let a2 = atan2(-(pixelB[1] - pixelO[1]), pixelB[0] - pixelO[0])
        if (a2 < a1) a2 = a2 + 360
        return (a1 + a2) / 2
    }


    /**
     * Find the left or right direction of a line, in the pixel world.
     * Obey LINE_LABEL.
     * If LINE_LABEL is 'auto', then away from LABEL_CENTER.
     * If LINE_LABEL is 'left', then on the left.
     * If LINE_LABEL is 'right', then on the right.
     * @param pStart - start point in coordinates
     * @param pEnd - end point in coordinates
     */
    protected getDirInPixelByLine(pStart: Point, pEnd: Point): number {
        let mode = this.$LINE_LABEL
        let left = this.getDirInPixel(pStart, pEnd) + 90
        let right = this.getDirInPixel(pStart, pEnd) - 90
        if (mode === 'left') return left
        if (mode === 'right') return right
        if (mode === 'auto') {
            let cen = this.$LABEL_CENTER
            if (typeof cen === 'number') return right
            let p1 = this.pj(pStart)
            let p2 = this.pj(pEnd)
            let cross = cross2D(vec(p2, p1), vec(p2, cen))
            return cross > 0 ? left : right
        }
        console.warn("$LINE_LABEL must be 'left' | 'right' | 'auto'")
        return right
    }


    private getLabelCenterDirInPixel(point: Point): number {
        let pt = this.pj(point)
        let center = this.$LABEL_CENTER
        if (typeof center === 'number') {
            return center
        } else {
            if (center[0] === pt[0] && center[1] === pt[1]) return 0
            return this.getDirInPixel(center, pt)
        }
    }


    private getTextWidthInPixel(text: string): pixel {
        return this.feather.getHalfWidth(text, this.$TEXT_LATEX)
    }

    protected getTextWithLengthUnit(text: string | number): string {
        text = String(text)
        let unit = this.$LENGTH_UNIT
        if (unit === undefined) return text

        if (this.$TEXT_LATEX) {
            return text + `~\\text{${unit}}`
        } else {
            return text + ' ' + unit
        }
    }


    /**
     * Draw a text label around a point. The label dodges the point elliptically.
     * @param text - string to write
     * @param position - where to write, in coordinates
     * @param direction - polar angle to dodge, in the visible (pixel world) sense
     * @param radiusPixel - offset distance in pixel
     */
    protected drawLabel(text: string, position: Point, direction: number | undefined, radiusPixel: pixel): void {
        direction ??= this.getLabelCenterDirInPixel(position)

        let textWidth = this.getTextWidthInPixel(text)
        let xOffset = (radiusPixel + textWidth - 5) * cos(direction)
        let yOffset = radiusPixel * sin(direction)

        this.drawText(text, position, xOffset, yOffset)
    }


    private makePolarAngle(point1: Point, vertex: Point, point2: Point): [Point, Point, Point] {
        let [A, O, B] = this.pjs([point1, vertex, point2])

        let mode = this.$ANGLE_MODE
        if (mode === 'normal' && IsReflex(A, O, B)) return [point2, vertex, point1]
        if (mode === 'reflex' && !IsReflex(A, O, B)) return [point2, vertex, point1]

        return [point1, vertex, point2]
    }

    /**
     * Find the angle in pixel world. Obey ANGLE_MODE.
     * @param point1 - first point, in coordinates.
     * @param vertex - where the angle is, in coordinates.
     * @param point2 - second point, in coordinates.
     */
    protected getAngleInPixel(point1: Point, vertex: Point, point2: Point): number {
        let [A, O, B] = this.makePolarAngle(point1, vertex, point2)
        let a = this.getDirInPixel(O, A)
        let b = this.getDirInPixel(O, B)
        return a <= b ? b - a : 360 + b - a
    }



    /**
     * Find the extra pixel allowance when drawing angle arc and angle label for small angles.
     * @param point1 - first point, in coordinates.
     * @param vertex - where the angle is, in coordinates.
     * @param point2 - second point, in coordinates.
     * @param angleThreshold - the max angle under which extra pixel is needed
     * @param pixelPerDegree - extra pixel per degree under the threshold
     */
    protected getSmallAngleExtraPixel(point1: Point, vertex: Point, point2: Point, angleThreshold: number, pixelPerDegree: pixel): pixel {
        let angle = this.getAngleInPixel(point1, vertex, point2)
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
        const [xmin, xmax] = this.frame.xRange()
        this.drawStroke([[xmin, 0], [xmax, 0]])
        this.drawArrowHead([xmin, 0], [xmax, 0])
    }

    /**
     * Draw the label of x-axis.
     * @param text - string to write
     */
    protected drawXAxisLabel(text: string): void {
        text = String(text)
        const [xmin, xmax] = this.frame.xRange()
        this.ctx.save()
        this.setTextAlign("right")
        this.setTextBaseline("middle")
        this.drawText(text, [xmax, 0], 0, DEFAULT_AXIS_LABEL_OFFSET_PIXEL)
        this.ctx.restore()
    }




    /**
     * Draw the y-axis.
     */
    protected drawYAxis(): void {
        const [ymin, ymax] = this.frame.yRange()
        this.drawStroke([[0, ymin], [0, ymax]])
        this.drawArrowHead([0, ymin], [0, ymax])
    }


    /**
     * Draw the label of y-axis.
     * @param text - string to write
     */
    protected drawYAxisLabel(text: string): void {
        text = String(text)
        const [ymin, ymax] = this.frame.yRange()
        this.ctx.save()
        this.setTextAlign("left")
        this.setTextBaseline("top")
        this.drawText(text, [0, ymax], DEFAULT_AXIS_LABEL_OFFSET_PIXEL, 0)
        this.ctx.restore()
    }


    /**
     * Draw the ticks on x-axis.
     * @param interval - distance between tick, in coordinates.
     */
    protected drawXAxisTick(interval: number): void {
        for (let x of this.frame.xTicks(interval)) {
            this.drawTickVertical([x, 0], DEFAULT_AXIS_TICK_LENGTH_PIXEL)
        }
    }

    /**
     * Draw the ticks on y-axis.
     * @param interval - distance between tick, in coordinates.
     */
    protected drawYAxisTick(interval: number): void {
        for (let y of this.frame.yTicks(interval)) {
            this.drawTickHorizontal([0, y], DEFAULT_AXIS_TICK_LENGTH_PIXEL)
        }
    }



    /**
     * Draw the number mark on the ticks on x-axis.
     * @param interval - distance between tick, in coordinates.
     */
    protected drawXAxisTickMark(interval: number): void {
        this.ctx.save()
        this.setTextItalic()
        this.setTextAlign("center")
        this.setTextBaseline("middle")
        for (let x of this.frame.xTicks(interval)) {
            this.drawText(String(x), [x, 0], 0, -DEFAULT_XAXIS_MARK_OFFSET_PIXEL)
        }
        this.ctx.restore()
    }


    /**
     * Draw the number mark on the ticks on y-axis.
     * @param interval - distance between tick, in coordinates.
     */
    protected drawYAxisTickMark(interval: number): void {
        this.ctx.save()
        this.setTextItalic()
        this.setTextAlign("right")
        this.setTextBaseline("middle")
        for (let y of this.frame.yTicks(interval)) {
            this.drawText(String(y), [0, y], -DEFAULT_YAXIS_MARK_OFFSET_PIXEL, 0)
        }
        this.ctx.restore()
    }



    /**
     * Draw the vertical grid lines on the x-axis.
     * @param interval - distance between grids, in coordinates.
     */
    protected drawXAxisGrid(interval: number): void {
        this.ctx.save()
        this.ctx.strokeStyle = "#d3d5db"
        let [ymin, ymax] = this.frame.yRange()
        const drawLine = (x: number): void => {
            this.drawStroke([[x, ymin], [x, ymax]])
        }
        drawLine(0)
        for (let x of this.frame.xTicks(interval)) {
            drawLine(x)
        }
        this.ctx.restore()
    }



    /**
     * Draw the horizontal grid lines on the y-axis.
     * @param interval - distance between grids, in coordinates.
     */
    protected drawYAxisGrid(interval: number): void {
        this.ctx.save()
        this.ctx.strokeStyle = "#d3d5db"
        let [xmin, xmax] = this.frame.xRange()
        const drawLine = (y: number): void => {
            this.drawStroke([[xmin, y], [xmax, y]])
        }
        drawLine(0)
        for (let y of this.frame.yTicks(interval)) {
            drawLine(y)
        }
        this.ctx.restore()
    }



    

    /**
     * Equivalent to ctx.save()
     */
    protected save() {
        this.ctx.save()
    }

    /**
     * Equivalent to ctx.restore()
     */
    protected restore() {
        this.ctx.restore()
    }



};


