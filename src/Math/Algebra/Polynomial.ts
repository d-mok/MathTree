



/**
 * @ignore
 */
class MonomialCls<V extends string> {
    constructor(
        public coeff: number = 0,
        public vars: { variable: V, power: number }[] = []
    ) { }

    random(degree: number, variables: V[], maxCoeff: number) {
        let f = () => {
            let M = new MonomialCls<V>()
            M.coeff = RndZ(1, maxCoeff)

            for (let v of variables) {
                if (variables.length === 1) {
                    M.vars.push({ variable: v, power: degree })
                } else {
                    M.vars.push({ variable: v, power: RndN(0, degree) })
                }
            }
            return M
        }
        let mon = dice.roll(f).brute(M => M.degree() === degree)
        this.coeff = mon.coeff
        this.vars = mon.vars
    }

    degree() {
        return Sum(...this.vars.map(_ => _.power))
    }

    sortedVars() {
        return SortBy([...this.vars], _ => _.variable.charCodeAt(0))

    }

    size() {
        let s = this.degree()
        let order = 1
        for (let { variable, power } of this.sortedVars()) {
            order = order / 10
            s += order * power
        }
        return s
    }

    signature() {
        return JSON.stringify(this.sortedVars())
    }

    sort() {
        this.vars = this.sortedVars()
    }

    print() {
        let term = String(this.coeff)
        if (this.coeff === 0) return term
        for (let v of this.vars) {
            let l = v.variable
            let p = v.power
            if (p === 0) {
                continue
            } else if (p === 1) {
                term += l
            } else {
                term += l + '^{' + p + '}'
            }
        }
        return term
    }

    func() {
        return (input: { [_: string]: number }) => {
            let x = this.coeff
            for (let { variable, power } of this.vars) {
                x = x * (input[variable] ** power)
            }
            return x
        }
    }
}

/**
 * @category Polynomial
 * @deprecated
 * @return a monomial object
 * ```
 * ```
 */
function Monomial<V extends string>(coeff: number, vars: { variable: V, power: number }[]) {
    return new MonomialCls<V>(coeff, vars)
}
globalThis.Monomial = contract(Monomial).sign([owl.num, owl.array])


/**
 * @category Polynomial
 * @return a random polynomial object
 * ```
 * RndPolynomial(5, ['x', 'y'], 3, 9))
 * // may return 7xy+3x^2y^3-2xy^3
 * ```
 */
function RndPolynomial<V extends string>(degree: number, vars: V[] = ["x" as V], terms: number = degree + 1, maxCoeff: number = 9): polynomial<V> {
    let RndMono = () => {
        let M = new MonomialCls<V>()
        M.random(RndN(0, degree), vars, maxCoeff)
        return M
    }
    let f = () => dice.roll(RndMono).unique(terms, M => M.size())
    return dice.roll(f).brute(P => Max(...P.map(M => M.degree())) === degree)

}
globalThis.RndPolynomial = contract(RndPolynomial).sign([owl.positiveInt, owl.arrayWith(owl.str), owl.positiveInt, owl.num])




/**
 * @category Polynomial
 * @return a string of the polynomial object
 * ```
 * PolyPrint([x^5, 2x^6, 3x^7])
 * // x^{5}+2x^{6}+3x^{7}
 * ```
 */
function PolyPrint<V extends string>(poly: polynomial<V>): string {
    return poly.map(M => M.print()).filter(x => x !== '0').join("+")
}
globalThis.PolyPrint = contract(PolyPrint).sign([owl.polynomial])



/**
 * @category Polynomial
 * @return a polynomial object sorted by power
 * ```
 * PolySort([2x^6, x^5, 3x^7])
 * //  [x^5, 2x^6, 3x^7]
 * ```
 */
function PolySort<V extends string>(poly: polynomial<V>, desc = true): polynomial<V> {
    let arr = SortBy(poly, M => M.size())
    if (desc) arr.reverse()
    return arr
}
globalThis.PolySort = contract(PolySort).sign([owl.polynomial, owl.bool])


// function PolyPrettyPrint(poly: polynomial) {
//     // return (new PolyClass(poly)).print()
// }
// globalThis.PolyPrettyPrint = contract(PolyPrettyPrint).sign([owl.polynomial])


/**
 * @category Polynomial
 * @return a function of the polynomial, for substitution
 * ```
 * func = PolyFunction([2x^6, x^5, 3x^7])
 * func({x:2}) // 272
 * ```
 */
function PolyFunction<V extends string>(poly: polynomial<V>): (values: { [_: string]: number }) => number {
    return (values: { [_: string]: number }): number => {
        return Sum(...poly.map(M => M.func()(values)))
    }
}
globalThis.PolyFunction = contract(PolyFunction).sign([owl.polynomial])





/**
 * @category Polynomial
 * @return join arrays of monomials
 * ```
 * PolyJoin([x^5, 2x^6], [3x^7])
 * // [x^5, 2x^6, 3x^7]
 * ```
 */
function PolyJoin<V extends string>(...polys: polynomial<V>[]): polynomial<V> {
    let arr: polynomial<V> = []
    for (let p of polys)
        arr.push(...p)
    return arr
}
globalThis.PolyJoin = contract(PolyJoin).sign([owl.polynomial])



/**
 * @category Polynomial
 * @return combine like terms in polynomial
 * ```
 * PolySimplify([x^5, 2x^6, 3x^5])
 * // [4x^5, 2x^6]
 * ```
 */
function PolySimplify<V extends string>(poly: polynomial<V>): polynomial<V> {
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
    return arr
}
globalThis.PolySimplify = contract(PolySimplify).sign([owl.polynomial])





/**
 * @category Polynomial
 * @return the degree of the polynomial
 * ```
 * PolyDegree([x^5, 2x^6, 3x^7]) // 7
 * ```
 */
function PolyDegree<V extends string>(poly: polynomial<V>): number {
    return Max(...poly.map(M => M.degree()))
}
globalThis.PolyDegree = contract(PolyDegree).sign([owl.polynomial])
