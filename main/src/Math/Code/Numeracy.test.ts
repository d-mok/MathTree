import { describe, expect, it, test } from 'vitest'

test('Divide', () => {
    expect(Divide(6, 2)).toBe(3)
})

test('Abs', () => {
    expect(Abs(0)).toBe(0)
    expect(Abs(12.5)).toBe(12.5)
    expect(Abs(-2)).toBe(2)
    expect(Abs(-34.5)).toBe(34.5)
    expect(Abs(-1234)).toBe(1234)
    expect(Abs(-0)).toBe(0)
    expect(Abs(6)).toBe(6)
})

test('Sign', () => {
    expect(Sign(0)).toBe(0)
    expect(Sign(12.5)).toBe(1)
    expect(Sign(-2)).toBe(-1)
    expect(Sign(-34.5)).toBe(-1)
    expect(Sign(-1234)).toBe(-1)
    expect(Sign(-0)).toBe(0)
    expect(Sign(6)).toBe(1)
})

describe('SigFig', () => {
    const cases = [
        [1, 1],
        [12, 2],
        [123, 3],
        [123.4, 4],
        [123.45, 5],
        [123.456, 6],
        [0.123, 3],
        [0.00123, 3],
        [0.00001230123, 7],
        [10, 1],
        [1200, 2],
        [1200.0001, 8],
        [1200.0001, 8],
        [-1200.0001, 8],
        [0.81 - 1, 2], //-0.18999999999999995
        [1.1 ** 2, 3], //1.2100000000000002
    ]
    it.each(cases)('SigFig(%p)', (num, expected) => {
        expect(SigFig(num)).toBe(expected)
    })
})

describe('Round', () => {
    const cases = [
        [123.4567, 1, 100, 200, 100],
        [123.4567, 2, 120, 130, 120],
        [123.4567, 3, 123, 124, 123],
        [123.4567, 4, 123.5, 123.5, 123.4],
        [123.4567, 5, 123.46, 123.46, 123.45],
        [123.4567, 6, 123.457, 123.457, 123.456],
        [123.4567, 7, 123.4567, 123.4567, 123.4567],
        [123.4567, 8, 123.4567, 123.4567, 123.4567],
        [1.005, 1, 1, 2, 1],
        [1.005, 2, 1, 1.1, 1],
        [1.005, 3, 1.01, 1.01, 1],
        [1.005, 4, 1.005, 1.005, 1.005],
        [1.005, 5, 1.005, 1.005, 1.005],
        [1.555, 1, 2, 2, 1],
        [1.555, 2, 1.6, 1.6, 1.5],
        [1.555, 3, 1.56, 1.56, 1.55],
        [1.555, 4, 1.555, 1.555, 1.555],
        [1.555, 5, 1.555, 1.555, 1.555],
        [123.9999, 5, 124, 124, 123.99],
        [-123.4567, 3, -123, -124, -123],
        [-123.4567, 4, -123.5, -123.5, -123.4],
        [0, 1, 0, 0, 0],
        [0, 2, 0, 0, 0],
        [1.23455e-30, 5, 1.2346e-30, 1.2346e-30, 1.2345e-30],
        [123.0001, 5, 123, 123.01, 123],
        [0.1 + 0.2, 1, 0.3, 0.3, 0.3],
        [1.2345e-30, 5, 1.2345e-30, 1.2345e-30, 1.2345e-30],
    ]
    it.each(cases)('Rounding(%p,%p)', (num, sf, off, up, down) => {
        expect(Round(num, sf)).toBe(off)
        expect(RoundUp(num, sf)).toBe(up)
        expect(RoundDown(num, sf)).toBe(down)
    })
})

