import { px, dot, Point } from '../global.js';
import { Canvas03 } from './canvas03.js';
/**
 * Handle:
 * - transform
 * - drawing in pixel and coordinates
 */
export declare class Canvas04 extends Canvas03 {
    protected translateTo(pt: Point): void;
    protected rotate(degreePolar: number): void;
    protected rotateTo(start: Point, end: Point): void;
    protected alignTo(start: Point, end: Point): void;
    protected moveToPx([x, y]: dot): void;
    protected lineToPx([x, y]: dot): void;
    protected createPathPx(dots: dot[]): void;
    protected createShapePx(dots: dot[]): void;
    protected moveTo(pt: Point): void;
    protected lineTo(pt: Point): void;
    protected createPath(pts: Point[]): void;
    protected createShape(pts: Point[]): void;
    protected createArc(center: Point, radius: px, angle: [number, number]): void;
    protected createArcByPoints(P: Point, O: Point, Q: Point, radius: px): void;
    protected createRightAnglePath(P: Point, O: Point, Q: Point, size: px): void;
    protected doStroke(): void;
    protected doSolid(): void;
    protected doDash(): void;
    protected doFill(): void;
    protected doShade(): void;
}
//# sourceMappingURL=canvas04.d.ts.map