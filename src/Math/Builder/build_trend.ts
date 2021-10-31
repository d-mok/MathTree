import { toEquSystem, RangeInput } from './support/support';

export function BuildTrend(
    variables: [sym: string, name: string, range: RangeInput, unit: string][],
    equations: [func: Fun, latex: string][],
    trendWords: [string, string, string] = ['increases', 'is unchanged', 'decreases']
): {
    constants: [sym: string, name: string][]
    control: [sym: string, name: string, trend: string, change: number]
    responses: [sym: string, name: string, trend: string, change: number][]
    sol: string
} {

    let system = toEquSystem(variables, equations)

    let [constants, control, responses] = system.generateTrend()

    function toWord(change: number): string {
        if (change > 0) return trendWords[0]
        if (change === 0) return trendWords[1]
        if (change < 0) return trendWords[2]
        return "[error]"
    }

    return {
        constants: constants.map(v => [v.sym, v.name]),
        control: [control.sym, control.name, toWord(control.getVal()), control.getVal()],
        responses: responses.map(v => [v.sym, v.name, toWord(v.getVal()), v.getVal()]),
        sol: system.print().replaceAll("=", "&=")
    }

}
