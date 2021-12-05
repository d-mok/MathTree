"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dial = void 0;
/**
 * Provide functions to control the state of the ctx.
 */
class Dial {
    constructor(ctx) {
        this.ctx = ctx;
    }
    setWeight(weight = 1) {
        this.ctx.lineWidth = weight;
    }
    setStrokeColor(color = "black") {
        this.ctx.strokeStyle = color;
    }
    setFillColor(color = "black") {
        this.ctx.fillStyle = color;
    }
    setColor(color = "black") {
        this.setStrokeColor(color);
        this.setFillColor(color);
    }
    setAlpha(opaque = 1) {
        this.ctx.globalAlpha = opaque;
    }
    setDash(segments = []) {
        if (Array.isArray(segments))
            this.ctx.setLineDash(segments);
        if (typeof segments === 'number')
            this.setDash([segments, segments]);
        if (typeof segments === 'boolean')
            this.setDash(segments ? [5, 5] : []);
    }
    setTextAlign(align = "center") {
        this.ctx.textAlign = align;
    }
    setTextBaseline(baseline = "middle") {
        this.ctx.textBaseline = baseline;
    }
    setTextPixel(pixel) {
        pixel = Math.round(pixel);
        this.ctx.font = this.ctx.font.replace(/\d+px/g, pixel + 'px');
    }
    // public setTextSize(size = 1): void {
    //     let px = Math.round(size * REM_PIXEL)
    //     this.setTextPixel(px)
    // }
    getTextPixel() {
        let match = this.ctx.font.match(/(\d+)px/);
        if (match === null)
            return NaN;
        return Number.parseInt(match[1]);
    }
    setTextItalic(italic = false) {
        if (italic) {
            if (!this.getTextItalic())
                this.ctx.font = 'italic ' + this.ctx.font;
        }
        else {
            this.ctx.font = this.ctx.font.replace('italic ', '');
        }
    }
    getTextItalic() {
        return this.ctx.font.includes('italic');
    }
    save() {
        this.ctx.save();
    }
    restore() {
        this.ctx.restore();
    }
    // public scale(widthRatio: number, heightRatio: number): void {
    //     this.ctx.scale(widthRatio, heightRatio)
    // }
    translate(x, y) {
        this.ctx.translate(x, y);
    }
    translateTo(dot) {
        let [x, y] = dot;
        this.ctx.translate(x, y);
    }
    rotate(degreePolar) {
        this.ctx.rotate(-degreePolar * Math.PI / 180);
    }
    rotateAlong(start, end) {
        let [x1, y1] = start;
        let [x2, y2] = end;
        let dx = x2 - x1;
        let dy = y2 - y1;
        let q = Math.atan2(dy, dx);
        this.ctx.rotate(q);
    }
}
exports.Dial = Dial;
//# sourceMappingURL=Dial.js.map