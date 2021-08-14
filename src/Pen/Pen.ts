

// const REM_PIXEL: number = parseFloat(getComputedStyle(document.documentElement).fontSize);



var PEN_QUALITY = 3


import { Pencil } from 'sapphire-js'


const DEFAULT_BORDER = 0.2


const DEFAULT_POINT_RADIUS_PIXEL = 2
const DEFAULT_CUTTER_LENGTH_PIXEL = 5


/**
 * @category DrawingPen
 */
class PenCls extends Pencil {

    /**
     * @ignore
     */
    constructor() {
        super()
        this.range.set([-5, 5], [-5, 5]);
        this.size.set(1);
        this.set.reset();
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
         * @param points - An array of in-view points [x,y].
         * @returns void
         * ```
         * pen.range.capture([1,2],[3,4]) //  [1,2], [3,4] must be in-view
         * ```
         */
        capture(...points: Point[]) {
            let pts = this._pen.pjs(points)
            let xmin = pts[0][0];
            let xmax = pts[0][0];
            let ymin = pts[0][1];
            let ymax = pts[0][1];
            for (let i = 0; i < pts.length; i++) {
                let x = pts[i][0];
                let y = pts[i][1];
                if (x < xmin) xmin = x;
                if (x > xmax) xmax = x;
                if (y < ymin) ymin = y;
                if (y > ymax) ymax = y;
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
            this.set([xmin, xmax], [ymin, ymax]);
            this.AUTO_BORDER = true
        },

        /**
         * Set the coordinate range by specifying in-view points, include O(0,0).
         * @category SetupRange
         * @param points - An array of in-view points [x,y].
         * @returns void
         * ```
         * pen.range.extend([1,2],[3,4]) //  [0,0], [1,2], [3,4] must be in-view
         * // equivalent to pen.range.capture([0,0],[1,2],[3,4])
         * ```
         */
        extend(...points: Point2D[]) {
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
         * @param height - The scale of the height.
         * @returns void
         * ```
         * pen.size.set(0.5,2) 
         * // half the standard width, double the standard height
         * ```
         */
        set(width: number = 1, height = width) {
            this._pen.initSize(width, height)

            if (this._pen.range.AUTO_BORDER)
                this._pen.initOuterBorder(DEFAULT_BORDER)

            this._pen.set.reset();
        },
        /**
         * Set the size of the canvas by resolution.
         * @category SetupSize
         * @deprecated
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
         * @param width - The scale of the width.
         * @returns void
         * ```
         * pen.size.lock(0.5) // half the standard width, with yPPI = xPPI.
         * ```
         */
        lock(width = 1) {
            let [xmin, xmax] = this._pen.frame.xRange()
            let [ymin, ymax] = this._pen.frame.yRange()
            let ratio = (ymax - ymin) / (xmax - xmin)
            this.set(width, width * ratio)
        },
    }

    /**
     * Setup of canvas. Deprecated.
     * @ignore
     * @deprecated
     * @category setting
     */
    setup = {
        /**
         * @ignore
         */
        _pen: this as PenCls,
        /**
         * Set the size of the canvas.
         * @category setup
         * @deprecated
         * @param scale - The scale of the width.
         * @param  ratio - The height-to-width ratio.
         * @returns void
         * ```
         * pen.setup.size(0.5,2) 
         * // half the standard width, with height-to-width = 2:1
         * ```
         */
        size(scale = 1, ratio = 1) {
            // REM_PIXEL is the default font size of the browser, usually 16px
            const REM_PIXEL = parseFloat(getComputedStyle(document.documentElement).fontSize);
            const wPixel = scale * 25 * REM_PIXEL;
            const hPixel = wPixel * ratio;
            // create a canvas of higher resolution (PEN_QUALITY)
            this._pen.canvas.width = wPixel * PEN_QUALITY;
            this._pen.canvas.height = hPixel * PEN_QUALITY;
            this._pen.frame.wPixel = wPixel * PEN_QUALITY;
            this._pen.frame.hPixel = hPixel * PEN_QUALITY;
            this._pen.set.reset();
        },
        /**
         * Set the size of the canvas, keep square zoom. pen.setup.range should be called before me to set the range first.
         * @category setup
         * @deprecated
         * @param scale - The scale of the width.
         * @returns void
         * ```
         * pen.setup.squareSize(0.5) 
         * // half the standard width, with height-to-width defined by coordinates range set.
         * ```
         */
        squareSize(scale = 1) {
            let xRange = this._pen.frame.xmax - this._pen.frame.xmin
            let yRange = this._pen.frame.ymax - this._pen.frame.ymin
            let ratio = yRange / xRange
            this.size(scale, ratio)
        },
        /**
         * Set the size of the canvas by resolution. pen.setup.range should be called before me to set the range first.
         * @category setup
         * @deprecated
         * @param xPPI - The scale per unit x.
         * @param yPPI - The scale per unit y, if not provided, follow x.
         * @returns void
         * ```
         * pen.setup.resolution(0.1,0.2) 
         * // 0.1 scale for each x-unit, and 0.2 scale for each y-unit.
         * ```
         */
        resolution(xPPI = 0.1, yPPI = -1) {
            if (yPPI === -1) yPPI = xPPI
            let xRange = this._pen.frame.xmax - this._pen.frame.xmin
            let yRange = this._pen.frame.ymax - this._pen.frame.ymin
            let xScale = xRange * xPPI
            let yScale = yRange * yPPI
            this.size(xScale, yScale / xScale)
        },
        /**
         * Set the coordinate range of the canvas.
         * @category setup
         * @deprecated
         * @param xRange - The range [xmin,xmax].
         * @param yRange - The range [ymin,ymax].
         * @returns void
         * ```
         * pen.setup.range([-5,5],[-2,4]) 
         * // define range -5<x<5 and -2<y<4
         * ```
         */
        range(xRange: [number, number], yRange: [number, number]) {
            [this._pen.frame.xmin, this._pen.frame.xmax] = xRange;
            [this._pen.frame.ymin, this._pen.frame.ymax] = yRange;
        },

        /**
         * Set the coordinate range by specifying in-view points.
         * @category setup
         * @deprecated
         * @param points - An array of in-view points [x,y].
         * @param border - The percentage to extend the border.
         * @param origin - Must contain the origin [0,0]
         * @returns void
         * ```
         * pen.setup.inView([[1,2],[3,4]]) // the points [0,0], [1,2] and [3,4] must be in-view
         * ```
         */
        inView(points: Point2D[], border = 0.3, origin = true) {
            let pts = [...points]
            if (origin) pts.push([0, 0]);
            let xmin = pts[0][0];
            let xmax = pts[0][0];
            let ymin = pts[0][1];
            let ymax = pts[0][1];
            for (let i = 0; i < pts.length; i++) {
                let x = pts[i][0];
                let y = pts[i][1];
                if (x < xmin) xmin = x;
                if (x > xmax) xmax = x;
                if (y < ymin) ymin = y;
                if (y > ymax) ymax = y;
            }
            let xBorder = (xmax - xmin) * border
            let yBorder = (ymax - ymin) * border;
            xmin -= xBorder;
            xmax += xBorder;
            ymin -= yBorder
            ymax += yBorder
            this.range([xmin, xmax], [ymin, ymax]);
        }
    };



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
            this._pen.setStrokeColor(color);
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
         * Set the center for label dodge. If undefined, dodge right by default.
         * @category set
         * @param center - the center coordinate
         * @returns void
         * ```
         * pen.set.labelCenter([0,0]) // set center to be [0,0]
         * pen.set.labelCenter(true) // set center to be the center of the canvas
         * ```
         */
        labelCenter(center: Point | boolean = false): void {
            this._pen.setLabelCenter(center)
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
         * Draw an arc of (x-h)^2+(y-k)^2 = r^2.
         * @category graph
         * @param center - The center coordinates [h,k].
         * @param radius - The radius.
         * @param qStart - The starting polar angle.
         * @param qEnd - The ending polar angle.
         * @returns void
         * ```
         * pen.graph.arc([1,2],3,0,180) // draw upper semi-circle (x-1)^2+(y-2)^2 = 9.
         * ```
         */
        arc(center: Point2D, radius: number, qStart: number, qEnd: number) {
            const [h, k] = center
            this._pen.plot(t => [h + radius * cos(t), k + radius * sin(t)], qStart, qEnd)
        },
        /**
         * Draw a sector of (x-h)^2+(y-k)^2 = r^2.
         * @category graph
         * @param center - The center coordinates [h,k].
         * @param radius - The radius.
         * @param qStart - The starting polar angle.
         * @param qEnd - The ending polar angle.
         * @returns void
         * ```
         * pen.graph.sector([1,2],3,0,90) // draw upper-right quarter-sector (x-1)^2+(y-2)^2 = 9.
         * ```
         */
        sector(center: Point2D, radius: number, qStart: number, qEnd: number) {
            this.arc(center, radius, qStart, qEnd)
            let A = TranslatePoint(center, qStart, radius)
            let B = TranslatePoint(center, qEnd, radius)
            this._pen.line(A, center)
            this._pen.line(B, center)
        },
        /**
         * Draw an segment of (x-h)^2+(y-k)^2 = r^2.
         * @category graph
         * @param center - The center coordinates [h,k].
         * @param radius - The radius.
         * @param qStart - The starting polar angle.
         * @param qEnd - The ending polar angle.
         * @returns void
         * ```
         * pen.graph.segment([1,2],3,0,90) // draw upper-right quarter-segment (x-1)^2+(y-2)^2 = 9.
         * ```
         */
        segment(center: Point2D, radius: number, qStart: number, qEnd: number) {
            this.arc(center, radius, qStart, qEnd)
            let A = TranslatePoint(center, qStart, radius)
            let B = TranslatePoint(center, qEnd, radius)
            this._pen.line(A, B)
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
            const [xmin, xmax] = this._pen.frame.xRange();
            const y = (x: number) => m * x + c;
            this._pen.line([xmin, y(xmin)], [xmax, y(xmax)]);
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
            const [xmin, xmax] = this._pen.frame.xRange();
            this._pen.line([xmin, y], [xmax, y]);
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
            const [ymin, ymax] = this._pen.frame.yRange();
            this._pen.line([x, ymin], [x, ymax]);
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
            if (a === 0 && b !== 0) this.horizontal(-c / b);
            if (b == 0 && a !== 0) this.vertical(-c / a);
            if (a !== 0 && b !== 0) this.line(-a / b, -c / b);
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
     * Draw a horizontal cutter.
     * @category draw
     * @param position - The coordinates [x,y] to draw.
     * @param label - The label of the point.
     * @returns void
     * ```
     * pen.cutterH([1,2]) // draw a horizontal cutter at [1,2]
     * ```
     */
    cutterH(position: Point2D, label?: string) {
        this.drawTickVertical(position, DEFAULT_CUTTER_LENGTH_PIXEL)
        if (label !== undefined) this.label.point(position, label, 90)
    }

    /**
     * Draw a vertical cutter.
     * @category draw
     * @param position - The coordinates [x,y] to draw.
     * @param label - The label of the point.
     * @returns void
     * ```
     * pen.cutterV([1,2]) // draw a vertical cutter at [1,2]
     * ```
     */
    cutterV(position: Point2D, label?: string) {
        this.drawTickHorizontal(position, DEFAULT_CUTTER_LENGTH_PIXEL)
        if (label !== undefined) this.label.point(position, label, 0)
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
     * @ignore
     */
    private _line(startPoint: Point, endPoint: Point, { arrow = false, dash = false }) {
        this.ctx.save()
        if (dash) this.set.dash(true)
        this.drawStroke([startPoint, endPoint])
        this.ctx.restore();

        if (arrow) this.drawArrowHead(startPoint, endPoint)
    }


    /**
     * Draw a line between two points.
     * @category draw
     * @param startPoint - The coordinates [x,y] of the start-point.
     * @param endPoint - The coordinates [x,y] of the end-point.
     * @param label - The label of the point.
     * @returns void
     * ```
     * pen.line([1,2],[3,4]) // draw a line from [1,2] to [3,4]
     * pen.line([1,2],[3,4],'10') //  draw a line from [1,2] to [3,4] with label '10'
     * ```
     */
    line(startPoint: Point, endPoint: Point, label?: string) {
        this._line(startPoint, endPoint, {})
        if (label !== undefined) this.label.line([startPoint, endPoint], label)
    }

    /**
     * Draw a dash line between two points.
     * @category draw
     * @param startPoint - The coordinates [x,y] of the start-point.
     * @param endPoint - The coordinates [x,y] of the end-point.
     * @param label - The label of the point.
     * @returns void
     * ```
     * pen.dash([1,2],[3,4]) // draw a dash line from [1,2] to [3,4]
     * pen.dash([1,2],[3,4],'10') //  draw a dash line from [1,2] to [3,4] with label '10'
     * ```
     */
    dash(startPoint: Point, endPoint: Point, label?: string) {
        this._line(startPoint, endPoint, { dash: true })
        if (label !== undefined) this.label.line([startPoint, endPoint], label)
    }


    /**
     * Draw an arrow between two points.
     * @category draw
     * @param startPoint - The coordinates [x,y] of the start-point.
     * @param endPoint - The coordinates [x,y] of the end-point.
     * @returns void
     * ```
     * pen.arrow([1,2],[3,4]) // draw an arrow from [1,2] to [3,4]
     * ```
     */
    arrow(startPoint: Point, endPoint: Point) {
        this._line(startPoint, endPoint, { arrow: true })
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
            const [h, k] = center
            let points = cal.trace(t => [h + radius * cos(t), k + radius * sin(t)], [0, 360])
            this._pen.polyfill(...points)
        },
        /**
         * Fill a sector (x-h)^2+(y-k)^2 = r^2.
         * @category fill
         * @param center - The center coordinates [h,k].
         * @param radius - The radius.
         * @param qStart - The starting polar angle.
         * @param qEnd - The ending polar angle.
         * @returns void
         * ```
         * pen.fill.sector([1,2],3,0,90) // fill the upper-right quarter-circle (x-1)^2+(y-2)^2 = 9.
         * ```
         */
        sector(center: Point2D, radius: number, qStart: number, qEnd: number) {
            const [h, k] = center
            let points = cal.trace(t => [h + radius * cos(t), k + radius * sin(t)], [qStart, qEnd])
            this._pen.polyfill(center, ...points)
        },
        /**
         * Fill a segment (x-h)^2+(y-k)^2 = r^2.
         * @category fill
         * @param center - The center coordinates [h,k].
         * @param radius - The radius.
         * @param qStart - The starting polar angle.
         * @param qEnd - The ending polar angle.
         * @returns void
         * ```
         * pen.fill.segment([1,2],3,0,90) // fill the upper-right quarter-segment (x-1)^2+(y-2)^2 = 9.
         * ```
         */
        segment(center: Point2D, radius: number, qStart: number, qEnd: number) {
            const [h, k] = center
            let points = cal.trace(t => [h + radius * cos(t), k + radius * sin(t)], [qStart, qEnd])
            this._pen.polyfill(...points)
        },
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
        A = this.project(A)
        B = this.project(B)
        O = this.project(O)
        if (radius < 0) {
            let angle = Angle(A, O, B)
            let extra = Math.max(30 - angle, 0) * 2
            radius = 15 + extra
        }
        this.decorate.angle(A, O, B, arc, radius)
        if (label !== undefined) this.label.angle([A, O, B], label, undefined, 25 + radius - 15)
    }



    /**
     * Geometry Decorator.
     * @category decorator
     */
    decorate = {
        /**
         * @ignore
         */
        _pen: this as PenCls,
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
            this._pen.drawEqualMark(startPoint, endPoint, 5, tick, 3)
        },

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
            startPoint = this._pen.project(startPoint)
            endPoint = this._pen.project(endPoint)
            let size = 4
            let space = 6
            size = size * PEN_QUALITY;
            space = space * PEN_QUALITY;
            startPoint = this._pen.frame.toPix(startPoint);
            endPoint = this._pen.frame.toPix(endPoint);
            let [x, y] = [(startPoint[0] + endPoint[0]) / 2, (startPoint[1] + endPoint[1]) / 2];
            let dy = endPoint[1] - startPoint[1];
            let dx = endPoint[0] - startPoint[0];
            let angle = Math.atan2(dy, dx);

            let mark = (position: number) => {
                this._pen.ctx.save();
                this._pen.ctx.translate(x, y);
                this._pen.ctx.rotate(angle);
                this._pen.ctx.beginPath();
                this._pen.ctx.moveTo(position, 0);
                this._pen.ctx.lineTo(position - size * 2, -size);
                this._pen.ctx.moveTo(position, 0);
                this._pen.ctx.lineTo(position - size * 2, size);
                this._pen.ctx.stroke();
                this._pen.ctx.restore();
            };
            for (let i = 0; i < tick; i++) {
                mark(i * space);
            }
        },

        /**
         * Decorate an angle AOB, always in anti-clockwise.
         * @category decorator
         * @deprecated use pen.set.angle('polar')
         * @param A - The starting point [x,y].
         * @param O - The vertex point [x,y].
         * @param B - The ending point [x,y].
         * @param arc - The number of arcs.
         * @param radius - The radius of the angle arc, in pixel.
         * @returns void
         * ```
         * pen.decorate.anglePolar([1,0],[0,0],[3,2],2) 
         * // decorate an angle AOB with double-arc in anti-clockwise.
         * ```
         */
        anglePolar(A: Point2D, O: Point2D, B: Point2D, arc = 1, radius = 15) {
            A = this._pen.frame.toPix(A);
            let OPixel = this._pen.frame.toPix(O);
            B = this._pen.frame.toPix(B);
            let a1 = Math.atan2(-(A[1] - OPixel[1]), A[0] - OPixel[0]) / Math.PI * 180;
            let a2 = Math.atan2(-(B[1] - OPixel[1]), B[0] - OPixel[0]) / Math.PI * 180;
            let space = 3
            let outset = arc > 1 ? space / 2 : 0
            for (let i = 0; i < arc; i++) {
                this._pen.circle(O, radius + outset - i * space, [a1, a2]);
            }
        },

        /**
         * Decorate an angle AOB, always non-reflex.
         * @category decorator
         * @param A - The starting point [x,y].
         * @param O - The vertex point [x,y].
         * @param B - The ending point [x,y].
         * @param arc - The number of arcs.
         * @param radius - The radius of the angle arc, in pixel.
         * @returns void
         * ```
         * pen.decorate.angle([1,0],[0,0],[3,2],2) 
         * // decorate an angle AOB with double-arc.
         * ```
         */
        angle(A: Point, O: Point, B: Point, arc = 1, radius = -1) {
            A = this._pen.project(A)
            B = this._pen.project(B)
            O = this._pen.project(O)
            if (radius < 0) {
                let angle = Angle(A, O, B)
                let extra = Math.max(30 - angle, 0) * 2
                radius = 15 + extra
            }
            let mode = this._pen.setProperty.ANGLE_MODE
            if (mode === 'normal' && IsReflex(A, O, B)) [A, B] = [B, A]
            if (mode === 'reflex' && !IsReflex(A, O, B)) [A, B] = [B, A]
            // draw like polar
            A = this._pen.frame.toPix(A);
            let OPixel = this._pen.frame.toPix(O);
            B = this._pen.frame.toPix(B);
            let a1 = Math.atan2(-(A[1] - OPixel[1]), A[0] - OPixel[0]) / Math.PI * 180;
            let a2 = Math.atan2(-(B[1] - OPixel[1]), B[0] - OPixel[0]) / Math.PI * 180;
            let space = 3
            let outset = arc > 1 ? space / 2 : 0
            for (let i = 0; i < arc; i++) {
                this._pen.circle(O, radius + outset - i * space, [a1, a2]);
            }
        },


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
            A = this._pen.project(A)
            O = this._pen.project(O)
            B ??= RotatePoint(A, O, 90)
            B = this._pen.project(B)

            size = size * PEN_QUALITY;
            A = this._pen.frame.toPix(A);
            O = this._pen.frame.toPix(O);
            B = this._pen.frame.toPix(B);
            let angleA = Math.atan2(A[1] - O[1], A[0] - O[0]);
            let angleB = Math.atan2(B[1] - O[1], B[0] - O[0]);

            let P: Point2D = [O[0] + size * Math.cos(angleA), O[1] + size * Math.sin(angleA)];
            let Q: Point2D = [O[0] + size * Math.cos(angleB), O[1] + size * Math.sin(angleB)];
            let R: Point2D = [O[0] + size * Math.cos(angleA) + size * Math.cos(angleB), O[1] + size * Math.sin(angleA) + size * Math.sin(angleB)];

            let draw = (A: Point2D, B: Point2D) => {
                this._pen.ctx.beginPath();
                this._pen.ctx.moveTo(A[0], A[1]);
                this._pen.ctx.lineTo(B[0], B[1]);
                this._pen.ctx.stroke();
            };
            draw(P, R);
            draw(Q, R);
        },

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
            this._pen.ctx.save();
            let [x0, y0] = this._pen.frame.toPix(position);
            let length = 50
            let aLength = 20
            let aWidth = 10
            this._pen.ctx.translate(x0, y0);
            this._pen.ctx.beginPath();
            this._pen.ctx.moveTo(0, -1.2 * length);
            this._pen.ctx.lineTo(0, 1.2 * length);
            this._pen.ctx.moveTo(-aWidth, -1.2 * length + aLength);
            this._pen.ctx.lineTo(0, -1.2 * length);
            this._pen.ctx.lineTo(aWidth, -1.2 * length + aLength);
            this._pen.ctx.stroke();
            this._pen.ctx.moveTo(-length, 0);
            this._pen.ctx.lineTo(length, 0);
            this._pen.ctx.stroke();
            this._pen.ctx.restore();
        }
    };

