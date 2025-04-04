export class PenAxis {
    constructor(pen, cv) {
        this.pen = pen;
        this.cv = cv;
    }
    /**
     * Draw x-axis.
     * ```
     * pen.axis.x('time') // draw the x-axis, label as 'time'
     * ```
     */
    x(label = 'x') {
        this.cv.xAxis();
        this.cv.xAxisLabel(label);
    }
    /**
     * Draw y-axis.
     * ```
     * pen.axis.y('height') // draw the y-axis, label as 'height'
     * ```
     */
    y(label = 'y') {
        this.cv.yAxis();
        this.cv.yAxisLabel(label);
    }
    /**
     * Draw both axis.
     * ```
     * pen.axis.xy('x','y') // draw both axis, label as 'x' and 'y'
     * ```
     */
    xy(xlabel = 'x', ylabel = 'y') {
        this.x(xlabel);
        this.y(ylabel);
    }
}
