/**
 * @category Algebra
 * @return solve [x,y] from ax+by=c and px+qy=r. 
 * ```
 * Crammer(1,1,5,1,-1,1) // [3,2] solving x+y=5 and x-y=1
 * Crammer(1,1,3,2,2,6) // throw
 * ```
 */
function Crammer(a: number, b: number, c: number, p: number, q: number, r: number): [number, number] {
    const D = a * q - b * p
    const x = (c * q - b * r) / D;
    const y = (a * r - c * p) / D;
    return [x, y];
}
globalThis.Crammer = contract(Crammer).seal({
    arg: [owl.num],
    args: function has_unique_solution(a, b, c, p, q, r) { return a * q - b * p !== 0 }
})





/**
 * @category Algebra
 * @return the product of two input polynomials.
 * ```
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
globalThis.xPolynomial = contract(xPolynomial).sign([[
    owl.ntuple,
    function non_zero_leading_coeff(_) { return _[0] !== 0 }
]])




/**
 * @category Algebra
 * @deprecated useless
 * @return the points along the parametric curve
 * ```
 * Trace(x => x ** 2, 0, 4, 5) // [[0, 0], [1, 1], [2, 4], [3, 9], [4, 16]]
 * Trace(t => [t,t**2], 0, 4, 5) // [[0, 0], [1, 1], [2, 4], [3, 9], [4, 16]]
 * ```
 */
function Trace(func: ((t: number) => number) | ((t: number) => Point2D), tStart: number, tEnd: number, dots = 1000): (Point2D | null)[] {
    return cal.trace(func, [tStart, tEnd], dots)
}
globalThis.Trace = contract(Trace).sign([owl.pass, owl.num, owl.num, owl.positiveInt])




/**
 * @category Algebra
 * @deprecated useless
 * @return the points along a circle
 * ```
 * TraceCircle([0,0],1)
 * ```
 */
function TraceCircle(center: Point2D, radius: number, angle = [0, 360]) {
    let [x, y] = center
    let r = radius
    return Trace(t => [x + r * cos(t), y + r * sin(t)], angle[0], angle[1], 100)
}
globalThis.TraceCircle = contract(TraceCircle).sign([owl.point, owl.num, owl.interval])


// /**
//  * @category Algebra
//  * @return the points along the parametric curve
//  * ```
//  * Trace(x => x ** 2, 0, 4, 5) // [[0, 0], [1, 1], [2, 4], [3, 9], [4, 16]]
//  * Trace(t => [t,t**2], 0, 4, 5) // [[0, 0], [1, 1], [2, 4], [3, 9], [4, 16]]
//  * ```
//  */
// function Trace3D(func: (t: number) => Point3D, tStart: number, tEnd: number, dots = 1000) {
//     const tracer = (t: number): Point3D => {
//         try {
//             return func(t);
//         } catch {
//             return [NaN, NaN, NaN]
//         }
//     };
//     const step = (tEnd - tStart) / (dots - 1);
//     let points: Point3D[] = []
//     for (let t = tStart; t <= tEnd; t += step) {
//         points.push(tracer(t))
//     }
//     return points
// }
// globalThis.Trace3D = contract(Trace3D).sign([owl.pass, owl.num, owl.num, owl.positiveInt])


