import _ from 'lodash'
import * as math from 'mathjs'

/**
 * log(b,N)
 * ```
 * log(2,8) // 3
 * ```
 */
export function log(b: number, N: number): number {
    const v = Math.log(N) / Math.log(b)
    return cal.blur(v)
}

/**
 * square root of x
 * ```
 * Sqrt(4) // 2
 * ```
 */
export function Sqrt(x: number): number {
    const v = Math.sqrt(x)
    return cal.blur(v)
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
    const v = (degree / 180) * Math.PI
    return cal.blur(v)
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
    const v = (radian * 180) / Math.PI
    return cal.blur(v)
}

/**
 * sin(x).
 * ```
 * sin(30) // 0.5
 * ```
 */
export function sin(x: number): number {
    if (x % 180 === 0) return 0
    let v = Math.sin((x / 180) * Math.PI)
    return cal.blur(v)
}

/**
 * cos(x).
 * ```
 * cos(60) // 0.5
 * ```
 */
export function cos(x: number): number {
    if ((x - 90) % 180 === 0) return 0
    let v = Math.cos((x / 180) * Math.PI)
    return cal.blur(v)
}

/**
 * tan(x).
 * ```
 * tan(45) // 1
 * ```
 */
export function tan(x: number): number {
    if (x % 180 === 0) return 0
    let v = Math.tan((x / 180) * Math.PI)
    return cal.blur(v)
}

/**
 * arcsin(x) between -90 and 90.
 * ```
 * arcsin(0.5) // 30
 * ```
 */
export function arcsin(x: number): number {
    let v = (Math.asin(x) * 180) / Math.PI
    return cal.blur(v)
}

/**
 * arccos(x) between 0 and 180.
 * ```
 * arccos(0.5) // 60
 * ```
 */
export function arccos(x: number): number {
    let v = (Math.acos(x) * 180) / Math.PI
    return cal.blur(v)
}

/**
 * arctan(x) between -90 and 90.
 * ```
 * arctan(1) // 45
 * ```
 */
export function arctan(x: number): number {
    let v = (Math.atan(x) * 180) / Math.PI
    return cal.blur(v)
}
