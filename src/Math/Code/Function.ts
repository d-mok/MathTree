/**
 * @category Function
 * @return log(b,N)
 * ```typescript
 * log(2,8) // 3
 * ```
 */
function log(b: number, N: number): number {
    const v = Math.log(N) / Math.log(b);
    return Blur(v)
}
globalThis.log = log

/**
 * @category Function
 * @return a**b, a to the power of b.
 * ```typescript
 * Power(2,3) // 8
 * ```
 */
function Power(a: number, b: number): number {
    const v =  Math.pow(a, b);
    return Blur(v)
}
globalThis.Power = Power

/**
 * @category Function
 * @return sin(x).
 * ```typescript
 * sin(30) // 0.5
 * ```
 */
function sin(x: number): number {
    let v = Math.sin(x / 180 * Math.PI);
    return Blur(v)
}
globalThis.sin = sin

/**
 * @category Function
 * @return cos(x).
 * ```typescript
 * cos(60) // 0.5
 * ```
 */
function cos(x: number): number {
    let v = Math.cos(x / 180 * Math.PI);
    return Blur(v)
}
globalThis.cos = cos

/**
 * @category Function
 * @return tan(x).
 * ```typescript
 * tan(45) // 1
 * ```
 */
function tan(x: number): number {
    let v = Math.tan(x / 180 * Math.PI);
    return Blur(v)
}
globalThis.tan = tan

/**
 * @category Function
 * @return arcsin(x) between -90 and 90.
 * ```typescript
 * arcsin(0.5) // 30
 * ```
 */
function arcsin(x: number): number {
    let v = Math.asin(x) * 180 / Math.PI;
    return Blur(v)
}
globalThis.arcsin = arcsin

/**
 * @category Function
 * @return arccos(x) between 0 and 180.
 * ```typescript
 * arccos(0.5) // 60
 * ```
 */
function arccos(x: number): number {
    let v = Math.acos(x) * 180 / Math.PI;
    return Blur(v)
}
globalThis.arccos = arccos

/**
 * @category Function
 * @return arctan(x) between -90 and 90.
 * ```typescript
 * arctan(1) // 45
 * ```
 */
function arctan(x: number): number {
    let v = Math.atan(x) * 180 / Math.PI;
    return Blur(v)
}
globalThis.arctan = arctan
