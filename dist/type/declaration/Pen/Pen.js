"use strict";
/**
 * @category DrawingPen
 */
class PenCls {
    /**
     * @ignore
     */
    constructor() {
        /**
         * Setup of canvas coordinate range.
         * @category setting
         */
        this.range = {
            /**
             * @ignore
             */
            _pen: this,
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
            set(xRange, yRange = xRange) {
                [this._pen.frame.xmin, this._pen.frame.xmax] = xRange;
                [this._pen.frame.ymin, this._pen.frame.ymax] = yRange;
            },
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
            square(size, center = [0, 0]) {
                let [x, y] = center;
                this.set([x - size, x + size], [y - size, y + size]);
            },
            /**
             * Set the coordinate range by specifying in-view points.
             * @category SetupRange
             * @param points - An array of in-view points [x,y].
             * @returns
             * ```typescript
             * pen.range.capture([1,2],[3,4]) //  [1,2], [3,4] must be in-view
             * ```
             */
            capture(...points) {
                let border = 0.3;
                let pts = [...points];
                let xmin = pts[0][0];
                let xmax = pts[0][0];
                let ymin = pts[0][1];
                let ymax = pts[0][1];
                for (let i = 0; i < pts.length; i++) {
                    let x = pts[i][0];
                    let y = pts[i][1];
                    if (x < xmin)
                        xmin = x;
                    if (x > xmax)
                        xmax = x;
                    if (y < ymin)
                        ymin = y;
                    if (y > ymax)
                        ymax = y;
                }
                let xSize = xmax - xmin;
                let ySize = ymax - ymin;
                if (xSize === 0 && ySize === 0) {
                    xmax++;
                    xmin--;
                    ymax++;
                    ymin--;
                }
                if (xSize === 0 && ySize !== 0) {
                    xmax += ySize / 2;
                    xmin -= ySize / 2;
                }
                if (xSize !== 0 && ySize === 0) {
                    ymax += xSize / 2;
                    ymin -= xSize / 2;
                }
                let xBorder = (xmax - xmin) * border;
                let yBorder = (ymax - ymin) * border;
                xmin -= xBorder;
                xmax += xBorder;
                ymin -= yBorder;
                ymax += yBorder;
                this.set([xmin, xmax], [ymin, ymax]);
            },
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
            extend(...points) {
                this.capture([0, 0], ...points);
            }
        };
        /**
         * Setup of canvas size.
         * @category setting
         */
        this.size = {
            /**
             * @ignore
             */
            _pen: this,
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
            set(width = 1, height = width) {
                // REM_PIXEL is the default font size of the browser, usually 16px
                const REM_PIXEL = parseFloat(getComputedStyle(document.documentElement).fontSize);
                const wPixel = width * 10 * REM_PIXEL;
                const hPixel = height * 10 * REM_PIXEL;
                // create a canvas of higher resolution (PEN_QUALITY)
                this._pen.canvas.width = wPixel * PEN_QUALITY;
                this._pen.canvas.height = hPixel * PEN_QUALITY;
                this._pen.frame.wPixel = wPixel * PEN_QUALITY;
                this._pen.frame.hPixel = hPixel * PEN_QUALITY;
                this._pen.set.reset();
            },
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
            resolution(xPPI = 0.1, yPPI = xPPI) {
                let xRange = this._pen.frame.xmax - this._pen.frame.xmin;
                let yRange = this._pen.frame.ymax - this._pen.frame.ymin;
                let xScale = xRange * xPPI;
                let yScale = yRange * yPPI;
                this.set(xScale, yScale);
            },
            /**
             * Set the size of the canvas, lock xy ratio.
             * @category SetupSize
             * @param width - The scale of the width.
             * @returns
             * ```typescript
             * pen.size.lock(0.5) // half the standard width, with yPPI = xPPI.
             * ```
             */
            lock(width = 1) {
                let xRange = this._pen.frame.xmax - this._pen.frame.xmin;
                let yRange = this._pen.frame.ymax - this._pen.frame.ymin;
                let ratio = yRange / xRange;
                this.set(width, width * ratio);
            },
        };
        /**
         * Setup of canvas. Deprecated.
         * @ignore
         * @category setting
         */
        this.setup = {
            /**
             * @ignore
             */
            _pen: this,
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
             * @param scale - The scale of the width.
             * @returns
             * ```typescript
             * pen.setup.squareSize(0.5)
             * // half the standard width, with height-to-width defined by coordinates range set.
             * ```
             */
            squareSize(scale = 1) {
                let xRange = this._pen.frame.xmax - this._pen.frame.xmin;
                let yRange = this._pen.frame.ymax - this._pen.frame.ymin;
                let ratio = yRange / xRange;
                this.size(scale, ratio);
            },
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
            resolution(xPPI = 0.1, yPPI = -1) {
                if (yPPI === -1)
                    yPPI = xPPI;
                let xRange = this._pen.frame.xmax - this._pen.frame.xmin;
                let yRange = this._pen.frame.ymax - this._pen.frame.ymin;
                let xScale = xRange * xPPI;
                let yScale = yRange * yPPI;
                this.size(xScale, yScale / xScale);
            },
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
            range(xRange, yRange) {
                [this._pen.frame.xmin, this._pen.frame.xmax] = xRange;
                [this._pen.frame.ymin, this._pen.frame.ymax] = yRange;
            },
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
            squareRange(size, center = [0, 0]) {
                let [x, y] = center;
                this.range([x - size, x + size], [y - size, y + size]);
            },
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
            inView(points, border = 0.3, origin = true) {
                let pts = [...points];
                if (origin)
                    pts.push([0, 0]);
                let xmin = pts[0][0];
                let xmax = pts[0][0];
                let ymin = pts[0][1];
                let ymax = pts[0][1];
                for (let i = 0; i < pts.length; i++) {
                    let x = pts[i][0];
                    let y = pts[i][1];
                    if (x < xmin)
                        xmin = x;
                    if (x > xmax)
                        xmax = x;
                    if (y < ymin)
                        ymin = y;
                    if (y > ymax)
                        ymax = y;
                }
                let xBorder = (xmax - xmin) * border;
                let yBorder = (ymax - ymin) * border;
                xmin -= xBorder;
                xmax += xBorder;
                ymin -= yBorder;
                ymax += yBorder;
                this.range([xmin, xmax], [ymin, ymax]);
            }
        };
        /**
         * Settings.
         * @category setting
         */
        this.set = {
            /**
             * @ignore
             */
            _pen: this,
            /**
             * @ignore
             */
            LABEL_CENTER: undefined,
            /**
             * Set the weight of the pen (line width).
             * @category set
             * @param weight - The line width.
             * @returns
             * ```typescript
             * pen.set.weight(2) // set a bold line
             * ```
             */
            weight(weight = 1) {
                this._pen.ctx.lineWidth = weight * PEN_QUALITY;
            },
            /**
             * Set the color of the pen stroke.
             * @category set
             * @param color - The line color.
             * @returns
             * ```typescript
             * pen.set.strokeColor('grey') // set grey line
             * ```
             */
            strokeColor(color = "black") {
                this._pen.ctx.strokeStyle = color;
            },
            /**
             * Set the color of filling.
             * @category set
             * @param color - The filling color.
             * @returns
             * ```typescript
             * pen.set.fillColor('grey') // set grey filling
             * ```
             */
            fillColor(color = "black") {
                this._pen.ctx.fillStyle = color;
            },
            /**
             * Set the color of both filling and stroke.
             * @category set
             * @param color - The color.
             * @returns
             * ```typescript
             * pen.set.color('grey') // set grey filling and stroke
             * ```
             */
            color(color = "black") {
                this.strokeColor(color);
                this.fillColor(color);
            },
            /**
             * Set the transparency.
             * @category set
             * @param alpha - The alpha value, from 0 to 1. 0 is completely transparent.
             * @returns
             * ```typescript
             * pen.set.alpha(0.9) // set slightly transparent
             * ```
             */
            alpha(alpha = 1) {
                this._pen.ctx.globalAlpha = alpha;
            },
            /**
             * Set the dash pattern of line.
             * @category set
             * @param segments - The dash pattern, as [5,5] or 5 or true.
             * @returns
             * ```typescript
             * pen.set.dash([10,5]) // set dash line
             * ```
             */
            dash(segments = []) {
                if (Array.isArray(segments))
                    this._pen.ctx.setLineDash(segments.map(x => x * PEN_QUALITY));
                if (typeof segments === 'number')
                    this.dash([segments, segments]);
                if (typeof segments === 'boolean')
                    this.dash(segments ? [5, 5] : []);
            },
            /**
             * Set the horizontal alignment of text.
             * @category set
             * @param align - The alignment {'left','right','center'}.
             * @returns
             * ```typescript
             * pen.set.textAlign('left') // set align to left
             * ```
             */
            textAlign(align = "center") {
                this._pen.ctx.textAlign = align;
            },
            /**
             * Set the vertical alignment of text.
             * @category set
             * @param baseline - The alignment {'top','bottom','middle'}.
             * @returns
             * ```typescript
             * pen.set.textBaseline('bottom') // set align to bottom
             * ```
             */
            textBaseline(baseline = "middle") {
                this._pen.ctx.textBaseline = baseline;
            },
            /**
             * Set the size of text.
             * @category set
             * @param size - The text size.
             * @returns
             * ```typescript
             * pen.set.textSize(2) // set larger text
             * ```
             */
            textSize(size = 1) {
                const REM_PIXEL = parseFloat(getComputedStyle(document.documentElement).fontSize);
                size = Math.round(size * REM_PIXEL * PEN_QUALITY);
                this._pen.ctx.font = this._pen.ctx.font.replace(/\d+px/g, size + 'px');
            },
            /**
             * Set italic style of text.
             * @category set
             * @param italic - Italic or not.
             * @returns
             * ```typescript
             * pen.set.textItalic(true) // set italic to true
             * ```
             */
            textItalic(italic = false) {
                if (italic) {
                    if (!this._pen.ctx.font.includes('italic'))
                        this._pen.ctx.font = 'italic ' + this._pen.ctx.font;
                }
                else {
                    this._pen.ctx.font = this._pen.ctx.font.replace('italic ', '');
                }
            },
            /**
             * Set the center for label dodge. If undefined, dodge right by default.
             * @category set
             * @param center - the center coordinate
             * @returns
             * ```typescript
             * pen.set.labelCenter([0,0]) // set center to be [0,0]
             * ```
             */
            labelCenter(center) {
                if (center) {
                    this.LABEL_CENTER = center;
                }
                else {
                    this.LABEL_CENTER = undefined;
                }
            },
            /**
             * Reset all pen settings.
             * @category set
             * @returns
             * ```typescript
             * pen.reset() // reset
             * ```
             */
            reset() {
                this.weight();
                this.strokeColor();
                this.fillColor();
                this.dash();
                this.textAlign();
                this.textBaseline();
                this._pen.ctx.font = 'normal 10px Times New Roman';
                this.textSize();
                this.textItalic();
                this.labelCenter();
            }
        };
        /**
         * Drawing graph of functions.
         * @category graph
         */
        this.graph = {
            /**
             * @ignore
             */
            _pen: this,
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
            circle(center, radius) {
                const [h, k] = center;
                this._pen.plot(t => [h + radius * cos(t), k + radius * sin(t)], 0, 360);
            },
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
            arc(center, radius, qStart, qEnd) {
                const [h, k] = center;
                this._pen.plot(t => [h + radius * cos(t), k + radius * sin(t)], qStart, qEnd);
            },
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
            sector(center, radius, qStart, qEnd) {
                this.arc(center, radius, qStart, qEnd);
                let A = TranslatePoint(center, qStart, radius);
                let B = TranslatePoint(center, qEnd, radius);
                this._pen.line(A, center);
                this._pen.line(B, center);
            },
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
            segment(center, radius, qStart, qEnd) {
                this.arc(center, radius, qStart, qEnd);
                let A = TranslatePoint(center, qStart, radius);
                let B = TranslatePoint(center, qEnd, radius);
                this._pen.line(A, B);
            },
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
            quadratic(a, b, c) {
                this._pen.plot(x => a * x * x + b * x + c);
            },
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
            line(m, c) {
                const [xmin, xmax] = this._pen.frame.xRange();
                const y = (x) => m * x + c;
                this._pen.line([xmin, y(xmin)], [xmax, y(xmax)]);
            },
            /**
             * Draw a horizontal line y=constant.
             * @category graph
             * @param y - The constant value of y.
             * @returns
             * ```typescript
             * pen.graph.horizontal(2) // draw the line y=2
             * ```
             */
            horizontal(y) {
                const [xmin, xmax] = this._pen.frame.xRange();
                this._pen.line([xmin, y], [xmax, y]);
            },
            /**
             * Draw a vertical line x=constant.
             * @category graph
             * @param x - The constant value of x.
             * @returns
             * ```typescript
             * pen.graph.vertical(2) // draw the line x=2
             * ```
             */
            vertical(x) {
                const [ymin, ymax] = this._pen.frame.yRange();
                this._pen.line([x, ymin], [x, ymax]);
            },
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
            linear(a, b, c) {
                if (a === 0 && b !== 0)
                    this.horizontal(-c / b);
                if (b == 0 && a !== 0)
                    this.vertical(-c / a);
                if (a !== 0 && b !== 0)
                    this.line(-a / b, -c / b);
            }
        };
        /**
         * Fill a shape.
         * @category fill
         */
        this.fill = {
            /**
             * @ignore
             */
            _pen: this,
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
            circle(center, radius) {
                const [h, k] = center;
                let points = Trace(t => [h + radius * cos(t), k + radius * sin(t)], 0, 360);
                this._pen.polyfill(...points);
            },
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
            sector(center, radius, qStart, qEnd) {
                const [h, k] = center;
                let points = Trace(t => [h + radius * cos(t), k + radius * sin(t)], qStart, qEnd);
                this._pen.polyfill(center, ...points);
            },
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
            segment(center, radius, qStart, qEnd) {
                const [h, k] = center;
                let points = Trace(t => [h + radius * cos(t), k + radius * sin(t)], qStart, qEnd);
                this._pen.polyfill(...points);
            },
        };
        /**
         * Geometry Decorator.
         * @category decorator
         */
        this.decorate = {
            /**
             * @ignore
             */
            _pen: this,
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
            equalSide(startPoint, endPoint, tick = 1) {
                let length = 5;
                let space = 3;
                length = length * PEN_QUALITY;
                space = space * PEN_QUALITY;
                startPoint = this._pen.frame.toPix(startPoint);
                endPoint = this._pen.frame.toPix(endPoint);
                let [x, y] = [(startPoint[0] + endPoint[0]) / 2, (startPoint[1] + endPoint[1]) / 2];
                let dy = endPoint[1] - startPoint[1];
                let dx = endPoint[0] - startPoint[0];
                let angle = Math.atan2(dy, dx);
                let mark = (position) => {
                    this._pen.ctx.save();
                    this._pen.ctx.translate(x, y);
                    this._pen.ctx.rotate(angle);
                    this._pen.ctx.beginPath();
                    this._pen.ctx.moveTo(position, -length);
                    this._pen.ctx.lineTo(position, length);
                    this._pen.ctx.stroke();
                    this._pen.ctx.restore();
                };
                if (tick % 2 === 1) {
                    mark(0);
                    for (let i = 1; i <= (tick - 1) / 2; i++) {
                        mark(i * space);
                        mark(-i * space);
                    }
                }
                else {
                    for (let i = 1; i <= tick / 2; i++) {
                        mark((i - 0.5) * space);
                        mark(-(i - 0.5) * space);
                    }
                }
            },
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
            parallel(startPoint, endPoint, tick = 1) {
                let size = 4;
                let space = 6;
                size = size * PEN_QUALITY;
                space = space * PEN_QUALITY;
                startPoint = this._pen.frame.toPix(startPoint);
                endPoint = this._pen.frame.toPix(endPoint);
                let [x, y] = [(startPoint[0] + endPoint[0]) / 2, (startPoint[1] + endPoint[1]) / 2];
                let dy = endPoint[1] - startPoint[1];
                let dx = endPoint[0] - startPoint[0];
                let angle = Math.atan2(dy, dx);
                let mark = (position) => {
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
            anglePolar(A, O, B, arc = 1, radius = 15) {
                A = this._pen.frame.toPix(A);
                let OPixel = this._pen.frame.toPix(O);
                B = this._pen.frame.toPix(B);
                let a1 = Math.atan2(-(A[1] - OPixel[1]), A[0] - OPixel[0]) / Math.PI * 180;
                let a2 = Math.atan2(-(B[1] - OPixel[1]), B[0] - OPixel[0]) / Math.PI * 180;
                let space = 3;
                let outset = arc > 1 ? space / 2 : 0;
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
             * @returns
             * ```typescript
             * pen.decorate.angle([1,0],[0,0],[3,2],2)
             * // decorate an angle AOB with double-arc.
             * ```
             */
            angle(A, O, B, arc = 1, radius = 15) {
                if (IsReflex(A, O, B))
                    [A, B] = [B, A];
                this.anglePolar(A, O, B, arc, radius);
            },
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
            angleReflex(A, O, B, arc = 1, radius = 15) {
                if (!IsReflex(A, O, B))
                    [A, B] = [B, A];
                this.anglePolar(A, O, B, arc, radius);
            },
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
            rightAngle(A, O, B = RotatePoint(A, O, 90), size = 12) {
                size = size * PEN_QUALITY;
                A = this._pen.frame.toPix(A);
                O = this._pen.frame.toPix(O);
                B = this._pen.frame.toPix(B);
                let angleA = Math.atan2(A[1] - O[1], A[0] - O[0]);
                let angleB = Math.atan2(B[1] - O[1], B[0] - O[0]);
                let P = [O[0] + size * Math.cos(angleA), O[1] + size * Math.sin(angleA)];
                let Q = [O[0] + size * Math.cos(angleB), O[1] + size * Math.sin(angleB)];
                let R = [O[0] + size * Math.cos(angleA) + size * Math.cos(angleB), O[1] + size * Math.sin(angleA) + size * Math.sin(angleB)];
                let draw = (A, B) => {
                    this._pen.ctx.beginPath();
                    this._pen.ctx.moveTo(A[0], A[1]);
                    this._pen.ctx.lineTo(B[0], B[1]);
                    this._pen.ctx.stroke();
                };
                draw(P, R);
                draw(Q, R);
            }
        };
        /**
         * @category text
         */
        this.label = {
            /**
             * @ignore
             */
            _pen: this,
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
            point(position, text = '', dodgeDirection, offsetPixel = 15) {
                let [x, y] = this._pen.frame.toPix(position);
                offsetPixel = offsetPixel * PEN_QUALITY;
                if (dodgeDirection === undefined) {
                    let center = this._pen.set.LABEL_CENTER;
                    if (center !== undefined && AreDistinctPoint(center, position)) {
                        dodgeDirection = Inclination(center, position);
                    }
                    else {
                        dodgeDirection = 0;
                    }
                }
                x += offsetPixel * Math.cos(dodgeDirection / 180 * Math.PI);
                y -= offsetPixel * Math.sin(dodgeDirection / 180 * Math.PI);
                this._pen.ctx.save();
                if (!isNaN(Number(text)))
                    this._pen.set.textItalic(false);
                if (text.length === 1 && (text.toLowerCase() !== text.toUpperCase()))
                    this._pen.set.textItalic(true);
                this._pen.ctx.fillText(text, x, y);
                this._pen.ctx.restore();
            },
            /**
             * Add a label to points, using index as text.
             * @category text
             * @param positions - {label:position}.
             * @returns
             * ```typescript
             * pen.label.points({A,B}) // label point A as 'A', point B as 'B'
             * ```
             */
            points(positions) {
                for (let k in positions) {
                    this.point(positions[k], k);
                }
            },
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
            anglePolar(anglePoints, text, dodgeDirection = 0, offsetPixel = -1) {
                let [A, O, B] = anglePoints;
                let APixel = this._pen.frame.toPix(A);
                let OPixel = this._pen.frame.toPix(O);
                let BPixel = this._pen.frame.toPix(B);
                let a1 = Math.atan2(-(APixel[1] - OPixel[1]), APixel[0] - OPixel[0]) / Math.PI * 180;
                let a2 = Math.atan2(-(BPixel[1] - OPixel[1]), BPixel[0] - OPixel[0]) / Math.PI * 180;
                if (a2 < a1)
                    a2 = a2 + 360;
                if (offsetPixel < 0)
                    offsetPixel = text.length <= 2 ? 25 : 30;
                this.point(O, text, (a1 + a2) / 2 + dodgeDirection, offsetPixel);
            },
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
            angle(anglePoints, text, dodgeDirection = 0, offsetPixel = -1) {
                if (IsReflex(...anglePoints)) {
                    let [A, O, B] = anglePoints;
                    anglePoints = [B, O, A];
                }
                this.anglePolar(anglePoints, text, dodgeDirection, offsetPixel);
            },
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
            angleReflex(anglePoints, text, dodgeDirection = 0, offsetPixel = -1) {
                if (!IsReflex(...anglePoints)) {
                    let [A, O, B] = anglePoints;
                    anglePoints = [B, O, A];
                }
                this.anglePolar(anglePoints, text, dodgeDirection, offsetPixel);
            },
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
            line(linePoints, text, dodgeDirection = 0, offsetPixel = -1) {
                let [A, B] = linePoints;
                let M = MidPoint(A, B);
                let APixel = this._pen.frame.toPix(A);
                let BPixel = this._pen.frame.toPix(B);
                let q = Math.atan2(-(BPixel[1] - APixel[1]), BPixel[0] - APixel[0]) / Math.PI * 180 - 90;
                if (offsetPixel < 0)
                    offsetPixel = text.length <= 2 ? 15 : text.length <= 4 ? 20 : 25;
                this.point(M, text, q + dodgeDirection, offsetPixel);
            },
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
            coordinates(point, dodgeDirection = 90, offsetPixel = 15) {
                let text = '(' + Fix(point[0], 1) + ', ' + Fix(point[1], 1) + ')';
                this.point(point, text, dodgeDirection, offsetPixel);
            }
        };
        /**
         * The axis.
         * @category axis
         */
        this.axis = {
            /**
             * @ignore
             */
            _pen: this,
            /**
             * Draw x-axis.
             * @category axis
             * @param label - The axis label.
             * @returns
             * ```typescript
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
             * @returns
             * ```typescript
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
             * @returns
             * ```typescript
             * pen.axis.xy('x','y') // draw both axis, label as 'x' and 'y'
             * ```
             */
            xy(xlabel = "x", ylabel = "y") {
                this.x(xlabel);
                this.y(ylabel);
            },
        };
        /**
         * The axis ticks.
         * @category axis
         */
        this.tick = {
            /**
             * @ignore
             */
            _pen: this,
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
                    }
                    ;
                }
            },
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
                    }
                    ;
                }
            },
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
            xy(interval = 1, mark = true) {
                this.x(interval, mark);
                this.y(interval, mark);
            }
        };
        /**
         * The axis gridlines.
         * @category axis
         */
        this.grid = {
            /**
             * @ignore
             */
            _pen: this,
            /**
             * Draw gridlines on the x-axis.
             * @category axisGrid
             * @param interval - The grid interval.
             * @returns
             * ```typescript
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
             * @returns
             * ```typescript
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
             * @returns
             * ```typescript
             * pen.grid.xy(2) // draw gridlines on both axis, at interval 2 units
             * ```
             */
            xy(interval = 1) {
                this.x(interval);
                this.y(interval);
            }
        };
        // create the canvas DOM element
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext("2d");
        this.frame = new Frame();
        // set the default size and range
        this.setup.size();
        this.setup.range([-5, 5], [-5, 5]);
        this.set.reset();
        this.imgStore = null;
    }
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
    plot(func, tStart = this.frame.xmin, tEnd = this.frame.xmax, dots = 1000) {
        let points = Trace(func, tStart, tEnd, dots).map(x => this.frame.toPix(x));
        // const tracer = (t: number) => {
        //     let result: number | Point
        //     try {
        //         result = func(t);
        //     } catch {
        //         return [NaN, NaN]
        //     }
        //     if (!Array.isArray(result)) result = [t, result];
        //     let [x, y] = this.frame.toPix(result);
        //     if (Math.abs(x) > 10000) x = Math.sign(x) * 10000;
        //     if (Math.abs(y) > 10000) y = Math.sign(y) * 10000;
        //     return [x, y];
        // };
        // const [xStart, yStart] = tracer(tStart);
        const [xStart, yStart] = points[0];
        // const step = (tEnd - tStart) / dots;
        this.ctx.beginPath();
        this.ctx.moveTo(xStart, yStart);
        let active = true;
        let outside = (x, y) => (x > this.frame.wPixel + 2000 ||
            y > this.frame.hPixel + 2000 ||
            x < -2000 ||
            y < -2000 ||
            Number.isNaN(x) ||
            Number.isNaN(y));
        for (let p of points) {
            let [x, y] = p;
            if (outside(x, y)) {
                if (active) {
                    this.ctx.stroke();
                    active = false;
                }
                continue;
            }
            if (!active) {
                active = true;
                this.ctx.beginPath();
                this.ctx.moveTo(x, y);
            }
            this.ctx.lineTo(x, y);
        }
        this.ctx.stroke();
    }
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
    point(position, label) {
        const [x, y] = this.frame.toPix(position);
        this.ctx.beginPath();
        this.ctx.arc(x, y, 2 * PEN_QUALITY, 0, 2 * Math.PI, false);
        this.ctx.fill();
        if (label !== undefined)
            this.label.point(position, label);
    }
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
    points(positions, label = true) {
        for (let k in positions) {
            this.point(positions[k]);
            if (label)
                this.label.point(positions[k], k);
        }
    }
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
    cutterH(position, label) {
        const [x, y] = position;
        const offset = this.frame.xOffset();
        this.line([x, y - offset], [x, y + offset]);
        if (label !== undefined)
            this.label.point(position, label);
    }
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
    cutterV(position, label) {
        const [x, y] = position;
        const offset = this.frame.yOffset();
        this.line([x - offset, y], [x + offset, y]);
        if (label !== undefined)
            this.label.point(position, label);
    }
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
    circle(center, radius, angles = [0, 360], fill = false) {
        const [x, y] = this.frame.toPix(center);
        this.ctx.beginPath();
        let [q1, q2] = angles;
        q1 = -q1 / 180 * Math.PI;
        q2 = -q2 / 180 * Math.PI;
        this.ctx.arc(x, y, radius * PEN_QUALITY, q1, q2, true);
        this.ctx.stroke();
        if (fill)
            this.ctx.fill();
    }
    /**
     * @ignore
     */
    _line(startPoint, endPoint, { arrow = false, dash = false }) {
        this.ctx.save();
        const [x0, y0] = this.frame.toPix(startPoint);
        const [x1, y1] = this.frame.toPix(endPoint);
        const dx = x1 - x0;
        const dy = y1 - y0;
        const angle = Math.atan2(dy, dx);
        const length = Math.sqrt(dx * dx + dy * dy);
        const aLength = this.ctx.lineWidth * 10;
        const aWidth = aLength / 2;
        //
        this.ctx.translate(x0, y0);
        this.ctx.rotate(angle);
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(length, 0);
        if (arrow) {
            this.ctx.moveTo(length - aLength, -aWidth);
            this.ctx.lineTo(length, 0);
            this.ctx.lineTo(length - aLength, aWidth);
        }
        if (dash) {
            this.ctx.save();
            this.set.dash(true);
            this.ctx.stroke();
            this.ctx.restore();
        }
        else {
            this.ctx.stroke();
        }
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.restore();
    }
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
    line(startPoint, endPoint, label) {
        this._line(startPoint, endPoint, {});
        if (label !== undefined)
            this.label.line([startPoint, endPoint], label);
    }
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
    dash(startPoint, endPoint, label) {
        this._line(startPoint, endPoint, { dash: true });
        if (label !== undefined)
            this.label.line([startPoint, endPoint], label);
    }
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
    arrow(startPoint, endPoint) {
        this._line(startPoint, endPoint, { arrow: true });
    }
    /**
     * @ignore
     */
    _polygon(points, { close = false, stroke = false, fill = false, shade = false }) {
        this.ctx.beginPath();
        let [xStart, yStart] = this.frame.toPix(points[0]);
        this.ctx.moveTo(xStart, yStart);
        for (let i = 1; i < points.length; i++) {
            let [x, y] = this.frame.toPix(points[i]);
            this.ctx.lineTo(x, y);
        }
        if (close)
            this.ctx.closePath();
        if (stroke)
            this.ctx.stroke();
        if (fill)
            this.ctx.fill();
        if (shade) {
            let alpha = this.ctx.globalAlpha;
            this.set.alpha(0.2);
            this.ctx.fill();
            this.set.alpha(alpha);
        }
    }
    /**
     * Draw a polyline given points.
     * @category draw
     * @param points - The coordinates [x,y] of all points.
     * @returns
     * ```typescript
     * pen.polyline([0,0],[5,2],[3,4]) // draw a polyline with vertices [0,0], [5,2] and [3,4]
     * ```
     */
    polyline(...points) {
        this._polygon(points, { stroke: true });
    }
    /**
     * Draw a polygon given points.
     * @category draw
     * @param points - The coordinates [x,y] of all points.
     * @returns
     * ```typescript
     * pen.polygon([0,0],[5,2],[3,4]) // draw a triangle with vertices [0,0], [5,2] and [3,4]
     * ```
     */
    polygon(...points) {
        this._polygon(points, { close: true, stroke: true });
    }
    /**
     * Fill a polygon given points.
     * @category draw
     * @param points - The coordinates [x,y] of all points.
     * @returns
     * ```typescript
     * pen.polyfill([0,0],[5,2],[3,4]) // fill a triangle with vertices [0,0], [5,2] and [3,4]
     * ```
     */
    polyfill(...points) {
        this._polygon(points, { close: true, fill: true });
    }
    /**
     * Shade a polygon given points.
     * @category draw
     * @param points - The coordinates [x,y] of all points.
     * @returns
     * ```typescript
     * pen.polyshade([0,0],[5,2],[3,4]) // shade a triangle with vertices [0,0], [5,2] and [3,4]
     * ```
     */
    polyshade(...points) {
        this._polygon(points, { close: true, shade: true });
    }
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
    angle(A, O, B, label, arc = 1, radius = 15) {
        this.decorate.angle(A, O, B, arc, radius);
        if (label !== undefined)
            this.label.angle([A, O, B], label);
    }
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
    anglePolar(A, O, B, label, arc = 1, radius = 15) {
        this.decorate.anglePolar(A, O, B, arc, radius);
        if (label !== undefined)
            this.label.anglePolar([A, O, B], label);
    }
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
    angleReflex(A, O, B, label, arc = 1, radius = 15) {
        this.decorate.angleReflex(A, O, B, arc, radius);
        if (label !== undefined)
            this.label.angleReflex([A, O, B], label);
    }
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
    write(position, text) {
        const [x, y] = this.frame.toPix(position);
        this.ctx.fillText(text, x, y);
    }
    /**
     * Write text vertically
     * @category text
     * @param position - The coordinates [x,y] to position the text.
     * @param text - The string to write.
     * @returns
     * ```typescript
     * pen.writeVertical([1,2],'abc') // write 'abc' at [1,2] vertically
     * ```
     */
    writeV(position, text) {
        const [x, y] = this.frame.toPix(position);
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(-Math.PI / 2);
        this.ctx.fillText(text, 0, 0);
        this.ctx.restore();
    }
    /**
     * @ignore
     */
    autoCrop() {
        trimCanvas(this.canvas);
    }
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
    export(html, placeholder) {
        const src = 'src="' + this.canvas.toDataURL() + '"';
        const width = ' width="' + Math.floor(this.canvas.width / PEN_QUALITY) + '"';
        const height = ' height="' + Math.floor(this.canvas.height / PEN_QUALITY) + '"';
        return html.replace('src="' + placeholder + '"', src + width + height);
    }
    ;
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
    exportTrim(html, placeholder) {
        let clone = cloneCanvas(this.canvas);
        trimCanvas(clone);
        const src = 'src="' + clone.toDataURL() + '"';
        const w = Math.floor(clone.width / PEN_QUALITY);
        const h = Math.floor(clone.height / PEN_QUALITY);
        const width = ' width="' + w + '"';
        const height = ' height="' + h + '"';
        return html.replace('src="' + placeholder + '"', src + width + height);
    }
    ;
    /**
     * Clear the canvas.
     * @category export
     * @returns
     * ```typescript
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
     * ```typescript
     * pen.saveImg() // save the current canvas image
     * ```
     */
    saveImg() {
        this.imgStore = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    }
    /**
     * Restored the previously saved img by saveImg.
     * @category export
     * @returns
     * ```typescript
     * pen.restoreImg() // restore the previously saved img
     * ```
     */
    restoreImg() {
        if (this.imgStore !== null)
            this.ctx.putImageData(this.imgStore, 0, 0);
    }
}
;
/**
 * @ignore
 */
