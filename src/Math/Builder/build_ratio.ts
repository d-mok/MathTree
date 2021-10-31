import { Equation } from './support/equation';
import { latexAligned } from './support/latex';
import { toVariables } from './support/support';
import { Variable } from './support/variable';

export function BuildRatio(
    variables: [sym: string, name: string, range: rangeInput, unit?: string][],
    func: Fun,
    latex: string,
    settings: {
        cases?: [string, string]
        subsrcipt?: [string | number, string | number]
    } = {}
): {
    table: string
    sol: string
    constants: [sym: string, name: string][]
    given: [sym: string, name: string, val: [number, number], unit: string]
    unknown: [sym: string, name: string, val: [number, number], unit: string]
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
    eq.fitAgain([given, unknown])
    given.round()
    eq.fitAgain([unknown])

    g.push(given.getVal())
    u.push(unknown.getVal())

    function setSubscript(order: 1 | 2) {
        let subs = settings.subsrcipt ?? [1, 2]
        given.subsrcipt(subs[order - 1])
        unknown.subsrcipt(subs[order - 1])
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
        return `\\dfrac{${lhs2}}{${lhs1}}=\\dfrac{${rhs2}}{${rhs1}}`
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
                ["", case1, case2],
                ["$" + given.sym, G1, G2],
                ["$" + unknown.sym, U1, U2],
            ],
            columns: 'c|c:c',
            rows: 'r|r:r',
        })
    }


    return {
        table: table(),
        sol: sol(),
        constants: constants.map(v => [v.sym, v.name]),
        given: [given.sym, given.name, [g[0], g[1]], given.unit],
        unknown: [unknown.sym, unknown.name, [u[0], u[1]], unknown.unit],
    }
}

