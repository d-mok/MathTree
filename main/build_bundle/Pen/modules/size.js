export class PenSize {
    constructor(pen, cv) {
        this.pen = pen;
        this.cv = cv;
    }
    initSize(widthInch, heightInch) {
        if (!this.cv.RANGE_DONE)
            throw '[Pencil] Range must be set before Size';
        this.cv.widthInch = widthInch;
        this.cv.heightInch = heightInch;
        this.cv.SIZE_DONE = true;
    }
    initOuterBorder() {
        if (!this.cv.RANGE_DONE)
            throw '[Pencil] Range must be set before setting border';
        if (!this.cv.SIZE_DONE)
            throw '[Pencil] Size must be set before setting border';
        this.cv.addBorder(this.cv.$BORDER);
    }
    /**
     * Set the canvas size.
     * ```
     * pen.size.set(0.5,2) // width = 0.5 inch, height = 2 inch
     * ```
     */
    set(widthInch = 1, heightInch = widthInch) {
        this.initSize(widthInch, heightInch);
        if (this.cv.AUTO_BORDER)
            this.initOuterBorder();
        this.pen.set.reset();
    }
    /**
     * Set the canvas size by resolution.
     * ```
     * pen.size.resolution(0.1,0.2)
     * // 0.1 inch for each x-unit, and 0.2 inch for each y-unit
     * ```
     */
    resolution(xIPU = 0.1, yIPU = xIPU) {
        let xScale = this.cv.dx() * xIPU;
        let yScale = this.cv.dy() * yIPU;
        this.set(xScale, yScale);
    }
    /**
     * Set the canvas size, locking x-y ratio.
     * ```
     * pen.size.lock(1, 2) // max at width = 1 inch and height = 2 inch
     * pen.size.lock(0.5) // max at both = 0.5 inch
     * ```
     */
    lock(maxWidthInch = 1, maxHeightInch = maxWidthInch) {
        let ratio = this.cv.yxRatio();
        if (maxWidthInch * ratio < maxHeightInch) {
            this.set(maxWidthInch, maxWidthInch * ratio);
        }
        else {
            this.set(maxHeightInch / ratio, maxHeightInch);
        }
    }
}
