import { Pencil } from 'sapphire-js'

/**
 * @ignore
 */
const DEFAULT_POINT_RADIUS_PIXEL = 2

/**
 * @ignore
 */
const DEFAULT_CUTTER_LENGTH_PIXEL = 5


/**
 * @category DrawingPen
 */
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
         * Set the coordinate range of the canvas.
         * @category SetupRange
         * @param xRange - The range [xmin,xmax].
         * @param yRange - The range [ymin,ymax].
         * @returns void
         * ```
         * pen.range.set([-5,5],[-2,4]) // -5<x<5 and -2<y<4
         * ```
         */
        set(xRange: [number, number], yRange: [number, number] = xRange) {
            this._pen.initRange(xRange, yRange)
        },

        /**
         * Set the coordinate range of the canvas with given size and center.
         * Equivalent to pen.range.range([-size, size], [-size, size]) but shifted center.
         * @category SetupRange
         * @param size - The max x and y coordinates in range.
         * @param center - [x,y] coordinates of the center.
         * @returns void
         * ```
         * pen.range.square(5) // define range -5<x<5 and -5<y<5
         * pen.range.square(5,[1,2]) // define range -4<x<6 and -3<y<7
         * ```
         */
        square(size: number, center: Point2D = [0, 0]) {
            let [x, y] = center
            this.set([x - size, x + size], [y - size, y + size])
        },

        /**
         * Set the coordinate range by specifying in-view points.
         * @category SetupRange
         * @param points - An array of in-view points [x,y], or circle [[h,k,r]], or sphere [[a,b,c],r]
         * @returns void
         * ```
         * pen.range.capture([1,2],[3,4]) //  [1,2], [3,4] must be in-view
         * pen.range.capture([[1,2],3]) //  [1-3,2-3], [1+3,2+3] must be in-view
         * ```
         */
        capture(...points: (Point | [Point, number])[]) {

            let arr: Point[] = []
            for (let p of points) {
                if (Array.isArray(p[0])) {
                    let [center, r] = p as [Point, number]
                    if (owl.point2D(center))
                        arr.push(...this._pen.getCircleCorners(center, r))
                    if (owl.point3D(center))
                        arr.push(...this._pen.getSphereCorners(center, r))
                } else {
                    arr.push(p as Point)
                }
            }

            let pts = this._pen.pjs(arr)
            let xmin = pts[0][0]
            let xmax = pts[0][0]
            let ymin = pts[0][1]
            let ymax = pts[0][1]
            for (let i = 0; i < pts.length; i++) {
                let x = pts[i][0]
                let y = pts[i][1]
                if (x < xmin) xmin = x
                if (x > xmax) xmax = x
                if (y < ymin) ymin = y
                if (y > ymax) ymax = y
            }
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
            this.set([xmin, xmax], [ymin, ymax])
            this.AUTO_BORDER = true
        },

        /**
         * Set the coordinate range by specifying in-view points, include O(0,0).
         * @category SetupRange
         * @param points - An array of in-view points [x,y], or circle [[h,k,r]], or sphere [[a,b,c],r]
         * @returns void
         * ```
         * pen.range.extend([1,2],[3,4]) //  [0,0], [1,2], [3,4] must be in-view
         * // equivalent to pen.range.capture([0,0],[1,2],[3,4])
         * ```
         */
        extend(...points: (Point | [Point, number])[]) {
            this.capture([0, 0], ...points)
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
         * Set the size of the canvas.
         * @category SetupSize
         * @param width - The scale of the width.
         * @param height - The scale of the height, default to be same as width
         * @returns void
         * ```
         * pen.size.set(0.5,2) 
         * // half the standard width, double the standard height
         * ```
         */
        set(width: number = 1, height = width) {
            this._pen.initSize(width, height)

            if (this._pen.range.AUTO_BORDER)
                this._pen.initOuterBorder()
        },
        /**
         * Set the size of the canvas by resolution.
         * @category SetupSize
         * @param xPPI - The scale per unit x.
         * @param yPPI - The scale per unit y, if not provided, follow x.
         * @returns void
         * ```
         * pen.size.resolution(0.1,0.2) 
         * // 0.1 scale for each x-unit, and 0.2 scale for each y-unit.
         * ```
         */
        resolution(xPPI = 0.1, yPPI = xPPI) {
            let xRange = this._pen.frame.xmax - this._pen.frame.xmin
            let yRange = this._pen.frame.ymax - this._pen.frame.ymin
            let xScale = xRange * xPPI
            let yScale = yRange * yPPI
            this.set(xScale, yScale)
        },
        /**
         * Set the size of the canvas, lock xy ratio.
         * @category SetupSize
         * @param width - The max scale of the width.
         * @param height - The max scale of the height, default to be same as width
         * @returns void
         * ```
         * pen.size.lock(0.5) 
         * // max at half the standard width and height, with yPPI = xPPI.
         * pen.size.lock(1, 2) 
         * // max at standard width and double standard height, with yPPI = xPPI.
         * ```
         */
        lock(width: number = 1, height = width) {
            let [xmin, xmax] = this._pen.frame.xRange()
            let [ymin, ymax] = this._pen.frame.yRange()
            let ratio = (ymax - ymin) / (xmax - xmin)

            if (width * ratio < height) {
                this.set(width, width * ratio)
            } else {
                this.set(height / ratio, height)
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
         * Set the weight of the pen (line width).
         * @category set
         * @param weight - The line width.
         * @returns void
         * ```
         * pen.set.weight(2) // set a bold line
         * ```
         */
        weight(weight = 1): void {
            this._pen.setWeight(weight)
        },
        /**
         * Set the color of the pen stroke.
         * @category set
         * @param color - The line color.
         * @returns void
         * ```
         * pen.set.strokeColor('grey') // set grey line
         * ```
         */
        strokeColor(color = "black"): void {
            this._pen.setStrokeColor(color)
        },
        /**
         * Set the color of filling.
         * @category set
         * @param color - The filling color.
         * @returns void
         * ```
         * pen.set.fillColor('grey') // set grey filling
         * ```
         */
        fillColor(color = "black"): void {
            this._pen.setFillColor(color)
        },
        /**
         * Set the color of both filling and stroke.
         * @category set
         * @param color - The color.
         * @returns void
         * ```
         * pen.set.color('grey') // set grey filling and stroke
         * ```
         */
        color(color = "black"): void {
            this._pen.setColor(color)
        },
        /**
         * Set the transparency.
         * @category set
         * @param opaque - The opaque value, from 0 to 1. 0 is completely transparent.
         * @returns void
         * ```
         * pen.set.alpha(0.9) // set slightly transparent
         * ```
         */
        alpha(opaque = 1): void {
            this._pen.setAlpha(opaque)
        },
        /**
         * Set the dash pattern of line.
         * @category set
         * @param segments - The dash pattern, as [5,5] or 5 or true.
         * @returns void
         * ```
         * pen.set.dash([10,5]) // set dash line
         * ```
         */
        dash(segments: (number[] | number | boolean) = []): void {
            this._pen.setDash(segments)
        },
        /**
         * Set the horizontal alignment of text.
         * @category set
         * @param align - The alignment {'left','right','center'}.
         * @returns void
         * ```
         * pen.set.textAlign('left') // set align to left
         * ```
         */
        textAlign(align: CanvasTextAlign = "center"): void {
            this._pen.setTextAlign(align)
        },
        /**
         * Set the vertical alignment of text.
         * @category set
         * @param baseline - The alignment {'top','bottom','middle'}.
         * @returns void
         * ```
         * pen.set.textBaseline('bottom') // set align to bottom
         * ```
         */
        textBaseline(baseline: CanvasTextBaseline = "middle"): void {
            this._pen.setTextBaseline(baseline)
        },
        /**
         * Set the size of text.
         * @category set
         * @param size - The text size.
         * @returns void
         * ```
         * pen.set.textSize(2) // set larger text
         * ```
         */
        textSize(size = 1): void {
            this._pen.setTextSize(size)
        },

        /**
         * Set italic style of text.
         * @category set
         * @param italic - Italic or not.
         * @returns void
         * ```
         * pen.set.textItalic(true) // set italic to true
         * ```
         */
        textItalic(italic = false): void {
            this._pen.setTextItalic(italic)
        },
        /**
         * Set text direction.
         * @category set
         * @param angle - angle to rotate text.
         * @returns void
         * ```
         * pen.set.textDir(90) // set vertical text
         * ```
         */
        textDir(angle = 0): void {
            this._pen.setTextDir(angle)
        },

        /**
         * Set text latex mode.
         * @category set
         * @param on - turn on or off.
         * @returns void
         * ```
         * pen.set.textLatex(true) // turn on latex mode
         * ```
         */
        textLatex(on = false): void {
            this._pen.setTextLatex(on)
        },

        /**
         * Set the center for label dodge.
         * @category set
         * @param center - the center coordinates or a polar degree
         * @returns void
         * ```
         * pen.set.labelCenter([0,0]) // set center to be [0,0]
         * pen.set.labelCenter(A,B,C,D) // set center to be the centroid of A,B,C,D
         * pen.set.labelCenter(90) // set label at 90 polar degree (top)
         * pen.set.labelCenter() // set label to be the center of canvas
         * ```
         */
        labelCenter(...centers: Point[] | [number]): void {
            this._pen.setLabelCenter(...centers)
        },
        /**
         * Set length unit for line label.
         * @category set
         * @param text - the unit
         * @returns void
         * ```
         * pen.set.lengthUnit('cm') // set unit to cm
         * ```
         */
        lengthUnit(text: string | undefined = undefined): void {
            this._pen.setLengthUnit(text)
        },

        /**
         * Set the mode for angle. All angles (e.g. AOB) will be understood as this mode.
         * @category set
         * @param mode - the mode: 'normal' | 'polar' | 'reflex'
         * @returns void
         * ```
         * pen.set.angle('polar') // set mode to 'polar'
         * ```
         */
        angle(mode: 'normal' | 'polar' | 'reflex' = 'normal'): void {
            this._pen.setAngleMode(mode)
        },

        /**
         * Set 3D projector function.
         * @category set
         * @param angle - The tilted angle of 3d projeciton, default 60.
         * @param depth - The depth for y-axis, default is 0.5.
         * @returns void
         * ```
         * pen.set.Projector3D(60, 0.5) 
         * ```
         */
        projector3D(angle: number = 60, depth: number = 0.5): void {
            this._pen.setProjector3D(angle, depth)
        },

        /**
         * Ser the border scale when auto creating outer border.
         * @category set
         * @param border - The width of border, same scale as pen.size.set()
         * @returns void
         * ```
         * pen.set.border(0.2)
         * ```
         */
        border(border: number = 0.2): void {
            this._pen.setBorder(border)
        },

        /**
         * Ser the mode for direction of line label.
         * @category set
         * @param setting - The mode, can be 'auto', 'left' or 'right'
         * @returns void
         * ```
         * pen.set.lineLabel('auto')
         * ```
         */
        lineLabel(setting: 'auto' | 'left' | 'right' = 'auto'): void {
            this._pen.setLineLabel(setting)
        },


        /**
         * Reset all pen settings.
         * @category set
         * @returns void
         * ```
         * pen.reset() // reset
         * ```
         */
        reset() {
            this._pen.setAllDefault()
        }
    };

    /**
     * Plot an explicit or parametric function.
     * @category graph
     * @param func - The function to plot, either x=>f(x) or t=>[x(t),y(t)].
     * @param tStart - Start value of t, default to xmin.
     * @param tEnd - End value of t, default to xmax.
     * @param dots - Number of dots to plot. More dots give finer graph.
     * @returns void
     * ```
     * pen.plot(x=>x**2) // plot y=x^2
     * pen.plot(t=>[cos(t),sin(t)],0,360) // plot a circle centered (0,0) with r=1
     * ```
     */
    plot(func: ((t: number) => number) | ((t: number) => Point2D), tStart = this.frame.xmin, tEnd = this.frame.xmax, dots = 1000) {
        this.drawPlot(func, tStart, tEnd, dots)
    }


    /**
     * Plot a dashed explicit or parametric function.
     * @category graph
     * @param func - The function to plot, either x=>f(x) or t=>[x(t),y(t)].
     * @param tStart - Start value of t, default to xmin.
     * @param tEnd - End value of t, default to xmax.
     * @param dots - Number of dots to plot. More dots give finer graph.
     * @returns void
     * ```
     * pen.plot(x=>x**2) // plot y=x^2
     * pen.plot(t=>[cos(t),sin(t)],0,360) // plot a circle centered (0,0) with r=1
     * ```
     */
    plotDash(func: ((t: number) => number) | ((t: number) => Point2D), tStart = this.frame.xmin, tEnd = this.frame.xmax, dots = 1000) {
        this.save()
        this.set.dash(true)
        this.drawPlot(func, tStart, tEnd, dots)
        this.restore()
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
         * @category graph
         * @param center - The center coordinates [h,k].
         * @param radius - The radius.
         * @returns void
         * ```
         * pen.graph.circle([1,2],3) // draw (x-1)^2+(y-2)^2 = 9.
         * ```
         */
        circle(center: Point2D, radius: number) {
            const [h, k] = center
            this._pen.plot(t => [h + radius * cos(t), k + radius * sin(t)], 0, 360)
        },

        /**
         * Draw an arc.
         * @category graph
         * @param center - The center coordinates [h,k].
         * @param pStart - starting point of the arc
         * @param pEnd - ending point of the arc, in polar direction
         * @returns void
         * ```
         * pen.graph.arc([0,0],[1,0],[-1,0]) // draw upper semi-unit circle
         * ```
         */
        arc(center: Point2D, pStart: Point2D, pEnd: Point2D) {
            this._pen.drawStrokeSectoroid(center, pStart, pEnd, [])
        },

        /**
         * Draw a sector.
         * @category graph
         * @param center - The center coordinates [h,k].
         * @param pStart - starting point of the arc
         * @param pEnd - ending point of the arc, in polar direction
         * @returns void
         * ```
         * pen.graph.sector([0,0],[1,0],[0,1]) // draw a quarter circle sector
         * ```
         */
        sector(center: Point2D, pStart: Point2D, pEnd: Point2D) {
            this._pen.drawStrokeSectoroid(center, pStart, pEnd, [center, pStart])
        },

        /**
         * Draw a circle segment.
         * @category graph
         * @param center - The center coordinates [h,k].
         * @param pStart - starting point of the arc
         * @param pEnd - ending point of the arc, in polar direction
         * @returns void
         * ```
         * pen.graph.segment([0,0],[1,0],[0,1]) // draw a quarter circle segment
         * ```
         */
        segment(center: Point2D, pStart: Point2D, pEnd: Point2D) {
            this._pen.drawStrokeSectoroid(center, pStart, pEnd, [pStart])
        },

        /**
         * Draw a quadratic graph y=ax^2+bx+c.
         * @category graph
         * @param a - The coeff of x^2.
         * @param b - The coeff of x.
         * @param c - The constant.
         * @returns void
         * ```
         * pen.graph.quadratic(1,2,3) // draw y=x^2+2x+3.
         * ```
         */
        quadratic(a: number, b: number, c: number) {
            this._pen.plot(x => a * x * x + b * x + c)
        },

        /**
         * Draw a line y=mx+c.
         * @category graph
         * @param m - The slope.
         * @param c - The y-intercept.
         * @returns void
         * ```
         * pen.graph.line(2,1) // draw the line y=2x+1
         * ```
         */
        line(m: number, c: number) {
            const [xmin, xmax] = this._pen.frame.xRange()
            const y = (x: number) => m * x + c
            this._pen.line([xmin, y(xmin)], [xmax, y(xmax)])
        },

        /**
         * Draw a horizontal line y=constant.
         * @category graph
         * @param y - The constant value of y.
         * @returns void
         * ```
         * pen.graph.horizontal(2) // draw the line y=2
         * ```
         */
        horizontal(y: number) {
            const [xmin, xmax] = this._pen.frame.xRange()
            this._pen.line([xmin, y], [xmax, y])
        },

        /**
         * Draw a vertical line x=constant.
         * @category graph
         * @param x - The constant value of x.
         * @returns void
         * ```
         * pen.graph.vertical(2) // draw the line x=2
         * ```
         */
        vertical(x: number) {
            const [ymin, ymax] = this._pen.frame.yRange()
            this._pen.line([x, ymin], [x, ymax])
        },

        /**
         * Draw a line ax+by+c=0.
         * @category graph
         * @param a - The coeff of x.
         * @param b - The coeff of y.
         * @param c - The constant.
         * @returns void
         * ```
         * pen.graph.linear(1,2,3) // draw the line x+2y+3=0
         * ```
         */
        linear(a: number, b: number, c: number) {
            if (a === 0 && b !== 0) this.horizontal(-c / b)
            if (b == 0 && a !== 0) this.vertical(-c / a)
            if (a !== 0 && b !== 0) this.line(-a / b, -c / b)
        },

        /**
         * Draw a line through two points.
         * @category graph
         * @param A - one point
         * @param B - another point
         * @returns void
         */
        through(A: Point, B: Point) {
            let ptA = this._pen.pj(A)
            let ptB = this._pen.pj(B)
            let [a, b, c] = lin().byTwoPoints(ptA, ptB).toLinear()
            this.linear(a, b, c)
        },

        /**
         * Draw the perpendicular bisector of two points.
         * @category graph
         * @param A - one point
         * @param B - another point
         * @returns void
         */
        perpBisector(A: Point2D, B: Point2D) {
            let [a, b, c] = lin().byBisector(A, B).toLinear()
            this.linear(a, b, c)
        }

    };



    /**
     * Draw a point.
     * @category draw
     * @param position - The coordinates [x,y] to draw.
     * @param label - The label of the point.
     * @returns void
     * ```
     * pen.point([1,2]) // draw a point at [1,2]
     * pen.point([1,2],"A") // draw a point at [1,2] and label as "A"
     * ```
     */
    point(position: Point, label?: string) {
        this.drawDot(position, DEFAULT_POINT_RADIUS_PIXEL)
        if (label !== undefined) this.label.point(position, label)
    }

    /**
     * Draw a point.
     * @category draw
     * @param positions - {label:position}
     * @param label - whether to label the points
     * @returns void
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
     * @param position - The coordinates [x,y] to draw.
     * @param label - The label of the point.
     * @returns void
     * ```
     * pen.cutX([1,2]) // draw a vertical cutter at [1,2]
     * pen.cutX(1) // same as cutX([1,0])
     * ```
     */
    cutX(position: Point2D | number, label?: string) {
        if (typeof position === 'number') position = [position, 0]
        this.drawTickVertical(position, DEFAULT_CUTTER_LENGTH_PIXEL)
        if (label !== undefined) this.label.point(position, label, 270)
    }

    /**
     * Draw a cutter to a vertical line.
     * @category draw
     * @param position - The coordinates [x,y] to draw.
     * @param label - The label of the point.
     * @returns void
     * ```
     * pen.cutY([1,2]) // draw a horizontal cutter at [1,2]
     * pen.cutY(1) // same as cutY([0,1])
     * ```
     */
    cutY(position: Point2D | number, label?: string) {
        if (typeof position === 'number') position = [0, position]
        this.drawTickHorizontal(position, DEFAULT_CUTTER_LENGTH_PIXEL)
        if (label !== undefined) this.label.point(position, label, 180)
    }


    /**
     * Draw a guide line from `point` to the x-axis.
     * @category draw
     * @param point - from which point to draw the guide line
     * @param label - the label on the x-axis
     * @returns void
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
     * @param point - from which point to draw the guide line
     * @param label - the label on the y-axis
     * @returns void
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
     * @param center - The coordinates [x,y] of center.
     * @param radius - The radius in pixel.
     * @param angles - The polar angle range [q1,q2].
     * @param fill - Whether to fill the inside.
     * @returns void
     * ```
     * pen.circle([1,2], 10) // draw a circle centered at [1,2] with r=10px
     * pen.circle([1,2], 10, [0,180]) // draw a upper semi-circle
     * ```
     */
    circle(center: Point2D, radius: number, angles: [number, number] = [0, 360], fill = false) {
        this.drawArc(center, radius, angles)
        if (fill) this.drawSegment(center, radius, angles)
    }



    /**
     * Draw a line between two points.
     * @category draw
     * @param startPoint - The coordinates [x,y] of the start-point.
     * @param endPoint - The coordinates [x,y] of the end-point.
     * @param label - The label of the line.
     * @returns void
     * ```
     * pen.line([1,2],[3,4]) // draw a line from [1,2] to [3,4]
     * pen.line([1,2],[3,4],'10') //  draw a line from [1,2] to [3,4] with label '10'
     * ```
     */
    line(startPoint: Point, endPoint: Point, label?: string | number) {
        this.drawStroke([startPoint, endPoint])
        if (label !== undefined) this.label.line([startPoint, endPoint], label)
    }

    /**
     * Draw a dash line between two points.
     * @category draw
     * @param startPoint - The coordinates [x,y] of the start-point.
     * @param endPoint - The coordinates [x,y] of the end-point.
     * @param label - The label of the line.
     * @returns void
     * ```
     * pen.dash([1,2],[3,4]) // draw a dash line from [1,2] to [3,4]
     * pen.dash([1,2],[3,4],'10') //  draw a dash line from [1,2] to [3,4] with label '10'
     * ```
     */
    dash(startPoint: Point, endPoint: Point, label?: string | number) {
        this.save()
        this.set.dash(true)
        this.drawStroke([startPoint, endPoint])
        this.restore()
        if (label !== undefined) this.label.line([startPoint, endPoint], label)
    }


    /**
     * Draw an arrow between two points.
     * @category draw
     * @param startPoint - The coordinates [x,y] of the start-point.
     * @param endPoint - The coordinates [x,y] of the end-point.
     * @param label - The label of the line.
     * @returns void
     * ```
     * pen.arrow([1,2],[3,4]) // draw an arrow from [1,2] to [3,4]
     * ```
     */
    arrow(startPoint: Point, endPoint: Point, label?: string | number) {
        this.drawStroke([startPoint, endPoint])
        this.drawArrowHead(startPoint, endPoint)
        if (label !== undefined) this.label.line([startPoint, endPoint], label)
    }

    /**
     * Draw the component of the arrow.
     * @category draw
     * @param startPoint - The coordinates [x,y] of the start-point.
     * @param endPoint - The coordinates [x,y] of the end-point.
     * @param dir - The direction to resolve.
     * @param angleLabel - The label of the angle.
     * @returns void
     * ```
     * pen.arrowResolve([1,2],[3,4],0) // draw the horizontal component of arrow from [1,2] to [3,4]
     * ```
     */
    arrowResolve(startPoint: Point2D, endPoint: Point2D, dir: number, angleLabel?: string | number) {
        let O = startPoint
        let P = endPoint
        let X = Move(O, dir, 1)
        let Q = PdFoot(O, X, P)
        this.arrow(O, Q)
        this.angle(Q, O, P, angleLabel)
    }


    /**
     * Draw a length between two points.
     * @category draw
     * @param startPoint - The coordinates [x,y] of the start-point.
     * @param endPoint - The coordinates [x,y] of the end-point.
     * @param label - The label of the line.
     * @returns void
     * ```
     * pen.length([1,2],[3,4]) // draw an length from [1,2] to [3,4]
     * ```
     */
    length(startPoint: Point, endPoint: Point, label?: string | number) {
        this.drawStroke([startPoint, endPoint])
        this.drawTick(startPoint, endPoint, 5, 0)
        this.drawTick(endPoint, startPoint, 5, 0)
        if (label !== undefined) this.label.line([startPoint, endPoint], label)
    }


    /**
     * Draw a dashed height with right-angled.
     * @param vertex - top point of the height
     * @param base - base of the height
     * @param label - label of the height
     */
    height(vertex: Point2D, base: [Point2D, Point2D], label?: string | number) {
        let [A, B] = base
        let F = PdFoot(A, B, vertex)
        let V = vertex
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
     * @param points - The coordinates [x,y] of all points.
     * @returns void
     * ```
     * pen.polyline([0,0],[5,2],[3,4]) // draw a polyline with vertices [0,0], [5,2] and [3,4]
     * ```
     */
    polyline(...points: Point[]) {
        this.drawStroke(points)
    }


    /**
     * Draw a polygon given points.
     * @category draw
     * @param points - The coordinates [x,y] of all points.
     * @returns void
     * ```
     * pen.polygon([0,0],[5,2],[3,4]) // draw a triangle with vertices [0,0], [5,2] and [3,4]
     * ```
     */
    polygon(...points: Point[]) {
        this.drawShape(points)
    }

    /**
     * Fill a polygon given points.
     * @category draw
     * @param points - The coordinates [x,y] of all points.
     * @returns void
     * ```
     * pen.polyfill([0,0],[5,2],[3,4]) // fill a triangle with vertices [0,0], [5,2] and [3,4]
     * ```
     */
    polyfill(...points: Point[]) {
        this.drawFill(points)
    }

    /**
     * Shade a polygon given points.
     * @category draw
     * @param points - The coordinates [x,y] of all points.
     * @returns void
     * ```
     * pen.polyshade([0,0],[5,2],[3,4]) // shade a triangle with vertices [0,0], [5,2] and [3,4]
     * ```
     */
    polyshade(...points: Point[]) {
        this.drawShade(points)
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
         * Fill a circle (x-h)^2+(y-k)^2 = r^2.
         * @category fill
         * @param center - The center coordinates [h,k].
         * @param radius - The radius.
         * @returns void
         * ```
         * pen.fill.circle([1,2],3) // fill (x-1)^2+(y-2)^2 = 9.
         * ```
         */
        circle(center: Point2D, radius: number) {
            let points = cal.traceCircle(center, radius, [0, 360])
            this._pen.polyfill(...points)
        },
        /**
         * Fill a sector.
         * @category fill
         * @param center - The center coordinates [h,k].
         * @param pStart - starting point of the arc
         * @param pEnd - ending point of the arc, in polar direction
         * @returns void
         * ```
         * pen.fill.sector([0,0],[1,0],[0,1]) // fill a quarter circle sector
         * ```
         */
        sector(center: Point2D, pStart: Point2D, pEnd: Point2D) {
            this._pen.drawFillSectoroid(center, pStart, pEnd, [center])
        },
        /**
         * Fill a circle segment.
         * @category fill
         * @param center - The center coordinates [h,k].
         * @param pStart - starting point of the arc
         * @param pEnd - ending point of the arc, in polar direction
         * @returns void
         * ```
         * pen.fill.segment([0,0],[1,0],[0,1]) // fill a quarter circle segment
         * ```
         */
        segment(center: Point2D, pStart: Point2D, pEnd: Point2D) {
            this._pen.drawFillSectoroid(center, pStart, pEnd, [])
        },
        /**
         * Fill a sector-like area.
         * @category fill
         * @param center - The center coordinates [h,k].
         * @param pStart - starting point of the arc
         * @param pEnd - ending point of the arc, in polar direction
         * @param vertices - connect to these points instead of the center
         * @returns void
         * ```
         * pen.fill.sectoroid([0,0],[1,0],[0,1],[[-1,0]]) // fill a long sector-like region
         * ```
         */
        sectoroid(center: Point2D, pStart: Point2D, pEnd: Point2D, vertices: Point2D[]) {
            this._pen.drawFillSectoroid(center, pStart, pEnd, vertices)
        },

        /**
         * Fill a rectangle.
         * @category fill
         * @param vertex1 - a vertex
         * @param vertex2 - the diagonally opposite vertex
         * @returns void
         * ```
         * pen.fill.rect([0,0],[2,3]) // fill a rectangle [[0,0],[2,0],[2,3],[0,3]]
         * ```
         */
        rect(vertex1: Point2D, vertex2: Point2D) {
            let [a, b] = vertex1
            let [c, d] = vertex2
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
         * @category shade
         * @param center - The center coordinates [h,k].
         * @param radius - The radius.
         * @returns void
         * ```
         * pen.shade.circle([1,2],3) // shade (x-1)^2+(y-2)^2 = 9.
         * ```
         */
        circle(center: Point2D, radius: number) {
            let points = cal.traceCircle(center, radius, [0, 360])
            this._pen.polyshade(...points)
        },
        /**
         * Shade a sector.
         * @category shade
         * @param center - The center coordinates [h,k].
         * @param pStart - starting point of the arc
         * @param pEnd - ending point of the arc, in polar direction
         * @returns void
         * ```
         * pen.shade.sector([0,0],[1,0],[0,1]) // shade a quarter circle sector
         * ```
         */
        sector(center: Point2D, pStart: Point2D, pEnd: Point2D) {
            this._pen.drawShadeSectoroid(center, pStart, pEnd, [center])
        },
        /**
         * Shade a circle segment.
         * @category shade
         * @param center - The center coordinates [h,k].
         * @param pStart - starting point of the arc
         * @param pEnd - ending point of the arc, in polar direction
         * @returns void
         * ```
         * pen.shade.segment([0,0],[1,0],[0,1]) // shade a quarter circle segment
         * ```
         */
        segment(center: Point2D, pStart: Point2D, pEnd: Point2D) {
            this._pen.drawShadeSectoroid(center, pStart, pEnd, [])
        },
        /**
         * Shade a sector-like area.
         * @category shade
         * @param center - The center coordinates [h,k].
         * @param pStart - starting point of the arc
         * @param pEnd - ending point of the arc, in polar direction
         * @param vertices - connect to these points instead of the center
         * @returns void
         * ```
         * pen.shade.sectoroid([0,0],[1,0],[0,1],[[-1,0]]) // shade a long sector-like region
         * ```
         */
        sectoroid(center: Point2D, pStart: Point2D, pEnd: Point2D, vertices: Point2D[]) {
            this._pen.drawShadeSectoroid(center, pStart, pEnd, vertices)
        },

        /**
         * Shade a rectangle.
         * @category shade
         * @param vertex1 - a vertex
         * @param vertex2 - the diagonally opposite vertex
         * @returns void
         * ```
         * pen.shade.rect([0,0],[2,3]) // shade a rectangle [[0,0],[2,0],[2,3],[0,3]]
         * ```
         */
        rect(vertex1: Point2D, vertex2: Point2D) {
            let [a, b] = vertex1
            let [c, d] = vertex2
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
         * @category linProg
         * @param constraints - The constraints to draw
         * @returns void
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
         * @category linProg
         * @param constraints - The constraint to shade
         * @returns void
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
         * @category linProg
         * @param constraints - The constraint set
         * @returns void
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
     * Draw an angle with label, non-reflex
     * @category draw
     * @param A - The starting point [x,y].
     * @param O - The vertex point [x,y].
     * @param B - The ending point [x,y].
     * @param label - The label
     * @param arc - The number of arcs.
     * @param radius - The radius of the angle arc, in pixel.
     * @returns void
     * ```
     * pen.angle([0,0],[5,2],[3,4],'x')
     * ```
     */
    angle(A: Point, O: Point, B: Point, label?: string | number, arc = 1, radius = -1) {
        if (radius < 0)
            radius = 15 + this.getSmallAngleExtraPixel(A, O, B, 40, 1.5)
        let space = 3
        this.drawAngle(A, O, B, radius, arc, space)

        if (label !== undefined && label !== '')
            this.label.angle([A, O, B], label, undefined, radius < 0 ? radius : radius + 13)
    }





    /**
     * Decorate equal side lengths.
     * @category decorator
     * @param startPoint - The starting point [x,y].
     * @param endPoint - The ending point [x,y].
     * @param tick - The number of ticks.
     * @returns void
     * ```
     * pen.decorate.equalSide([1,0],[3,2],2) 
     * // decorate a double-tick at the mid-pt of [1,0] and [3,2]
     * ```
     */
    equalSide(startPoint: Point, endPoint: Point, tick = 1) {
        this.drawEqualMark(startPoint, endPoint, 5, tick, 3)
    }


    /**
     * Decorate bisecting equal lengths of a side.
     * @category decorator
     * @param startPoint - The starting point [x,y].
     * @param endPoint - The ending point [x,y].
     * @param tick - The number of ticks.
     * @returns void
     * ```
     * pen.decorate.bisectSide([0,0], [2,2], 2)
     * // decorate two double-ticks bisecting [0,0] and [2,2] at their mid-pt
     * ```
     */
    bisectSide(startPoint: Point, endPoint: Point, tick = 1) {
        let [A, B] = this.pjs([startPoint, endPoint])
        let M = Mid(A, B)
        this.equalSide(A, M, tick)
        this.equalSide(B, M, tick)
    }


    /**
     * Decorate parallel side.
     * @category decorator
     * @param startPoint - The starting point [x,y].
     * @param endPoint - The ending point [x,y].
     * @param tick - The number of ticks.
     * @returns void
     * ```
     * pen.decorate.parallel([1,0],[3,2],2) 
     * // decorate a double-tick parallel mark at the mid-pt of [1,0] and [3,2]
     * ```
     */
    parallel(startPoint: Point, endPoint: Point, tick = 1) {
        this.drawParallelMark(startPoint, endPoint, 4, tick, 6)
    }



    /**
     * Decorate a right-angle AOB.
     * @category decorator
     * @param A - The starting point [x,y].
     * @param O - The vertex point [x,y].
     * @param B - The ending point [x,y]. Interchangeable with A.
     * @param size - The size of the mark, in pixel.
     * @returns void
     * ```
     * pen.decorate.rightAngle([1,0],[0,0],[3,2]) 
     * // decorate an right-angle AOB
     * ```
     */
    rightAngle(A: Point, O: Point, B?: Point, size = 12) {
        A = this.pj(A)
        O = this.pj(O)
        B ??= Rotate(A, 90, O)
        B = this.pj(B)

        this.drawRightAngle(A, O, B, size)
    }

    /**
     * Decorate a compass.
     * @category decorator
     * @param position - The position [x,y].
     * @returns void
     * ```
     * pen.decorate.compass([1,2]) 
     * // decorate a compass at [1,2]
     * ```
     */
    compass(position: Point2D) {
        this.drawCompass(position, 17, 20, 7, 3.5)
    }



    /**
     * Write text.
     * @category text
     * @param position - The coordinates [x,y] to position the text.
     * @param text - The string to write.
     * @returns void
     * ```
     * pen.write([1,2],'abc') // write 'abc' at [1,2]
     * ```
     */
    write(position: Point, text: string) {
        this.drawText(text, position, 0, 0)
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
         * @category text
         * @param position - The coordinates [x,y] of the point to label.
         * @param text - The string to write.
         * @param direction - The direction to offset, given as a polar angle.
         * @param radius - The pixel distance to offset from the position.
         * @returns void
         * ```
         * pen.label.point([1,2],'A',180) 
         * // label the point [1,2] as 'A', place the label on the left (180 degree)
         * ```
         */
        point(position: Point, text = '', direction?: number, radius = 15) {
            this._pen.save()
            if (owl.alphabet(text)) this._pen.set.textItalic(true)
            this._pen.drawLabel(text, position, direction, radius)
            this._pen.restore()
        },

        /**
         * Add a label to points, using index as text.
         * @category text
         * @param positions - {label:position}.
         * @returns void
         * ```
         * pen.label.points({A,B}) // label point A as 'A', point B as 'B'
         * ```
         */
        points(positions: { [k: string]: Point }) {
            for (let k in positions) {
                this.point(positions[k], k)
            }
        },


        /**
         * Add a label to an angle AOB, non-reflex.
         * @category text
         * @param anglePoints - An array [A,O,B] for the coordinates of A,O,B.
         * @param text - The string to write.
         * @param direction - The direction to offset, given as a polar angle,relative to mid-ray of angle AOB.
         * @param radius - The pixel distance to offset from the position. If negative, default to (text.length <= 2 ? 25 : 30).
         * @returns void
         * ```
         * pen.label.angle([[1,2],[0,0],[-2,1]],'x') 
         * // label the angle as 'x'
         * ```
         */
        angle([A, O, B]: [Point, Point, Point], text: string | number, direction = 0, radius = -1) {
            if (typeof text === 'number') text = text + '°'
            if (radius < 0) {
                radius = 28 + this._pen.getSmallAngleExtraPixel(A, O, B, 40, 1.5)
            }
            let dir = this._pen.getDirInPixelByAngle(A, O, B)

            this.point(O, text, dir + direction, radius)
        },

        /**
         * Add a label to a line AB.
         * @category text
         * @param linePoints - An array [A,B] for the coordinates of AB.
         * @param text - The string to write.
         * @param direction - The direction to offset, given as a polar angle,relative to the left or right normal of AB.
         * @param radius - The pixel distance to offset from the position. If negative, default to (text.length <= 2 ? 15 : text.length <= 4 ? 20 : 25).
         * @returns void
         * ```
         * pen.label.line([[0,0],[2,4]],'L') // label the line as 'L'
         * ```
         */
        line([A, B]: [Point, Point], text: string | number, direction = 0, radius = 15) {
            A = this._pen.pj(A)
            B = this._pen.pj(B)
            let M = Mid(A, B)

            if (typeof text === 'number')
                text = this._pen.getTextWithLengthUnit(text)

            let dir = this._pen.getDirInPixelByLine(A, B)

            this.point(M, text, dir + direction, radius)
        },


        /**
         * Add a label to a polygon.
         * @category text
         * @param points - the points of the polygon.
         * @param text - The string to write.
         * @returns void
         * ```
         * pen.label.polygon([[0,0],[1,0],[0,1]],'L') // label the polygon as 'L'
         * ```
         */
        polygon(points: Point[], text: string | number) {
            let pts = this._pen.pjs(points)
            this._pen.save()
            if (owl.alphabet(text)) this._pen.set.textItalic(true)
            this._pen.write(Mid(...pts), String(text))
            this._pen.restore()
        },

        /**
         * Add a coordinates label to a point.
         * @category text
         * @param position - The coordinates [x,y] of the point to label.
         * @param direction - The direction to offset, given as a polar angle.
         * @param radius - The pixel distance to offset from the position.
         * @returns void
         * ```
         * pen.label.coordinates([1,2],180) 
         * // label the point [1,2] as '(1, 2)', place the label on the left (180 degree)
         * ```
         */
        coordinates(point: Point2D, direction?: number, radius = 15) {
            let [x, y] = point
            x = Fix(x, 1)
            y = Fix(y, 1)
            let text = `(${x}, ${y})`
            this.point(point, text, direction, radius)
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
         * @category axis
         * @param label - The axis label.
         * @returns void
         * ```
         * pen.axis.x('time') // draw the x-axis, label as 'time'
         * ```
         */
        x(label = "x") {
            this._pen.save()
            this._pen.set.textItalic(label.length === 1)
            this._pen.drawXAxis()
            this._pen.drawXAxisLabel(label)
            this._pen.restore()
        },
        /**
         * Draw y-axis.
         * @category axis
         * @param label - The axis label.
         * @returns void
         * ```
         * pen.axis.y('height') // draw the y-axis, label as 'height'
         * ```
         */
        y(label = "y") {
            this._pen.save()
            this._pen.set.textItalic(label.length === 1)
            this._pen.drawYAxis()
            this._pen.drawYAxisLabel(label)
            this._pen.restore()
        },
        /**
         * Draw both axis.
         * @category axis
         * @param xlabel - The x-axis label.
         * @param ylabel - The y-axis label.
         * @returns void
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
         * @category axisTick
         * @param interval - The tick interval.
         * @param mark - Whether to label number at ticks.
         * @returns void
         * ```
         * pen.tick.x(2) // draw ticks on the x-axis, at interval 2 units
         * ```
         */
        x(interval = 1, mark = true) {
            this._pen.drawXAxisTick(interval)
            if (mark) {
                this._pen.save()
                this._pen.set.textItalic()
                this._pen.drawXAxisTickMark(interval)
                this._pen.restore()
            };
        },
        /**
         * Draw ticks on the y-axis.
         * @category axisTick
         * @param interval - The tick interval.
         * @param mark - Whether to label number at ticks.
         * @returns void
         * ```
         * pen.tick.y(2) // draw ticks on the y-axis, at interval 2 units
         * ```
         */
        y(interval = 1, mark = true) {
            this._pen.drawYAxisTick(interval)
            if (mark) {
                this._pen.save()
                this._pen.set.textItalic()
                this._pen.drawYAxisTickMark(interval)
                this._pen.restore()
            };
        },
        /**
         * Draw ticks on both axis.
         * @category axisTick
         * @param interval - The tick interval.
         * @param mark - Whether to label number at ticks.
         * @returns void
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
         * @category axisGrid
         * @param interval - The grid interval.
         * @returns void
         * ```
         * pen.grid.x(2) // draw gridlines on the x-axis, at interval 2 units
         * ```
         */
        x(interval = 1) {
            this._pen.drawXAxisGrid(interval)
        },
        /**
         * Draw gridlines on the y-axis.
         * @category axisGrid
         * @param interval - The grid interval.
         * @returns void
         * ```
         * pen.grid.y(2) // draw gridlines on the y-axis, at interval 2 units
         * ```
         */
        y(interval = 1) {
            this._pen.drawYAxisGrid(interval)
        },
        /**
         * Draw gridlines on both axis.
         * @category axisGrid
         * @param interval - The grid interval.
         * @returns void
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
         * @category 3D
         * @deprecated
         * @returns void
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
         * @category 3D
         * @returns void
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
                this._pen.save()
                if (dash) this._pen.set.dash(true)
                if (arc[1] - arc[0] >= 360) {
                    this._pen.polygon(...ps3D)
                } else {
                    this._pen.polyline(...ps3D)
                }
                this._pen.restore()
            }

            if (shade)
                this._pen.polyshade(...ps3D)

            if (fill)
                this._pen.polyfill(...ps3D)
        },


        /**
         * Draw a circle on XZ plane in 3D
         * @category 3D
         * @returns void
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
         * @category 3D
         * @returns void
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
         * @category 3D
         * @returns void
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
         * @category 3D
         * @returns void
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
         * @category 3D
         * @param lowerBase - the points in the lower base
         * @param upperBase - the point in the upper base, must have the same length as lowerBase
         * @returns void
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
         * @category 3D
         * @returns void
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
         * @category 3D
         * @returns void
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
         * @category 3D
         * @returns void
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
         * @category 3D
         * @returns void
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
         * @category 3D
         * @returns void
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
         * @category 3D
         * @returns void
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
         * @category 3D
         * @returns void
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


    };






    /**
     * @ignore
     * @deprecated
     */
    autoCrop() {
        this.trimCanvas()
    }


    /**
     * Set the background image url.
     * @category export
     * @param url - the url of background image
     * @returns void
     * ```
     * pen.background('https://www2.pyc.edu.hk/img/pycnet_logo.png')
     * ```
     */
    background(url: string): void {
        this.setBackgroundImgUrl(url)
    }




    private exportCanvas(html: string, placeholder: string, canvas: HTMLCanvasElement) {
        const src = 'src="' + this.toDataUrl(canvas) + '"'
        const width = ' width="' + this.displayWidth(canvas) + '"'
        const height = ' height="' + this.displayHeight(canvas) + '"'
        const backgroundAttr = this.backgroundImageAttr()
        return html.replace('src="' + placeholder + '"', src + width + height + backgroundAttr)
    };


    /**
     * Export the canvas to image tag.
     * @category export
     * @param html - The html string to export to.
     * @param placeholder - The src field of the image tag to export to.
     * @returns The new html with src field pasted.
     * ```
     * question = pen.export(question,'imgQ') 
     * // paste the canvas to the image tag with src field 'imgQ'
     * ```
     */
    export(html: string, placeholder: string) {
        return this.exportCanvas(html, placeholder, this.canvas)
    };


    /**
     * Export the canvas to image tag, with white space trimmed.
     * @category export
     * @param html - The html string to export to.
     * @param placeholder - The src field of the image tag to export to.
     * @returns The new html with src field pasted.
     * ```
     * question = pen.exportTrim(question,'imgQ') 
     * // paste the canvas to the image tag with src field 'imgQ'
     * ```
     */
    exportTrim(html: string, placeholder: string) {
        let clone = this.cloneCanvas()
        this.trimCanvas(clone)
        return this.exportCanvas(html, placeholder, clone)
    };


    /**
     * Clear the canvas.
     * @category export
     * @returns void
     * ```
     * pen.clear() // clear the canvas.
     * ```
     */
    clear() {
        this.clearCanvas()
    }

    /**
     * Temporarily save the img internally. Can be later restored by restoreImg.
     * @category export
     * @returns
     * ```
     * pen.saveImg() // save the current canvas image
     * ```
     */
    saveImg() {
        this.saveCanvasImg()
    }

    /**
     * Restored the previously saved img by saveImg.
     * @category export
     * @returns void
     * ```
     * pen.restoreImg() // restore the previously saved img
     * ```
     */
    restoreImg() {
        this.restoreCanvasImg()
    }




};
