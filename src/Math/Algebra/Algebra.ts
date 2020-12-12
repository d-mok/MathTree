
/**
 * @category Algebra
 * @return the solution [x,y] of ax+by=c and px+qy=r.
 * ```typescript
 * Crammer(1,1,5,1,-1,1) // Solve x+y=5, x-y=1, return [3,2]
 * ```
 */
function Crammer(a: number, b: number, c: number, p: number, q: number, r: number): [number, number] {
    const x = ((c * q - b * r) / (a * q - b * p));
    const y = ((a * r - c * p) / (a * q - b * p));
    return [x, y];
}
globalThis.Crammer = Crammer



/**
 * @category Algebra
 * @return {number} the discriminant b^2-4ac.
 * ```typescript
 * Discriminant(2,3,4) // return -23
 * ```
 */
function Discriminant(a: number, b: number, c: number): number {
    return b * b - 4 * a * c;
}
globalThis.Discriminant = Discriminant


/**
 * @category Algebra
 * @return the roots of ax^2+bx+c=0 as [r1,r2], or [undefined,undefined] if no real root.
 * ```typescript
 * QuadraticRoot(1,2,-3) // return [-3,1]
 * QuadraticRoot(-1,-2,3) // return [-3,1]
 * QuadraticRoot(1,2,1) // return [-1,-1]
 * QuadraticRoot(1,2,3) // return [undefined,undefined]
 * ```
 */
function QuadraticRoot(a: number, b: number, c: number): [number, number] | [undefined, undefined] {
    const d = Discriminant(a, b, c);
    if (d < 0) return [undefined, undefined];
    const r1 = (-b - Math.sqrt(d)) / (2 * a);
    const r2 = (-b + Math.sqrt(d)) / (2 * a);
    return [Math.min(r1, r2), Math.max(r1, r2)];
}
globalThis.QuadraticRoot = QuadraticRoot



/**
 * @category Algebra
 * @return the vertex [h,k] of y=ax^2+bx+c.
 * ```typescript
 * QuadraticVertex(1,2,3) // return [-1,2]
 * ```
 */
function QuadraticVertex(a: number, b: number, c: number): [number, number] {
    const h = -b / (2 * a);
    const k = a * h * h + b * h + c;
    return [h, k];
}
globalThis.QuadraticVertex = QuadraticVertex



/**
 * @category Algebra
 * @return the quadratic coeff [a,b,c] from given a and roots p and q.
 * ```typescript
 * QuadraticFromRoot(1,2,3) // return [1,-5,6]
 * QuadraticFromRoot(-2,4,-3) // return [-2,2,24]
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
 * QuadraticFromVertex(1,2,3) // return [1,-4,7]
 * QuadraticFromVertex(-2,4,-3) // return [-2,16,-35]
 * ```
 */
function QuadraticFromVertex(a: number, h: number, k: number): [number, number, number] {
    let b = -2 * a * h
    let c = k - a * h * h - b * h
    return [a, b, c]
}
globalThis.QuadraticFromVertex = QuadraticFromVertex






/**
 * @category Algebra
 * @return the product of two input polynomials.
 * ```typescript
 * xPolynomial([1,2,3],[4,5]) // return [4,13,22,15]
 * // since (1x^2+2x+3)(4x+5)=4x^3+13x^2+22x+15
 * ```
 */
function xPolynomial(poly1: number[], poly2: number[]): number[] {
    poly1.reverse()
    poly2.reverse()
    let result = [];
    let n = 0;
    do {
        let coeff = 0;
        let count = 0;
        poly1.forEach((a, i) => {
            poly2.forEach((b, j) => {
                if (i + j === n) {
                    count++;
                    coeff += a * b;
                }
            });
        });
        if (count > 0) {
            result.push(coeff);
        } else {
            break;
        }
        n++;
    } while (true);
    poly1.reverse()
    poly2.reverse()
    result.reverse()
    return result;
}
globalThis.xPolynomial = xPolynomial
