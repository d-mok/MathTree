/**
 * @category Quadratic
 * @return the discriminant b^2-4ac.
 * ```
 * Discriminant(2,3,4) // -23
 * ```
 */
function Discriminant(a: number, b: number, c: number): number {
    return b * b - 4 * a * c;
}
globalThis.Discriminant = contract(Discriminant).sign([owl.nonZero, owl.num, owl.num])


/**
 * @category Quadratic
 * @return the roots [p,q] of ax^2+bx+c=0 where p<=q
 * ```
 * QuadraticRoot(1,2,-3) // [-3,1]
 * QuadraticRoot(1,2,3) // throw when no real root
 * ```
 */
function QuadraticRoot(a: number, b: number, c: number): [number, number] {
    const d = Discriminant(a, b, c);
    const s = Math.sqrt(d)
    const r1 = Divide(-b - s, 2 * a);
    const r2 = Divide(-b + s, 2 * a);
    return [Min(r1, r2), Max(r1, r2)];
}
globalThis.QuadraticRoot = contract(QuadraticRoot).seal({
    arg: [owl.nonZero, owl.num, owl.num],
    args: function has_real_root(a, b, c) { return b ** 2 - 4 * a * c >= 0 }
})


/**
 * @category Quadratic
 * @return the vertex [h,k] of y=ax^2+bx+c.
 * ```
 * QuadraticVertex(1,2,3) // [-1,2]
 * ```
 */
function QuadraticVertex(a: number, b: number, c: number): Point {
    const h = Divide(-b, 2 * a)
    const k = a * h * h + b * h + c;
    return [h, k];
}
globalThis.QuadraticVertex = contract(QuadraticVertex).sign([owl.nonZero, owl.num, owl.num])



/**
 * @category Quadratic
 * @return the quadratic coeff [a,b,c] from given a and roots p and q.
 * ```
 * QuadraticFromRoot(1,2,3) // [1,-5,6]
 * QuadraticFromRoot(-2,4,-3) // [-2,2,24]
 * ```
 */
function QuadraticFromRoot(a: number, p: number, q: number): Quadratic {
    return [a, -a * (p + q), a * p * q]
}
globalThis.QuadraticFromRoot = contract(QuadraticFromRoot).sign([owl.nonZero, owl.num, owl.num])




/**
 * @category Quadratic
 * @return the quadratic coeff [a,b,c] from given a and vertex (h,k).
 * ```
 * QuadraticFromVertex(1,2,3) // [1,-4,7]
 * QuadraticFromVertex(-2,4,-3) // [-2,16,-35]
 * ```
 */
function QuadraticFromVertex(a: number, h: number, k: number): Quadratic {
    const b = -2 * a * h
    const c = k - a * h * h - b * h
    return [a, b, c]
}
globalThis.QuadraticFromVertex = contract(QuadraticFromVertex).sign([owl.nonZero, owl.num, owl.num])


