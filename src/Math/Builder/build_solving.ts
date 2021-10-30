import { Equation, toVariables } from './support';

export function BuildSolving(
    variables: [sym: string, name: string, range: [number, number], unit: string][],
    func: Fun,
    latex: string,
): {
    list: string,
    sol: string,
    vars: string[],
    unknown: [sym: string, name: string, val: number, unit: string]
} {

    let vars = toVariables(variables)
    let eq = new Equation(func, latex, vars)
    eq.fit()

    let unknown = RndPick(...vars)
    let givens = vars.filter($ => $ !== unknown)
    givens.forEach($ => $.round())
    unknown.clear()

    eq.fit()

    function sol(): string {
        let T = ""
        T += "\\begin{aligned}"
        T += eq.print() + ' \\\\ '
        T += eq.print(givens) + ' \\\\ '
        T += unknown.full()
        T += " \\end{aligned}"
        T = T.replaceAll("=", "&=")
        return T
    }

    return {
        list: givens.map($ => $.whole()).join("\\\\"),
        sol: sol(),
        vars: vars.map(v => v === unknown ? v.sym : v.long()),
        unknown: [unknown.sym, unknown.name, unknown.getVal(), unknown.unit]
    }
}

