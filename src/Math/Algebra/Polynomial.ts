


/**
 * @ignore
 */
class PolyClass {
    constructor(public poly: polynomial) {

    }

    vars(): string[] {
        return Object.keys(this.poly).filter(x => x !== 'coeff')
    }

    nTerm(): number {
        return this.poly.coeff.length
    }

    nVar(): number {
        return this.vars().length
    }

    coeff(position: number) {
        return this.poly.coeff[position - 1]
    }

    power(position: number, variable: string): number {
        return this.poly[variable][position - 1]
    }

    hasLikeTerms(): boolean {
        let L = newList<any>([])
        for (let i = 1; i <= this.nTerm(); i++) {
            L.push(this.vars().map(v => this.power(i, v)))
        }
        return !L.isDistinct()
    }

    powerSum(position: number): number {
        return Sum(...this.vars().map(v => this.power(position, v)))
    }

    degree() {
        let powers = []
        for (let i = 1; i <= this.nTerm(); i++) {
            powers.push(this.powerSum(i))
        }
        return Math.max(...powers)
    }


    shuffle(): polynomial {
        function reorder(arr: any[], perm: number[]): any[] {
            return perm.map(i => arr[i])
        }
        let newPoly: polynomial = { coeff: [] }
        let perm = RndShuffle(...ListIntegers(0, this.nTerm() - 1))
        for (let k in this.poly) {
            newPoly[k] = reorder(this.poly[k], perm)
        }
        return newPoly
    }

    term(position: number): polynomial {
        let p: polynomial = { coeff: [] }
        for (let k in this.poly) {
            p[k] = [this.poly[k][position - 1]]
        }
        return p
    }

    split(): polynomial[] {
        let arr: polynomial[] = []
        for (let i = 1; i <= this.nTerm(); i++) {
            arr.push(this.term(i))
        }
        return arr
    }


    append(...polys: polynomial[]): polynomial {
        let newPoly: polynomial = { coeff: [] }
        for (let k in this.poly) {
            newPoly[k] = [...this.poly[k]]
            for (let p of polys) {
                newPoly[k].push(...p[k])
            }
        }
        return newPoly
    }

    cloneShell(): polynomial {
        let newPoly: polynomial = { coeff: [] }
        for (let k in this.poly) {
            newPoly[k] = []
        }
        return newPoly
    }

    sort(desc: boolean): polynomial {
        let polys: polynomial[] = this.split()
        polys = SortBy(polys, _ => {
            let pc = new PolyClass(_)
            let k = pc.degree()
            let order = 1
            for (let v of this.vars()) {
                order = order / 10
                k += pc.power(1, v)
            }
            return k
        })
        if (desc) polys.reverse()
        let newPoly: PolyClass = new PolyClass(this.cloneShell())
        return newPoly.append(...polys)
    }

    func(): (values: { [_: string]: number }) => number {
        return (values: { [_: string]: number }) => {
            let sum = 0
            for (let i = 1; i <= this.nTerm(); i++) {
                let s = this.coeff(i)
                for (let v of this.vars()) {
                    s = s * (values[v] ** this.power(i, v))
                }
                sum += s
            }
            return sum
        }
    }


    print(): string {
        let terms: string[] = []
        for (let i = 1; i <= this.nTerm(); i++) {
            let term: string = String(this.coeff(i))
            if (term === '0') continue
            for (let v of this.vars()) {
                let p = this.power(i, v)
                if (p === 0) {
                    continue
                } else if (p === 1) {
                    term += v
                } else {
                    term += v + '^{' + p + '}'
                }
            }
            terms.push(term)
        }
        if (terms.length === 0) terms.push('0')
        return terms.join("+")
    }
}



function RndPolynomial(degree: number, vars: string[] = ["x"], terms: number = degree + 1, maxCoeff: number = 9): polynomial {
    let f = () => {
        let poly: polynomial = {
            coeff: RndZs(1, maxCoeff, terms),
        }
        for (let v of vars) {
            if (vars.length === 1) {
                poly[v] = RndNs(0, degree, terms)
            } else {
                poly[v] = dice.roll(() => RndN(0, degree)).sample(terms)
            }
        }
        return poly
    }
    return dice.roll(f).brute(p => {
        let pc = new PolyClass(p)
        return pc.degree() === degree && !pc.hasLikeTerms()
    })
}
globalThis.RndPolynomial = contract(RndPolynomial).sign([owl.positiveInt, owl.arrayWith(owl.str), owl.positiveInt, owl.num])


function PolyPrint(poly: polynomial) {
    return (new PolyClass(poly)).print()
}
globalThis.PolyPrint = contract(PolyPrint).sign([owl.polynomial])


function PolySort(poly: polynomial, desc = true) {
    return (new PolyClass(poly)).sort(desc)
}
globalThis.PolySort = contract(PolySort).sign([owl.polynomial, owl.bool])


// function PolyPrettyPrint(poly: polynomial) {
//     // return (new PolyClass(poly)).print()
// }
// globalThis.PolyPrettyPrint = contract(PolyPrettyPrint).sign([owl.polynomial])



function PolyFunction(poly: polynomial): (values: { [_: string]: number }) => number {
    return (new PolyClass(poly)).func()
}
globalThis.PolyFunction = contract(PolyFunction).sign([owl.polynomial])



function PolySplit(poly: polynomial): polynomial[] {
    return (new PolyClass(poly)).split()
}
globalThis.PolySplit = contract(PolySplit).sign([owl.polynomial])


function PolyDegree(poly: polynomial): number {
    return (new PolyClass(poly)).degree()
}
globalThis.PolyDegree = contract(PolyDegree).sign([owl.polynomial])
