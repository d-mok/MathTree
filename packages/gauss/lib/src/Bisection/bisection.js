import _ from 'lodash';
import { rndSignedPoint } from './random';
export function Bisection(eq, ranges) {
    if (!ranges.some(([min, max]) => max > min)) {
        throw '[bisection] all variables are locked already';
    }
    let a = rndSignedPoint(eq, ranges, 1); // positive point
    let b = rndSignedPoint(eq, ranges, -1); // negative point
    function iterate() {
        const m = _.zipWith(a, b, (i, j) => (i + j) / 2); // mid-pt
        const M = eq(...m);
        if (!Number.isFinite(M)) {
            throw '[bisection] The function value is not a finite number!';
        }
        if (M >= 0)
            a = m;
        if (M <= 0)
            b = m;
    }
    function done() {
        const PRECISION = 12;
        const precision_a = a.map($ => $.toPrecision(PRECISION));
        const precision_b = b.map($ => $.toPrecision(PRECISION));
        return _.isEqual(precision_a, precision_b);
    }
    try {
        for (let i = 0; i < 100; i++) {
            iterate();
            if (done())
                return a.map(round10);
        }
        throw '[bisection] fail to find tolarable solution after 100 iteration';
    }
    catch {
        throw '[bisection] An error occur during bisection.';
    }
}
export function round10(num) {
    return parseFloat(num.toPrecision(10));
}
//# sourceMappingURL=bisection.js.map