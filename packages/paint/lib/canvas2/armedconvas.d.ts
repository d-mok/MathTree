import { Convas } from "./convas";
declare type px = number;
declare type Point2D = [number, number];
declare type Point3D = [number, number, number];
declare type Point = Point2D | Point3D;
export declare class ArmedConvas extends Convas {
    private linePx;
    private solidPx;
    line(pts: Point[]): void;
    solid(pts: Point[]): void;
    dash(pts: Point[]): void;
    shape(pts: Point[]): void;
    fill(pts: Point[]): void;
    shade(pts: Point[]): void;
    arc(P: Point, O: Point, Q: Point, radius: px): void;
    circle(center: Point, radius: px): void;
    disc(center: Point, radius: px): void;
    arrow(start: Point, end: Point, size: px, offset: px): void;
    anglePolar(A: Point, O: Point, B: Point, radius: px, count: number, space: px): void;
    rightAngle(A: Point, O: Point, B: Point, size: px): void;
    parallel(start: Point, end: Point, size: px, count: number, space: px): void;
    tick(start: Point, end: Point, length: px, offset: px): void;
    tickVert(pt: Point, length: px): void;
    tickHori(pt: Point, length: px): void;
    equalSide(start: Point, end: Point, length: px, count: number, space: px): void;
    compass(center: Point, xSize: px, ySize: px, arrowSize: px): void;
}
export {};
//# sourceMappingURL=armedconvas.d.ts.map