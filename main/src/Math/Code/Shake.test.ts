import { repeat } from '../Jest/JestExtend'

test('shakeN', () => {
    function run(
        anchor: number,
        min: number,
        max: number,
        distinct = max - min
    ) {
        let shaked = shakeN(anchor)
        expect(shaked).toBeBetween(min, max)
        expect(shaked).toBeInteger()
        expect(() => shakeN(anchor)).toSpanLength(distinct)
    }

    repeat(100, () => {
        run(5, 2, 8)
        run(-5, -8, -2)
        run(2, 1, 5)
        run(1, 2, 4, 3)
        run(-2, -5, -1)
        run(0, 1, 3, 3)
        run(-1, -4, -2, 3)
        run(100, 101, 110, 10)
        run(456, 411, 501)
    })
})

test('shakeR', () => {
    function run(anchor: number, min: number, max: number) {
        let shaked = shakeR(anchor)
        expect(shaked).toBeBetween(min, max)
        expect(() => shakeR(anchor)).toSpanRange(min, max)
    }

    repeat(100, () => {
        run(3.5, 1.8, 5.2)
        run(1.5, 1, 2.3)
        run(-1.5, -2.3, -1)
        run(123.45, 100, 185.17)
        run(900.1, 450.1, 999.9)
        run(4.567e-20, 2.284e-20, 6.85e-20)
        run(-4.567e-20, -6.85e-20, -2.284e-20)
    })
})

test('shakeQ', () => {
    function run(anchor: number, isPositive: boolean, isProb: boolean) {
        let shaked = shakeQ(anchor)
        if (isPositive) {
            expect(shaked).toSatisfy($ => $ > 0)
        } else {
            expect(shaked).toSatisfy($ => $ < 0)
        }
        expect(shaked).toSatisfy(owl.rational)
        if (isProb) expect(shaked).toSatisfy($ => $ >= 0 && $ <= 1)
    }

    repeat(100, () => {
        run(5 / 6, true, true)
        run(6 / -5, false, false)
    })
})

test('shakeG', () => {
    function run(anchor: number, base: number) {
        let shaked = shakeG(anchor, base)
        expect(shaked).toSatisfy($ => IsInteger(log(base, $ / anchor)))
    }

    repeat(100, () => {
        run(24, 2)
        run(13.123, 0.3)
    })
})

test('shakeIneq', () => {
    repeat(10, () => {
        let shaked = shakeIneq('\\ge')
        expect(['\\ge', '\\le']).toContain(shaked)
    })

    repeat(10, () => {
        let shaked = shakeIneq('\\lt')
        expect(['\\gt', '\\lt']).toContain(shaked)
    })
})

test('shakePoint', () => {
    function run(anchor: Point2D, isXPositive: boolean, isYPositive: boolean) {
        let shaked = shakePoint(anchor)

        expect(shaked).toAllBeInteger()

        if (isXPositive) {
            expect(shaked[0]).toSatisfy(x => x > 0)
        } else {
            expect(shaked[0]).toSatisfy(x => x < 0)
        }

        if (isYPositive) {
            expect(shaked[1]).toSatisfy(x => x > 0)
        } else {
            expect(shaked[1]).toSatisfy(x => x < 0)
        }
    }

    repeat(10, () => {
        run([5, 6], true, true)
        run([6, -5], true, false)
        run([-3, 12], false, true)
        run([-3, -12], false, false)
    })
})

test('shakeTrigValue', () => {
    function run(anchor: TrigValue) {
        let shaked = shakeTrigValue(anchor)
        expect(shaked).toSatisfy(owl.trigValue)
    }

    repeat(10, () => {
        run(['sin', 'x'])
    })
})

test('shakeRatio', () => {
    function run(anchor: number[]) {
        let shaked = shakeRatio(anchor)
        expect(shaked).toSatisfy(owl.ntuple)
    }

    repeat(10, () => {
        run([4, 5, 6])
    })
})

test('shakeBase', () => {
    function run(anchor: string) {
        let shaked = shakeBase(anchor)
        expect(shaked).toSatisfy(owl.base)
    }

    repeat(10, () => {
        run('{A}{B}{0}{C}{D}_{16}')
    })
})

test('shakePointPolar', () => {
    function run(anchor: PolarPoint) {
        let shaked = RectToPol(shakePointPolar(anchor))
        expect(shaked).toSatisfy(owl.point2D)
        expect(shaked).toSatisfy(([r, q]) => Number.isInteger(cal.blur(r ** 2)))
        expect(shaked).toSatisfy(([r, q]) =>
            [30, 45, 60, 120, 135, 150, 210, 225, 240, 300, 315, 330].includes(
                cal.blur(q)
            )
        )
    }

    repeat(10, () => {
        run([Math.sqrt(3), 3])
    })
})

test('shakeConstraint', () => {
    function run(anchor: Constraint) {
        let shaked = shakeConstraint(anchor)
        expect(shaked).toSatisfy(owl.constraint)
        expect(shaked[0]).toBe(anchor[0])
        expect(shaked[1]).toBe(anchor[1])
        expect(shaked[3]).toBe(anchor[3])
    }

    repeat(10, () => {
        run([1, 2, '>', 3])
        run([1, 2, '>=', 3])
    })
})

test('shakeConstraints', () => {
    function run(anchor: Constraint[]) {
        let shaked = shakeConstraints(anchor)
        expect(shaked).toSatisfy(owl.constraints)
        expect(shaked[0][0]).toBe(anchor[0][0])
        expect(shaked[0][1]).toBe(anchor[0][1])
        expect(shaked[0][3]).toBe(anchor[0][3])
    }

    repeat(10, () => {
        run([
            [1, 2, '>', 3],
            [4, 5, '>', 6],
        ])
        run([
            [1, 2, '>=', 3],
            [4, 5, '>=', 6],
        ])
    })
})

test('shakeQuantity', () => {
    function run(anchor: quantity) {
        let shaked = shakeQuantity(anchor)
        expect(shaked).toSatisfy(owl.quantity)
    }

    repeat(10, () => {
        run({ val: 1, unit: 'm' })
    })
})

test('shakeCompoundInequality', () => {
    function run(anchor: CompoundInequality) {
        let shaked = shakeCompoundInequality(anchor)
        expect(shaked).toSatisfy(owl.compoundInequality)
    }

    repeat(10, () => {
        run(['AND', '>', 1, '<', 2, 'x'])
    })
})
