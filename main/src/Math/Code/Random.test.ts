import _ from 'lodash'
import { repeat } from '../Jest/JestExtend.js'
import { describe, expect, it, test } from 'vitest'

test('RndN', () => {
    expect(RndN(5, 10)).toBeOneOf([5, 6, 7, 8, 9, 10])
    expect(RndN(5, 10)).toBeInteger()
    expect(_.times(100, () => RndN(5, 10))).toIncludeAllMembers([
        5, 6, 7, 8, 9, 10,
    ])
})

test('RndNs', () => {
    expect(RndNs(5, 10, 3)).toAllBeOneOf([5, 6, 7, 8, 9, 10])
    expect(RndNs(5, 10, 3)).toAllBeInteger()
    expect(RndNs(5, 10, 3)).toHaveLength(3)
    expect(RndNs(5, 10, 3)).toBeDupless()
    expect(RndNs(5, 10, 6)).toIncludeSameMembers([5, 6, 7, 8, 9, 10])

    expect(RndNs(5, 10, 3, 'asc')).toAllBeOneOf([5, 6, 7, 8, 9, 10])
    expect(RndNs(5, 10, 3, 'asc')).toAllBeInteger()
    expect(RndNs(5, 10, 3, 'asc')).toHaveLength(3)
    expect(RndNs(5, 10, 3, 'asc')).toBeDupless()
    expect(RndNs(5, 10, 6, 'asc')).toIncludeSameMembers([5, 6, 7, 8, 9, 10])
    let [a, b] = RndNs(1, 10, 2, 'asc')
    expect(a < b).toBeTrue()
    let [x, y] = RndNs(1, 10, 2, 'desc')
    expect(y < x).toBeTrue()
})

test('RndR', () => {
    repeat(10, () => {
        expect(RndR(5, 10)).toBeBetween(5, 10)
        expect(RndR(5, 10)).not.toBeInteger()
        expect(() => RndR(5, 10)).toSpanRange(5, 10)

        expect(RndR(-5, 5)).toBeBetween(-5, 5)
        expect(RndR(-5, 5)).not.toBeInteger()
        expect(() => RndR(-5, 5)).toSpanRange(-5, 5)
    })
})

test('RndRs', () => {
    repeat(10, () => {
        expect(RndRs(5, 10, 3)).toAllBeBetween(5, 10)
        expect(RndRs(5, 10, 3)).not.toAllBeInteger()
        expect(RndRs(5, 10, 3)).toHaveLength(3)
        expect(RndRs(5, 10, 3)).toBeDupless()
        expect(RndRs(5, 10, 1000)).toSpanRange(5, 10)
    })
})

test('RndQ', () => {
    repeat(10, () => {
        expect(RndQ(8, [0, 6])).toBeBetween(0, 6)
        expect(RndQ(8, [0, 6])).toSatisfy(Number.isRational)
        expect(RndQ(8, [0, 6])).toSatisfy(Number.isDecimal)
        expect(() => RndQ(8, [0, 6])).toSpanLength(35)

        expect(RndQ(-8, [-6, 6])).toBeBetween(-6, 6)
        expect(RndQ(-8, [-6, 6])).toSatisfy(Number.isRational)
        expect(RndQ(-8, [-6, 6])).toSatisfy(Number.isDecimal)
        expect(() => RndQ(-8, [-6, 6])).toSpanLength(70)
    })
})

test('RndQs', () => {
    repeat(10, () => {
        expect(RndQs(8, [0, 6], 3)).toAllBeBetween(0, 6)
        expect(RndQs(8, [0, 6], 3)).toSatisfyAll(Number.isRational)
        expect(RndQs(8, [0, 6], 3)).toSatisfyAll(Number.isDecimal)
        expect(RndQs(8, [0, 6], 3)).toHaveLength(3)
        expect(RndQs(8, [0, 6], 3)).toBeDupless()
        expect(() => RndQs(8, [0, 6], 3)).toSpanLength(35, 1)
    })
})

test('RndU', () => {
    repeat(10, () => {
        expect(RndU()).toBeOneOf([1, -1])
        expect(() => RndU()).toSpanSame([-1, 1])
    })
})

test('RndT', () => {
    repeat(10, () => {
        expect(RndT()).toBeOneOf([true, false])
        expect(() => RndT()).toSpanSame([true, false])
    })
})

