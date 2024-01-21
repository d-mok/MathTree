import { Canvas00 } from './canvas00.js';
// pixel conversion
function toPixelX(xmin, xmax, width, xCoord) {
    return ((xCoord - xmin) / (xmax - xmin)) * width;
}
function toPixelY(ymin, ymax, height, yCoord) {
    return height - ((yCoord - ymin) / (ymax - ymin)) * height;
}
function sin(degree) {
    return Math.sin((degree / 180) * Math.PI);
}
function cos(degree) {
    return Math.cos((degree / 180) * Math.PI);
}
function tan(degree) {
    return Math.tan((degree / 180) * Math.PI);
}
/**
 * Handle:
 * - 2D coordinate definition
 * - 2D coordinate to px conversion
 */
export class Canvas01 extends Canvas00 {
    constructor() {
        // coord
        super(...arguments);
        this.xmin = 0;
        this.xmax = 0;
        this.ymin = 0;
        this.ymax = 0;
        // capture
        this.firstCapture = true;
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
    origin() {
        return [0, 0];
    }
    // check in sight
    isXVisible([x, y], buffer = 0) {
        let X = this.dx() * buffer;
        return this.xmin - X <= x && x <= this.xmax + X;
    }
    isYVisible([x, y], buffer = 0) {
        let Y = this.dy() * buffer;
        return this.ymin - Y <= y && y <= this.ymax + Y;
    }
    isVisible(point, buffer = 0) {
        return this.isXVisible(point, buffer) && this.isYVisible(point, buffer);
    }
    // find edge point
    toTopEdge([x, y], dir) {
        let Dy = this.ymax - y;
        let Dx = Dy / tan(dir);
        return [x + Dx, this.ymax];
    }
    toBottomEdge([x, y], dir) {
        let Dy = this.ymin - y;
        let Dx = Dy / tan(dir);
        return [x + Dx, this.ymin];
    }
    toRightEdge([x, y], dir) {
        let Dx = this.xmax - x;
        let Dy = Dx * tan(dir);
        return [this.xmax, y + Dy];
    }
    toLeftEdge([x, y], dir) {
        let Dx = this.xmin - x;
        let Dy = Dx * tan(dir);
        return [this.xmin, y + Dy];
    }
    edgePoint(anchor, dir) {
        if (!this.isVisible(anchor))
            return anchor;
        let [x, y] = anchor;
        let arr = [
            this.toTopEdge(anchor, dir),
            this.toBottomEdge(anchor, dir),
            this.toRightEdge(anchor, dir),
            this.toLeftEdge(anchor, dir),
        ];
        arr = arr
            .filter($ => this.isVisible($))
            .filter(([X, Y]) => (X - x) * cos(dir) >= 0)
            .filter(([X, Y]) => (Y - y) * sin(dir) >= 0);
        if (arr.length !== 1)
            console.error('edgePoint not unique! from:' + anchor + ' to:' + arr);
        return arr[0];
    }
    capturePoints2D(pts) {
        if (pts.length === 0)
            return;
        let first = pts[0];
        let xmin = this.firstCapture ? first[0] : this.xmin;
        let xmax = this.firstCapture ? first[0] : this.xmax;
        let ymin = this.firstCapture ? first[1] : this.ymin;
        let ymax = this.firstCapture ? first[1] : this.ymax;
        for (let [x, y] of pts) {
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
        this.firstCapture = false;
        this.fixCollapsedRange();
    }
    fixCollapsedRange() {
        let { xmin, xmax, ymin, ymax } = this;
        if (xmax === xmin) {
            xmax += 0.01;
            xmin -= 0.01;
        }
        if (ymax === ymin) {
            ymax += 0.01;
            ymin -= 0.01;
        }
        this.xmin = xmin;
        this.xmax = xmax;
        this.ymin = ymin;
        this.ymax = ymax;
    }
    // border
    addBorder(borderInch) {
        let borderXUnit = (this.dx() / this.widthInch) * borderInch;
        let borderYUnit = (this.dy() / this.heightInch) * borderInch;
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
//# sourceMappingURL=canvas01.js.map