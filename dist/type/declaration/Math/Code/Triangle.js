"use strict";
/**
 * @category Triangle
 * @return Find side length c by cosine law. Input sides a,b and angle C.
 * ```
 * CosineLawLength(5,5,60) // 5
 * CosineLawLength(2,4,30) // 2.47862735
 * CosineLawLength(1,2,180) // 3
 * CosineLawLength(4,6,0) // 2
 * ```
 */
function CosineLawLength(a, b, C) {
    return Math.pow((Math.pow(a, 2) + Math.pow(b, 2) - 2 * a * b * cos(C)), 0.5);
}
globalThis.CosineLawLength = contract(CosineLawLength).sign([owl.positive, owl.positive, [owl.positive, owl.between(0, 180)]]);
/**
 * @category Triangle
 * @return Find angle C by cosine law. Input sides a,b,c.
 * ```
 * CosineLawAngle(5,5,5) // 60
 * CosineLawAngle(3,4,5) // 90
 * CosineLawAngle(7,8,9) // 73.3984504
 * ```
 */
function CosineLawAngle(a, b, c) {
    return arccos((Math.pow(c, 2) - Math.pow(a, 2) - Math.pow(b, 2)) / (-2 * a * b));
}
globalThis.CosineLawAngle = contract(CosineLawAngle).seal({
    arg: [owl.positive],
    args: function triangle_ineq(a, b, c) { return owl.triangleSides([a, b, c]); }
});
/**
 * @category Triangle
 * @return Find area by Heron's formula.
 * ```
 * Heron(3,4,5) // 6
 * Heron(1,1,1) // 0.433012701
 * Heron(7,8,9) // 26.83281573
 * ```
 */
function Heron(a, b, c) {
    let s = (a + b + c) / 2;
    return Math.pow((s * (s - a) * (s - b) * (s - c)), 0.5);
}
globalThis.Heron = contract(Heron).seal({
    arg: [owl.positive],
    args: function triangle_ineq(a, b, c) { return owl.triangleSides([a, b, c]); }
});
/**
 * @category Triangle
 * @param fix - Round all return values to integer.
 * @return Return the 6 elements of a triangle given vertice. { sideC, angleB, sideA, angleC, sideB, angleA }
 * ```
 * TriangleFromVertex([0,0],[4,0],[0,3],false)
 * // {sideC:4, angleB:36.86989765, sideA:5, angleC:53.13013235, sideB:3, angleA:90}
 * ```
 */
function TriangleFromVertex(A, B, C, fix = true) {
    let sideC = Distance(A, B);
    let sideA = Distance(B, C);
    let sideB = Distance(C, A);
    let angleC = CosineLawAngle(sideA, sideB, sideC);
    let angleA = CosineLawAngle(sideB, sideC, sideA);
    let angleB = CosineLawAngle(sideA, sideC, sideB);
    if (fix) {
        sideC = Fix(sideC);
        sideA = Fix(sideA);
        sideB = Fix(sideB);
        angleC = Fix(angleC);
        angleA = Fix(angleA);
        angleB = Fix(angleB);
    }
    return { sideC, angleB, sideA, angleC, sideB, angleA };
}
globalThis.TriangleFromVertex = contract(TriangleFromVertex).sign([owl.point, owl.point, owl.point, owl.bool]);
/**
 * @category Triangle
 * @param triangle - unknown elements are null.
 * @return Solve a triangle. return the triangle object solved.
 * ```
 * SolveTriangle({sideC:2, sideA:2, sideB:2})
 * // {sideC:2, angleB:60, sideA:2, angleC:60, sideB:2, angleA:60}
 * SolveTriangle({sideC:3, angleB:90, sideA:4})
 * // {sideC:3, angleB:90, sideA:4, angleC:36.86989765, sideB:5, angleA:53.13010235}
 * SolveTriangle({sideC:5, angleB:30, angleC:80})
 * // {sideC:5, angleB:30, sideA:4.770944471, angleC:80, sideB:2.53856653, angleA:70}
 * SolveTriangle({sideC:6, angleB:30, angleA:40})
 * // {sideC:6, angleB:30, sideA:4.10424172, angleC:110, sideB:3.192533317, angleA:40}
 * ```
 */
function SolveTriangle({ sideA = null, sideB = null, sideC = null, angleA = null, angleB = null, angleC = null }) {
    let a = sideA;
    let b = sideB;
    let c = sideC;
    let A = angleA;
    let B = angleB;
    let C = angleC;
    function angleSum() {
        if (A === null && B !== null && C !== null)
            A = 180 - B - C;
        if (B === null && A !== null && C !== null)
            B = 180 - A - C;
        if (C === null && B !== null && A !== null)
            C = 180 - A - B;
    }
    function SSS() {
        if (a !== null && b !== null && c !== null) {
            A = CosineLawAngle(b, c, a);
            B = CosineLawAngle(c, a, b);
            C = CosineLawAngle(a, b, c);
        }
    }
    function SAS() {
        if (a !== null && b !== null && C !== null && c === null)
            c = CosineLawLength(a, b, C);
        if (b !== null && c !== null && A !== null && a === null)
            a = CosineLawLength(b, c, A);
        if (c !== null && a !== null && B !== null && b === null)
            b = CosineLawLength(c, a, B);
    }
    function AAS() {
        let r = null;
        if (A !== null && a !== null && r === null)
            r = sin(A) / a;
        if (B !== null && b !== null && r === null)
            r = sin(B) / b;
        if (C !== null && c !== null && r === null)
            r = sin(C) / c;
        if (r !== null && A !== null && a === null)
            a = sin(A) / r;
        if (r !== null && B !== null && b === null)
            b = sin(B) / r;
        if (r !== null && C !== null && c === null)
            c = sin(C) / r;
    }
    for (let i = 0; i < 10; i++) {
        if (a !== null && b !== null && c !== null && A !== null && B !== null && C !== null) {
            return { sideA: a, sideB: b, sideC: c, angleA: A, angleB: B, angleC: C };
        }
        angleSum();
        SSS();
        SAS();
        AAS();
    }
    Should(false, 'Solve Triangle Fail!');
    throw 'never';
}
globalThis.SolveTriangle = contract(SolveTriangle).sign();
