"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pencil = void 0;
const frame_1 = require("./frame");
const support_1 = require("./support");
const modules_1 = require("../modules");
/**
 * REM_PIXEL is the default font size of the browser, usually 16px
 */
const REM_PIXEL = parseFloat(getComputedStyle(document.documentElement).fontSize);
const SIZE_SCALE = 10;
const DEFAULT_SHADE_ALPHA = 0.1;
const DEFAULT_AXIS_LABEL_OFFSET_PIXEL = 15;
const DEFAULT_XAXIS_MARK_OFFSET_PIXEL = 15;
const DEFAULT_YAXIS_MARK_OFFSET_PIXEL = 10;
const DEFAULT_AXIS_TICK_LENGTH_PIXEL = 5;
class Pencil {
    constructor() {
        /**
         * @deprecated
         */
        this.canvas = document.createElement('canvas');
        /**
         * @deprecated
         */
        this.ctx = this.canvas.getContext("2d");
        this.board = new modules_1.Board(this.canvas);
        this.dial = new modules_1.Dial(this.ctx);
        this.ink = new modules_1.Ink(this.ctx);
        this.feather = new modules_1.Feather(this.ctx);
        this.frame = new frame_1.Frame();
        this.INIT_RANGE_ALREADY = false;
        this.INIT_SIZE_ALREADY = false;
        this.state = [];
        this.$TEXT_DIR = 0;
        this.$TEXT_LATEX = false;
        this.$LABEL_CENTER = 0;
        this.$ANGLE_MODE = 'normal';
        this.$LENGTH_UNIT = undefined;
        this.$3D_ANGLE = 60;
        this.$3D_DEPTH = 0.5;
        this.$BORDER = 0.2;
        this.$LINE_LABEL = 'auto';
    }
    /**
     * Set the coordinate range of the canvas.
     * @param xRange - [xmin,xmax] in coordinates
     * @param yRange - [ymin,ymax] in coordinates
     */
    initRange(xRange, yRange) {
        this.frame.setXRange(xRange);
        this.frame.setYRange(yRange);
        this.INIT_RANGE_ALREADY = true;
    }
    /**
     * Set the physical size of the canvas.
     * @param width - width of canvas in scaled unit, 1 unit = SIZE_SCALE (=10) * REM_PIXEL pixel
     * @param height - height of canvas in scaled unit.
     */
    initSize(width, height) {
        if (!this.INIT_RANGE_ALREADY)
            throw '[Pencil Error] Range must be set before Size';
        const wPixel = width * SIZE_SCALE * REM_PIXEL;
        const hPixel = height * SIZE_SCALE * REM_PIXEL;
        this.board.init(wPixel, hPixel);
        this.frame.setSize(wPixel, hPixel);
        this.setDefault();
        this.INIT_SIZE_ALREADY = true;
    }
    /**
     * Set a border by extending the range and size.
     * The original image will be unchanged. The size will be bigger.
     */
    initOuterBorder() {
        if (!this.INIT_RANGE_ALREADY)
            throw '[Pencil Error] Range must be set before setting range border';
        if (!this.INIT_SIZE_ALREADY)
            throw '[Pencil Error] Size must be set before setting range border';
        const borderPix = this.$BORDER * SIZE_SCALE * REM_PIXEL;
        let [xmin, xmax] = this.frame.xRange();
        let [ymin, ymax] = this.frame.yRange();
        const wPixel = this.frame.wPixel;
        const hPixel = this.frame.hPixel;
        let borderXUnit = (xmax - xmin) * borderPix / wPixel;
        let borderYUnit = (ymax - ymin) * borderPix / hPixel;
        xmin -= borderXUnit;
        xmax += borderXUnit;
        ymin -= borderYUnit;
        ymax += borderYUnit;
        this.initRange([xmin, xmax], [ymin, ymax]);
        const width = wPixel / SIZE_SCALE / REM_PIXEL;
        const height = hPixel / SIZE_SCALE / REM_PIXEL;
        this.initSize(width + 2 * this.$BORDER, height + 2 * this.$BORDER);
    }
    pj(point) {
        return (0, support_1.force2D)(point, this.$3D_ANGLE, this.$3D_DEPTH);
    }
    pjs(points) {
        return points.map($ => this.pj($));
    }
    setWeight(weight = 1) {
        this.dial.setWeight(weight);
    }
    setStrokeColor(color = "black") {
        this.dial.setStrokeColor(color);
    }
    setFillColor(color = "black") {
        this.dial.setFillColor(color);
    }
    setColor(color = "black") {
        this.dial.setColor(color);
    }
    setAlpha(opaque = 1) {
        this.dial.setAlpha(opaque);
    }
    setDash(segments = []) {
        this.dial.setDash(segments);
    }
    setTextAlign(align = "center") {
        this.dial.setTextAlign(align);
    }
    setTextBaseline(baseline = "middle") {
        this.dial.setTextBaseline(baseline);
    }
    setTextSize(size = 1) {
        this.dial.setTextPixel(size * REM_PIXEL);
    }
    setTextItalic(italic = false) {
        this.dial.setTextItalic(italic);
    }
    setTextDir(angle = 0) {
        this.$TEXT_DIR = angle;
    }
    setTextLatex(on = false) {
        this.$TEXT_LATEX = on;
    }
    setLabelCenter(...centers) {
        if (centers.length === 0) {
            this.$LABEL_CENTER = this.frame.xyCenter();
            return;
        }
        // TEMP, to be deleted
        if (centers[0] === true) {
            this.$LABEL_CENTER = this.frame.xyCenter();
            return;
        }
        if (typeof centers[0] === 'number') {
            this.$LABEL_CENTER = centers[0];
            return;
        }
        if (Array.isArray(centers[0])) {
            let cens = centers;
            let pts = cens.map($ => (0, support_1.force2D)($, this.$3D_ANGLE, this.$3D_DEPTH));
            this.$LABEL_CENTER = (0, support_1.meanPoint)(...pts);
        }
    }
    setLengthUnit(text = undefined) {
        this.$LENGTH_UNIT = text;
    }
    setAngleMode(mode = 'normal') {
        this.$ANGLE_MODE = mode;
    }
    setProjector3D(angle = 60, depth = 0.5) {
        this.$3D_ANGLE = angle;
        this.$3D_DEPTH = depth;
    }
    setBorder(border = 0.2) {
        this.$BORDER = border;
    }
    setLineLabel(setting = 'auto') {
        this.$LINE_LABEL = setting;
    }
    setDefault() {
        this.setWeight();
        this.setStrokeColor();
        this.setFillColor();
        this.setAlpha();
        this.setDash();
        this.setTextAlign();
        this.setTextBaseline();
        this.ctx.font = 'normal 10px Times New Roman';
        this.setTextSize();
        this.setTextItalic();
        this.setTextDir();
        this.setTextLatex();
        this.setLabelCenter();
        this.setLengthUnit();
        this.setAngleMode();
        this.setLineLabel();
    }
    setAllDefault() {
        this.setDefault();
        this.setProjector3D();
        this.setBorder();
    }
    save() {
        this.ctx.save();
        this.state.push({
            $TEXT_DIR: this.$TEXT_DIR,
            $TEXT_LATEX: this.$TEXT_LATEX,
            $LABEL_CENTER: this.$LABEL_CENTER,
            $ANGLE_MODE: this.$ANGLE_MODE,
            $LENGTH_UNIT: this.$LENGTH_UNIT,
            $3D_ANGLE: this.$3D_ANGLE,
            $3D_DEPTH: this.$3D_DEPTH,
            $BORDER: this.$BORDER,
            $LINE_LABEL: this.$LINE_LABEL
        });
    }
    restore() {
        this.ctx.restore();
        let state = this.state.pop();
        if (state === undefined)
            return;
        this.$TEXT_DIR = state.$TEXT_DIR;
        this.$TEXT_LATEX = state.$TEXT_LATEX;
        this.$LABEL_CENTER = state.$LABEL_CENTER;
        this.$ANGLE_MODE = state.$ANGLE_MODE;
        this.$LENGTH_UNIT = state.$LENGTH_UNIT;
        this.$3D_ANGLE = state.$3D_ANGLE;
        this.$3D_DEPTH = state.$3D_DEPTH;
        this.$BORDER = state.$BORDER;
        this.$LINE_LABEL = state.$LINE_LABEL;
    }
    toPix(point) {
        let pt = this.pj(point);
        return this.frame.toPix(pt);
    }
    toPixs(points) {
        return points.map($ => this.toPix($));
    }
    /**
     * Draw a stroke through the `points`.
     */
    drawStroke(points) {
        let dots = this.toPixs(points);
        this.ink.track(dots);
    }
    /**
     * Draw a stroke through the `points` to form a closed shape.
     */
    drawShape(points) {
        let dots = this.toPixs(points);
        this.ink.shape(dots);
    }
    /**
     * Fill the closed shape formed by `points`.
     */
    drawFill(points) {
        let dots = this.toPixs(points);
        this.ink.fill(dots);
    }
    /**
     * Shade the closed shape formed by `points`.
     */
    drawShade(points) {
        let alpha = this.ctx.globalAlpha;
        this.setAlpha(DEFAULT_SHADE_ALPHA);
        this.drawFill(points);
        this.setAlpha(alpha);
    }
    /**
     * Draw an arc.
     * @param center - the center of the arc's circle
     * @param radiusPixel - the radius in pixel
     * @param angleRange - polar angle range
     */
    drawArc(center, radiusPixel, angleRange) {
        let cen = this.toPix(center);
        this.ink.arc(cen, radiusPixel, angleRange);
    }
    /**
     * Draw a filled segment.
     * @param center - the center of the segment's circle
     * @param radiusPixel - the radius in pixel
     * @param angleRange - polar angle range
     */
    drawSegment(center, radiusPixel, angleRange) {
        let cen = this.toPix(center);
        this.ink.segment(cen, radiusPixel, angleRange);
    }
    /**
     * Draw a circle.
     * @param center - the center of the circle
     * @param radiusPixel - the radius in pixel
     */
    drawCircle(center, radiusPixel) {
        this.drawArc(center, radiusPixel, [0, 360]);
    }
    /**
     * Draw a dot, i.e. a filled circle.
     * @param center - the center of the circle
     * @param radiusPixel - the radius in pixel
     */
    drawDot(center, radiusPixel) {
        this.drawSegment(center, radiusPixel, [0, 360]);
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
        this.drawStroke(pts);
    }
    /**
     * Fill a pseudo-sector
     */
    drawFillSectoroid(center, pStart, pEnd, vertices) {
        let pts = this.pathSectoroid(center, pStart, pEnd, vertices);
        this.drawFill(pts);
    }
    /**
     * Shade a pseudo-sector
     */
    drawShadeSectoroid(center, pStart, pEnd, vertices) {
        let alpha = this.ctx.globalAlpha;
        this.setAlpha(DEFAULT_SHADE_ALPHA);
        this.drawFillSectoroid(center, pStart, pEnd, vertices);
        this.setAlpha(alpha);
    }
    /**
     * Draw an arrow head at `endPoint`.
     * @param startPoint - start point of arrow, used to determine arrow direction only
     * @param endPoint - end point of arrow, where the arrow head will be drawn
     * @param length - length pixel along the arrow head
     * @param width - width pixel across the arrow on one side
     * @param offset - offset pixel along the arrow
     */
    drawArrowHead(startPoint, endPoint, size, offset) {
        let p1 = this.toPix(startPoint);
        let p2 = this.toPix(endPoint);
        this.ink.arrow(p1, p2, size * 2, size, offset);
    }
    /**
     * Draw an angle.
     * @param point1 - first point
     * @param vertex - where the angle is
     * @param point2 - second point
     * @param radiusPixels - radius of angle mark in pixel
     */
    drawAngle(point1, vertex, point2, radiusPixel, arcCount, spacePixel) {
        let [A, O, B] = this.pjs([point1, vertex, point2]);
        let mode = this.$ANGLE_MODE;
        if (mode === 'normal' && (0, support_1.IsReflex)(A, O, B))
            [A, B] = [B, A];
        if (mode === 'reflex' && !(0, support_1.IsReflex)(A, O, B))
            [A, B] = [B, A];
        // draw like polar
        let [a, o, b] = this.toPixs([A, O, B]);
        this.ink.anglePolar(a, o, b, radiusPixel, arcCount, spacePixel);
    }
    /**
     * Draw a right angle.
     * @param point1 - first point
     * @param vertex - where the angle is
     * @param point2 - second point
     * @param sizePixel - size in pixel
     */
    drawRightAngle(point1, vertex, point2, sizePixel) {
        let [A, O, B] = this.toPixs([point1, vertex, point2]);
        this.ink.rightAngle(A, O, B, sizePixel);
    }
    /**
     * Draw parallel mark
     * @param startPoint - start point of the line to decorate
     * @param endPoint -end point of the line to decorate
     * @param sizePixel - size of mark in pixel
     * @param tickCount - how many marks
     * @param spacePixel - space between marks in pixel
     */
    drawParallelMark(startPoint, endPoint, sizePixel, tickCount, spacePixel) {
        let [A, B] = this.toPixs([startPoint, endPoint]);
        this.ink.parallel(A, B, sizePixel, tickCount, spacePixel);
    }
    /**
     * Draw a tick.
     * @param startPoint - start point of the line to tick, for direction only
     * @param tickPoint - where the tick is
     * @param lengthPixel - one-sided length of the tick in pixel
     * @param offsetPixel - offset of the tick position along the line, in pixel
     */
    drawTick(startPoint, tickPoint, lengthPixel, offsetPixel) {
        let p1 = this.toPix(startPoint);
        let p2 = this.toPix(tickPoint);
        this.ink.tick(p1, p2, lengthPixel, offsetPixel);
    }
    /**
     * Draw a vertical tick.
     * @param position - where the tick is, in coordinates.
     * @param lengthPixel - one-sided length of the tick
     */
    drawTickVertical(position, lengthPixel) {
        let p = this.toPix(position);
        this.ink.tickVert(p, lengthPixel);
    }
    /**
     * Draw a horizontal tick.
     * @param position - where the tick is, in coordinates.
     * @param lengthPixel - one-sided length of the tick
     */
    drawTickHorizontal(position, lengthPixel) {
        let p = this.toPix(position);
        this.ink.tickHori(p, lengthPixel);
    }
    /**
     * Draw equal mark at the mid-pt of a line.
     * @param startPoint - start point of the line to decorate
     * @param endPoint - end point of the line to decorate
     * @param lengthPixel - one-sided length of the mark in pixel
     * @param tickCount - how many marks
     * @param spacePixel -space between the marks, in pixel
     */
    drawEqualMark(startPoint, endPoint, lengthPixel, tickCount, spacePixel) {
        let A = this.toPix(startPoint);
        let B = this.toPix(endPoint);
        this.ink.equalSide(A, B, lengthPixel, tickCount, spacePixel);
    }
    /**
     * Draw a compass.
     * @param center - position of compass center
     * @param xSizePixel - horizontal one-sided length of compass, in pixel
     * @param ySizePixel - vertical one-sided length of compass, in pixel
     * @param arrowSize - one-sided width of arrow head
     */
    drawCompass(center, xSizePixel, ySizePixel, arrowSize) {
        let cen = this.toPix(center);
        this.ink.compass(cen, xSizePixel, ySizePixel, arrowSize);
    }
    /**
     * Draw a plot of function.
     * @param func - the function to plot
     * @param tStart - start of parameter
     * @param tEnd - end of parameter
     * @param dots - total number of dots along the curve
     */
    drawPlot(func, tStart, tEnd, dots = 1000) {
        let points = (0, support_1.trace)(func, [tStart, tEnd], dots);
        let [xmin, xmax] = this.frame.xRange();
        let [ymin, ymax] = this.frame.yRange();
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
            this.drawStroke(seg);
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
        let [x, y] = this.toPix(position);
        x += xOffset;
        y -= yOffset;
        this.feather.write(text, [x, y], this.$TEXT_DIR, this.$TEXT_LATEX);
    }
    /**
     * Find the polar direction between two points, in the pixel world.
     * @param pStart - start point in coordinates
     * @param pEnd - end point in coordinates
     */
    getDirInPixel(pStart, pEnd) {
        let [OPoint, APoint] = this.pjs([pStart, pEnd]);
        let [O, A] = this.frame.toPixs([OPoint, APoint]);
        return (0, support_1.atan2)(-(A[1] - O[1]), A[0] - O[0]);
    }
    /**
     * Find the mid-ray direction given 3 points, in the pixel world.
     * Obey ANGLE_MODE.
     * @param point1 - first point, in coordinates.
     * @param vertex - where the angle is, in coordinates.
     * @param point2 - second point, in coordinates.
     */
    getDirInPixelByAngle(point1, vertex, point2) {
        let [A, O, B] = this.pjs([point1, vertex, point2]);
        let mode = this.$ANGLE_MODE;
        if (mode === 'normal' && (0, support_1.IsReflex)(A, O, B))
            [A, B] = [B, A];
        if (mode === 'reflex' && !(0, support_1.IsReflex)(A, O, B))
            [A, B] = [B, A];
        // draw like polar
        let [pixelA, pixelO, pixelB] = this.frame.toPixs([A, O, B]);
        let a1 = (0, support_1.atan2)(-(pixelA[1] - pixelO[1]), pixelA[0] - pixelO[0]);
        let a2 = (0, support_1.atan2)(-(pixelB[1] - pixelO[1]), pixelB[0] - pixelO[0]);
        if (a2 < a1)
            a2 = a2 + 360;
        return (a1 + a2) / 2;
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
    getDirInPixelByLine(pStart, pEnd) {
        let mode = this.$LINE_LABEL;
        let left = this.getDirInPixel(pStart, pEnd) + 90;
        let right = this.getDirInPixel(pStart, pEnd) - 90;
        if (mode === 'left')
            return left;
        if (mode === 'right')
            return right;
        if (mode === 'auto') {
            let cen = this.$LABEL_CENTER;
            if (typeof cen === 'number')
                return right;
            let p1 = this.pj(pStart);
            let p2 = this.pj(pEnd);
            let cross = (0, support_1.cross2D)((0, support_1.vec)(p2, p1), (0, support_1.vec)(p2, cen));
            return cross > 0 ? left : right;
        }
        console.warn("$LINE_LABEL must be 'left' | 'right' | 'auto'");
        return right;
    }
    getLabelCenterDirInPixel(point) {
        let pt = this.pj(point);
        let center = this.$LABEL_CENTER;
        if (typeof center === 'number') {
            return center;
        }
        else {
            if (center[0] === pt[0] && center[1] === pt[1])
                return 0;
            return this.getDirInPixel(center, pt);
        }
    }
    getTextWidthInPixel(text) {
        return this.feather.getHalfWidth(text, this.$TEXT_LATEX);
    }
    getTextWithLengthUnit(text) {
        text = String(text);
        let unit = this.$LENGTH_UNIT;
        if (unit === undefined)
            return text;
        if (this.$TEXT_LATEX) {
            return text + `~\\text{${unit}}`;
        }
        else {
            return text + ' ' + unit;
        }
    }
    /**
     * Draw a text label around a point. The label dodges the point elliptically.
     * @param text - string to write
     * @param position - where to write, in coordinates
     * @param direction - polar angle to dodge, in the visible (pixel world) sense
     * @param radiusPixel - offset distance in pixel
     */
    drawLabel(text, position, direction, radiusPixel) {
        direction ?? (direction = this.getLabelCenterDirInPixel(position));
        let textWidth = this.getTextWidthInPixel(text);
        let xOffset = (radiusPixel + textWidth - 5) * (0, support_1.cos)(direction);
        let yOffset = radiusPixel * (0, support_1.sin)(direction);
        this.drawText(text, position, xOffset, yOffset);
    }
    makePolarAngle(point1, vertex, point2) {
        let [A, O, B] = this.pjs([point1, vertex, point2]);
        let mode = this.$ANGLE_MODE;
        if (mode === 'normal' && (0, support_1.IsReflex)(A, O, B))
            return [point2, vertex, point1];
        if (mode === 'reflex' && !(0, support_1.IsReflex)(A, O, B))
            return [point2, vertex, point1];
        return [point1, vertex, point2];
    }
    /**
     * Find the angle in pixel world. Obey ANGLE_MODE.
     * @param point1 - first point, in coordinates.
     * @param vertex - where the angle is, in coordinates.
     * @param point2 - second point, in coordinates.
     */
    getAngleInPixel(point1, vertex, point2) {
        let [A, O, B] = this.makePolarAngle(point1, vertex, point2);
        let a = this.getDirInPixel(O, A);
        let b = this.getDirInPixel(O, B);
        return a <= b ? b - a : 360 + b - a;
    }
    /**
     * Find the extra pixel allowance when drawing angle arc and angle label for small angles.
     * @param point1 - first point, in coordinates.
     * @param vertex - where the angle is, in coordinates.
     * @param point2 - second point, in coordinates.
     * @param angleThreshold - the max angle under which extra pixel is needed
     * @param pixelPerDegree - extra pixel per degree under the threshold
     */
    getSmallAngleExtraPixel(point1, vertex, point2, angleThreshold, pixelPerDegree) {
        let angle = this.getAngleInPixel(point1, vertex, point2);
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
        const [xmin, xmax] = this.frame.xRange();
        this.drawStroke([[xmin, 0], [xmax, 0]]);
        this.drawArrowHead([xmin, 0], [xmax, 0], 5, 0);
    }
    /**
     * Draw the label of x-axis.
     * @param text - string to write
     */
    drawXAxisLabel(text) {
        text = String(text);
        const [xmin, xmax] = this.frame.xRange();
        this.ctx.save();
        this.setTextAlign("right");
        this.setTextBaseline("middle");
        this.drawText(text, [xmax, 0], 0, DEFAULT_AXIS_LABEL_OFFSET_PIXEL);
        this.ctx.restore();
    }
    /**
     * Draw the y-axis.
     */
    drawYAxis() {
        const [ymin, ymax] = this.frame.yRange();
        this.drawStroke([[0, ymin], [0, ymax]]);
        this.drawArrowHead([0, ymin], [0, ymax], 5, 0);
    }
    /**
     * Draw the label of y-axis.
     * @param text - string to write
     */
    drawYAxisLabel(text) {
        text = String(text);
        const [ymin, ymax] = this.frame.yRange();
        this.ctx.save();
        this.setTextAlign("left");
        this.setTextBaseline("top");
        this.drawText(text, [0, ymax], DEFAULT_AXIS_LABEL_OFFSET_PIXEL, 0);
        this.ctx.restore();
    }
    /**
     * Draw the ticks on x-axis.
     * @param interval - distance between tick, in coordinates.
     */
    drawXAxisTick(interval) {
        for (let x of this.frame.xTicks(interval)) {
            this.drawTickVertical([x, 0], DEFAULT_AXIS_TICK_LENGTH_PIXEL);
        }
    }
    /**
     * Draw the ticks on y-axis.
     * @param interval - distance between tick, in coordinates.
     */
    drawYAxisTick(interval) {
        for (let y of this.frame.yTicks(interval)) {
            this.drawTickHorizontal([0, y], DEFAULT_AXIS_TICK_LENGTH_PIXEL);
        }
    }
    /**
     * Draw the number mark on the ticks on x-axis.
     * @param interval - distance between tick, in coordinates.
     */
    drawXAxisTickMark(interval) {
        this.ctx.save();
        this.setTextItalic();
        this.setTextAlign("center");
        this.setTextBaseline("middle");
        for (let x of this.frame.xTicks(interval)) {
            this.drawText(String(x), [x, 0], 0, -DEFAULT_XAXIS_MARK_OFFSET_PIXEL);
        }
        this.ctx.restore();
    }
    /**
     * Draw the number mark on the ticks on y-axis.
     * @param interval - distance between tick, in coordinates.
     */
    drawYAxisTickMark(interval) {
        this.ctx.save();
        this.setTextItalic();
        this.setTextAlign("right");
        this.setTextBaseline("middle");
        for (let y of this.frame.yTicks(interval)) {
            this.drawText(String(y), [0, y], -DEFAULT_YAXIS_MARK_OFFSET_PIXEL, 0);
        }
        this.ctx.restore();
    }
    /**
     * Draw the vertical grid lines on the x-axis.
     * @param interval - distance between grids, in coordinates.
     */
    drawXAxisGrid(interval) {
        this.ctx.save();
        this.ctx.strokeStyle = "#d3d5db";
        let [ymin, ymax] = this.frame.yRange();
        const drawLine = (x) => {
            this.drawStroke([[x, ymin], [x, ymax]]);
        };
        drawLine(0);
        for (let x of this.frame.xTicks(interval)) {
            drawLine(x);
        }
        this.ctx.restore();
    }
    /**
     * Draw the horizontal grid lines on the y-axis.
     * @param interval - distance between grids, in coordinates.
     */
    drawYAxisGrid(interval) {
        this.ctx.save();
        this.ctx.strokeStyle = "#d3d5db";
        let [xmin, xmax] = this.frame.xRange();
        const drawLine = (y) => {
            this.drawStroke([[xmin, y], [xmax, y]]);
        };
        drawLine(0);
        for (let y of this.frame.yTicks(interval)) {
            drawLine(y);
        }
        this.ctx.restore();
    }
}
exports.Pencil = Pencil;
;
//# sourceMappingURL=pencil.js.map