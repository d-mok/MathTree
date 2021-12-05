declare type pixel = number;
/**
 * Provide functions to operate on the canvas.
 */
export declare class Board {
    private readonly canvas;
    constructor(canvas: HTMLCanvasElement);
    private readonly ctx;
    private readonly PEN_QUALITY;
    private imgStore;
    init(width: pixel, height: pixel): void;
    toDataUrl(): string;
    save(): void;
    restore(): void;
    clear(): void;
    trim(): void;
    clone(): Board;
    /**
     * Return the width in pixel for display, i.e. canvas.width / PEN_QUALITY
     */
    displayWidth(): number;
    /**
     * Return the height in pixel for display, i.e. canvas.height / PEN_QUALITY
     */
    displayHeight(): number;
}
export {};
//# sourceMappingURL=Board.d.ts.map