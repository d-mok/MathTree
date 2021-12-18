"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sectoroid = void 0;
const trace_1 = require("./trace");
function vec(p1, p2) {
    let [x1, y1] = p1;
    let [x2, y2] = p2;
    return [x2 - x1, y2 - y1];
}
function deg(radian) {
    return radian / Math.PI * 180;
}
function magnitude([x, y]) {
    return (x * x + y * y) ** 0.5;
}
function argument([x, y]) {
    let rad = Math.atan2(y, x);
    let angle = deg(rad);
    if (angle < 0)
        angle += 360;
    return angle;
}
function sectoroid(O, A, B, vertices) {
    let v1 = vec(O, A);
    let v2 = vec(O, B);
    let r = magnitude(v1);
    let q1 = argument(v1);
    let q2 = argument(v2);
    if (q2 < q1)
        q2 += 360;
    let points = (0, trace_1.traceCircle)(O, r, [q1, q2]);
    return [A, ...points, B, ...vertices];
}
exports.sectoroid = sectoroid;
//# sourceMappingURL=sectoroid.js.map