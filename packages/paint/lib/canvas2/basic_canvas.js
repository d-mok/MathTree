"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicCanvas = void 0;
// pixel conversion
function toPixelX(xmin, xmax, width, xCoord) {
    return (xCoord - xmin) / (xmax - xmin) * width;
}
function toPixelY(ymin, ymax, height, yCoord) {
    return height - (yCoord - ymin) / (ymax - ymin) * height;
}
function proj(point3D, angle, depth) {
    let a = angle * Math.PI / 180;
    let s = Math.sin(a);
    let c = Math.cos(a);
    let [x, y, z] = point3D;
    let x_new = x + depth * y * c;
    let y_new = z + depth * y * s;
    return [x_new, y_new];
}
function forceProj(point, angle, depth) {
    return point.length === 3 ? proj(point, angle, depth) : point;
}
function segmentArray(seg) {
    if (Array.isArray(seg))
        return seg;
    if (typeof seg === 'number')
        return [seg, seg];
    if (typeof seg === 'boolean')
        return seg ? [5, 5] : [];
    return [];
}
// Const
const QUALITY = 3;
const SIZE_SCALE = 10;
/**
 * REM_PIXEL is the default font size of the browser, usually 16px
 */
const REM_PIXEL = parseFloat(getComputedStyle(document.documentElement).fontSize);
/**
 * handle all config
 */
