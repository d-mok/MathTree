import { parseUnit, findUnit } from './units'



function parseRange(rng: rangeInput): [number, number] {
    if (Array.isArray(rng)) {
        return rng.length === 2 ? rng : [rng[0], rng[0]]
    } else {
        return [rng / 10, rng * 10]
    }
}


export class Variable {

    private val: number = NaN
    public order: number = -1
    private subs: string = ""

    public unit: string
    private range: [number, number]

    constructor(
        public sym: string,
        public name: string,
        range: rangeInput,
        unit?: string
    ) {
        unit ??= findUnit(name)
        unit ??= ""
        this.unit = parseUnit(unit)
        this.range = parseRange(range)
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
        this.set(Round(this.val, 3))
    }

    shake(): void {
        let ratio = RndT() ? 1.05 : 0.95
        this.set(this.val * ratio)
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

    subsrcipt(subs: string | number = ""): void {
        this.subs = String(subs)
    }

    symbol(): string {
        if (this.subs.length > 0)
            return this.sym + "_{" + this.subs + "}"
        return this.sym
    }

    short(): string { // val
        let v = cal.blur(Round(this.val, 3))
        let abs = Math.abs(v)
        return String((abs >= 10000 || abs <= 0.01) ? Sci(v) : v)
    }

    long(): string { // val + unit
        return this.short() + this.unit
    }

    full(): string { // sym = val + unit
        return this.symbol() + " = " + this.long()
    }

    whole(): string { // name = val + unit
        return "\\text{" + this.name + "}" + " = " + this.long()
    }



    writeSymbol(latex: string): string {
        let T = latex
        let sym = this.sym
        let s = this.symbol()
        T = T.replaceAll("*(" + sym + ")", s)
        T = T.replaceAll("*" + sym, s)
        T = T.replaceAll("$(" + sym + ")", s)
        T = T.replaceAll("$" + sym, s)
        return T
    }

    writeValue(latex: string): string {
        let T = latex
        let sym = this.sym
        let S = this.short()
        let L = this.long()
        T = T.replaceAll("*(" + sym + ")", "(" + S + ")")
        T = T.replaceAll("*" + sym, S)
        T = T.replaceAll("$(" + sym + ")", "(" + L + ")")
        T = T.replaceAll("$" + sym, L)
        return T
    }


}


export class Variables extends Array<Variable>{

    private store: number[] = []

    bounds(): [number, number][] {
        return this.map($ => $.bounds())
    }


    clear(): void {
        this.forEach($ => $.clear())
    }

    widen(): void {
        this.forEach($ => $.widen())
    }

    getVals(): number[] {
        return this.map($ => $.getVal())
    }

    setVals(vals: number[]): void {
        this.forEach((v, i) => v.set(vals[i]))
    }

    solved(): boolean {
        return this.every($ => $.solved())
    }

    solvable(): boolean {
        let unsolved = this.filter($ => !$.solved())
        return unsolved.length === 1
    }

    private maxOrder(): number {
        let orders = this.map($ => $.order)
        return Math.max(...orders)
    }

    zeros(): Variables {
        return new Variables(...this.filter($ => $.order === 0))
    }

    shuffledZeros(): Variables {
        return new Variables(...RndShuffle(...this.zeros()))
    }

    positives(): Variables {
        return new Variables(...this.filter($ => $.order > 0))
    }

    tops(): Variables {
        let max = this.maxOrder()
        return new Variables(...this.filter($ => $.order === max))
    }

    pickTop(): Variable {
        return RndPick(...this.tops())
    }

    write(latex: string, showVars: Variable[]): string {
        let T = latex
        for (let v of this) {
            T = showVars.includes(v) ? v.writeValue(T) : v.writeSymbol(T)
        }
        return T
    }

    compareWith(oldVals: number[]): void {
        this.forEach((v, i) => {
            let b = v.getVal()
            let a = oldVals[i]
            let mid = (Math.abs(a) + Math.abs(b)) / 2
            let percent = (b - a) / mid
            let THRESHOLD = 0.0000001
            let sign = 0
            if (percent > THRESHOLD) sign = 1
            if (percent < -THRESHOLD) sign = -1
            v.set(sign)
        })
    }

    private save() {
        this.store = this.getVals()
    }

    private restore() {
        this.setVals(this.store)
    }

    timeLoop(func: Function, failMsg: string) {
        this.save()
        for (let i = 0; i < 100; i++) {
            this.restore()
            try {
                func()
            } catch {
                continue
            }
            return
        }
        throw "[Timeloop 100] " + failMsg
    }
}