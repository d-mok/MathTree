import { RoundVars, toVarGrp } from './support/variable.js'
import { analyze } from 'gauss'
import _ from 'lodash'
import { fitAgain, fitFree, readTree } from './support/system.js'
import * as WRITE from './support/write.js'

export function BuildSolve(
    variables: [
        sym: string,
        name: string,
        range: rangeInput,
        unit?: string,
        display?: string
    ][],
    equations: [func: zeroFunction, latex: string, explain?: string][],
    {
        avoids = [],
        sigfig = {},
        solPlain = false,
        integer = false,
    }: {
        avoids?: string[][]
        sigfig?: { [_: string]: number } | number
        solPlain?: boolean
        integer?: boolean
    } = {}
): {
    list: string
    sol: string
    vars: string[]
    vals: number[]
    unknown: [symbol: string, name: string, val: number, unit: string]
    ans: quantity
    _INTERNAL: {
        allVars: string[]
        givens: string[]
        hiddens: string[]
        aim: string
        vGrp: varGrp
    }
} {
    // varGrp object
    let allVars = _.map(variables, 0)
    let vGrp = toVarGrp(variables)
    let fs = _.map(equations, 0)

    // get locked vars
    let locked = allVars.filter(v => vGrp[v].range[0] === vGrp[v].range[1])

    // get givens, hiddens, unknown
    let validTrees = analyze(fs)
        .filter(t => checkAvoids(t, avoids))
        .filter(t => readTree(t).givens.includesEvery(locked))
    if (validTrees.length === 0) throw 'no sensible set of solvables found!'

    let tree = validTrees.sample()!
    // console.log(tree)
    let { givens, top: aim, hiddens } = readTree(tree)

    for (let i = 0; i <= 10; i++) {
        try {
            vGrp = toVarGrp(variables)
            // fit once
            fitFree(fs, vGrp)
            // round and fit again
            RoundVars(vGrp, givens, sigfig, integer)
            fitAgain(fs, vGrp, hiddens)
            if (integer) {
                let areAllIntegers = _.map(vGrp, 'val').every(Number.isInteger)
                if (!areAllIntegers)
                    throw 'cannot find a set of integer variables!'
            }
            break
        } catch (e) {
            if (i === 10) throw new Error('BuildSolve: ' + String(e))
        }
    }

    function writeStep(
        explain: string | undefined,
        latex: string,
        stepVars: string[],
        finalVar: string
    ): string {
        return (
            (explain ? '\\text{' + explain + '}\\\\' : '') +
            WRITE.latexAligned([
                ...(solPlain ? [] : [WRITE.write(vGrp, latex)]),
                WRITE.write(vGrp, latex, stepVars),
                WRITE.full(vGrp[finalVar]),
            ])
        )
    }

    function sol(): string {
        if (equations.length === 1) {
            let [fs, latex, explain] = equations[0]
            return writeStep(explain, latex, givens, aim)
        } else {
            let knowns = [...givens]
            let arr: string[] = []
            for (let { solvedBy, variable } of _.sortBy(tree, 'order')) {
                if (solvedBy === null) continue
                let [fs, latex, explain] = equations.find(
                    $ => $[0] === solvedBy
                )!
                arr.push(writeStep(explain, latex, knowns, variable))
                knowns.push(variable)
            }
            return arr.join(' \\\\~\\\\ ')
        }
    }

    return {
        list: givens.map($ => WRITE.whole(vGrp[$])).join('\\\\'),
        sol: sol(),
        vars: allVars.map(v =>
            givens.includes(v) ? WRITE.long(vGrp[v]) : WRITE.symbol(vGrp[v])
        ),
        vals: allVars.map(v => vGrp[v].val),
        unknown: [
            WRITE.symbol(vGrp[aim]),
            vGrp[aim].name,
            vGrp[aim].val,
            vGrp[aim].unit,
        ],
        ans: { val: vGrp[aim].val, unit: vGrp[aim].unit },
        _INTERNAL: {
            allVars,
            givens,
            hiddens,
            aim,
            vGrp,
        },
    }
}

function checkAvoids(tree: TREE, avoids: string[][]): boolean {
    let { givens, top: unknown } = readTree(tree)
    return avoids.every($ => !$.includesExact([unknown, ...givens]))
}