    /**
     * @ignore
     */
    private _write(text: string, xPix: number, yPix: number) {
        text = String(text)
        if (text === '') return
        this.ctx.save()
        let ANGLE = -this.setProperty.TEXT_DIR * Math.PI / 180
        if (this.setProperty.TEXT_LATEX) {
            // const REM_PIXEL = parseFloat(getComputedStyle(document.documentElement).fontSize);
            let size = Math.round(this.setProperty.TEXT_SIZE * REM_PIXEL * PEN_QUALITY);
            let color = this.ctx.fillStyle
            text = `\\color{${color}} ` + text
            // @ts-ignore
            const widget = new CanvasLatex.default(
                text,
                { displayMode: true, debugBounds: false, baseSize: size }
            );
            const bounds = widget.getBounds();
            if (bounds !== null) {
                this.ctx.translate(xPix, yPix)
                this.ctx.rotate(ANGLE);
                let xTune: number = 2 - bounds.width / 2 - bounds.x
                if (this.ctx.textAlign === 'left') xTune = 2 - bounds.x
                if (this.ctx.textAlign === 'right') xTune = 2 - bounds.width - bounds.x
                if (this.ctx.textAlign === 'center') xTune = 2 - bounds.width / 2 - bounds.x

                let yTune: number = - bounds.y / 2
                if (this.ctx.textBaseline === 'top') yTune = - bounds.y
                if (this.ctx.textBaseline === 'bottom') yTune = - bounds.y - bounds.height
                if (this.ctx.textBaseline === 'middle') yTune = - bounds.y - bounds.height / 2

                this.ctx.translate(xTune, yTune)
                widget.draw(this.ctx)
            }
        } else {
            this.ctx.translate(xPix, yPix)
            this.ctx.rotate(ANGLE);
            this.ctx.fillText(text, 0, 0)
        }
        this.ctx.restore()
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
        position = this.project(position)
        const [x, y] = this.frame.toPix(position);
        this._write(text, x, y);
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
         * @param dodgeDirection - The direction to offset, given as a polar angle.
         * @param offsetPixel - The pixel distance to offset from the position.
         * @returns void
         * ```
         * pen.label.point([1,2],'A',180) 
         * // label the point [1,2] as 'A', place the label on the left (180 degree)
         * ```
         */
        point(position: Point, text = '', dodgeDirection?: number, offsetPixel = 15) {
            position = this._pen.project(position)
            let [x, y] = this._pen.frame.toPix(position);
            offsetPixel = offsetPixel * PEN_QUALITY;
            if (dodgeDirection === undefined) {
                let center = this._pen.setProperty.LABEL_CENTER
                if (center !== undefined && AreDistinctPoint(center, position)) {
                    dodgeDirection = Direction(center, position)
                } else {
                    dodgeDirection = 0
                }
            }

            let textWidth = this._pen._textWidth(text)
            x += (offsetPixel + textWidth - 5) * Math.cos(dodgeDirection / 180 * Math.PI);
            y -= offsetPixel * Math.sin(dodgeDirection / 180 * Math.PI);

            this._pen.ctx.save();
            if (owl.alphabet(text)) this._pen.set.textItalic(true)
            this._pen._write(text, x, y);
            this._pen.ctx.restore();
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
         * Add a label to an angle AOB, in anticlockwise.
         * @category text
         * @deprecated use pen.set.angle('polar')
         * @param anglePoints - An array [A,O,B] for the coordinates of A,O,B.
         * @param text - The string to write.
         * @param dodgeDirection - The direction to offset, given as a polar angle,relative to mid-ray of angle AOB.
         * @param offsetPixel - The pixel distance to offset from the position. If negative, default to (text.length <= 2 ? 25 : 30).
         * @returns void
         * ```
         * pen.label.anglePolar([[1,2],[0,0],[-2,1]],'x') 
         * // label the angle as 'x'
         * ```
         */
        anglePolar(anglePoints: [Point2D, Point2D, Point2D], text: string, dodgeDirection = 0, offsetPixel = 25) {
            let [A, O, B] = anglePoints;
            let APixel = this._pen.frame.toPix(A);
            let OPixel = this._pen.frame.toPix(O);
            let BPixel = this._pen.frame.toPix(B);
            let a1 = Math.atan2(-(APixel[1] - OPixel[1]), APixel[0] - OPixel[0]) / Math.PI * 180;
            let a2 = Math.atan2(-(BPixel[1] - OPixel[1]), BPixel[0] - OPixel[0]) / Math.PI * 180;
            if (a2 < a1) a2 = a2 + 360
            this.point(O, text, (a1 + a2) / 2 + dodgeDirection, offsetPixel);
        },
        /**
         * Add a label to an angle AOB, non-reflex.
         * @category text
         * @param anglePoints - An array [A,O,B] for the coordinates of A,O,B.
         * @param text - The string to write.
         * @param dodgeDirection - The direction to offset, given as a polar angle,relative to mid-ray of angle AOB.
         * @param offsetPixel - The pixel distance to offset from the position. If negative, default to (text.length <= 2 ? 25 : 30).
         * @returns void
         * ```
         * pen.label.angle([[1,2],[0,0],[-2,1]],'x') 
         * // label the angle as 'x'
         * ```
         */
        angle(anglePoints: [Point, Point, Point], text: string | number, dodgeDirection = 0, offsetPixel = -1) {
            let ps = anglePoints.map(p => this._pen.project(p)) as [Point2D, Point2D, Point2D]
            let mode = this._pen.setProperty.ANGLE_MODE
            if (mode === 'normal' && IsReflex(...ps))
                ps = [...ps].reverse() as [Point2D, Point2D, Point2D]
            if (mode === 'reflex' && !IsReflex(...ps))
                ps = [...ps].reverse() as [Point2D, Point2D, Point2D]
            // draw like polar
            let [A, O, B] = ps;
            let APixel = this._pen.frame.toPix(A);
            let OPixel = this._pen.frame.toPix(O);
            let BPixel = this._pen.frame.toPix(B);
            let a1 = Math.atan2(-(APixel[1] - OPixel[1]), APixel[0] - OPixel[0]) / Math.PI * 180;
            let a2 = Math.atan2(-(BPixel[1] - OPixel[1]), BPixel[0] - OPixel[0]) / Math.PI * 180;
            if (a2 < a1) a2 = a2 + 360
            if (typeof text === 'number') text = text + '°'
            if (offsetPixel < 0) {
                let angle = Angle(A, O, B)
                let extra = Math.max(30 - angle, 0) * 2
                offsetPixel = 25 + extra
            }
            this.point(O, text, (a1 + a2) / 2 + dodgeDirection, offsetPixel);
        },

        /**
         * Add a label to a line AB.
         * @category text
         * @param linePoints - An array [A,B] for the coordinates of AB.
         * @param text - The string to write.
         * @param dodgeDirection - The direction to offset, given as a polar angle,relative to the right normal of AB.
         * @param offsetPixel - The pixel distance to offset from the position. If negative, default to (text.length <= 2 ? 15 : text.length <= 4 ? 20 : 25).
         * @returns void
         * ```
         * pen.label.line([[0,0],[2,4]],'L') // label the line as 'L'
         * ```
         */
        line(linePoints: [Point, Point], text: string | number, dodgeDirection = 0, offsetPixel = 15) {
            let [A, B] = linePoints;
            A = this._pen.project(A)
            B = this._pen.project(B)
            let M = MidPoint(A, B);
            let APixel = this._pen.frame.toPix(A);
            let BPixel = this._pen.frame.toPix(B);
            let q = Math.atan2(-(BPixel[1] - APixel[1]), BPixel[0] - APixel[0]) / Math.PI * 180 - 90;
            if (typeof text === 'number') {
                if (this._pen.setProperty.LENGTH_UNIT === undefined) {
                    text = String(text)
                } else {
                    if (this._pen.setProperty.TEXT_LATEX) {
                        text = text + '~\\text{' + this._pen.setProperty.LENGTH_UNIT + '}'
                    } else {
                        text = text + ' ' + this._pen.setProperty.LENGTH_UNIT
                    }
                }
            }
            this.point(M, text, q + dodgeDirection, offsetPixel);
        },

        /**
         * Add a coordinates label to a point.
         * @category text
         * @param position - The coordinates [x,y] of the point to label.
         * @param dodgeDirection - The direction to offset, given as a polar angle.
         * @param offsetPixel - The pixel distance to offset from the position.
         * @returns void
         * ```
         * pen.label.coordinates([1,2],180) 
         * // label the point [1,2] as '(1, 2)', place the label on the left (180 degree)
         * ```
         */
        coordinates(point: Point2D, dodgeDirection = 90, offsetPixel = 15) {
            let text = '(' + Fix(point[0], 1) + ', ' + Fix(point[1], 1) + ')'
            this.point(point, text, dodgeDirection, offsetPixel)
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
            const [xmin, xmax] = this._pen.frame.xRange();
            const offset = 3 * this._pen.frame.xOffset();
            this._pen.arrow([xmin, 0], [xmax, 0]);
            this._pen.ctx.save();
            this._pen.set.textItalic(label.length === 1);
            this._pen.set.textAlign("right");
            this._pen.set.textBaseline("middle");
            this._pen.write([xmax, offset], label);
            this._pen.ctx.restore();
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
            const [ymin, ymax] = this._pen.frame.yRange();
            const offset = 3 * this._pen.frame.yOffset();
            this._pen.arrow([0, ymin], [0, ymax]);
            this._pen.ctx.save();
            this._pen.set.textItalic(label.length === 1);
            this._pen.set.textAlign("left");
            this._pen.set.textBaseline("top");
            this._pen.write([offset, ymax], label);
            this._pen.ctx.restore();
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
            const offset = this._pen.frame.xOffset();
            for (let x of this._pen.frame.xTicks(interval)) {
                this._pen.line([x, -offset], [x, offset]);
                if (mark) {
                    this._pen.ctx.save();
                    this._pen.set.textItalic();
                    this._pen.set.textAlign("center");
                    this._pen.set.textBaseline("middle");
                    this._pen.write([x, -3 * offset], x.toString());
                    this._pen.ctx.restore();
                };
            }
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
            const offset = this._pen.frame.yOffset();
            for (let y of this._pen.frame.yTicks(interval)) {
                this._pen.line([-offset, y], [offset, y]);
                if (mark) {
                    this._pen.ctx.save();
                    this._pen.set.textItalic();
                    this._pen.set.textAlign("right");
                    this._pen.set.textBaseline("middle");
                    this._pen.write([-2 * offset, y], y.toString());
                    this._pen.ctx.restore();
                };
            }
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
            this._pen.ctx.save();
            this._pen.ctx.strokeStyle = "#d3d5db";
            this._pen.graph.vertical(0);
            for (let x of this._pen.frame.xTicks(interval)) {
                this._pen.graph.vertical(x);
            }
            this._pen.ctx.restore();
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
            this._pen.ctx.save();
            this._pen.ctx.strokeStyle = "#d3d5db";
            this._pen.graph.horizontal(0);
            for (let y of this._pen.frame.yTicks(interval)) {
                this._pen.graph.horizontal(y);
            }
            this._pen.ctx.restore();
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
        circle(center: Point3D, radius: number, xVec: Vector3D, yVec: Vector3D, {
            line = true,
            dash = !true,
            shade = !true,
            fill = !true,
            arc = [0, 360]
        } = {}): void {
            let ps = Trace(t => [radius * cos(t), radius * sin(t)], arc[0], arc[1])
            let ps3D = EmbedPlane(ps, center, xVec, yVec)

            if (line) {
                this._pen.ctx.save()
                if (dash) this._pen.set.dash(true)
                if (arc[1] - arc[0] >= 360) {
                    this._pen.polygon(...ps3D)
                } else {
                    this._pen.polyline(...ps3D)
                }
                this._pen.ctx.restore()
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

            let leftEnd = Vec3DAdd(center, [radius, 0, 0])

            if (radiusLine)
                this._pen.line(center, leftEnd)

            if (radiusDash)
                this._pen.dash(center, leftEnd)

            if (radiusLabel.length > 0)
                this._pen.label.line([leftEnd, center], radiusLabel)
        },


        /**
         * 
         * @ignore
         */
        _cyclicBases(lowerBase: Point3D[], upperBase: Point3D[]): [(index: number) => Point3D, (index: number) => Point3D, number] {
            lowerBase = [...lowerBase]
            upperBase = [...upperBase]
            let length = Math.max(lowerBase.length, upperBase.length)
            let cyclic = <T>(arr: T[], i: number): T => {
                let n = arr.length
                return arr[(i % n + n) % n]
            }
            let lowerCyclic = (index: number) => cyclic(lowerBase, index)
            let upperCyclic = (index: number) => cyclic(upperBase, index)
            return [lowerCyclic, upperCyclic, length]
        },

        /**
         * Draw the envelop of a frustum
         * @category 3D
         * @returns void
         * ```
         * let [A,B,C] = [[0,0,0],[1,0,0],[0,1,0]]
         * let [D,E,F] = [[0,0,3],[1,0,3],[0,1,3]]
         * pen.d3.envelope([A,B,C],[D,E,F]) 
         * ```
         */
        envelope(lowerBase: Point3D[], upperBase: Point3D[]): [Point3D, Point3D][] {
            let [lCyc, uCyc, len] = this._cyclicBases(lowerBase, upperBase)
            let isPolar = (A: Point3D, O: Point3D, B: Point3D) =>
                AnglePolar(this._pen.project(A), this._pen.project(O), this._pen.project(B)) < 180 ? 1 : -1
            let lastPolarwise = isPolar(lCyc(-1), uCyc(-1), lCyc(0))
            let arr: [Point3D, Point3D][] = []
            for (let i = 0; i < len; i++) {
                let polarwise = isPolar(lCyc(i), uCyc(i), lCyc(i + 1))
                if (lastPolarwise * polarwise === -1)
                    arr.push([lCyc(i), uCyc(i)])
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
        frustum(lowerBase: Point3D[], upperBase: Point3D[], {
            base = true,
            height = !true,
            shadeLower = !true,
            shadeUpper = !true,
            envelope = !true,
        } = {}) {
            lowerBase = [...lowerBase]
            upperBase = [...upperBase]
            let [lCyc, uCyc, len] = this._cyclicBases(lowerBase, upperBase)

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
                for (let i = 0; i < len; i++) {
                    this._pen.line(lCyc(i), uCyc(i))
                }
            }

            if (height) {
                let V = Vec3DMean(...upperBase)
                let [A, B, C] = lowerBase
                let O = ProjectionOnPlane(V, [A, B, C])
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
            let lower = EmbedPlaneZ(lowerBase, lowerZ)
            let upper = EmbedPlaneZ(lowerBase, upperZ)
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
            envelope = !true,
        } = {}) {
            let ps = TraceCircle(center, radius)
            let lower = EmbedPlaneZ(ps, lowerZ)
            let upper = EmbedPlaneZ(ps, upperZ)
            this.frustum(lower, upper, {
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
            let lower = EmbedPlaneZ(lowerBase, lowerZ)
            this.frustum(lower, [vertex], {
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
            envelope = !true,
        } = {}) {
            let ps = TraceCircle(center, radius)
            let lower = EmbedPlaneZ(ps, lowerZ)
            this.frustum(lower, [vertex], {
                base,
                height,
                shadeLower,
                envelope
            })
        }


    };





    /**
     * @ignore
     */
    project(point: Point3D | Point2D): Point2D {
        if (owl.point(point)) return point
        return this.pj(point)
    }






    /**
     * @ignore
     * @deprecated
     */
    autoCrop() {
        trimCanvas(this.canvas)
    }



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
        const src = 'src="' + this.canvas.toDataURL() + '"';
        const width = ' width="' + Math.floor(this.canvas.width / PEN_QUALITY) + '"';
        const height = ' height="' + Math.floor(this.canvas.height / PEN_QUALITY) + '"';
        return html.replace('src="' + placeholder + '"', src + width + height);
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
        let clone = cloneCanvas(this.canvas);
        trimCanvas(clone);
        const src = 'src="' + clone.toDataURL() + '"';
        const w = Math.floor(clone.width / PEN_QUALITY)
        const h = Math.floor(clone.height / PEN_QUALITY)
        const width = ' width="' + w + '"';
        const height = ' height="' + h + '"';
        return html.replace('src="' + placeholder + '"', src + width + height);
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
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
        this.imgStore = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
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
        if (this.imgStore !== null)
            this.ctx.putImageData(this.imgStore, 0, 0);
    }


    /**
     * @ignore
     */
    private _textWidth(text: string): number {
        if (this.setProperty.TEXT_LATEX) {
            let size = Math.round(this.setProperty.TEXT_SIZE * REM_PIXEL * PEN_QUALITY);
            let color = this.ctx.fillStyle
            text = `\\color{${color}} ` + text
            // @ts-ignore
            const widget = new CanvasLatex.default(
                text,
                { displayMode: true, debugBounds: false, baseSize: size }
            );
            const bounds = widget.getBounds();
            if (bounds === null) return 0
            return bounds.width / 2
        } else {
            return this.ctx.measureText(text).width / 2
        }

    }



};

/**
 * @ignore
 */
var Pen = PenCls
globalThis.Pen = Pen


/**
 * @ignore
 */
function cloneCanvas(oldCanvas: HTMLCanvasElement) {
    //create a new canvas
    let newCanvas = document.createElement('canvas');
    let context = newCanvas.getContext('2d')!;
    //set dimensions
    newCanvas.width = oldCanvas.width;
    newCanvas.height = oldCanvas.height;
    //apply the old canvas to the new one
    context.drawImage(oldCanvas, 0, 0);
    //return the new canvas
    return newCanvas;
}




/**
 * @ignore
 */
function trimCanvas(canvas: HTMLCanvasElement) {

    function rowBlank(imageData: ImageData, width: number, y: number) {
        for (var x = 0; x < width; ++x) {
            if (imageData.data[y * width * 4 + x * 4 + 3] !== 0) return false;
        }
        return true;
    }

    function columnBlank(imageData: ImageData, width: number, x: number, top: number, bottom: number) {
        for (var y = top; y < bottom; ++y) {
            if (imageData.data[y * width * 4 + x * 4 + 3] !== 0) return false;
        }
        return true;
    }

    var ctx = canvas.getContext("2d")!;
    var width = canvas.width;
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var top = 0, bottom = imageData.height, left = 0, right = imageData.width;

    while (top < bottom && rowBlank(imageData, width, top)) ++top;
    while (bottom - 1 > top && rowBlank(imageData, width, bottom - 1)) --bottom;
    while (left < right && columnBlank(imageData, width, left, top, bottom)) ++left;
    while (right - 1 > left && columnBlank(imageData, width, right - 1, top, bottom)) --right;

    var trimmed = ctx.getImageData(left, top, right - left, bottom - top);
    canvas.width = trimmed.width;
    canvas.height = trimmed.height;
    ctx.putImageData(trimmed, 0, 0);
}

