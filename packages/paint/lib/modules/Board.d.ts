declare type pixel = number;
/**
 * Provide functions to operate meta data on the canvas.
 */
export declare class Board {
    private readonly canvas;
    constructor(canvas: HTMLCanvasElement);
    private readonly ctx;
    private imgStore;
    private bgImgUrl;
    init(width: pixel, height: pixel): void;
    toDataUrl(): string;
    save(): void;
    restore(): void;
    clear(): void;
    trim(): void;
    private clone;
    private displayWidth;
    private displayHeight;
    setBgImgUrl(url: string): void;
    private bgAttr;
    export(html: string, placeholder: string, trim: boolean): string;
}
export {};
//# sourceMappingURL=Board.d.ts.map