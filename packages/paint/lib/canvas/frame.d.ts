declare type Point2D = [number, number];
declare type pixel = number;
declare type dot = [pixel, pixel];
export declare class Frame {
    /**
     * Total width in pixel
     */
    wPixel: number;
    /**
     * Total height in pixel
     */
    hPixel: number;
    /**
     * Min x-coord
     */
    xmin: number;
    /**
     * Max x-coord
     */
    xmax: number;
    /**
     * Min y-coord
     */
    ymin: number;
    /**
     * Max y-coord
     */
    ymax: number;
    /**
     * Distance from axis to number label in pixel.
     */
    private axisOffset;
    /**
     * Set the size of `wPixel` and `hPixel`.
     * @param wPixel - total width in pixel
     * @param hPixel - total height in pixel
     */
    setSize(wPixel: number, hPixel: number): void;
    /**
     * Set the `xmin` and `xmax`.
     * @param xRange - `[xmin,xmax]`
     */
    setXRange(xRange: [number, number]): void;
    /**
     * Set the `ymin` and `ymax`.
     * @param yRange - `[ymin,ymax]`
     */
    setYRange(yRange: [number, number]): void;
    /**
     * Return the width in x-coord
     * @returns width in x-coord
     */
    xWidth(): number;
    /**
     * Return the height in y-coord
     * @returns height in y-coord
     */
    yHeight(): number;
    /**
     * How many pixel is one x-unit
     * @returns number of pixel
     */
    xUnit(): number;
    /**
     * How many pixel is one y-unit
     * @returns number of pixel
     */
    yUnit(): number;
    /**
     * Convert point from coord to pixel.
     * [xCoord, yCoord] -> [xPixel, yPixel]
     * @param point2D - the point in coord
     * @returns the point in pixel
     */
    toPix(point2D: Point2D): dot;
    /**
     * Convert points from coord to pixel.
     * [xCoord, yCoord][] -> [xPixel, yPixel][]
     * @param point2Ds - the points in coord
     * @returns the points in pixel
     */
    toPixs(point2Ds: Point2D[]): dot[];
    /**
     * Convert point from pixel to coord.
     * [xPixel, yPixel] -> [xCoord, yCoord]
     * @param pixel2D - the point in pixel
     * @returns the point in coord
     */
    toCoord(pixel2D: dot): Point2D;
    /**
     * Convert points from pixel to coord.
     * [xPixel, yPixel][] -> [xCoord, yCoord][]
     * @param pixel2Ds - the points in pixel
     * @returns the points in coord
     */
    toCoords(pixel2Ds: dot[]): Point2D[];
    /**
     * Return the tick positions for x-axis, unit: coord.
     * @param interval - distance between ticks
     * @returns array of tick positions
     */
    xTicks(interval: number): number[];
    /**
     * Return the tick positions for y-axis, unit: coord.
     * @param interval - distance between ticks
     * @returns array of tick positions
     */
    yTicks(interval: number): number[];
    /**
     * Return the range object `[xmin, xmax]` in coord.
     * @returns the range of x-coord
     */
    xRange(): [number, number];
    /**
     * Return the range object `[ymin, ymax]` in coord.
     * @returns the range of y-coord
     */
    yRange(): [number, number];
    /**
     * Return the mid of `xmin` and `xmax`.
     * @returns the mid x-coord
     */
    xCenter(): number;
    /**
     * Return the mid of `ymin` and `ymax`.
     * @returns the mid y-coord
     */
    yCenter(): number;
    /**
     * Return the central point of xy-coord.
     * @returns the central point, unit: coord
     */
    xyCenter(): [number, number];
    /**
     * Return the offset from x-axis to number label, unit: coord.
     * @returns offset in coord
     */
    xOffset(): number;
    /**
     * Return the offset from y-axis to number label, unit: coord.
     * @returns offset in coord
     */
    yOffset(): number;
}
export {};
//# sourceMappingURL=frame.d.ts.map