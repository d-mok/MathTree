"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Canvas07 = void 0;
const canvas06_1 = require("./canvas06");
// step
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
// vector
function mid(A, B) {
    if (A.length === 3 && B.length === 3) {
        let [x, y, z] = A;
        let [X, Y, Z] = B;
        return [(x + X) / 2, (y + Y) / 2, (z + Z) / 2];
    }
    else {
        let [x, y] = A;
        let [X, Y] = B;
        return [(x + X) / 2, (y + Y) / 2];
    }
}
/**
 * Handle:
 * - basic elements
 */
class Canvas07 extends canvas06_1.Canvas06 {
    linePx(dots) {
        this.createPathPx(dots);
        this.doStroke();
    }
    solidPx(dots) {
        this.createPathPx(dots);
        this.doSolid();
    }
    line(pts) {
        this.createPath(pts);
        this.doStroke();
    }
    lineVert(x) {
        let A = this.edgeBottom(x);
        let B = this.edgeTop(x);
        this.line([A, B]);
    }
    lineHori(y) {
        let A = this.edgeLeft(y);
        let B = this.edgeRight(y);
        this.line([A, B]);
    }
    solid(pts) {
        this.createPath(pts);
        this.doSolid();
    }
    dash(pts) {
        this.createPath(pts);
        this.doDash();
    }
    shape(pts) {
        this.createShape(pts);
        this.doStroke();
    }
    fill(pts) {
        this.createShape(pts);
        this.doFill();
    }
    shade(pts) {
        this.createShape(pts);
        this.doShade();
    }
    arc(P, O, Q, radius) {
        this.createArcByPoints(P, O, Q, radius);
        this.doStroke();
    }
    circle(center, radius) {
        this.createArc(center, radius, [0, 360]);
        this.doStroke();
    }
    disc(center, radius) {
        this.createArc(center, radius, [0, 360]);
        this.doFill();
    }
    // advanced
    arrowHead(start, end, size, offset) {
        this.save();
        this.translateTo(end);
        this.rotateTo(start, end);
        let A = [offset - 2 * size, -size];
        let O = [offset, 0];
        let B = [offset - 2 * size, +size];
        this.solidPx([A, O, B]);
        this.restore();
    }
    arrow(start, end, size) {
        this.line([start, end]);
        this.arrowHead(start, end, size, 0);
    }
    anglePolar(A, O, B, radius, count, space) {
        for (let s of steps(count)) {
            let r = radius + s * space;
            this.arc(A, O, B, r);
        }
    }
    angle(A, O, B, radius, count, space) {
        let flip = this.polarFlip(A, O, B);
        let [P, Q] = flip ? [B, A] : [A, B];
        // draw like polar
        this.anglePolar(P, O, Q, radius, count, space);
    }
    rightAngle(A, O, B, size) {
        this.createRightAnglePath(A, O, B, size);
        this.doSolid();
    }
    parallel(start, end, size, count, space) {
        let M = mid(start, end);
        for (let i = 0; i < count; i++) {
            this.arrowHead(start, M, size, i * space);
        }
    }
    tick(start, end, length, offset) {
        this.save();
        this.translateTo(end);
        this.rotateTo(start, end);
        let A = [offset, -length];
        let B = [offset, +length];
        this.solidPx([A, B]);
        this.restore();
    }
    tickVert(pt, length) {
        let [x, y] = pt;
        this.tick([x - 1, y], pt, length, 0);
    }
    tickHori(pt, length) {
        let [x, y] = pt;
        this.tick([x, y - 1], pt, length, 0);
    }
    equalSide(start, end, length, count, space) {
        let M = mid(start, end);
        for (let s of steps(count)) {
            this.tick(start, M, length, s * space);
        }
    }
    compass(center, xSize, ySize, arrowSize) {
        this.save();
        this.translateTo(center);
        let E = [xSize, 0];
        let W = [-xSize, 0];
        let S = [0, ySize];
        let N = [0, -ySize];
        let A = [-arrowSize, -ySize + arrowSize * 2];
        let B = [+arrowSize, -ySize + arrowSize * 2];
        this.solidPx([E, W]);
        this.solidPx([N, S]);
        this.solidPx([A, N, B]);
        this.restore();
    }
}
exports.Canvas07 = Canvas07;
//# sourceMappingURL=canvas07.js.map