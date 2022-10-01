import { Canvas09 } from './canvas09';
import { blur } from '../support/blur';
function degrize(text) {
    return typeof text === 'number' ? blur(text) + '°' : text;
}
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
 * - label
 */
export class Canvas10 extends Canvas09 {
    labelPoint(text, point, dir, radius) {
        this.label(text, point, radius, dir);
    }
    labelPointAuto(text, point, radius) {
        let dir = this.getCenterDir(point);
        this.label(text, point, radius, dir);
    }
    labelAngle(text, [A, O, B], dir, radius) {
        let T = degrize(text);
        let mid = this.getMidDir(A, O, B);
        this.label(T, O, radius, mid + dir);
    }
    labelLine(text, [A, B], dir, radius) {
        text = this.unitize(text);
        let M = mid(A, B);
        let normal = this.getLineDir(A, B);
        this.label(text, M, radius, normal + dir);
    }
    labelFront(text, [A, B], dir, radius) {
        let arrowDir = this.getDir(A, B);
        this.labelPoint(text, B, arrowDir + dir, radius);
    }
}
//# sourceMappingURL=canvas10.js.map