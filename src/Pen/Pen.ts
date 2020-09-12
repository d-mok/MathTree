

/**
 * Pen.
 * @namespace Pen
 */


class Pen {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    frame: Frame


    constructor() {
        // create the canvas DOM element
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext("2d")!;
        this.frame = new Frame();
        // set the default size and range
        this.setup.size();
        this.setup.range([-5, 5], [-5, 5]);
        this.set.reset();
    }

    /**
     * Setup of canvas.
     * @namespace setup
     * @memberof Pen
     */
    setup = {
        pen: this,
        /**
         * Set the size of the canvas.
         * @memberof Pen.setup
         * @param {number} [scale=1] - The scale of the width.
         * @param {number} [ratio=1] - The height-to-width ratio.
         * @example
         * pen.setup.size(0.5,2) // half the standard width, with height-to-width = 2:1
         */
        size(scale = 1, ratio = 1) {
            // REM_PIXEL is the default font size of the browser, usually 16px
            const REM_PIXEL = parseFloat(getComputedStyle(document.documentElement).fontSize);
            const wPixel = scale * 25 * REM_PIXEL;
            const hPixel = wPixel * ratio;
            // create a canvas of higher resolution (PEN_QUALITY)
            this.pen.canvas.width = wPixel * PEN_QUALITY;
            this.pen.canvas.height = hPixel * PEN_QUALITY;
            this.pen.frame.wPixel = wPixel * PEN_QUALITY;
            this.pen.frame.hPixel = hPixel * PEN_QUALITY;
            this.pen.set.reset();
        },
        /**
         * Set the coordinate range of the canvas.
         * @memberof Pen.setup
         * @param {number[]} xRange - The range [xmin,xmax].
         * @param {number[]} yRange - The range [ymin,ymax].
         * @example
         * pen.setup.range([-5,5],[-2,4]) // define range -5<x<5 and -2<y<4
         */
        range(xRange: number[], yRange: number[]) {
            [this.pen.frame.xmin, this.pen.frame.xmax] = xRange;
            [this.pen.frame.ymin, this.pen.frame.ymax] = yRange;
        },
        /**
         * Set the coordinate range by specifying in-view points.
         * @memberof Pen.setup
         * @param {number[][]} points - An array of in-view points [x,y].
         * @param {number} [border=0.3] - The percentage to extend the border.
         * @param {boolean} [origin=true] - Must contain the origin [0,0]
         * @example
         * pen.setup.inView([[1,2],[3,4]]) // the points [0,0], [1,2] and [3,4] must be in-view
         */
        inView(points: number[][], border = 0.3, origin = true) {
            if (origin) points.push([0, 0]);
            let xmin = points[0][0];
            let xmax = points[0][0];
            let ymin = points[0][1];
            let ymax = points[0][1];
            for (let i = 0; i < points.length; i++) {
                let x = points[i][0];
                let y = points[i][1];
                if (x < xmin) xmin = x;
                if (x > xmax) xmax = x;
                if (y < ymin) ymin = y;
                if (y > ymax) ymax = y;
            }
            xmin -= (xmax - xmin) * border;
            xmax += (xmax - xmin) * border;
            ymin -= (ymax - ymin) * border;
            ymax += (ymax - ymin) * border;
            this.range([xmin, xmax], [ymin, ymax]);
        }
    };
    /**
     * Settings.
     * @namespace set
     * @memberof Pen
     */
    set = {
        pen: this,
        /**
         * Set the weight of the pen (line width).
         * @memberof Pen.set
         * @param {number} [weight=1] - The line width.
         * @example
         * pen.set.weight(2) // set a bold line
         */
        weight(weight = 1) {
            this.pen.ctx.lineWidth = weight * PEN_QUALITY;
        },
        /**
         * Set the color of the pen.
         * @memberof Pen.set
         * @param {string} [color="black"] - The line color.
         * @example
         * pen.set.strokeColor('grey') // set grey line
         */
        strokeColor(color = "black") {
            this.pen.ctx.strokeStyle = color;
        },
        /**
         * Set the color of filling.
         * @memberof Pen.set
         * @param {string} [color="black"] - The filling color.
         * @example
         * pen.set.fillColor('grey') // set grey filling
         */
        fillColor(color = "black") {
            this.pen.ctx.fillStyle = color;
        },
        /**
         * Set the transparency.
         * @memberof Pen.set
         * @param {number} [alpha=1] - The alpha value, from 0 to 1. 0 is completely transparent.
         * @example
         * pen.set.alpha(0.9) // set slightly transparent
         */
        alpha(alpha = 1) {
            this.pen.ctx.globalAlpha = alpha;
        },
        /**
         * Set the dash pattern of line.
         * @memberof Pen.set
         * @param {Array} [segments=[]] - The dash pattern.
         * @example
         * pen.set.dash([10,5]) // set dash line
         */
        dash(segments: number[] = []) {
            this.pen.ctx.setLineDash(segments.map(x => x * PEN_QUALITY));
        },
        /**
         * Set the horizontal alignment of text.
         * @memberof Pen.set
         * @param {string} [align="center"] - The alignment {'left','right','center'}.
         * @example
         * pen.set.textAlign('left') // set align to left
         */
        textAlign(align: CanvasTextAlign = "center") {
            this.pen.ctx.textAlign = align;
        },
        /**
         * Set the vertical alignment of text.
         * @memberof Pen.set
         * @param {string} [baseline="middle"] - The alignment {'top','bottom','middle'}.
         * @example
         * pen.set.textBaseline('bottom') // set align to bottom
         */
        textBaseline(baseline: CanvasTextBaseline = "middle") {
            this.pen.ctx.textBaseline = baseline;
        },
        /**
         * Set the size of text.
         * @memberof Pen.set
         * @param {number} [size=1] - The text size.
         * @example
         * pen.set.textSize(2) // set larger text
         */
        textSize(size = 1) {
            const REM_PIXEL = parseFloat(getComputedStyle(document.documentElement).fontSize);
            size = Math.round(size * REM_PIXEL * PEN_QUALITY);
            this.pen.ctx.font = this.pen.ctx.font.replace(/\d+px/g, size + 'px');
        },
        /**
         * Set the style of text.
         * @memberof Pen.set
         * @deprecated use textItalic() instead
         * @ignore
         * @param {string} [style='normal'] - The text style {'normal','italic'}.
         * @example
         * pen.set.textStyle('italic') // set italic text
         */
        textStyle(style = "normal") {
            if (style == 'normal') {
                this.pen.ctx.font = this.pen.ctx.font.replace('italic ', '');
            }
            if (style == 'italic') {
                if (!this.pen.ctx.font.includes('italic')) {
                    this.pen.ctx.font = 'italic ' + this.pen.ctx.font;
                }
            }
        },
        /**
         * Set italic style of text.
         * @memberof Pen.set
         * @param {boolean} [italic=false] - Italic or not.
         * @example
         * pen.set.textItalic(true) // set italic to true
         */
        textItalic(italic = false) {
            if (italic) {
                this.textStyle('italic');
            } else {
                this.textStyle();
            }
        },
        /**
         * Reset all pen settings.
         * @memberof Pen.set
         * @example
         * pen.reset() // reset
         */
        reset() {
            this.weight();
            this.strokeColor();
            this.fillColor();
            this.dash();
            this.textAlign();
            this.textBaseline();
            this.pen.ctx.font = 'normal 10px Times New Roman';
            this.textSize();
            this.textItalic();
        }
    };

