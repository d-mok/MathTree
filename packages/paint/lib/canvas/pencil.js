"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pencil = void 0;
const canvas10_1 = require("./canvas10");
class Pencil {
    constructor() {
        this.cv = new canvas10_1.Canvas10();
        this.RANGE_DONE = false;
        this.SIZE_DONE = false;
    }
    pj(pt) {
        return this.cv.pj(pt);
    }
    pjs(pts) {
        return this.cv.pjs(pts);
    }
    /**
     * Set the coordinate range of the canvas.
     * @param xRange - [xmin,xmax] in coordinates
     * @param yRange - [ymin,ymax] in coordinates
     */
    initRange([xmin, xmax], [ymin, ymax]) {
        this.cv.xmin = xmin;
        this.cv.xmax = xmax;
        this.cv.ymin = ymin;
        this.cv.ymax = ymax;
        this.RANGE_DONE = true;
    }
    /**
     * Set the physical size of the canvas.
     * @param widthInch - width of canvas in scaled unit, 1 unit = SIZE_SCALE (=10) * REM_PIXEL pixel
     * @param heightInch - height of canvas in scaled unit.
     */
    initSize(widthInch, heightInch) {
        if (!this.RANGE_DONE)
            throw '[Pencil] Range must be set before Size';
        this.cv.widthInch = widthInch;
        this.cv.heightInch = heightInch;
        this.SIZE_DONE = true;
    }
    /**
     * Set a border by extending the range and size.
     * The original image will be unchanged. The size will be bigger.
     */
    initOuterBorder() {
        if (!this.RANGE_DONE)
            throw '[Pencil] Range must be set before setting border';
        if (!this.SIZE_DONE)
            throw '[Pencil] Size must be set before setting border';
        this.cv.addBorder(this.cv.$BORDER);
    }
}
exports.Pencil = Pencil;
;
//# sourceMappingURL=pencil.js.map