import { analyze } from '../src/EquationAnalyzer/analyze'
import { solutionFlow } from '../src/EquationAnalyzer/reader';


test('analyze', () => {

    const fs1: zeroFunction[] = [
        (x, y, w) => 0,
        (x, y, z) => 0
    ]
    const trees1 = analyze(fs1)

    const read1 = solutionFlow(fs1, trees1[1], ['z']).map($ => $.toString())


    const fs2: zeroFunction[] = [
        (a, b) => 0,
        (b, c) => 0,
        (c, d) => 0,
        (d, e) => 0,
        (e, f) => 0
    ]

    const trees2 = analyze(fs2)

    const read2 = solutionFlow(fs2, trees2[1], ['e']).map($ => $.toString())

    const trees3 = analyze([
        (a, b, c) => 0,
        (a, b, c) => 0,
    ])

    const trees4 = analyze([
        (a, b, c) => 0,
        (a) => 0
    ])


    console.log(read1)
    expect(true).toBe(true)
});
