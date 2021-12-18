"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Canvas01 = void 0;
const canvas00_1 = require("./canvas00");
// pixel conversion
function toPixelX(xmin, xmax, width, xCoord) {
    return (xCoord - xmin) / (xmax - xmin) * width;
}
function toPixelY(ymin, ymax, height, yCoord) {
    return height - (yCoord - ymin) / (ymax - ymin) * height;
}
/**
 * Handle:
 * - 2D coordinate definition
 * - 2D coordinate to px conversion
 */
class Canvas01 extends canvas00_1.Canvas00 {
    constructor() {
        // coord
        super(...arguments);
        this.xmin = 0;
        this.xmax = 0;
        this.ymin = 0;
        this.ymax = 0;
    }
    dx() {
        return this.xmax - this.xmin;
    }
    dy() {
        return this.ymax - this.ymin;
    }
    yxRatio() {
        return this.dy() / this.dx();
    }
    center() {
        let x = (this.xmin + this.xmax) / 2;
        let y = (this.ymin + this.ymax) / 2;
        return [x, y];
    }
    edgeTop(x = 0) {
        return [x, this.ymax];
    }
    edgeBottom(x = 0) {
        return [x, this.ymin];
    }
    edgeLeft(y = 0) {
        return [this.xmin, y];
    }
    edgeRight(y = 0) {
        return [this.xmax, y];
    }
    // capture
    capturePoints2D(pts) {
        if (pts.length === 0)
            return;
        let [first, ...rest] = pts;
        let xmin = first[0];
        let xmax = first[0];
        let ymin = first[1];
        let ymax = first[1];
        for (let [x, y] of rest) {
            if (x < xmin)
                xmin = x;
            if (x > xmax)
                xmax = x;
            if (y < ymin)
                ymin = y;
            if (y > ymax)
                ymax = y;
        }
        this.xmin = xmin;
        this.xmax = xmax;
        this.ymin = ymin;
        this.ymax = ymax;
    }
    fixCollapsedRange() {
        let { xmin, xmax, ymin, ymax } = this;
        let xSize = xmax - xmin;
        let ySize = ymax - ymin;
        if (xSize === 0 && ySize === 0) {
            xmax++;
            xmin--;
            ymax++;
            ymin--;
        }
        if (xSize === 0 && ySize !== 0) {
            xmax += ySize / 2;
            xmin -= ySize / 2;
        }
        if (xSize !== 0 && ySize === 0) {
            ymax += xSize / 2;
            ymin -= xSize / 2;
        }
        this.xmin = xmin;
        this.xmax = xmax;
        this.ymin = ymin;
        this.ymax = ymax;
    }
    // border
    addBorder(borderInch) {
        let borderXUnit = this.dx() / this.widthInch * borderInch;
        let borderYUnit = this.dy() / this.heightInch * borderInch;
        this.xmin -= borderXUnit;
        this.xmax += borderXUnit;
        this.ymin -= borderYUnit;
        this.ymax += borderYUnit;
        this.widthInch += 2 * borderInch;
        this.heightInch += 2 * borderInch;
    }
    // conversion
    point2DtoPx(point) {
        let [xCoord, yCoord] = point;
        let x = toPixelX(this.xmin, this.xmax, this.width, xCoord);
        let y = toPixelY(this.ymin, this.ymax, this.height, yCoord);
        return [x, y];
    }
}
exports.Canvas01 = Canvas01;
//# sourceMappingURL=canvas01.js.map