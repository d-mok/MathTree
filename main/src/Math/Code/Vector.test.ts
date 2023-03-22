import _ from 'lodash'
import * as math from 'mathjs'

test('pass', () => {})

test('VecAdd', () => {
    expect(VecAdd([1, 2], [3, 4], [5, 6])).toEqual([9, 12])
    expect(VecAdd([-1, 2], [3, -4])).toEqual([2, -2])
})
