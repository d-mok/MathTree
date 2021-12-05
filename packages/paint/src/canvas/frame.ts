type Point2D = [number, number]
type pixel = number
type dot = [pixel, pixel]


export class Frame {
    /**
     * Total width in pixel
     */
    public wPixel: number = 0
    /**
     * Total height in pixel
     */
    public hPixel: number = 0
    /**
     * Min x-coord
     */
    public xmin: number = 0
    /**
     * Max x-coord
     */
    public xmax: number = 0
    /**
     * Min y-coord
     */
    public ymin: number = 0
    /**
     * Max y-coord
     */
    public ymax: number = 0
    /**
     * Distance from axis to number label in pixel.
     */
    private axisOffset: number = 5


    /**
     * Set the size of `wPixel` and `hPixel`.
     * @param wPixel - total width in pixel
     * @param hPixel - total height in pixel
     */
    setSize(wPixel: number, hPixel: number): void {
        this.wPixel = wPixel
        this.hPixel = hPixel
    }

    /**
     * Set the `xmin` and `xmax`.
     * @param xRange - `[xmin,xmax]`
     */
    setXRange(xRange: [number, number]): void {
        [this.xmin, this.xmax] = xRange;
    }


    /**
     * Set the `ymin` and `ymax`.
     * @param yRange - `[ymin,ymax]`
     */
    setYRange(yRange: [number, number]): void {
        [this.ymin, this.ymax] = yRange;
    }


    /**
     * Return the width in x-coord
     * @returns width in x-coord
     */
    xWidth(): number {
        return this.xmax - this.xmin;
    }

    /**
     * Return the height in y-coord
     * @returns height in y-coord
     */
    yHeight(): number {
        return this.ymax - this.ymin;
    }

    /**
     * How many pixel is one x-unit
     * @returns number of pixel
     */
    xUnit(): number {
        return this.wPixel / this.xWidth();
    }

    /**
     * How many pixel is one y-unit
     * @returns number of pixel
     */
    yUnit(): number {
        return this.hPixel / this.yHeight();
    }

    /**
     * Convert point from coord to pixel.
     * [xCoord, yCoord] -> [xPixel, yPixel]
     * @param point2D - the point in coord
     * @returns the point in pixel
     */
    toPix(point2D: Point2D): dot {
        const x = point2D[0];
        const y = point2D[1];
        const xPixel = (x - this.xmin) * this.xUnit();
        const yPixel = (this.ymax - y) * this.yUnit();
        return [xPixel, yPixel];
    }

    /**
     * Convert points from coord to pixel.
     * [xCoord, yCoord][] -> [xPixel, yPixel][]
     * @param point2Ds - the points in coord
     * @returns the points in pixel
     */
    toPixs(point2Ds: Point2D[]): dot[] {
        return point2Ds.map($ => this.toPix($))
    }

    /**
     * Convert point from pixel to coord.
     * [xPixel, yPixel] -> [xCoord, yCoord]
     * @param pixel2D - the point in pixel
     * @returns the point in coord
     */
    toCoord(pixel2D: dot): Point2D {
        const xPixel = pixel2D[0];
        const yPixel = pixel2D[1];
        const x = this.xmin + xPixel / this.xUnit();
        const y = this.ymax - yPixel / this.yUnit();
        return [x, y];
    }


    /**
     * Convert points from pixel to coord.
     * [xPixel, yPixel][] -> [xCoord, yCoord][]
     * @param pixel2Ds - the points in pixel
     * @returns the points in coord
     */
    toCoords(pixel2Ds: dot[]): Point2D[] {
        return pixel2Ds.map($ => this.toCoord($))
    }



    /**
     * Return the tick positions for x-axis, unit: coord.
     * @param interval - distance between ticks
     * @returns array of tick positions
     */
    xTicks(interval: number): number[] {
        return getTicks(this.xmin, this.xmax, interval);
    }


    /**
     * Return the tick positions for y-axis, unit: coord.
     * @param interval - distance between ticks
     * @returns array of tick positions
     */
    yTicks(interval: number): number[] {
        return getTicks(this.ymin, this.ymax, interval);
    }

    /**
     * Return the range object `[xmin, xmax]` in coord.
     * @returns the range of x-coord
     */
    xRange(): [number, number] {
        return [this.xmin, this.xmax];
    }

    /**
     * Return the range object `[ymin, ymax]` in coord.
     * @returns the range of y-coord
     */
    yRange(): [number, number] {
        return [this.ymin, this.ymax];
    }

    /**
     * Return the mid of `xmin` and `xmax`.
     * @returns the mid x-coord
     */
    xCenter(): number {
        return (this.xmin + this.xmax) / 2
    }


    /**
     * Return the mid of `ymin` and `ymax`.
     * @returns the mid y-coord
     */
    yCenter(): number {
        return (this.ymin + this.ymax) / 2
    }

    /**
     * Return the central point of xy-coord.
     * @returns the central point, unit: coord
     */
    xyCenter(): [number, number] {
        return [this.xCenter(), this.yCenter()]
    }


    /**
     * Return the offset from x-axis to number label, unit: coord.
     * @returns offset in coord
     */
    xOffset(): number {
        return this.axisOffset / this.yUnit()
    }

    /**
     * Return the offset from y-axis to number label, unit: coord.
     * @returns offset in coord
     */
    yOffset(): number {
        return this.axisOffset / this.xUnit()
    }
}






/**
 * Return an array of ticks position at `interval` within `[min,max]`.
 * Zero is always a potential tick position.
 * @param min - min value
 * @param max - max value
 * @param interval - distance between ticks
 * @returns array of tick positions
 * @example
 * ```
 * getTicks(2,10,3) // [3,6,9]
 * ```
 */
function getTicks(min: number, max: number, interval: number, includeZero: boolean = false): number[] {
    const start = Math.floor(min / interval) * interval;
    const arr = [];
    for (let i = start; i <= max; i += interval) {
        i = parseFloat(i.toPrecision(3));
        if (i === min || i === max) continue;
        if (!includeZero && i === 0) continue;
        arr.push(i);
    }
    return arr;
}