test('RndZ', () => {
    repeat(10, () => {
        expect(RndZ(5, 10)).toBeOneOf([
            5, 6, 7, 8, 9, 10, -5, -6, -7, -8, -9, -10,
        ])
        expect(RndZ(5, 10)).toBeInteger()
        expect(() => RndZ(5, 10)).toSpanSame([
            5, 6, 7, 8, 9, 10, -5, -6, -7, -8, -9, -10,
        ])
    })
})

test('RndZs', () => {
    repeat(10, () => {
        expect(RndZs(5, 10, 3)).toAllBeOneOf([
            5, 6, 7, 8, 9, 10, -5, -6, -7, -8, -9, -10,
        ])
        expect(RndZs(5, 10, 3)).toAllBeInteger()
        expect(RndZs(5, 10, 3)).toHaveLength(3)
        expect(RndZs(5, 10, 3)).toBeDupless()
        expect(() => RndZs(5, 10, 3)).toSpanSame(
            [5, 6, 7, 8, 9, 10, -5, -6, -7, -8, -9, -10],
            1
        )

        expect(RndZs(5, 10, 3, 'asc')).toAllBeOneOf([
            5, 6, 7, 8, 9, 10, -5, -6, -7, -8, -9, -10,
        ])
        expect(RndZs(5, 10, 3, 'asc')).toAllBeInteger()
        expect(RndZs(5, 10, 3, 'asc')).toHaveLength(3)
        expect(RndZs(5, 10, 3, 'asc')).toBeDupless()
        expect(() => RndZs(5, 10, 3, 'asc')).toSpanSame(
            [5, 6, 7, 8, 9, 10, -5, -6, -7, -8, -9, -10],
            1
        )

        let [a, b] = RndZs(1, 10, 2, 'asc')
        expect(a < b).toBeTrue()
        let [x, y] = RndZs(1, 10, 2, 'desc')
        expect(y < x).toBeTrue()
    })
})

test('RndP', () => {
    repeat(10, () => {
        expect(RndP(100)).toBeOneOf(cal.primes(100))
        expect(RndP(100)).toBeInteger()
        expect(() => RndP(100)).toSpanSame(cal.primes(100))
    })
})

test('RndOdd', () => {
    repeat(10, () => {
        expect(RndOdd(5, 10)).toBeOneOf([5, 7, 9])
        expect(RndOdd(5, 10)).toBeInteger()
        expect(RndOdd(5, 10)).toBeOdd()
        expect(() => RndOdd(5, 10)).toSpanSame([5, 7, 9])
    })
})

test('RndEven', () => {
    repeat(10, () => {
        expect(RndEven(5, 10)).toBeOneOf([6, 8, 10])
        expect(RndEven(5, 10)).toBeInteger()
        expect(RndEven(5, 10)).toBeEven()
        expect(() => RndEven(5, 10)).toSpanSame([6, 8, 10])
    })
})

test('RndComposite', () => {
    repeat(10, () => {
        expect(RndComposite([2, 3, 5], 2)).toBeOneOf([4, 6, 10, 9, 15, 25])
        expect(RndComposite([2, 3, 5], 2)).toBeInteger()
        expect(() => RndComposite([2, 3, 5], 2)).toSpanSame([
            4, 6, 10, 9, 15, 25,
        ])
    })
})

test('RndPoly', () => {
    repeat(10, () => {
        expect(RndPoly(3, 4, 5)[0]).toBeOneOf([1, 2, 3])
        expect(RndPoly(3, 4, 5)[1]).toBeOneOf([1, 2, 3, 4, -1, -2, -3, -4])
        expect(RndPoly(3, 4, 5)[2]).toBeOneOf([
            1, 2, 3, 4, 5, -1, -2, -3, -4, -5,
        ])
        expect(RndPoly(3, 4, 5)).toAllBeInteger()

        expect(() => RndPoly(3, 4, 5)[0]).toSpanSame([1, 2, 3])
        expect(() => RndPoly(3, 4, 5)[1]).toSpanSame([
            1, 2, 3, 4, -1, -2, -3, -4,
        ])
        expect(() => RndPoly(3, 4, 5)[2]).toSpanSame([
            1, 2, 3, 4, 5, -1, -2, -3, -4, -5,
        ])
    })
})

test('RndPyth', () => {
    repeat(10, () => {
        expect(RndPyth(50)).toSatisfy<number[]>(
            x => x[0] ** 2 + x[1] ** 2 === x[2] ** 2
        )
        expect(RndPyth(50)).toAllBeBetween(1, 50)
        expect(RndPyth(50)).toAllBeInteger()
        expect(RndPyth(50)).toBeDupless()
        expect(() => RndPyth(50)).toSpanLength(14)
    })
})

