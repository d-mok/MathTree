import { checkIt, inspectIt, captureAll, exposeAll } from 'contract'
import { differentiate, integrate, functionize } from 'ruby'
import _ from 'lodash'
import * as math from 'mathjs'

@exposeAll()
@captureAll()
export class Host {
    /**
     * Derivative of the function.
     * ```
     * differentiate(x=>x**2) // x=>2*x
     * ```
     */
    static differentiate(fn: (x: number) => number): (x: number) => number {
        return differentiate(fn)
    }

    /**
     * Integral of the function, passing through the fix point.
     * ```
     * integrate(x=>2*x, [0,3]) // x=>x**2+3
     * ```
     */
    static integrate(
        fn: (x: number) => number,
        fixPoint: Point2D = [0, 0]
    ): (x: number) => number {
        return integrate(fn, fixPoint)
    }

    /**
     * Make a function passing through the points.
     * The points must be sorted in increasing x.
     * ```
     * functionize([[0,0],[1,2]]) // like x=>2*x within 0<x<1
     * ```
     */
    @checkIt(owl.point2Ds)
    static functionize(points: Point2D[]): (x: number) => number {
        return functionize(points)
    }
}

declare global {
    var differentiate: typeof Host.differentiate
    var integrate: typeof Host.integrate
    var functionize: typeof Host.functionize
}
