import { Point2D, Point } from '../global';
import { Canvas10 } from './canvas10';
export declare class Pencil {
    protected cv: Canvas10;
    private RANGE_DONE;
    private SIZE_DONE;
    protected pj(pt: Point): Point2D;
    protected pjs(pts: Point[]): Point2D[];
    /**
     * Set the coordinate range of the canvas.
     * @param xRange - [xmin,xmax] in coordinates
     * @param yRange - [ymin,ymax] in coordinates
     */
    protected initRange([xmin, xmax]: [number, number], [ymin, ymax]: [number, number]): void;
    /**
     * Set the physical size of the canvas.
     * @param widthInch - width of canvas in scaled unit, 1 unit = SIZE_SCALE (=10) * REM_PIXEL pixel
     * @param heightInch - height of canvas in scaled unit.
     */
    protected initSize(widthInch: number, heightInch: number): void;
    /**
     * Set a border by extending the range and size.
     * The original image will be unchanged. The size will be bigger.
     */
    protected initOuterBorder(): void;
}
//# sourceMappingURL=pencil.d.ts.map