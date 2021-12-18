"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Canvas09 = void 0;
const canvas08_1 = require("./canvas08");
const trace_1 = require("../support/trace");
const sectoroid_1 = require("../support/sectoroid");
/**
 * Handle:
 * - plot
 */
class Canvas09 extends canvas08_1.Canvas08 {
    plot(func, tStart = this.xmin, tEnd = this.xmax, dots = 1000) {
        let points = (0, trace_1.trace)(func, [tStart, tEnd], dots);
        let { xmin, xmax, ymin, ymax } = this;
        let X = xmax - xmin;
        let Y = ymax - ymin;
        function outOfRange([x, y]) {
            return x > xmax + X || x < xmin - X || y > ymax + Y || y < ymin - Y;
        }
        function isIll(p) {
            let [x, y] = p;
            return !Number.isFinite(x) || !Number.isFinite(y) || outOfRange(p);
        }
        let filteredPoints = points.map(p => isIll(p) ? null : p);
        let segments = (0, trace_1.splitNull)(filteredPoints);
        for (let seg of segments)
            this.line(seg);
    }
    sectoroidLine(O, A, B, vertices) {
        let pts = (0, sectoroid_1.sectoroid)(O, A, B, vertices);
        this.line(pts);
    }
    sectoroidFill(O, A, B, vertices) {
        let pts = (0, sectoroid_1.sectoroid)(O, A, B, vertices);
        this.fill(pts);
    }
    sectoroidShade(O, A, B, vertices) {
        let pts = (0, sectoroid_1.sectoroid)(O, A, B, vertices);
        this.shade(pts);
    }
}
exports.Canvas09 = Canvas09;
//# sourceMappingURL=canvas09.js.map