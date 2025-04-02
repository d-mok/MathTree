import _ from 'lodash'
import * as math from 'mathjs'
import { describe, expect, it, test } from 'vitest'

test('CircleGeneral', () => {
    expect(CircleGeneral([2, 3], 5)).toEqual([-4, -6, -12])
})

test('CircleFromGeneral', () => {
    expect(CircleFromGeneral(-4, -6, -12)).toEqual([[2, 3], 5])
})

test('CircleLinearIntersect', () => {
    expect(CircleLinearIntersect([0, 0], 2 ** 0.5, [1, -1, 0])).toEqual([
        [-1, -1],
        [1, 1],
    ])
    expect(CircleLinearIntersect([0, 0], 5, [4, -3, 0])).toEqual([
        [-3, -4],
        [3, 4],
    ])
    expect(CircleLinearIntersect([1, -1], 40 ** 0.5, [3, 1, -2])).toEqual([
        [-1, 5],
        [3, -7],
    ])
    // expect(CircleLinearIntersect([1, 2], 13 ** 0.5, [2, 3, -21])).toEqual([[3, 5], [3, 5]]);
    expect(CircleLinearIntersect([6, 7], 5 ** 0.5, [1, 0, -5])).toEqual([
        [5, 5],
        [5, 9],
    ])
    expect(CircleLinearIntersect([6, 7], 5 ** 0.5, [0, 1, -5])).toEqual([
        [5, 5],
        [7, 5],
    ])
})

test('CircleLineIntersect', () => {
    expect(
        CircleLineIntersect([0, 0], 2 ** 0.5, [
            [0, 0],
            [1, 1],
        ])
    ).toEqual([
        [-1, -1],
        [1, 1],
    ])
})
