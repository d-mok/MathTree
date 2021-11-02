import { Equation } from './support/equation';
import { latexAligned } from './support/latex';
import { toVariables } from './support/support';
import { Variable } from './support/variable';

export function BuildRatio(
    variables: [sym: string, name: string, range: rangeInput, unit?: string, display?: string][],
    func: Fun,
    latex: string,
    settings: {
        cases?: [string, string]
        subsrcipt?: [string | number, string | number]
    } = {}
): {
    table: string
    sol: string
    consts: [symbol: string[], name: string[]]
    given: [symbol: string, name: string]
    unknown: [symbol: string, name: string, val: number, unit: string]
} {

    let vars = toVariables(variables)
    let eq = new Equation(func, latex, vars)

    let [given, unknown, ...constants] = RndShuffle(...vars)
    let g: number[] = []
    let u: number[] = []

    eq.fit()
    given.round()
    unknown.round()
    g.push(given.getVal())
    u.push(unknown.getVal())

    eq.fitAgain(constants)

    for (let i = 0; i < 10; i++) { // avoid accidentally getting same set of [given,unknown]
        eq.fitAgain([given, unknown])
        given.round()
        if (given.getVal() !== g[0]) break
    }

    eq.fitAgain([unknown])

    g.push(given.getVal())
    u.push(unknown.getVal())

    function setSubscript(order: 1 | 2) {
        let subs = settings.subsrcipt ?? [1, 2]
        given.label(subs[order - 1])
        unknown.label(subs[order - 1])
    }

    function setVal(order: 1 | 2) {
        given.set(g[order - 1])
        unknown.set(u[order - 1])
    }

    function setCase(order: 1 | 2) {
        setSubscript(order)
        setVal(order)
    }

    function printRatioFraction(
        case1Show: Variable[] = [],
        case2Show: Variable[] = []): string {
        setCase(2)
        let [lhs2, rhs2] = eq.print(case2Show).split("=")
        setCase(1)
        let [lhs1, rhs1] = eq.print(case1Show).split("=")
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
        return Table({
            content: [
                ["", "$" + given.sym, "$" + unknown.sym],
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
    }
}

