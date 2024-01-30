import { Convas } from 'paint'
import { PenRange } from './modules/range.js'
import { PenSize } from './modules/size.js'
import { PenSettings } from './modules/settings.js'
import { PenD3 } from './modules/d3.js'
import { PenGraph } from './modules/graph.js'
import { PenFill } from './modules/fill.js'
import { PenShade } from './modules/shade.js'
import { PenLabel } from './modules/label.js'
import { PenAxis } from './modules/axis.js'
import { PenTick } from './modules/tick.js'
import { PenGrid } from './modules/grid.js'
import { PenGridTick } from './modules/gridTick.js'
import { PenLinProg } from './modules/linProg.js'
import { PenRod } from './modules/rod.js'

/**
 * @ignore
 */
const DEFAULT_POINT_RADIUS_PIXEL = 2

/**
 * @ignore
 */
const DEFAULT_CUTTER_LENGTH_PIXEL = 5

export class PenCls {
    protected cv: Convas = new Convas()

    constructor() {
        this.range.set([-5, 5], [-5, 5])
        this.size.set(1)
        this.set.reset()
    }

    /**
     * Setup of canvas coordinate range.
     */
    range = new PenRange(this, this.cv)

    /**
     * Setup of canvas size.
     */
    size = new PenSize(this, this.cv)

    /**
     * Settings.
     */
    set = new PenSettings(this, this.cv)

    /**
     * Plot an explicit or parametric function.
     * ```
     * pen.plot(x=>x**2,1,2) // y=x^2 from x = 1 to 2
     * pen.plot(x=>x**2) // y=x^2 in from x = xmin to xmax
     * pen.plot(t=>[cos(t),sin(t)],0,360) // a unit circle
     * ```
     */
    plot(
        func: ((t: number) => number) | ((t: number) => Point2D),
        tStart?: number,
        tEnd?: number
    ) {
        this.cv.plot(func, tStart, tEnd, 1000)
    }

    /**
     * Same as .plot but dashed.
     */
    plotDash(
        func: ((t: number) => number) | ((t: number) => Point2D),
        tStart?: number,
        tEnd?: number
    ) {
        this.cv.save()
        this.set.dash(true)
        this.cv.plot(func, tStart, tEnd, 1000)
        this.cv.restore()
    }

    /**
     * Drawing graph of functions.
     */
    graph = new PenGraph(this, this.cv)

    /**
     * Draw a point.
     * ```
     * pen.point([1,2]) // draw a point at [1,2]
     * pen.point([1,2],"A") // draw a point at [1,2] and label as "A"
     * ```
     */
    point(position: Point, label?: string) {
        this.cv.disc(position, DEFAULT_POINT_RADIUS_PIXEL)
        if (label !== undefined) this.label.point(position, label)
    }

    /**
     * Draw a point.
     * ```
     * pen.points({A,B}) // mark and label point A as 'A', point B as 'B'
     * pen.points({A,B},false) // mark point A and B, without label
     * ```
     */
    points(positions: { [k: string]: Point }) {
        for (let k in positions) {
            this.point(positions[k], k)
        }
    }

    /**
     * Draw a cutter to a horizontal line.
     * ```
     * pen.cutX([1,2]) // draw a vertical cutter at [1,2]
     * pen.cutX(1) // same as cutX([1,0])
     * pen.cutX(1,'x') // label 'x'
     * ```
     */
    cutX(position: Point2D | number, label?: string | number) {
        if (typeof position === 'number') position = [position, 0]
        this.cv.tickVert(position, DEFAULT_CUTTER_LENGTH_PIXEL)
        if (label !== undefined) this.label.point(position, label, 270)
    }

    /**
     * Draw a cutter to a vertical line.
     * ```
     * pen.cutY([1,2]) // draw a horizontal cutter at [1,2]
     * pen.cutY(1) // same as cutY([0,1])
     * pen.cutY(1,'y') // label 'y'
     * ```
     */
    cutY(position: Point2D | number, label?: string | number) {
        if (typeof position === 'number') position = [0, position]
        this.cv.tickHori(position, DEFAULT_CUTTER_LENGTH_PIXEL)
        if (label !== undefined) this.label.point(position, label, 180)
    }

