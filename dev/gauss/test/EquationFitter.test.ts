import { fit } from '../src/EquationFitter/index.ts'
import { analyze } from '../src/EquationAnalyzer/index.ts'
import { expect } from '@std/expect'
import '../src/globals.d.ts'

Deno.test('fit', () => {
    const vals = fit(
        [(x, y) => x - y],
        {
            x: [-100, 10],
            y: [-100, 10],
        },
        {},
    )

    expect(Math.abs(vals.x - vals.y)).toBeLessThan(0.000001)
})

Deno.test('analyze', () => {
    analyze
})
