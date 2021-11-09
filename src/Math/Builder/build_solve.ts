import { latexAligned, latexBraced } from './support/latex';
import { toEquSystem } from './support/support';

export function BuildSolve(
    variables: [sym: string, name: string, range: rangeInput, unit?: string, display?: string][],
    equations: [func: zeroFunction, latex: string][],
): {
    list: string
    sol: string
    vars: string[]
    vals: number[]
    unknown: [symbol: string, name: string, val: number, unit: string]
} {

    for (let i = 0; i <= 10; i++) {
        try {
            return BuildSolveOnce(variables, equations)
        } catch (e) {
            if (i === 10) {
                throw e
            } else {
                continue
            }
        }
    }
    throw "never"
}



function BuildSolveOnce(
    variables: [sym: string, name: string, range: rangeInput, unit?: string, display?: string][],
    equations: [func: zeroFunction, latex: string][],
): {
    list: string
    sol: string
    vars: string[]
    vals: number[]
    unknown: [symbol: string, name: string, val: number, unit: string]
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
            let hds = [...hiddens]
            hds.sort((a, b) => a.order - b.order)
            T += latexBraced(hds.map($ => $.full()))
            return T
        }
    }

    return {
        list: givens.map($ => $.whole()).join("\\\\"),
        sol: sol(),
        vars: system.variables.map(v => givens.includes(v) ? v.long() : v.symbol()),
        vals: system.variables.map($ => $.getVal()),
        unknown: [
            unknown.symbol(),
            unknown.name,
            unknown.getVal(),
            unknown.unit
        ]
    }
}
