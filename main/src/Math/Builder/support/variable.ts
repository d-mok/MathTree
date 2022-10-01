import { parseUnit, findUnit } from './units'

function parseRange(rng: rangeInput): [number, number] {
    if (Array.isArray(rng)) {
        return rng.length === 2 ? rng : [rng[0], rng[0]]
    } else {
        return rng > 0 ? [rng / 10, rng * 10] : [rng * 10, rng / 10]
    }
}

export class Variable {
    private val: number = NaN
    private subscript: string = ''

    public unit: string
    public range: [number, number]
    private display: string

    constructor(
        public sym: string,
        public name: string,
        range: rangeInput,
        unit: string | undefined,
        display: string | undefined
    ) {
        unit ??= findUnit(name)
        unit ??= ''
        this.unit = parseUnit(unit)
        this.range = parseRange(range)
        let [min, max] = this.range
        if (min > max) throw '[Variable] Range must have max > min'
        this.display = display ?? this.sym
    }

    set(val: number): void {
        this.val = val
    }

    round(sigfig: number = 2): void {
        this.set(Round(this.val, sigfig))
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

    widen(fraction: number = 0.1): void {
        let [min, max] = this.range
        this.range = [
            min - Math.abs(min * fraction),
            max + Math.abs(max * fraction),
        ]
    }

    label(subscript: string | number = ''): void {
        this.subscript = String(subscript)
    }

    symbol(): string {
        if (this.subscript.length > 0)
            return this.display + '_{' + this.subscript + '}'
        return this.display
    }

    short(): string {
        // val
        let v = cal.blur(Round(this.val, 3))
        let abs = Math.abs(v)
        return String(abs >= 10000 || abs <= 0.01 ? Sci(v) : v)
    }

    long(): string {
        // val + unit
        return this.short() + this.unit
    }

    full(): string {
        // sym = val + unit
        return this.symbol() + ' = ' + this.long()
    }

    whole(): string {
        // name = val + unit
        return '\\text{' + this.name + '}' + ' = ' + this.long()
    }

    rich(): string {
        return (
            '\\text{' + this.name + '}~' + this.symbol() + ' = ' + this.long()
        )
    }

    writeSymbol(latex: string): string {
        let T = latex
        let sym = this.sym
        let s = this.symbol()
        T = T.replaceAll('*(' + sym + ')', s)
        T = T.replaceAll('*' + sym, s)
        T = T.replaceAll('$(' + sym + ')', s)
        T = T.replaceAll('$' + sym, s)
        return T
    }

    writeValue(latex: string): string {
        let T = latex
        let sym = this.sym
        let S = this.short()
        let L = this.long()
        T = T.replaceAll('*(' + sym + ')', '(' + S + ')')
        T = T.replaceAll('*' + sym, S)
        T = T.replaceAll('$(' + sym + ')', '(' + L + ')')
        T = T.replaceAll('$' + sym, L)
        return T
    }
}

export class Variables extends Array<Variable> {
    clear(): void {
        this.forEach($ => $.clear())
    }

    widen(): void {
        this.forEach($ => $.widen())
    }

    getVals(): number[] {
        return this.map($ => $.getVal())
    }

    setVal(obj: valObj): void {
        for (let k in obj) {
            let val = obj[k]
            let variable = this.find($ => $.sym === k)!
            variable.set(val)
        }
    }

    write(latex: string, showVars: Variable[]): string {
        let T = latex
        let shows = [...showVars]
        shows.sort((a, b) => b.sym.length - a.sym.length)
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

    rangeObj(): rangeObj {
        let obj: rangeObj = {}
        for (let v of this) {
            obj[v.sym] = v.range
        }
        return obj
    }

    valObj(): valObj {
        let obj: valObj = {}
        for (let v of this) {
            obj[v.sym] = v.getVal()
        }
        return obj
    }
}
