import { trimCanvas } from '../support/trim';
// The scale factor of canvas size for clearer image.
const QUALITY = 3;
// The scale factor for width and height settings.
const INCH_SCALE = 10;
// REM_PIXEL is the default font size of the browser, usually 16px
const REM_PIXEL = parseFloat(getComputedStyle(document.documentElement).fontSize);
function inchToPx(inch) {
    return inch * INCH_SCALE * REM_PIXEL;
}
function pxToInch(px) {
    return px / INCH_SCALE / REM_PIXEL;
}
/**
 * Handle:
 * - all canvas width and height issue
 * - save and restore canvas image
 * - exporting
 */
export class Canvas00 {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        // image store
        this.imgStore = null;
        // export
        this.backgroundURL = '';
    }
    // size in pixel
    reset() {
        this.ctx.scale(QUALITY, QUALITY);
        this.ctx.font = 'normal 10px Times New Roman';
    }
    get width() {
        return this.canvas.width / QUALITY;
    }
    set width(value) {
        this.canvas.width = value * QUALITY;
        this.reset();
    }
    get height() {
        return this.canvas.height / QUALITY;
    }
    set height(value) {
        this.canvas.height = value * QUALITY;
        this.reset();
    }
    // size in inch
    get widthInch() {
        return pxToInch(this.width);
    }
    set widthInch(value) {
        this.width = inchToPx(value);
    }
    get heightInch() {
        return pxToInch(this.height);
    }
    set heightInch(value) {
        this.height = inchToPx(value);
    }
    saveImg() {
        const w = this.canvas.width;
        const h = this.canvas.height;
        this.imgStore = this.ctx.getImageData(0, 0, w, h);
    }
    restoreImg() {
        if (this.imgStore !== null)
            this.ctx.putImageData(this.imgStore, 0, 0);
    }
    clearImg() {
        const w = this.canvas.width;
        const h = this.canvas.height;
        this.ctx.clearRect(0, 0, w, h);
    }
    export(html, placeholder, trim) {
        let cv = cloneCanvas(this.canvas);
        if (trim)
            trimCanvas(cv);
        const displayWidth = Math.floor(cv.width / QUALITY);
        const displayHeight = Math.floor(cv.height / QUALITY);
        const src = `src="${cv.toDataURL()}"`;
        const width = ` width="${displayWidth}"`;
        const height = ` height="${displayHeight}"`;
        const bg = this.backgroundURL.length === 0
            ? ''
            : ` style="background-image:url('${this.backgroundURL}');background-size:100% 100%;" `;
        return html.replace('src="' + placeholder + '"', src + width + height + bg);
    }
}
/**
 * Return a clone of the canvas.
 */
function cloneCanvas(canvas) {
    let oldCanvas = canvas;
    //create a new canvas
    let newCanvas = document.createElement('canvas');
    let context = newCanvas.getContext('2d');
    //set dimensions
    newCanvas.width = oldCanvas.width;
    newCanvas.height = oldCanvas.height;
    //apply the old canvas to the new one
    context.drawImage(oldCanvas, 0, 0);
    //return the new canvas
    return newCanvas;
}
//# sourceMappingURL=canvas00.js.map