"use strict";
/**
 * @category Function
 * @return log(b,N)
 * ```
 * log(2,8) // 3
 * ```
 */
function log(b, N) {
    const v = Math.log(N) / Math.log(b);
    return ant.blur(v);
}
globalThis.log = contract(log).sign([owl.positive]);
/**
 * @deprecated
 * @ignore
 * @category Function
 * @return a**b, a to the power of b.
 * ```
 * Power(2,3) // 8
 * ```
 */
function Power(a, b) {
    const v = Math.pow(a, b);
    return ant.blur(v);
}
globalThis.Power = contract(Power).sign([owl.num]);
/**
 * @category Function
 * @return square root of x
 * ```
 * Sqrt(4) // 2
 * ```
 */
function Sqrt(x) {
    const v = Math.sqrt(x);
    return ant.blur(v);
}
globalThis.Sqrt = contract(Sqrt).sign([owl.nonNegative]);
/**
 * @category Function
 * @return the radian of the degree
 * ```
 * Radian(180) // pi
 * Radian(90) // pi/2
 * Radian(30) // PI/6
 * ```
 */
function Radian(degree) {
    const v = degree / 180 * Math.PI;
    return ant.blur(v);
}
globalThis.Radian = contract(Radian).sign([owl.num]);
/**
 * @category Function
 * @return the degree of the radian
 * ```
 * Degree(Math.PI) // 180
 * Degree(Math.PI/2) // 90
 * Degree(Math.PI/6) // 30
 * ```
 */
function Degree(radian) {
    const v = radian * 180 / Math.PI;
    return ant.blur(v);
}
globalThis.Degree = contract(Degree).sign([owl.num]);
/**
 * @category Function
 * @return sin(x).
 * ```
 * sin(30) // 0.5
 * ```
 */
function sin(x) {
    if (x % 180 === 0)
        return 0;
    let v = Math.sin(x / 180 * Math.PI);
    return ant.blur(v);
}
globalThis.sin = contract(sin).sign([owl.num]);
/**
 * @category Function
 * @return cos(x).
 * ```
 * cos(60) // 0.5
 * ```
 */
function cos(x) {
    if ((x - 90) % 180 === 0)
        return 0;
    let v = Math.cos(x / 180 * Math.PI);
    return ant.blur(v);
}
globalThis.cos = contract(cos).sign([owl.num]);
/**
 * @category Function
 * @return tan(x).
 * ```
 * tan(45) // 1
 * ```
 */
function tan(x) {
    if (x % 180 === 0)
        return 0;
    let v = Math.tan(x / 180 * Math.PI);
    return ant.blur(v);
}
globalThis.tan = contract(tan).sign([owl.num]);
/**
 * @category Function
 * @return arcsin(x) between -90 and 90.
 * ```
 * arcsin(0.5) // 30
 * ```
 */
function arcsin(x) {
    let v = Math.asin(x) * 180 / Math.PI;
    return ant.blur(v);
}
globalThis.arcsin = contract(arcsin).sign([owl.between(-1, 1)]);
/**
 * @category Function
 * @return arccos(x) between 0 and 180.
 * ```
 * arccos(0.5) // 60
 * ```
 */
function arccos(x) {
    let v = Math.acos(x) * 180 / Math.PI;
    return ant.blur(v);
}
globalThis.arccos = contract(arccos).sign([owl.between(-1, 1)]);
/**
 * @category Function
 * @return arctan(x) between -90 and 90.
 * ```
 * arctan(1) // 45
 * ```
 */
function arctan(x) {
    let v = Math.atan(x) * 180 / Math.PI;
    return ant.blur(v);
}
globalThis.arctan = contract(arctan).sign([owl.num]);