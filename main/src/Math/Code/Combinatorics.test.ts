import _ from 'lodash'
import * as math from 'mathjs'

test('Factorial', () => {
    expect(Factorial(0)).toBe(1)
    expect(Factorial(1)).toBe(1)
    expect(Factorial(2)).toBe(2)
    expect(Factorial(3)).toBe(6)
    expect(Factorial(4)).toBe(24)
    expect(Factorial(5)).toBe(120)
    expect(Factorial(6)).toBe(720)
    expect(() => Factorial(1.5)).toThrow()
    expect(() => Factorial(-1)).toThrow()
})

test('nCr', () => {
    expect(nCr(8, 0)).toBe(1)
    expect(nCr(8, 1)).toBe(8)
    expect(nCr(8, 2)).toBe(28)
    expect(nCr(8, 8)).toBe(1)
    expect(nCr(6, 2)).toBe(15)
    expect(nCr(15, 7)).toBe(6435)
    expect(() => nCr(10.5, 7)).toThrow()
    expect(() => nCr(6, 7)).toThrow()
})

test('nPr', () => {
    expect(nPr(8, 0)).toBe(1)
    expect(nPr(8, 1)).toBe(8)
    expect(nPr(8, 2)).toBe(56)
    expect(nPr(8, 8)).toBe(40320)
    expect(nPr(6, 2)).toBe(30)
    expect(nPr(15, 7)).toBe(32432400)
    expect(() => nPr(10.5, 7)).toThrow()
    expect(() => nPr(6, 7)).toThrow()
})
