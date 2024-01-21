import { cal } from '../index.js';
function slope(A, B) {
    let [x1, y1] = A;
    let [x2, y2] = B;
    return (y2 - y1) / (x2 - x1);
}
function midpoint(A, B) {
    let [x1, y1] = A;
    let [x2, y2] = B;
    return [(x1 + x2) / 2, (y1 + y2) / 2];
}
export class Linear {
    constructor() {
        this._linear = [NaN, NaN, NaN];
        this.defined = false;
    }
    byLinear(linear) {
        this._linear = linear;
        this.defined = true;
        return this;
    }
    byStandard(standard) {
        let [a, b, _c] = standard;
        this.byLinear([a, b, -_c]);
        return this;
    }
    byTwoPoints(p1, p2) {
        let [x1, y1] = p1;
        let [x2, y2] = p2;
        let dx = x1 - x2;
        let dy = y1 - y2;
        if (dx === 0 && dy === 0)
            return this;
        let [a, b, c] = [dy, -dx, dx * y1 - dy * x1];
        let s = Math.sign(a) || Math.sign(b) || 1;
        [a, b, c] = [a, b, c].map($ => $ * s);
        try {
            ;
            [a, b, c] = cal.toRatio([a, b, c]);
        }
        catch (e) { }
        this.byLinear([a, b, c]);
        return this;
    }
    byPointSlope(p, m) {
        let p2 = [p[0] + 1, p[1] + m];
        this.byTwoPoints(p, p2);
        return this;
    }
    byIntercepts(x, y) {
        if (x === 0 || y === 0)
            return this;
        this.byTwoPoints([x, 0], [0, y]);
        return this;
    }
    byBisector(A, B) {
        let [x1, y1] = A;
        let [x2, y2] = B;
        if (x1 === x2 && y1 === y2)
            return this;
        if (x1 === x2) {
            this.byLinear([0, 1, -(y1 + y2) / 2]);
        }
        else if (y1 === y2) {
            this.byLinear([1, 0, -(x1 + x2) / 2]);
        }
        else {
            let m = -1 / slope(A, B);
            let M = midpoint(A, B);
            this.byPointSlope(M, m);
        }
        return this;
    }
    slope() {
        let [a, b, c] = this._linear;
        return b === 0 ? NaN : -a / b;
    }
    xInt() {
        let [a, b, c] = this._linear;
        return a === 0 ? NaN : -c / a;
    }
    yInt() {
        let [a, b, c] = this._linear;
        return b === 0 ? NaN : -c / b;
    }
    toLinear() {
        if (!this.defined)
            return [NaN, NaN, NaN];
        return this._linear;
    }
    toLine() {
        if (!this.defined)
            return [NaN, NaN];
        return [this.slope(), this.yInt()];
    }
    toStandard() {
        if (!this.defined)
            return [NaN, NaN, NaN];
        let [a, b, c] = this._linear;
        return [a, b, -c];
    }
    toConstraint(ineq) {
        let [a, b, c] = this.toStandard();
        return [a, b, ineq, c];
    }
}
/**
 * Return a `Linear` instance.
 */
export function lin() {
    return new Linear();
}
//# sourceMappingURL=linear.js.map