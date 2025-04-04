export class PenRod {
    constructor(pen, cv) {
        this.pen = pen;
        this.cv = cv;
    }
    end(A, dir, length) {
        return length === undefined
            ? this.cv.edgePoint(A, dir)
            : Move(A, dir, length);
    }
    /**
     * Draw a line from `A` in `dir` with `length`.
     * ```
     * pen.rod.line([0,0],2,90) // from [0,0] to [0,2]
     * ```
     */
    line(A, dir, length, label) {
        let B = this.end(A, dir, length);
        this.pen.line(A, B, label);
    }
    /**
     * Draw a dash line from `A` in `dir` with `length`.
     * ```
     * pen.rod.dash([0,0],2,90) // from [0,0] to [0,2]
     * ```
     */
    dash(A, dir, length, label) {
        let B = this.end(A, dir, length);
        this.pen.dash(A, B, label);
    }
    /**
     * Draw an arrow from `A` in `dir` with `length`.
     * ```
     * pen.rod.arrow([0,0],2,90) // from [0,0] to [0,2]
     * ```
     */
    arrow(A, dir, length, label) {
        let B = this.end(A, dir, length);
        this.pen.arrow(A, B, label);
    }
    /**
     * Draw a ray from `A` in `dir` with `length`.
     * ```
     * pen.rod.rayFrom([0,0],2,90) // from [0,0] to [0,2]
     * ```
     */
    rayFrom(A, dir, length, label) {
        let B = this.end(A, dir, length);
        this.pen.ray(A, B, label);
    }
    /**
     * Draw a ray to `A` in `dir` with `length`.
     * ```
     * pen.rod.rayTo([0,0],2,90) // from [0,2] to [0,0]
     * ```
     */
    rayTo(A, dir, length, label) {
        let B = this.end(A, dir, length);
        this.pen.ray(B, A, label);
    }
}
