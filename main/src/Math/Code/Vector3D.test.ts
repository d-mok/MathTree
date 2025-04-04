import { describe, expect, it, test } from 'vitest'
import { toBeDeepCloseTo, toMatchCloseTo } from 'jest-matcher-deep-close-to'
expect.extend({ toBeDeepCloseTo, toMatchCloseTo })
import _ from 'lodash'

test('VecAdd3D', () => {
    expect(VecAdd3D([1, 2, 3], [3, 4, 5], [5, 6, 7])).toEqual([9, 12, 15])
})

test('Mid3D', () => {
    expect(Mid3D([1, 2, 3], [3, 4, 5], [5, 6, 7])).toEqual([3, 4, 5])
})

test('Slide3D', () => {
    expect(Slide3D([0, 0, 0], [4, 8, 0], 0.25)).toEqual([1, 2, 0])
    expect(Slide3D([0, 0, 0], [4, 8, 0], 1.25)).toEqual([5, 10, 0])
    expect(Slide3D([0, 0, 0], [4, 8, 0], -0.25)).toEqual([-1, -2, 0])
    expect(Slide3D([0, 0, 0], [4, 8, 12], 0.25)).toEqual([1, 2, 3])
})

test('PdFoot3D', () => {
    let P: Point3D = [2, 3, 4]
    let [A, B, C]: Point3D[] = [
        [0, 0, 5],
        [1, 0, 5],
        [0, 1, 5],
    ]
    expect(PdFoot3D(P, [A, B, C])).toEqual([2, 3, 5])
    expect(PdFoot3D(P, [A, B])).toEqual([2, 0, 5])
})

test('Embed', () => {
    let [A, B, C]: Point2D[] = [
        [0, 0],
        [1, 0],
        [0, 1],
    ]
    expect(Embed([A, B, C], [0, 0, 2], [1, 0, 0], [0, 1, 0])).toEqual([
        [0, 0, 2],
        [1, 0, 2],
        [0, 1, 2],
    ])
})

test('EmbedX', () => {
    let [A, B, C]: Point2D[] = [
        [0, 0],
        [3, 0],
        [0, 1],
    ]
    expect(EmbedX([A, B, C], 2)).toEqual([
        [2, 0, 0],
        [2, 3, 0],
        [2, 0, 1],
    ])
})

test('EmbedY', () => {
    let [A, B, C]: Point2D[] = [
        [0, 0],
        [3, 0],
        [0, 1],
    ]
    expect(EmbedY([A, B, C], 2)).toEqual([
        [0, 2, 0],
        [3, 2, 0],
        [0, 2, 1],
    ])
})

test('EmbedZ', () => {
    let [A, B, C]: Point2D[] = [
        [0, 0],
        [3, 0],
        [0, 1],
    ]
    expect(EmbedZ([A, B, C], 2)).toEqual([
        [0, 0, 2],
        [3, 0, 2],
        [0, 1, 2],
    ])
})

test('FlatZ', () => {
    let [A, B, C]: Point3D[] = [
        [0, 0, 0],
        [3, 0, 1],
        [0, 1, 2],
    ]
    expect(FlatZ([A, B, C], 2)).toBeDeepCloseTo([
        [0, 0, 2],
        [3, 0, 2],
        [0, 1, 2],
    ])
})

test('Extrude', () => {
    let [A, B, C]: Point3D[] = [
        [0, 0, 0],
        [4, 0, 0],
        [0, 4, 0],
    ]
    expect(Extrude([A, B, C], [[0, 0, 4]], 0.75)).toEqual([
        [0, 0, 1],
        [3, 0, 1],
        [0, 3, 1],
    ])
})
