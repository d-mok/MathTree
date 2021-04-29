"use strict";
/**
 * @category Linear
 * @return [x-int,y-int,slope] of ax+by+c=0
 * ```typescript
 * LinearFeature(2,4,6) // [-3,-1.5,-0.5]
 * LinearFeature(0,4,6) // throw
 * ```
 */
function LinearFeature(a, b, c) {
    Should(IsNum(a, b, c), "input must be num");
    Should(IsNonZero(a, b), 'x and y term should be non-zero');
    let x = -c / a;
    let y = -c / b;
    let m = -a / b;
    return [x, y, m];
}
globalThis.LinearFeature = LinearFeature;
/**
 * @category Linear
 * @return [slope,yInt] from ax+by+c=0
 * ```typescript
 * LineFromLinear(2,4,6) // [-0.5,-1.5]
 * LineFromLinear(0,4,6) // [0,-1.5]
 * ```
 */
function LineFromLinear(a, b, c) {
    Should(IsNum(a, b, c), "input must be num");
    Should(IsNonZero(b), 'b should be non-zero');
    let m = -a / b;
    let y = -c / b;
    return [m, y];
}
globalThis.LineFromLinear = LineFromLinear;
/**
 * @category Linear
 * @return the coeff [a,b,c] in ax+by+c=0 from given intercepts
 * ```typescript
 * LinearFromIntercepts(1,2) // [2,1,-2]
 * LinearFromIntercepts(0,2) // throw
 * ```
 */
function LinearFromIntercepts(xInt, yInt) {
    return (new LinearEquation()).byIntercepts(xInt, yInt).linear();
}
globalThis.LinearFromIntercepts = LinearFromIntercepts;
/**
 * @category Linear
 * @return the coeff [a,b,c] in ax+by+c=0 from two given points
 * ```typescript
 * LinearFromTwoPoints([1,2],[3,4]) // [1,-1,1]
 * LinearFromTwoPoints([1,2],[1,2]) // throw
 * ```
 */
function LinearFromTwoPoints(point1, point2) {
    return (new LinearEquation()).byTwoPoints(point1, point2).linear();
}
globalThis.LinearFromTwoPoints = LinearFromTwoPoints;
/**
 * @category Linear
 * @return the coeff [a,b,c] in ax+by+c=0 from point and slope
 * ```typescript
 * LinearFromPointSlope([1,2],3) // [3,-1,-1]
 * LinearFromPointSlope([1,2],0) // [0,1,-2]
 * ```
 */
function LinearFromPointSlope(point, slope) {
    return (new LinearEquation()).byPointSlope(point, slope).linear();
}
globalThis.LinearFromPointSlope = LinearFromPointSlope;
/**
 * @category Linear
 * @return the coeff [a,b,c] in ax+by+c=0 from perpendicular bisector of AB
 * ```typescript
 * LinearFromBisector([1,2],[3,4]) // [1,1,-5]
 * LinearFromBisector([1,2],[1,4]) // [0,1,-3]
 * ```
 */
function LinearFromBisector(A, B) {
    return (new LinearEquation()).byBisector(A, B).linear();
}
globalThis.LinearFromBisector = LinearFromBisector;
/**
 * @category Linear
 * @return [slope,yInt] from given intercepts
 * ```typescript
 * LineFromIntercepts(1,2) // [-2,2]
 * LineFromIntercepts(0,2) // throw
 * ```
 */
function LineFromIntercepts(xInt, yInt) {
    return (new LinearEquation()).byIntercepts(xInt, yInt).line();
}
globalThis.LineFromIntercepts = LineFromIntercepts;
/**
 * @category Linear
 * @return [slope,yInt] from two given points
 * ```typescript
 * LineFromTwoPoints([1,2],[3,4]) // [1,1]
 * LineFromTwoPoints([1,2],[1,2]) // throw
 * ```
 */
function LineFromTwoPoints(point1, point2) {
    return (new LinearEquation()).byTwoPoints(point1, point2).line();
}
globalThis.LineFromTwoPoints = LineFromTwoPoints;
/**
 * @category Linear
 * @return [slope,yInt] from point and slope
 * ```typescript
 * LineFromPointSlope([1,2],3) // [3,-1]
 * LineFromPointSlope([1,2],0) // [0,2]
 * ```
 */
function LineFromPointSlope(point, slope) {
    return (new LinearEquation()).byPointSlope(point, slope).line();
}
globalThis.LineFromPointSlope = LineFromPointSlope;
/**
 * @category Linear
 * @return [slope,yInt] from perpendicular bisector of AB
 * ```typescript
 * LineFromBisector([1,2],[3,4]) // [-1,5]
 * LineFromBisector([1,2],[1,4]) // [0,3]
 * ```
 */
function LineFromBisector(A, B) {
    return (new LinearEquation()).byBisector(A, B).line();
}
globalThis.LineFromBisector = LineFromBisector;
/**
 * @ignore
 */
class LinearEquation {
    constructor() {
        this._linear = [NaN, NaN, NaN];
        this._slope = NaN;
        this._xInt = NaN;
        this._yInt = NaN;
    }
    // define
    byTwoPoints(p1, p2) {
        Should(IsPoint(p1, p2), 'input must be point');
        Should(AreDistinctPoint(p1, p2), 'two points should be distinct');
        let [x1, y1] = p1;
        let [x2, y2] = p2;
        let dx = x1 - x2;
        let dy = y1 - y2;
        let [a, b, c] = [dy, -dx, dx * y1 - dy * x1];
        let s = Sign(a);
        if (s === 0)
            s = Sign(b);
        if (s === 0)
            s = 1;
        [a, b, c] = [a * s, b * s, c * s];
        try {
            [a, b, c] = IntegerRatio(a, b, c);
        }
        catch (_a) {
        }
        this._linear = [a, b, c];
        this.refresh();
        return this;
    }
    byPointSlope(p, m) {
        Should(IsPoint(p), 'input must be point');
        let p2 = [p[0] + 1, p[1] + m];
        this.byTwoPoints(p, p2);
        return this;
    }
    byIntercepts(x, y) {
        Should(IsNum(x, y), "input must be num");
        Should(IsNonZero(x, y), 'intercepts cannot be zero');
        this.byTwoPoints([x, 0], [0, y]);
        return this;
    }
    byBisector(A, B) {
        Should(IsPoint(A, B), 'input must be point');
        Should(AreDistinctPoint(A, B), 'two points should be distinct');
        if (A[0] === B[0]) {
            this._linear = [0, 1, -(A[1] + B[1]) / 2];
            this.refresh();
        }
        else if (A[1] === B[1]) {
            this._linear = [1, 0, -(A[0] + B[0]) / 2];
            this.refresh();
        }
        else {
            let m = -1 / Slope(A, B);
            let M = MidPoint(A, B);
            this.byPointSlope(M, m);
        }
        return this;
    }
    byLinear(linear) {
        this._linear = linear;
        this.refresh();
        return this;
    }
    refresh() {
        let [a, b, c] = this._linear;
        this._slope = -a / b;
        this._xInt = -c / a;
        this._yInt = -c / b;
    }
    linear() {
        return this._linear;
    }
    line() {
        return LineFromLinear(...this.linear());
    }
}
