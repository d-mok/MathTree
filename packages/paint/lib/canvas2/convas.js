"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convas = exports.cross2D = exports.vec = exports.cos = exports.sin = void 0;
const basic_canvas_1 = require("./basic_canvas");
// math
function rad(degree) {
    return degree * Math.PI / 180;
}
function deg(radian) {
    return radian / Math.PI * 180;
}
function dotVec([x1, y1], [x2, y2]) {
    return [x2 - x1, y2 - y1];
}
function dir(A, B) {
    let [dx, dy] = dotVec(A, B);
    let rad = -Math.atan2(dy, dx);
    return deg(rad);
}
function scaleDot([x, y], ratio) {
    return [x * ratio, y * ratio];
}
function dist(A, B) {
    let [dx, dy] = dotVec(A, B);
    return (dx * dx + dy * dy) ** 0.5;
}
function addDot([x1, y1], [x2, y2]) {
    return [x1 + x2, y1 + y2];
}
function scaleDotTo(A, length) {
    let oldLength = dist([0, 0], A);
    let ratio = length / oldLength;
    return scaleDot(A, ratio);
}
function moveDot(A, B, dist) {
    let AB = dotVec(A, B);
    let d = scaleDotTo(AB, dist);
    return addDot(A, d);
}
function sin(degree) {
    return Math.sin(degree / 180 * Math.PI);
}
exports.sin = sin;
function cos(degree) {
    return Math.cos(degree / 180 * Math.PI);
}
exports.cos = cos;
// polar
function vec(p1, p2) {
    let [x1, y1] = p1;
    let [x2, y2] = p2;
    return [x2 - x1, y2 - y1];
}
exports.vec = vec;
function cross2D(vec1, vec2) {
    let [x1, y1] = vec1;
    let [x2, y2] = vec2;
    return x1 * y2 - y1 * x2;
}
exports.cross2D = cross2D;
/**
 * @return check if the polar angle AOB is reflex
 * ```
 * IsReflex([1,0],[0,0],[0,2]) // false
 * IsReflex([2,2],[1,1],[1,3]) // false
 * IsReflex([1,3],[1,1],[2,2]) // true
 * ```
 */
