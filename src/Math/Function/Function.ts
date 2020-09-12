
/**
 * Return log(b,N).
 * @category Function
 * @param {number} b - The base.
 * @param {number} N - The number.
 * @return {number} The value of log(b,N)
 * @example
 * log(2,8) // return 3
 */
function log(b: number, N: number): number {
    return Math.log(N) / Math.log(b);
}
globalThis.log = log

/**
 * Return a^b. Equivalent to (a**b) and Math.pow(a,b).
 * @category Function
 * @param {number} a - The base.
 * @param {number} b - The index.
 * @return {number} The value of a^b.
 * @example
 * Power(2,3) // return 8
 */
function Power(a: number, b: number): number {
    return Math.pow(a, b);
}
globalThis.Power = Power

/**
 * Return sin(x).
 * @category Function
 * @param {number} x - The angle.
 * @param {boolean} [rad=false] - Whether the angle is in radian.
 * @return {number} The value of sin(x).
 * @example
 * sin(30) // return 0.5
 */
function sin(x: number, rad = false): number {
    let v = rad ? Math.sin(x) : Math.sin(x / 180 * Math.PI);
    return parseFloat(v.toFixed(12));
}
globalThis.sin = sin

/**
 * Return cos(x).
 * @category Function
 * @param {number} x - The angle.
 * @param {boolean} [rad=false] - Whether the angle is in radian.
 * @return {number} The value of cos(x).
 * @example
 * cos(60) // return 0.5
 */
function cos(x: number, rad = false): number {
    let v = rad ? Math.cos(x) : Math.cos(x / 180 * Math.PI);
    return parseFloat(v.toFixed(12));
}
globalThis.cos = cos

/**
 * Return tan(x).
 * @category Function
 * @param {number} x - The angle.
 * @param {boolean} [rad=false] - Whether the angle is in radian.
 * @return {number} The value of tan(x).
 * @example
 * tan(45) // return 1
 */
function tan(x: number, rad = false): number {
    let v = rad ? Math.tan(x) : Math.tan(x / 180 * Math.PI);
    return parseFloat(v.toFixed(12));
}
globalThis.tan = tan

/**
 * Return arcsin(x).
 * @category Function
 * @param {number} x - The sin value.
 * @param {boolean} [rad=false] - Whether to return radian.
 * @return {number} The angle between -90 and 90.
 * @example
 * arcsin(0.5) // return 30
 */
function arcsin(x: number, rad = false): number {
    let v = rad ? Math.asin(x) : Math.asin(x) * 180 / Math.PI;
    return parseFloat(v.toFixed(12));
}
globalThis.arcsin = arcsin

/**
 * Return arccos(x).
 * @category Function
 * @param {number} x - The cos value.
 * @param {boolean} [rad=false] - Whether to return radian.
 * @return {number} The angle between 0 and 180.
 * @example
 * arccos(0.5) // return 60
 */
function arccos(x: number, rad = false): number {
    let v = rad ? Math.acos(x) : Math.acos(x) * 180 / Math.PI;
    return parseFloat(v.toFixed(12));
}
globalThis.arccos = arccos

/**
 * Return arctan(x).
 * @category Function
 * @param {number} x - The tan value.
 * @param {boolean} [rad=false] - Whether to return radian.
 * @return {number} The angle between -90 and 90.
 * @example
 * arctan(1) // return 45
 */
function arctan(x: number, rad = false): number {
    let v = rad ? Math.atan(x) : Math.atan(x) * 180 / Math.PI;
    return parseFloat(v.toFixed(12));
}
globalThis.arctan = arctan
