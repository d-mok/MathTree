/**
 * @category Quadratic
 * @return the discriminant b^2-4ac.
 * ```
 * Discriminant(2,3,4) // -23
 * ```
 */
declare function Discriminant(a: number, b: number, c: number): number;
/**
 * @category Quadratic
 * @return the roots [p,q] of ax^2+bx+c=0 where p<=q
 * ```
 * QuadraticRoot(1,2,-3) // [-3,1]
 * QuadraticRoot(1,2,3) // throw when no real root
 * ```
 */
declare function QuadraticRoot(a: number, b: number, c: number): [number, number];
/**
 * @category Quadratic
 * @return the vertex [h,k] of y=ax^2+bx+c.
 * ```
 * QuadraticVertex(1,2,3) // [-1,2]
 * ```
 */
declare function QuadraticVertex(a: number, b: number, c: number): Point;
/**
 * @category Quadratic
 * @return the quadratic coeff [a,b,c] from given a and roots p and q.
 * ```
 * QuadraticFromRoot(1,2,3) // [1,-5,6]
 * QuadraticFromRoot(-2,4,-3) // [-2,2,24]
 * ```
 */
declare function QuadraticFromRoot(a: number, p: number, q: number): Quadratic;
/**
 * @category Quadratic
 * @return the quadratic coeff [a,b,c] from given a and vertex (h,k).
 * ```
 * QuadraticFromVertex(1,2,3) // [1,-4,7]
 * QuadraticFromVertex(-2,4,-3) // [-2,16,-35]
 * ```
 */
declare function QuadraticFromVertex(a: number, h: number, k: number): Quadratic;
