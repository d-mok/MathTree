import * as ruby from 'ruby'
import _ from 'lodash'
import * as math from 'mathjs'

/**
 * Derivative of the function.
 * ```
 * differentiate(x=>x**2) // x=>2*x
 * ```
 */
export function differentiate(
    fn: (x: number) => number
): (x: number) => number {
    return ruby.differentiate(fn)
}

/**
 * Integral of the function, passing through the fix point.
 * ```
 * integrate(x=>2*x, [0,3]) // x=>x**2+3
 * ```
 */
export function integrate(
    fn: (x: number) => number,
    fixPoint: Point2D = [0, 0]
): (x: number) => number {
    return ruby.integrate(fn, fixPoint)
}

/**
 * Make a function passing through the points.
 * The points must be sorted in increasing x.
 * ```
 * functionize([[0,0],[1,2]]) // like x=>2*x within 0<x<1
 * ```
 */
export function functionize(points: Point2D[]): (x: number) => number {
    return ruby.functionize(points)
}
