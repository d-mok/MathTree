import * as v from 'valibot'

export const num = v.pipe(v.number(), v.custom(Number.isFinite))

export const whole = v.pipe(num, v.integer())

export const int = v.pipe(
    num,
    v.check($ => Number.isInteger(cal.blur($)))
)

export const dec = v.pipe(
    num,
    v.check($ => !v.is(int, $))
)

export const terminating = v.pipe(
    num,
    v.check($ => cal.sigfig($) < 10)
)

export const rational = v.pipe(
    num,
    v.check($ => cal.isRational($))
)

export const irrational = v.pipe(
    num,
    v.check($ => !cal.isRational($))
)

export const odd = v.pipe(
    int,
    v.check($ => Math.abs(cal.blur($)) % 2 === 1)
)

export const even = v.pipe(
    int,
    v.check($ => Math.abs(cal.blur($)) % 2 === 0)
)

export const prob = v.pipe(num, v.minValue(0), v.maxValue(1))

export const sq = v.pipe(
    int,
    v.check($ => v.is(int, Math.sqrt($)))
)

export const positive = v.pipe(num, v.gtValue(0))

export const positiveInt = v.pipe(int, v.gtValue(0))

export const nonNegative = v.pipe(num, v.minValue(0))

export const nonNegativeInt = v.pipe(int, v.minValue(0))

export const negative = v.pipe(num, v.ltValue(0))

export const negativeInt = v.pipe(int, v.ltValue(0))

export const nonPositive = v.pipe(num, v.maxValue(0))

export const nonPositiveInt = v.pipe(int, v.maxValue(0))

export const zero = v.pipe(
    num,
    v.check($ => Math.abs($) < 1e-14)
)

export const nonZero = v.pipe(
    num,
    v.check($ => !v.is(zero, $))
)

export const nonZeroInt = v.pipe(
    int,
    v.check($ => !v.is(zero, $))
)

export const between = (min: number, max: number) =>
    v.pipe(num, v.minValue(min), v.maxValue(max))

export const absBetween = (min: number, max: number) =>
    v.pipe(
        num,
        v.check($ => Math.abs($) >= min && Math.abs($) <= max)
    )

// JS native type

export const str = v.string()

export const bool = v.boolean()

export const emptyObject = v.custom<{}>(
    $ =>
        v.is(v.strictObject({}), $) &&
        !!$ &&
        $.constructor === Object &&
        Object.keys($).length === 0
)

// trivial

export const pass = v.custom($ => true)

export const fail = v.custom($ => false)

// // relation

export const distinct = v.pipe(
    v.array(v.unknown()),
    v.check($ => $.isUniqEqual())
)

// special text

export const alphabet = v.pipe(
    v.string(),
    v.check($ => $.length === 1 && $.toLowerCase() !== $.toUpperCase())
)

export const ineq = v.union([
    v.literal('>'),
    v.literal('<'),
    v.literal('>='),
    v.literal('<='),
    v.literal('\\gt'),
    v.literal('\\lt'),
    v.literal('\\ge'),
    v.literal('\\le'),
    v.strictTuple([v.boolean(), v.boolean()]),
])

export const dfrac = v.pipe(
    v.string(),
    v.check($ => {
        const f = String.raw`-?\\dfrac{(-?\d+\.?\d*)}{(-?\d+\.?\d*)}`
        return !!$.match(new RegExp(f, 'g'))
    })
)

export const constraint = v.strictTuple([num, num, ineq, num])

export const constraints = v.array(constraint)

export const field = v.strictTuple([num, num, num])

export const quadrantCode = v.union([
    v.literal(1),
    v.literal(2),
    v.literal(3),
    v.literal(4),
])

export const quadrantName = v.union([
    v.literal('I'),
    v.literal('II'),
    v.literal('III'),
    v.literal('IV'),
])

export const quadrant = v.union([quadrantCode, quadrantName])

export const trig = v.union([
    v.literal('sin'),
    v.literal('cos'),
    v.literal('tan'),
])

export const roman = v.union([
    v.literal('I'),
    v.literal('II'),
    v.literal('III'),
    v.literal('IV'),
    v.literal('V'),
    v.literal('VI'),
    v.literal('VII'),
    v.literal('VIII'),
    v.literal('IX'),
    v.literal('X'),
])

export const base = v.pipe(
    v.string(),
    v.check($ => $.match(/[\{\}0-9A-Z]+\_\{[0-9]+\}/g) !== null)
)

// Math Types

export const couple = v.strictTuple([num, num])

export const triple = v.strictTuple([num, num, num])

export const combo = v.strictTuple([bool, bool, bool])

export const ntuple = v.array(num)

export const interval = v.pipe(
    couple,
    v.check($ => $[0] <= $[1])
)

export const point2D = couple

export const point2Ds = v.array(point2D)

export const point3D = triple

export const point3Ds = v.array(point3D)

export const polar = v.pipe(
    couple,
    v.check($ => $[0] > 0)
)

export const fraction = couple

export const properFraction = v.pipe(
    fraction,
    v.check($ => $[1] !== 0)
)

export const vector = couple

export const vector3D = triple

export const triangleSides = v.pipe(
    v.strictTuple([positive, positive, positive]),
    v.check(([a, b, c]) => a + b > c && b + c > a && c + a > b)
)

export const monomial = v.object({ coeff: num })

export const polynomial = v.array(monomial)

export const compoundInequality = v.strictTuple([
    v.union([v.literal('AND'), v.literal('OR')]),
    ineq,
    num,
    ineq,
    num,
    str,
])

export const trigValue = v.strictTuple([trig, v.union([num, str])])

export const trigExp = v.strictTuple([trig, num, num, str])

export const quantity = v.object({ val: num, unit: str })

// testing

function xxx(_: unknown) {
    return v.is(compoundInequality, _)
}
