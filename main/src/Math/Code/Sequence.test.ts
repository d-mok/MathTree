import _ from 'lodash'
import * as math from 'mathjs'

test('Rng', () => {
    expect(Rng(2, 6)).toEqual([2, 3, 4, 5, 6])
    expect(Rng(-2, 2)).toEqual([-2, -1, 0, 1, 2])
    expect(Rng(1, 1, 4, 4, 3, 3, 3)).toEqual([1, 2, 3, 4])
})

test('ASterm', () => {
    expect(ASterm(2, 3, 10)).toBe(29)
    expect(ASterm(5, -2, 6)).toBe(-5)
})

test('ASsum', () => {
    expect(ASsum(2, 3, 10)).toBe(155)
    expect(ASsum(5, -2, 6)).toBe(0)
})

test('ASequence', () => {
    expect(ASequence(2, 3, 5)).toEqual([2, 5, 8, 11, 14])
    expect(ASequence(5, -2, 3)).toEqual([5, 3, 1])
})

test('GSterm', () => {
    expect(GSterm(2, 3, 4)).toBe(54)
    expect(GSterm(5, -2, 6)).toBe(-160)
})

test('GSsum', () => {
    expect(GSsum(2, 3, 4)).toBe(80)
    expect(GSsum(5, -2, 3)).toBe(15)
    expect(GSsum(3, 0.5)).toBe(6)
})

test('GSequence', () => {
    expect(GSequence(2, 3, 5)).toEqual([2, 6, 18, 54, 162])
    expect(GSequence(5, -2, 3)).toEqual([5, -10, 20])
})

test('QuadraticSequence', () => {
    expect(QuadraticSequence(1, 2, 3, 1)).toBe(1)
    expect(QuadraticSequence(1, 2, 3, 2)).toBe(6)
    expect(QuadraticSequence(1, 2, 3, 3)).toBe(13)
    expect(QuadraticSequence(1, 2, 3, 4)).toBe(22)
})

test('LucasSequence', () => {
    expect(LucasSequence(1, 2, 3, 4, 1)).toBe(1)
    expect(LucasSequence(1, 2, 3, 4, 2)).toBe(2)
    expect(LucasSequence(1, 2, 3, 4, 3)).toBe(10)
    expect(LucasSequence(1, 2, 3, 4, 4)).toBe(38)
    expect(LucasSequence(1, 2, 3, 4, 5)).toBe(154)
})
