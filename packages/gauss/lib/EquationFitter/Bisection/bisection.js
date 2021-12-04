"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bisection = void 0;
function randomUniform(range) {
    const [min, max] = range;
    return Math.random() * (max - min) + min;
}
function randomLog(range) {
    const [min, max] = range;
    const logmin = Math.log10(min);
    const logmax = Math.log10(max);
    const e = randomUniform([logmin, logmax]);
    return 10 ** e;
}
function randomLogNeg(range) {
    const [minNeg, maxNeg] = range;
    const min = -maxNeg;
    const max = -minNeg;
    return -randomLog([min, max]);
}
function randomValue(range) {
    let [min, max] = range;
    if (min > 0 && max > 0)
        return randomLog(range);
    if (min < 0 && max < 0)
        return randomLogNeg(range);
    return randomUniform(range);
}
function mid(a, b) {
    return a.map(($, i) => ($ + b[i]) / 2);
}
function equal(a, b) {
    return a.every(($, i) => $ === b[i])
        && a.length === b.length;
}
class Bisection {
    constructor(equation, ranges) {
        this.equation = equation;
        this.ranges = ranges;
        this.a = []; // positive point
        this.b = []; // negative point
        this.precision = 10;
    }
    randomPoint() {
        return this.ranges.map(randomValue);
    }
    randomSignedPoint(sign) {
        for (let i = 0; i < 100; i++) {
            const point = this.randomPoint();
            const value = this.equation(...point);
            const sameSign = value * sign > 0;
            if (sameSign)
                return point;
        }
        console.error("[bisection] No signed point in ranges: " + JSON.stringify(this.ranges));
        throw '';
    }
    intialize() {
        this.a = this.randomSignedPoint(1);
        this.b = this.randomSignedPoint(-1);
    }
    iterate() {
        const m = mid(this.a, this.b);
        const M = this.equation(...m);
        if (!Number.isFinite(M)) {
            console.error('[bisection] The function value is not a finite number!');
            throw '';
        }
        if (M >= 0)
            this.a = m;
        if (M <= 0)
            this.b = m;
    }
    done() {
        const precision_a = this.a.map($ => $.toPrecision(this.precision));
        const precision_b = this.b.map($ => $.toPrecision(this.precision));
        return equal(precision_a, precision_b);
    }
    assertRange() {
        const pass = this.ranges.some(([min, max]) => max > min);
        if (!pass) {
            console.error('[bisection] all variables are locked already');
            throw '';
        }
    }
    run() {
        this.assertRange();
        this.intialize();
        for (let i = 0; i < 100; i++) {
            this.iterate();
            if (this.done())
                return [...this.a];
        }
        console.error('[bisection] fail to find tolarable solution after 100 iteration');
        throw '';
    }
    exec() {
        try {
            return this.run();
        }
        catch {
            throw '[bisection] An error occur during bisection.';
        }
    }
}
exports.Bisection = Bisection;
//# sourceMappingURL=bisection.js.map