    /**
     * Draw a tick on the x-axis.
     * ```
     * pen.tickX(1) // draw a tick at x=1
     * ```
     */
    tickX(x: number) {
        this.cutX(x, x)
    }

    /**
     * Draw a tick on the y-axis.
     * ```
     * pen.tickY(1) // draw a tick at y=1
     * ```
     */
    tickY(y: number) {
        this.cutY(y, y)
    }

    /**
     * Draw a guide line from `point` to the x-axis.
     * ```
     * pen.guideX([1,2],'1') // draw guide from [1,2] and label '1' on x-axis
     * ```
     */
    guideX(point: Point2D, label?: string | number) {
        let [x, y] = point
        this.dash([x, 0], point)
        if (label !== undefined) {
            this.cutX(x)
            this.label.point([x, 0], label, y >= 0 ? 270 : 90)
        }
    }

    /**
     * Draw a guide line from `point` to the y-axis.
     * ```
     * pen.guideY([1,2],'2') // draw guide from [1,2] and label '2' on y-axis
     * ```
     */
    guideY(point: Point2D, label?: string | number) {
        let [x, y] = point
        this.dash([0, y], point)
        if (label !== undefined) {
            this.cutY(y)
            this.label.point([0, y], label, x >= 0 ? 180 : 0)
        }
    }

    /**
     * Draw two guide lines from `point` to the x-axis and y-axis.
     * ```
     * pen.guide([1,2],['a','b']) // draw guide from [1,2] and label 'a' on x-axis and 'b' on y-axis
     * ```
     */
    guide(
        point: Point2D,
        labels: [string | number | undefined, string | number | undefined] = [
            undefined,
            undefined,
        ]
    ) {
        this.guideX(point, labels[0])
        this.guideY(point, labels[1])
    }

    /**
     * Draw a guide line from `point` to the x-axis, and mark the x-coord.
     * ```
     * pen.leadX([1,2]) // draw guide from [1,2] and label 1 on x-axis
     * ```
     */
    leadX(point: Point2D) {
        this.guideX(point, point[0])
    }

    /**
     * Draw a guide line from `point` to the y-axis, and mark the y-coord.
     * ```
     * pen.leadY([1,2]) // draw guide from [1,2] and label 2 on y-axis
     * ```
     */
    leadY(point: Point2D) {
        this.guideY(point, point[1])
    }

    /**
     * Draw two guide lines from `point` to the x-axis and y-axis, and mark the x-coord and y-coord.
     * ```
     * pen.lead([1,2]) // draw guide from [1,2] and label 1 on x-axis and 2 on y-axis
     * ```
     */
    lead(point: Point2D) {
        this.leadX(point)
        this.leadY(point)
    }

    /**
     * Draw a circle.
     * ```
     * pen.circle([1,2], 10) // draw a circle centered at [1,2] with r=10px
     * ```
     */
    circle(center: Point2D, radius: number) {
        this.cv.circle(center, radius)
    }

    /**
     * Fill a disc.
     * ```
     * pen.disc([1,2], 10) // draw a disc centered at [1,2] with 10 px radius
     * ```
     */
    disc(center: Point2D, radius: number) {
        this.cv.disc(center, radius)
    }

    /**
     * Shade a disc.
     * ```
     * pen.halo([1,2], 10) // shade a disc centered at [1,2] with 10 px radius
     * ```
     */
    halo(center: Point2D, radius: number) {
        this.cv.halo(center, radius)
    }

    /**
     * Draw a dot.
     * ```
     * pen.dot([1,2]) // draw a dot at [1,2]
     * ```
     */
    dot(point: Point2D) {
        this.disc(point, 4)
    }

