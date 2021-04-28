/**
 * @ignore
 */
declare var PEN_QUALITY: number;
/**
 * @ignore
 */
declare class FrameCls {
    wPixel: number;
    hPixel: number;
    xmin: number;
    xmax: number;
    ymin: number;
    ymax: number;
    axisOffset: number;
    constructor();
    xWidth(): number;
    yHeight(): number;
    xUnit(): number;
    yUnit(): number;
    toPix(xyArr: Point): Point;
    toCoord(xyArr: Point): Point;
    private _ticks;
    xTicks(interval: number): number[];
    yTicks(interval: number): number[];
    xRange(): [number, number];
    yRange(): [number, number];
    xOffset(): number;
    yOffset(): number;
}
/**
 * @ignore
 */
declare var Frame: typeof FrameCls;
