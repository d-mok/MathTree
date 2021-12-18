"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Canvas02 = void 0;
const canvas01_1 = require("./canvas01");
const capture_1 = require("../support/capture");
function proj(point3D, angle, depth) {
    let a = angle * Math.PI / 180;
    let s = Math.sin(a);
    let c = Math.cos(a);
    let [x, y, z] = point3D;
    let x_new = x + depth * y * c;
    let y_new = z + depth * y * s;
    return [x_new, y_new];
}
function forceProj(point, angle, depth) {
    return point.length === 3
        ? proj(point, angle, depth)
        : point;
}
/**
 * Handle:
 * - 3D coordinate to px conversion
 * - capturing things
 */
class Canvas02 extends canvas01_1.Canvas01 {
    constructor() {
        // setting
        super(...arguments);
        this.Proj_3D_Angle = 60;
        this.Proj_3D_Depth = 0.5;
    }
    // conversion
    pj(point) {
        return forceProj(point, this.Proj_3D_Angle, this.Proj_3D_Depth);
    }
    pjs(points) {
        return points.map($ => this.pj($));
    }
    toPx(point) {
        let pt = this.pj(point);
        return this.point2DtoPx(pt);
    }
    // capture
    capture(things) {
        let pts = (0, capture_1.thingsToPoints)(things);
        let pt2Ds = this.pjs(pts);
        this.capturePoints2D(pt2Ds);
    }
}
exports.Canvas02 = Canvas02;
//# sourceMappingURL=canvas02.js.map