import { repeat } from '../Jest/JestExtend'
import { getMaxDeg } from './Polynomial'

function getPoly(): polynomial {
    return [
        { coeff: 5, x: 1, y: 6 },
        { coeff: -7, x: -1, y: 5 },
        { coeff: 1, x: 3, y: 4 },
        { coeff: -1, x: 6, y: 3 },
        { coeff: 6, x: 0, y: 2 },
        { coeff: 0, x: 3, y: 1 },
        { coeff: 8, x: 9, y: 0 },
        { coeff: 2, x: 0, y: 0 },
    ]
}

let T = '5xy^{6}+-7x^{-1}y^{5}+1x^{3}y^{4}+-1x^{6}y^{3}+6y^{2}+8x^{9}+2'
let TSorted = '8x^{9}+-1x^{6}y^{3}+1x^{3}y^{4}+5xy^{6}+-7x^{-1}y^{5}+6y^{2}+2'

test('RndPolynomial', () => {
    repeat(10, () => {
        let poly = RndPolynomial(8, ['x', 'y'], 3, 9)
        expect(poly).toSatisfy(owl.polynomial)
        expect(poly).toSatisfy($ => getMaxDeg($) === 8)
    })
})

test('PolyPrint', () => {
    let P = getPoly()
    expect(PolyPrint(P)).toBe(T)
})

test('PolySort', () => {
    let P = getPoly()
    P = PolySort(P, true)
    expect(PolyPrint(P)).toBe(TSorted)
})

test('PolyFunction', () => {
    let P = getPoly()
    let func = PolyFunction(P)
    expect(func({ x: 2, y: 3 })).toBe(9511.5)
})

test('PolyJoin', () => {
    let P = [
        { coeff: 5, x: 1, y: 6 },
        { coeff: -7, x: -1, y: 5 },
        { coeff: 1, x: 3, y: 4 },
        { coeff: -1, x: 6, y: 3 },
    ]
    let Q = [
        { coeff: 6, x: 0, y: 2 },
        { coeff: 0, x: 3, y: 1 },
        { coeff: 8, x: 9, y: 0 },
        { coeff: 2, x: 0, y: 0 },
    ]
    let T = '5xy^{6}+-7x^{-1}y^{5}+1x^{3}y^{4}+-1x^{6}y^{3}+6y^{2}+8x^{9}+2'
    expect(PolyPrint([...P, ...Q])).toBe(T)
})

test('PolySimplify', () => {
    let P = [
        { coeff: 1, x: 1, y: 3 },
        { coeff: 2, x: 2, y: 4 },
        { coeff: 3, x: 1, y: 3 },
        { coeff: 4, x: 2, y: 4 },
        { coeff: 0, x: 3, y: 5 },
    ]
    let T = '4xy^{3}+6x^{2}y^{4}'
    expect(PolyPrint(PolySimplify(P))).toBe(T)
    expect(PolySimplify(P)).toHaveLength(2)
})
