import _ from 'lodash'
import * as math from 'mathjs'

/**
 * the discriminant b^2-4ac.
 * ```
 * Discriminant(2,3,4) // -23
 * ```
 */
export function Discriminant(a: number, b: number, c: number): number {
    if (a === 0) return NaN
    return b * b - 4 * a * c
}

/**
 * the roots [p,q] of ax^2+bx+c=0 where p<=q
 * ```
 * QuadraticRoot(1,2,-3) // [-3,1]
 * QuadraticRoot(1,2,3) // throw when no real root
 * ```
 */
export function QuadraticRoot(
    a: number,
    b: number,
    c: number
): [number, number] {
    if (a === 0) return [NaN, NaN]
    const d = Discriminant(a, b, c)
    if (d < 0) return [NaN, NaN]
    const s = Math.sqrt(d)
    const r1 = (-b - s) / (2 * a)
    const r2 = (-b + s) / (2 * a)
    return [Min(r1, r2), Max(r1, r2)]
}

/**
 * the vertex [h,k] of y=ax^2+bx+c.
 * ```
 * QuadraticVertex(1,2,3) // [-1,2]
 * ```
 */
export function QuadraticVertex(a: number, b: number, c: number): Point2D {
    if (a === 0) return [NaN, NaN]
    const h = -b / (2 * a)
    const k = a * h * h + b * h + c
    return [h, k]
}

/**
 * the quadratic coeff [a,b,c] from given a and roots p and q.
 * ```
 * QuadraticFromRoot(1,2,3) // [1,-5,6]
 * ```
 */
export function QuadraticFromRoot(a: number, p: number, q: number): Quadratic {
    if (a === 0) return [NaN, NaN, NaN]
    return [a, -a * (p + q), a * p * q]
}

/**
 * the quadratic coeff [a,b,c] from given a and vertex (h,k).
 * ```
 * QuadraticFromVertex(1,2,3) // [1,-4,7]
 * ```
 */
export function QuadraticFromVertex(
    a: number,
    h: number,
    k: number
): Quadratic {
    if (a === 0) return [NaN, NaN, NaN]
    const b = -2 * a * h
    const c = k - a * h * h - b * h
    return [a, b, c]
}
