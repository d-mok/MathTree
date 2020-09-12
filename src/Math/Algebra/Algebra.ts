
/**
 * Return the solution of ax+by=c and px+qy=r.
 * @category Algebra
 * @param {number} a - The value of a.
 * @param {number} b - The value of b.
 * @param {number} c - The value of c.
 * @param {number} p - The value of p.
 * @param {number} q - The value of q.
 * @param {number} r - The value of r.
 * @return {number[]} The array [x,y].
 * @example
 * Crammer(1,1,5,1,-1,1) // Solve x+y=5, x-y=1, return [3,2]
 */
function Crammer(a: number, b: number, c: number, p: number, q: number, r: number): number[] {
    const x = ((c * q - b * r) / (a * q - b * p));
    const y = ((a * r - c * p) / (a * q - b * p));
    return [x, y];
}
globalThis.Crammer = Crammer



/**
 * Return the discriminant of ax^2+bx+c=0.
 * @category Algebra
 * @param {number} a - The value of a.
 * @param {number} b - The value of b.
 * @param {number} c - The value of c.
 * @return {number} The discriminant b^2-4ac.
 * @example
 * Discriminant(2,3,4) // return -23
 */
function Discriminant(a: number, b: number, c: number): number {
    return b * b - 4 * a * c;
}
globalThis.Discriminant = Discriminant


/**
 * Return the roots of ax^2+bx+c=0.
 * @category Algebra
 * @param {number} a - The value of a.
 * @param {number} b - The value of b.
 * @param {number} c - The value of c.
 * @return {any[]} The roots [r1,r2], or [undefined,undefined] if no real root.
 * @example
 * QuadraticRoot(1,2,-3) // return [-3,1]
 * QuadraticRoot(1,2,1) // return [-1,-1]
 * QuadraticRoot(1,2,3) // return [undefined,undefined]
 */
function QuadraticRoot(a: number, b: number, c: number): any[] {
    const d = Discriminant(a, b, c);
    if (d < 0) return [undefined, undefined];
    const r1 = (-b - Math.sqrt(d)) / (2 * a);
    const r2 = (-b + Math.sqrt(d)) / (2 * a);
    return [r1, r2];
}
globalThis.QuadraticRoot = QuadraticRoot



/**
 * Return the vertex (h,k) of y=ax^2+bx+c.
 * @category Algebra
 * @param {number} a - The value of a.
 * @param {number} b - The value of b.
 * @param {number} c - The value of c.
 * @return {number[]} The vertex [h,k].
 * @example
 * QuadraticVertex(1,2,3) // return [-1,2]
 */
function QuadraticVertex(a: number, b: number, c: number): number[] {
    const h = -b / (2 * a);
    const k = a * h * h + b * h + c;
    return [h, k];
}
globalThis.QuadraticVertex = QuadraticVertex


/**
 * Return the product of two polynomials.
 * @category Algebra
 * @param {number[]} arr1 - An array of coefficients of polynomial 1.
 * @param {number[]} arr2 - An array of coefficients of polynomial 2.
 * @return {number[]} An array of coefficients of the product polynomial.
 * @example
 * xPolynomial([1,2,3],[4,5]) // return [4,13,22,15]
 * // since (1x^2+2x+3)(4x+5)=4x^3+13x^2+22x+15
 */
function xPolynomial(arr1: number[], arr2: number[]): number[] {
    arr1.reverse()
    arr2.reverse()
    let result = [];
    let n = 0;
    do {
        let coeff = 0;
        let count = 0;
        arr1.forEach((a, i) => {
            arr2.forEach((b, j) => {
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
    arr1.reverse()
    arr2.reverse()
    result.reverse()
    return result;
}
globalThis.xPolynomial = xPolynomial
