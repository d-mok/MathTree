
type Fun = (...args: number[]) => number


function bisection(f: Fun, ranges: [number, number][]): number[] {

    function randomPoint(): number[] {
        return ranges.map(([min, max]) => RndR(min, max))
    }

    function randomPosPoint(): number[] {
        for (let i = 0; i < 1000; i++) {
            let a = randomPoint()
            if (f(...a) > 0) return a
        }
        throw "can't find positive point"
    }


    function randomNegPoint(): number[] {
        for (let i = 0; i < 1000; i++) {
            let b = randomPoint()
            if (f(...b) < 0) return b
        }
        throw "can't find negative point"
    }

    let a = randomPosPoint()
    let b = randomNegPoint()

    function mid(): number[] {
        let m: number[] = []
        for (let i = 0; i < ranges.length; i++) {
            m.push((a[i] + b[i]) / 2)
        }
        return m
    }

    function tolerable(): boolean {
        const TOLERANCE = 0.0000000000001
        return ranges.every(([min, max], i) => Math.abs(a[i] - b[i]) <= (max - min) * TOLERANCE)
    }


    for (let i = 0; i < 10000; i++) {
        let m = mid()
        let M = f(...m)
        if (!Number.isFinite(M))
            throw 'M is not a finite number!'
        if (M === 0) return m
        if (M > 0) {
            a = m
        } else {
            b = m
        }
        if (tolerable()) return mid()
    }
    throw 'fail after 10000 iteration'
}




const UNITS: { [_: string]: string } = {
    'Pa': '~\\text{Pa}',
    'm3': '~\\text{m}^3',
    'cm3': '~\\text{cm}^3',
    'mol': '~\\text{mol}',
    'K': '~\\text{K}',
    '°C': '~\\text{°C}',
}



class Variable {

    public val: number = NaN

    constructor(
        public sym: string,
        public name: string,
        public range: [number, number],
        public unit: string = ""
    ) {
        this.unit = UNITS[this.unit] ?? this.unit
    }

    bounds(): [number, number] {
        if (Number.isFinite(this.val)) return [this.val, this.val]
        return this.range
    }

    short(): string {
        return Number.parseFloat(this.val.toPrecision(3)).toString()
    }

    long(): string {
        return this.short() + this.unit
    }

    full(): string {
        return this.sym + " = " + this.long()
    }

    whole(): string {
        return "\\text{" + this.name + "}" + " = " + this.long()
    }

}


class Equation {

    constructor(
        public zeroFunc: Fun,
        public latex: string,
        public dep: Variable[]
    ) { }

    fit() {
        let solution = bisection(this.zeroFunc, this.dep.map($ => $.bounds()))
        this.dep.forEach((v, i) => v.val = solution[i])
    }

    print(givens: Variable[] = []): string {
        let T = this.latex
        for (let v of this.dep) {
            let isGiven = givens.includes(v)
            T = T.replaceAll("*(" + v.sym + ")", isGiven ? "(" + v.short() + ")" : v.sym)
            T = T.replaceAll("*" + v.sym, isGiven ? v.short() : v.sym)
            T = T.replaceAll("$(" + v.sym + ")", isGiven ? "(" + v.long() + ")" : v.sym)
            T = T.replaceAll("$" + v.sym, isGiven ? v.long() : v.sym)
        }
        return T
    }

}

class EquSystem {
    constructor(
        public variables: Variable[],
        public equations: Equation[]
    ) { }

    solve() {
        this.variables.forEach($ => $.val = NaN)
        this.equations.forEach($ => $.fit())
    }


    compare() {
        this.solve()
        let T1 = this.variables.map(v => v.val)
        this.solve()
        let T2 = this.variables.map(v => v.val)
        for (let i = 0; i < this.variables.length; i++) {
            let a = T1[i]
            let b = T2[i]
            let p = (b - a) / ((Math.abs(a) + Math.abs(b)) / 2)
            let threshold = 0.0000001
            if (Math.abs(p) <= threshold) this.variables[i].val = 0
            if (p > threshold) this.variables[i].val = 1
            if (p < -threshold) this.variables[i].val = -1
        }

    }


    private canBeGivens(givens: Variable[]): boolean {
        let found = new Set(givens)

        function solvable(eq: Equation): boolean {
            let foundCount = eq.dep.filter(v => found.has(v)).length
            return foundCount === eq.dep.length - 1
        }

        for (let i = 0; i < 10; i++) {
            for (let eq of this.equations) {
                if (solvable(eq)) eq.dep.forEach(v => found.add(v))
            }
            if (this.variables.every(v => found.has(v))) return true
        }
        return false
    }

