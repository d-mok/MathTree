import { dot, inch, Point2D } from '../global';
import { Canvas00 } from './canvas00';
/**
 * Handle:
 * - 2D coordinate definition
 * - 2D coordinate to px conversion
 */
export declare class Canvas01 extends Canvas00 {
    xmin: number;
    xmax: number;
    ymin: number;
    ymax: number;
    dx(): number;
    dy(): number;
    yxRatio(): number;
    center(): Point2D;
    edgeTop(x?: number): Point2D;
    edgeBottom(x?: number): Point2D;
    edgeLeft(y?: number): Point2D;
    edgeRight(y?: number): Point2D;
    origin(): Point2D;
    private isXVisible;
    private isYVisible;
    isVisible(point: Point2D, buffer?: number): boolean;
    private toTopEdge;
    private toBottomEdge;
    private toRightEdge;
    private toLeftEdge;
    edgePoint(anchor: Point2D, dir: number): Point2D;
    protected capturePoints2D(pts: Point2D[]): void;
    protected fixCollapsedRange(): void;
    addBorder(borderInch: inch): void;
    protected point2DtoPx(point: Point2D): dot;
}
//# sourceMappingURL=canvas01.d.ts.map