    /**
     * Draw a hole.
     * ```
     * pen.hole([1,2]) // draw a hole at [1,2]
     * ```
     */
    hole(point: Point2D) {
        this.cv.save()
        this.set.color('white')
        this.disc(point, 4)
        this.cv.restore()
        this.circle(point, 4)
    }

    /**
     * Draw a line between two points.
     * ```
     * pen.line([1,2],[3,4]) // draw a line from [1,2] to [3,4]
     * pen.line([1,2],[3,4],'10') //  also label '10'
     * ```
     */
    line(A: Point, B: Point, label?: string | number) {
        this.cv.line([A, B])
        if (label !== undefined) this.label.line([A, B], label)
    }

    /**
     * Draw a dash line between two points.
     * ```
     * pen.dash([1,2],[3,4]) // draw a dash line from [1,2] to [3,4]
     * pen.dash([1,2],[3,4],'10') //  also label '10'
     * ```
     */
    dash(A: Point, B: Point, label?: string | number) {
        this.cv.dash([A, B])
        if (label !== undefined) this.label.line([A, B], label)
    }

    /**
     * Draw an arrow between two points.
     * ```
     * pen.arrow([1,2],[3,4]) // draw an arrow from [1,2] to [3,4]
     * ```
     */
    arrow(A: Point, B: Point, label?: string | number) {
        this.cv.arrow(A, B, 5)
        if (label !== undefined) {
            let mode = this.cv.$ARROW_LABEL
            if (mode === 'line') this.label.line([A, B], label)
            if (mode === 'head') this.label.point(B, String(label))
            if (mode === 'front') this.label.front([A, B], String(label))
        }
    }

    /**
     * Draw the component of the arrow.
     * ```
     * pen.arrowCompo([1,2],[3,4],0,'F','θ')
     * // draw the horizontal component of arrow from [1,2] to [3,4]
     * // label the arrow as 'F'
     * // label the angle as 'θ'
     * ```
     */
    arrowCompo(
        O: Point2D,
        P: Point2D,
        alongDir: number,
        arrowLabel?: string | number,
        angleLabel?: string | number
    ) {
        let Q = PdFoot(P, [O, alongDir])
        this.cv.save()
        if (this.cv.$ARROW_LABEL === 'line') this.set.labelCenter(O, P)
        this.arrow(O, Q, arrowLabel)
        this.cv.restore()
        if (angleLabel !== undefined) this.angle(Q, O, P, angleLabel)
    }

    /**
     * Draw both components of the arrow.
     * ```
     * pen.arrowResolve([1,2],[3,4],0,['Fx','Fy'],'θ')
     * // draw the horizontal and vertical components of arrow from [1,2] to [3,4]
     * // label the arrows as 'Fx' and 'Fy'
     * // label the angle with the horizontal as 'θ'
     * ```
     */
    arrowResolve(
        O: Point2D,
        P: Point2D,
        alongDir: number,
        arrowLabels: (string | number | undefined)[] = [],
        angleLabel?: string | number
    ) {
        let [l1, l2] = arrowLabels
        this.arrowCompo(O, P, alongDir, l1, angleLabel)
        this.arrowCompo(O, P, alongDir + 90, l2)
    }

    /**
     * Draw a length between two points.
     * ```
     * pen.length([1,2],[3,4],'d')
     * // draw an length 'd' from [1,2] to [3,4]
     * ```
     */
    length(A: Point, B: Point, label?: string | number) {
        this.cv.line([A, B])
        this.cv.tick(A, B, 5, 0)
        this.cv.tick(B, A, 5, 0)
        if (label !== undefined) this.label.line([A, B], label)
    }

    /**
     * Draw a dashed height with right angle, from V to AB.
     * ```
     * pen.height([0,4],[[-1,0],[1,0]],'h')
     * // draw the height 'h' from [0,4] to x-axis
     * ```
     */
    height(V: Point2D, [A, B]: [Point2D, Point2D], label?: string | number) {
        let F = PdFoot(V, [A, B])
        this.dash(V, F)
        this.rightAngle(A, F, V)
        if (label !== undefined) this.label.line([V, F], label)
    }

