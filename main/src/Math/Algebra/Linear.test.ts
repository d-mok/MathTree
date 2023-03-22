import _ from 'lodash'

test('LineFeat', () => {
    expect(LineFeat(2, 4, 6)).toEqual([-0.5, -1.5, -3])
    expect(() => LineFeat(0, 4, 6)).toThrow()
    expect(() => LineFeat(2, 0, 6)).toThrow()
})

test('LinearFromIntercepts', () => {
    expect(LinearFromIntercepts(1, 2)).toEqual([2, 1, -2])
    expect(LinearFromIntercepts(-3, 2)).toEqual([2, -3, 6])
    expect(LinearFromIntercepts(4, -2)).toEqual([1, -2, -4])
    expect(() => LinearFromIntercepts(0, -2)).toThrow()
})

test('LinearFromTwoPoints', () => {
    expect(LinearFromTwoPoints([1, 2], [3, 4])).toEqual([1, -1, 1])
    expect(LinearFromTwoPoints([0, 0], [3, 4])).toEqual([4, -3, 0])
    expect(() => LinearFromTwoPoints([1, 2], [1, 2])).toThrow()
})

test('LinearFromPointSlope', () => {
    expect(LinearFromPointSlope([1, 2], 3)).toEqual([3, -1, -1])
    expect(LinearFromPointSlope([1, 2], 0)).toEqual([0, 1, -2])
})

test('LinearFromBisector', () => {
    expect(LinearFromBisector([1, 2], [3, 4])).toEqual([1, 1, -5])
    expect(LinearFromBisector([1, 2], [1, 4])).toEqual([0, 1, -3])
})

test('LineFromIntercepts', () => {
    expect(LineFromIntercepts(1, 2)).toEqual([-2, 2])
    expect(LineFromIntercepts(-3, 2)).toEqual([2 / 3, 2])
    expect(LineFromIntercepts(4, -2)).toEqual([1 / 2, -2])
    expect(() => LineFromIntercepts(0, -2)).toThrow()
})

test('LineFromTwoPoints', () => {
    expect(LineFromTwoPoints([1, 2], [3, 4])).toEqual([1, 1])
    expect(LineFromTwoPoints([0, 0], [3, 4])).toEqual([4 / 3, 0])
    expect(() => LineFromTwoPoints([1, 2], [1, 2])).toThrow()
})

test('LineFromPointSlope', () => {
    expect(LineFromPointSlope([1, 2], 3)).toEqual([3, -1])
    expect(LineFromPointSlope([1, 2], 0)).toEqual([-0, 2])
})

test('LineFromBisector', () => {
    expect(LineFromBisector([1, 2], [3, 4])).toEqual([-1, 5])
    expect(LineFromBisector([1, 2], [1, 4])).toEqual([-0, 3])
})
