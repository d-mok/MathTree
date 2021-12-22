import { Canvas05 } from './canvas05';
// math
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
// polar
function vec(p1, p2) {
    let [x1, y1] = p1;
    let [x2, y2] = p2;
    return [x2 - x1, y2 - y1];
}
function cross2D(vec1, vec2) {
    let [x1, y1] = vec1;
    let [x2, y2] = vec2;
    return x1 * y2 - y1 * x2;
}
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
/**
 * Handle:
 * - direction helper
 */
export class Canvas06 extends Canvas05 {
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
    // string
    unitize(text) {
        if (typeof text === 'number') {
            text = String(text);
            let unit = this.$LENGTH_UNIT;
            if (unit === '')
                return text;
            return this.$TEXT_LATEX
                ? text + `~\\text{${unit}}`
                : text + ' ' + unit;
        }
        else {
            return text;
        }
    }
    // Find the extra pixel allowance when drawing angle arc and angle label for small angles.
    getAngleAllowance(A, O, B, threshold, pixelPerDeg) {
        let angle = this.getDirAngle(A, O, B);
        let angleUnderThreshold = Math.max(threshold - angle, 0);
        return angleUnderThreshold * pixelPerDeg;
    }
}
//# sourceMappingURL=canvas06.js.map