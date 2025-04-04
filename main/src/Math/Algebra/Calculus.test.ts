import _ from 'lodash'
import { describe, expect, it, test } from 'vitest'

test('differentiate', () => {
    expect(differentiate(x => x ** 2)(5)).toBeCloseTo(10)
})

test('integrate', () => {
    expect(integrate(x => 2 * x, [0, 3])(5)).toBeCloseTo(28)
})

test('integrate', () => {
    expect(
        functionize([
            [0, 0],
            [2, 4],
        ])(1)
    ).toBeCloseTo(2)
})
