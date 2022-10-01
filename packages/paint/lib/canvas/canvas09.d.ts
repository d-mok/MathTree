import { Point2D } from '../global';
import { Canvas08 } from './canvas08';
/**
 * Handle:
 * - plot
 */
export declare class Canvas09 extends Canvas08 {
    plot(func: ((t: number) => number) | ((t: number) => Point2D), tStart?: number, tEnd?: number, dots?: number): void;
    sectoroidLine(O: Point2D, A: Point2D, B: Point2D, vertices: Point2D[]): void;
    sectoroidFill(O: Point2D, A: Point2D, B: Point2D, vertices: Point2D[]): void;
    sectoroidShade(O: Point2D, A: Point2D, B: Point2D, vertices: Point2D[]): void;
}
//# sourceMappingURL=canvas09.d.ts.map