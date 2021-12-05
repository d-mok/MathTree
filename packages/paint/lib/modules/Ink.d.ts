declare type pixel = number;
declare type dot = [pixel, pixel];
/**
 * Provide drawing function in terms of pixel.
 */
export declare class Ink {
    private readonly ctx;
    constructor(ctx: CanvasRenderingContext2D);
    private dial;
    private moveTo;
    private lineTo;
    private createPath;
    private createShape;
    track(dots: dot[]): void;
    line(...dots: dot[]): void;
    shape(dots: dot[]): void;
    fill(dots: dot[]): void;
    private createArcPath;
    arc(center: dot, radius: pixel, angle: [number, number]): void;
    segment(center: dot, radius: pixel, angle: [number, number]): void;
    circle(center: dot, radius: pixel): void;
    disc(center: dot, radius: pixel): void;
    arrow(start: dot, end: dot, length: pixel, width: pixel, offset: pixel): void;
    anglePolar(A: dot, O: dot, B: dot, radius: pixel, count: number, space: pixel): void;
    rightAngle(A: dot, O: dot, B: dot, size: pixel): void;
    parallel(start: dot, end: dot, size: pixel, count: number, space: pixel): void;
    tick(start: dot, end: dot, length: pixel, offset: pixel): void;
    tickVert(dot: dot, length: pixel): void;
    tickHori(dot: dot, length: pixel): void;
    equalSide(start: dot, end: dot, length: pixel, count: number, space: pixel): void;
    compass(center: dot, xSize: pixel, ySize: pixel, arrowSize: pixel): void;
}
export {};
//# sourceMappingURL=Ink.d.ts.map