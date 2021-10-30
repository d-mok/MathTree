import { Equation, toVariables } from './support/support';




export function BuildRatio(
    variables: [sym: string, name: string, range: [number, number], unit: string][],
    equation: [func: Fun, latex: string],
) {

    let vars = toVariables(variables)
    let [func, latex] = equation
    let eq = new Equation(func, latex, vars)
    eq.fit()

    let [given, unknown, ...constants] = RndShuffle(...vars)

    given.round()
    unknown.round()
    let g1 = given.getVal()
    let u1 = unknown.getVal()

    constants.forEach($ => $.clear())
    constants.forEach($ => $.widen())
    eq.fit()

    given.clear()
    given.widen()
    unknown.clear()
    unknown.widen()
    eq.fit()

    let g2 = given.getVal()
    let u2 = unknown.getVal()

    function printEq(): string {
        given.subscript = "2"
        unknown.subscript += "2"
        let [lhs2, rhs2] = eq.print().split("=")
        given.subscript = "1"
        unknown.subscript = "1"
        let [lhs1, rhs1] = eq.print().split("=")
        given.subscript = ""
        unknown.subscript = ""
        return `\\dfrac{${lhs2}}{${lhs1}}=\\dfrac{${rhs2}}{${rhs1}}`
    }

    function printSubs(): string {
        given.set(g2)
        unknown.subscript = "2"
        let [lhs2, rhs2] = eq.print([given]).split("=")
        unknown.subscript = ""
        given.set(g1)
        unknown.set(u1)
        let [lhs1, rhs1] = eq.print([given, unknown]).split("=")
        return `\\dfrac{${lhs2}}{${lhs1}}=\\dfrac{${rhs2}}{${rhs1}}`
    }

    function printAns(): string {
        unknown.subscript = "2"
        unknown.set(u2)
        let T = unknown.full()
        unknown.subscript = ""
        return T
    }

    function sol(): string {
        let T = ""
        T += "\\begin{aligned}"
        T += printEq() + ' \\\\ '
        T += printSubs() + ' \\\\ '
        T += printAns()
        T += " \\end{aligned}"
        T = T.replaceAll("=", "&=")
        return T
    }


    function table(): string {
        given.set(g1)
        let G1 = "$" + given.long()
        given.set(g2)
        let G2 = "$" + given.long()
        unknown.set(u1)
        let U1 = "$" + unknown.long()
        unknown.subscript = "2"
        let U2 = "$" + unknown.symbol()
        unknown.subscript = ""
        return Table({
            content: [
                ["", "Before", "After"],
                ["$" + given.sym, G1, G2],
                ["$" + unknown.sym, U1, U2],
            ],
            columns: '|c||c|c|',
            rows: '|r||r|r|',
        })
    }


    return {
        table: table(),
        sol: sol(),
        constants: constants.map(v => [v.sym, v.name]),
        given: [given.sym, given.name, g1, g2, given.unit],
        unknown: [unknown.sym, unknown.name, u1, u2, unknown.unit],
    }
}

