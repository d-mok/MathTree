export class PenTick {
    constructor(pen, cv) {
        this.pen = pen;
        this.cv = cv;
    }
    /**
     * Draw ticks on the x-axis.
     * ```
     * pen.tick.x(2) // draw ticks on the x-axis, at interval 2 units
     * ```
     */
    x(interval = 1, mark = true) {
        this.cv.xAxisTick(interval);
        if (mark)
            this.cv.xAxisTickMark(interval);
    }
    /**
     * Draw ticks on the y-axis.
     * ```
     * pen.tick.y(2) // draw ticks on the y-axis, at interval 2 units
     * ```
     */
    y(interval = 1, mark = true) {
        this.cv.yAxisTick(interval);
        if (mark)
            this.cv.yAxisTickMark(interval);
    }
    /**
     * Draw ticks on both axis.
     * ```
     * pen.tick.xy(2) // draw ticks on both axis, at interval 2 units
     * ```
     */
    xy(interval = 1, mark = true) {
        this.x(interval, mark);
        this.y(interval, mark);
    }
}
