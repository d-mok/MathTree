import _ from 'lodash'
import { describe, expect, it, test } from 'vitest'

test('Discriminant', () => {
    expect(Discriminant(1, 2, 3)).toBe(-8)
    expect(Discriminant(4, -5, 6)).toBe(-71)
    expect(Discriminant(-3, 8, 6)).toBe(136)
})

test('QuadraticRoot', () => {
    expect(QuadraticRoot(1, 2, -3)).toEqual([-3, 1])
    expect(QuadraticRoot(-1, -2, 3)).toEqual([-3, 1])
    expect(QuadraticRoot(1, 2, 1)).toEqual([-1, -1])
})

test('QuadraticVertex', () => {
    expect(QuadraticVertex(1, 2, 3)).toEqual([-1, 2])
    expect(QuadraticVertex(2, 5, -4)).toEqual([-1.25, -7.125])
})

test('QuadraticFromRoot', () => {
    expect(QuadraticFromRoot(1, 2, 3)).toEqual([1, -5, 6])
    expect(QuadraticFromRoot(-2, 4, -3)).toEqual([-2, 2, 24])
})

test('QuadraticFromVertex', () => {
    expect(QuadraticFromVertex(1, 2, 3)).toEqual([1, -4, 7])
    expect(QuadraticFromVertex(-2, 4, -3)).toEqual([-2, 16, -35])
})
