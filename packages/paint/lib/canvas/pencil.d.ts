import { Frame } from './frame';
import { Board } from '../modules';
declare type Point2D = [number, number];
declare type Point3D = [number, number, number];
declare type Point = Point2D | Point3D;
declare type pixel = number;
export declare class Pencil {
    /**
     * @deprecated
     */
    protected canvas: HTMLCanvasElement;
    /**
     * @deprecated
     */
    ctx: CanvasRenderingContext2D;
    protected board: Board;
    private dial;
    private ink;
    private feather;
    protected frame: Frame;
    private INIT_RANGE_ALREADY;
    private INIT_SIZE_ALREADY;
    private state;
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
    private $TEXT_DIR;
    private $TEXT_LATEX;
    private $LABEL_CENTER;
    private $ANGLE_MODE;
    private $LENGTH_UNIT;
    private $3D_ANGLE;
    private $3D_DEPTH;
    private $BORDER;
    private $LINE_LABEL;
    protected pj(point: Point): Point2D;
    protected pjs(points: Point[]): Point2D[];
    protected setWeight(weight?: number): void;
    protected setStrokeColor(color?: string): void;
    protected setFillColor(color?: string): void;
    protected setColor(color?: string): void;
    protected setAlpha(opaque?: number): void;
    protected setDash(segments?: (number[] | number | boolean)): void;
    protected setTextAlign(align?: CanvasTextAlign): void;
    protected setTextBaseline(baseline?: CanvasTextBaseline): void;
    protected setTextSize(size?: number): void;
    protected setTextItalic(italic?: boolean): void;
    protected setTextDir(angle?: number): void;
    protected setTextLatex(on?: boolean): void;
    protected setLabelCenter(...centers: Point[] | [number] | [true]): void;
    protected setLengthUnit(text?: string | undefined): void;
    protected setAngleMode(mode?: 'normal' | 'polar' | 'reflex'): void;
    protected setProjector3D(angle?: number, depth?: number): void;
    protected setBorder(border?: number): void;
    protected setLineLabel(setting?: 'auto' | 'left' | 'right'): void;
    protected setDefault(): void;
    protected setAllDefault(): void;
    protected save(): void;
    protected restore(): void;
    private toPix;
    private toPixs;
    /**
     * Draw a stroke through the `points`.
     */
    protected drawStroke(points: Point[]): void;
    /**
     * Draw a stroke through the `points` to form a closed shape.
     */
    protected drawShape(points: Point[]): void;
    /**
     * Fill the closed shape formed by `points`.
     */
    protected drawFill(points: Point[]): void;
    /**
     * Shade the closed shape formed by `points`.
     */
    protected drawShade(points: Point[]): void;
    /**
     * Draw an arc.
     * @param center - the center of the arc's circle
     * @param radiusPixel - the radius in pixel
     * @param angleRange - polar angle range
     */
    protected drawArc(center: Point, radiusPixel: pixel, angleRange: [number, number]): void;
    /**
     * Draw a filled segment.
     * @param center - the center of the segment's circle
     * @param radiusPixel - the radius in pixel
     * @param angleRange - polar angle range
     */
    protected drawSegment(center: Point, radiusPixel: pixel, angleRange: [number, number]): void;
    /**
     * Draw a circle.
     * @param center - the center of the circle
     * @param radiusPixel - the radius in pixel
     */
    protected drawCircle(center: Point, radiusPixel: pixel): void;
    /**
     * Draw a dot, i.e. a filled circle.
     * @param center - the center of the circle
     * @param radiusPixel - the radius in pixel
     */
    protected drawDot(center: Point, radiusPixel: pixel): void;
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
     * Draw an arrow head at `endPoint`.
     * @param startPoint - start point of arrow, used to determine arrow direction only
     * @param endPoint - end point of arrow, where the arrow head will be drawn
     * @param length - length pixel along the arrow head
     * @param width - width pixel across the arrow on one side
     * @param offset - offset pixel along the arrow
     */
    protected drawArrowHead(startPoint: Point, endPoint: Point, size: pixel, offset: pixel): void;
    /**
     * Draw an angle.
     * @param point1 - first point
     * @param vertex - where the angle is
     * @param point2 - second point
     * @param radiusPixels - radius of angle mark in pixel
     */
    protected drawAngle(point1: Point, vertex: Point, point2: Point, radiusPixel: pixel, arcCount: number, spacePixel: pixel): void;
    /**
     * Draw a right angle.
     * @param point1 - first point
     * @param vertex - where the angle is
     * @param point2 - second point
     * @param sizePixel - size in pixel
     */
    protected drawRightAngle(point1: Point, vertex: Point, point2: Point, sizePixel: pixel): void;
    /**
     * Draw parallel mark
     * @param startPoint - start point of the line to decorate
     * @param endPoint -end point of the line to decorate
     * @param sizePixel - size of mark in pixel
     * @param tickCount - how many marks
     * @param spacePixel - space between marks in pixel
     */
    protected drawParallelMark(startPoint: Point, endPoint: Point, sizePixel: pixel, tickCount: number, spacePixel: pixel): void;
    /**
     * Draw a tick.
     * @param startPoint - start point of the line to tick, for direction only
     * @param tickPoint - where the tick is
     * @param lengthPixel - one-sided length of the tick in pixel
     * @param offsetPixel - offset of the tick position along the line, in pixel
     */
    protected drawTick(startPoint: Point, tickPoint: Point, lengthPixel: pixel, offsetPixel: pixel): void;
    /**
     * Draw a vertical tick.
     * @param position - where the tick is, in coordinates.
     * @param lengthPixel - one-sided length of the tick
     */
    protected drawTickVertical(position: Point, lengthPixel: pixel): void;
    /**
     * Draw a horizontal tick.
     * @param position - where the tick is, in coordinates.
     * @param lengthPixel - one-sided length of the tick
     */
    protected drawTickHorizontal(position: Point, lengthPixel: pixel): void;
    /**
     * Draw equal mark at the mid-pt of a line.
     * @param startPoint - start point of the line to decorate
     * @param endPoint - end point of the line to decorate
     * @param lengthPixel - one-sided length of the mark in pixel
     * @param tickCount - how many marks
     * @param spacePixel -space between the marks, in pixel
     */
    protected drawEqualMark(startPoint: Point, endPoint: Point, lengthPixel: pixel, tickCount: number, spacePixel: pixel): void;
    /**
     * Draw a compass.
     * @param center - position of compass center
     * @param xSizePixel - horizontal one-sided length of compass, in pixel
     * @param ySizePixel - vertical one-sided length of compass, in pixel
     * @param arrowSize - one-sided width of arrow head
     */
    protected drawCompass(center: Point, xSizePixel: pixel, ySizePixel: pixel, arrowSize: pixel): void;
    /**
     * Draw a plot of function.
     * @param func - the function to plot
     * @param tStart - start of parameter
     * @param tEnd - end of parameter
     * @param dots - total number of dots along the curve
     */
    protected drawPlot(func: ((t: number) => number) | ((t: number) => Point2D), tStart: number, tEnd: number, dots?: number): void;
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
     * Find the polar direction between two points, in the pixel world.
     * @param pStart - start point in coordinates
     * @param pEnd - end point in coordinates
     */
    protected getDirInPixel(pStart: Point, pEnd: Point): number;
    /**
     * Find the mid-ray direction given 3 points, in the pixel world.
     * Obey ANGLE_MODE.
     * @param point1 - first point, in coordinates.
     * @param vertex - where the angle is, in coordinates.
     * @param point2 - second point, in coordinates.
     */
    protected getDirInPixelByAngle(point1: Point, vertex: Point, point2: Point): number;
    /**
     * Find the left or right direction of a line, in the pixel world.
     * Obey LINE_LABEL.
     * If LINE_LABEL is 'auto', then away from LABEL_CENTER.
     * If LINE_LABEL is 'left', then on the left.
     * If LINE_LABEL is 'right', then on the right.
     * @param pStart - start point in coordinates
     * @param pEnd - end point in coordinates
     */
    protected getDirInPixelByLine(pStart: Point, pEnd: Point): number;
    private getLabelCenterDirInPixel;
    private getTextWidthInPixel;
    protected getTextWithLengthUnit(text: string | number): string;
    /**
     * Draw a text label around a point. The label dodges the point elliptically.
     * @param text - string to write
     * @param position - where to write, in coordinates
     * @param direction - polar angle to dodge, in the visible (pixel world) sense
     * @param radiusPixel - offset distance in pixel
     */
    protected drawLabel(text: string, position: Point, direction: number | undefined, radiusPixel: pixel): void;
    private makePolarAngle;
    /**
     * Find the angle in pixel world. Obey ANGLE_MODE.
     * @param point1 - first point, in coordinates.
     * @param vertex - where the angle is, in coordinates.
     * @param point2 - second point, in coordinates.
     */
    protected getAngleInPixel(point1: Point, vertex: Point, point2: Point): number;
    /**
     * Find the extra pixel allowance when drawing angle arc and angle label for small angles.
     * @param point1 - first point, in coordinates.
     * @param vertex - where the angle is, in coordinates.
     * @param point2 - second point, in coordinates.
     * @param angleThreshold - the max angle under which extra pixel is needed
     * @param pixelPerDegree - extra pixel per degree under the threshold
     */
    protected getSmallAngleExtraPixel(point1: Point, vertex: Point, point2: Point, angleThreshold: number, pixelPerDegree: pixel): pixel;
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