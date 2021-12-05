declare type pixel = number;
declare type dot = [pixel, pixel];
/**
 * Provide writing function in terms of pixel.
 */
export declare class Feather {
    private readonly ctx;
    constructor(ctx: CanvasRenderingContext2D);
    private dial;
    private writePlain;
    private getLatexWidget;
    private writeLatex;
    write(text: string, dot: dot, dir: number, latex: boolean): void;
    private getPlainTextHalfWidth;
    private getLatexHalfWidth;
    getHalfWidth(text: string, latex: boolean): pixel;
}
export {};
//# sourceMappingURL=Feather.d.ts.map