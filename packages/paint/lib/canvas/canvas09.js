import { Canvas08 } from './canvas08.js';
import { trace, splitNull } from '../support/trace.js';
import { sectoroid } from '../support/sectoroid.js';
/**
 * Handle:
 * - plot
 */
export class Canvas09 extends Canvas08 {
    plot(func, tStart = this.xmin, tEnd = this.xmax, dots = 1000) {
        let points = trace(func, [tStart, tEnd], dots);
        // let { xmin, xmax, ymin, ymax } = this
        // let X = xmax - xmin
        // let Y = ymax - ymin
        // function outOfRange([x, y]: Point2D): boolean {
        //     return x > xmax + X || x < xmin - X || y > ymax + Y || y < ymin - Y
        // }
        let isIll = (p) => {
            let [x, y] = p;
            return (!Number.isFinite(x) ||
                !Number.isFinite(y) ||
                !this.isVisible(p, 1));
        };
        let filteredPoints = points.map(p => (isIll(p) ? null : p));
        let segments = splitNull(filteredPoints);
        for (let seg of segments)
            this.line(seg);
    }
    sectoroidLine(O, A, B, vertices) {
        let pts = sectoroid(O, A, B, vertices);
        this.line(pts);
    }
    sectoroidFill(O, A, B, vertices) {
        let pts = sectoroid(O, A, B, vertices);
        this.fill(pts);
    }
    sectoroidShade(O, A, B, vertices) {
        let pts = sectoroid(O, A, B, vertices);
        this.shade(pts);
    }
}
//# sourceMappingURL=canvas09.js.map