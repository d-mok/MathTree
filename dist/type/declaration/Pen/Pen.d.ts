/**
 * @category DrawingPen
 */
declare class PenCls {
    /**
     * @ignore
     */
    private canvas;
    /**
     * @ignore
     */
    ctx: CanvasRenderingContext2D;
    /**
     * @ignore
     */
    frame: FrameCls;
    /**
     * @ignore
     */
    private imgStore;
    /**
     * @ignore
     */
    constructor();
    /**
     * Setup of canvas coordinate range.
     * @category setting
     */
    range: {
        /**
         * @ignore
         */
        pen: PenCls;
        /**
         * Set the coordinate range of the canvas.
         * @category SetupRange
         * @param xRange - The range [xmin,xmax].
         * @param yRange - The range [ymin,ymax].
         * @returns
         * ```typescript
         * pen.range.set([-5,5],[-2,4]) // -5<x<5 and -2<y<4
         * ```
         */
        set(xRange: [number, number], yRange?: [number, number]): void;
        /**
         * Set the coordinate range of the canvas with given size and center.
         * Equivalent to pen.range.range([-size, size], [-size, size]) but shifted center.
         * @category SetupRange
         * @param size - The max x and y coordinates in range.
         * @param center - [x,y] coordinates of the center.
         * @returns
         * ```typescript
         * pen.range.square(5) // define range -5<x<5 and -5<y<5
         * pen.range.square(5,[1,2]) // define range -4<x<6 and -3<y<7
         * ```
         */
        square(size: number, center?: Point): void;
        /**
         * Set the coordinate range by specifying in-view points.
         * @category SetupRange
         * @param points - An array of in-view points [x,y].
         * @returns
         * ```typescript
         * pen.range.capture([1,2],[3,4]) //  [1,2], [3,4] must be in-view
         * ```
         */
        capture(...points: Point[]): void;
        /**
         * Set the coordinate range by specifying in-view points, include O(0,0).
         * @category SetupRange
         * @param points - An array of in-view points [x,y].
         * @returns
         * ```typescript
         * pen.range.extend([1,2],[3,4]) //  [0,0], [1,2], [3,4] must be in-view
         * // equivalent to pen.range.capture([0,0],[1,2],[3,4])
         * ```
         */
        extend(...points: Point[]): void;
    };
    /**
     * Setup of canvas size.
     * @category setting
     */
    size: {
        /**
         * @ignore
         */
        pen: PenCls;
        /**
         * Set the size of the canvas.
         * @category SetupSize
         * @param width - The scale of the width.
         * @param height - The scale of the height.
         * @returns
         * ```typescript
         * pen.size.set(0.5,2)
         * // half the standard width, double the standard height
         * ```
         */
        set(width?: number, height?: number): void;
        /**
         * Set the size of the canvas by resolution.
         * @category SetupSize
         * @param xPPI - The scale per unit x.
         * @param yPPI - The scale per unit y, if not provided, follow x.
         * @returns
         * ```typescript
         * pen.size.resolution(0.1,0.2)
         * // 0.1 scale for each x-unit, and 0.2 scale for each y-unit.
         * ```
         */
        resolution(xPPI?: number, yPPI?: number): void;
        /**
         * Set the size of the canvas, lock xy ratio.
         * @category SetupSize
         * @param width - The scale of the width.
         * @returns
         * ```typescript
         * pen.size.lock(0.5) // half the standard width, with yPPI = xPPI.
         * ```
         */
        lock(width?: number): void;
    };
    /**
     * Setup of canvas. Deprecated.
     * @ignore
     * @category setting
     */
    setup: {
        /**
         * @ignore
         */
        pen: PenCls;
        /**
         * Set the size of the canvas.
         * @category setup
         * @param scale - The scale of the width.
         * @param  ratio - The height-to-width ratio.
         * @returns
         * ```typescript
         * pen.setup.size(0.5,2)
         * // half the standard width, with height-to-width = 2:1
         * ```
         */
        size(scale?: number, ratio?: number): void;
        /**
         * Set the size of the canvas, keep square zoom. pen.setup.range should be called before me to set the range first.
         * @category setup
         * @param scale - The scale of the width.
         * @returns
         * ```typescript
         * pen.setup.squareSize(0.5)
         * // half the standard width, with height-to-width defined by coordinates range set.
         * ```
         */
        squareSize(scale?: number): void;
        /**
         * Set the size of the canvas by resolution. pen.setup.range should be called before me to set the range first.
         * @category setup
         * @param xPPI - The scale per unit x.
         * @param yPPI - The scale per unit y, if not provided, follow x.
         * @returns
         * ```typescript
         * pen.setup.resolution(0.1,0.2)
         * // 0.1 scale for each x-unit, and 0.2 scale for each y-unit.
         * ```
         */
        resolution(xPPI?: number, yPPI?: number): void;
        /**
         * Set the coordinate range of the canvas.
         * @category setup
         * @param xRange - The range [xmin,xmax].
         * @param yRange - The range [ymin,ymax].
         * @returns
         * ```typescript
         * pen.setup.range([-5,5],[-2,4])
         * // define range -5<x<5 and -2<y<4
         * ```
         */
        range(xRange: [number, number], yRange: [number, number]): void;
        /**
         * Set the coordinate range of the canvas with given size and center.
         * Equivalent to pen.range([-size, size], [-size, size]) but shifted center.
         * @category setup
         * @param size - The max x and y coordinates in range.
         * @param center - [x,y] coordinates of the center.
         * @returns
         * ```typescript
         * pen.setup.squareRange(5) // define range -5<x<5 and -5<y<5
         * pen.setup.squareRange(5,[1,2]) // define range -4<x<6 and -3<y<7
         * ```
         */
        squareRange(size: number, center?: Point): void;
        /**
         * Set the coordinate range by specifying in-view points.
         * @category setup
         * @param points - An array of in-view points [x,y].
         * @param border - The percentage to extend the border.
         * @param origin - Must contain the origin [0,0]
         * @returns
         * ```typescript
         * pen.setup.inView([[1,2],[3,4]]) // the points [0,0], [1,2] and [3,4] must be in-view
         * ```
         */
        inView(points: Point[], border?: number, origin?: boolean): void;
    };
    /**
     * Settings.
     * @category setting
     */
    set: {
        /**
         * @ignore
         */
        pen: PenCls;
        /**
         * @ignore
         */
        LABEL_CENTER: Point | undefined;
        /**
         * Set the weight of the pen (line width).
         * @category set
         * @param weight - The line width.
         * @returns
         * ```typescript
         * pen.set.weight(2) // set a bold line
         * ```
         */
        weight(weight?: number): void;
        /**
         * Set the color of the pen stroke.
         * @category set
         * @param color - The line color.
         * @returns
         * ```typescript
         * pen.set.strokeColor('grey') // set grey line
         * ```
         */
        strokeColor(color?: string): void;
        /**
         * Set the color of filling.
         * @category set
         * @param color - The filling color.
         * @returns
         * ```typescript
         * pen.set.fillColor('grey') // set grey filling
         * ```
         */
        fillColor(color?: string): void;
        /**
         * Set the color of both filling and stroke.
         * @category set
         * @param color - The color.
         * @returns
         * ```typescript
         * pen.set.color('grey') // set grey filling and stroke
         * ```
         */
        color(color?: string): void;
        /**
         * Set the transparency.
         * @category set
         * @param alpha - The alpha value, from 0 to 1. 0 is completely transparent.
         * @returns
         * ```typescript
         * pen.set.alpha(0.9) // set slightly transparent
         * ```
         */
        alpha(alpha?: number): void;
        /**
         * Set the dash pattern of line.
         * @category set
         * @param segments - The dash pattern, as [5,5] or 5 or true.
         * @returns
         * ```typescript
         * pen.set.dash([10,5]) // set dash line
         * ```
         */
        dash(segments?: (number[] | number | boolean)): void;
        /**
         * Set the horizontal alignment of text.
         * @category set
         * @param align - The alignment {'left','right','center'}.
         * @returns
         * ```typescript
         * pen.set.textAlign('left') // set align to left
         * ```
         */
        textAlign(align?: CanvasTextAlign): void;
        /**
         * Set the vertical alignment of text.
         * @category set
         * @param baseline - The alignment {'top','bottom','middle'}.
         * @returns
         * ```typescript
         * pen.set.textBaseline('bottom') // set align to bottom
         * ```
         */
        textBaseline(baseline?: CanvasTextBaseline): void;
        /**
         * Set the size of text.
         * @category set
         * @param size - The text size.
         * @returns
         * ```typescript
         * pen.set.textSize(2) // set larger text
         * ```
         */
        textSize(size?: number): void;
        /**
         * Set italic style of text.
         * @category set
         * @param italic - Italic or not.
         * @returns
         * ```typescript
         * pen.set.textItalic(true) // set italic to true
         * ```
         */
        textItalic(italic?: boolean): void;
        /**
         * Set the center for label dodge. If undefined, dodge right by default.
         * @category set
         * @param center - the center coordinate
         * @returns
         * ```typescript
         * pen.set.labelCenter([0,0]) // set center to be [0,0]
         * ```
         */
        labelCenter(center?: Point | undefined): void;
        /**
         * Reset all pen settings.
         * @category set
         * @returns
         * ```typescript
         * pen.reset() // reset
         * ```
         */
        reset(): void;
    };
    /**
     * Plot an explicit or parametric function.
     * @category graph
     * @param func - The function to plot, either x=>f(x) or t=>[x(t),y(t)].
     * @param tStart - Start value of t, default to xmin.
     * @param tEnd - End value of t, default to xmax.
     * @param dots - Number of dots to plot. More dots give finer graph.
     * @returns
     * ```typescript
     * pen.plot(x=>x**2) // plot y=x^2
     * pen.plot(t=>[cos(t),sin(t)],0,360) // plot a circle centered (0,0) with r=1
     * ```
     */
    plot(func: (t: number) => number | Point, tStart?: number, tEnd?: number, dots?: number): void;
    /**
     * Drawing graph of functions.
     * @category graph
     */
    graph: {
        /**
         * @ignore
         */
        pen: PenCls;
        /**
         * Draw a circle (x-h)^2+(y-k)^2 = r^2.
         * @category graph
         * @param center - The center coordinates [h,k].
         * @param radius - The radius.
         * @returns
         * ```typescript
         * pen.graph.circle([1,2],3) // draw (x-1)^2+(y-2)^2 = 9.
         * ```
         */
        circle(center: Point, radius: number): void;
        /**
         * Draw an arc of (x-h)^2+(y-k)^2 = r^2.
         * @category graph
         * @param center - The center coordinates [h,k].
         * @param radius - The radius.
         * @param qStart - The starting polar angle.
         * @param qEnd - The ending polar angle.
         * @returns
         * ```typescript
         * pen.graph.arc([1,2],3,0,180) // draw upper semi-circle (x-1)^2+(y-2)^2 = 9.
         * ```
         */
        arc(center: Point, radius: number, qStart: number, qEnd: number): void;
        /**
         * Draw a sector of (x-h)^2+(y-k)^2 = r^2.
         * @category graph
         * @param center - The center coordinates [h,k].
         * @param radius - The radius.
         * @param qStart - The starting polar angle.
         * @param qEnd - The ending polar angle.
         * @returns
         * ```typescript
         * pen.graph.sector([1,2],3,0,90) // draw upper-right quarter-sector (x-1)^2+(y-2)^2 = 9.
         * ```
         */
        sector(center: Point, radius: number, qStart: number, qEnd: number): void;
        /**
         * Draw an segment of (x-h)^2+(y-k)^2 = r^2.
         * @category graph
         * @param center - The center coordinates [h,k].
         * @param radius - The radius.
         * @param qStart - The starting polar angle.
         * @param qEnd - The ending polar angle.
         * @returns
         * ```typescript
         * pen.graph.segment([1,2],3,0,90) // draw upper-right quarter-segment (x-1)^2+(y-2)^2 = 9.
         * ```
         */
        segment(center: Point, radius: number, qStart: number, qEnd: number): void;
        /**
         * Draw a quadratic graph y=ax^2+bx+c.
         * @category graph
         * @param a - The coeff of x^2.
         * @param b - The coeff of x.
         * @param c - The constant.
         * @returns
         * ```typescript
         * pen.graph.quadratic(1,2,3) // draw y=x^2+2x+3.
         * ```
         */
        quadratic(a: number, b: number, c: number): void;
        /**
         * Draw a line y=mx+c.
         * @category graph
         * @param m - The slope.
         * @param c - The y-intercept.
         * @returns
         * ```typescript
         * pen.graph.line(2,1) // draw the line y=2x+1
         * ```
         */
        line(m: number, c: number): void;
        /**
         * Draw a horizontal line y=constant.
         * @category graph
         * @param y - The constant value of y.
         * @returns
         * ```typescript
         * pen.graph.horizontal(2) // draw the line y=2
         * ```
         */
        horizontal(y: number): void;
        /**
         * Draw a vertical line x=constant.
         * @category graph
         * @param x - The constant value of x.
         * @returns
         * ```typescript
         * pen.graph.vertical(2) // draw the line x=2
         * ```
         */
        vertical(x: number): void;
        /**
         * Draw a line ax+by+c=0.
         * @category graph
         * @param a - The coeff of x.
         * @param b - The coeff of y.
         * @param c - The constant.
         * @returns
         * ```typescript
         * pen.graph.linear(1,2,3) // draw the line x+2y+3=0
         * ```
         */
        linear(a: number, b: number, c: number): void;
    };
    /**
     * Draw a point.
     * @category draw
     * @param position - The coordinates [x,y] to draw.
     * @param label - The label of the point.
     * @returns
     * ```typescript
     * pen.point([1,2]) // draw a point at [1,2]
     * pen.point([1,2],"A") // draw a point at [1,2] and label as "A"
     * ```
     */
    point(position: Point, label?: string): void;
    /**
     * Draw a point.
     * @category draw
     * @param positions - {label:position}
     * @param label - whether to label the points
     * @returns
     * ```typescript
     * pen.points({A,B}) // mark and label point A as 'A', point B as 'B'
     * pen.points({A,B},false) // mark point A and B, without label
     * ```
     */
    points(positions: {
        [k: string]: Point;
    }, label?: boolean): void;
    /**
     * Draw a horizontal cutter.
     * @category draw
     * @param position - The coordinates [x,y] to draw.
     * @param label - The label of the point.
     * @returns
     * ```typescript
     * pen.cutterH([1,2]) // draw a horizontal cutter at [1,2]
     * ```
     */
    cutterH(position: Point, label?: string): void;
    /**
     * Draw a vertical cutter.
     * @category draw
     * @param position - The coordinates [x,y] to draw.
     * @param label - The label of the point.
     * @returns
     * ```typescript
     * pen.cutterV([1,2]) // draw a vertical cutter at [1,2]
     * ```
     */
    cutterV(position: Point, label?: string): void;
    /**
     * Draw a circle or arc.
     * @category draw
     * @param center - The coordinates [x,y] of center.
     * @param radius - The radius in pixel.
     * @param angles - The polar angle range [q1,q2].
     * @param fill - Whether to fill the inside.
     * @returns
     * ```typescript
     * pen.circle([1,2], 10) // draw a circle centered at [1,2] with r=10px
     * pen.circle([1,2], 10, [0,180]) // draw a upper semi-circle
     * ```
     */
    circle(center: Point, radius: number, angles?: number[], fill?: boolean): void;
    /**
     * @ignore
     */
    private _line;
    /**
     * Draw a line between two points.
     * @category draw
     * @param startPoint - The coordinates [x,y] of the start-point.
     * @param endPoint - The coordinates [x,y] of the end-point.
     * @param label - The label of the point.
     * @returns
     * ```typescript
     * pen.line([1,2],[3,4]) // draw a line from [1,2] to [3,4]
     * pen.line([1,2],[3,4],'10') //  draw a line from [1,2] to [3,4] with label '10'
     * ```
     */
    line(startPoint: Point, endPoint: Point, label?: string): void;
    /**
     * Draw a dash line between two points.
     * @category draw
     * @param startPoint - The coordinates [x,y] of the start-point.
     * @param endPoint - The coordinates [x,y] of the end-point.
     * @param label - The label of the point.
     * @returns
     * ```typescript
     * pen.dash([1,2],[3,4]) // draw a dash line from [1,2] to [3,4]
     * pen.dash([1,2],[3,4],'10') //  draw a dash line from [1,2] to [3,4] with label '10'
     * ```
     */
    dash(startPoint: Point, endPoint: Point, label?: string): void;
    /**
     * Draw an arrow between two points.
     * @category draw
     * @param startPoint - The coordinates [x,y] of the start-point.
     * @param endPoint - The coordinates [x,y] of the end-point.
     * @returns
     * ```typescript
     * pen.arrow([1,2],[3,4]) // draw an arrow from [1,2] to [3,4]
     * ```
     */
    arrow(startPoint: Point, endPoint: Point): void;
    /**
     * @ignore
     */
    private _polygon;
    /**
     * Draw a polyline given points.
     * @category draw
     * @param points - The coordinates [x,y] of all points.
     * @returns
     * ```typescript
     * pen.polyline([0,0],[5,2],[3,4]) // draw a polyline with vertices [0,0], [5,2] and [3,4]
     * ```
     */
    polyline(...points: Point[]): void;
    /**
     * Draw a polygon given points.
     * @category draw
     * @param points - The coordinates [x,y] of all points.
     * @returns
     * ```typescript
     * pen.polygon([0,0],[5,2],[3,4]) // draw a triangle with vertices [0,0], [5,2] and [3,4]
     * ```
     */
    polygon(...points: Point[]): void;
    /**
     * Fill a polygon given points.
     * @category draw
     * @param points - The coordinates [x,y] of all points.
     * @returns
     * ```typescript
     * pen.polyfill([0,0],[5,2],[3,4]) // fill a triangle with vertices [0,0], [5,2] and [3,4]
     * ```
     */
    polyfill(...points: Point[]): void;
    /**
     * Shade a polygon given points.
     * @category draw
     * @param points - The coordinates [x,y] of all points.
     * @returns
     * ```typescript
     * pen.polyshade([0,0],[5,2],[3,4]) // shade a triangle with vertices [0,0], [5,2] and [3,4]
     * ```
     */
    polyshade(...points: Point[]): void;
    /**
     * Fill a shape.
     * @category fill
     */
    fill: {
        /**
         * @ignore
         */
        pen: PenCls;
        /**
         * Fill a circle (x-h)^2+(y-k)^2 = r^2.
         * @category fill
         * @param center - The center coordinates [h,k].
         * @param radius - The radius.
         * @returns
         * ```typescript
         * pen.fill.circle([1,2],3) // fill (x-1)^2+(y-2)^2 = 9.
         * ```
         */
        circle(center: Point, radius: number): void;
        /**
         * Fill a sector (x-h)^2+(y-k)^2 = r^2.
         * @category fill
         * @param center - The center coordinates [h,k].
         * @param radius - The radius.
         * @param qStart - The starting polar angle.
         * @param qEnd - The ending polar angle.
         * @returns
         * ```typescript
         * pen.fill.sector([1,2],3,0,90) // fill the upper-right quarter-circle (x-1)^2+(y-2)^2 = 9.
         * ```
         */
        sector(center: Point, radius: number, qStart: number, qEnd: number): void;
        /**
         * Fill a segment (x-h)^2+(y-k)^2 = r^2.
         * @category fill
         * @param center - The center coordinates [h,k].
         * @param radius - The radius.
         * @param qStart - The starting polar angle.
         * @param qEnd - The ending polar angle.
         * @returns
         * ```typescript
         * pen.fill.segment([1,2],3,0,90) // fill the upper-right quarter-segment (x-1)^2+(y-2)^2 = 9.
         * ```
         */
        segment(center: Point, radius: number, qStart: number, qEnd: number): void;
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
     * @returns
     * ```typescript
     * pen.angle([0,0],[5,2],[3,4],'x')
     * ```
     */
    angle(A: Point, O: Point, B: Point, label?: string, arc?: number, radius?: number): void;
    /**
     * Draw an angle with label, anticlockwise
     * @category draw
     * @param A - The starting point [x,y].
     * @param O - The vertex point [x,y].
     * @param B - The ending point [x,y].
     * @param label - The label
     * @param arc - The number of arcs.
     * @param radius - The radius of the angle arc, in pixel.
     * @returns
     * ```typescript
     * pen.anglePolar([0,0],[5,2],[3,4],'x')
     * ```
     */
    anglePolar(A: Point, O: Point, B: Point, label?: string, arc?: number, radius?: number): void;
    /**
     * Draw an angle with label, reflex
     * @category draw
     * @param A - The starting point [x,y].
     * @param O - The vertex point [x,y].
     * @param B - The ending point [x,y].
     * @param label - The label
     * @param arc - The number of arcs.
     * @param radius - The radius of the angle arc, in pixel.
     * @returns
     * ```typescript
     * pen.angleReflex([0,0],[5,2],[3,4],'x')
     * ```
     */
    angleReflex(A: Point, O: Point, B: Point, label?: string, arc?: number, radius?: number): void;
    /**
     * Geometry Decorator.
     * @category decorator
     */
    decorate: {
        /**
         * @ignore
         */
        pen: PenCls;
        /**
         * Decorate equal side lengths.
         * @category decorator
         * @param startPoint - The starting point [x,y].
         * @param endPoint - The ending point [x,y].
         * @param tick - The number of ticks.
         * @returns
         * ```typescript
         * pen.decorate.equalSide([1,0],[3,2],2)
         * // decorate a double-tick at the mid-pt of [1,0] and [3,2]
         * ```
         */
        equalSide(startPoint: Point, endPoint: Point, tick?: number): void;
        /**
         * Decorate parallel side.
         * @category decorator
         * @param startPoint - The starting point [x,y].
         * @param endPoint - The ending point [x,y].
         * @param tick - The number of ticks.
         * @returns
         * ```typescript
         * pen.decorate.parallel([1,0],[3,2],2)
         * // decorate a double-tick parallel mark at the mid-pt of [1,0] and [3,2]
         * ```
         */
        parallel(startPoint: Point, endPoint: Point, tick?: number): void;
        /**
         * Decorate an angle AOB, always in anti-clockwise.
         * @category decorator
         * @param A - The starting point [x,y].
         * @param O - The vertex point [x,y].
         * @param B - The ending point [x,y].
         * @param arc - The number of arcs.
         * @param radius - The radius of the angle arc, in pixel.
         * @returns
         * ```typescript
         * pen.decorate.anglePolar([1,0],[0,0],[3,2],2)
         * // decorate an angle AOB with double-arc in anti-clockwise.
         * ```
         */
        anglePolar(A: Point, O: Point, B: Point, arc?: number, radius?: number): void;
        /**
         * Decorate an angle AOB, always non-reflex.
         * @category decorator
         * @param A - The starting point [x,y].
         * @param O - The vertex point [x,y].
         * @param B - The ending point [x,y].
         * @param arc - The number of arcs.
         * @param radius - The radius of the angle arc, in pixel.
         * @returns
         * ```typescript
         * pen.decorate.angle([1,0],[0,0],[3,2],2)
         * // decorate an angle AOB with double-arc.
         * ```
         */
        angle(A: Point, O: Point, B: Point, arc?: number, radius?: number): void;
        /**
         * Decorate an angle AOB, always reflex.
         * @category decorator
         * @param A - The starting point [x,y].
         * @param O - The vertex point [x,y].
         * @param B - The ending point [x,y].
         * @param arc - The number of arcs.
         * @param radius - The radius of the angle arc, in pixel.
         * @returns
         * ```typescript
         * pen.decorate.angleReflex([1,0],[0,0],[3,2],2)
         * // decorate a reflex angle AOB with double-arc.
         * ```
         */
        angleReflex(A: Point, O: Point, B: Point, arc?: number, radius?: number): void;
        /**
         * Decorate a right-angle AOB.
         * @category decorator
         * @param A - The starting point [x,y].
         * @param O - The vertex point [x,y].
         * @param B - The ending point [x,y]. Interchangeable with A.
         * @param size - The size of the mark, in pixel.
         * @returns
         * ```typescript
         * pen.decorate.rightAngle([1,0],[0,0],[3,2])
         * // decorate an right-angle AOB
         * ```
         */
        rightAngle(A: Point, O: Point, B?: Point, size?: number): void;
    };
    /**
     * Write text.
     * @category text
     * @param position - The coordinates [x,y] to position the text.
     * @param text - The string to write.
     * @returns
     * ```typescript
     * pen.write([1,2],'abc') // write 'abc' at [1,2]
     * ```
     */
    write(position: Point, text: string): void;
    /**
     * @category text
     */
    label: {
        /**
         * @ignore
         */
        pen: PenCls;
        /**
         * Add a label to a point.
         * @category text
         * @param position - The coordinates [x,y] of the point to label.
         * @param text - The string to write.
         * @param dodgeDirection - The direction to offset, given as a polar angle.
         * @param offsetPixel - The pixel distance to offset from the position.
         * @returns
         * ```typescript
         * pen.label.point([1,2],'A',180)
         * // label the point [1,2] as 'A', place the label on the left (180 degree)
         * ```
         */
        point(position: Point, text?: string, dodgeDirection?: number | undefined, offsetPixel?: number): void;
        /**
         * Add a label to points, using index as text.
         * @category text
         * @param positions - {label:position}.
         * @returns
         * ```typescript
         * pen.label.points({A,B}) // label point A as 'A', point B as 'B'
         * ```
         */
        points(positions: {
            [k: string]: Point;
        }): void;
        /**
         * Add a label to an angle AOB, in anticlockwise.
         * @category text
         * @param anglePoints - An array [A,O,B] for the coordinates of A,O,B.
         * @param text - The string to write.
         * @param dodgeDirection - The direction to offset, given as a polar angle,relative to mid-ray of angle AOB.
         * @param offsetPixel - The pixel distance to offset from the position. If negative, default to (text.length <= 2 ? 25 : 30).
         * @returns
         * ```typescript
         * pen.label.anglePolar([[1,2],[0,0],[-2,1]],'x')
         * // label the angle as 'x'
         * ```
         */
        anglePolar(anglePoints: [Point, Point, Point], text: string, dodgeDirection?: number, offsetPixel?: number): void;
        /**
         * Add a label to an angle AOB, non-reflex.
         * @category text
         * @param anglePoints - An array [A,O,B] for the coordinates of A,O,B.
         * @param text - The string to write.
         * @param dodgeDirection - The direction to offset, given as a polar angle,relative to mid-ray of angle AOB.
         * @param offsetPixel - The pixel distance to offset from the position. If negative, default to (text.length <= 2 ? 25 : 30).
         * @returns
         * ```typescript
         * pen.label.angle([[1,2],[0,0],[-2,1]],'x')
         * // label the angle as 'x'
         * ```
         */
        angle(anglePoints: [Point, Point, Point], text: string, dodgeDirection?: number, offsetPixel?: number): void;
        /**
         * Add a label to an angle AOB, reflex.
         * @category text
         * @param anglePoints - An array [A,O,B] for the coordinates of A,O,B.
         * @param text - The string to write.
         * @param dodgeDirection - The direction to offset, given as a polar angle,relative to mid-ray of angle AOB.
         * @param offsetPixel - The pixel distance to offset from the position. If negative, default to (text.length <= 2 ? 25 : 30).
         * @returns
         * ```typescript
         * pen.label.angleReflex([[1,2],[0,0],[-2,1]],'x')
         * // label the angle as 'x'
         * ```
         */
        angleReflex(anglePoints: [Point, Point, Point], text: string, dodgeDirection?: number, offsetPixel?: number): void;
        /**
         * Add a label to a line AB.
         * @category text
         * @param linePoints - An array [A,B] for the coordinates of AB.
         * @param text - The string to write.
         * @param dodgeDirection - The direction to offset, given as a polar angle,relative to the right normal of AB.
         * @param offsetPixel - The pixel distance to offset from the position. If negative, default to (text.length <= 2 ? 15 : text.length <= 4 ? 20 : 25).
         * @returns
         * ```typescript
         * pen.label.line([[0,0],[2,4]],'L') // label the line as 'L'
         * ```
         */
        line(linePoints: [Point, Point], text: string, dodgeDirection?: number, offsetPixel?: number): void;
        /**
         * Add a coordinates label to a point.
         * @category text
         * @param position - The coordinates [x,y] of the point to label.
         * @param dodgeDirection - The direction to offset, given as a polar angle.
         * @param offsetPixel - The pixel distance to offset from the position.
         * @returns
         * ```typescript
         * pen.label.coordinates([1,2],180)
         * // label the point [1,2] as '(1, 2)', place the label on the left (180 degree)
         * ```
         */
        coordinates(point: Point, dodgeDirection?: number, offsetPixel?: number): void;
    };
    /**
     * The axis.
     * @category axis
     */
    axis: {
        /**
         * @ignore
         */
        pen: PenCls;
        /**
         * Draw x-axis.
         * @category axis
         * @param label - The axis label.
         * @returns
         * ```typescript
         * pen.axis.x('time') // draw the x-axis, label as 'time'
         * ```
         */
        x(label?: string): void;
        /**
         * Draw y-axis.
         * @category axis
         * @param label - The axis label.
         * @returns
         * ```typescript
         * pen.axis.y('height') // draw the y-axis, label as 'height'
         * ```
         */
        y(label?: string): void;
        /**
         * Draw both axis.
         * @category axis
         * @param xlabel - The x-axis label.
         * @param ylabel - The y-axis label.
         * @returns
         * ```typescript
         * pen.axis.xy('x','y') // draw both axis, label as 'x' and 'y'
         * ```
         */
        xy(xlabel?: string, ylabel?: string): void;
    };
    /**
     * The axis ticks.
     * @category axis
     */
    tick: {
        /**
         * @ignore
         */
        pen: PenCls;
        /**
         * Draw ticks on the x-axis.
         * @category axisTick
         * @param interval - The tick interval.
         * @param mark - Whether to label number at ticks.
         * @returns
         * ```typescript
         * pen.tick.x(2) // draw ticks on the x-axis, at interval 2 units
         * ```
         */
        x(interval?: number, mark?: boolean): void;
        /**
         * Draw ticks on the y-axis.
         * @category axisTick
         * @param interval - The tick interval.
         * @param mark - Whether to label number at ticks.
         * @returns
         * ```typescript
         * pen.tick.y(2) // draw ticks on the y-axis, at interval 2 units
         * ```
         */
        y(interval?: number, mark?: boolean): void;
        /**
         * Draw ticks on both axis.
         * @category axisTick
         * @param interval - The tick interval.
         * @param mark - Whether to label number at ticks.
         * @returns
         * ```typescript
         * pen.tick.xy(2) // draw ticks on both axis, at interval 2 units
         * ```
         */
        xy(interval?: number, mark?: boolean): void;
    };
    /**
     * The axis gridlines.
     * @category axis
     */
    grid: {
        /**
         * @ignore
         */
        pen: PenCls;
        /**
         * Draw gridlines on the x-axis.
         * @category axisGrid
         * @param interval - The grid interval.
         * @returns
         * ```typescript
         * pen.grid.x(2) // draw gridlines on the x-axis, at interval 2 units
         * ```
         */
        x(interval?: number): void;
        /**
         * Draw gridlines on the y-axis.
         * @category axisGrid
         * @param interval - The grid interval.
         * @returns
         * ```typescript
         * pen.grid.y(2) // draw gridlines on the y-axis, at interval 2 units
         * ```
         */
        y(interval?: number): void;
        /**
         * Draw gridlines on both axis.
         * @category axisGrid
         * @param interval - The grid interval.
         * @returns
         * ```typescript
         * pen.grid.xy(2) // draw gridlines on both axis, at interval 2 units
         * ```
         */
        xy(interval?: number): void;
    };
    /**
     * @ignore
     */
    autoCrop(): void;
    /**
     * Export the canvas to image tag.
     * @category export
     * @param html - The html string to export to.
     * @param placeholder - The src field of the image tag to export to.
     * @returns The new html with src field pasted.
     * ```typescript
     * question = pen.export(question,'imgQ')
     * // paste the canvas to the image tag with src field 'imgQ'
     * ```
     */
    export(html: string, placeholder: string): string;
    /**
     * Export the canvas to image tag, with white space trimmed.
     * @category export
     * @param html - The html string to export to.
     * @param placeholder - The src field of the image tag to export to.
     * @returns The new html with src field pasted.
     * ```typescript
     * question = pen.exportTrim(question,'imgQ')
     * // paste the canvas to the image tag with src field 'imgQ'
     * ```
     */
    exportTrim(html: string, placeholder: string): string;
    /**
     * Clear the canvas.
     * @category export
     * @returns
     * ```typescript
     * pen.clear() // clear the canvas.
     * ```
     */
    clear(): void;
    /**
     * Temporarily save the img internally. Can be later restored by restoreImg.
     * @category export
     * @returns
     * ```typescript
     * pen.saveImg() // save the current canvas image
     * ```
     */
    saveImg(): void;
    /**
     * Restored the previously saved img by saveImg.
     * @category export
     * @returns
     * ```typescript
     * pen.restoreImg() // restore the previously saved img
     * ```
     */
    restoreImg(): void;
}
/**
 * @ignore
 */
declare var Pen: typeof PenCls;
declare function cloneCanvas(oldCanvas: HTMLCanvasElement): HTMLCanvasElement;
declare function trimCanvas(canvas: HTMLCanvasElement): void;
