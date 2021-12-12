import { ArmedConvas } from './armedconvas';
declare type Point2D = [number, number];
declare type Point3D = [number, number, number];
declare type Point = Point2D | Point3D;
declare type pixel = number;
export declare class Pencil {
    protected cv: ArmedConvas;
    private RANGE_DONE;
    private SIZE_DONE;
    /**
     * Set the coordinate range of the canvas.
     * @param xRange - [xmin,xmax] in coordinates
     * @param yRange - [ymin,ymax] in coordinates
     */
    protected initRange(xRange: [number, number], yRange: [number, number]): void;
    /**
     * Set the physical size of the canvas.
     * @param width - width of canvas in scaled unit, 1 unit = SIZE_SCALE (=10) * REM_PIXEL pixel
     * @param height - height of canvas in scaled unit.
     */
    protected initSize(width: number, height: number): void;
    /**
     * Set a border by extending the range and size.
     * The original image will be unchanged. The size will be bigger.
     */
    protected initOuterBorder(): void;
    private pathSectoroid;
    /**
     * Draw a stroke of a pseudo-sector
     */
    protected drawStrokeSectoroid(center: Point2D, pStart: Point2D, pEnd: Point2D, vertices: Point2D[]): void;
    /**
     * Fill a pseudo-sector
     */
    protected drawFillSectoroid(center: Point2D, pStart: Point2D, pEnd: Point2D, vertices: Point2D[]): void;
    /**
     * Shade a pseudo-sector
     */
    protected drawShadeSectoroid(center: Point2D, pStart: Point2D, pEnd: Point2D, vertices: Point2D[]): void;
    /**
     * Draw an angle.
     */
    protected drawAngle(A: Point, O: Point, B: Point, radiusPixel: pixel, arcCount: number, spacePixel: pixel): void;
    /**
     * Draw a plot of function.
     * @param func - the function to plot
     * @param tStart - start of parameter
     * @param tEnd - end of parameter
     * @param dots - total number of dots along the curve
     */
    protected drawPlot(func: ((t: number) => number) | ((t: number) => Point2D), tStart?: number, tEnd?: number, dots?: number): void;
    /**
     * Draw text.
     * @param text - string to draw
     * @param position - where to draw, in coordinates
     * @param xOffset - horizontal offset in pixel, right is positive
     * @param yOffset - vertical offset in pixel, up is positive
     * @returns
     */
    protected drawText(text: string, position: Point, xOffset: pixel, yOffset: pixel): void;
    /**
     * Draw a text label around a point. The label dodges the point elliptically.
     * @param text - string to write
     * @param position - where to write, in coordinates
     * @param direction - polar angle to dodge, in the visible (pixel world) sense
     * @param radiusPixel - offset distance in pixel
     */
    protected drawLabel(text: string, position: Point, direction: number | undefined, radiusPixel: pixel): void;
    /**
     * Find the extra pixel allowance when drawing angle arc and angle label for small angles.
     * @param A - first point, in coordinates.
     * @param O - where the angle is, in coordinates.
     * @param B - second point, in coordinates.
     * @param angleThreshold - the max angle under which extra pixel is needed
     * @param pixelPerDegree - extra pixel per degree under the threshold
     */
    protected getSmallAngleExtraPixel(A: Point, O: Point, B: Point, angleThreshold: number, pixelPerDegree: pixel): pixel;
    /**
     * Get the 4 corners of a circle. For .capture() to parse circle input.
     * @param center - center of circle
     * @param radius - radius of circle
     */
    protected getCircleCorners(center: Point2D, radius: number): [Point2D, Point2D, Point2D, Point2D];
    /**
     * Get the 8 corners of a sphere. For .capture() to parse sphere input.
     * @param center - center of sphere
     * @param radius - radius of sphere
     */
    protected getSphereCorners(center: Point3D, radius: number): [Point3D, Point3D, Point3D, Point3D, Point3D, Point3D, Point3D, Point3D];
    /**
     * Draw the x-axis.
     */
    protected drawXAxis(): void;
    /**
     * Draw the label of x-axis.
     * @param text - string to write
     */
    protected drawXAxisLabel(text: string): void;
    /**
     * Draw the y-axis.
     */
    protected drawYAxis(): void;
    /**
     * Draw the label of y-axis.
     * @param text - string to write
     */
    protected drawYAxisLabel(text: string): void;
    private xTicks;
    private yTicks;
    /**
     * Draw the ticks on x-axis.
     * @param interval - distance between tick, in coordinates.
     */
    protected drawXAxisTick(interval: number): void;
    /**
     * Draw the ticks on y-axis.
     * @param interval - distance between tick, in coordinates.
     */
    protected drawYAxisTick(interval: number): void;
    /**
     * Draw the number mark on the ticks on x-axis.
     * @param interval - distance between tick, in coordinates.
     */
    protected drawXAxisTickMark(interval: number): void;
    /**
     * Draw the number mark on the ticks on y-axis.
     * @param interval - distance between tick, in coordinates.
     */
    protected drawYAxisTickMark(interval: number): void;
    /**
     * Draw the vertical grid lines on the x-axis.
     * @param interval - distance between grids, in coordinates.
     */
    protected drawXAxisGrid(interval: number): void;
    /**
     * Draw the horizontal grid lines on the y-axis.
     * @param interval - distance between grids, in coordinates.
     */
    protected drawYAxisGrid(interval: number): void;
}
export {};
//# sourceMappingURL=pencil.d.ts.map