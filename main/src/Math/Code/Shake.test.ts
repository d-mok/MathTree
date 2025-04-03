import _ from 'lodash'
import * as math from 'mathjs'
import { describe, expect, it, test } from 'vitest'

test('ShakeN', () => {
    function run(anchor: number, min: number, max: number) {
        let shaked = ShakeN(anchor)
        expect(shaked).toBeBetween(min, max)
        expect(shaked).toBeInteger()
    }

    run(5, 2, 8)
    run(-5, -8, -2)
    run(2, 1, 5)
    run(1, 2, 4)
    run(-2, -5, -1)
    run(0, 1, 3)
    run(-1, -4, -2)
    run(100, 101, 110)
    run(456, 411, 501)
})

test('ShakeR', () => {
    function run(anchor: number, min: number, max: number) {
        let shaked = ShakeR(anchor)
        expect(shaked).toBeBetween(min, max)
    }

    run(3.5, 1.8, 5.2)
    run(1.5, 1, 2.3)
    run(-1.5, -2.3, -1)
    run(123.45, 100, 185.17)
    run(900.1, 450.1, 999.9)
    run(4.567e-20, 2.284e-20, 6.85e-20)
    run(-4.567e-20, -6.85e-20, -2.284e-20)
})

test('ShakeQ', () => {
    function run(anchor: number, isPositive: boolean, isProb: boolean) {
        let shaked = ShakeQ(anchor)
        isPositive
            ? expect(shaked).toBePositive()
            : expect(shaked).toBeNegative()
        expect(shaked).toSatisfy(IsRational)
        if (isProb) expect(shaked).toBeBetween(0, 1)
    }

    run(5 / 6, true, true)
    run(6 / -5, false, false)
})

test('ShakeG', () => {
    function run(anchor: number, base: number) {
        let shaked = ShakeG(anchor, base)
        expect(log(base, shaked / anchor)).toBeInteger()
    }

    run(24, 2)
    run(13.123, 0.3)
})

test('ShakeIneq', () => {
    expect(['\\ge', '\\le']).toContain(ShakeIneq('\\ge'))
    expect(['\\gt', '\\lt']).toContain(ShakeIneq('\\lt'))
})

test('ShakePoint', () => {
    function run(anchor: Point2D, isXPositive: boolean, isYPositive: boolean) {
        let [x, y] = ShakePoint(anchor)
        expect(x).toBeInteger()
        expect(y).toBeInteger()
        isXPositive ? expect(x).toBePositive() : expect(x).toBeNegative()
        isYPositive ? expect(y).toBePositive() : expect(y).toBeNegative()
    }

    run([5, 6], true, true)
    run([6, -5], true, false)
    run([-3, 12], false, true)
    run([-3, -12], false, false)
})

test('ShakeTrigValue', () => {
    function run(anchor: TrigValue) {
        let shaked = ShakeTrigValue(anchor)
        expect(shaked).toSatisfy($ => ['sin', 'cos', 'tan'].includes($[0]))
    }

    run(['sin', 'x'])
})

test('ShakeRatio', () => {
    function run(anchor: number[]) {
        let shaked = ShakeRatio(anchor)
        expect(HCF(...shaked)).toBe(1)
    }

    run([4, 5, 6])
})

test('ShakeBase', () => {
    function run(anchor: string) {
        let shaked = ShakeBase(anchor)
        expect(schema.is(schema.base, shaked)).toBe(true)
    }

    run('{A}{B}{0}{C}{D}_{16}')
})

test('ShakePointPolar', () => {
    function run(anchor: PolarPoint) {
        let [r, q] = RectToPol(ShakePointPolar(anchor))
        expect((r ** 2).blur()).toBeInteger()
        expect([
            30, 45, 60, 120, 135, 150, 210, 225, 240, 300, 315, 330,
        ]).toContain(q.blur())
    }

    run([Math.sqrt(3), 3])
})

test('ShakeConstraint', () => {
    function run(anchor: Constraint) {
        let shaked = ShakeConstraint(anchor)
        expect(shaked[0]).toBe(anchor[0])
        expect(shaked[1]).toBe(anchor[1])
        expect(shaked[3]).toBe(anchor[3])
    }

    run([1, 2, '>', 3])
    run([1, 2, '>=', 3])
})

test('ShakeConstraints', () => {
    function run(anchor: Constraint[]) {
        let shaked = ShakeConstraints(anchor)
        expect(shaked[0][0]).toBe(anchor[0][0])
        expect(shaked[0][1]).toBe(anchor[0][1])
        expect(shaked[0][3]).toBe(anchor[0][3])
    }

    run([
        [1, 2, '>', 3],
        [4, 5, '>', 6],
    ])
    run([
        [1, 2, '>=', 3],
        [4, 5, '>=', 6],
    ])
})

test('ShakeQuantity', () => {
    function run(anchor: quantity) {
        let shaked = ShakeQuantity(anchor)
    }

    run({ val: 1, unit: 'm' })
})

test('ShakeCompoundInequality', () => {
    function run(anchor: CompoundInequality) {
        let shaked = ShakeCompoundInequality(anchor)
    }

    run(['AND', '>', 1, '<', 2, 'x'])
})
