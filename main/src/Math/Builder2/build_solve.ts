import { RoundVars, toVarGrp } from './support/varObjs'
import { analyze2 } from 'gauss'

import _ from 'lodash'
import { fitAgain, fitFree, readTree } from './support/system'
import * as WRITE from './support/write'

export function BuildSolve(
    variables: [
        sym: string,
        name: string,
        range: rangeInput,
        unit?: string,
        display?: string
    ][],
    equations: [func: zeroFunction, latex: string][],
    {
        listSym = false,
        avoids = [],
        sigfig = {},
        solFormat = 'series',
    }: {
        listSym?: boolean
        avoids?: string[][]
        sigfig?: { [_: string]: number }
        solFormat?: 'series' | 'parallel'
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
            return BuildSolveOnce(variables, equations, {
                listSym,
                avoids,
                sigfig,
                solFormat,
            })
        } catch (e) {
            if (i === 10) {
                throw e
            } else {
                continue
            }
        }
    }
    throw 'never'
}

function BuildSolveOnce(
    variables: [
        sym: string,
        name: string,
        range: rangeInput,
        unit?: string,
        display?: string
    ][],
    equations: [func: zeroFunction, latex: string][],
    {
        listSym = false,
        avoids = [],
        sigfig = {},
        solFormat = 'series',
    }: {
        listSym?: boolean
        avoids?: string[][]
        sigfig?: { [_: string]: number }
        solFormat?: 'series' | 'parallel'
    } = {}
): {
    list: string
    sol: string
    vars: string[]
    vals: number[]
    unknown: [symbol: string, name: string, val: number, unit: string]
    ans: quantity
} {
    // varGrp object
    let vars = _.map(variables, 0)
    let vGrp = toVarGrp(variables)
    let fs = _.map(equations, 0)

    // fit once
    fitFree(fs, vGrp)

    // get givens, hiddens, unknown
    let validTrees = analyze2(fs).filter(t => checkAvoids(t, avoids))
    if (validTrees.length === 0) throw 'no sensible set of solvables found!'

    let tree = _.sample(validTrees)!
    let { givens, top: unknown, hiddens } = readTree(tree)

    // round and fit again
    RoundVars(vGrp, givens, sigfig)
    fitAgain(fs, vGrp, hiddens)

    function sol(): string {
        if (equations.length === 1) {
            let [fs, latex] = equations[0]
            return WRITE.latexAligned([
                WRITE.write(vGrp, latex),
                WRITE.write(vGrp, latex, givens),
                WRITE.full(vGrp[unknown]),
            ])
        } else {
            if (solFormat === 'series') {
                let known = [...givens]
                let T = ''
                for (let step of _.sortBy(tree, 'order')) {
                    let f = step.solvedBy
                    let latex = equations.find(eq => eq[0] === f)![1]
                    let solved = step.variable
                    T += WRITE.latexAligned([
                        WRITE.write(vGrp, latex),
                        WRITE.write(vGrp, latex, known),
                        WRITE.full(vGrp[solved]),
                    ])
                    T += ' \\\\~\\\\ '
                    known.push(solved)
                }
                return T
            } else {
                let latexs = _.map(equations, '1')
                return (
                    WRITE.printSystem(vGrp, latexs) +
                    ' \\\\~\\\\ ' +
                    WRITE.printSystem(vGrp, latexs, givens) +
                    ' \\\\~\\\\ ' +
                    WRITE.printSystemSol(vGrp, hiddens)
                )
            }
        }
    }

    return {
        list: givens
            .map($ => (listSym ? WRITE.rich(vGrp[$]) : WRITE.whole(vGrp[$])))
            .join('\\\\'),
        sol: sol(),
        vars: vars.map(v =>
            givens.includes(v) ? WRITE.long(vGrp[v]) : WRITE.symbol(vGrp[v])
        ),
        vals: vars.map(v => vGrp[v].val),
        unknown: [
            WRITE.symbol(vGrp[unknown]),
            vGrp[unknown].name,
            vGrp[unknown].val,
            vGrp[unknown].unit,
        ],
        ans: { val: vGrp[unknown].val, unit: vGrp[unknown].unit },
    }
}

function includesExact<T>(arr1: T[], arr2: T[]): boolean {
    return (
        _.difference(arr1, arr2).length === 0 &&
        _.difference(arr2, arr1).length === 0
    )
}

function checkAvoids(tree: TREE, avoids: string[][]): boolean {
    let { givens, top: unknown } = readTree(tree)
    return avoids.every($ => !includesExact($, [unknown, ...givens]))
}
