import { bisection } from './bisect'


const UNITS: { [_: string]: string } = {
    'Pa': '~\\text{Pa}',
    'm3': '~\\text{m}^3',
    'cm3': '~\\text{cm}^3',
    'mol': '~\\text{mol}',
    'K': '~\\text{K}',
    '°C': '~\\text{°C}',
}



export class Variable {

    private val: number = NaN

    constructor(
        public sym: string,
        public name: string,
        public range: [number, number],
        public unit: string = ""
    ) {
        this.unit = UNITS[this.unit] ?? this.unit
    }

    bounds(): [number, number] {
        if (Number.isFinite(this.val))
            return [this.val, this.val]
        return this.range
    }

    set(val: number): void {
        this.val = val
    }

    round(): void {
        this.val = Round(this.val, 3)
    }

    clear(): void {
        this.val = NaN
    }

    getVal(): number {
        return this.val
    }

    widen(fraction: number = 0.1): void {
        let [min, max] = this.range
        this.range = [
            min - Math.abs(min * fraction),
            max + Math.abs(max * fraction)
        ]
    }

    short(): string { // val
        return Number.parseFloat(this.val.toPrecision(3)).toString()
    }

    long(): string { // val + unit
        return this.short() + this.unit
    }

    full(): string { // sym = val + unit
        return this.sym + " = " + this.long()
    }

    whole(): string { // name = val + unit
        return "\\text{" + this.name + "}" + " = " + this.long()
    }

}


export class Equation {

    constructor(
        public zeroFunc: Fun,
        public latex: string,
        public dep: Variable[]
    ) { }

    fit() {
        const bounds = this.dep.map($ => $.bounds())
        let roots = bisection(this.zeroFunc, bounds)
        this.dep.forEach((v, i) => v.set(roots[i]))
    }

    private missingDepCount(vars: Variable[]): number {
        let nIncluded = this.dep.filter(v => vars.includes(v)).length
        return this.dep.length - nIncluded
    }

    isSolvable(givens: Variable[]): boolean {
        return this.missingDepCount(givens) <= 1
    }

    isSolved(givens: Variable[]): boolean {
        return this.missingDepCount(givens) === 0
    }

    print(show: Variable[] = []): string {
        let T = this.latex
        for (let v of this.dep) {
            let shown = show.includes(v)
            T = T.replaceAll("*(" + v.sym + ")", shown ? "(" + v.short() + ")" : v.sym)
            T = T.replaceAll("*" + v.sym, shown ? v.short() : v.sym)
            T = T.replaceAll("$(" + v.sym + ")", shown ? "(" + v.long() + ")" : v.sym)
            T = T.replaceAll("$" + v.sym, shown ? v.long() : v.sym)
        }
        return T
    }

}

export class EquSystem {
    constructor(
        public variables: Variable[],
        public equations: Equation[]
    ) { }

    private clearVals(): void {
        this.variables.forEach($ => $.clear())
    }

    solve() {
        this.equations.forEach($ => $.fit())
    }


    compare() {
        this.clearVals()
        this.solve()
        let T1 = this.variables.map(v => v.getVal())
        this.clearVals()
        this.solve()
        let T2 = this.variables.map(v => v.getVal())
        for (let i = 0; i < this.variables.length; i++) {
            let a = T1[i]
            let b = T2[i]
            let p = (b - a) / ((Math.abs(a) + Math.abs(b)) / 2)
            let threshold = 0.0000001
            if (Math.abs(p) <= threshold) this.variables[i].set(0)
            if (p > threshold) this.variables[i].set(1)
            if (p < -threshold) this.variables[i].set(-1)
        }

    }


    private canBeGivens(givens: Variable[]): boolean {
        let found = [...givens]
        for (let i = 0; i < 10; i++) {
            for (let eq of this.equations) {
                if (eq.isSolvable(found)) found.push(...eq.dep)
            }
            if (this.variables.every(v => found.includes(v))) return true
        }
        return false
    }

    private canBeUnknown(unknown: Variable, givens: Variable[]): boolean {
        return !this.equations.some(eq => eq.isSolved([unknown, ...givens]))
    }

    generateSolvables(): [givens: Variable[], ungivens: Variable[], unknown: Variable] {
        let n = this.equations.length
        for (let i = 0; i < 100; i++) {
            let ungivens = RndPickN(this.variables, n)
            let givens = this.variables.filter(v => !ungivens.includes(v))
            if (!this.canBeGivens(givens)) continue
            for (let u of ungivens) {
                if (this.canBeUnknown(u, givens))
                    return [givens, ungivens, u]
            }
        }
        throw 'fail to generate sensible givens and unknown after 100 trials'
    }


    print(givens: Variable[] = []): string {
        let T = ""
        T += "\\left\\{\\begin{aligned}"
        for (let eq of this.equations)
            T += eq.print(givens) + " \\\\ "
        T += " \\end{aligned}\\right. \\\\"
        return T
    }

}




export function toVariables(vars: [sym: string, name: string, range: [number, number], unit: string][]): Variable[] {
    return vars.map(([sym, name, range, unit]) => new Variable(sym, name, range, unit))
}

export function toEquations(eqs: [func: Fun, latex: string, dep: string[]][], vars: Variable[]): Equation[] {
    function getVars(dep: string[]): Variable[] {
        return dep.map($ => vars.find(v => v.sym === $)!)
    }
    return eqs.map(([func, latex, dep]) => new Equation(func, latex, getVars(dep)))
}
