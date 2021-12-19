import { Pencil, capturable } from 'paint'

/**
 * @ignore
 */
const DEFAULT_POINT_RADIUS_PIXEL = 2

/**
 * @ignore
 */
const DEFAULT_CUTTER_LENGTH_PIXEL = 5



export class PenCls extends Pencil {

    /**
     * @ignore
     */
    constructor() {
        super()
        this.range.set([-5, 5], [-5, 5])
        this.size.set(1)
        this.set.reset()
    }



    /**
     * Setup of canvas coordinate range.
     * @category setting
     */
    range = {
        /**
         * @ignore
         */
        _pen: this as PenCls,

        /**
         * @ignore
         */
        AUTO_BORDER: false,

        /**
         * Set the coordinate range.
         * ```
         * pen.range.set([-5,5],[-2,4]) // -5<x<5 and -2<y<4
         * ```
         */
        set(xRange: [number, number], yRange: [number, number] = xRange) {
            this._pen.initRange(xRange, yRange)
        },

        /**
         * Set the coordinate range as a square.
         * ```
         * pen.range.square(5) // -5<x<5 and -5<y<5
         * pen.range.square(5,[1,2]) // -4<x<6 and -3<y<7
         * ```
         */
        square(size: number, center: Point2D = [0, 0]) {
            let [x, y] = center
            this.set([x - size, x + size], [y - size, y + size])
        },

        /**
         * Set the coordinate range by capture points or objects.
         * @param things - point / circle [[h,k],r] / sphere [[a,b,c],r]
         * ```
         * pen.range.capture([1,2],[3,4]) //  [1,2], [3,4] must be in-view
         * pen.range.capture([[1,2],3]) //  [1-3,2-3], [1+3,2+3] must be in-view
         * ```
         */
        capture(...things: capturable[]) {
            this._pen.cv.capture(things)
            this.AUTO_BORDER = true
        },

        /**
         * Set the coordinate range by capture points or objects, include O(0,0).
         * @param things - point / circle [[h,k],r] / sphere [[a,b,c],r]
         * ```
         * pen.range.extend([1,2],[3,4]) // [0,0], [1,2], [3,4] must be in-view
         * ```
         */
        extend(...things: capturable[]) {
            this.capture([0, 0], ...things)
        }
    }


    /**
     * Setup of canvas size.
     * @category setting
     */
    size = {
        /**
         * @ignore
         */
        _pen: this as PenCls,

        /**
         * Set the canvas size.
         * ```
         * pen.size.set(0.5,2) // width = 0.5 inch, height = 2 inch
         * ```
         */
        set(widthInch: number = 1, heightInch = widthInch) {
            this._pen.initSize(widthInch, heightInch)

            if (this._pen.range.AUTO_BORDER)
                this._pen.initOuterBorder()

            this._pen.set.reset()
        },

        /**
         * Set the canvas size by resolution.
         * ```
         * pen.size.resolution(0.1,0.2)
         * // 0.1 inch for each x-unit, and 0.2 inch for each y-unit
         * ```
         */
        resolution(xIPU = 0.1, yIPU = xIPU) {
            let xScale = this._pen.cv.dx() * xIPU
            let yScale = this._pen.cv.dy() * yIPU
            this.set(xScale, yScale)
        },

        /**
         * Set the canvas size, locking x-y ratio.
         * ```
         * pen.size.lock(1, 2) // max at width = 1 inch and height = 2 inch
         * pen.size.lock(0.5) // max at both = 0.5 inch
         * ```
         */
        lock(maxWidthInch = 1, maxHeightInch = maxWidthInch) {
            let ratio = this._pen.cv.yxRatio()
            if (maxWidthInch * ratio < maxHeightInch) {
                this.set(maxWidthInch, maxWidthInch * ratio)
            } else {
                this.set(maxHeightInch / ratio, maxHeightInch)
            }
        },
    }


