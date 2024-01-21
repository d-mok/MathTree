import { px, inch } from '../global.js';
/**
 * Handle:
 * - all canvas width and height issue
 * - save and restore canvas image
 * - exporting
 */
export declare class Canvas00 {
    protected canvas: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D;
    private reset;
    protected get width(): px;
    protected set width(value: px);
    protected get height(): px;
    protected set height(value: px);
    get widthInch(): inch;
    set widthInch(value: inch);
    get heightInch(): inch;
    set heightInch(value: inch);
    private imgStore;
    saveImg(): void;
    restoreImg(): void;
    clearImg(): void;
    backgroundURL: string;
    export(html: string, placeholder: string, trim: boolean): string;
}
//# sourceMappingURL=canvas00.d.ts.map