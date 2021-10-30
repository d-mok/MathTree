import { analyze } from './analyzer'
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
    public order: number = -1

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

    solved(): boolean {
        return Number.isFinite(this.val)
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

    solvable(): boolean {
        let unsolved = this.dep.filter($ => !$.solved())
        return unsolved.length === 1
    }

    solve() {
        if (this.solvable()) this.fit()
    }

    fit() {
        const bounds = this.dep.map($ => $.bounds())
        let roots = bisection(this.zeroFunc, bounds)
        this.dep.forEach((v, i) => v.set(roots[i]))
    }


    // private missingDepCount(vars: Variable[]): number {
    //     let nIncluded = this.dep.filter(v => vars.includes(v)).length
    //     return this.dep.length - nIncluded
    // }

    // isSolvable(givens: Variable[]): boolean {
    //     return this.missingDepCount(givens) <= 1
    // }

    // isSolved(givens: Variable[]): boolean {
    //     return this.missingDepCount(givens) === 0
    // }

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

    private solved(): boolean {
        return this.variables.every($ => $.solved())
    }

    fit() {
        this.equations.forEach($ => $.fit())
    }

    solve(): void {
        for (let i = 0; i < 10; i++) {
            for (let eq of this.equations) eq.solve()
            if (this.solved()) return
        }
        throw 'The system is not solvable yet.'
    }



    compare() {
        this.clearVals()
        this.fit()
        let T1 = this.variables.map(v => v.getVal())
        this.clearVals()
        this.fit()
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



    private analyze(): void {
        analyze(this)
    }

    private maxOrder(): number {
        let orders = this.variables.map($ => $.order)
        return Math.max(...orders)
    }

    private givens(): Variable[] {
        return this.variables.filter($ => $.order === 0)
    }

    private hiddens(): Variable[] {
        let max = this.maxOrder()
        return this.variables.filter($ => $.order > 0 && $.order < max)
    }

    private unknownables(): Variable[] {
        let max = this.maxOrder()
        return this.variables.filter($ => $.order === max)
    }

    generateSolvables(): [givens: Variable[], hiddens: Variable[], unknown: Variable] {
        this.analyze()
        let unknown = RndPick(...this.unknownables())
        return [this.givens(), this.hiddens(), unknown]
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
