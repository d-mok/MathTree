import { checkIt, inspectIt, captureAll, exposeAll } from 'contract'
import _ from 'lodash'
import * as math from 'mathjs'

@exposeAll()
@captureAll()
export class Host {
    /**
     * [slope,y-int,x-int] of ax+by+c=0
     * ```
     * LineFeat(2,4,6) // [-0.5,-1.5,-3]
     * LineFeat(0,4,6) // throw
     * ```
     */
    static LineFeat(
        a: number,
        b: number,
        c: number
    ): [slope: number, yInt: number, xInt: number] {
        let x = -c / a
        let y = -c / b
        let m = -a / b
        return [m, y, x]
    }

    /**
     * the coeff [a,b,c] in ax+by+c=0 from given intercepts
     * ```
     * LinearFromIntercepts(1,2) // [2,1,-2]
     * LinearFromIntercepts(0,2) // throw
     * ```
     */
    static LinearFromIntercepts(
        xInt: number,
        yInt: number
    ): [a: number, b: number, c: number] {
        return lin().byIntercepts(xInt, yInt).toLinear()
    }

    /**
     * the coeff [a,b,c] in ax+by+c=0 from two given points
     * ```
     * LinearFromTwoPoints([1,2],[3,4]) // [1,-1,1]
     * LinearFromTwoPoints([1,2],[1,2]) // throw
     * ```
     */
    static LinearFromTwoPoints(
        point1: Point2D,
        point2: Point2D
    ): [a: number, b: number, c: number] {
        return lin().byTwoPoints(point1, point2).toLinear()
    }

    /**
     * the coeff [a,b,c] in ax+by+c=0 from point and slope
     * ```
     * LinearFromPointSlope([1,2],3) // [3,-1,-1]
     * LinearFromPointSlope([1,2],0) // [0,1,-2]
     * ```
     */
    static LinearFromPointSlope(
        point: Point2D,
        slope: number
    ): [a: number, b: number, c: number] {
        return lin().byPointSlope(point, slope).toLinear()
    }

    /**
     * the coeff [a,b,c] in ax+by+c=0 from perpendicular bisector of AB
     * ```
     * LinearFromBisector([1,2],[3,4]) // [1,1,-5]
     * LinearFromBisector([1,2],[1,4]) // [0,1,-3]
     * ```
     */
    @inspectIt(function different_points(p1, p2) {
        return owl.distinct([p1, p2])
    })
    static LinearFromBisector(
        A: Point2D,
        B: Point2D
    ): [a: number, b: number, c: number] {
        return lin().byBisector(A, B).toLinear()
    }

    /**
     * [slope,yInt] from given intercepts
     * ```
     * LineFromIntercepts(1,2) // [-2,2]
     * LineFromIntercepts(0,2) // throw
     * ```
     */
    static LineFromIntercepts(
        xInt: number,
        yInt: number
    ): [slope: number, yInt: number] {
        return lin().byIntercepts(xInt, yInt).toLine()
    }

    /**
     * [slope,yInt] from two given points
     * ```
     * LineFromTwoPoints([1,2],[3,4]) // [1,1]
     * LineFromTwoPoints([1,2],[1,2]) // throw
     * ```
     */
    static LineFromTwoPoints(
        point1: Point2D,
        point2: Point2D
    ): [slope: number, yInt: number] {
        return lin().byTwoPoints(point1, point2).toLine()
    }

    /**
     * [slope,yInt] from point and slope
     * ```
     * LineFromPointSlope([1,2],3) // [3,-1]
     * LineFromPointSlope([1,2],0) // [0,2]
     * ```
     */
    static LineFromPointSlope(
        point: Point2D,
        slope: number
    ): [slope: number, yInt: number] {
        return lin().byPointSlope(point, slope).toLine()
    }

    /**
     * [slope,yInt] from perpendicular bisector of AB
     * ```
     * LineFromBisector([1,2],[3,4]) // [-1,5]
     * LineFromBisector([1,2],[1,4]) // [0,3]
     * ```
     */
    static LineFromBisector(
        A: Point2D,
        B: Point2D
    ): [slope: number, yInt: number] {
        return lin().byBisector(A, B).toLine()
    }
}

declare global {
    var LineFeat: typeof Host.LineFeat
    var LinearFromIntercepts: typeof Host.LinearFromIntercepts
    var LinearFromTwoPoints: typeof Host.LinearFromTwoPoints
    var LinearFromPointSlope: typeof Host.LinearFromPointSlope
    var LinearFromBisector: typeof Host.LinearFromBisector
    var LineFromIntercepts: typeof Host.LineFromIntercepts
    var LineFromTwoPoints: typeof Host.LineFromTwoPoints
    var LineFromPointSlope: typeof Host.LineFromPointSlope
    var LineFromBisector: typeof Host.LineFromBisector
}