    /**
     * Settings.
     * @category setting
     */
    set = {
        /**
         * @ignore
         */
        _pen: this as PenCls,
        /**
         * @ignore
         */
        _cv: this.cv,
        /**
         * Set the weight of the pen (line width).
         * ```
         * pen.set.weight(2) // set a bold line
         * ```
         */
        weight(weight = 1): void {
            this._cv.$WEIGHT = weight
        },
        /**
         * Set the color of both filling and stroke.
         * ```
         * pen.set.color('grey')
         * ```
         */
        color(color = "black"): void {
            this._cv.$COLOR = color
        },
        /**
         * Set the transparency.
         * @param value - 0 is transparent, 1 is opaque
         * ```
         * pen.set.alpha(0.9) // slightly transparent
         * ```
         */
        alpha(value = 1): void {
            this._cv.$ALPHA = value
        },
        /**
         * Set the dash pattern of line.
         * ```
         * pen.set.dash([5,5]) // set dash line
         * pen.set.dash(5) // same
         * pen.set.dash(true) // same
         * pen.set.dash(false) // set solid line
         * ```
         */
        dash(segments: (number[] | number | boolean) = []): void {
            this._cv.$DASH = segments
        },
        /**
         * Set the horizontal alignment of text.
         * ```
         * pen.set.textAlign('left') // {'left','right','center'}
         * ```
         */
        textAlign(align: CanvasTextAlign = "center"): void {
            this._cv.$TEXT_ALIGN = align
        },
        /**
         * Set the vertical alignment of text.
         * ```
         * pen.set.textBaseline('bottom') // {'top','bottom','middle'}
         * ```
         */
        textBaseline(baseline: CanvasTextBaseline = "middle"): void {
            this._cv.$TEXT_BASELINE = baseline
        },
        /**
         * Set the size of text.
         * ```
         * pen.set.textSize(2) // double-sized text
         * ```
         */
        textSize(size = 1): void {
            this._cv.$TEXT_SIZE = size
        },

        /**
         * Set italic style of text.
         * ```
         * pen.set.textItalic(true)
         * ```
         */
        textItalic(italic = false): void {
            this._cv.$TEXT_ITALIC = italic
        },

        /**
         * Set text direction.
         * ```
         * pen.set.textDir(90) // vertical text
         * ```
         */
        textDir(angle = 0): void {
            this._cv.$TEXT_DIR = angle
        },

        /**
         * Set text latex mode.
         * ```
         * pen.set.textLatex(true)
         * ```
         */
        textLatex(on = false): void {
            this._cv.$TEXT_LATEX = on
        },

        /**
         * Set the center for label dodge.
         * ```
         * pen.set.labelCenter(A,B,C,D) // centroid of A,B,C,D
         * pen.set.labelCenter() // center of canvas
         * ```
         */
        labelCenter(...centers: Point[]): void {
            this._cv.$LABEL_CENTER = centers
        },

        /**
         * Set length unit for line label.
         * ```
         * pen.set.lengthUnit('cm')
         * ```
         */
        lengthUnit(text: string = ''): void {
            this._cv.$LENGTH_UNIT = text
        },

        /**
         * Set the mode for angle.
         * All angles (e.g. AOB) will be understood as this mode.
         * ```
         * pen.set.angle('polar') // {normal' | 'polar' | 'reflex'}
         * ```
         */
        angle(mode: 'normal' | 'polar' | 'reflex' = 'normal'): void {
            this._cv.$ANGLE_MODE = mode
        },

        /**
         * Set 3D projector function.
         * ```
         * pen.set.Projector3D(60, 0.5)
         * // tilted 60 degree, 0.5 depth for y-axis
         * ```
         */
        projector3D(angle: number = 60, depth: number = 0.5): void {
            this._cv.$3D_ANGLE = angle
            this._cv.$3D_DEPTH = depth
        },

        /**
         * Ser the border inch when auto creating outer border.
         * ```
         * pen.set.border(0.2) // 0.2 inch
         * ```
         */
        border(border: number = 0.2): void {
            this._cv.$BORDER = border
        },

        /**
         * Ser the mode for direction of line label.
         * ```
         * pen.set.lineLabel('auto') // {'auto', 'left', 'right'}
         * ```
         */
        lineLabel(setting: 'auto' | 'left' | 'right' = 'auto'): void {
            this._cv.$LINE_LABEL = setting
        },


        /**
         * Reset all pen settings.
         */
        reset() {
            this.weight()
            this.color()
            this.alpha()
            this.dash()
            this.textAlign()
            this.textBaseline()
            this.textSize()
            this.textItalic()
            this.textDir()
            this.textLatex()
            this.labelCenter()
            this.lengthUnit()
            this.angle()
            this.lineLabel()
        },

        /**
         * Reset all pen settings, including border and 3D.
         */
        resetAll() {
            this.reset()
            this.border()
            this.projector3D()
        }


    };

    /**
     * Plot an explicit or parametric function.
     * @category graph
     * ```
     * pen.plot(x=>x**2,1,2) // y=x^2 from x = 1 to 2
     * pen.plot(x=>x**2) // y=x^2 in from x = xmin to xmax
     * pen.plot(t=>[cos(t),sin(t)],0,360) // a unit circle
     * ```
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
    graph = {
        /**
         * @ignore
         */
        _pen: this as PenCls,

        /**
         * Draw a circle (x-h)^2+(y-k)^2 = r^2.
         * ```
         * pen.graph.circle([1,2],3) // (x-1)^2+(y-2)^2 = 9
         * ```
         */
        circle(center: Point2D, radius: number) {
            const [h, k] = center
            this._pen.plot(t => [h + radius * cos(t), k + radius * sin(t)], 0, 365)
        },

        /**
         * Draw an arc. AOB must be in polar direction.
         * ```
         * pen.graph.arc([0,0],[1,0],[-1,0]) // upper semi-unit circle
         *
         * ```
         */
        arc(O: Point2D, A: Point2D, B: Point2D) {
            this._pen.cv.sectoroidLine(O, A, B, [])
        },

        /**
         * Draw a sector. AOB must be in polar direction.
         * ```
         * pen.graph.sector([0,0],[1,0],[0,1]) // quarter circle sector
         * ```
         */
        sector(O: Point2D, A: Point2D, B: Point2D) {
            this._pen.cv.sectoroidLine(O, A, B, [O, A])
        },

        /**
         * Draw a circle segment. AOB must be in polar direction.
         * ```
         * pen.graph.segment([0,0],[1,0],[0,1]) // quarter circle segment
         * ```
         */
        segment(O: Point2D, A: Point2D, B: Point2D) {
            this._pen.cv.sectoroidLine(O, A, B, [A])
        },

        /**
         * Draw a quadratic graph.
         * ```
         * pen.graph.quadratic(1,2,3) // y=x^2+2x+3.
         * ```
         */
        quadratic(a: number, b: number, c: number) {
            this._pen.plot(x => a * x * x + b * x + c)
        },

        /**
         * Draw a line y=mx+c.
         * ```
         * pen.graph.line(2,1) // y=2x+1
         * ```
         */
        line(m: number, c: number) {
            const { xmin, xmax } = this._pen.cv
            const y = (x: number) => m * x + c
            this._pen.line([xmin, y(xmin)], [xmax, y(xmax)])
        },

        /**
         * Draw a horizontal line.
         * ```
         * pen.graph.horizontal(2) // y=2
         * ```
         */
        horizontal(y: number) {
            this._pen.cv.lineHori(y)
        },

        /**
         * Draw a vertical line.
         * ```
         * pen.graph.vertical(2) // x=2
         * ```
         */
        vertical(x: number) {
            this._pen.cv.lineVert(x)
        },

