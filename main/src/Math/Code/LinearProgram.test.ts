import _ from 'lodash'

test('FieldAt', () => {
    expect(FieldAt([0, 0], [1, 2, 3])).toBe(3)
    expect(FieldAt([1, 2], [3, -4, 5])).toBe(0)
})

test('isConstrained', () => {
    expect(
        isConstrained(
            [
                [1, 0, '<', 10],
                [1, 0, '>', -5],
                [0, 1, '<', 10],
                [0, 1, '>', -5],
            ],
            [0, 0]
        )
    ).toBe(true)
    expect(
        isConstrained(
            [
                [1, 0, '<', 10],
                [1, 0, '>', -5],
                [0, 1, '<', 10],
                [0, 1, '>', -5],
            ],
            [20, 20]
        )
    ).toBe(false)
})

test('isLooseConstrained', () => {
    expect(
        isLooseConstrained(
            [
                [1, 0, '<', 10],
                [1, 0, '>', -5],
                [0, 1, '<', 10],
                [0, 1, '>', -5],
            ],
            [10, 10]
        )
    ).toBe(true)
    expect(
        isLooseConstrained(
            [
                [1, 0, '<', 10],
                [1, 0, '>', -5],
                [0, 1, '<', 10],
                [0, 1, '>', -5],
            ],
            [10, 0]
        )
    ).toBe(true)
})

test('FeasiblePolygon', () => {
    expect(
        FeasiblePolygon(
            [1, 0, '<', 10],
            [1, 0, '>', -5],
            [0, 1, '<', 10],
            [0, 1, '>', -5]
        )
    ).toEqual([
        [10, 10],
        [-5, 10],
        [-5, -5],
        [10, -5],
    ])
    expect(() => FeasiblePolygon([1, 1, '<', 10], [1, 1, '>', 10])).toThrow()
})

test('FeasibleIntegral', () => {
    expect(
        FeasibleIntegral(
            [1, 0, '<', 3],
            [1, 0, '>', 0],
            [0, 1, '<', 2],
            [0, 1, '>', 0]
        )
    ).toEqual([
        [1, 1],
        [2, 1],
    ])
    expect(
        FeasibleIntegral(
            [1, 1, '<=', 5],
            [1, -1, '<', 4],
            [2, 1, '>=', -5],
            [3, 1, '>', -10]
        )
    ).toHaveLength(68)
    expect(
        FeasibleIntegral(
            [1, 0, '<', 10],
            [1, 0, '>', -5],
            [0, 1, '<', 10],
            [0, 1, '>', -5]
        )
    ).toHaveLength(14 * 14)
    expect(
        FeasibleIntegral(
            [1, 0, '<', 1],
            [1, 0, '>', 0],
            [0, 1, '<', 1],
            [0, 1, '>', 0]
        )
    ).toHaveLength(0)
    expect(FeasibleIntegral([1, 1, '<', 1]).length).toBeGreaterThan(100)
    expect(FeasibleIntegral([1, 1, '<', 10], [1, 1, '>', 10])).toHaveLength(0)
})

test('FeasibleVertices', () => {
    expect(
        FeasibleVertices(
            [1, 0, '<', 10],
            [1, 0, '>', -5],
            [0, 1, '<', 10],
            [0, 1, '>', -5]
        )
    ).toEqual([
        [10, 10],
        [-5, 10],
        [-5, -5],
        [10, -5],
    ])
    expect(() => FeasibleVertices([1, 1, '<', 10])).toThrow()
    expect(FeasibleVertices([1, 1, '<', 0], [1, -1, '<', 0])).toEqual([[0, 0]])
})

test('FeasibleIsBounded', () => {
    expect(
        FeasibleIsBounded(
            [1, 0, '<', 10],
            [1, 0, '>', -5],
            [0, 1, '<', 10],
            [0, 1, '>', -5]
        )
    ).toBe(true)
    expect(FeasibleIsBounded([1, 1, '<', 10])).toBe(false)
    expect(FeasibleIsBounded([1, 1, '<', 0], [1, -1, '<', 0])).toBe(false)
})

test('MaximizePoint', () => {
    let points = FeasibleIntegral(
        [1, 1, '<=', 5],
        [1, -1, '<', 4],
        [2, 1, '>=', -5],
        [3, 1, '>', -10]
    )
    expect(MaximizePoint(points, [2, 1, 1])).toEqual([4, 1])
    expect(() => MaximizePoint(points, [1, 1, 1])).toThrow()
})

test('MinimizePoint', () => {
    let points = FeasibleIntegral(
        [1, 1, '<=', 5],
        [1, -1, '<', 4],
        [2, 1, '>=', -5],
        [3, 1, '>', -10]
    )
    expect(MinimizePoint(points, [1, 1, 1])).toEqual([-1, -3])
    expect(() => MinimizePoint(points, [2, 1, 1])).toThrow()
})

test('OptimizePoint', () => {
    let points = FeasibleIntegral(
        [1, 1, '<=', 5],
        [1, -1, '<', 4],
        [2, 1, '>=', -5],
        [3, 1, '>', -10]
    )
    expect(OptimizePoint(points, [2, 1, 1], true)).toEqual([4, 1])
    expect(OptimizePoint(points, [1, 1, 1], false)).toEqual([-1, -3])
    expect(() => OptimizePoint(points, [2, 1, 1], false)).toThrow()
})

test('MaximizeField', () => {
    let points = FeasibleIntegral(
        [1, 1, '<=', 5],
        [1, -1, '<', 4],
        [2, 1, '>=', -5],
        [3, 1, '>', -10]
    )
    expect(MaximizeField(points, [2, 1, 1])).toBe(10)
})

test('MinimizeField', () => {
    let points = FeasibleIntegral(
        [1, 1, '<=', 5],
        [1, -1, '<', 4],
        [2, 1, '>=', -5],
        [3, 1, '>', -10]
    )
    expect(MinimizeField(points, [1, 1, 1])).toBe(-3)
    expect(MinimizeField(points, [2, 1, 1])).toBe(-4)
})

test('OptimizeField', () => {
    let points = FeasibleIntegral(
        [1, 1, '<=', 5],
        [1, -1, '<', 4],
        [2, 1, '>=', -5],
        [3, 1, '>', -10]
    )
    expect(OptimizeField(points, [2, 1, 1], true)).toBe(10)
    expect(OptimizeField(points, [1, 1, 1], false)).toBe(-3)
    expect(OptimizeField(points, [2, 1, 1], false)).toBe(-4)
})

test('ConstraintsFromPoints', () => {
    expect(() =>
        ConstraintsFromPoints([0, 3], [0, 1], [3, 0], [1, 1])
    ).toThrow()

    expect(ConstraintsFromPoints([0, 0], [0, 1], [1, 0])).toEqual([
        [1, 0, '\\ge', -0],
        [0, 1, '\\ge', -0],
        [1, 1, '\\le', 1],
    ])

    expect(
        ConstraintsFromPoints([0, 0], [3, -1], [2, 2], [1, 3], [-2, 2])
    ).toEqual([
        [1, 1, '\\le', 4],
        [1, -3, '\\ge', -8],
        [1, 1, '\\ge', -0],
        [1, 3, '\\ge', -0],
        [3, 1, '\\le', 8],
    ])
    expect(
        ConstraintsFromPoints([0, 0], [1, 2], [2, 1], [0, 1], [1, 0])
    ).toEqual([
        [1, 1, '\\le', 3],
        [1, -1, '\\ge', -1],
        [1, 0, '\\ge', -0],
        [0, 1, '\\ge', -0],
        [1, -1, '\\le', 1],
    ])
})
