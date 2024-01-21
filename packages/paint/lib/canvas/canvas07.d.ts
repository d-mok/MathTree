import { px, Point } from '../global.js';
import { Canvas06 } from './canvas06.js';
/**
 * Handle:
 * - basic elements
 */
export declare class Canvas07 extends Canvas06 {
    private linePx;
    private solidPx;
    line(pts: Point[]): void;
    lineVert(x: number): void;
    lineHori(y: number): void;
    solid(pts: Point[]): void;
    dash(pts: Point[]): void;
    shape(pts: Point[]): void;
    fill(pts: Point[]): void;
    shade(pts: Point[]): void;
    arc(P: Point, O: Point, Q: Point, radius: px): void;
    solidArc(P: Point, O: Point, Q: Point, radius: px): void;
    circle(center: Point, radius: px): void;
    disc(center: Point, radius: px): void;
    halo(center: Point, radius: px): void;
    arrowHead(start: Point, end: Point, size: px, offset: px): void;
    arrow(start: Point, end: Point, size: px): void;
    anglePolar(A: Point, O: Point, B: Point, radius: px, count: number, space: px): void;
    angle(A: Point, O: Point, B: Point, radius: px, count: number, space: px): void;
    rightAngle(A: Point, O: Point, B: Point, size: px): void;
    parallel(start: Point, end: Point, size: px, count: number, space: px): void;
    midArrowHead(start: Point, end: Point, size: px): void;
    tick(start: Point, end: Point, length: px, offset: px): void;
    tickVert(pt: Point, length: px): void;
    tickHori(pt: Point, length: px): void;
    equalSide(start: Point, end: Point, length: px, count: number, space: px): void;
    compass(center: Point, xSize: px, ySize: px, arrowSize: px): void;
}
//# sourceMappingURL=canvas07.d.ts.map