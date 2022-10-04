import { RoundVars, toVarGrp } from './support/variable'
import _ from 'lodash'
import { fitAgain, fitFree } from './support/system'
import * as WRITE from './support/write'

export function BuildRatio(
    variables: [
        sym: string,
        name: string,
        range: rangeInput,
        unit?: string,
        display?: string
    ][],
    func: zeroFunction,
    latex: string,
    {
        cases = ['Before', 'After'],
        subscript = [1, 2],
        sigfig = {},
    }: {
        cases?: [string, string]
        subscript?: [string | number, string | number]
        sigfig?: { [_: string]: number }
    } = {}
): {
    table: string
    sol: string
    consts: [symbol: string[], name: string[]]
    given: [symbol: string, name: string]
    unknown: [symbol: string, name: string, val: number, unit: string]
    ans: quantity
} {
    // varGrp object
    let vars = _.map(variables, 0)
    let vGrp = toVarGrp(variables)

    // set given, unknown and constants
    let [given, unknown, ...constants] = RndShuffle(...vars)
    let g: number[] = []
    let u: number[] = []

    // fit once
    fitFree([func], vGrp)

    // round and refit
    RoundVars(vGrp, [given, unknown], sigfig, false)
    g.push(vGrp[given].val)
    u.push(vGrp[unknown].val)
    fitAgain([func], vGrp, constants)

    for (let i = 0; i < 10; i++) {
        // avoid accidentally getting same set of [given,unknown]
        fitAgain([func], vGrp, [given, unknown])
        RoundVars(vGrp, [given], sigfig, false)
        if (vGrp[given].val !== g[0]) break
    }

    fitAgain([func], vGrp, [unknown])
    g.push(vGrp[given].val)
    u.push(vGrp[unknown].val)

    function setSubscript(order: 0 | 1 | 2) {
        if (order === 0) {
            vGrp[given].subscript = ''
            vGrp[unknown].subscript = ''
        }
        let subs = String(subscript[order - 1])
        vGrp[given].subscript = subs
        vGrp[unknown].subscript = subs
    }

    function setVal(order: 0 | 1 | 2) {
        if (order === 0) return
        vGrp[given].val = g[order - 1]
        vGrp[unknown].val = u[order - 1]
    }

    function setCase(order: 0 | 1 | 2) {
        setSubscript(order)
        setVal(order)
    }

    function printRatioFraction(
        case1Show: string[] = [],
        case2Show: string[] = []
    ): string {
        setCase(2)
        let e2 = WRITE.printSystem(vGrp, [latex], case2Show)
        let [lhs2, rhs2] = e2.split('=')
        setCase(1)
        let e1 = WRITE.printSystem(vGrp, [latex], case1Show)
        let [lhs1, rhs1] = e1.split('=')
        return `\\dfrac{${lhs1}}{${lhs2}}=\\dfrac{${rhs1}}{${rhs2}}`
    }

    function printAns(): string {
        setCase(2)
        return WRITE.full(vGrp[unknown])
    }

    function sol(): string {
        return WRITE.latexAligned([
            printRatioFraction(),
            printRatioFraction([given, unknown], [given]),
            printAns(),
        ])
    }

    function table(): string {
        setCase(1)
        let G1 = '$' + WRITE.long(vGrp[given])
        let U1 = '$' + WRITE.long(vGrp[unknown])
        setCase(2)
        let G2 = '$' + WRITE.long(vGrp[given])
        let U2 = '$' + WRITE.symbol(vGrp[unknown])
        let [case1, case2] = cases
        setCase(0)
        return Table({
            content: [
                [
                    '',
                    '$' + WRITE.symbol(vGrp[given]),
                    '$' + WRITE.symbol(vGrp[unknown]),
                ],
                [case1, G1, U1],
                [case2, G2, U2],
            ],
            columns: 'c|c:c',
            rows: 'r|r:r',
        })
    }

    function getUnknown(): [
        symbol: string,
        name: string,
        val: number,
        unit: string
    ] {
        setCase(2)
        return [
            WRITE.symbol(vGrp[unknown]),
            vGrp[unknown].name,
            vGrp[unknown].val,
            vGrp[unknown].unit,
        ]
    }

    function getAns(): quantity {
        setCase(2)
        return { val: vGrp[unknown].val, unit: vGrp[unknown].unit }
    }

    return {
        table: table(),
        sol: sol(),
        consts: [
            constants.map(v => WRITE.symbol(vGrp[v])),
            constants.map(v => vGrp[v].name),
        ],
        given: [WRITE.symbol(vGrp[given]), vGrp[given].name],
        unknown: getUnknown(),
        ans: getAns(),
    }
}
