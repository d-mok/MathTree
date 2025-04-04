export class PenGrid {
    constructor(pen, cv) {
        this.pen = pen;
        this.cv = cv;
    }
    /**
     * Draw gridlines on the x-axis.
     * ```
     * pen.grid.x(2) // draw gridlines on the x-axis, at interval 2 units
     * ```
     */
    x(interval = 1) {
        this.cv.xAxisGrid(interval);
    }
    /**
     * Draw gridlines on the y-axis.
     * ```
     * pen.grid.y(2) // draw gridlines on the y-axis, at interval 2 units
     * ```
     */
    y(interval = 1) {
        this.cv.yAxisGrid(interval);
    }
    /**
     * Draw gridlines on both axis.
     * ```
     * pen.grid.xy(2) // draw gridlines on both axis, at interval 2 units
     * ```
     */
    xy(interval = 1) {
        this.x(interval);
        this.y(interval);
    }
}
