import { Canvas03 } from './canvas03';
function rad(degree) {
    return (degree * Math.PI) / 180;
}
function deg(radian) {
    return (radian / Math.PI) * 180;
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
/**
 * Handle:
 * - transform
 * - drawing in pixel and coordinates
 */
export class Canvas04 extends Canvas03 {
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
    // straight drawer in coord
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
    // arc drawer
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
        const DEFAULT_SHADE_ALPHA = 0.1;
        let alpha = this.$ALPHA;
        this.$ALPHA = DEFAULT_SHADE_ALPHA;
        this.ctx.fill();
        this.$ALPHA = alpha;
    }
}
//# sourceMappingURL=canvas04.js.map