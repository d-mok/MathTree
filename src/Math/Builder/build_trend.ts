import { toEquSystem } from './support/support';

export function BuildTrend(
    variables: [sym: string, name: string, range: rangeInput, unit?: string][],
    equations: [func: Fun, latex: string][],
    settings: {
        trends?: [inc: string, dec: string, unchange: string]
    } = {}
): {
    sol: string
    consts: [sym: string[], name: string[]]
    agent: [sym: string, name: string, trend: string, change: number]
    responses: [sym: string, name: string, trend: string, change: number][]
} {

    let system = toEquSystem(variables, equations)

    let [constants, agent, responses] = system.generateTrend()

    function toWord(change: number): string {
        let trendWords = settings.trends ?? ['increases', 'decreases', 'is unchanged']
        if (change > 0) return trendWords[0]
        if (change === 0) return trendWords[2]
        if (change < 0) return trendWords[1]
        return "[error]"
    }

    return {
        consts: [constants.map(v => v.sym), constants.map(v => v.name)],
        agent: [agent.sym, agent.name, toWord(agent.getVal()), agent.getVal()],
        responses: responses.map(v => [v.sym, v.name, toWord(v.getVal()), v.getVal()]),
        sol: system.print().replaceAll("=", "&=")
    }

}
