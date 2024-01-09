import _ from 'lodash'
import * as math from 'mathjs'

test('At', () => {
    expect(At([1, 2, 3], -1)).toEqual(3)
    expect(At([1, 2, 3], 1)).toEqual(2)
    expect(At([1, 2, 3], 3)).toEqual(1)
})

test('Lace', () => {
    expect(Lace([1, 2, 3, 4, 5, 6], 0, [-1, 0, 1])).toEqual([6, 1, 2])
})

test('Flop', () => {
    expect(Flop(true, 1, 2)).toEqual([1, 2])
    expect(Flop(false, 1, 2)).toEqual([2, 1])
})

test('ComboDisplay', () => {
    expect(ComboDisplay([true, false], [1, 2], [3, 4])).toEqual([1, 4])
    expect(ComboDisplay(0, [1, 2], [3, 4])).toEqual([1, 4])
    expect(ComboDisplay(1, [1, 2], [3, 4])).toEqual([2, 3])
})