    /**
     * Draw a ray from A to B.
     * ```
     * pen.ray([0,0],[1,1])
     * ```
     */
    ray(A: Point2D, B: Point2D, label?: string | number) {
        this.cv.line([A, B])
        if (label !== undefined) this.label.line([A, B], label)
        this.cv.midArrowHead(A, B, 5)
    }

    /**
     * Draw a polyline given points.
     * ```
     * pen.polyline([0,0],[5,2],[3,4]) // draw a polyline through 3 points
     * ```
     */
    polyline(...points: Point[]) {
        this.cv.line(points)
    }

    /**
     * Draw a polygon given points.
     * ```
     * pen.polygon([0,0],[5,2],[3,4]) // draw a triangle
     * ```
     */
    polygon(...points: Point[]) {
        this.cv.shape(points)
    }

    /**
     * Fill a polygon given points.
     * ```
     * pen.polyfill([0,0],[5,2],[3,4]) // fill a triangle
     * ```
     */
    polyfill(...points: Point[]) {
        this.cv.fill(points)
    }

    /**
     * Shade a polygon given points.
     * ```
     * pen.polyshade([0,0],[5,2],[3,4]) // shade a triangle
     * ```
     */
    polyshade(...points: Point[]) {
        this.cv.shade(points)
    }

    /**
     * Draw and shade a polygon given points.
     * ```
     * pen.polyshape([0,0],[5,2],[3,4]) // draw and shade a triangle
     * ```
     */
    polyshape(...points: Point[]) {
        this.polygon(...points)
        this.polyshade(...points)
    }

    /**
     * Draw a rod.
     */
    rod = new PenRod(this, this.cv)

    /**
     * Fill a shape.
     */
    fill = new PenFill(this, this.cv)

    /**
     * Shade a shape.
     */
    shade = new PenShade(this, this.cv)

    /**
     * Linear Programming tools.
     */
    linProg = new PenLinProg(this, this.cv)

    /**
     * Draw an angle with label.
     * ```
     * pen.angle([0,0],[5,2],[3,4],'x')
     * ```
     */
    angle(
        A: Point,
        O: Point,
        B: Point,
        label?: string | number,
        arc = 1,
        radius = -1
    ) {
        if (radius < 0)
            radius = 15 + this.cv.getAngleAllowance(A, O, B, 40, 1.5)
        let space = 3
        this.cv.angle(A, O, B, radius, arc, space)

        if (label !== undefined && label !== '')
            this.label.angle(
                [A, O, B],
                label,
                undefined,
                radius < 0 ? radius : radius + 13
            )
    }

    /**
     * Draw an angle by direction.
     * ```
     * pen.angleDir(0,[0,0],60,'x')
     * ```
     */
    angleDir(
        A: Point2D | number,
        O: Point2D,
        B: Point2D | number,
        label?: string | number,
        arc = 1,
        radius = -1
    ) {
        ;[A, O, B] = this.cv.getApexFromDial(A, O, B)
        this.angle(A, O, B, label, arc, radius)
    }

    /**
     * Decorate equal side lengths.
     * ```
     * pen.decorate.equalSide([1,0],[3,2],2)
     * // a double-tick at the mid-pt of [1,0] and [3,2]
     * ```
     */
    equalSide(A: Point, B: Point, tick = 1) {
        this.cv.equalSide(A, B, 5, tick, 3)
    }

    /**
     * Decorate bisecting equal lengths of a side.
     * ```
     * pen.decorate.bisectSide([0,0], [2,2], 2)
     * // two double-ticks bisecting [0,0] and [2,2] at their mid-pt
     * ```
     */
    bisectSide(A: Point, B: Point, tick = 1) {
        ;[A, B] = this.cv.pjs([A, B])
        let M = Mid(A, B)
        this.equalSide(A, M, tick)
        this.equalSide(B, M, tick)
    }

