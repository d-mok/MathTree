import { toEquSystem } from './support/support';

export function BuildTrend(
    variables: [sym: string, name: string, range: rangeInput, unit?: string, display?: string][],
    equations: [func: Fun, latex: string][],
    settings: {
        trends?: [inc: string, dec: string, unchange: string]
    } = {}
): {
    sol: string
    consts: [symbol: string[], name: string[]]
    agent: [symbol: string, name: string, trend: string, code: number]
    responses: [symbol: string, name: string, trend: string, code: number][]
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

    function toCode(change: number): number {
        if (change > 0) return 0
        if (change === 0) return 2
        if (change < 0) return 1
        return 3
    }

    return {
        consts: [
            constants.map(v => v.symbol()),
            constants.map(v => v.name)
        ],
        agent: [
            agent.symbol(),
            agent.name,
            toWord(agent.getVal()),
            toCode(agent.getVal())
        ],
        responses: responses.map(v => [
            v.symbol(),
            v.name,
            toWord(v.getVal()),
            toCode(v.getVal())
        ]),
        sol: system.print()
    }

}
