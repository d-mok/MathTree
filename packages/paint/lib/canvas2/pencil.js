"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pencil = void 0;
const armedconvas_1 = require("./armedconvas");
const support_1 = require("./support");
const DEFAULT_AXIS_LABEL_OFFSET_PIXEL = 15;
const DEFAULT_XAXIS_MARK_OFFSET_PIXEL = 15;
const DEFAULT_YAXIS_MARK_OFFSET_PIXEL = 10;
const DEFAULT_AXIS_TICK_LENGTH_PIXEL = 5;
/**
 * Return an array of ticks position at `interval` within `[min,max]`.
 * Zero is always a potential tick position.
 * ```
 * getTicks(2,10,3) // [3,6,9]
 * ```
 */
function getTicks(min, max, interval, includeZero = false) {
    const start = Math.floor(min / interval) * interval;
    const arr = [];
    for (let i = start; i <= max; i += interval) {
        i = parseFloat(i.toPrecision(3));
        if (i === min || i === max)
            continue;
        if (!includeZero && i === 0)
            continue;
        arr.push(i);
    }
    return arr;
}
class Pencil {
    constructor() {
        this.cv = new armedconvas_1.ArmedConvas();
        this.RANGE_DONE = false;
        this.SIZE_DONE = false;
    }
    /**
     * Set the coordinate range of the canvas.
     * @param xRange - [xmin,xmax] in coordinates
     * @param yRange - [ymin,ymax] in coordinates
     */
    initRange(xRange, yRange) {
        this.cv.initRange(xRange, yRange);
        this.RANGE_DONE = true;
    }
    /**
     * Set the physical size of the canvas.
     * @param width - width of canvas in scaled unit, 1 unit = SIZE_SCALE (=10) * REM_PIXEL pixel
     * @param height - height of canvas in scaled unit.
     */
    initSize(width, height) {
        if (!this.RANGE_DONE)
            throw '[Pencil] Range must be set before Size';
        this.cv.initSize(width, height);
        this.SIZE_DONE = true;
    }
    /**
     * Set a border by extending the range and size.
     * The original image will be unchanged. The size will be bigger.
     */
    initOuterBorder() {
        if (!this.RANGE_DONE)
            throw '[Pencil] Range must be set before setting border';
        if (!this.SIZE_DONE)
            throw '[Pencil] Size must be set before setting border';
        this.cv.setBorder();
    }
    pathSectoroid(center, pStart, pEnd, vertices) {
        let v1 = (0, support_1.vec)(center, pStart);
        let v2 = (0, support_1.vec)(center, pEnd);
        let r = (0, support_1.magnitude)(v1);
        let q1 = (0, support_1.argument)(v1);
        let q2 = (0, support_1.argument)(v2);
        if (q2 < q1)
            q2 += 360;
        let points = (0, support_1.traceCircle)(center, r, [q1, q2]);
        return [pStart, ...points, pEnd, ...vertices];
    }
    /**
     * Draw a stroke of a pseudo-sector
     */
    drawStrokeSectoroid(center, pStart, pEnd, vertices) {
        let pts = this.pathSectoroid(center, pStart, pEnd, vertices);
        this.cv.line(pts);
    }
    /**
     * Fill a pseudo-sector
     */
    drawFillSectoroid(center, pStart, pEnd, vertices) {
        let pts = this.pathSectoroid(center, pStart, pEnd, vertices);
        this.cv.fill(pts);
    }
    /**
     * Shade a pseudo-sector
     */
    drawShadeSectoroid(center, pStart, pEnd, vertices) {
        let pts = this.pathSectoroid(center, pStart, pEnd, vertices);
        this.cv.shade(pts);
    }
    /**
     * Draw an angle.
     */
    drawAngle(A, O, B, radiusPixel, arcCount, spacePixel) {
        let flip = this.cv.polarFlip(A, O, B);
        let [P, Q] = flip ? [B, A] : [A, B];
        // draw like polar
        this.cv.anglePolar(P, O, Q, radiusPixel, arcCount, spacePixel);
    }
    /**
     * Draw a plot of function.
     * @param func - the function to plot
     * @param tStart - start of parameter
     * @param tEnd - end of parameter
     * @param dots - total number of dots along the curve
     */
    drawPlot(func, tStart = this.cv.xmin, tEnd = this.cv.xmax, dots = 1000) {
        let points = (0, support_1.trace)(func, [tStart, tEnd], dots);
        let xmin = this.cv.xmin;
        let xmax = this.cv.xmax;
        let ymin = this.cv.ymin;
        let ymax = this.cv.ymax;
        let X = xmax - xmin;
        let Y = ymax - ymin;
        function outOfRange([x, y]) {
            return x > xmax + X || x < xmin - X || y > ymax + Y || y < ymin - Y;
        }
        let filteredPoints = points.map(pt => {
            let [x, y] = pt;
            if (!Number.isFinite(x))
                return null;
            if (!Number.isFinite(y))
                return null;
            if (outOfRange(pt))
                return null;
            return pt;
        });
        let segments = (0, support_1.split)(filteredPoints, null);
        for (let seg of segments) {
            if (seg.length === 0)
                continue;
            this.cv.line(seg);
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
    drawText(text, position, xOffset, yOffset) {
        this.cv.text(text, position, [xOffset, yOffset]);
    }
    /**
     * Draw a text label around a point. The label dodges the point elliptically.
     * @param text - string to write
     * @param position - where to write, in coordinates
     * @param direction - polar angle to dodge, in the visible (pixel world) sense
     * @param radiusPixel - offset distance in pixel
     */
    drawLabel(text, position, direction, radiusPixel) {
        direction ?? (direction = this.cv.getCenterDir(position));
        this.cv.textDodge(text, position, radiusPixel, direction);
    }
    /**
     * Find the extra pixel allowance when drawing angle arc and angle label for small angles.
     * @param A - first point, in coordinates.
     * @param O - where the angle is, in coordinates.
     * @param B - second point, in coordinates.
     * @param angleThreshold - the max angle under which extra pixel is needed
     * @param pixelPerDegree - extra pixel per degree under the threshold
     */
    getSmallAngleExtraPixel(A, O, B, angleThreshold, pixelPerDegree) {
        let angle = this.cv.getDirAngle(A, O, B);
        let angleUnderThreshold = Math.max(angleThreshold - angle, 0);
        return angleUnderThreshold * pixelPerDegree;
    }
    /**
     * Get the 4 corners of a circle. For .capture() to parse circle input.
     * @param center - center of circle
     * @param radius - radius of circle
     */
    getCircleCorners(center, radius) {
        let [h, k] = center;
        let r = radius;
        return [
            [h + r, k + r],
            [h + r, k - r],
            [h - r, k + r],
            [h - r, k - r]
        ];
    }
    /**
     * Get the 8 corners of a sphere. For .capture() to parse sphere input.
     * @param center - center of sphere
     * @param radius - radius of sphere
     */
    getSphereCorners(center, radius) {
        let [a, b, c] = center;
        let r = radius;
        return [
            [a + r, b + r, c + r],
            [a + r, b + r, c - r],
            [a + r, b - r, c + r],
            [a + r, b - r, c - r],
            [a - r, b + r, c + r],
            [a - r, b + r, c - r],
            [a - r, b - r, c + r],
            [a - r, b - r, c - r],
        ];
    }
    /**
     * Draw the x-axis.
     */
    drawXAxis() {
        let A = [this.cv.xmin, 0];
        let B = [this.cv.xmax, 0];
        this.cv.line([A, B]);
        this.cv.arrow(A, B, 5, 0);
    }
    /**
     * Draw the label of x-axis.
     * @param text - string to write
     */
    drawXAxisLabel(text) {
        this.cv.save();
        this.cv.$TEXT_ALIGN = "right";
        this.cv.$TEXT_BASELINE = "middle";
        this.drawText(text, [this.cv.xmax, 0], 0, DEFAULT_AXIS_LABEL_OFFSET_PIXEL);
        this.cv.restore();
    }
    /**
     * Draw the y-axis.
     */
    drawYAxis() {
        let A = [0, this.cv.ymin];
        let B = [0, this.cv.ymax];
        this.cv.line([A, B]);
        this.cv.arrow(A, B, 5, 0);
    }
    /**
     * Draw the label of y-axis.
     * @param text - string to write
     */
    drawYAxisLabel(text) {
        this.cv.save();
        this.cv.$TEXT_ALIGN = "left";
        this.cv.$TEXT_BASELINE = "top";
        this.drawText(text, [0, this.cv.ymax], DEFAULT_AXIS_LABEL_OFFSET_PIXEL, 0);
        this.cv.restore();
    }
    xTicks(interval) {
        return getTicks(this.cv.xmin, this.cv.xmax, interval);
    }
    yTicks(interval) {
        return getTicks(this.cv.ymin, this.cv.ymax, interval);
    }
    /**
     * Draw the ticks on x-axis.
     * @param interval - distance between tick, in coordinates.
     */
    drawXAxisTick(interval) {
        for (let x of this.xTicks(interval)) {
            this.cv.tickVert([x, 0], DEFAULT_AXIS_TICK_LENGTH_PIXEL);
        }
    }
    /**
     * Draw the ticks on y-axis.
     * @param interval - distance between tick, in coordinates.
     */
    drawYAxisTick(interval) {
        for (let y of this.yTicks(interval)) {
            this.cv.tickHori([0, y], DEFAULT_AXIS_TICK_LENGTH_PIXEL);
        }
    }
    /**
     * Draw the number mark on the ticks on x-axis.
     * @param interval - distance between tick, in coordinates.
     */
    drawXAxisTickMark(interval) {
        this.cv.save();
        this.cv.$TEXT_ITALIC = false;
        this.cv.$TEXT_ALIGN = "center";
        this.cv.$TEXT_BASELINE = "middle";
        for (let x of this.xTicks(interval)) {
            this.drawText(String(x), [x, 0], 0, -DEFAULT_XAXIS_MARK_OFFSET_PIXEL);
        }
        this.cv.restore();
    }
    /**
     * Draw the number mark on the ticks on y-axis.
     * @param interval - distance between tick, in coordinates.
     */
    drawYAxisTickMark(interval) {
        this.cv.save();
        this.cv.$TEXT_ITALIC = false;
        this.cv.$TEXT_ALIGN = "right";
        this.cv.$TEXT_BASELINE = "middle";
        for (let y of this.yTicks(interval)) {
            this.drawText(String(y), [0, y], -DEFAULT_YAXIS_MARK_OFFSET_PIXEL, 0);
        }
        this.cv.restore();
    }
    /**
     * Draw the vertical grid lines on the x-axis.
     * @param interval - distance between grids, in coordinates.
     */
    drawXAxisGrid(interval) {
        this.cv.save();
        this.cv.$COLOR = "#d3d5db";
        const drawLine = (x) => {
            this.cv.line([
                [x, this.cv.ymin],
                [x, this.cv.ymax]
            ]);
        };
        drawLine(0);
        for (let x of this.xTicks(interval)) {
            drawLine(x);
        }
        this.cv.restore();
    }
    /**
     * Draw the horizontal grid lines on the y-axis.
     * @param interval - distance between grids, in coordinates.
     */
    drawYAxisGrid(interval) {
        this.cv.save();
        this.cv.$COLOR = "#d3d5db";
        const drawLine = (y) => {
            this.cv.line([
                [this.cv.xmin, y],
                [this.cv.xmax, y]
            ]);
        };
        drawLine(0);
        for (let y of this.yTicks(interval)) {
            drawLine(y);
        }
        this.cv.restore();
    }
}
exports.Pencil = Pencil;
;
//# sourceMappingURL=pencil.js.map