describe('Fix', () => {
    const cases = [
        [123.4567, -2, 100, 200, 100],
        [123.4567, -1, 120, 130, 120],
        [123.4567, 0, 123, 124, 123],
        [123.4567, 1, 123.5, 123.5, 123.4],
        [123.4567, 2, 123.46, 123.46, 123.45],
        [123.4567, 3, 123.457, 123.457, 123.456],
        [123.4567, 4, 123.4567, 123.4567, 123.4567],
        [123.4567, 5, 123.4567, 123.4567, 123.4567],
        [1.005, -1, 0, 10, 0],
        [1.005, 0, 1, 2, 1],
        [1.005, 1, 1, 1.1, 1],
        [1.005, 2, 1.01, 1.01, 1],
        [1.005, 3, 1.005, 1.005, 1.005],
        [1.005, 4, 1.005, 1.005, 1.005],
        [1.555, -1, 0, 10, 0],
        [1.555, 0, 2, 2, 1],
        [1.555, 1, 1.6, 1.6, 1.5],
        [1.555, 2, 1.56, 1.56, 1.55],
        [1.555, 3, 1.555, 1.555, 1.555],
        [1.555, 4, 1.555, 1.555, 1.555],
        [123.9999, 2, 124, 124, 123.99],
        [1.35499999999, 2, 1.35, 1.36, 1.35],
        [-123.4567, 0, -123, -124, -123],
        [-123.4567, 1, -123.5, -123.5, -123.4],
        [-0.5, 0, -1, -1, 0],
        [0, 1, 0, 0, 0],
        [0, 2, 0, 0, 0],
        [1.23455e-30, 34, 1.2346e-30, 1.2346e-30, 1.2345e-30],
        [123.0001, 2, 123, 123.01, 123],
        [0.1 + 0.2, 1, 0.3, 0.3, 0.3],
        [1.2345e-30, 34, 1.2345e-30, 1.2345e-30, 1.2345e-30],
    ]
    it.each(cases)('Fixing(%p,%p)', (num, sf, off, up, down) => {
        expect(Fix(num, sf)).toBe(off)
        expect(FixUp(num, sf)).toBe(up)
        expect(FixDown(num, sf)).toBe(down)
    })
})

test('Ceil', () => {
    expect(Ceil(2)).toBe(2)
    expect(Ceil(-2)).toBe(-2)
    expect(Ceil(1.5)).toBe(2)
    expect(Ceil(1.1)).toBe(2)
    expect(Ceil(1.9)).toBe(2)
    expect(Ceil(-1.5)).toBe(-1)
    expect(Ceil(-1.1)).toBe(-1)
    expect(Ceil(-1.9)).toBe(-1)
    expect(Ceil(3, 5, 1)).toBe(6)
    expect(Ceil(6, 5, 1)).toBe(6)
    expect(Ceil(1, 5, 1)).toBe(1)
})

test('Floor', () => {
    expect(Floor(2)).toBe(2)
    expect(Floor(-2)).toBe(-2)
    expect(Floor(1.5)).toBe(1)
    expect(Floor(1.1)).toBe(1)
    expect(Floor(1.9)).toBe(1)
    expect(Floor(-1.5)).toBe(-2)
    expect(Floor(-1.1)).toBe(-2)
    expect(Floor(-1.9)).toBe(-2)
    expect(Floor(3, 5, 1)).toBe(1)
    expect(Floor(6, 5, 1)).toBe(6)
    expect(Floor(1, 5, 1)).toBe(1)
})

// test('SimpRatio', () => {
//     expect(SimpRatio(2, 4)).toEqual([1, 2]);
//     expect(SimpRatio(2, 4, 6)).toEqual([1, 2, 3]);
//     expect(SimpRatio(0, 4, 6)).toEqual([0, 2, 3]);
//     expect(SimpRatio(8, 12, 18)).toEqual([4, 6, 9]);
//     expect(SimpRatio(2, -4)).toEqual([1, -2]);
//     expect(SimpRatio(8, -12, 18)).toEqual([4, -6, 9]);
//     expect(SimpRatio(0, -2, 3)).toEqual([0, -2, 3]);
//     expect(SimpRatio(0, -2, 4)).toEqual([0, -1, 2]);
//     expect(SimpRatio(0, 4)).toEqual([0, 1]);
//     expect(SimpRatio(0, -4)).toEqual([0, -1]);
//     expect(SimpRatio(2, 4, 6.5)).toEqual([2, 4, 6.5]);
// });

test('Ratio', () => {
    expect(Ratio(2, 4)).toEqual([1, 2])
    expect(Ratio(2, 4, 6)).toEqual([1, 2, 3])
    expect(Ratio(0, 4, 6)).toEqual([0, 2, 3])
    expect(Ratio(8, 12, 18)).toEqual([4, 6, 9])
    expect(Ratio(2, -4)).toEqual([1, -2])
    expect(Ratio(8, -12, 18)).toEqual([4, -6, 9])
    expect(Ratio(0, -2, 3)).toEqual([0, -2, 3])
    expect(Ratio(0, -2, 4)).toEqual([0, -1, 2])
    expect(Ratio(0, 4)).toEqual([0, 1])
    expect(Ratio(0, -4)).toEqual([0, -1])
    expect(Ratio(2, 4, 6.5)).toEqual([4, 8, 13])
    expect(Ratio(1 / 3, 1 / 2, 1 / 4)).toEqual([4, 6, 3])
})

