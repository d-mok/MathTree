"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Canvas05 = void 0;
const canvas04_1 = require("./canvas04");
function sin(degree) {
    return Math.sin(degree / 180 * Math.PI);
}
function cos(degree) {
    return Math.cos(degree / 180 * Math.PI);
}
// CanvasLatex is a library that must be imported from script tag
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
function isAlphabet(_) {
    return _.length === 1 && (_.toLowerCase() !== _.toUpperCase());
}
/**
 * Handle:
 * - text basic
 */
class Canvas05 extends canvas04_1.Canvas04 {
    // text in pixel
    plainPx(text, dot) {
        text = String(text);
        if (text === '')
            return;
        this.save();
        this.ctx.translate(...dot);
        this.rotate(this.$TEXT_DIR);
        this.ctx.fillText(text, 0, 0);
        this.restore();
    }
    latexPx(text, dot) {
        text = String(text);
        if (text === '')
            return;
        const widget = LatexWidget(text, this.$COLOR, this.$TEXT_PIXEL);
        const bounds = widget.getBounds();
        if (bounds === null) {
            console.error('[CanvasLatex] bounds === null! This is an unexpected error.');
            return;
        }
        this.save();
        this.ctx.translate(...dot);
        this.rotate(this.$TEXT_DIR);
        let xTune = latexTuneX(bounds.x, bounds.width, this.ctx.textAlign);
        let yTune = latexTuneY(bounds.y, bounds.height, this.ctx.textBaseline);
        this.ctx.translate(xTune, yTune);
        widget.draw(this.ctx);
        this.restore();
    }
    textPx(text, dot) {
        if (this.$TEXT_LATEX) {
            this.latexPx(text, dot);
        }
        else {
            this.plainPx(text, dot);
        }
    }
    // text in coord
    text(text, point, offset) {
        let [x, y] = this.toPx(point);
        x += offset[0];
        y -= offset[1];
        this.textPx(text, [x, y]);
    }
    // write in coord
    write(text, point) {
        this.text(text, point, [0, 0]);
    }
    // label in coord
    labelOffset(text, radius, dir) {
        let textWidth = this.textSemi(text);
        let x = (radius + textWidth - 5) * cos(dir);
        let y = radius * sin(dir);
        return [x, y];
    }
    label(text, point, radius, dir) {
        let italic = this.$TEXT_ITALIC;
        if (isAlphabet(text))
            this.$TEXT_ITALIC = true;
        let offset = this.labelOffset(text, radius, dir);
        this.text(text, point, offset);
        this.$TEXT_ITALIC = italic;
    }
    // text width
    plainSemi(text) {
        return this.ctx.measureText(text).width / 2;
    }
    latexSemi(text) {
        const widget = LatexWidget(text, this.$COLOR, this.$TEXT_PIXEL);
        const bounds = widget.getBounds();
        return bounds === null ? 0 : bounds.width / 2;
    }
    textSemi(text) {
        return this.$TEXT_LATEX ?
            this.latexSemi(text) :
            this.plainSemi(text);
    }
}
exports.Canvas05 = Canvas05;
//# sourceMappingURL=canvas05.js.map