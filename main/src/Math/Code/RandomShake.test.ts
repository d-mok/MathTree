import _ from 'lodash'
import { repeat } from '../Jest/JestExtend.js'
import { describe, expect, it, test } from 'vitest'

test('RndShake', () => {
    expect(RndShake('\\ge')).toSatisfyAll(schema.be(schema.ineq))
    expect(RndShake(5)).toSatisfyAll(Number.isInteger)
    expect(RndShake(0.5)).toSatisfyAll($ => $ >= 0 && $ <= 1)
    expect(RndShake(1.5)).toSatisfyAll($ => $ > 0)
})

test('RndShakeN', () => {
    function run(
        anchor: number,
        min: number,
        max: number,
        distinct = max - min
    ) {
        let shaked = RndShakeN(anchor)
        expect(shaked).toAllBeBetween(min, max)
        expect(shaked).toAllBeInteger()
        expect(shaked).toBeDupless()
        expect(shaked).toHaveLength(3)
        expect(() => RndShakeN(anchor)).toSpanLength(distinct, 1)
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

    repeat(100, () => {
        RndShakeN(RndN(-1000, 1000))
    })
})

test('RndShakeR', () => {
    function run(anchor: number, min: number, max: number) {
        let shaked = RndShakeR(anchor)
        expect(shaked).toAllBeBetween(min, max)
        expect(shaked).toBeDupless()
        expect(shaked).toHaveLength(3)
        // expect(() => RndShakeR(anchor)).toSpanRange(min, max, 1)
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

    repeat(100, () => {
        RndShakeR(RndR(-1000, 1000))
        RndShakeR(RndR(-1, 1))
    })
})

test('RndShakeQ', () => {
    function run(anchor: number, isPositive: boolean, isProb: boolean) {
        let shaked = RndShakeQ(anchor)
        if (isPositive) {
            expect(shaked).toSatisfyAll($ => $ > 0)
        } else {
            expect(shaked).toSatisfyAll($ => $ < 0)
        }
        expect(shaked).toHaveLength(3)
        expect(shaked).toSatisfyAll(Number.isRational)
        if (isProb) expect(shaked).toSatisfyAll($ => $ >= 0 && $ <= 1)
    }

    repeat(100, () => {
        run(5 / 6, true, true)
        run(6 / -5, false, false)
    })
})

test('RndShakeG', () => {
    function run(anchor: number, base: number) {
        let shaked = RndShakeG(anchor, base)
        expect(shaked).toHaveLength(3)
        expect(shaked).toSatisfyAll($ => IsInteger(log(base, $ / anchor)))
    }

    repeat(100, () => {
        run(24, 2)
        run(13.123, 0.3)
    })
})

test('RndShakeIneq', () => {
    repeat(10, () => {
        let shaked = RndShakeIneq('\\ge')
        expect(shaked).toSpanSame(['\\ge', '\\le'])
        expect(shaked).toHaveLength(3)
        expect(shaked.filter($ => $ === '\\ge')).toHaveLength(1)
        expect(shaked.filter($ => $ === '\\le')).toHaveLength(2)
    })

    repeat(10, () => {
        let shaked = RndShakeIneq('\\lt')
        expect(shaked).toSpanSame(['\\gt', '\\lt'])
        expect(shaked).toHaveLength(3)
        expect(shaked.filter($ => $ === '\\lt')).toHaveLength(1)
        expect(shaked.filter($ => $ === '\\gt')).toHaveLength(2)
    })
})

test('RndShakePoint', () => {
    function run(anchor: Point2D, isXPositive: boolean, isYPositive: boolean) {
        let shaked = RndShakePoint(anchor)
        let xs = shaked.map(([x, y]) => x)
        let ys = shaked.map(([x, y]) => y)

        expect(xs).toAllBeInteger()
        expect(ys).toAllBeInteger()

        if (isXPositive) {
            expect(xs).toSatisfyAll(x => x > 0)
        } else {
            expect(xs).toSatisfyAll(x => x < 0)
        }

        if (isYPositive) {
            expect(ys).toSatisfyAll(x => x > 0)
        } else {
            expect(ys).toSatisfyAll(x => x < 0)
        }

        expect(shaked).toHaveLength(3)
    }

    repeat(10, () => {
        run([5, 6], true, true)
        run([6, -5], true, false)
        run([-3, 12], false, true)
        run([-3, -12], false, false)
    })
})

test('RndShakeCombo', () => {
    function run(anchor: [boolean, boolean, boolean]) {
        let [a, b, c] = anchor
        let shaked = RndShakeCombo(anchor)
        expect(shaked).toHaveLength(3)
        expect(shaked).toHaveLength(3)
        expect([a, ...shaked.map($ => $[0])]).toIncludeAllMembers([true, false])
        expect([b, ...shaked.map($ => $[1])]).toIncludeAllMembers([true, false])
        expect([c, ...shaked.map($ => $[2])]).toIncludeAllMembers([true, false])
    }

    repeat(10, () => {
        run([true, true, true])
    })
})

test('RndShakeTrig', () => {
    function run(anchor: TrigFunc) {
        let shaked = RndShakeTrig(anchor)
        expect(shaked).toHaveLength(3)
    }

    repeat(10, () => {
        run('sin')
    })
})

test('RndShakeTrigValue', () => {
    function run(anchor: TrigValue) {
        let shaked = RndShakeTrigValue(anchor)
        expect(shaked).toHaveLength(3)
    }

    repeat(10, () => {
        run(['sin', 'x'])
    })
})

test('RndShakeRatio', () => {
    function run(anchor: number[]) {
        let shaked = RndShakeRatio(anchor)
        expect(shaked).toHaveLength(3)
    }

    repeat(10, () => {
        run([4, 5, 6])
    })
})

test('RndShakeBase', () => {
    function run(anchor: string) {
        let shaked = RndShakeBase(anchor)
        expect(shaked).toSatisfyAll(schema.be(schema.base))
        expect(shaked).toHaveLength(3)
    }

    repeat(10, () => {
        run('{A}{B}{0}{C}{D}_{16}')
    })
})

test('RndShakePointPolar', () => {
    function run(anchor: PolarPoint) {
        let shaked = RndShakePointPolar(anchor).map($ => RectToPol($))
        expect(shaked).toSatisfyAll(([r, q]) =>
            Number.isInteger((r ** 2).blur())
        )
        expect(shaked).toSatisfyAll(([r, q]) =>
            [30, 45, 60, 120, 135, 150, 210, 225, 240, 300, 315, 330].includes(
                q.blur()
            )
        )
        expect(shaked).toHaveLength(3)
    }

    repeat(10, () => {
        run([Math.sqrt(3), 3])
    })
})

test('RndShakeConstraint', () => {
    function run(anchor: Constraint) {
        let shaked = RndShakeConstraint(anchor)
        expect(shaked[0][0]).toBe(anchor[0])
        expect(shaked[0][1]).toBe(anchor[1])
        expect(shaked[0][3]).toBe(anchor[3])
    }

    repeat(10, () => {
        run([1, 2, '>', 3])
        run([1, 2, '>=', 3])
    })
})

test('RndShakeConstraints', () => {
    function run(anchor: Constraint[]) {
        let shaked = RndShakeConstraints(anchor)
        expect(shaked[0][0][0]).toBe(anchor[0][0])
        expect(shaked[0][0][1]).toBe(anchor[0][1])
        expect(shaked[0][0][3]).toBe(anchor[0][3])
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

test('RndShakeQuantity', () => {
    function run(anchor: quantity) {
        let shaked = RndShakeQuantity(anchor)
        expect(typeof shaked[0].val).toBe('number')
        expect(typeof shaked[0].unit).toBe('string')
    }

    repeat(10, () => {
        run({ val: 1, unit: 'm' })
    })
})

test('RndShakeCompoundInequality', () => {
    function run(anchor: CompoundInequality) {
        let shaked = RndShakeCompoundInequality(anchor)
        expect(shaked).toSatisfyAll($ => ['AND', 'OR'].includes($[0]))
    }

    repeat(10, () => {
        run(['AND', '>', 1, '<', 2, 'x'])
    })
})
