/**
 * @category Algebra
 * @return solve [x,y] from ax+by=c and px+qy=r.
 * ```
 * Crammer(1,1,5,1,-1,1) // [3,2] solving x+y=5 and x-y=1
 * Crammer(1,1,3,2,2,6) // throw
 * ```
 */
declare function Crammer(a: number, b: number, c: number, p: number, q: number, r: number): [number, number];
/**
 * @category Algebra
 * @return the product of two input polynomials.
 * ```
 * // do (1x^2+2x+3)(4x+5) = 4x^3+13x^2+22x+15
 * xPolynomial([1,2,3],[4,5]) // [4,13,22,15]
 * ```
 */
declare function xPolynomial(poly1: number[], poly2: number[]): number[];
/**
 * @category Algebra
 * @return the points along the parametric curve
 * ```
 * Trace(x => x ** 2, 0, 4, 5) // [[0, 0], [1, 1], [2, 4], [3, 9], [4, 16]]
 * Trace(t => [t,t**2], 0, 4, 5) // [[0, 0], [1, 1], [2, 4], [3, 9], [4, 16]]
 * ```
 */
declare function Trace(func: (t: number) => number | Point, tStart: number, tEnd: number, dots?: number): Point[];
