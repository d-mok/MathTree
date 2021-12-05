"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feather = void 0;
const Dial_1 = require("./Dial");
/**
 * CanvasLatex is a library that must be imported from script tag
 */
function LatexWidget(text, color, size) {
    text = `\\color{${color}} ` + text;
    // @ts-ignore
    const widget = new CanvasLatex.default(text, {
        displayMode: true,
        debugBounds: false,
        baseSize: size
    });
    return widget;
}
function latexTuneX(x, width, textAlign) {
    if (textAlign === 'left')
        return -x;
    if (textAlign === 'right')
        return -x - width;
    if (textAlign === 'center')
        return -x - width / 2;
    return -x - width / 2;
}
function latexTuneY(y, height, textBaseline) {
    if (textBaseline === 'top')
        return -y;
    if (textBaseline === 'bottom')
        return -y - height;
    if (textBaseline === 'middle')
        return -y - height / 2;
    return -y / 2;
}
/**
 * Provide writing function in terms of pixel.
 */
class Feather {
    constructor(ctx) {
        this.ctx = ctx;
        this.dial = new Dial_1.Dial(this.ctx);
    }
    // text
    writePlain(text, dot, dir) {
        text = String(text);
        if (text === '')
            return;
        this.dial.save();
        this.dial.translateTo(dot);
        this.dial.rotate(dir);
        this.ctx.fillText(text, 0, 0);
        this.dial.restore();
    }
    getLatexWidget(text) {
        let color = this.ctx.fillStyle;
        if (typeof color !== 'string')
            color = 'black';
        let size = this.dial.getTextPixel();
        return LatexWidget(text, color, size);
    }
    writeLatex(text, dot, dir) {
        text = String(text);
        if (text === '')
            return;
        const widget = this.getLatexWidget(text);
        const bounds = widget.getBounds();
        if (bounds === null) {
            console.error('[CanvasLatex] bounds === null! This is an unexpected error.');
            return;
        }
        this.dial.save();
        this.dial.translateTo(dot);
        this.dial.rotate(dir);
        let xTune = latexTuneX(bounds.x, bounds.width, this.ctx.textAlign);
        let yTune = latexTuneY(bounds.y, bounds.height, this.ctx.textBaseline);
        this.dial.translate(xTune, yTune);
        widget.draw(this.ctx);
        this.dial.restore();
    }
    write(text, dot, dir, latex) {
        if (latex) {
            this.writeLatex(text, dot, dir);
        }
        else {
            this.writePlain(text, dot, dir);
        }
    }
    // text width
    getPlainTextHalfWidth(text) {
        return this.ctx.measureText(text).width / 2;
    }
    getLatexHalfWidth(text) {
        const widget = this.getLatexWidget(text);
        const bounds = widget.getBounds();
        if (bounds === null)
            return 0;
        return bounds.width / 2;
    }
    getHalfWidth(text, latex) {
        return latex ?
            this.getLatexHalfWidth(text) :
            this.getPlainTextHalfWidth(text);
    }
}
exports.Feather = Feather;
//# sourceMappingURL=Feather.js.map