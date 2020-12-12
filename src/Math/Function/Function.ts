
/**
 * @category Function
 * @return log(b,N)
 * ```typescript
 * log(2,8) // return 3
 * ```
 */
function log(b: number, N: number): number {
    return Math.log(N) / Math.log(b);
}
globalThis.log = log

/**
 * @category Function
 * @return a**b, a to the power of b.
 * ```typescript
 * Power(2,3) // return 8
 * ```
 */
function Power(a: number, b: number): number {
    return Math.pow(a, b);
}
globalThis.Power = Power

/**
 * @category Function
 * @return sin(x).
 * ```typescript
 * sin(30) // return 0.5
 * ```
 */
function sin(x: number, rad = false): number {
    let v = rad ? Math.sin(x) : Math.sin(x / 180 * Math.PI);
    return parseFloat(v.toFixed(12));
}
globalThis.sin = sin

/**
 * @category Function
 * @return cos(x).
 * ```typescript
 * cos(60) // return 0.5
 * ```
 */
function cos(x: number, rad = false): number {
    let v = rad ? Math.cos(x) : Math.cos(x / 180 * Math.PI);
    return parseFloat(v.toFixed(12));
}
globalThis.cos = cos

/**
 * @category Function
 * @return tan(x).
 * ```typescript
 * tan(45) // return 1
 * ```
 */
function tan(x: number, rad = false): number {
    let v = rad ? Math.tan(x) : Math.tan(x / 180 * Math.PI);
    return parseFloat(v.toFixed(12));
}
globalThis.tan = tan

/**
 * @category Function
 * @return arcsin(x) between -90 and 90.
 * ```typescript
 * arcsin(0.5) // return 30
 * ```
 */
function arcsin(x: number, rad = false): number {
    let v = rad ? Math.asin(x) : Math.asin(x) * 180 / Math.PI;
    return parseFloat(v.toFixed(12));
}
globalThis.arcsin = arcsin

/**
 * @category Function
 * @return arccos(x) between 0 and 180.
 * ```typescript
 * arccos(0.5) // return 60
 * ```
 */
function arccos(x: number, rad = false): number {
    let v = rad ? Math.acos(x) : Math.acos(x) * 180 / Math.PI;
    return parseFloat(v.toFixed(12));
}
globalThis.arccos = arccos

/**
 * @category Function
 * @return arctan(x) between -90 and 90.
 * ```typescript
 * arctan(1) // return 45
 * ```
 */
function arctan(x: number, rad = false): number {
    let v = rad ? Math.atan(x) : Math.atan(x) * 180 / Math.PI;
    return parseFloat(v.toFixed(12));
}
globalThis.arctan = arctan