class BasicCanvas {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext("2d");
        this.imgStore = null;
        this.states = [];
        this.backgroundURL = "";
        // coord
        this.xmin = 0;
        this.xmax = 0;
        this.ymin = 0;
        this.ymax = 0;
        // user setting
        this.$3D_ANGLE = 60;
        this.$3D_DEPTH = 0.5;
        this.$TEXT_DIR = 0;
        this.$TEXT_LATEX = false;
        this.$ANGLE_MODE = 'normal';
        this.$LENGTH_UNIT = '';
        this.$BORDER = 0.2;
        this.$LINE_LABEL = 'auto';
        this._$LABEL_CENTER = this.center();
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
    // size
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
    // init
    initRange(xRange, yRange) {
        this.xmin = xRange[0];
        this.xmax = xRange[1];
        this.ymin = yRange[0];
        this.ymax = yRange[1];
    }
    initSize(width, height) {
        this.width = width * SIZE_SCALE * REM_PIXEL;
        this.height = height * SIZE_SCALE * REM_PIXEL;
    }
    // border
    setBorder() {
        const borderPix = this.$BORDER * SIZE_SCALE * REM_PIXEL;
        let borderXUnit = (this.xmax - this.xmin) * borderPix / this.width;
        let borderYUnit = (this.ymax - this.ymin) * borderPix / this.height;
        this.xmin -= borderXUnit;
        this.xmax += borderXUnit;
        this.ymin -= borderYUnit;
        this.ymax += borderYUnit;
        this.width += 2 * borderPix;
        this.height += 2 * borderPix;
    }
    // // conversion
    pj(point) {
        return forceProj(point, this.$3D_ANGLE, this.$3D_DEPTH);
    }
    pjs(points) {
        return points.map($ => this.pj($));
    }
    toPx(point) {
        let pt = this.pj(point);
        let [xCoord, yCoord] = pt;
        let x = toPixelX(this.xmin, this.xmax, this.width, xCoord);
        let y = toPixelY(this.ymin, this.ymax, this.height, yCoord);
        return [x, y];
    }
    // native settings
    get $WEIGHT() {
        return this.ctx.lineWidth;
    }
    set $WEIGHT(value) {
        this.ctx.lineWidth = value;
    }
    get $COLOR() {
        let c = this.ctx.fillStyle;
        return typeof c === 'string' ? c : '';
    }
    set $COLOR(value) {
        this.ctx.strokeStyle = value;
        this.ctx.fillStyle = value;
    }
    get $ALPHA() {
        return this.ctx.globalAlpha;
    }
    set $ALPHA(value) {
        this.ctx.globalAlpha = value;
    }
    get $DASH() {
        return this.ctx.getLineDash();
    }
    set $DASH(value) {
        let seg = segmentArray(value);
        this.ctx.setLineDash(seg);
    }
    get $TEXT_ALIGN() {
        return this.ctx.textAlign;
    }
    set $TEXT_ALIGN(value) {
        this.ctx.textAlign = value;
    }
    get $TEXT_BASELINE() {
        return this.ctx.textBaseline;
    }
    set $TEXT_BASELINE(value) {
        this.ctx.textBaseline = value;
    }
    get $TEXT_PIXEL() {
        let match = this.ctx.font.match(/(\d+)px/);
        if (match === null)
            return NaN;
        return Number.parseInt(match[1]);
    }
    set $TEXT_PIXEL(value) {
        value = Math.round(value);
        this.ctx.font = this.ctx.font.replace(/\d+px/g, value + 'px');
    }
    get $TEXT_SIZE() {
        return this.$TEXT_PIXEL / REM_PIXEL;
    }
    set $TEXT_SIZE(value) {
        this.$TEXT_PIXEL = value * REM_PIXEL;
    }
    get $TEXT_ITALIC() {
        return this.ctx.font.includes('italic');
    }
    set $TEXT_ITALIC(value) {
        this.ctx.font = this.ctx.font.replace('italic ', '');
        if (value)
            this.ctx.font = 'italic ' + this.ctx.font;
    }
    set $LABEL_CENTER(centers) {
        // TEMP, true to be deleted
        let empty = centers.length === 0;
        this._$LABEL_CENTER = empty ? this.center() : meanPoint(this.pjs(centers));
    }
    get $LABEL_CENTER() {
        return [this._$LABEL_CENTER];
    }
    // setting meta
    save() {
        this.ctx.save();
        this.states.push({
            $3D_ANGLE: this.$3D_ANGLE,
            $3D_DEPTH: this.$3D_DEPTH,
            $TEXT_DIR: this.$TEXT_DIR,
            $TEXT_LATEX: this.$TEXT_LATEX,
            $LABEL_CENTER: this.$LABEL_CENTER,
            $ANGLE_MODE: this.$ANGLE_MODE,
            $LENGTH_UNIT: this.$LENGTH_UNIT,
            $BORDER: this.$BORDER,
            $LINE_LABEL: this.$LINE_LABEL
        });
    }
    restore() {
        this.ctx.restore();
        let state = this.states.pop();
        if (state === undefined)
            return;
        this.$3D_ANGLE = state.$3D_ANGLE;
        this.$3D_DEPTH = state.$3D_DEPTH;
        this.$TEXT_DIR = state.$TEXT_DIR;
        this.$TEXT_LATEX = state.$TEXT_LATEX;
        this.$LABEL_CENTER = state.$LABEL_CENTER;
        this.$ANGLE_MODE = state.$ANGLE_MODE;
        this.$LENGTH_UNIT = state.$LENGTH_UNIT;
        this.$BORDER = state.$BORDER;
        this.$LINE_LABEL = state.$LINE_LABEL;
    }
    // image store
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
    // export
    export(html, placeholder, trim) {
        let cv = cloneCanvas(this.canvas);
        if (trim)
            trimCanvas(cv);
        const displayWidth = Math.floor(cv.width / QUALITY);
        const displayHeight = Math.floor(cv.height / QUALITY);
        const src = 'src="' + cv.toDataURL() + '"';
        const width = ' width="' + displayWidth + '"';
        const height = ' height="' + displayHeight + '"';
        const bg = this.backgroundURL.length === 0 ?
            '' :
            ` style="background-image:url('${this.backgroundURL}');background-size:100% 100%;" `;
        return html.replace('src="' + placeholder + '"', src + width + height + bg);
    }
}
exports.BasicCanvas = BasicCanvas;
function meanPoint(Points) {
    if (Points.length === 0)
        return [0, 0];
    let X = 0;
    let Y = 0;
    for (let p of Points) {
        X += p[0];
        Y += p[1];
    }
    let n = Points.length;
    return [X / n, Y / n];
}
/**
 * Trim the canvas in-place.
 */
function trimCanvas(canvas) {
    function rowBlank(imageData, width, y) {
        for (var x = 0; x < width; ++x) {
            if (imageData.data[y * width * 4 + x * 4 + 3] !== 0)
                return false;
        }
        return true;
    }
    function columnBlank(imageData, width, x, top, bottom) {
        for (var y = top; y < bottom; ++y) {
            if (imageData.data[y * width * 4 + x * 4 + 3] !== 0)
                return false;
        }
        return true;
    }
    var ctx = canvas.getContext("2d");
    var width = canvas.width;
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var top = 0, bottom = imageData.height, left = 0, right = imageData.width;
    while (top < bottom && rowBlank(imageData, width, top))
        ++top;
    while (bottom - 1 > top && rowBlank(imageData, width, bottom - 1))
        --bottom;
    while (left < right && columnBlank(imageData, width, left, top, bottom))
        ++left;
    while (right - 1 > left && columnBlank(imageData, width, right - 1, top, bottom))
        --right;
    var trimmed = ctx.getImageData(left, top, right - left, bottom - top);
    canvas.width = trimmed.width;
    canvas.height = trimmed.height;
    ctx.putImageData(trimmed, 0, 0);
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
//# sourceMappingURL=basic_canvas.js.map