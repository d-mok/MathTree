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
        given.sym += "_2"
        unknown.sym += "_2"
        let [lhs2, rhs2] = eq.print().split("=")
        given.sym = given.sym.replace("_2", "_1")
        unknown.sym = unknown.sym.replace("_2", "_1")
        let [lhs1, rhs1] = eq.print().split("=")
        given.sym = given.sym.replace("_1", "")
        unknown.sym = unknown.sym.replace("_1", "")
        return `\\dfrac{${lhs2}}{${lhs1}}=\\dfrac{${rhs2}}{${rhs1}}`
    }

    function printSubs(): string {
        given.set(g2)
        unknown.sym += "_2"
        let [lhs2, rhs2] = eq.print([given]).split("=")
        unknown.sym = unknown.sym.replace("_2", "")
        given.set(g1)
        unknown.set(u1)
        let [lhs1, rhs1] = eq.print([given, unknown]).split("=")
        return `\\dfrac{${lhs2}}{${lhs1}}=\\dfrac{${rhs2}}{${rhs1}}`
    }

    function printAns(): string {
        unknown.sym += "_2"
        unknown.set(u2)
        let T = unknown.full()
        unknown.sym = unknown.sym.replace("_2", "")
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
        let U2 = "$" + unknown.sym + "_2"
        return Table({
            content: [
                ["", "Before", "After"],
                ["$" + given.sym, G1, G2],
                ["$" + unknown.sym, U1, U2],
            ]
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

