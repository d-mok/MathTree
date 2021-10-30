import { EquSystem, toEquations, toVariables } from './support/support';


export function BuildSolvings(
    variables: [sym: string, name: string, range: [number, number], unit: string][],
    equations: [func: Fun, latex: string, dep: string[]][],
): {
    list: string,
    sol: string,
    vars: string[],
    unknown: [sym: string, name: string, val: number, unit: string]
} {
    let vars = toVariables(variables)
    let eqs = toEquations(equations, vars)
    let system = new EquSystem(vars, eqs)
    system.fit()

    let [givens, hiddens, unknown] = system.generateSolvables()
    givens.forEach($ => $.round())
    hiddens.forEach($ => $.clear())
    hiddens.forEach($ => $.widen())
    system.solve()

    function sol(): string {
        let T = ""
        T += system.print() + " \\\\~\\\\ "
        T += system.print(givens) + " \\\\~\\\\ "
        T += "\\left\\{\\begin{aligned}"
        for (let v of hiddens)
            T += v.full() + ' \\\\ '
        T += " \\end{aligned}\\right."
        T = T.replaceAll("=", "&=")
        return T
    }

    return {
        list: givens.map($ => $.whole()).join("\\\\"),
        sol: sol(),
        vars: vars.map(v => givens.includes(v) ? v.long() : v.sym),
        unknown: [
            unknown.sym,
            unknown.name,
            unknown.getVal(),
            unknown.unit
        ]
    }
}

