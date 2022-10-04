import { RoundVars, toVarGrp } from './support/variable'
import { analyze } from 'gauss'
import _ from 'lodash'
import { fitAgain, fitFree, readTree } from './support/system'
import * as WRITE from './support/write'
import { PenCls } from '../../Pen/Pen'

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
        solPlain = false,
        integer = false,
    }: {
        listSym?: boolean
        avoids?: string[][]
        sigfig?: { [_: string]: number } | number
        solFormat?: 'series' | 'parallel'
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
    labelAngle: (_: PenCls) => {
        all: () => void
        plain: () => void
    }
} {
    // varGrp object
    let vars = _.map(variables, 0)
    let vGrp = toVarGrp(variables)
    let fs = _.map(equations, 0)

    // get locked vars
    let locked = vars.filter(v => vGrp[v].range[0] === vGrp[v].range[1])

    // get givens, hiddens, unknown
    let validTrees = analyze(fs)
        .filter(t => checkAvoids(t, avoids))
        .filter(t => includesAll(readTree(t).givens, locked))
    if (validTrees.length === 0) throw 'no sensible set of solvables found!'

    let tree = _.sample(validTrees)!
    // console.log(tree)
    let { givens, top: unknown, hiddens } = readTree(tree)

    for (let i = 0; i <= 20; i++) {
        try {
            for (let v of vars) vGrp[v].val = NaN
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
            if (i === 20) {
                console.error(vGrp)
                throw e
            }
        }
    }

    function writeStep(
        latex: string,
        stepVars: string[],
        finalVar: string
    ): string {
        return WRITE.latexAligned([
            ...(solPlain ? [] : [WRITE.write(vGrp, latex)]),
            WRITE.write(vGrp, latex, stepVars),
            WRITE.full(vGrp[finalVar]),
        ])
    }

    function sol(): string {
        if (equations.length === 1) {
            let [fs, latex] = equations[0]
            return writeStep(latex, givens, unknown)
        } else {
            if (solFormat === 'series') {
                let knowns = [...givens]
                let arr: string[] = []
                for (let { solvedBy, variable } of _.sortBy(tree, 'order')) {
                    if (solvedBy === null) continue
                    let latex = equations.find(eq => eq[0] === solvedBy)![1]
                    arr.push(writeStep(latex, knowns, variable))
                    knowns.push(variable)
                }
                return arr.join(' \\\\~\\\\ ')
            } else {
                let latexs = _.map(equations, 1)
                return [
                    ...(solPlain ? [] : [WRITE.printSystem(vGrp, latexs)]),
                    WRITE.printSystem(vGrp, latexs, givens),
                    WRITE.printSystemSol(vGrp, hiddens),
                ].join(' \\\\~\\\\ ')
            }
        }
    }

    function labelAngle(pen: PenCls) {
        function draw(vars: string[]) {
            let drawVars = variables.filter($ => vars.includes($[0]))
            for (let [sym, name, range] of drawVars) {
                if (Array.isArray(range) && range.length === 3) {
                    let label = givens.includes(sym)
                        ? WRITE.long(vGrp[sym])
                        : WRITE.symbol(vGrp[sym])
                    pen.angle(...range, label)
                }
            }
        }
        return {
            all: () => draw(vars),
            plain: () => draw([unknown, ...givens]),
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
        labelAngle,
    }
}

function includesAll<T>(superset: T[], subset: T[]): boolean {
    return _.difference(subset, superset).length === 0
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
