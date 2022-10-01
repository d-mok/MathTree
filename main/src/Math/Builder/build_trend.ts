import { toVarGrp } from './support/varObjs'
import _ from 'lodash'
import { fitAgain, fitFree, readTree } from './support/system'
import * as WRITE from './support/write'
import { analyze } from 'gauss'

export function BuildTrend(
    variables: [
        sym: string,
        name: string,
        range: rangeInput,
        unit?: string,
        display?: string
    ][],
    equations: [func: zeroFunction, latex: string][],
    settings: {
        trends?: [inc: string, dec: string, unchange: string]
    } = {}
): {
    sol: string
    consts: [symbol: string[], name: string[]]
    agent: [symbol: string, name: string, trend: string, code: number]
    responses: [symbol: string, name: string, trend: string, code: number][]
    target: [symbol: string, name: string, trend: string, code: number]
} {
    // varGrp object
    let vars = _.map(variables, 0)
    let vGrp = toVarGrp(variables)
    let fs = _.map(equations, 0)

    //generateTrend
    let tree = _.sample(analyze(fs))
    if (tree === undefined) throw 'no sensible set of solvables found!'
    let { top: target, givens, hiddens } = readTree(tree)

    let [agent, ...constants] = RndShuffle(...givens)
    let responses = RndShuffle(...hiddens)

    fitFree(fs, vGrp)

    let oldVal = _.mapValues(vGrp, 'val')

    vGrp[agent].val *= RndT() ? 1.05 : 0.95
    fitAgain(fs, vGrp, responses)

    for (let v in vGrp) {
        vGrp[v].val = compare(vGrp[v].val, oldVal[v])
    }

    // let system = toEquSystem(variables, equations)

    function toWord(change: number): string {
        let trendWords = settings.trends ?? [
            'increases',
            'decreases',
            'is unchanged',
        ]
        if (change > 0) return trendWords[0]
        if (change === 0) return trendWords[2]
        if (change < 0) return trendWords[1]
        return '[error]'
    }

    function toCode(change: number): number {
        if (change > 0) return 0
        if (change === 0) return 2
        if (change < 0) return 1
        return 3
    }

    return {
        consts: [
            constants.map(v => WRITE.symbol(vGrp[v])),
            constants.map(v => vGrp[v].name),
        ],
        agent: [
            WRITE.symbol(vGrp[agent]),
            vGrp[agent].name,
            toWord(vGrp[agent].val),
            toCode(vGrp[agent].val),
        ],
        responses: responses.map(v => [
            WRITE.symbol(vGrp[v]),
            vGrp[v].name,
            toWord(vGrp[v].val),
            toCode(vGrp[v].val),
        ]),
        target: [
            WRITE.symbol(vGrp[target]),
            vGrp[target].name,
            toWord(vGrp[target].val),
            toCode(vGrp[target].val),
        ],
        sol: WRITE.printSystem(vGrp, _.map(equations, 1)),
    }
}

function compare(newVal: number, oldVal: number): number {
    let b = newVal
    let a = oldVal
    let mid = (Math.abs(a) + Math.abs(b)) / 2
    let percent = (b - a) / mid
    let THRESHOLD = 0.0000001
    let sign = 0
    if (percent > THRESHOLD) sign = 1
    if (percent < -THRESHOLD) sign = -1
    return sign
}
