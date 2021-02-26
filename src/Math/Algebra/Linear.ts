

/**
 * @category Linear
 * @return [x-int, y-int,slope] of ax+by+c=0
 * ```typescript
 * LinearFeature(2,4,6) // [-3,-1.5,-0.5]
 * LinearFeature(0,4,6) // throw
 * ```
 */
function LinearFeature(a: number, b: number, c: number): [xInt: number, yInt: number, slope: number] {
    Should(IsNum(a, b, c), "input must be num")
    Should(IsNonZero(a, b), 'x and y term should be non-zero')
    return [-c / a, -c / b, -a / b]
}
globalThis.LinearFeature = LinearFeature


/**
 * @category Linear
 * @return [slope,yInt] from ax+by+c=0
 * ```typescript
 * LineFromLinear(2,4,6) // [-0.5,-1.5]
 * LineFromLinear(0,4,6) // [0,-1.5]
 * ```
 */
function LineFromLinear(a: number, b: number, c: number): [number, number] {
    Should(IsNonZero(b), 'b should be non-zero')
    return [-a / b, -c / b]
}
globalThis.LineFromLinear = LineFromLinear



/**
 * @category Linear
 * @return the coeff [a,b,c] in ax+by+c=0 from given intercepts
 * ```typescript
 * LinearFromIntercepts(1,2) // [2,1,-2]
 * LinearFromIntercepts(0,2) // throw
 * ```
 */
function LinearFromIntercepts(xInt: number, yInt: number): Linear {
    let L = new LinearEquation()
    L.byIntercepts(xInt, yInt)
    return L.linear
}
globalThis.LinearFromIntercepts = LinearFromIntercepts





/**
 * @category Linear
 * @return the coeff [a,b,c] in ax+by+c=0 from two given points
 * ```typescript
 * LinearFromTwoPoints([1,2],[3,4]) // [1,-1,1]
 * LinearFromTwoPoints([1,2],[1,2]) // throw
 * ```
 */
function LinearFromTwoPoints(point1: Point, point2: Point): Linear {
    let L = new LinearEquation()
    L.byTwoPoints(point1, point2)
    return L.linear
}
globalThis.LinearFromTwoPoints = LinearFromTwoPoints



/**
 * @category Linear
 * @return the coeff [a,b,c] in ax+by+c=0 from point and slope
 * ```typescript
 * LinearFromPointSlope([1,2],3) // [3,-1,-1]
 * LinearFromPointSlope([1,2],0) // [0,1,-2]
 * ```
 */
function LinearFromPointSlope(point: Point, slope: number): Linear {
    let L = new LinearEquation()
    L.byPointSlope(point, slope)
    return L.linear
}
globalThis.LinearFromPointSlope = LinearFromPointSlope



/**
 * @category Linear
 * @return the coeff [a,b,c] in ax+by+c=0 from perpendicular bisector of AB
 * ```typescript
 * LinearFromBisector([1,2],[3,4]) // [1,1,-5]
 * LinearFromBisector([1,2],[1,4]) // [0,1,-3]
 * ```
 */
function LinearFromBisector(A: Point, B: Point): Linear {
    let L = new LinearEquation()
    L.byBisector(A, B)
    return L.linear
}
globalThis.LinearFromBisector = LinearFromBisector





/**
 * @category Linear
 * @return [slope,yInt] from given intercepts
 * ```typescript
 * LineFromIntercepts(1,2) // [-2,2]
 * LineFromIntercepts(0,2) // throw
 * ```
 */
function LineFromIntercepts(xInt: number, yInt: number): [number, number] {
    let L = new LinearEquation()
    L.byIntercepts(xInt, yInt)
    return LineFromLinear(...L.linear)
}
globalThis.LineFromIntercepts = LineFromIntercepts





/**
 * @category Linear
 * @return [slope,yInt] from two given points
 * ```typescript
 * LineFromTwoPoints([1,2],[3,4]) // [1,1]
 * LineFromTwoPoints([1,2],[1,2]) // throw
 * ```
 */
function LineFromTwoPoints(point1: Point, point2: Point): [number, number] {
    let L = new LinearEquation()
    L.byTwoPoints(point1, point2)
    return LineFromLinear(...L.linear)
}
globalThis.LineFromTwoPoints = LineFromTwoPoints



/**
 * @category Linear
 * @return [slope,yInt] from point and slope
 * ```typescript
 * LineFromPointSlope([1,2],3) // [3,-1]
 * LineFromPointSlope([1,2],0) // [0,2]
 * ```
 */
function LineFromPointSlope(point: Point, slope: number): [number, number] {
    let L = new LinearEquation()
    L.byPointSlope(point, slope)
    return LineFromLinear(...L.linear)
}
globalThis.LineFromPointSlope = LineFromPointSlope




/**
 * @category Linear
 * @return [slope,yInt] from perpendicular bisector of AB
 * ```typescript
 * LineFromBisector([1,2],[3,4]) // [-1,5]
 * LineFromBisector([1,2],[1,4]) // [0,3]
 * ```
 */
function LineFromBisector(A: Point, B: Point): [number, number] {
    let L = new LinearEquation()
    L.byBisector(A, B)
    return LineFromLinear(...L.linear)
}
globalThis.LineFromBisector = LineFromBisector






/**
 * @ignore
 */
class LinearEquation {
    public linear: Linear = [NaN, NaN, NaN]
    public slope: number = NaN
    public xInt: number = NaN
    public yInt: number = NaN

    // define
    byTwoPoints(p1: Point, p2: Point) {
        Should(IsPoint(p1, p2), 'input must be point')
        Should(AreDistinctPoint(p1, p2), 'two points should be distinct')
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
            [a, b, c] = IntegerRatio(a, b, c)
        } catch {
        }
        this.linear = [a, b, c]
        this.refresh()
    }

    byPointSlope(p: Point, m: number) {
        Should(IsPoint(p), 'input must be point')
        let p2: Point = [p[0] + 1, p[1] + m]
        this.byTwoPoints(p, p2)
    }

    byIntercepts(x: number, y: number) {
        Should(IsNum(x, y), "input must be num")
        Should(IsNonZero(x, y), 'intercepts cannot be zero')
        this.byTwoPoints([x, 0], [0, y])
    }

    byBisector(A: Point, B: Point) {
        if (A[0] === B[0]) {
            this.linear = [0, 1, -(A[1] + B[1]) / 2]
            this.refresh()
        } else if (A[1] === B[1]) {
            this.linear = [1, 0, -(A[0] + B[0]) / 2]
            this.refresh()
        } else {
            let m = -1 / Slope(A, B)
            let M = MidPoint(A, B)
            this.byPointSlope(M, m)
        }
    }

    byLinear(linear: Linear) {
        this.linear = linear
        this.refresh()
    }

    refresh() {
        let [a, b, c] = this.linear!
        this.slope = -a / b
        this.xInt = -c / a
        this.yInt = -c / b
    }

}