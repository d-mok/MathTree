export class PenShade {
    constructor(pen, cv) {
        this.pen = pen;
        this.cv = cv;
    }
    /**
     * Shade a circle (x-h)^2+(y-k)^2 = r^2.
     * ```
     * pen.shade.circle([1,2],3) // shade (x-1)^2+(y-2)^2 = 9.
     * ```
     */
    circle(center, radius) {
        let points = cal.traceCircle(center, radius, [0, 360]);
        this.pen.polyshade(...points);
    }
    /**
     * Shade a sector. AOB must be in polar direction.
     * ```
     * pen.shade.sector([0,0],[1,0],[0,1]) // shade a quarter circle sector
     * ```
     */
    sector(O, A, B) {
        this.cv.sectoroidShade(O, A, B, [O]);
    }
    /**
     * Shade a circle segment. AOB must be in polar direction.
     * ```
     * pen.shade.segment([0,0],[1,0],[0,1]) // shade a quarter circle segment
     * ```
     */
    segment(O, A, B) {
        this.cv.sectoroidShade(O, A, B, []);
    }
    /**
     * Shade a sector-like area. AOB must be in polar direction.
     * ```
     * pen.shade.sectoroid([0,0],[1,0],[0,1],[[-1,0]]) // shade a long sector-like region
     * ```
     */
    sectoroid(O, A, B, vertices) {
        this.cv.sectoroidShade(O, A, B, vertices);
    }
    /**
     * Shade a rectangle.
     * ```
     * pen.shade.rect([0,0],[2,3]) // shade a rectangle [[0,0],[2,0],[2,3],[0,3]]
     * ```
     */
    rect(A, C) {
        let [a, b] = A;
        let [c, d] = C;
        this.pen.polyshade([a, b], [c, b], [c, d], [a, d]);
    }
}
