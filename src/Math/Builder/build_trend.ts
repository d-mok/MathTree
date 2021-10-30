import { Variable,EquSystem, toEquations, toVariables } from './support/support';

export function BuildTrend(
    variables: [sym: string, name: string, range: [number, number], unit: string][],
    equations: [func: Fun, latex: string, dep: string[]][],
    constancies: string[][] = []
) {

    for (let i = 0; i < 100; i++) {
        try {
            let vars = toVariables(variables)
            let eqs = toEquations(equations, vars)
            let system = new EquSystem(vars, eqs)

            let constancy: Variable[] = []
            if (constancies.length === 0) {
                constancy = RndPickN(vars, variables.length - equations.length - 1)
            } else {
                constancy = RndPick(...constancies).map($ => vars.find(v => v.sym === $)!)
            }
            for (let v of constancy) {
                let [min, max] = v.range
                let val = RndR(min, max)
                v.range = [val, val]
            }

            system.compare()

            let changed = vars.filter(v => !constancy.includes(v) && v.getVal() !== 0)
            if (changed.length === 0) throw ""
            let control = RndPick(...changed)
            let responses = vars.filter(v => !constancy.includes(v) && v !== control)

            return {
                constancy: constancy.map(v => [v.sym, v.name]),
                control: [control.sym, control.name, control.getVal()],
                responses: responses.map(v => [v.sym, v.name, v.getVal()])
            }



        }
        catch { }
        finally { }

    }
    throw 'fail to build trend after 100 trial'
}


