// import { analyze } from './analyzer'
import { bisection } from './bisect'
import { createOrderTree } from './ana'
import { Variable, Variables } from './variable'


export function latexAligned(texts: string[]): string {
    let T = ""
    T += "\\begin{aligned}"
    for (let t of texts)
        T += t + " \\\\ "
    T += " \\end{aligned}"
    T = T.replaceAll("=", "&=")
    T = T.replaceAll("&&=", "&=")
    return T
}

export function latexBraced(texts: string[]): string {
    return "\\left\\{" + latexAligned(texts) + "\\right."
}

export class Equation {

    constructor(
        public zeroFunc: Fun,
        public latex: string,
        public dep: Variables
    ) { }


    solve() {
        if (this.dep.solvable())
            this.fit()
    }

    fit() {
        let roots = bisection(this.zeroFunc, this.dep.bounds())
        this.dep.setVals(roots)
    }

    fitAgain(vars: Variable[]) {
        vars.forEach($ => $.clear())
        vars.forEach($ => $.widen())
        this.fit()
    }

    print(showVars: Variable[] = []): string {
        return this.dep.write(this.latex, showVars)
    }

}

export class EquSystem {
    constructor(
        public variables: Variables,
        public equations: Equation[]
    ) { }

    fit() {
        this.equations.forEach($ => $.fit())
    }

    solve(): void {
        for (let i = 0; i < 10; i++) {
            for (let eq of this.equations) eq.solve()
            if (this.variables.solved()) return
        }
        throw 'The system is not solvable yet.'
    }

    solveAgain(vars: Variable[]): void {
        vars.forEach($ => $.clear())
        vars.forEach($ => $.widen())
        this.solve()
    }


    generateSolvables(): [givens: Variable[], hiddens: Variable[], unknown: Variable] {
        createOrderTree(this, true)
        return [
            this.variables.zeros(),
            this.variables.positives(),
            this.variables.pickTop()
        ]
    }


    generateTrend(): [constants: Variable[], control: Variable, responses: Variable[]] {
        createOrderTree(this, false)
        let [control, ...constants] = this.variables.shuffledZeros()
        let responses = this.variables.positives()
        this.variables.clear()
        this.fit()
        let oldVal = this.variables.getVals()
        control.shake()
        this.solveAgain(responses)
        this.variables.compareWith(oldVal)
        return [constants, control, responses]
    }


    print(givens: Variable[] = []): string {
        let eqs = this.equations.map($ => $.print(givens))
        return latexBraced(eqs)
    }

}




export function toVariables(
    vars: [sym: string, name: string, range: [number, number], unit: string][]
): Variables {
    let vs = vars.map(([sym, name, range, unit]) =>
        new Variable(sym, name, range, unit))
    return new Variables(...vs)
}

export function toEquations(
    eqs: [func: Fun, latex: string][],
    vars: Variables
): Equation[] {
    return eqs.map(([func, latex]) =>
        new Equation(func, latex, getDeps(func, vars))
    )
}

export function toEquSystem(
    variables: [sym: string, name: string, range: [number, number], unit: string][],
    equations: [func: Fun, latex: string][],
): EquSystem {
    let vars = toVariables(variables)
    let eqs = toEquations(equations, vars)
    return new EquSystem(vars, eqs)
}


function getSignature(func: Fun): string[] {
    const fnStr = func.toString()
    return fnStr
        .slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')'))
        .replaceAll(" ", "")
        .split(",")
}

function getDeps(func: Fun, vars: Variables): Variables {
    let dep = getSignature(func)
    let vs = dep.map($ => {
        let v = vars.find(v => v.sym === $)
        if (v === undefined) throw "Fail to get dependency for func: " + func
        return v
    })
    return new Variables(...vs)
}

