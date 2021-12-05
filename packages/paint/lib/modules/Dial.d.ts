declare type pixel = number;
declare type dot = [pixel, pixel];
/**
 * Provide functions to control the state of the ctx.
 */
export declare class Dial {
    protected readonly ctx: CanvasRenderingContext2D;
    constructor(ctx: CanvasRenderingContext2D);
    setWeight(weight?: number): void;
    setStrokeColor(color?: string): void;
    setFillColor(color?: string): void;
    setColor(color?: string): void;
    setAlpha(opaque?: number): void;
    setDash(segments?: (pixel[] | pixel | boolean)): void;
    setTextAlign(align?: CanvasTextAlign): void;
    setTextBaseline(baseline?: CanvasTextBaseline): void;
    setTextPixel(pixel: pixel): void;
    getTextPixel(): pixel;
    setTextItalic(italic?: boolean): void;
    getTextItalic(): boolean;
    save(): void;
    restore(): void;
    translate(x: pixel, y: pixel): void;
    translateTo(dot: dot): void;
    rotate(degreePolar: number): void;
    rotateAlong(start: dot, end: dot): void;
}
export {};
//# sourceMappingURL=Dial.d.ts.map