test('RndPoint', () => {
    repeat(10, () => {
        expect(RndPoint([1, 4], [-10, 14])[0]).toBeBetween(1, 4)
        expect(RndPoint([1, 4], [-10, 14])[0]).toBeInteger()
        expect(RndPoint([1, 4], [-10, 14])[1]).toBeBetween(-10, 14)
        expect(RndPoint([1, 4], [-10, 14])[1]).toBeInteger()
        expect(RndPoint([1, 4], [-10, 14])).not.toContain(0)
        expect(RndPoint([1, 4], [-10, 14])).toBeDupless()
        expect(RndPoint([1, 4], [-10, 14])).toHaveLength(2)
        expect(() => RndPoint([1, 4], [-10, 14])[0]).toSpanRange(1, 4)
        expect(() => RndPoint([1, 4], [-10, 14])[1]).toSpanRange(-10, 14)
    })
})

test('RndPoints', () => {
    repeat(10, () => {
        let pts = RndPoints([1, 4], [-10, 14], 3)
        let [A, B, C] = pts

        expect(Slope(A, B)).not.toBe(Slope(B, C))
        expect(pts).toHaveLength(3)
        expect([...A, ...B, ...C]).toAllBeInteger()
        expect([A[0], B[0], C[0]]).toAllBeBetween(1, 4)
        expect([A[1], B[1], C[1]]).toAllBeBetween(-10, 14)
        expect(() =>
            RndPoints([1, 4], [-10, 14], 3).map($ => $[0])
        ).toSpanRange(1, 4, 1)
        expect(() =>
            RndPoints([1, 4], [-10, 14], 3).map($ => $[1])
        ).toSpanRange(-10, 14, 1)
    })
})

test('RndAngles', () => {
    repeat(10, () => {
        let angles = RndAngles(3, 50)
        let [A, B, C] = angles
        let d1 = B - A
        let d2 = C - B
        let d3 = A - C + 360

        expect(angles).toAllBeBetween(0, 360)
        expect(angles).toHaveLength(3)
        expect(angles).toBeDupless()
        expect(angles).toAllBeInteger()
        expect([d1, d2, d3]).toAllBeBetween(50, 360)
    })
})

test('RndOnCircle', () => {
    repeat(10, () => {
        let pts = RndOnCircle(3, 50)
        let angles = pts.map($ => RectToPol($)[1]).map($ => $.round(5))
        let [A, B, C] = angles.sort((a, b) => a - b)
        let d1 = B - A
        let d2 = C - B
        let d3 = A - C + 360

        expect(angles).toAllBeBetween(0, 360)
        expect(angles).toHaveLength(3)
        expect(angles).toBeDupless()
        expect(angles).toAllBeInteger()
        expect([d1, d2, d3]).toAllBeBetween(50, 360)
    })
})

test('RndConvexPolygon', () => {
    repeat(10, () => {
        let pts = RndConvexPolygon(3, [0, 0], 10, 50)
        let [A, B, C] = pts
        let angles = pts.map($ => Dir([0, 0], $))
        let [a, b, c] = angles.sort((a, b) => a - b)
        let d1 = b - a
        let d2 = c - b
        let d3 = a - c + 360

        expect(angles).toAllBeBetween(0, 360)
        expect(angles).toHaveLength(3)
        expect(angles).toBeDupless()
        expect(pts.map($ => Distance([0, 0], $))).toAllBeBetween(8, 12)
        expect([...A, ...B, ...C]).toAllBeInteger()
        expect(A).toHaveLength(2)
        expect([d1, d2, d3]).toAllBeBetween(40, 360)
    })
})

test('RndData', () => {
    repeat(10, () => {
        let data = RndData(10, 15, 5)
        expect(data).toAllBeBetween(10, 15)
        expect(data).toAllBeInteger()
        expect(data).toHaveLength(5)
        expect(data).toSatisfy<number[]>($ => Mode(...$).length === 1)
    })
})

