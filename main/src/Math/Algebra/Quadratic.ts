import { checkIt, inspectIt, captureAll, exposeAll } from 'contract'


@exposeAll()
@captureAll()
export class Host {


    /**
     * the discriminant b^2-4ac.
     * ```
     * Discriminant(2,3,4) // -23
     * ```
     */
    @checkIt(owl.nonZero, owl.num, owl.num)
    static Discriminant(a: number, b: number, c: number): number {
        return b * b - 4 * a * c
    }


    /**
     * the roots [p,q] of ax^2+bx+c=0 where p<=q
     * ```
     * QuadraticRoot(1,2,-3) // [-3,1]
     * QuadraticRoot(1,2,3) // throw when no real root
     * ```
     */
    @checkIt(owl.nonZero, owl.num, owl.num)
    @inspectIt(function has_real_root(a, b, c) { return b ** 2 - 4 * a * c >= 0 })
    static QuadraticRoot(a: number, b: number, c: number): [number, number] {
        const d = Discriminant(a, b, c)
        const s = Math.sqrt(d)
        const r1 = Divide(-b - s, 2 * a)
        const r2 = Divide(-b + s, 2 * a)
        return [Min(r1, r2), Max(r1, r2)]
    }



    /**
     * the vertex [h,k] of y=ax^2+bx+c.
     * ```
     * QuadraticVertex(1,2,3) // [-1,2]
     * ```
     */
    @checkIt(owl.nonZero, owl.num, owl.num)
    static QuadraticVertex(a: number, b: number, c: number): Point2D {
        const h = Divide(-b, 2 * a)
        const k = a * h * h + b * h + c
        return [h, k]
    }



    /**
     * the quadratic coeff [a,b,c] from given a and roots p and q.
     * ```
     * QuadraticFromRoot(1,2,3) // [1,-5,6]
     * ```
     */
    @checkIt(owl.nonZero, owl.num, owl.num)
    static QuadraticFromRoot(a: number, p: number, q: number): Quadratic {
        return [a, -a * (p + q), a * p * q]
    }




    /**
     * the quadratic coeff [a,b,c] from given a and vertex (h,k).
     * ```
     * QuadraticFromVertex(1,2,3) // [1,-4,7]
     * ```
     */
    @checkIt(owl.nonZero, owl.num, owl.num)
    static QuadraticFromVertex(a: number, h: number, k: number): Quadratic {
        const b = -2 * a * h
        const c = k - a * h * h - b * h
        return [a, b, c]
    }




}







declare global {
    var Discriminant: typeof Host.Discriminant
    var QuadraticRoot: typeof Host.QuadraticRoot
    var QuadraticVertex: typeof Host.QuadraticVertex
    var QuadraticFromRoot: typeof Host.QuadraticFromRoot
    var QuadraticFromVertex: typeof Host.QuadraticFromVertex
}



