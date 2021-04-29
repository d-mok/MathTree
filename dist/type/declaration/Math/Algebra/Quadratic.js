"use strict";
/**
 * @category Quadratic
 * @return the discriminant b^2-4ac.
 * ```typescript
 * Discriminant(2,3,4) // -23
 * ```
 */
function Discriminant(a, b, c) {
    Should(IsNum(a, b, c), "input must be num");
    Should(a !== 0, "a must be non-zero");
    return b * b - 4 * a * c;
}
globalThis.Discriminant = Discriminant;
/**
 * @category Quadratic
 * @return the roots [p,q] of ax^2+bx+c=0 where p<=q
 * ```typescript
 * QuadraticRoot(1,2,-3) // [-3,1]
 * QuadraticRoot(1,2,3) // throw when no real root
 * ```
 */
function QuadraticRoot(a, b, c) {
    Should(IsNum(a, b, c), "input must be num");
    Should(a !== 0, "a must be non-zero");
    const d = Discriminant(a, b, c);
    Should(d >= 0, 'no real root');
    const s = Math.sqrt(d);
    const r1 = Divide(-b - s, 2 * a);
    const r2 = Divide(-b + s, 2 * a);
    return [Min(r1, r2), Max(r1, r2)];
}
globalThis.QuadraticRoot = QuadraticRoot;
/**
 * @category Quadratic
 * @return the vertex [h,k] of y=ax^2+bx+c.
 * ```typescript
 * QuadraticVertex(1,2,3) // [-1,2]
 * ```
 */
function QuadraticVertex(a, b, c) {
    Should(IsNum(a, b, c), "input must be num");
    Should(a !== 0, "a must be non-zero");
    const h = Divide(-b, 2 * a);
    const k = a * h * h + b * h + c;
    return [h, k];
}
globalThis.QuadraticVertex = QuadraticVertex;
/**
 * @category Quadratic
 * @return the quadratic coeff [a,b,c] from given a and roots p and q.
 * ```typescript
 * QuadraticFromRoot(1,2,3) // [1,-5,6]
 * QuadraticFromRoot(-2,4,-3) // [-2,2,24]
 * ```
 */
function QuadraticFromRoot(a, p, q) {
    Should(IsNum(a, p, q), "input must be num");
    Should(a !== 0, "a must be non-zero");
    return [a, -a * (p + q), a * p * q];
}
globalThis.QuadraticFromRoot = QuadraticFromRoot;
/**
 * @category Quadratic
 * @return the quadratic coeff [a,b,c] from given a and vertex (h,k).
 * ```typescript
 * QuadraticFromVertex(1,2,3) // [1,-4,7]
 * QuadraticFromVertex(-2,4,-3) // [-2,16,-35]
 * ```
 */
function QuadraticFromVertex(a, h, k) {
    Should(IsNum(a, h, k), "input must be num");
    Should(a !== 0, "a must be non-zero");
    const b = -2 * a * h;
    const c = k - a * h * h - b * h;
    return [a, b, c];
}
globalThis.QuadraticFromVertex = QuadraticFromVertex;
