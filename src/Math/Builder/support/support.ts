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
    private store: number[] = []
    private freezed: boolean = false

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
        if (this.freezed) return
        this.val = val
    }


    round(): void {
        this.set(Round(this.val, 3))
    }

    clear(): void {
        this.set(NaN)
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

    save(): void {
        this.store.push(this.val)
        this.clear()
    }

    restore(): void {
        let val = this.store.pop()
        this.set(val ?? this.val)
    }

    freeze(): void {
        this.freezed = true
    }

    unfreeze(): void {
        this.freezed = false
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

    private saveVals(): void {
        this.variables.forEach($ => $.save())
    }

    private restoreVals(): void {
        this.variables.forEach($ => $.restore())
    }

    private getVals(): number[] {
        return this.variables.map($ => $.getVal())
    }

    private solved(): boolean {
        return this.variables.every($ => $.solved())
    }

    fit() {
        this.equations.forEach($ => $.fit())
    }

    solve(): void {
        for (let i = 0; i < 10; i++) {
            for (let eq of this.equations)
                eq.solve()
            if (this.solved()) return
        }
        throw 'The system is not solvable yet.'
    }



    private analyze(rich: boolean): void {
        analyze(this, rich)
    }

    private maxOrder(): number {
        let orders = this.variables.map($ => $.order)
        return Math.max(...orders)
    }

    private givens(): Variable[] {
        return this.variables.filter($ => $.order === 0)
    }

    private hiddens(): Variable[] {
        return this.variables.filter($ => $.order > 0)
    }

    private unknownables(): Variable[] {
        let max = this.maxOrder()
        return this.variables.filter($ => $.order === max)
    }

    generateSolvables(): [givens: Variable[], hiddens: Variable[], unknown: Variable] {
        this.analyze(true)
        let unknown = RndPick(...this.unknownables())
        return [this.givens(), this.hiddens(), unknown]
    }


    generateTrend(): [constants: Variable[], control: Variable, responses: Variable[]] {
        this.analyze(false)
        let constants = RndShuffle(...this.givens())
        let control = constants.pop()!
        this.clearVals()
        this.fit()
        let T1 = this.getVals()
        control.set(control.getVal() * (RndT() ? 1.05 : 0.95))
        control.freeze()
        constants.forEach($ => $.freeze())
        this.clearVals()
        this.solve()
        let T2 = this.getVals()
        for (let i = 0; i < this.variables.length; i++) {
            let a = T1[i]
            let b = T2[i]
            let p = (b - a) / ((Math.abs(a) + Math.abs(b)) / 2)
            let threshold = 0.0000001
            if (Math.abs(p) <= threshold) this.variables[i].set(0)
            if (p > threshold) this.variables[i].set(1)
            if (p < -threshold) this.variables[i].set(-1)
        }
        let responses = this.variables.filter($ => ![control, ...constants].includes($))
        return [constants, control, responses]
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