var Pen = PenCls;
globalThis.Pen = Pen;
function cloneCanvas(oldCanvas) {
    //create a new canvas
    let newCanvas = document.createElement('canvas');
    let context = newCanvas.getContext('2d');
    //set dimensions
    newCanvas.width = oldCanvas.width;
    newCanvas.height = oldCanvas.height;
    //apply the old canvas to the new one
    context.drawImage(oldCanvas, 0, 0);
    //return the new canvas
    return newCanvas;
}
function trimCanvas(canvas) {
    function rowBlank(imageData, width, y) {
        for (var x = 0; x < width; ++x) {
            if (imageData.data[y * width * 4 + x * 4 + 3] !== 0)
                return false;
        }
        return true;
    }
    function columnBlank(imageData, width, x, top, bottom) {
        for (var y = top; y < bottom; ++y) {
            if (imageData.data[y * width * 4 + x * 4 + 3] !== 0)
                return false;
        }
        return true;
    }
    var ctx = canvas.getContext("2d");
    var width = canvas.width;
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var top = 0, bottom = imageData.height, left = 0, right = imageData.width;
    while (top < bottom && rowBlank(imageData, width, top))
        ++top;
    while (bottom - 1 > top && rowBlank(imageData, width, bottom - 1))
        --bottom;
    while (left < right && columnBlank(imageData, width, left, top, bottom))
        ++left;
    while (right - 1 > left && columnBlank(imageData, width, right - 1, top, bottom))
        --right;
    var trimmed = ctx.getImageData(left, top, right - left, bottom - top);
    canvas.width = trimmed.width;
    canvas.height = trimmed.height;
    ctx.putImageData(trimmed, 0, 0);
}