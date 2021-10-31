import { latexAligned, latexBraced } from './support/latex';
import { toEquSystem } from './support/support';

export function BuildSolve(
    variables: [sym: string, name: string, range: rangeInput, unit?: string][],
    equations: [func: Fun, latex: string][],
): {
    list: string
    sol: string
    vars: string[]
    unknown: [sym: string, name: string, val: number, unit: string]
} {
    let system = toEquSystem(variables, equations)
    system.fit()

    let [givens, hiddens, unknown] = system.generateSolvables()
    givens.forEach($ => $.round())
    system.solveAgain(hiddens)

    function sol(): string {
        if (equations.length === 1) {
            let eq = system.equations[0]
            return latexAligned([
                eq.print(),
                eq.print(givens),
                unknown.full()
            ])
        } else {
            let T = ""
            T += system.print() + " \\\\~\\\\ "
            T += system.print(givens) + " \\\\~\\\\ "
            T += latexBraced(hiddens.map($ => $.full()))
            return T
        }
    }

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