test('RndTriangle', () => {
    repeat(10, () => {
        let tri = RndTriangle([0, 5], [0, 5], {
            minAngle: 30,
            maxAngle: 70,
            minLength: 2,
        })
        let [A, B, C] = tri
        expect(tri).toHaveLength(3)
        expect(Distance(A, B)).toBeGreaterThanOrEqual(2)
        expect(Distance(B, C)).toBeGreaterThanOrEqual(2)
        expect(Distance(C, A)).toBeGreaterThanOrEqual(2)
        expect(Angle(A, B, C)).toBeGreaterThanOrEqual(30)
        expect(Angle(B, C, A)).toBeGreaterThanOrEqual(30)
        expect(Angle(C, A, B)).toBeGreaterThanOrEqual(30)
        expect(Angle(A, B, C)).toBeLessThanOrEqual(70)
        expect(Angle(B, C, A)).toBeLessThanOrEqual(70)
        expect(Angle(C, A, B)).toBeLessThanOrEqual(70)
    })
})

test('RndTrigValue', () => {
    let trig = (funcName: string, angle: number) => {
        if (funcName === 'sin') return sin(angle)
        if (funcName === 'cos') return cos(angle)
        if (funcName === 'tan') return tan(angle)
        throw 'never'
    }

    repeat(10, () => {
        let [t, v] = RndTrigValue('sin', 60)
        expect(t).toBeOneOf(['sin', 'cos', 'tan'])
        expect(trig(t, v as number)).toBeCloseTo(sin(60))
        expect(RndTrigValue('sin', 60)).toHaveLength(2)
    })

    repeat(10, () => {
        let [t, v] = RndTrigValue('cos', 60)
        expect(t).toBeOneOf(['sin', 'cos', 'tan'])
        expect(trig(t, v as number)).toBeCloseTo(cos(60))
        expect(RndTrigValue('cos', 60)).toHaveLength(2)
    })

    repeat(10, () => {
        let [t, v] = RndTrigValue('tan', 60)
        expect(t).toBeOneOf(['sin', 'cos', 'tan'])
        expect(trig(t, v as number)).toBeCloseTo(tan(60))
        expect(RndTrigValue('tan', 60)).toHaveLength(2)
    })
})

test('RndTrigEqv', () => {
    let trig = (funcName: string, angle: number) => {
        if (funcName === 'sin') return sin(angle)
        if (funcName === 'cos') return cos(angle)
        if (funcName === 'tan') return tan(angle)
        throw 'never'
    }

    repeat(10, () => {
        let [t, k, s, v] = RndTrigEqv('sin', 'x')
        expect(t).toBeOneOf(['sin', 'cos', 'tan'])
        expect(trig(t, k + s)).toBeCloseTo(sin(1))
        expect(RndTrigEqv('sin', 'x')).toHaveLength(4)
    })

    repeat(10, () => {
        let [t, k, s, v] = RndTrigEqv('cos', 'x')
        expect(t).toBeOneOf(['sin', 'cos', 'tan'])
        expect(trig(t, k + s)).toBeCloseTo(cos(1))
        expect(RndTrigEqv('cos', 'x')).toHaveLength(4)
    })

    repeat(10, () => {
        let [t, k, s, v] = RndTrigEqv('1/tan', 'x')
        expect(t).toBeOneOf(['sin', 'cos', 'tan'])
        expect(trig(t, k + s)).toBeCloseTo(tan(89))
        expect(RndTrigEqv('1/tan', 'x')).toHaveLength(4)
    })
})

test('RndPointPolar', () => {
    repeat(10, () => {
        function getR2() {
            let pt = RndPointPolar()
            let [r, q] = RectToPol(pt)
            return (r ** 2).blur()
        }

        function getq() {
            let pt = RndPointPolar()
            let [r, q] = RectToPol(pt)
            return q.blur()
        }

        expect(getR2).toSpanSame([4, 16, 36, 8, 32, 72, 12, 48, 108])
        expect(getq).toSpanSame([
            30, 45, 60, 120, 135, 150, 210, 225, 240, 300, 315, 330,
        ])
    })
})

test('RndRatio', () => {
    repeat(10, () => {
        let nums = RndRatio(2, 9, 3)
        expect(nums).toSatisfy<number[]>($ => HCF(...$) === 1)
        expect(nums).toHaveLength(3)
        expect(nums).toBeDupless()
        expect(nums).toAllBeInteger()
    })
})

test('RndPartition', () => {
    repeat(10, () => {
        let nums = RndPartition(10, 3)
        expect(nums).toSatisfy<number[]>($ => Sum(...$) === 10)
        expect(nums).toHaveLength(3)
        expect(nums).toAllBeInteger()
    })
})
