"use strict";
/**
 * @category Algebra
 * @return solve [x,y] from ax+by=c and px+qy=r.
 * ```
 * Crammer(1,1,5,1,-1,1) // [3,2] solving x+y=5 and x-y=1
 * Crammer(1,1,3,2,2,6) // throw
 * ```
 */
function Crammer(a, b, c, p, q, r) {
    const D = a * q - b * p;
    const x = (c * q - b * r) / D;
    const y = (a * r - c * p) / D;
    return [x, y];
}
globalThis.Crammer = contract(Crammer).seal({
    arg: [owl.num],
    args: function has_unique_solution(a, b, c, p, q, r) { return a * q - b * p !== 0; }
});
/**
 * @category Algebra
 * @return the product of two input polynomials.
 * ```
 * // do (1x^2+2x+3)(4x+5) = 4x^3+13x^2+22x+15
 * xPolynomial([1,2,3],[4,5]) // [4,13,22,15]
 * ```
 */
function xPolynomial(poly1, poly2) {
    const deg1 = poly1.length - 1;
    const deg2 = poly2.length - 1;
    const deg = deg1 + deg2;
    const result = Array(deg + 1).fill(0);
    for (let i = 0; i <= deg1; i++) {
        for (let j = 0; j <= deg2; j++) {
            result[i + j] += poly1[i] * poly2[j];
        }
    }
    return result;
}
globalThis.xPolynomial = contract(xPolynomial).sign([[
        owl.ntuple,
        function non_zero_leading_coeff(_) { return _[0] !== 0; }
    ]]);
/**
 * @category Algebra
 * @return the points along the parametric curve
 * ```
 * Trace(x => x ** 2, 0, 4, 5) // [[0, 0], [1, 1], [2, 4], [3, 9], [4, 16]]
 * Trace(t => [t,t**2], 0, 4, 5) // [[0, 0], [1, 1], [2, 4], [3, 9], [4, 16]]
 * ```
 */
function Trace(func, tStart, tEnd, dots = 1000) {
    const tracer = (t) => {
        let result;
        try {
            result = func(t);
        }
        catch (_a) {
            return [NaN, NaN];
        }
        if (!Array.isArray(result))
            result = [t, result];
        return result;
    };
    const step = (tEnd - tStart) / (dots - 1);
    let points = [];
    for (let t = tStart; t <= tEnd; t += step) {
        points.push(tracer(t));
    }
    return points;
}
globalThis.Trace = contract(Trace).sign([owl.pass, owl.num, owl.num, owl.positiveInt]);