import { checkIt, inspectIt, captureAll, exposeAll } from 'contract'


@exposeAll()
@captureAll()
export class Algebra {

    private constructor() { }

    /**
     * solve [x,y] from ax+by=c and px+qy=r.
     * ```
     * Crammer(1,1,5,1,-1,1) // [3,2] solving x+y=5 and x-y=1
     * Crammer(1,1,3,2,2,6) // throw
     * ```
     */
    @checkIt(owl.num)
    @inspectIt(function has_unique_sol(a, b, c, p, q, r) { return a * q - b * p !== 0 })
    static Crammer(a: number, b: number, c: number, p: number, q: number, r: number): [number, number] {
        const D = a * q - b * p
        const x = (c * q - b * r) / D
        const y = (a * r - c * p) / D
        return [x, y]
    }

    /**
     * the product of two input polynomials.
     * ```
     * // do (1x^2+2x+3)(4x+5) = 4x^3+13x^2+22x+15
     * xPolynomial([1,2,3],[4,5]) // [4,13,22,15]
     * ```
     */
    @checkIt([owl.ntuple, function non_zero_leading_coeff(_) { return _[0] !== 0 }])
    static xPolynomial(poly1: number[], poly2: number[]): number[] {
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

}



declare global {
    var Crammer: typeof Algebra.Crammer
    var xPolynomial: typeof Algebra.xPolynomial
}






// function intrapolateBetween([A, B]: [Point2D, Point2D], x: number): number {
//     let [x1, y1] = A
//     let [x2, y2] = B
//     let r = (x - x1) / (x2 - x1)
//     return y1 + (y2 - y1) * r
// }

// function justOnLeft(pts: Point2D[], x: number): Point2D | undefined {
//     let smaller = pts.filter(([x0, _]) => x0 <= x)
//     if (smaller.length === 0) return undefined
//     let P = smaller[0]
//     for (let p of smaller) {
//         if (p[0] <= x && p[0] > P[0])
//             P = p
//     }
//     return P
// }


// function justOnRight(pts: Point2D[], x: number): Point2D | undefined {
//     let larger = pts.filter(([x0, _]) => x0 >= x)
//     if (larger.length === 0) return undefined
//     let P = larger[0]
//     for (let p of larger) {
//         if (p[0] >= x && p[0] < P[0])
//             P = p
//     }
//     return P
// }

// function intrapolate(sorted: Point2D[], x: number): number {
//     let first = sorted[0]
//     let last = sorted[sorted.length - 1]
//     if (x < first[0]) {
//         return intrapolateBetween([sorted[0],sorted[1]],x)
//     }
//     if (x > last[0])  {
//         return intrapolateBetween([sorted[0], sorted[1]], x)
//     }
//     let i = sorted.findIndex($ => $[0] > x) - 1
//     return intrapolateBetween([sorted[i], sorted[i + 1]], x)
// }


// function functionize() {

// }

// function differentiate(points: Point2D[],): Point2D[] {

// }


