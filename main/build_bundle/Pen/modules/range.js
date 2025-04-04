export class PenRange {
    constructor(pen, cv) {
        this.pen = pen;
        this.cv = cv;
    }
    /**
     * Set the coordinate range.
     * ```
     * pen.range.set([-5,5],[-2,4]) // -5<x<5 and -2<y<4
     * ```
     */
    set([xmin, xmax], [ymin, ymax] = [xmin, xmax]) {
        this.cv.xmin = xmin;
        this.cv.xmax = xmax;
        this.cv.ymin = ymin;
        this.cv.ymax = ymax;
        this.cv.RANGE_DONE = true;
    }
    /**
     * Set the coordinate range as a square.
     * ```
     * pen.range.square(5) // -5<x<5 and -5<y<5
     * pen.range.square(5,[1,2]) // -4<x<6 and -3<y<7
     * ```
     */
    square(size, [x, y] = [0, 0]) {
        this.set([x - size, x + size], [y - size, y + size]);
    }
    /**
     * Set the coordinate range by capture points.
     * ```
     * pen.range.capture([1,2],[3,4]) //  [1,2], [3,4] must be in-view
     * ```
     */
    capture(...points) {
        this.cv.capture(points);
        this.cv.AUTO_BORDER = true;
    }
    /**
     * Set the coordinate range by capture points EmbedZ.
     * ```
     * pen.range.captureZ([[1,2],[3,4]], 5) //  [1,2,5], [3,4,5] must be in-view
     * ```
     */
    captureZ(points, z = 0) {
        this.cv.capture(EmbedZ(points, z));
        this.cv.AUTO_BORDER = true;
    }
    /**
     * Set the coordinate range by capturing a circle.
     * ```
     * pen.range.captureCircle([1,2], 3)
     * ```
     */
    captureCircle(center, radius) {
        this.cv.capture([['circle', center, radius]]);
        this.cv.AUTO_BORDER = true;
    }
    /**
     * Set the coordinate range by capturing a sphere.
     * ```
     * pen.range.captureSphere([0,0,0], 3)
     * ```
     */
    captureSphere(center, radius) {
        this.cv.capture([['sphere', center, radius]]);
        this.cv.AUTO_BORDER = true;
    }
    capQuadX(a, b, c) {
        if (Discriminant(a, b, c) >= 0) {
            let [p, q] = QuadraticRoot(a, b, c);
            this.cv.capture([
                [p, 0],
                [q, 0],
            ]);
        }
    }
    capQuadY(a, b, c) {
        this.cv.capture([[0, c]]);
    }
    capQuadV(a, b, c) {
        this.cv.capture([['quadratic', a, b, c, 1]]);
    }
    /**
     * Set the coordinate range by capturing a quadratic graph (with vertex and x-int if any).
     * ```
     * pen.range.captureQuadX(1,2,3) // y=x^2+2x+3
     * ```
     */
    captureQuadX(a, b, c) {
        this.capQuadV(a, b, c);
        this.capQuadX(a, b, c);
        this.cv.AUTO_BORDER = true;
    }
    /**
     * Set the coordinate range by capturing a quadratic graph (with vertex and y-int).
     * ```
     * pen.range.captureQuadY(1,2,3) // y=x^2+2x+3
     * ```
     */
    captureQuadY(a, b, c) {
        this.capQuadV(a, b, c);
        this.capQuadY(a, b, c);
        this.cv.AUTO_BORDER = true;
    }
    /**
     * Set the coordinate range by capturing a quadratic graph (with vertex).
     * ```
     * pen.range.captureQuadV(1,2,3) // y=x^2+2x+3
     * ```
     */
    captureQuadV(a, b, c) {
        this.capQuadV(a, b, c);
        this.cv.AUTO_BORDER = true;
    }
    /**
     * Set the coordinate range by capturing a quadratic graph (with vertex, y-int and x-int if any).
     * ```
     * pen.range.captureQuad(1,2,3) // y=x^2+2x+3
     * ```
     */
    captureQuad(a, b, c) {
        this.capQuadV(a, b, c);
        this.capQuadX(a, b, c);
        this.capQuadY(a, b, c);
        this.cv.AUTO_BORDER = true;
    }
    /**
     * Set the coordinate range by capturing a line (with both int).
     * ```
     * pen.range.captureLinear(2,3,4) // 2x+3y+4=0
     * ```
     */
    captureLinear(a, b, c) {
        let x = -c / a;
        let y = -c / b;
        if (Number.isFinite(x))
            this.cv.capture([[x, 0]]);
        if (Number.isFinite(y))
            this.cv.capture([[0, y]]);
        this.cv.AUTO_BORDER = true;
    }
    /**
     * Set the coordinate range by capturing a line (with both int).
     * ```
     * pen.range.captureLine(2,3) // y=2x+3
     * ```
     */
    captureLine(m, c) {
        let x = -c / m;
        this.cv.capture([[0, c]]);
        if (Number.isFinite(x))
            this.cv.capture([[x, 0]]);
        this.cv.AUTO_BORDER = true;
    }
    /**
     * Set the coordinate range by capture points or objects, include O(0,0).
     * ```
     * pen.range.extend([1,2],[3,4]) // [0,0], [1,2], [3,4] must be in-view
     * // point | circle [[h,k],r] | sphere [[a,b,c],r]
     * ```
     */
    extend(...points) {
        this.capture([0, 0], ...points);
    }
    /**
     * Set the coordinate range by capturing a circle, include O(0,0).
     * ```
     * pen.range.extendCircle([1,2], 3)
     * ```
     */
    extendCircle(center, radius) {
        this.cv.capture([[0, 0]]);
        this.cv.capture([['circle', center, radius]]);
        this.cv.AUTO_BORDER = true;
    }
}