    /**
     * Drawing functions.
     * @namespace draw
     * @memberof Pen
     */

    /**
     * Plot an explicit or parametric function.
     * @memberof Pen.draw
     * @param {function} func - The function to plot, either x=>f(x) or t=>[x(t),y(t)].
     * @param {number} [tStart=xmin] - Start value of t, default to xmin.
     * @param {number} [tEnd=xmax] - End value of t, default to xmax.
     * @param {number} [dots=1000] - Number of dots to plot. More dots give finer graph.
     * @example
     * pen.plot(x=>x**2) // plot y=x^2
     * pen.plot(t=>[cos(t),sin(t)],0,360) // plot a circle centered (0,0) with r=1
     */
    plot(func: (t: number) => number | number[], tStart = this.frame.xmin, tEnd = this.frame.xmax, dots = 1000) {
        const tracer = (t: number) => {
            let result = func(t);
            if (!Array.isArray(result)) result = [t, result];
            let [x, y] = this.frame.toPix(result);
            if (Math.abs(x) > 10000) x = Math.sign(x) * 10000;
            if (Math.abs(y) > 10000) y = Math.sign(y) * 10000;
            return [x, y];
        };
        const [xStart, yStart] = tracer(tStart);
        const step = (tEnd - tStart) / dots;
        this.ctx.beginPath();
        this.ctx.moveTo(xStart, yStart);

        let active = true;
        let outside = (x: number, y: number) => (x > this.frame.wPixel + 2000 || y > this.frame.hPixel + 2000 || x < -2000 || y < -2000);

        for (let t = tStart; t <= tEnd; t += step) {
            let [x, y] = tracer(t);
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
     * @memberof Pen.draw
     * @param {number[]} position - The coordinates [x,y] to draw.
     * @example
     * pen.point([1,2]) // draw a point at [1,2]
     */
    point(position: number[]) {
        const [x, y] = this.frame.toPix(position);
        this.ctx.beginPath();
        this.ctx.arc(x, y, 3 * PEN_QUALITY, 0, 2 * Math.PI, false);
        this.ctx.fill();
    }


    /**
     * Draw a horizontal cutter.
     * @memberof Pen.draw
     * @param {number[]} position - The coordinates [x,y] to draw.
     * @example
     * pen.cutterH([1,2]) // draw a horizontal cutter at [1,2]
     */
    cutterH(position: number[]) {
        const [x, y] = position;
        const offset = this.frame.xOffset();
        this.line([x, y - offset], [x, y + offset]);
    }

    /**
     * Draw a vertical cutter.
     * @memberof Pen.draw
     * @param {number[]} position - The coordinates [x,y] to draw.
     * @example
     * pen.cutterV([1,2]) // draw a vertical cutter at [1,2]
     */
    cutterV(position: number[]) {
        const [x, y] = position;
        const offset = this.frame.yOffset();
        this.line([x - offset, y], [x + offset, y]);
    }


    /**
     * Draw a circle or arc.
     * @memberof Pen.draw
     * @param {number[]} center - The coordinates [x,y] of center.
     * @param {number} radius - The radius in pixel.
     * @param {number[]} [angles=[0,360]] - The polar angle range [q1,q2].
     * @param {boolean} [fill=false] - Whether to fill the inside.
     * @example
     * pen.circle([1,2], 10) // draw a circle centered at [1,2] with r=10px , 
     * pen.circle([1,2], 10, [0,180]) // draw a upper semi-circle
     */
    circle(center: number[], radius: number, angles = [0, 360], fill = false) {
        const [x, y] = this.frame.toPix(center);
        this.ctx.beginPath();
        let [q1, q2] = angles;
        q1 = -q1 / 180 * Math.PI;
        q2 = -q2 / 180 * Math.PI;
        this.ctx.arc(x, y, radius * PEN_QUALITY, q1, q2, true);
        this.ctx.stroke();
        if (fill) this.ctx.fill();
    }


    /**
     * Draw a line between two points.
     * @memberof Pen.draw
     * @param {number[]} startPoint - The coordinates [x,y] of the start-point.
     * @param {number[]} endPoint - The coordinates [x,y] of the end-point.
     * @param {boolean} [arrow=false] - whether to draw an arrow at the end.
     * @example
     * pen.line([1,2],[3,4]) // draw a line from [1,2] to [3,4]
     * pen.line([1,2],[3,4],true) //  draw a line from [1,2] to [3,4] with arrow at [3,4]
     */
    line(startPoint: number[], endPoint: number[], arrow = false) {
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
        this.ctx.stroke();
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.restore();
    }

    /**
     * Draw a polygon given vertex points.
     * @memberof Pen.draw
     * @param {number[][]} points - The coordinates [x,y] of all vetices.
     * @param {boolean} [fill=false] - whether to fill the interior.
     * @example
     * pen.polygon([[0,0],[5,2],[3,4]]) // draw a triangle with vertices [0,0], [5,2] and [3,4]
     */
    polygon(points: number[][], fill = false) {
        this.ctx.beginPath();
        let [xStart, yStart] = this.frame.toPix(points[0]);
        this.ctx.moveTo(xStart, yStart);
        for (let i = 1; i < points.length; i++) {
            let [x, y] = this.frame.toPix(points[i]);
            this.ctx.lineTo(x, y);
        }
        this.ctx.closePath();
        this.ctx.stroke();
        if (fill) this.ctx.fill();
    }

    /**
     * Drawing straight line.
     * @namespace straight
     * @memberof Pen
     */

    straight = {
        pen: this,
        /**
         * Draw a line y=mx+c.
         * @memberof Pen.straight
         * @param {number} m - The slope.
         * @param {number} c - The y-intercept.
         * @example
         * pen.straight.line(2,1) // draw the line y=2x+1
         */
        line(m: number, c: number) {
            const [xmin, xmax] = this.pen.frame.xRange();
            const y = (x: number) => m * x + c;
            this.pen.line([xmin, y(xmin)], [xmax, y(xmax)]);
        },
        /**
         * Draw a horizontal line y=constant.
         * @memberof Pen.straight
         * @param {number} y - The constant value of y.
         * @example
         * pen.straight.horizontal(2) // draw the line y=2
         */
        horizontal(y: number) {
            const [xmin, xmax] = this.pen.frame.xRange();
            this.pen.line([xmin, y], [xmax, y]);
        },
        /**
         * Draw a vertical line x=constant.
         * @memberof Pen.straight
         * @param {number} x - The constant value of x.
         * @example
         * pen.straight.vertical(2) // draw the line x=2
         */
        vertical(x: number) {
            const [ymin, ymax] = this.pen.frame.yRange();
            this.pen.line([x, ymin], [x, ymax]);
        }
    };









    /**
     * Geometry Decorator.
     * @namespace decorator
     * @memberof Pen
     */

    decorate = {
        pen: this,
        /**
         * Decorate equal side lengths.
         * @memberof Pen.decorator
         * @param {number[]} startPoint - The starting point [x,y].
         * @param {number[]} endPoint - The ending point [x,y].
         * @param {number} [tick=1] - The number of ticks.
         * @param {number} [length=5] - The one-sided length of a tick, in pixel.
         * @param {number} [space=3] - The space between ticks, if tick > 1, in pixel.
         * @example
         * pen.decorate.equalSide([1,0],[3,2],2) // decorate a double-tick at the mid-pt of [1,0] and [3,2]
         */
        equalSide(startPoint: number[], endPoint: number[], tick = 1, length = 5, space = 3) {
            length = length * PEN_QUALITY;
            space = space * PEN_QUALITY;
            startPoint = this.pen.frame.toPix(startPoint);
            endPoint = this.pen.frame.toPix(endPoint);
            let [x, y] = [(startPoint[0] + endPoint[0]) / 2, (startPoint[1] + endPoint[1]) / 2];
            let dy = endPoint[1] - startPoint[1];
            let dx = endPoint[0] - startPoint[0];
            let angle = Math.atan2(dy, dx);

            let mark = (position: number) => {
                this.pen.ctx.save();
                this.pen.ctx.translate(x, y);
                this.pen.ctx.rotate(angle);
                this.pen.ctx.beginPath();
                this.pen.ctx.moveTo(position, -length);
                this.pen.ctx.lineTo(position, length);
                this.pen.ctx.stroke();
                this.pen.ctx.restore();
            };
            if (tick % 2 === 1) {
                mark(0);
                for (let i = 1; i <= (tick - 1) / 2; i++) {
                    mark(i * space);
                    mark(-i * space);
                }
            } else {
                for (let i = 1; i <= tick / 2; i++) {
                    mark((i - 0.5) * space);
                    mark(-(i - 0.5) * space);
                }
            }
        },

        /**
         * Decorate parallel side.
         * @memberof Pen.decorator
         * @param {number[]} startPoint - The starting point [x,y].
         * @param {number[]} endPoint - The ending point [x,y].
         * @param {number} [tick=1] - The number of ticks.
         * @param {number} [size=4] - The size of a tick, in pixel.
         * @param {number} [space=6] - The space between ticks, if tick > 1, in pixel.
         * @example
         * pen.decorate.parallel([1,0],[3,2],2) // decorate a double-tick parallel mark at the mid-pt of [1,0] and [3,2]
         */
        parallel(startPoint: number[], endPoint: number[], tick = 1, size = 4, space = 6) {
            size = size * PEN_QUALITY;
            space = space * PEN_QUALITY;
            startPoint = this.pen.frame.toPix(startPoint);
            endPoint = this.pen.frame.toPix(endPoint);
            let [x, y] = [(startPoint[0] + endPoint[0]) / 2, (startPoint[1] + endPoint[1]) / 2];
            let dy = endPoint[1] - startPoint[1];
            let dx = endPoint[0] - startPoint[0];
            let angle = Math.atan2(dy, dx);

            let mark = (position: number) => {
                this.pen.ctx.save();
                this.pen.ctx.translate(x, y);
                this.pen.ctx.rotate(angle);
                this.pen.ctx.beginPath();
                this.pen.ctx.moveTo(position, 0);
                this.pen.ctx.lineTo(position - size * 2, -size);
                this.pen.ctx.moveTo(position, 0);
                this.pen.ctx.lineTo(position - size * 2, size);
                this.pen.ctx.stroke();
                this.pen.ctx.restore();
            };
            for (let i = 0; i < tick; i++) {
                mark(i * space);
            }
        },

        /**
         * Decorate an angle AOB, always in anti-clockwise.
         * @memberof Pen.decorator
         * @param {number[]} A - The starting point [x,y].
         * @param {number[]} O - The vertex point [x,y].
         * @param {number[]} B - The ending point [x,y].
         * @param {number} [arc=1] - The number of arcs.
         * @param {number} [radius=5] - The radius of the angle arc, in pixel.
         * @param {number} [space=1] - The space between arcs, if arc > 1, in pixel.
         * @example
         * pen.decorate.angle([1,0],[0,0],[3,2],2) // decorate an angle AOB with double-arc in anti-clockwise.
         */
        angle(A: number[], O: number[], B: number[], arc = 1, radius = 15, space = 3) {
            A = this.pen.frame.toPix(A);
            let OPixel = this.pen.frame.toPix(O);
            B = this.pen.frame.toPix(B);
            let a1 = Math.atan2(-(A[1] - OPixel[1]), A[0] - OPixel[0]) / Math.PI * 180;
            let a2 = Math.atan2(-(B[1] - OPixel[1]), B[0] - OPixel[0]) / Math.PI * 180;
            for (let i = 0; i < arc; i++) {
                this.pen.circle(O, radius + i * space, [a1, a2]);
            }
        },

        /**
         * Decorate a right-angle AOB.
         * @memberof Pen.decorator
         * @param {number[]} A - The starting point [x,y].
         * @param {number[]} O - The vertex point [x,y].
         * @param {number[]} B - The ending point [x,y]. Interchangeable with A.
         * @param {number} [size=15] - The size of the mark, in pixel.
         * @example
         * pen.decorate.rightAngle([1,0],[0,0],[3,2]) // decorate an right-angle AOB
         */
        rightAngle(A: number[], O: number[], B: number[], size = 15) {
            size = size * PEN_QUALITY;
            A = this.pen.frame.toPix(A);
            O = this.pen.frame.toPix(O);
            B = this.pen.frame.toPix(B);
            let angleA = Math.atan2(A[1] - O[1], A[0] - O[0]);
            let angleB = Math.atan2(B[1] - O[1], B[0] - O[0]);

            let P = [O[0] + size * Math.cos(angleA), O[1] + size * Math.sin(angleA)];
            let Q = [O[0] + size * Math.cos(angleB), O[1] + size * Math.sin(angleB)];
            let R = [O[0] + size * Math.cos(angleA) + size * Math.cos(angleB), O[1] + size * Math.sin(angleA) + size * Math.sin(angleB)];

            let draw = (A: number[], B: number[]) => {
                this.pen.ctx.beginPath();
                this.pen.ctx.moveTo(A[0], A[1]);
                this.pen.ctx.lineTo(B[0], B[1]);
                this.pen.ctx.stroke();
            };
            draw(P, R);
            draw(Q, R);
        }
    };



    /**
     * Write text
     * @namespace text
     * @memberof Pen
     */

    /**
     * Write text.
     * @memberof Pen.text
     * @param {number[]} position - The coordinates [x,y] to position the text.
     * @param {string} text - The string to write.
     * @example
     * pen.write([1,2],'abc') // write 'abc' at [1,2]
     */
    write(position: number[], text: string) {
        const [x, y] = this.frame.toPix(position);
        this.ctx.fillText(text, x, y);
    }

    /**
     * Add a label to a point.
     * @memberof Pen.text
     * @param {number[]} position - The coordinates [x,y] of the point to label.
     * @param {string} text - The string to write.
     * @param {number} [dodgeDirection=0] - The direction to offset, given as a polar angle.
     * @param {number} [offsetPixel=15] - The pixel distance to offset from the position.
     * @example
     * pen.label([1,2],'A',180) // label the point [1,2] as 'A', place the label on the left (180 degree)
     */
    label(position: number[], text: string, dodgeDirection = 0, offsetPixel = 15) {
        let [x, y] = this.frame.toPix(position);
        offsetPixel = offsetPixel * PEN_QUALITY;
        x += offsetPixel * Math.cos(dodgeDirection / 180 * Math.PI);
        y -= offsetPixel * Math.sin(dodgeDirection / 180 * Math.PI);
        this.ctx.fillText(text, x, y);
    }

    /**
     * Add a label to an angle AOB.
     * @memberof Pen.text
     * @param {number[][]} anglePoints - An array [A,O,B] for the coordinates of A,O,B.
     * @param {string} text - The string to write.
     * @param {number} [dodgeDirection=0] - The direction to offset, given as a polar angle,relative to mid-ray of angle AOB.
     * @param {number} [offsetPixel=25] - The pixel distance to offset from the position.
     * @example
     * pen.labelAngle([[1,2],[0,0],[-2,1]],'x') // label the angle as 'x'
     */
    labelAngle(anglePoints: number[][], text: string, dodgeDirection = 0, offsetPixel = 25) {
        let [A, O, B] = anglePoints;
        let APixel = this.frame.toPix(A);
        let OPixel = this.frame.toPix(O);
        let BPixel = this.frame.toPix(B);
        let a1 = Math.atan2(-(APixel[1] - OPixel[1]), APixel[0] - OPixel[0]) / Math.PI * 180;
        let a2 = Math.atan2(-(BPixel[1] - OPixel[1]), BPixel[0] - OPixel[0]) / Math.PI * 180;
        this.label(O, text, (a1 + a2) / 2 + dodgeDirection, offsetPixel);
    }

    /**
     * Add a label to a line AB.
     * @memberof Pen.text
     * @param {number[][]} linePoints - An array [A,B] for the coordinates of AB.
     * @param {string} text - The string to write.
     * @param {number} [dodgeDirection=0] - The direction to offset, given as a polar angle,relative to the right normal of AB.
     * @param {number} [offsetPixel=25] - The pixel distance to offset from the position.
     * @example
     * pen.labelLine([[0,0],[2,4]],'L') // label the line as 'L'
     */
    labelLine(linePoints: number[][], text: string, dodgeDirection = 0, offsetPixel = 25) {
        let [A, B] = linePoints;
        let M = MidPoint(A, B);
        let APixel = this.frame.toPix(A);
        let BPixel = this.frame.toPix(B);
        let q = Math.atan2(-(BPixel[1] - APixel[1]), BPixel[0] - APixel[0]) / Math.PI * 180 - 90;
        this.label(M, text, q + dodgeDirection, offsetPixel);
    }

    /**
     * The axis.
     * @namespace axis
     * @memberof Pen
     */

    axis = {
        pen: this,
        getStyle(label: string): string {
            return label.length === 1 ? "italic" : "normal";
        },
        /**
         * Draw x-axis.
         * @memberof Pen.axis
         * @param {string} [label='x'] - The axis label.
         * @example
         * pen.axis.x('time') // draw the x-axis, label as 'time'
         */
        x(label = "x") {
            const [xmin, xmax] = this.pen.frame.xRange();
            const offset = 3 * this.pen.frame.xOffset();
            this.pen.line([xmin, 0], [xmax, 0], true);
            this.pen.ctx.save();
            this.pen.set.textStyle(this.getStyle(label));
            this.pen.set.textAlign("right");
            this.pen.set.textBaseline("middle");
            this.pen.write([xmax, offset], label);
            this.pen.ctx.restore();
        },
        /**
         * Draw y-axis.
         * @memberof Pen.axis
         * @param {string} [label='y'] - The axis label.
         * @example
         * pen.axis.y('height') // draw the y-axis, label as 'height'
         */
        y(label = "y") {
            const [ymin, ymax] = this.pen.frame.yRange();
            const offset = 3 * this.pen.frame.yOffset();
            this.pen.line([0, ymin], [0, ymax], true);
            this.pen.ctx.save();
            this.pen.set.textStyle(this.getStyle(label));
            this.pen.set.textAlign("left");
            this.pen.set.textBaseline("top");
            this.pen.write([offset, ymax], label);
            this.pen.ctx.restore();
        }
    };

    /**
     * The axis ticks.
     * @namespace axisTick
     * @memberof Pen
     */

    tick = {
        pen: this,
        /**
         * Draw ticks on the x-axis.
         * @memberof Pen.axisTick
         * @param {number} [interval=1] - The tick interval.
         * @param {boolean} [mark=true] - Whether to label number at ticks.
         * @example
         * pen.tick.x(2) // draw ticks on the x-axis, at interval 2 units
         */
        x(interval = 1, mark = true) {
            const offset = this.pen.frame.xOffset();
            for (let x of this.pen.frame.xTicks(interval)) {
                this.pen.line([x, -offset], [x, offset]);
                if (mark) {
                    this.pen.ctx.save();
                    this.pen.set.textStyle("normal");
                    this.pen.set.textAlign("center");
                    this.pen.set.textBaseline("middle");
                    this.pen.write([x, -3 * offset], x.toString());
                    this.pen.ctx.restore();
                };
            }
        },
        /**
         * Draw ticks on the y-axis.
         * @memberof Pen.axisTick
         * @param {number} [interval=1] - The tick interval.
         * @param {boolean} [mark=true] - Whether to label number at ticks.
         * @example
         * pen.tick.y(2) // draw ticks on the y-axis, at interval 2 units
         */
        y(interval = 1, mark = true) {
            const offset = this.pen.frame.yOffset();
            for (let y of this.pen.frame.yTicks(interval)) {
                this.pen.line([-offset, y], [offset, y]);
                if (mark) {
                    this.pen.ctx.save();
                    this.pen.set.textStyle("normal");
                    this.pen.set.textAlign("right");
                    this.pen.set.textBaseline("middle");
                    this.pen.write([-2 * offset, y], y.toString());
                    this.pen.ctx.restore();
                };
            }
        }
    };

    /**
     * The axis gridlines.
     * @namespace axisGrid
     * @memberof Pen
     */

    grid = {
        pen: this,
        /**
         * Draw gridlines on the x-axis.
         * @memberof Pen.axisGrid
         * @param {number} [interval=1] - The grid interval.
         * @example
         * pen.grid.x(2) // draw gridlines on the x-axis, at interval 2 units
         */
        x(interval = 1) {
            this.pen.ctx.save();
            this.pen.ctx.strokeStyle = "#d3d5db";
            for (let x of this.pen.frame.xTicks(interval)) {
                this.pen.straight.vertical(x);
            }
            this.pen.ctx.restore();
        },
        /**
         * Draw gridlines on the y-axis.
         * @memberof Pen.axisGrid
         * @param {number} [interval=1] - The grid interval.
         * @example
         * pen.grid.y(2) // draw gridlines on the y-axis, at interval 2 units
         */
        y(interval = 1) {
            this.pen.ctx.save();
            this.pen.ctx.strokeStyle = "#d3d5db";
            for (let y of this.pen.frame.yTicks(interval)) {
                this.pen.straight.horizontal(y);
            }
            this.pen.ctx.restore();
        }
    };


    autoCrop() {
        var ctx = this.ctx;
        var canvas = ctx.canvas,
            w = canvas.width, h = canvas.height,
            pix: { x: number[], y: number[] } = { x: [], y: [] },
            imageData = ctx.getImageData(0, 0, canvas.width, canvas.height),
            x, y, index;

        for (y = 0; y < h; y++) {
            for (x = 0; x < w; x++) {
                index = (y * w + x) * 4;
                if (imageData.data[index + 3] > 0) {
                    pix.x.push(x);
                    pix.y.push(y);
                }
            }
        }
        pix.x.sort(function (a, b) { return a - b; });
        pix.y.sort(function (a, b) { return a - b; });
        var n = pix.x.length - 1;

        w = 1 + pix.x[n] - pix.x[0];
        h = 1 + pix.y[n] - pix.y[0];
        var cut = ctx.getImageData(pix.x[0], pix.y[0], w, h);

        canvas.width = w;
        canvas.height = h;
        ctx.putImageData(cut, 0, 0);
    }


    dataURL() {
        return this.canvas.toDataURL();
    }

    /**
     * The export function.
     * @namespace export
     * @memberof Pen
     */

    /**
     * Export the canvas to image tag.
     * @memberof Pen.export
     * @param {string} html - The html string to export to.
     * @param {string} placeholder - The src field of the image tag to export to.
     * @returns {string} The new html with src field pasted.
     * @example
     * question = pen.export(question,'imgQ') // paste the canvas to the image tag with src field 'imgQ'
     */
    export(html: string, placeholder: string) {
        const src = 'src="' + this.dataURL() + '"';
        const width = ' width="' + Math.floor(this.canvas.width / PEN_QUALITY) + '"';
        const height = ' height="' + Math.floor(this.canvas.height / PEN_QUALITY) + '"';
        return html.replace('src="' + placeholder + '"', src + width + height);
    };

    /**
     * Clear the canvas.
     * @memberof Pen.export
     * @example
     * pen.clear() // clear the canvas.
     */
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};