    private canBeUnknown(unknown: Variable, givens: Variable[]): boolean {
        let all = new Set([unknown, ...givens])

        function notDone(eq: Equation): boolean {
            return !eq.dep.every(v => all.has(v))
        }

        return this.equations.every(eq => notDone(eq))
    }

    genGivens(): [givens: Variable[], ungivens: Variable[], unknown: Variable] {
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
        throw 'fail to generate sensible givens and unknown'
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


function toVariables(vars: [sym: string, name: string, range: [number, number], unit: string][]): Variable[] {
    return vars.map(([sym, name, range, unit]) => new Variable(sym, name, range, unit))
}

function toEquations(eqs: [func: Fun, latex: string, dep: string[]][], vars: Variable[]): Equation[] {
    function getVars(dep: string[]): Variable[] {
        return dep.map($ => vars.find(v => v.sym === $)!)
    }
    return eqs.map(([func, latex, dep]) => new Equation(func, latex, getVars(dep)))
}


function SubstitutionQuestionBuilder(
    variables: [sym: string, name: string, range: [number, number], unit: string][],
    func: Fun,
    latex: string,
) {

    let vars = toVariables(variables)
    let eq = new Equation(func, latex, vars)
    eq.fit()

    let unknown = RndPick(...vars)
    let givens = vars.filter($ => $ !== unknown)



    function givenList(): string {
        let T = ""
        for (let v of givens) {
            T += v.whole() + '\\\\'
        }
        return T
    }


    function sol(): string {
        let T = ""
        T += "\\begin{aligned}"
        T += eq.print() + ' \\\\ '
        T += eq.print(givens) + ' \\\\ '
        T += unknown.full()
        T += " \\end{aligned}"
        T = T.replaceAll("=", "&=")
        return T
    }

    return {
        list: givenList(),
        sol: sol(),
        vars: vars.map(v => v === unknown ? v.sym : v.long()),
        unknown: [unknown.sym, unknown.name, unknown.val, unknown.unit]
    }
}




function MultiSubstitutionQuestionBuilder(
    variables: [sym: string, name: string, range: [number, number], unit: string][],
    equations: [func: Fun, latex: string, dep: string[]][],
) {

    let vars = toVariables(variables)
    let eqs = toEquations(equations, vars)

    let system = new EquSystem(vars, eqs)
    system.solve()

    let [givens, ungivens, unknown] = system.genGivens()


    function givenList(): string {
        let T = ""
        for (let v of givens) {
            T += v.whole() + '\\\\'
        }
        return T
    }


    function sol(): string {
        let T = ""
        T += system.print() + " \\\\~\\\\ "
        T += system.print(givens) + " \\\\~\\\\ "
        T += "\\left\\{\\begin{aligned}"
        for (let v of ungivens)
            T += v.full() + ' \\\\ '
        T += " \\end{aligned}\\right."
        T = T.replaceAll("=", "&=")
        return T
    }

    return {
        list: givenList(),
        sol: sol(),
        vars: vars.map(v => givens.includes(v) ? v.long() : v.sym),
        unknown: [unknown.sym, unknown.name, unknown.val, unknown.unit]
    }
}






function TrendQuestionBuilder(
    variables: [sym: string, name: string, range: [number, number], unit: string][],
    equations: [func: Fun, latex: string, dep: string[]][],
    constancies: string[][] = []
) {

    for (let i = 0; i < 100; i++) {
        try {
            let vars = toVariables(variables)
            let eqs = toEquations(equations, vars)
            let system = new EquSystem(vars, eqs)

            let constancy: Variable[] = []
            if (constancies.length === 0) {
                constancy = RndPickN(vars, variables.length - equations.length - 1)
            } else {
                constancy = RndPick(...constancies).map($ => vars.find(v => v.sym === $)!)
            }
            for (let v of constancy) {
                let [min, max] = v.range
                let val = RndR(min, max)
                v.range = [val, val]
            }

            system.compare()

            let changed = vars.filter(v => !constancy.includes(v) && v.val !== 0)
            if (changed.length === 0) throw ""
            let control = RndPick(...changed)
            let responses = vars.filter(v => !constancy.includes(v) && v !== control)

            return {
                constancy: constancy.map(v => [v.sym, v.name]),
                control: [control.sym, control.name, control.val],
                responses: responses.map(v => [v.sym, v.name, v.val])
            }



        }
        catch { }
        finally { }

    }
    throw 'fail to build trend after 100 trial'
}


