import { toEquSystem } from './support/support';
import { BuildSolveSingle } from './build_solve_single'

export function BuildSolve(
    variables: [sym: string, name: string, range: [number, number], unit: string][],
    equations: [func: Fun, latex: string][],
): {
    list: string,
    sol: string,
    vars: string[],
    unknown: [sym: string, name: string, val: number, unit: string]
} {

    if (equations.length === 1) {
        return BuildSolveSingle(variables, equations[0])
    }

    let system = toEquSystem(variables, equations)
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

    console.log(system)

    return {
        list: givens.map($ => $.whole()).join("\\\\"),
        sol: sol(),
        vars: system.variables.map(v => givens.includes(v) ? v.long() : v.sym),
        unknown: [
            unknown.sym,
            unknown.name,
            unknown.getVal(),
            unknown.unit
        ]
    }
}

