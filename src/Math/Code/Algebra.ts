/**
 * @category Algebra
 * @return solve [x,y] from ax+by=c and px+qy=r. 
 * ```typescript
 * Crammer(1,1,5,1,-1,1) // [3,2] solving x+y=5 and x-y=1
 * Crammer(1,1,3,2,2,6) // throw
 * ```
 */
function Crammer(a: number, b: number, c: number, p: number, q: number, r: number): [number, number] {
    Must(IsNum(a, b, c, p, q, r), "input must be num")
    const D = a * q - b * p
    Should(IsNonZero(D), 'no unique solution')
    const x = (c * q - b * r) / D;
    const y = (a * r - c * p) / D;
    return [x, y];
}
globalThis.Crammer = Crammer



/**
 * @category Algebra
 * @return the discriminant b^2-4ac.
 * ```typescript
 * Discriminant(2,3,4) // -23
 * ```
 */
function Discriminant(a: number, b: number, c: number): number {
    Must(IsNum(a, b, c), "input must be num")
    return b * b - 4 * a * c;
}
globalThis.Discriminant = Discriminant


/**
 * @category Algebra
 * @return the roots [p,q] of ax^2+bx+c=0 where p<=q
 * ```typescript
 * QuadraticRoot(1,2,-3) // [-3,1]
 * QuadraticRoot(-1,-2,3) // [-3,1]
 * QuadraticRoot(1,2,1) // [-1,-1]
 * QuadraticRoot(1,2,3) // throw
 * QuadraticRoot(0,2,3) // throw
 * ```
 */
function QuadraticRoot(a: number, b: number, c: number): [number, number] {
    Must(IsNum(a, b, c), "input must be num")
    const d = Discriminant(a, b, c);
    Should(d >= 0, 'no real root')
    const r1 = Divide(-b - Math.sqrt(d), 2 * a);
    const r2 = Divide(-b + Math.sqrt(d), 2 * a);
    return [Min(r1, r2), Max(r1, r2)];
}
globalThis.QuadraticRoot = QuadraticRoot



/**
 * @category Algebra
 * @return the vertex [h,k] of y=ax^2+bx+c.
 * ```typescript
 * QuadraticVertex(1,2,3) // [-1,2]
 * QuadraticVertex(0,2,3) // throw
 * ```
 */
function QuadraticVertex(a: number, b: number, c: number): Point {
    Must(IsNum(a, b, c), "input must be num")
    const h = Divide(-b, 2 * a)
    const k = a * h * h + b * h + c;
    return [h, k];
}
globalThis.QuadraticVertex = QuadraticVertex



/**
 * @category Algebra
 * @return the quadratic coeff [a,b,c] from given a and roots p and q.
 * ```typescript
 * QuadraticFromRoot(1,2,3) // [1,-5,6]
 * QuadraticFromRoot(-2,4,-3) // [-2,2,24]
 * QuadraticFromRoot(0,4,-3) // throw
 * ```
 */
function QuadraticFromRoot(a: number, p: number, q: number): Quadratic {
    Must(IsNum(a, p, q), "input must be num")
    Should(IsNonZero(a), 'a should not be zero')
    return [a, -a * (p + q), a * p * q]
}
globalThis.QuadraticFromRoot = QuadraticFromRoot




/**
 * @category Algebra
 * @return the quadratic coeff [a,b,c] from given a and vertex (h,k).
 * ```typescript
 * QuadraticFromVertex(1,2,3) // [1,-4,7]
 * QuadraticFromVertex(-2,4,-3) // [-2,16,-35]
 * QuadraticFromVertex(0,4,-3) // throw
 * ```
 */
function QuadraticFromVertex(a: number, h: number, k: number): Quadratic {
    Must(IsNum(a, h, k), "input must be num")
    Should(IsNonZero(a), 'a should not be zero')
    const b = -2 * a * h
    const c = k - a * h * h - b * h
    return [a, b, c]
}
globalThis.QuadraticFromVertex = QuadraticFromVertex






/**
 * @category Algebra
 * @return the product of two input polynomials.
 * ```typescript
 * // do (1x^2+2x+3)(4x+5) = 4x^3+13x^2+22x+15
 * xPolynomial([1,2,3],[4,5]) // [4,13,22,15]
 * ```
 */
function xPolynomial(poly1: number[], poly2: number[]): number[] {
    Should(IsNonZero(poly1[0], poly2[0]), 'leading coeff should be non-zero')
    const deg1 = poly1.length - 1
    const deg2 = poly2.length - 1
    const deg = deg1 + deg2
    const result = Array(deg + 1).fill(0)
    for (let i = 0; i <= deg1; i++) {
        for (let j = 0; j <= deg2; j++) {
            result[i + j] += poly1[i] * poly2[j]
        }
    }
    return result
}
globalThis.xPolynomial = xPolynomial



/**
 * @category Algebra
 * @return [x-int, y-int,slope] of ax+by+c=0
 * ```typescript
 * LinearFeature(2,4,6) // [-3,-2,-0.5]
 * LinearFeature(0,4,6) // throw
 * ```
 */
function LinearFeature(a: number, b: number, c: number): [xInt: number, yInt: number, slope: number] {
    Should(IsNonZero(a, b), 'x and y term should be non-zero')
    return [-c / a, -c / b, -a / b]
}
globalThis.LinearFeature = LinearFeature





/**
 * @category Algebra
 * @return the coeff [a,b,c] in ax+by+c=0 from given intercepts
 * ```typescript
 * LinearFromIntercepts(1,2) // [2,1,-2]
 * LinearFromIntercepts(0,2) // throw
 * ```
 */
function LinearFromIntercepts(xInt: number, yInt: number): Linear {
    Should(IsNonZero(xInt, yInt), 'intercepts cannot be zero')
    let [a, b, c] = [yInt, xInt, -xInt * yInt]
    let s = Sign(a);
    [a, b, c] = [a * s, b * s, c * s];
    [a, b, c] = SimpRatio(a, b, c)
    return [a, b, c]
}
globalThis.LinearFromIntercepts = LinearFromIntercepts





/**
 * @category Algebra
 * @return the coeff [a,b,c] in ax+by+c=0 from two given points
 * ```typescript
 * LinearFromTwoPoints([1,2],[3,4]) // [1,-1,1]
 * LinearFromTwoPoints([1,2],[1,2]) // throw
 * ```
 */
function LinearFromTwoPoints(point1: Point, point2: Point): Linear {
    Should(AreDistinctPoint(point1, point2), 'two points should not be equal')
    let [x1, y1] = point1
    let [x2, y2] = point2
    let dx = x1 - x2
    let dy = y1 - y2
    let [a, b, c] = [dy, -dx, dx * y1 - dy * x1]
    let s = Sign(a);
    [a, b, c] = [a * s, b * s, c * s];
    [a, b, c] = SimpRatio(a, b, c)
    return [a, b, c]
}
globalThis.LinearFromTwoPoints = LinearFromTwoPoints

