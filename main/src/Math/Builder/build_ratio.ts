import { latexAligned } from './support/latex'
import { toEquSystem, toVariables } from './support/support'
import { Variable } from './support/variable'

export function BuildRatio(
    variables: [sym: string, name: string, range: rangeInput, unit?: string, display?: string][],
    func: zeroFunction,
    latex: string,
    settings: {
        cases?: [string, string]
        subscript?: [string | number, string | number]
    } = {}
): {
    table: string
    sol: string
    consts: [symbol: string[], name: string[]]
    given: [symbol: string, name: string]
    unknown: [symbol: string, name: string, val: number, unit: string]
    ans: quantity
} {

    let system = toEquSystem(variables, [[func, latex]])

    let vars = system.variables

    let [given, unknown, ...constants] = RndShuffle(...vars)
    let g: number[] = []
    let u: number[] = []

    system.fit()
    given.round()
    unknown.round()
    g.push(given.getVal())
    u.push(unknown.getVal())

    system.fitAgain(constants)

    for (let i = 0; i < 10; i++) { // avoid accidentally getting same set of [given,unknown]
        system.fitAgain([given, unknown])
        given.round()
        if (given.getVal() !== g[0]) break
    }

    system.fitAgain([unknown])

    g.push(given.getVal())
    u.push(unknown.getVal())

    function setSubscript(order: 0 | 1 | 2) {
        if (order === 0) {
            given.label()
            unknown.label()
        }
        let subs = settings.subscript ?? [1, 2]
        given.label(subs[order - 1])
        unknown.label(subs[order - 1])
    }

    function setVal(order: 0 | 1 | 2) {
        if (order === 0) return
        given.set(g[order - 1])
        unknown.set(u[order - 1])
    }

    function setCase(order: 0 | 1 | 2) {
        setSubscript(order)
        setVal(order)
    }

    function printRatioFraction(
        case1Show: Variable[] = [],
        case2Show: Variable[] = []): string {
        setCase(2)
        let [lhs2, rhs2] = system.print(case2Show).split("=")
        setCase(1)
        let [lhs1, rhs1] = system.print(case1Show).split("=")
        return `\\dfrac{${lhs1}}{${lhs2}}=\\dfrac{${rhs1}}{${rhs2}}`
    }


    function printAns(): string {
        setCase(2)
        return unknown.full()
    }

    function sol(): string {
        return latexAligned([
            printRatioFraction(),
            printRatioFraction([given, unknown], [given]),
            printAns()
        ])
    }


    function table(): string {
        setCase(1)
        let G1 = "$" + given.long()
        let U1 = "$" + unknown.long()
        setCase(2)
        let G2 = "$" + given.long()
        let U2 = "$" + unknown.symbol()
        let [case1, case2] = settings.cases ?? ["Before", "After"]
        setCase(0)
        return Table({
            content: [
                ["", "$" + given.symbol(), "$" + unknown.symbol()],
                [case1, G1, U1],
                [case2, G2, U2]
            ],
            columns: 'c|c:c',
            rows: 'r|r:r',
        })
    }

    function getUnknown(): [symbol: string, name: string, val: number, unit: string] {
        setCase(2)
        return [unknown.symbol(), unknown.name, unknown.getVal(), unknown.unit]
    }

    function getAns(): quantity {
        setCase(2)
        return { val: unknown.getVal(), unit: unknown.unit }
    }

    return {
        table: table(),
        sol: sol(),
        consts: [
            constants.map(v => v.symbol()),
            constants.map(v => v.name)
        ],
        given: [
            given.symbol(),
            given.name
        ],
        unknown: getUnknown(),
        ans: getAns()
    }
}

