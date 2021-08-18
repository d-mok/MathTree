

/**
 * @category Linear
 * @return [x-int,y-int,slope] of ax+by+c=0
 * ```
 * LineFeat(2,4,6) // [-0.5,-1.5,-3]
 * LineFeat(0,4,6) // throw
 * ```
 */
function LineFeat(a: number, b: number, c: number): [slope: number, yInt: number, xInt: number] {
    let x = -c / a
    let y = -c / b
    let m = -a / b
    return [m, y, x]
}
globalThis.LineFeat = contract(LineFeat).sign([owl.nonZero, owl.nonZero, owl.num])


/**
 * @category Linear
 * @return the coeff [a,b,c] in ax+by+c=0 from given intercepts
 * ```
 * LinearFromIntercepts(1,2) // [2,1,-2]
 * LinearFromIntercepts(0,2) // throw
 * ```
 */
function LinearFromIntercepts(xInt: number, yInt: number): [a: number, b: number, c: number] {
    return LF().byIntercepts(xInt, yInt).linear()
}
globalThis.LinearFromIntercepts = contract(LinearFromIntercepts).sign()



/**
 * @category Linear
 * @return the coeff [a,b,c] in ax+by+c=0 from two given points
 * ```
 * LinearFromTwoPoints([1,2],[3,4]) // [1,-1,1]
 * LinearFromTwoPoints([1,2],[1,2]) // throw
 * ```
 */
function LinearFromTwoPoints(point1: Point2D, point2: Point2D): [a: number, b: number, c: number] {
    return LF().byTwoPoints(point1, point2).linear()
}
globalThis.LinearFromTwoPoints = contract(LinearFromTwoPoints).sign()



/**
 * @category Linear
 * @return the coeff [a,b,c] in ax+by+c=0 from point and slope
 * ```
 * LinearFromPointSlope([1,2],3) // [3,-1,-1]
 * LinearFromPointSlope([1,2],0) // [0,1,-2]
 * ```
 */
function LinearFromPointSlope(point: Point2D, slope: number): [a: number, b: number, c: number] {
    return LF().byPointSlope(point, slope).linear()
}
globalThis.LinearFromPointSlope = contract(LinearFromPointSlope).sign()



/**
 * @category Linear
 * @return the coeff [a,b,c] in ax+by+c=0 from perpendicular bisector of AB
 * ```
 * LinearFromBisector([1,2],[3,4]) // [1,1,-5]
 * LinearFromBisector([1,2],[1,4]) // [0,1,-3]
 * ```
 */
function LinearFromBisector(A: Point2D, B: Point2D): [a: number, b: number, c: number] {
    return LF().byBisector(A, B).linear()
}
globalThis.LinearFromBisector = contract(LinearFromBisector).sign()



/**
 * @category Linear
 * @return [slope,yInt] from given intercepts
 * ```
 * LineFromIntercepts(1,2) // [-2,2]
 * LineFromIntercepts(0,2) // throw
 * ```
 */
function LineFromIntercepts(xInt: number, yInt: number): [slope: number, yInt: number] {
    return LF().byIntercepts(xInt, yInt).line()
}
globalThis.LineFromIntercepts = contract(LineFromIntercepts).sign()





/**
 * @category Linear
 * @return [slope,yInt] from two given points
 * ```
 * LineFromTwoPoints([1,2],[3,4]) // [1,1]
 * LineFromTwoPoints([1,2],[1,2]) // throw
 * ```
 */
function LineFromTwoPoints(point1: Point2D, point2: Point2D): [slope: number, yInt: number] {
    return LF().byTwoPoints(point1, point2).line()
}
globalThis.LineFromTwoPoints = contract(LineFromTwoPoints).sign()



/**
 * @category Linear
 * @return [slope,yInt] from point and slope
 * ```
 * LineFromPointSlope([1,2],3) // [3,-1]
 * LineFromPointSlope([1,2],0) // [0,2]
 * ```
 */
function LineFromPointSlope(point: Point2D, slope: number): [slope: number, yInt: number] {
    return LF().byPointSlope(point, slope).line()
}
globalThis.LineFromPointSlope = contract(LineFromPointSlope).sign()




/**
 * @category Linear
 * @return [slope,yInt] from perpendicular bisector of AB
 * ```
 * LineFromBisector([1,2],[3,4]) // [-1,5]
 * LineFromBisector([1,2],[1,4]) // [0,3]
 * ```
 */
function LineFromBisector(A: Point2D, B: Point2D): [slope: number, yInt: number] {
    return LF().byBisector(A, B).line()
}
globalThis.LineFromBisector = contract(LineFromBisector).sign()






/**
 * @ignore
 */
class LinearFunction {
    private _linear: [a: number, b: number, c: number] = [NaN, NaN, NaN]

    // define
    byTwoPoints(p1: Point2D, p2: Point2D) {
        Should(owl.point2D(p1) && owl.point2D(p2), 'input must be point')
        Should(AreDifferent(p1, p2), 'two points should be distinct')
        let [x1, y1] = p1
        let [x2, y2] = p2
        let dx = x1 - x2
        let dy = y1 - y2
        let [a, b, c] = [dy, -dx, dx * y1 - dy * x1]
        let s = Sign(a);
        if (s === 0) s = Sign(b)
        if (s === 0) s = 1;
        [a, b, c] = [a * s, b * s, c * s];
        try {
            [a, b, c] = Ratio(a, b, c)
        } catch {
        }
        this._linear = [a, b, c]
        this.refresh()
        return this
    }

    byPointSlope(p: Point2D, m: number) {
        Should(owl.point2D(p), 'input must be point')
        let p2: Point2D = [p[0] + 1, p[1] + m]
        this.byTwoPoints(p, p2)
        return this
    }

    byIntercepts(x: number, y: number) {
        Should(IsNum(x, y), "input must be num")
        Should(IsNonZero(x, y), 'intercepts cannot be zero')
        this.byTwoPoints([x, 0], [0, y])
        return this
    }

    byBisector(A: Point2D, B: Point2D) {
        Should(owl.point2D(A) && owl.point2D(B), 'input must be point')
        Should(AreDifferent(A, B), 'two points should be distinct')
        if (A[0] === B[0]) {
            this._linear = [0, 1, -(A[1] + B[1]) / 2]
            this.refresh()
        } else if (A[1] === B[1]) {
            this._linear = [1, 0, -(A[0] + B[0]) / 2]
            this.refresh()
        } else {
            let m = -1 / Slope(A, B)
            let M = Mid(A, B)
            this.byPointSlope(M, m)
        }
        return this
    }

    byLinear(linear: [a: number, b: number, c: number]) {
        this._linear = linear
        this.refresh()
        return this
    }

    private refresh() {
        let [a, b, c] = this._linear!
    }

    linear(): [a: number, b: number, c: number] {
        return this._linear
    }

    line(): [slope: number, yInt: number] {
        let [m, c] = LineFeat(...this.linear())
        return [m, c]
    }

}


/**
 * @ignore
 */
function LF() {
    return new LinearFunction()
}