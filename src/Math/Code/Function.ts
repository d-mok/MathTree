/**
 * @category Function
 * @return log(b,N)
 * ```typescript
 * log(2,8) // 3
 * ```
 */
function log(b: number, N: number): number {
    Should(IsPositive(b, N), 'input must be positive')
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
    Should(IsNum(a, b), 'input must be num')
    const v = Math.pow(a, b);
    return Blur(v)
}
globalThis.Power = Power

/**
 * @category Function
 * @return square root of x
 * ```typescript
 * Sqrt(4) // 2
 * ```
 */
function Sqrt(x: number): number {
    Should(IsNum(x) && x >= 0, 'input must be non-negative num')
    const v = Math.sqrt(x)
    return Blur(v)
}
globalThis.Sqrt = Sqrt

/**
 * @category Function
 * @return the radian of the degree
 * ```typescript
 * Radian(180) // pi
 * Radian(90) // pi/2
 * Radian(30) // PI/6
 * ```
 */
function Radian(degree: number): number {
    Should(IsNum(degree), 'degree must be num')
    const v =  degree / 180 * Math.PI
    return Blur(v)
}
globalThis.Radian = Radian



/**
 * @category Function
 * @return the degree of the radian
 * ```typescript
 * Degree(Math.PI) // 180
 * Degree(Math.PI/2) // 90
 * Degree(Math.PI/6) // 30
 * ```
 */
function Degree(radian: number): number {
    Should(IsNum(radian), 'degree must be num')
    const v =  radian * 180 / Math.PI
    return Blur(v)
}
globalThis.Degree = Degree



/**
 * @category Function
 * @return sin(x).
 * ```typescript
 * sin(30) // 0.5
 * ```
 */
function sin(x: number): number {
    Should(IsNum(x), 'input must be num')
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
    Should(IsNum(x), 'input must be num')
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
    Should(IsNum(x), 'input must be num')
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
    Should(IsNum(x), 'input must be num')
    Should(Abs(x) <= 1, 'input should be between 1 and -1')
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
    Should(IsNum(x), 'input must be num')
    Should(Abs(x) <= 1, 'input should be between 1 and -1')
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
    Should(IsNum(x), 'input must be num')
    let v = Math.atan(x) * 180 / Math.PI;
    return Blur(v)
}
globalThis.arctan = arctan
