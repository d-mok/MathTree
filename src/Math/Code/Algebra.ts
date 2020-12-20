/**
 * @category Algebra
 * @return solve [x,y] from ax+by=c and px+qy=r. 
 * ```typescript
 * Crammer(1,1,5,1,-1,1) // [3,2] solving x+y=5 and x-y=1
 * Crammer(1,1,3,2,2,6) // [NaN,NaN] solving x+y=3 and 2x+2y=6
 * ```
 */
function Crammer(a: number, b: number, c: number, p: number, q: number, r: number): [number, number] {
    Must(IsNum(a, b, c, p, q, r), "Crammer: input must be num")
    const D = a * q - b * p
    Should(D !== 0, 'Crammer: no unique solution!')
    // if (D === 0) return [NaN, NaN]
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
 * QuadraticRoot(1,2,3) // [NaN,NaN] no real root
 * ```
 */
function QuadraticRoot(a: number, b: number, c: number): [number, number] {
    const d = Discriminant(a, b, c);
    if (d < 0) return [NaN, NaN];
    const r1 = (-b - Math.sqrt(d)) / (2 * a);
    const r2 = (-b + Math.sqrt(d)) / (2 * a);
    return [Math.min(r1, r2), Math.max(r1, r2)];
}
globalThis.QuadraticRoot = QuadraticRoot



/**
 * @category Algebra
 * @return the vertex [h,k] of y=ax^2+bx+c.
 * ```typescript
 * QuadraticVertex(1,2,3) // [-1,2]
 * ```
 */
function QuadraticVertex(a: number, b: number, c: number): Point {
    const h = -b / (2 * a);
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
 * ```
 */
function QuadraticFromRoot(a: number, p: number, q: number): [number, number, number] {
    return [a, -a * (p + q), a * p * q]
}
globalThis.QuadraticFromRoot = QuadraticFromRoot




/**
 * @category Algebra
 * @return the quadratic coeff [a,b,c] from given a and vertex (h,k).
 * ```typescript
 * QuadraticFromVertex(1,2,3) // [1,-4,7]
 * QuadraticFromVertex(-2,4,-3) // [-2,16,-35]
 * ```
 */
function QuadraticFromVertex(a: number, h: number, k: number): [number, number, number] {
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
 * @return the coeff [a,b,c] in ax+by+c=0 from given intercepts
 * ```typescript
 * LinearFromIntercepts(1,2) // [2,1,-2]
 * ```
 */
function LinearFromIntercepts(xInt: number, yInt: number): [number, number, number] {
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
 * ```
 */
function LinearFromTwoPoints(point1: Point, point2: Point) {
    let [x1, y1] = point1
    let [x2, y2] = point2
    Should(x1 !== x2 || y1 !== y2, 'two points equal')
    let dx = x1 - x2
    let dy = y1 - y2
    let [a, b, c] = [dy, -dx, dx * y1 - dy * x1]
    let s = Sign(a);
    [a, b, c] = [a * s, b * s, c * s];
    [a, b, c] = SimpRatio(a, b, c)
    return [a, b, c]
}
globalThis.LinearFromTwoPoints = LinearFromTwoPoints