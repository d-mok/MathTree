import _ from 'lodash'

test('log', () => {
    expect(log(10, 100)).toBe(2)
    expect(log(2, 8)).toBe(3)
    expect(log(3, 81)).toBe(4)
    expect(log(4, 8)).toBe(1.5)
    expect(log(5, 10)).toBeCloseTo(Math.log(10) / Math.log(5), 10)
})

test('Sqrt', () => {
    expect(Sqrt(0)).toBe(0)
    expect(Sqrt(1)).toBe(1)
    expect(Sqrt(4)).toBe(2)
    expect(Sqrt(9)).toBe(3)
    expect(Sqrt(16)).toBe(4)
    expect(Sqrt(25)).toBe(5)
    expect(Sqrt(10)).toBeCloseTo(3.16227766)
    expect(() => Sqrt(-1)).toThrow()
})

test('Radian', () => {
    expect(Radian(0)).toBe(0)
    expect(Radian(180)).toBeCloseTo(Math.PI)
    expect(Radian(90)).toBeCloseTo(Math.PI / 2)
    expect(Radian(45)).toBeCloseTo(Math.PI / 4)
    expect(Radian(30)).toBeCloseTo(Math.PI / 6)
    expect(Radian(390)).toBeCloseTo((13 * Math.PI) / 6)
})

test('Degree', () => {
    expect(Degree(0)).toBe(0)
    expect(Degree(Math.PI)).toBe(180)
    expect(Degree(Math.PI / 2)).toBe(90)
    expect(Degree(Math.PI / 4)).toBe(45)
    expect(Degree(Math.PI / 6)).toBe(30)
    expect(Degree((13 * Math.PI) / 6)).toBe(390)
})

test('sin', () => {
    expect(sin(0)).toBe(0)
    expect(sin(90)).toBe(1)
    expect(sin(180)).toBe(0)
    expect(sin(270)).toBe(-1)
    expect(sin(360) + 0).toBe(0)
    expect(sin(30)).toBe(0.5)
    expect(sin(45)).toBeCloseTo(2 ** 0.5 / 2, 10)
    expect(sin(60)).toBeCloseTo(3 ** 0.5 / 2, 10)
})

test('cos', () => {
    expect(cos(0)).toBe(1)
    expect(cos(90)).toBe(0)
    expect(cos(180)).toBe(-1)
    expect(cos(270) + 0).toBe(0)
    expect(cos(360)).toBe(1)
    expect(cos(30)).toBeCloseTo(3 ** 0.5 / 2, 10)
    expect(cos(45)).toBeCloseTo(2 ** 0.5 / 2, 10)
    expect(cos(60)).toBe(0.5)
})

test('tan', () => {
    expect(tan(0)).toBe(0)
    expect(tan(180) + 0).toBe(0)
    expect(tan(360) + 0).toBe(0)
    expect(tan(30)).toBeCloseTo(3 ** 0.5 / 3, 10)
    expect(tan(45)).toBe(1)
    expect(tan(60)).toBeCloseTo(3 ** 0.5, 10)
})

test('arcsin', () => {
    expect(arcsin(0)).toBe(0)
    expect(arcsin(1)).toBe(90)
    expect(arcsin(-1)).toBe(-90)
    expect(arcsin(0.5)).toBe(30)
    expect(arcsin(-0.5)).toBe(-30)
    expect(arcsin(2 ** 0.5 / 2)).toBe(45)
    expect(arcsin(-(2 ** 0.5) / 2)).toBe(-45)
    expect(arcsin(3 ** 0.5 / 2)).toBe(60)
    expect(arcsin(-(3 ** 0.5) / 2)).toBe(-60)
})

test('arccos', () => {
    expect(arccos(0)).toBe(90)
    expect(arccos(1)).toBe(0)
    expect(arccos(-1)).toBe(180)
    expect(arccos(0.5)).toBe(60)
    expect(arccos(-0.5)).toBe(120)
    expect(arccos(2 ** 0.5 / 2)).toBe(45)
    expect(arccos(-(2 ** 0.5) / 2)).toBe(135)
    expect(arccos(3 ** 0.5 / 2)).toBe(30)
    expect(arccos(-(3 ** 0.5) / 2)).toBe(150)
})

test('arctan', () => {
    expect(arctan(0)).toBe(0)
    expect(arctan(1)).toBe(45)
    expect(arctan(-1)).toBe(-45)
    expect(arctan(3 ** 0.5)).toBe(60)
    expect(arctan(-(3 ** 0.5))).toBe(-60)
    expect(arctan(1 / 3 ** 0.5)).toBe(30)
    expect(arctan(-1 / 3 ** 0.5)).toBe(-30)
})