test('ScaleTo', () => {
    expect(ScaleTo([1, 2, 3], 60)).toEqual([10, 20, 30])
})

// test('Blur', () => {
//     expect(Blur(0.1 + 0.2)).toBe(0.3);
//     expect(Blur(0.81 - 1)).toBe(-0.19);
//     expect(Blur(1.1 ** 2)).toBe(1.21);
//     expect(Blur('abc')).toBe('abc');
//     expect(Blur(true)).toBe(true);
//     expect(Blur(false)).toBe(false);
//     expect(Blur([1.12])).toEqual([1.12]);
//     expect(Blur({ x: 1 })).toEqual({ x: 1 });
//     expect(Blur(NaN)).toBeNaN();
//     expect(Blur(undefined)).toBeUndefined();
//     expect(Blur(null)).toBeNull();
// });

// test('Blurs', () => {
//     expect(Blurs([0.1 + 0.2, 0.81 - 1])).toEqual([0.3, -0.19]);
//     expect(Blurs([1.1 ** 2, 'abc'])).toEqual([1.21, 'abc']);
// });

test('HCF', () => {
    expect(HCF(1, 2, 3)).toBe(1)
    expect(HCF(4, 6, 8)).toBe(2)
    expect(HCF(24, 36, -60)).toBe(12)
    expect(HCF(1, 1)).toBe(1)
    expect(HCF(30)).toBe(30)
})

test('LCM', () => {
    expect(LCM(1, 2, 3)).toBe(6)
    expect(LCM(4, 6, 8)).toBe(24)
    expect(LCM(24, 36, -60)).toBe(360)
    expect(LCM(1, 1)).toBe(1)
    expect(LCM(30)).toBe(30)
})

test('PrimeFactors', () => {
    expect(PrimeFactors(12)).toEqual([2, 2, 3])
    expect(PrimeFactors(1980)).toEqual([2, 2, 3, 3, 5, 11])
})

// test('FracSign', () => {
//     expect(FracSign(2, 3)).toEqual([2, 3]);
//     expect(FracSign(-2, 3)).toEqual([-2, 3]);
//     expect(FracSign(2, -3)).toEqual([-2, 3]);
//     expect(FracSign(-2, -3)).toEqual([2, 3]);
//     expect(FracSign(0, -2)).toEqual([0, 2]);
// });

// test('Frac', () => {
//     expect(Frac(6, 4)).toEqual([3, 2]);
//     expect(Frac(-4, 2)).toEqual([-2, 1]);
//     expect(Frac(18, -12)).toEqual([-3, 2]);
//     expect(Frac(-10, -20)).toEqual([1, 2]);
//     expect(Frac(0, 2)).toEqual([0, 1]);
//     expect(Frac(1.5, -2)).toEqual([-1.5, 2]);
//     expect(Frac(1, 1)).toEqual([1, 1]);
// });

test('ToFrac', () => {
    expect(ToFrac(0.5)).toEqual([1, 2])
    expect(ToFrac(-456 / 123)).toEqual([-152, 41])

    for (let i = 0; i <= 100; i++) {
        for (let j = 1; j <= 100; j++) {
            let I = i * RndU()
            let v = I / j
            let [p, q] = ToFrac(v)
            expect(I * q - p * j === 0).toBe(true)
        }
    }
})

test('Partition', () => {
    expect(Partition(5)).toEqual([
        [1, 1, 1, 1, 1],
        [1, 1, 1, 2],
        [1, 2, 2],
        [1, 1, 3],
        [2, 3],
        [1, 4],
        [5],
    ])
    expect(Partition(5, 3)).toEqual([
        [1, 2, 2],
        [1, 1, 3],
    ])
    expect(Partition(5, 3, true)).toEqual([
        [1, 2, 2],
        [1, 1, 3],
        [2, 3, 0],
        [1, 4, 0],
        [5, 0, 0],
    ])
    expect(Partition(10).length).toEqual(42)
    expect(Partition(10)).toSatisfyAll(
        $ => $.reduce((a: number, b: number) => a + b, 0) === 10
    )
})
