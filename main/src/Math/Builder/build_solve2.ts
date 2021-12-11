import { latexAligned, latexBraced } from './support/latex'
import { toEquSystem } from './support/support'

export function BuildSolve2(
    variables: [sym: string, name: string, range: rangeInput, unit?: string, display?: string][],
    equations: [func: zeroFunction, latex: string][],
    {
        listSym = false,
        avoids = [],
        sigfig = {}
    }: {
        listSym?: boolean
        avoids?: string[][]
        sigfig?: { [_: string]: number }
    } = {}
): {
    list: string
    sol: string
    vars: string[]
    vals: number[]
    unknown: [symbol: string, name: string, val: number, unit: string]
    ans: quantity
} {

    for (let i = 0; i <= 10; i++) {
        try {
            return BuildSolveOnce(variables, equations, { listSym, avoids, sigfig })
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
    {
        listSym = false,
        avoids = [],
        sigfig = {}
    }: {
        listSym?: boolean
        avoids?: string[][]
        sigfig?: { [_: string]: number }
    } = {}
): {
    list: string
    sol: string
    vars: string[]
    vals: number[]
    unknown: [symbol: string, name: string, val: number, unit: string]
    ans: quantity
} {

    let system = toEquSystem(variables, equations)
    system.fit()

    let [givens, hiddens, unknown,solInStep] = system.generateSolvables(avoids)
    givens.forEach($ => $.round(sigfig[$.sym]))
    system.fitAgain(hiddens)

    function sol(): string {
        if (equations.length === 1) {
            let eq = system.equations[0]
            return latexAligned([
                eq.print(),
                eq.print(givens),
                unknown.full()
            ])
        } else {
            // let T = ""
            // T += system.print() + " \\\\~\\\\ "
            // T += system.print(givens) + " \\\\~\\\\ "
            // // let hds = [...hiddens]
            // // hds.sort((a, b) => a.order - b.order)
            // T += latexBraced(hiddens.map($ => $.full()))
            return solInStep
        }
    }

    return {
        list: givens.map($ => listSym ? $.rich() : $.whole()).join("\\\\"),
        sol: sol(),
        vars: system.variables.map(v => givens.includes(v) ? v.long() : v.symbol()),
        vals: system.variables.map($ => $.getVal()),
        unknown: [
            unknown.symbol(),
            unknown.name,
            unknown.getVal(),
            unknown.unit
        ],
        ans: { val: unknown.getVal(), unit: unknown.unit }
    }
}
