/**
 * log(b,N)
 * ```
 * log(2,8) // 3
 * ```
 */
export function log(b: number, N: number): number {
    return Math.log(N) / Math.log(b)
}

/**
 * square root of x
 * ```
 * Sqrt(4) // 2
 * ```
 */
export function Sqrt(x: number): number {
    return Math.sqrt(x)
}

/**
 * the radian of the degree
 * ```
 * Radian(180) // pi
 * Radian(90) // pi/2
 * Radian(30) // PI/6
 * ```
 */
export function Radian(degree: number): number {
    return (degree / 180) * Math.PI
}

/**
 * the degree of the radian
 * ```
 * Degree(Math.PI) // 180
 * Degree(Math.PI/2) // 90
 * Degree(Math.PI/6) // 30
 * ```
 */
export function Degree(radian: number): number {
    return (radian * 180) / Math.PI
}

/**
 * sin(x).
 * ```
 * sin(30) // 0.5
 * ```
 */
export function sin(x: number): number {
    if (x % 180 === 0) return 0
    return Math.sin((x / 180) * Math.PI)
}

/**
 * cos(x).
 * ```
 * cos(60) // 0.5
 * ```
 */
export function cos(x: number): number {
    if ((x - 90) % 180 === 0) return 0
    return Math.cos((x / 180) * Math.PI)
}

/**
 * tan(x).
 * ```
 * tan(45) // 1
 * ```
 */
export function tan(x: number): number {
    if (x % 180 === 0) return 0
    return Math.tan((x / 180) * Math.PI)
}

/**
 * arcsin(x) between -90 and 90.
 * ```
 * arcsin(0.5) // 30
 * ```
 */
export function arcsin(x: number): number {
    return (Math.asin(x) * 180) / Math.PI
}

/**
 * arccos(x) between 0 and 180.
 * ```
 * arccos(0.5) // 60
 * ```
 */
export function arccos(x: number): number {
    return (Math.acos(x) * 180) / Math.PI
}

/**
 * arctan(x) between -90 and 90.
 * ```
 * arctan(1) // 45
 * ```
 */
export function arctan(x: number): number {
    return (Math.atan(x) * 180) / Math.PI
}
