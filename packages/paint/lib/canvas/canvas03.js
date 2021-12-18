"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Canvas03 = void 0;
const canvas02_1 = require("./canvas02");
function segmentArray(seg) {
    if (Array.isArray(seg))
        return seg;
    if (typeof seg === 'number')
        return [seg, seg];
    if (typeof seg === 'boolean')
        return seg ? [5, 5] : [];
    return [];
}
// REM_PIXEL is the default font size of the browser, usually 16px
const REM_PIXEL = parseFloat(getComputedStyle(document.documentElement).fontSize);
/**
 * Handle:
 * - Settings
 */
class Canvas03 extends canvas02_1.Canvas02 {
    constructor() {
        // native settings
        super(...arguments);
        // user setting
        this.$TEXT_DIR = 0;
        this.$TEXT_LATEX = false;
        this.$ANGLE_MODE = 'normal';
        this.$LENGTH_UNIT = '';
        this.$BORDER = 0.2;
        this.$LINE_LABEL = 'auto';
        this._$LABEL_CENTER = this.center();
        // setting meta
        this.states = [];
    }
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
    // parent setting
    get $3D_ANGLE() {
        return this.Proj_3D_Angle;
    }
    set $3D_ANGLE(value) {
        this.Proj_3D_Angle = value;
    }
    get $3D_DEPTH() {
        return this.Proj_3D_Depth;
    }
    set $3D_DEPTH(value) {
        this.Proj_3D_Depth = value;
    }
    set $LABEL_CENTER(centers) {
        let empty = centers.length === 0;
        this._$LABEL_CENTER = empty ? this.center() : mid(this.pjs(centers));
    }
    get $LABEL_CENTER() {
        return [this._$LABEL_CENTER];
    }
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
}
exports.Canvas03 = Canvas03;
function mid(Points) {
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
//# sourceMappingURL=canvas03.js.map