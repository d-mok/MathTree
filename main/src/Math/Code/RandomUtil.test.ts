import { repeat } from '../Jest/JestExtend.js'
import _ from 'lodash'
import * as math from 'mathjs'
import { describe, expect, it, test } from 'vitest'

test('RndPick', () => {
    repeat(10, () => {
        expect(() => RndPick('a', 'b', 'c')).toSpanSame(['a', 'b', 'c'])
    })
})

test('RndShuffle', () => {
    repeat(10, () => {
        expect(() => RndShuffle('a', 'b', 'c')).toSpanSame([
            ['a', 'b', 'c'],
            ['a', 'c', 'b'],
            ['b', 'a', 'c'],
            ['b', 'c', 'a'],
            ['c', 'a', 'b'],
            ['c', 'b', 'a'],
        ])
    })
})

test('RndPickN', () => {
    repeat(10, () => {
        expect(() => RndPickN(['a', 'b', 'c'], 2)).toSpanSame([
            ['a', 'b'],
            ['a', 'c'],
            ['b', 'a'],
            ['b', 'c'],
            ['c', 'a'],
            ['c', 'b'],
        ])
    })
})

test('RndPickUnique', () => {
    repeat(10, () => {
        expect(() => RndPickUnique(['a', 'b', 'c'], 2)).toSpanSame([
            ['a', 'b'],
            ['a', 'c'],
            ['b', 'a'],
            ['b', 'c'],
            ['c', 'a'],
            ['c', 'b'],
        ])
    })

    repeat(10, () => {
        expect(() => RndPickUnique(['a', 'b', 'b', 'b', 'c'], 2)).toSpanSame([
            ['a', 'b'],
            ['a', 'c'],
            ['b', 'a'],
            ['b', 'c'],
            ['c', 'a'],
            ['c', 'b'],
        ])
    })
})

// test('RndBalanced', () => {
//     let arr = sample(() => RndBalanced(['a', 'b'], 6));
//     expect(arr).toBeFlatDistinct(2);
//     expect(arr).toBeFlatIncluded(['a', 'b']);
//     expect(arr).toAllHaveLength(6);
//     let nG = arr.flat().filter(x => x === 'a').length;
//     let nL = arr.flat().filter(x => x === 'b').length;
//     expect(nG).toBe(nL);

//     arr = sample(() => RndBalanced(['a', 'b'], 19));
//     expect(arr).toBeFlatDistinct(2);
//     expect(arr).toBeFlatIncluded(['a', 'b']);
//     expect(arr).toAllHaveLength(19);
//     nG = arr.flat().filter(x => x === 'a').length;
//     nL = arr.flat().filter(x => x === 'b').length;
//     expect(nG).toBeGreaterThan(nL);
// });

test('RndHe', () => {
    repeat(10, () => {
        expect(RndHe()).toBeString()
    })
})

test('RndShe', () => {
    repeat(10, () => {
        expect(RndShe()).toBeString()
    })
})

test('RndLetters', () => {
    repeat(10, () => {
        expect(RndLetters()).toSatisfyAll($ => typeof $ === 'string')
        expect(RndLetters()).toSatisfyAll($ => $.length === 1)
        expect(RndLetters()).toSatisfyAll($ => $ === $.toLowerCase())
        expect(RndLetters()).toHaveLength(3)
    })
})

test('RndCapitals', () => {
    expect(RndCapitals()).toSatisfyAll($ => typeof $ === 'string')
    expect(RndCapitals()).toSatisfyAll($ => $.length === 1)
    expect(RndCapitals()).toSatisfyAll($ => $ === $.toUpperCase())
    expect(RndCapitals()).toHaveLength(3)
})
