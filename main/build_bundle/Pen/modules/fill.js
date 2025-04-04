export class PenFill {
    constructor(pen, cv) {
        this.pen = pen;
        this.cv = cv;
    }
    /**
     * Fill a circle.
     * ```
     * pen.fill.circle([1,2],3) // fill (x-1)^2+(y-2)^2 = 9.
     * ```
     */
    circle(center, radius) {
        let points = cal.traceCircle(center, radius, [0, 360]);
        this.pen.polyfill(...points);
    }
    /**
     * Fill a sector. AOB must be in polar direction.
     * ```
     * pen.fill.sector([0,0],[1,0],[0,1]) // fill a quarter circle sector
     * ```
     */
    sector(O, A, B) {
        this.cv.sectoroidFill(O, A, B, [O]);
    }
    /**
     * Fill a circle segment. AOB must be in polar direction.
     * ```
     * pen.fill.segment([0,0],[1,0],[0,1]) // fill a quarter circle segment
     * ```
     */
    segment(O, A, B) {
        this.cv.sectoroidFill(O, A, B, []);
    }
    /**
     * Fill a sector-like area. AOB must be in polar direction.
     * ```
     * pen.fill.sectoroid([0,0],[1,0],[0,1],[[-1,0]]) // fill a long sector-like region
     * ```
     */
    sectoroid(O, A, B, vertices) {
        this.cv.sectoroidFill(O, A, B, vertices);
    }
    /**
     * Fill a rectangle.
     * ```
     * pen.fill.rect([0,0],[2,3]) // fill a rectangle [[0,0],[2,0],[2,3],[0,3]]
     * ```
     */
    rect(A, C) {
        let [a, b] = A;
        let [c, d] = C;
        this.pen.polyfill([a, b], [c, b], [c, d], [a, d]);
    }
}
