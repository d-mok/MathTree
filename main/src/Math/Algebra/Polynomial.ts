


import { checkIt, inspectIt, captureAll, exposeAll } from 'contract'
import { MonomialCls } from './PolynomialClass'
import { poker, dice } from 'fate'


@exposeAll()
@captureAll()
class Host {



    /**
     * @deprecated
     * a monomial object
     */
    @checkIt(owl.num, owl.array)
    static Monomial<V extends string>(coeff: number, vars: { variable: V, power: number }[]) {
        return new MonomialCls<V>(coeff, vars)
    }



    /**
     * clone a polynomial
     * ```
     * PolyClone(7xy+3x^2y^3-2xy^3)
     * //  7xy+3x^2y^3-2xy^3
     * ```
     */
    @checkIt(owl.polynomial)
    static PolyClone<V extends string>(poly: polynomial<V>): polynomial<V> {
        return poly.map(M => M.clone())
    }


    /**
     * a random polynomial object
     * ```
     * RndPolynomial(5, ['x', 'y'], 3, 9))
     * // may return 7xy+3x^2y^3-2xy^3
     * ```
     */
    @checkIt(owl.positiveInt, owl.arrayWith(owl.str), owl.positiveInt, owl.num)
    static RndPolynomial<V extends string>(degree: number, vars: V[] = ["x" as V], terms: number = degree + 1, maxCoeff: number = 9): polynomial<V> {
        let RndMono = () => {
            let M = new MonomialCls<V>()
            M.random(RndN(0, degree), vars, maxCoeff)
            return M
        }
        let f = () => dice(RndMono).unique(M => M.size()).rolls(terms)
        return dice(f).shield(P => Max(...P.map(M => M.degree())) === degree).roll()

    }






    /**
     * a string of the polynomial object
     * ```
     * PolyPrint([x^5, 2x^6, 3x^7])
     * // x^{5}+2x^{6}+3x^{7}
     * ```
     */
    @checkIt(owl.polynomial)
    static PolyPrint<V extends string>(poly: polynomial<V>): string {
        return poly.map(M => M.print()).filter(x => x !== '0').join("+")
    }



    /**
     * a polynomial object sorted by power
     * ```
     * PolySort([2x^6, x^5, 3x^7])
     * //  [x^5, 2x^6, 3x^7]
     * ```
     */
    @checkIt(owl.polynomial, owl.bool)
    static PolySort<V extends string>(poly: polynomial<V>, desc = true): polynomial<V> {
        poly = PolyClone(poly)
        let arr = SortBy(poly, M => desc ? -M.size() : M.size())
        return arr
    }


    // function PolyPrettyPrint(poly: polynomial) {
    //     // return (new PolyClass(poly)).print()
    // }
    // globalThis.PolyPrettyPrint = contract(PolyPrettyPrint).sign([owl.polynomial])


    /**
     * a function of the polynomial, for substitution
     * ```
     * func = PolyFunction([2x^6, x^5, 3x^7])
     * func({x:2}) // 272
     * ```
     */
    @checkIt(owl.polynomial)
    static PolyFunction<V extends string>(poly: polynomial<V>): (values: { [_: string]: number }) => number {
        poly = PolyClone(poly)
        return (values: { [_: string]: number }): number => {
            return Sum(...poly.map(M => M.func()(values)))
        }
    }





    /**
     * join arrays of monomials
     * ```
     * PolyJoin([x^5, 2x^6], [3x^7])
     * // [x^5, 2x^6, 3x^7]
     * ```
     */
    @checkIt(owl.polynomial)
    static PolyJoin<V extends string>(...polys: polynomial<V>[]): polynomial<V> {
        polys = polys.map(p => PolyClone(p))
        let arr: polynomial<V> = []
        for (let p of polys)
            arr.push(...p)
        return arr
    }



    /**
     * combine like terms in polynomial
     * ```
     * PolySimplify([x^5, 2x^6, 3x^5])
     * // [4x^5, 2x^6]
     * ```
     */
    @checkIt(owl.polynomial)
    static PolySimplify<V extends string>(poly: polynomial<V>): polynomial<V> {
        poly = PolyClone(poly)
        let arr: polynomial<V> = []
        function findLikeTerm(M: MonomialCls<V>) {
            return arr.find(m => m.signature() === M.signature())
        }
        for (let M of poly) {
            let like = findLikeTerm(M)
            if (like) {
                like.coeff += M.coeff
            } else {
                arr.push(M)
            }
        }
        return arr.filter(m => m.coeff !== 0)
    }





    /**
     * the degree of the polynomial
     * ```
     * PolyDegree([x^5, 2x^6, 3x^7]) // 7
     * ```
     */
    @checkIt(owl.polynomial)
    static PolyDegree<V extends string>(poly: polynomial<V>): number {
        return Max(...poly.map(M => M.degree()))
    }



}






declare global {
    var Monomial: typeof Host.Monomial
    var PolyClone: typeof Host.PolyClone
    var RndPolynomial: typeof Host.RndPolynomial
    var PolyPrint: typeof Host.PolyPrint
    var PolySort: typeof Host.PolySort
    var PolyFunction: typeof Host.PolyFunction
    var PolyJoin: typeof Host.PolyJoin
    var PolySimplify: typeof Host.PolySimplify
    var PolyDegree: typeof Host.PolyDegree
}