    /**
     * Decorate parallel side.
     * ```
     * pen.decorate.parallel([1,0],[3,2],2)
     * // a double-tick parallel mark at the mid-pt of [1,0] and [3,2]
     * ```
     */
    parallel(A: Point, B: Point, tick = 1) {
        this.cv.parallel(A, B, 5, tick, 6)
    }

    /**
     * Decorate a right-angle AOB.
     * ```
     * pen.decorate.rightAngle([1,0],[0,0],[3,2])
     * // an right-angle AOB
     * ```
     */
    rightAngle(A: Point, O: Point, B?: Point, size = 12) {
        A = this.cv.pj(A)
        O = this.cv.pj(O)
        B ??= Rotate(A, 90, O)
        B = this.cv.pj(B)
        this.cv.rightAngle(A, O, B, size)
    }

    /**
     * Decorate a compass.
     * ```
     * pen.decorate.compass([1,2])
     * // a compass at [1,2]
     * ```
     */
    compass(point: Point2D) {
        this.cv.compass(point, 17, 20, 3.5)
    }

    /**
     * Write text.
     * ```
     * pen.write([1,2],'abc') // 'abc' at [1,2]
     * ```
     */
    write(point: Point, text: string) {
        this.cv.write(text, point)
    }

    /**
     */
    label = new PenLabel(this, this.cv)

    /**
     * The axis.
     */
    axis = new PenAxis(this, this.cv)

    /**
     * Draw both axis. Default no label.
     * ```
     * pen.axes() // draw both axis
     * pen.axes('x','y') // label as 'x' and 'y'
     * ```
     */
    axes(xlabel = '', ylabel = '') {
        this.axis.xy(xlabel, ylabel)
    }

    /**
     * The axis ticks.
     */
    tick = new PenTick(this, this.cv)

    /**
     * The axis gridlines.
     */
    grid = new PenGrid(this, this.cv)

    /**
     * The axis gridlines and ticks.
     */
    gridTick = new PenGridTick(this, this.cv)

    /**
     * The 3D pen
     */
    d3 = new PenD3(this, this.cv)

    /**
     * Set the background image url.
     * ```
     * pen.background('https://www2.pyc.edu.hk/img/pycnet_logo.png')
     * ```
     */
    background(url: string): void {
        this.cv.backgroundURL = url
    }

    /**
     * @deprecated
     * Export the canvas to image tag.
     * ```
     * question = pen.export(question,'imgQ')
     * // paste the canvas to the image tag with src field 'imgQ'
     * ```
     */
    export(html: string, placeholder: string): string {
        return this.cv.export(html, placeholder, false)
    }

    /**
     * @deprecated
     * Export the canvas to image tag, with white space trimmed.
     * ```
     * question = pen.exportTrim(question,'imgQ')
     * // paste the canvas to the image tag with src field 'imgQ'
     * ```
     */
    exportTrim(html: string, placeholder: string) {
        return this.cv.export(html, placeholder, true)
    }

    /**
     * Export the canvas to image tag. For development only.
     * ```
     * question = pen.printFull(question,'imgQ')
     * // paste the canvas to the image tag with src field 'imgQ'
     * ```
     */
    printFull(html: string, placeholder: string): string {
        return this.cv.export(html, placeholder, false)
    }

    /**
     * Export the canvas to image tag, with white space trimmed.
     * ```
     * question = pen.print(question,'imgQ')
     * // paste the canvas to the image tag with src field 'imgQ'
     * ```
     */
    print(html: string, placeholder: string) {
        return this.cv.export(html, placeholder, true)
    }

    /**
     * Clear the canvas.
     */
    clear() {
        this.cv.clearImg()
    }

    /**
     * Temporarily save the img internally. Can be later restored by restoreImg.
     */
    saveImg() {
        this.cv.saveImg()
    }

    /**
     * Restored the previously saved img by saveImg.
     */
    restoreImg() {
        this.cv.restoreImg()
    }
}