        /**
         * Draw a line ax+by+c=0.
         * ```
         * pen.graph.linear(1,2,3) // x+2y+3=0
         * ```
         */
        linear(a: number, b: number, c: number) {
            if (a === 0 && b !== 0) this.horizontal(-c / b)
            if (b == 0 && a !== 0) this.vertical(-c / a)
            if (a !== 0 && b !== 0) this.line(-a / b, -c / b)
        },

        /**
         * Draw a line through two points.
         * ```
         * pen.graph.through([0,0],[1,1]) // y = x
         * ```
         */
        through(A: Point, B: Point) {
            let ptA = this._pen.pj(A)
            let ptB = this._pen.pj(B)
            let [a, b, c] = lin().byTwoPoints(ptA, ptB).toLinear()
            this.linear(a, b, c)
        },

        /**
         * Draw the perpendicular bisector of two points.
         * ```
         * pen.graph.perpBisector([0,0],[2,2]) // y = -x+2
         * ```
         */
        perpBisector(A: Point2D, B: Point2D) {
            let [a, b, c] = lin().byBisector(A, B).toLinear()
            this.linear(a, b, c)
        }

    };



    /**
     * Draw a point.
     * @category draw
     * ```
     * pen.point([1,2]) // draw a point at [1,2]
     * pen.point([1,2],"A") // draw a point at [1,2] and label as "A"
     * ```
     */
    point(position: Point, label?: string) {
        this.cv.disc(position, DEFAULT_POINT_RADIUS_PIXEL)
        if (label !== undefined)
            this.label.point(position, label)
    }

    /**
     * Draw a point.
     * @category draw
     * ```
     * pen.points({A,B}) // mark and label point A as 'A', point B as 'B'
     * pen.points({A,B},false) // mark point A and B, without label
     * ```
     */
    points(positions: { [k: string]: Point }, label = true) {
        for (let k in positions) {
            if (label) {
                this.point(positions[k], k)
            } else {
                this.point(positions[k])
            }
        }
    }

    /**
     * Draw a cutter to a horizontal line.
     * @category draw
     * ```
     * pen.cutX([1,2]) // draw a vertical cutter at [1,2]
     * pen.cutX(1) // same as cutX([1,0])
     * ```
     */
    cutX(position: Point2D | number, label?: string) {
        if (typeof position === 'number') position = [position, 0]
        this.cv.tickVert(position, DEFAULT_CUTTER_LENGTH_PIXEL)
        if (label !== undefined) this.label.point(position, label, 270)
    }

    /**
     * Draw a cutter to a vertical line.
     * @category draw
     * ```
     * pen.cutY([1,2]) // draw a horizontal cutter at [1,2]
     * pen.cutY(1) // same as cutY([0,1])
     * ```
     */
    cutY(position: Point2D | number, label?: string) {
        if (typeof position === 'number') position = [0, position]
        this.cv.tickHori(position, DEFAULT_CUTTER_LENGTH_PIXEL)
        if (label !== undefined) this.label.point(position, label, 180)
    }


    /**
     * Draw a guide line from `point` to the x-axis.
     * @category draw
     * ```
     * pen.guideX([1,2],'1') // draw guide from [1,2] and label '1' on x-axis
     * ```
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
     * @category draw
     * ```
     * pen.guideY([1,2],'2') // draw guide from [1,2] and label '2' on y-axis
     * ```
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
     * @category draw
     * ```
     * pen.circle([1,2], 10) // draw a circle centered at [1,2] with r=10px
     * pen.circle([1,2], 10, [0,180]) // draw a upper semi-circle
     * ```
     */
    circle(center: Point2D, radius: number, angles: [number, number] = [0, 360], fill = false) {
        this.cv.circle(center, radius)
        if (fill) this.cv.disc(center, radius)
    }


    /**
     * Fill a disc.
     * @category draw
     * ```
     * pen.disc([1,2], 10) // draw a disc centered at [1,2] with 10 px radius
     * ```
     */
    disc(center: Point2D, radius: number) {
        this.cv.disc(center, radius)
    }


    /**
     * Shade a disc.
     * @category draw
     * ```
     * pen.halo([1,2], 10) // shade a disc centered at [1,2] with 10 px radius
     * ```
     */
    halo(center: Point2D, radius: number) {
        this.cv.halo(center, radius)
    }



    /**
     * Draw a dot.
     * @category draw
     * ```
     * pen.dot([1,2]) // draw a dot at [1,2]
     * ```
     */
    dot(point: Point2D) {
        this.disc(point, 4)
    }


    /**
     * Draw a hole.
     * @category draw
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
     * @category draw
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
     * @category draw
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
     * @category draw
     * ```
     * pen.arrow([1,2],[3,4]) // draw an arrow from [1,2] to [3,4]
     * ```
     */
    arrow(A: Point, B: Point, label?: string | number) {
        this.cv.arrow(A, B, 5)
        if (label !== undefined) this.label.line([A, B], label)
    }

    /**
     * Draw the component of the arrow.
     * @category draw
     * ```
     * pen.arrowCompo([1,2],[3,4],0,'x')
     * // draw the horizontal component of arrow from [1,2] to [3,4]
     * // label the angle as 'x'
     * ```
     */
    arrowCompo(O: Point2D, P: Point2D, dir: number, angleLabel?: string | number) {
        let X = Move(O, dir, 1)
        let Q = PdFoot(O, X, P)
        this.arrow(O, Q)
        if (angleLabel !== undefined)
            this.angle(Q, O, P, angleLabel)
    }


    /**
     * Draw both components of the arrow.
     * @category draw
     * ```
     * pen.arrowResolve([1,2],[3,4],0,'x')
     * // draw the horizontal and vertical components of arrow from [1,2] to [3,4]
     * // label the angle with the horizontal as 'x'
     * ```
     */
    arrowResolve(O: Point2D, P: Point2D, dir: number, angleLabel?: string | number) {
        this.arrowCompo(O, P, dir, angleLabel)
        this.arrowCompo(O, P, dir + 90)
    }



    /**
     * Draw a length between two points.
     * @category draw
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
     * @category draw
     * ```
     * pen.height([0,4],[[-1,0],[1,0]],'h')
     * // draw the height 'h' from [0,4] to x-axis
     * ```
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
     * Draw a polyline given points.
     * @category draw
     * ```
     * pen.polyline([0,0],[5,2],[3,4]) // draw a polyline through 3 points
     * ```
     */
    polyline(...points: Point[]) {
        this.cv.line(points)
    }


    /**
     * Draw a polygon given points.
     * @category draw
     * ```
     * pen.polygon([0,0],[5,2],[3,4]) // draw a triangle
     * ```
     */
    polygon(...points: Point[]) {
        this.cv.shape(points)
    }

    /**
     * Fill a polygon given points.
     * @category draw
     * ```
     * pen.polyfill([0,0],[5,2],[3,4]) // fill a triangle
     * ```
     */
    polyfill(...points: Point[]) {
        this.cv.fill(points)
    }

    /**
     * Shade a polygon given points.
     * @category draw
     * ```
     * pen.polyshade([0,0],[5,2],[3,4]) // shade a triangle
     * ```
     */
    polyshade(...points: Point[]) {
        this.cv.shade(points)
    }


    /**
     * Draw and shade a polygon given points.
     * @category draw
     * ```
     * pen.polyshape([0,0],[5,2],[3,4]) // draw and shade a triangle
     * ```
     */
    polyshape(...points: Point[]) {
        this.polygon(...points)
        this.polyshade(...points)
    }



    /**
     * Fill a shape.
     * @category fill
     */
    fill = {
        /**
         * @ignore
         */
        _pen: this as PenCls,

        /**
         * Fill a circle.
         * ```
         * pen.fill.circle([1,2],3) // fill (x-1)^2+(y-2)^2 = 9.
         * ```
         */
        circle(center: Point2D, radius: number) {
            let points = cal.traceCircle(center, radius, [0, 360])
            this._pen.polyfill(...points)
        },

        /**
         * Fill a sector. AOB must be in polar direction.
         * ```
         * pen.fill.sector([0,0],[1,0],[0,1]) // fill a quarter circle sector
         * ```
         */
        sector(O: Point2D, A: Point2D, B: Point2D) {
            this._pen.cv.sectoroidFill(O, A, B, [O])
        },

        /**
         * Fill a circle segment. AOB must be in polar direction.
         * ```
         * pen.fill.segment([0,0],[1,0],[0,1]) // fill a quarter circle segment
         * ```
         */
        segment(O: Point2D, A: Point2D, B: Point2D) {
            this._pen.cv.sectoroidFill(O, A, B, [])
        },
        /**
         * Fill a sector-like area. AOB must be in polar direction.
         * ```
         * pen.fill.sectoroid([0,0],[1,0],[0,1],[[-1,0]]) // fill a long sector-like region
         * ```
         */
        sectoroid(O: Point2D, A: Point2D, B: Point2D, vertices: Point2D[]) {
            this._pen.cv.sectoroidFill(O, A, B, vertices)
        },

        /**
         * Fill a rectangle.
         * ```
         * pen.fill.rect([0,0],[2,3]) // fill a rectangle [[0,0],[2,0],[2,3],[0,3]]
         * ```
         */
        rect(A: Point2D, C: Point2D) {
            let [a, b] = A
            let [c, d] = C
            this._pen.polyfill([a, b], [c, b], [c, d], [a, d])
        }
    };



    /**
     * Shade a shape.
     * @category shade
     */
    shade = {
        /**
         * @ignore
         */
        _pen: this as PenCls,

        /**
         * Shade a circle (x-h)^2+(y-k)^2 = r^2.
         * ```
         * pen.shade.circle([1,2],3) // shade (x-1)^2+(y-2)^2 = 9.
         * ```
         */
        circle(center: Point2D, radius: number) {
            let points = cal.traceCircle(center, radius, [0, 360])
            this._pen.polyshade(...points)
        },

        /**
         * Shade a sector. AOB must be in polar direction.
         * ```
         * pen.shade.sector([0,0],[1,0],[0,1]) // shade a quarter circle sector
         * ```
         */
        sector(O: Point2D, A: Point2D, B: Point2D) {
            this._pen.cv.sectoroidShade(O, A, B, [O])
        },

        /**
         * Shade a circle segment. AOB must be in polar direction.
         * ```
         * pen.shade.segment([0,0],[1,0],[0,1]) // shade a quarter circle segment
         * ```
         */
        segment(O: Point2D, A: Point2D, B: Point2D) {
            this._pen.cv.sectoroidShade(O, A, B, [])
        },

        /**
         * Shade a sector-like area. AOB must be in polar direction.
         * ```
         * pen.shade.sectoroid([0,0],[1,0],[0,1],[[-1,0]]) // shade a long sector-like region
         * ```
         */
        sectoroid(O: Point2D, A: Point2D, B: Point2D, vertices: Point2D[]) {
            this._pen.cv.sectoroidShade(O, A, B, vertices)
        },

        /**
         * Shade a rectangle.
         * ```
         * pen.shade.rect([0,0],[2,3]) // shade a rectangle [[0,0],[2,0],[2,3],[0,3]]
         * ```
         */
        rect(A: Point2D, C: Point2D) {
            let [a, b] = A
            let [c, d] = C
            this._pen.polyshade([a, b], [c, b], [c, d], [a, d])
        }
    };




    /**
     * Linear Programming tools.
     * @category linProg
     */
    linProg = {
        /**
         * @ignore
         */
        _pen: this as PenCls,

        /**
         * Draw a constraint line.
         * ```
         * pen.linProg.constraint([1,2,'>',3])
         * ```
         */
        drawConstraints(...constraints: Constraint[]) {
            for (let c of toReins(constraints)) {
                if (c.canEqual()) {
                    this._pen.graph.linear(...c.toLinear())
                } else {
                    this._pen.set.dash(true)
                    this._pen.graph.linear(...c.toLinear())
                    this._pen.set.dash()
                }
            }
        },
        /**
         * Shade the region of the constraint set.
         * ```
         * pen.linProg.shadeConstraints([[1,2,'>',3]])
         * ```
         */
        shadeConstraints(constraints: Constraint[]) {
            let poly = toReins(constraints).polygon()
            this._pen.polyshade(...poly)
        },

        /**
         * Label coordinates of the vertices of the feasible region.
         * ```
         * pen.linProg.verticesCoord([
         * [1,0,'>',0],
         * [0,1,'>',0],
         * [1,1,'<',2]
         * ])
         * ```
         */
        verticesCoord(constraints: Constraint[]) {
            let vs = toReins(constraints).vertices()
            for (let v of vs) {
                this._pen.label.coordinates(v)
            }
        }




    };





    /**
     * Draw an angle with label.
     * @category draw
     * ```
     * pen.angle([0,0],[5,2],[3,4],'x')
     * ```
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
     * @category decorator
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
     * @category decorator
     * ```
     * pen.decorate.bisectSide([0,0], [2,2], 2)
     * // two double-ticks bisecting [0,0] and [2,2] at their mid-pt
     * ```
     */
    bisectSide(A: Point, B: Point, tick = 1) {
        [A, B] = this.pjs([A, B])
        let M = Mid(A, B)
        this.equalSide(A, M, tick)
        this.equalSide(B, M, tick)
    }


    /**
     * Decorate parallel side.
     * @category decorator
     * ```
     * pen.decorate.parallel([1,0],[3,2],2)
     * // a double-tick parallel mark at the mid-pt of [1,0] and [3,2]
     * ```
     */
    parallel(A: Point, B: Point, tick = 1) {
        this.cv.parallel(A, B, 4, tick, 6)
    }



    /**
     * Decorate a right-angle AOB.
     * @category decorator
     * ```
     * pen.decorate.rightAngle([1,0],[0,0],[3,2])
     * // an right-angle AOB
     * ```
     */
    rightAngle(A: Point, O: Point, B?: Point, size = 12) {
        A = this.pj(A)
        O = this.pj(O)
        B ??= Rotate(A, 90, O)
        B = this.pj(B)
        this.cv.rightAngle(A, O, B, size)
    }

    /**
     * Decorate a compass.
     * @category decorator
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
     * @category text
     * ```
     * pen.write([1,2],'abc') // 'abc' at [1,2]
     * ```
     */
    write(point: Point, text: string) {
        this.cv.write(text, point)
    }

    /**
     * @category text
     */
    label = {
        /**
         * @ignore
         */
        _pen: this as PenCls,

        /**
         * Add a label to a point.
         * ```
         * pen.label.point([1,2],'A',180)
         * // label the point [1,2] as 'A', place the label on the left (180 degree)
         * ```
         */
        point(point: Point, text = '', dir?: number, radius = 15) {
            if (dir !== undefined) {
                this._pen.cv.labelPoint(text, point, dir, radius)
            } else {
                this._pen.cv.labelPointAuto(text, point, radius)
            }
        },

        /**
         * Add a label to points, using index as text.
         * ```
         * pen.label.points({A,B}) // label point A as 'A', point B as 'B'
         * ```
         */
        points(points: { [k: string]: Point }) {
            for (let k in points) {
                this.point(points[k], k)
            }
        },


        /**
         * Add a label to points, using index as text, with label center set as center of points.
         * ```
         * pen.label.vertices({A,B}) // label point A as 'A', point B as 'B'
         * ```
         */
        vertices(points: { [k: string]: Point }) {
            this._pen.cv.save()
            this._pen.set.labelCenter(...Object.values(points))
            this.points(points)
            this._pen.cv.restore()
        },


        /**
         * Add a label to an angle AOB.
         * ```
         * pen.label.angle([[1,2],[0,0],[-2,1]],'x')
         * // label the angle as 'x'
         * ```
         */
        angle([A, O, B]: [Point, Point, Point], text: string | number, dir = 0, radius = -1) {
            if (radius < 0) {
                radius = 28 + this._pen.cv.getAngleAllowance(A, O, B, 40, 1.5)
            }
            this._pen.cv.labelAngle(text, [A, O, B], dir, radius)
        },

        /**
         * Add a label to a line AB.
         * ```
         * pen.label.line([[0,0],[2,4]],'L') // label the line as 'L'
         * ```
         */
        line([A, B]: [Point, Point], text: string | number, dir = 0, radius = 15) {
            this._pen.cv.labelLine(text, [A, B], dir, radius)
        },


        /**
         * Add a label to a polygon.
         * ```
         * pen.label.polygon([[0,0],[1,0],[0,1]],'L') // label the polygon as 'L'
         * ```
         */
        polygon(points: Point[], text: string | number) {
            let pts = this._pen.pjs(points)
            this._pen.cv.labelPoint(String(text), Mid(...pts), 0, 0)
        },

        /**
         * Add a coordinates label to a point.
         * ```
         * pen.label.coordinates([1,2],180)
         * // label the point [1,2] as '(1, 2)', place the label on the left (180 degree)
         * ```
         */
        coordinates(point: Point2D, dir?: number, radius = 15) {
            let [x, y] = point
            x = Fix(x, 1)
            y = Fix(y, 1)
            let text = `(${x}, ${y})`
            this.point(point, text, dir, radius)
        }

    };






    /**
     * The axis.
     * @category axis
     */

    axis = {
        /**
         * @ignore
         */
        _pen: this as PenCls,

        /**
         * Draw x-axis.
         * ```
         * pen.axis.x('time') // draw the x-axis, label as 'time'
         * ```
         */
        x(label = "x") {
            this._pen.cv.xAxis()
            this._pen.cv.xAxisLabel(label)
        },

        /**
         * Draw y-axis.
         * ```
         * pen.axis.y('height') // draw the y-axis, label as 'height'
         * ```
         */
        y(label = "y") {
            this._pen.cv.yAxis()
            this._pen.cv.yAxisLabel(label)
        },

        /**
         * Draw both axis.
         * ```
         * pen.axis.xy('x','y') // draw both axis, label as 'x' and 'y'
         * ```
         */
        xy(xlabel = "x", ylabel = "y") {
            this.x(xlabel)
            this.y(ylabel)
        },
    };

    /**
     * The axis ticks.
     * @category axis
     */
    tick = {
        /**
         * @ignore
         */
        _pen: this as PenCls,

        /**
         * Draw ticks on the x-axis.
         * ```
         * pen.tick.x(2) // draw ticks on the x-axis, at interval 2 units
         * ```
         */
        x(interval = 1, mark = true) {
            this._pen.cv.xAxisTick(interval)
            if (mark) this._pen.cv.xAxisTickMark(interval)

        },

        /**
         * Draw ticks on the y-axis.
         * ```
         * pen.tick.y(2) // draw ticks on the y-axis, at interval 2 units
         * ```
         */
        y(interval = 1, mark = true) {
            this._pen.cv.yAxisTick(interval)
            if (mark) this._pen.cv.yAxisTickMark(interval)
        },

        /**
         * Draw ticks on both axis.
         * ```
         * pen.tick.xy(2) // draw ticks on both axis, at interval 2 units
         * ```
         */
        xy(interval = 1, mark = true) {
            this.x(interval, mark)
            this.y(interval, mark)
        }
    };

    /**
     * The axis gridlines.
     * @category axis
     */
    grid = {
        /**
         * @ignore
         */
        _pen: this as PenCls,

        /**
         * Draw gridlines on the x-axis.
         * ```
         * pen.grid.x(2) // draw gridlines on the x-axis, at interval 2 units
         * ```
         */
        x(interval = 1) {
            this._pen.cv.xAxisGrid(interval)
        },

        /**
         * Draw gridlines on the y-axis.
         * ```
         * pen.grid.y(2) // draw gridlines on the y-axis, at interval 2 units
         * ```
         */
        y(interval = 1) {
            this._pen.cv.yAxisGrid(interval)
        },

        /**
         * Draw gridlines on both axis.
         * ```
         * pen.grid.xy(2) // draw gridlines on both axis, at interval 2 units
         * ```
         */
        xy(interval = 1) {
            this.x(interval)
            this.y(interval)
        }
    };




    /**
     * The 3D pen
     * @category 3D
     */
    d3 = {
        /**
         * @ignore
         */
        _pen: this as PenCls,


        /**
         * Draw the 3D axis, for development only.
         * @deprecated
         * ```
         * pen.d3.axis3D(100) // draw 3D axis with length 100
         * ```
         */
        axis3D(length: number = 999): void {
            this._pen.line([-length, 0, 0], [length, 0, 0])
            this._pen.line([0, -length, 0], [0, length, 0])
            this._pen.dash([0, 0, -length], [0, 0, length])
        },



        /**
         * Draw a circle in 3D
         * ```
         * pen.d3.circle([0,0,1],2,[1,0,0],[0,1,0]) // draw a xy circle with radius 2
         * ```
         */
        circle(center: Point3D, radius: number, xVec: Point3D, yVec: Point3D, {
            line = true,
            dash = !true,
            shade = !true,
            fill = !true,
            arc = [0, 360]
        }: {
            line?: boolean
            dash?: boolean
            shade?: boolean
            fill?: boolean
            arc?: [number, number]
        } = {}): void {
            let ps = cal.traceCircle([0, 0], radius, arc)
            let ps3D = Embed(ps, center, xVec, yVec)

            if (line) {
                this._pen.cv.save()
                if (dash) this._pen.set.dash(true)
                if (arc[1] - arc[0] >= 360) {
                    this._pen.polygon(...ps3D)
                } else {
                    this._pen.polyline(...ps3D)
                }
                this._pen.cv.restore()
            }

            if (shade)
                this._pen.polyshade(...ps3D)

            if (fill)
                this._pen.polyfill(...ps3D)
        },


        /**
         * Draw a circle on XZ plane in 3D
         * ```
         * pen.d3.circleXZ([0,3,0],2) // draw a xz circle with radius 2
         * ```
         */
        circleXZ(center: Point3D, radius: number, {
            line = true,
            dash = !true,
            shade = !true,
            fill = !true,
            arc = [0, 360]
        }: {
            line?: boolean
            dash?: boolean
            shade?: boolean
            fill?: boolean
            arc?: [number, number]
        } = {}) {
            this.circle(center, radius, [1, 0, 0], [0, 0, 1], {
                line,
                dash,
                shade,
                fill,
                arc
            })
        },


        /**
         * Draw a circle on YZ plane in 3D
         * ```
         * pen.d3.circleYZ([3,0,0],2) // draw a yz circle with radius 2
         * ```
         */
        circleYZ(center: Point3D, radius: number, {
            line = true,
            dash = !true,
            shade = !true,
            fill = !true,
            arc = [0, 360]
        }: {
            line?: boolean
            dash?: boolean
            shade?: boolean
            fill?: boolean
            arc?: [number, number]
        } = {}) {
            this.circle(center, radius, [0, 1, 0], [0, 0, 1], {
                line,
                dash,
                shade,
                fill,
                arc
            })
        },



        /**
         * Draw a circle on XY plane in 3D
         * ```
         * pen.d3.circleXY([0,0,3],2) // draw a xy circle with radius 2
         * ```
         */
        circleXY(center: Point3D, radius: number, {
            line = true,
            dash = !true,
            shade = !true,
            fill = !true,
            arc = [0, 360]
        }: {
            line?: boolean
            dash?: boolean
            shade?: boolean
            fill?: boolean
            arc?: [number, number]
        } = {}) {
            this.circle(center, radius, [1, 0, 0], [0, 1, 0], {
                line,
                dash,
                shade,
                fill,
                arc
            })
        },


        /**
         * Draw a sphere in 3D
         * ```
         * pen.d3.sphere([1,0,0],3) // draw a sphere with radius 3
         * ```
         */
        sphere(center: Point3D, radius: number, {
            baseDash = !true,
            baseShade = !true,
            radiusLine = !true,
            radiusDash = !true,
            radiusLabel = '',
            lowerOnly = !true,
            upperOnly = !true
        } = {}): void {
            if (upperOnly)
                this.circleXZ(center, radius, { arc: [0, 180] })

            if (lowerOnly)
                this.circleXZ(center, radius, { arc: [180, 360] })

            if (!upperOnly && !lowerOnly)
                this.circleXZ(center, radius, { arc: [0, 360] })


            this.circleXY(center, radius, { line: true, dash: baseDash, shade: baseShade })

            let leftEnd = vec3D(center).add([radius, 0, 0]).toArray()

            if (radiusLine)
                this._pen.line(center, leftEnd)

            if (radiusDash)
                this._pen.dash(center, leftEnd)

            if (radiusLabel.length > 0)
                this._pen.label.line([leftEnd, center], radiusLabel)
        },


        /**
         * Return the envelop of a frustum
         * @param lowerBase - the points in the lower base
         * @param upperBase - the point in the upper base, must have the same length as lowerBase
         * ```
         * let [A,B,C] = [[0,0,0],[1,0,0],[0,1,0]]
         * let [D,E,F] = [[0,0,3],[1,0,3],[0,1,3]]
         * pen.d3.envelope([A,B,C],[D,E,F])
         * ```
         */
        envelope(lowerBase: Point3D[], upperBase: Point3D[]): [Point3D, Point3D][] {
            const LB = toList(lowerBase)
            const UB = toList(upperBase)

            let isPolar = (A: Point3D, O: Point3D, B: Point3D) =>
                AnglePolar(
                    this._pen.pj(A),
                    this._pen.pj(O),
                    this._pen.pj(B))
                    < 180 ? 1 : -1

            let lastPolarwise = isPolar(LB.cyclicAt(-1)!, UB.cyclicAt(-1)!, LB.cyclicAt(0)!)
            let arr: [Point3D, Point3D][] = []

            for (let i = 0; i < LB.length; i++) {
                let polarwise = isPolar(LB.cyclicAt(i)!, UB.cyclicAt(i)!, LB.cyclicAt(i + 1)!)
                if (lastPolarwise * polarwise === -1)
                    arr.push([LB.cyclicAt(i)!, UB.cyclicAt(i)!])
                lastPolarwise = polarwise
            }

            return arr
        },


        /**
         * Draw a frustum
         * ```
         * let [A,B,C] = [[0,0,0],[2,0,0],[0,2,0]]
         * let V = [0,0,5]
         * pen.d3.frustum([A,B,C],[V]) // draw a cone
         * ```
         */
        frustum(lowerBase: Point3D[], upperBase: Point3D[] | Point3D, {
            base = true,
            height = !true,
            shadeLower = !true,
            shadeUpper = !true,
            envelope = !true,
        } = {}) {


            if (owl.point3D(upperBase)) {
                upperBase = Array(lowerBase.length).fill(upperBase)
            }

            if (base) {
                this._pen.polygon(...lowerBase)
                this._pen.polygon(...upperBase)
            }

            if (envelope) {
                let env = this.envelope(lowerBase, upperBase)
                for (let e of env) {
                    this._pen.line(e[0], e[1])
                }
            } else {
                for (let i = 0; i < lowerBase.length; i++) {
                    this._pen.line(lowerBase[i], upperBase[i])
                }
            }

            if (height) {
                let V = toShape3D(upperBase).mean().toArray()
                let [A, B, C] = lowerBase
                let O = PdFoot3D(V, [A, B, C])
                this._pen.dash(O, V)
            }
            if (shadeLower)
                this._pen.polyshade(...lowerBase)
            if (shadeUpper)
                this._pen.polyshade(...upperBase)
        },


        /**
         * Draw a prism along the z-direction
         * ```
         * let [A,B,C] = [[0,0],[2,0],[0,2]]
         * pen.d3.prismZ([A,B,C],0,4) // draw a triangular prism
         * ```
         */
        prismZ(lowerBase: Point2D[], lowerZ: number, upperZ: number, {
            base = true,
            height = !true,
            shadeLower = !true,
            shadeUpper = !true,
            envelope = !true,
        } = {}) {
            let lower = EmbedZ(lowerBase, lowerZ)
            let upper = EmbedZ(lowerBase, upperZ)
            this.frustum(lower, upper, {
                base,
                height,
                shadeLower,
                shadeUpper,
                envelope
            })
        },



        /**
         * Draw a cylinder along the z-direction
         * ```
         * pen.d3.cylinderZ([0,0],2,0,4) // draw a cylinder
         * ```
         */
        cylinderZ(center: Point2D, radius: number, lowerZ: number, upperZ: number, {
            base = true,
            height = !true,
            shadeLower = !true,
            shadeUpper = !true,
            envelope = true,
        } = {}) {
            let ps = cal.traceCircle(center, radius, [0, 360])
            this.prismZ(ps, lowerZ, upperZ, {
                base,
                height,
                shadeLower,
                shadeUpper,
                envelope
            })
        },

        /**
         * Draw a pyramid along the z-direction
         * ```
         * let [A,B,C] = [[0,0],[2,0],[0,2]]
         * pen.d3.pyramidZ([A,B,C],0,[0,0,4]) // draw a triangular prism
         * ```
         */
        pyramidZ(lowerBase: Point2D[], lowerZ: number, vertex: Point3D, {
            base = true,
            height = !true,
            shadeLower = !true,
            envelope = !true,
        } = {}) {
            let lower = EmbedZ(lowerBase, lowerZ)
            this.frustum(lower, vertex, {
                base,
                height,
                shadeLower,
                envelope
            })
        },



        /**
         * Draw a cone along the z-direction
         * ```
         * pen.d3.coneZ([0,0],2,[0,0,4]) // draw a cone
         * ```
         */
        coneZ(center: Point2D, radius: number, lowerZ: number, vertex: Point3D, {
            base = true,
            height = !true,
            shadeLower = !true,
            envelope = true,
        } = {}) {
            let ps = cal.traceCircle(center, radius, [0, 360])
            this.pyramidZ(ps, lowerZ, vertex, {
                base,
                height,
                shadeLower,
                envelope
            })
        },

        /**
         * Draw a frustum along the z-direction
         * ```
         * let [A,B,C] = [[0,0],[2,0],[0,2]]
         * pen.d3.frustumZ([A,B,C],0,[0,0,4],0.25) // draw a triangular frustum
         * ```
         */
        frustumZ(lowerBase: Point2D[], lowerZ: number, vertex: Point3D, scale: number, {
            base = true,
            height = !true,
            shadeLower = !true,
            shadeUpper = !true,
            envelope = !true,
        } = {}) {
            let lower = EmbedZ(lowerBase, lowerZ)
            let upper = Extrude(lower, [vertex], scale)
            this.frustum(lower, upper, {
                base,
                height,
                shadeLower,
                shadeUpper,
                envelope
            })
        },



        /**
         * Draw a conical frustum along the z-direction
         * ```
         * pen.d3.conicalFrustumZ([0,0],2,[0,0,4],0.25) // draw a conical frustum
         * ```
         */
        conicalFrustumZ(center: Point2D, radius: number, lowerZ: number, vertex: Point3D, scale: number, {
            base = true,
            height = !true,
            shadeLower = !true,
            shadeUpper = !true,
            envelope = true,
        } = {}) {
            let ps = cal.traceCircle(center, radius, [0, 360])
            this.frustumZ(ps, lowerZ, vertex, scale, {
                base,
                height,
                shadeLower,
                shadeUpper,
                envelope
            })
        },

        /**
         * Draw the angle between two plane.
         * ```
         * let P = [0,0,1]
         * let O = [0,0,0]
         * let Q = [1,0,0]
         * let A = [0,1,0]
         * let B = [0,-1,0]
         * pen.d3.angleBet([P,O,Q], [A,B], 'x')
         * ```
         */
        angleBet(
            angle: [Point3D, Point3D, Point3D],
            line: [Point3D | undefined, Point3D | undefined],
            label?: string
        ) {
            let [P, O, Q] = angle
            let [A, B] = line
            this._pen.line(P, O)
            this._pen.line(Q, O)
            this._pen.angle(P, O, Q)
            if (label !== undefined)
                this._pen.label.angle([P, O, Q], label)
            if (A !== undefined)
                this._pen.rightAngle(P, O, A)
            if (B !== undefined)
                this._pen.rightAngle(Q, O, B)
        },


        /**
         * Draw the dash height and right-angle.
         * ```
         * pen.d3.height([0,0,1],[0,0,0],[0,1,0])
         * ```
         */
        height(vertex: Point3D, foot: Point3D, leg: Point3D, label?: string) {
            this._pen.dash(vertex, foot)
            this._pen.rightAngle(vertex, foot, leg)
            this._pen.line(foot, leg)
            if (label !== undefined)
                this._pen.label.line([vertex, foot], label)
        },


        /**
         * Draw the solid height and right-angle.
         * ```
         * pen.d3.altitude([0,0,1],[0,0,0],[0,1,0])
         * ```
         */
        altitude(vertex: Point3D, foot: Point3D, leg: Point3D, label?: string) {
            this._pen.line(vertex, foot)
            this._pen.rightAngle(vertex, foot, leg)
            this._pen.line(foot, leg)
            if (label !== undefined)
                this._pen.label.line([vertex, foot], label)
        }

    };






    /**
     * Set the background image url.
     * @category export
     * ```
     * pen.background('https://www2.pyc.edu.hk/img/pycnet_logo.png')
     * ```
     */
    background(url: string): void {
        this.cv.backgroundURL = url
    }



    /**
     * Export the canvas to image tag.
     * @category export
     * ```
     * question = pen.export(question,'imgQ')
     * // paste the canvas to the image tag with src field 'imgQ'
     * ```
     */
    export(html: string, placeholder: string): string {
        return this.cv.export(html, placeholder, false)
    };


    /**
     * Export the canvas to image tag, with white space trimmed.
     * @category export
     * ```
     * question = pen.exportTrim(question,'imgQ')
     * // paste the canvas to the image tag with src field 'imgQ'
     * ```
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
