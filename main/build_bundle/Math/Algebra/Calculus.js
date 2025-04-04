import * as ruby from 'ruby';
/**
 * Derivative of the function.
 * ```
 * differentiate(x=>x**2) // x=>2*x
 * ```
 */
export function differentiate(fn) {
    return ruby.differentiate(fn);
}
/**
 * Integral of the function, passing through the fix point.
 * ```
 * integrate(x=>2*x, [0,3]) // x=>x**2+3
 * ```
 */
export function integrate(fn, fixPoint = [0, 0]) {
    return ruby.integrate(fn, fixPoint);
}
/**
 * Make a function passing through the points.
 * The points must be sorted in increasing x.
 * ```
 * functionize([[0,0],[1,2]]) // like x=>2*x within 0<x<1
 * ```
 */
export function functionize(points) {
    return ruby.functionize(points);
}
