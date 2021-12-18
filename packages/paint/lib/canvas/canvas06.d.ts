import { px, Point } from '../global';
import { Canvas05 } from './canvas05';
/**
 * Handle:
 * - direction helper
 */
export declare class Canvas06 extends Canvas05 {
    getDir(start: Point, end: Point): number;
    getCenterDir(point: Point): number;
    getDirAngle(A: Point, O: Point, B: Point): number;
    getMidDir(A: Point, O: Point, B: Point): number;
    getLineDir(A: Point, B: Point): number;
    polarFlip(A: Point, O: Point, B: Point): boolean;
    unitize(text: string | number): string;
    getAngleAllowance(A: Point, O: Point, B: Point, threshold: number, pixelPerDeg: px): px;
}
//# sourceMappingURL=canvas06.d.ts.map