import { Convas } from 'paint'
import { PenRange } from './modules/range'
import { PenSize } from './modules/size'
import { PenSettings } from './modules/settings'
import { PenD3 } from './modules/d3'
import { PenGraph } from './modules/graph'
import { PenFill } from './modules/fill'
import { PenShade } from './modules/shade'
import { PenLabel } from './modules/label'
import { PenAxis } from './modules/axis'
import { PenTick } from './modules/tick'
import { PenGrid } from './modules/grid'
import { PenLinProg } from './modules/linProg'


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
     * @category setting
     */
    range = new PenRange(this, this.cv)


    /**
     * Setup of canvas size.
     * @category setting
     */
    size = new PenSize(this, this.cv)


    /**
     * Settings.
     * @category setting
     */
    set = new PenSettings(this, this.cv)


    /**
     * Plot an explicit or parametric function.
     * ```
     * pen.plot(x=>x**2,1,2) // y=x^2 from x = 1 to 2
     * pen.plot(x=>x**2) // y=x^2 in from x = xmin to xmax
     * pen.plot(t=>[cos(t),sin(t)],0,360) // a unit circle
     * ```
     * @category graph
     */
    plot(
        func: ((t: number) => number) | ((t: number) => Point2D),
        tStart?: number, tEnd?: number
    ) {
        this.cv.plot(func, tStart, tEnd, 1000)
    }


    /**
     * Same as .plot but dashed.
     * @category graph
     */
    plotDash(
        func: ((t: number) => number) | ((t: number) => Point2D),
        tStart?: number,
        tEnd?: number,
    ) {
        this.cv.save()
        this.set.dash(true)
        this.cv.plot(func, tStart, tEnd, 1000)
        this.cv.restore()
    }



    /**
     * Drawing graph of functions.
     * @category graph
     */
    graph = new PenGraph(this, this.cv)




    /**
     * Draw a point.
     * ```
     * pen.point([1,2]) // draw a point at [1,2]
     * pen.point([1,2],"A") // draw a point at [1,2] and label as "A"
     * ```
     * @category draw
     */
    point(position: Point, label?: string) {
        this.cv.disc(position, DEFAULT_POINT_RADIUS_PIXEL)
        if (label !== undefined)
            this.label.point(position, label)
    }

    /**
     * Draw a point.
     * ```
     * pen.points({A,B}) // mark and label point A as 'A', point B as 'B'
     * pen.points({A,B},false) // mark point A and B, without label
     * ```
     * @category draw
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
     * ```
     * @category draw
     */
    cutX(position: Point2D | number, label?: string) {
        if (typeof position === 'number') position = [position, 0]
        this.cv.tickVert(position, DEFAULT_CUTTER_LENGTH_PIXEL)
        if (label !== undefined) this.label.point(position, label, 270)
    }

    /**
     * Draw a cutter to a vertical line.
     * ```
     * pen.cutY([1,2]) // draw a horizontal cutter at [1,2]
     * pen.cutY(1) // same as cutY([0,1])
     * ```
     * @category draw
     */
    cutY(position: Point2D | number, label?: string) {
        if (typeof position === 'number') position = [0, position]
        this.cv.tickHori(position, DEFAULT_CUTTER_LENGTH_PIXEL)
        if (label !== undefined) this.label.point(position, label, 180)
    }


    /**
     * Draw a guide line from `point` to the x-axis.
     * ```
     * pen.guideX([1,2],'1') // draw guide from [1,2] and label '1' on x-axis
     * ```
     * @category draw
     */
    guideX(point: Point2D, label?: string) {
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
     * @category draw
     */
    guideY(point: Point2D, label?: string) {
        let [x, y] = point
        this.dash([0, y], point)
        if (label !== undefined) {
            this.cutY(y)
            this.label.point([0, y], label, x >= 0 ? 180 : 0)
        }
    }

    /**
     * Draw a circle or arc.
     * ```
     * pen.circle([1,2], 10) // draw a circle centered at [1,2] with r=10px
     * ```
     * @category draw
     */
    circle(center: Point2D, radius: number) {
        this.cv.circle(center, radius)
    }


    /**
     * Fill a disc.
     * ```
     * pen.disc([1,2], 10) // draw a disc centered at [1,2] with 10 px radius
     * ```
     * @category draw
     */
    disc(center: Point2D, radius: number) {
        this.cv.disc(center, radius)
    }


    /**
     * Shade a disc.
     * ```
     * pen.halo([1,2], 10) // shade a disc centered at [1,2] with 10 px radius
     * ```
     * @category draw
     */
    halo(center: Point2D, radius: number) {
        this.cv.halo(center, radius)
    }



    /**
     * Draw a dot.
     * ```
     * pen.dot([1,2]) // draw a dot at [1,2]
     * ```
     * @category draw
     */
    dot(point: Point2D) {
        this.disc(point, 4)
    }


    /**
     * Draw a hole.
     * ```
     * pen.hole([1,2]) // draw a hole at [1,2]
     * ```
     * @category draw
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
     * @category draw
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
     * @category draw
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
     * @category draw
     */
    arrow(A: Point, B: Point, label?: string | number) {
        this.cv.arrow(A, B, 5)
        if (label !== undefined) this.label.line([A, B], label)
    }

    /**
     * Draw the component of the arrow.
     * ```
     * pen.arrowCompo([1,2],[3,4],0,'x')
     * // draw the horizontal component of arrow from [1,2] to [3,4]
     * // label the angle as 'x'
     * ```
     * @category draw
     */
    arrowCompo(O: Point2D, P: Point2D, dir: number, arrowLabel?: string | number, angleLabel?: string | number) {
        let X = Move(O, dir, 1)
        let Q = PdFoot(O, X, P)
        this.arrow(O, Q, arrowLabel)
        if (angleLabel !== undefined)
            this.angle(Q, O, P, angleLabel)
    }


    /**
     * Draw both components of the arrow.
     * ```
     * pen.arrowResolve([1,2],[3,4],0,'x')
     * // draw the horizontal and vertical components of arrow from [1,2] to [3,4]
     * // label the angle with the horizontal as 'x'
     * ```
     * @category draw
     */
    arrowResolve(
        O: Point2D, P: Point2D, dir: number,
        arrowLabels: (string | number | undefined)[] = [],
        angleLabel?: string | number
    ) {
        let [l1, l2] = arrowLabels
        this.arrowCompo(O, P, dir, l1, angleLabel)
        this.arrowCompo(O, P, dir + 90, l2)
    }



    /**
     * Draw a length between two points.
     * ```
     * pen.length([1,2],[3,4],'d')
     * // draw an length 'd' from [1,2] to [3,4]
     * ```
     * @category draw
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
     * @category draw
     */
    height(V: Point2D, [A, B]: [Point2D, Point2D], label?: string | number) {
        let F = PdFoot(A, B, V)
        this.dash(V, F)
        this.rightAngle(A, F, V)
        if (label !== undefined) {
            const c = vec2D(V, A).cross2D(vec2D(V, B))
            if (c > 0) {
                this.label.line([V, F], label)
            } else {
                this.label.line([F, V], label)
            }
        }
    }


    /**
     * Draw a ray from A to B.
     * ```
     * pen.ray([0,0],[1,1])
     * ```
     * @category draw
     */
    ray(A: Point2D, B: Point2D) {
        this.cv.line([A, B])
        this.cv.midArrowHead(A, B, 5)
    }


    /**
     * Draw an endless ray from A in the direction.
     * ```
     * pen.rayTo([0,0], 45)
     * ```
     * @category draw
     */
    rayTo(A: Point2D, dir: number) {
        let edgePoint = this.cv.edgePoint(A, dir)
        this.cv.line([A, edgePoint])
        this.cv.midArrowHead(A, edgePoint, 5)
    }


    /**
     * Draw a polyline given points.
     * ```
     * pen.polyline([0,0],[5,2],[3,4]) // draw a polyline through 3 points
     * ```
     * @category draw
     */
    polyline(...points: Point[]) {
        this.cv.line(points)
    }


    /**
     * Draw a polygon given points.
     * ```
     * pen.polygon([0,0],[5,2],[3,4]) // draw a triangle
     * ```
     * @category draw
     */
    polygon(...points: Point[]) {
        this.cv.shape(points)
    }

    /**
     * Fill a polygon given points.
     * ```
     * pen.polyfill([0,0],[5,2],[3,4]) // fill a triangle
     * ```
     * @category draw
     */
    polyfill(...points: Point[]) {
        this.cv.fill(points)
    }

    /**
     * Shade a polygon given points.
     * ```
     * pen.polyshade([0,0],[5,2],[3,4]) // shade a triangle
     * ```
     * @category draw
     */
    polyshade(...points: Point[]) {
        this.cv.shade(points)
    }


    /**
     * Draw and shade a polygon given points.
     * ```
     * pen.polyshape([0,0],[5,2],[3,4]) // draw and shade a triangle
     * ```
     * @category draw
     */
    polyshape(...points: Point[]) {
        this.polygon(...points)
        this.polyshade(...points)
    }


    /**
     * Fill a shape.
     * @category fill
     */
    fill = new PenFill(this, this.cv)




    /**
     * Shade a shape.
     * @category shade
     */
    shade = new PenShade(this, this.cv)





    /**
     * Linear Programming tools.
     * @category linProg
     */
    linProg = new PenLinProg(this, this.cv)





    /**
     * Draw an angle with label.
     * ```
     * pen.angle([0,0],[5,2],[3,4],'x')
     * ```
     * @category draw
     */
    angle(A: Point, O: Point, B: Point, label?: string | number, arc = 1, radius = -1) {
        if (radius < 0)
            radius = 15 + this.cv.getAngleAllowance(A, O, B, 40, 1.5)
        let space = 3
        this.cv.angle(A, O, B, radius, arc, space)

        if (label !== undefined && label !== '')
            this.label.angle([A, O, B], label, undefined, radius < 0 ? radius : radius + 13)
    }





    /**
     * Decorate equal side lengths.
     * ```
     * pen.decorate.equalSide([1,0],[3,2],2)
     * // a double-tick at the mid-pt of [1,0] and [3,2]
     * ```
     * @category decorator
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
     * @category decorator
     */
    bisectSide(A: Point, B: Point, tick = 1) {
        [A, B] = this.cv.pjs([A, B])
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
     * @category decorator
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
     * @category decorator
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
     * @category decorator
     */
    compass(point: Point2D) {
        this.cv.compass(point, 17, 20, 3.5)
    }



    /**
     * Write text.
     * ```
     * pen.write([1,2],'abc') // 'abc' at [1,2]
     * ```
     * @category text
     */
    write(point: Point, text: string) {
        this.cv.write(text, point)
    }



    /**
     * @category text
     */
    label = new PenLabel(this, this.cv)



    /**
     * The axis.
     * @category axis
     */
    axis = new PenAxis(this, this.cv)




    /**
     * The axis ticks.
     * @category axis
     */
    tick = new PenTick(this, this.cv)

    /**
     * The axis gridlines.
     * @category axis
     */
    grid = new PenGrid(this, this.cv)



    /**
     * The 3D pen
     * @category 3D
     */
    d3 = new PenD3(this, this.cv)




    /**
     * Set the background image url.
     * ```
     * pen.background('https://www2.pyc.edu.hk/img/pycnet_logo.png')
     * ```
     * @category export
     */
    background(url: string): void {
        this.cv.backgroundURL = url
    }



    /**
     * Export the canvas to image tag.
     * ```
     * question = pen.export(question,'imgQ')
     * // paste the canvas to the image tag with src field 'imgQ'
     * ```
     * @category export
     */
    export(html: string, placeholder: string): string {
        return this.cv.export(html, placeholder, false)
    };


    /**
     * Export the canvas to image tag, with white space trimmed.
     * ```
     * question = pen.exportTrim(question,'imgQ')
     * // paste the canvas to the image tag with src field 'imgQ'
     * ```
     * @category export
     */
    exportTrim(html: string, placeholder: string) {
        return this.cv.export(html, placeholder, true)
    };


    /**
     * Clear the canvas.
     * @category export
     */
    clear() {
        this.cv.clearImg()
    }

    /**
     * Temporarily save the img internally. Can be later restored by restoreImg.
     * @category export
     */
    saveImg() {
        this.cv.saveImg()
    }

    /**
     * Restored the previously saved img by saveImg.
     * @category export
     */
    restoreImg() {
        this.cv.restoreImg()
    }




};
