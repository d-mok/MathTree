"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ink = void 0;
const Dial_1 = require("./Dial");
function deg(radian) {
    return radian / Math.PI * 180;
}
function rad(degree) {
    return degree * Math.PI / 180;
}
function dir(A, B) {
    let [dx, dy] = dotVec(A, B);
    let rad = -Math.atan2(dy, dx);
    return deg(rad);
}
function isEven(n) {
    return n % 2 === 0;
}
function isOdd(n) {
    return n % 2 !== 0;
}
function floorHalf(n) {
    if (isOdd(n))
        n = n - 1;
    return n / 2;
}
function steps(n) {
    let N = floorHalf(n);
    let arr = [];
    if (isOdd(n)) {
        arr.push(0);
        for (let i = 1; i <= N; i++) {
            arr.push(i);
            arr.push(-i);
        }
    }
    else {
        for (let i = 1; i <= N; i++) {
            let s = i - 0.5;
            arr.push(s);
            arr.push(-s);
        }
    }
    return arr;
}
function dotVec([x1, y1], [x2, y2]) {
    return [x2 - x1, y2 - y1];
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
function moveDotX([x, y], dist) {
    return [x + dist, y];
}
function moveDotY([x, y], dist) {
    return [x, y + dist];
}
function mid(A, B) {
    return scaleDot(addDot(A, B), 0.5);
}
/**
 * Provide drawing function in terms of pixel.
 */
class Ink {
    constructor(ctx) {
        this.ctx = ctx;
        this.dial = new Dial_1.Dial(this.ctx);
    }
    // rect
    moveTo(dot) {
        let [x, y] = dot;
        this.ctx.moveTo(x, y);
    }
    lineTo(dot) {
        let [x, y] = dot;
        this.ctx.lineTo(x, y);
    }
    createPath(dots) {
        this.ctx.beginPath();
        if (dots.length === 0)
            return;
        this.moveTo(dots[0]);
        for (let i = 1; i < dots.length; i++) {
            this.lineTo(dots[i]);
        }
    }
    createShape(dots) {
        this.createPath(dots);
        this.ctx.closePath();
    }
    track(dots) {
        this.createPath(dots);
        this.ctx.stroke();
    }
    line(...dots) {
        this.track(dots);
    }
    shape(dots) {
        this.createShape(dots);
        this.ctx.stroke();
    }
    fill(dots) {
        this.createShape(dots);
        this.ctx.fill();
    }
    // circle
    createArcPath(center, radius, angle) {
        let [x, y] = center;
        let [q1, q2] = angle;
        q1 = -rad(q1);
        q2 = -rad(q2);
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, q1, q2, true);
    }
    arc(center, radius, angle) {
        this.createArcPath(center, radius, angle);
        this.ctx.stroke();
    }
    segment(center, radius, angle) {
        this.createArcPath(center, radius, angle);
        this.ctx.fill();
    }
    circle(center, radius) {
        this.arc(center, radius, [0, 360]);
    }
    disc(center, radius) {
        this.segment(center, radius, [0, 360]);
    }
    // advanced
    arrow(start, end, length, width, offset) {
        this.dial.save();
        this.dial.translateTo(end);
        this.dial.rotateAlong(start, end);
        let A = [offset - length, -width];
        let O = [offset, 0];
        let B = [offset - length, +width];
        this.track([A, O, B]);
        this.dial.restore();
    }
    anglePolar(A, O, B, radius, count, space) {
        let q1 = dir(O, A);
        let q2 = dir(O, B);
        for (let s of steps(count)) {
            let r = radius + s * space;
            this.arc(O, r, [q1, q2]);
        }
    }
    rightAngle(A, O, B, size) {
        let P = moveDot(O, A, size);
        let Q = moveDot(O, B, size);
        let R = addDot(Q, dotVec(O, P));
        this.track([P, R, Q]);
    }
    parallel(start, end, size, count, space) {
        let M = mid(start, end);
        for (let i = 0; i < count; i++) {
            this.arrow(start, M, size * 2, size, i * space);
        }
    }
    tick(start, end, length, offset) {
        this.dial.save();
        this.dial.translateTo(end);
        this.dial.rotateAlong(start, end);
        let A = [offset, -length];
        let B = [offset, +length];
        this.line(A, B);
        this.dial.restore();
    }
    tickVert(dot, length) {
        let A = moveDotY(dot, -length);
        let B = moveDotY(dot, +length);
        this.line(A, B);
    }
    tickHori(dot, length) {
        let A = moveDotX(dot, -length);
        let B = moveDotX(dot, +length);
        this.line(A, B);
    }
    equalSide(start, end, length, count, space) {
        let M = mid(start, end);
        for (let s of steps(count)) {
            this.tick(start, M, length, s * space);
        }
    }
    compass(center, xSize, ySize, arrowSize) {
        this.dial.save();
        this.dial.translateTo(center);
        let E = [xSize, 0];
        let W = [-xSize, 0];
        let S = [0, ySize];
        let N = [0, -ySize];
        let A = [-arrowSize, -ySize + arrowSize * 2];
        let B = [+arrowSize, -ySize + arrowSize * 2];
        this.line(E, W);
        this.line(N, S);
        this.line(A, N, B);
        this.dial.restore();
    }
}
exports.Ink = Ink;
//# sourceMappingURL=Ink.js.map