function IsReflex(A, O, B) {
    let OA = vec(O, A);
    let OB = vec(O, B);
    return cross2D(OA, OB) < 0;
}
function polarFlip(A, O, B, mode) {
    let isReflex = IsReflex(A, O, B);
    if (mode === 'normal' && isReflex)
        return true;
    if (mode === 'reflex' && !isReflex)
        return true;
    return false;
}
// latex
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
// Const
const DEFAULT_SHADE_ALPHA = 0.1;
class Convas extends basic_canvas_1.BasicCanvas {
    // transform
    translateTo(pt) {
        let [x, y] = this.toPx(pt);
        this.ctx.translate(x, y);
    }
    rotate(degreePolar) {
        this.ctx.rotate(-rad(degreePolar));
    }
    rotateTo(start, end) {
        let [x1, y1] = this.toPx(start);
        let [x2, y2] = this.toPx(end);
        let dx = x2 - x1;
        let dy = y2 - y1;
        let q = Math.atan2(dy, dx);
        this.ctx.rotate(q);
    }
    alignTo(start, end) {
        this.translateTo(end);
        this.rotateTo(start, end);
    }
    // straight drawer in px
    moveToPx([x, y]) {
        this.ctx.moveTo(x, y);
    }
    lineToPx([x, y]) {
        this.ctx.lineTo(x, y);
    }
    createPathPx(dots) {
        this.ctx.beginPath();
        if (dots.length === 0)
            return;
        let [first, ...rest] = dots;
        this.moveToPx(first);
        for (let d of rest) {
            this.lineToPx(d);
        }
    }
    createShapePx(dots) {
        this.createPathPx(dots);
        this.ctx.closePath();
    }
    // drawer in coord
    moveTo(pt) {
        let [x, y] = this.toPx(pt);
        this.ctx.moveTo(x, y);
    }
    lineTo(pt) {
        let [x, y] = this.toPx(pt);
        this.ctx.lineTo(x, y);
    }
    createPath(pts) {
        this.ctx.beginPath();
        if (pts.length === 0)
            return;
        let [first, ...rest] = pts;
        this.moveTo(first);
        for (let p of rest) {
            this.lineTo(p);
        }
    }
    createShape(pts) {
        this.createPath(pts);
        this.ctx.closePath();
    }
    createArc(center, radius, angle) {
        let [x, y] = this.toPx(center);
        let [q1, q2] = angle;
        q1 = -rad(q1);
        q2 = -rad(q2);
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, q1, q2, true);
    }
    createArcByPoints(P, O, Q, radius) {
        let p = this.toPx(P);
        let o = this.toPx(O);
        let q = this.toPx(Q);
        let q1 = dir(o, p);
        let q2 = dir(o, q);
        this.createArc(O, radius, [q1, q2]);
    }
    createRightAnglePath(P, O, Q, size) {
        let p = this.toPx(P);
        let o = this.toPx(O);
        let q = this.toPx(Q);
        let a = moveDot(o, p, size);
        let b = moveDot(o, q, size);
        let c = addDot(b, dotVec(o, a));
        this.createPathPx([a, c, b]);
    }
    // finishing
    doStroke() {
        this.ctx.stroke();
    }
    doSolid() {
        let dash = this.$DASH;
        this.$DASH = false;
        this.ctx.stroke();
        this.$DASH = dash;
    }
    doDash() {
        let dash = this.$DASH;
        this.$DASH = true;
        this.ctx.stroke();
        this.$DASH = dash;
    }
    doFill() {
        this.ctx.fill();
    }
    doShade() {
        let alpha = this.$ALPHA;
        this.$ALPHA = DEFAULT_SHADE_ALPHA;
        this.ctx.fill();
        this.$ALPHA = alpha;
    }
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
    // label in coord
    textDodge(text, point, radius, dodge) {
        let textWidth = this.textSemi(text);
        let xOffset = (radius + textWidth - 5) * cos(dodge);
        let yOffset = radius * sin(dodge);
        this.text(text, point, [xOffset, yOffset]);
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
    // dir
    getDir(start, end) {
        let A = this.toPx(start);
        let B = this.toPx(end);
        return dir(A, B);
    }
    getCenterDir(point) {
        let C = this.$LABEL_CENTER[0];
        return this.getDir(C, point);
    }
    getDirAngle(A, O, B) {
        let flip = this.polarFlip(A, O, B);
        let [P, Q] = flip ? [B, A] : [A, B];
        // draw like polar
        let a = this.getDir(O, P);
        let b = this.getDir(O, Q);
        return a <= b ? b - a : 360 + b - a;
    }
    getMidDir(A, O, B) {
        let flip = this.polarFlip(A, O, B);
        let [P, Q] = flip ? [B, A] : [A, B];
        // draw like polar
        let a1 = this.getDir(O, P);
        let a2 = this.getDir(O, Q);
        if (a2 < a1)
            a2 += 360;
        return (a1 + a2) / 2;
    }
    getLineDir(A, B) {
        let q = this.getDir(A, B);
        let mode = this.$LINE_LABEL;
        if (mode === 'left')
            return q + 90;
        if (mode === 'right')
            return q - 90;
        let [a, b, c] = this.pjs([A, B, this.$LABEL_CENTER[0]]);
        let right = IsReflex(a, b, c);
        return right ? q - 90 : q + 90;
    }
    polarFlip(A, O, B) {
        let [a, o, b] = this.pjs([A, O, B]);
        return polarFlip(a, o, b, this.$ANGLE_MODE);
    }
    // other
    unitize(text) {
        text = String(text);
        let unit = this.$LENGTH_UNIT;
        if (unit === '')
            return text;
        if (this.$TEXT_LATEX) {
            return text + `~\\text{${unit}}`;
        }
        else {
            return text + ' ' + unit;
        }
    }
}
exports.Convas = Convas;
//# sourceMappingURL=convas.js.map