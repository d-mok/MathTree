import { poker, dice } from 'fate'




/**
 * @ignore
 */
export class MonomialCls<V extends string> {
    constructor(
        public coeff: number = 0,
        public vars: { variable: V, power: number }[] = []
    ) { }

    clone() {
        let coeff = this.coeff
        let vars = JSON.parse(JSON.stringify(this.vars))
        return new MonomialCls<V>(coeff, vars)
    }

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
        let mon = dice(f).shield(M => M.degree() === degree).roll()
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
