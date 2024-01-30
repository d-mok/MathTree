import _ from 'lodash'
import { and } from './owl/and.js'
import { array } from './owl/array.js'
import { anyOf } from './owl/anyOf.js'
import { custom } from './owl/custom.js'
import { object } from './owl/object.js'
import { or } from './owl/or.js'
import { tuple } from './owl/tuple.js'
export { and } from './owl/and.js'
export { array } from './owl/array.js'
export { anyOf } from './owl/anyOf.js'
export { custom } from './owl/custom.js'
export { object } from './owl/object.js'
export { or } from './owl/or.js'
export { tuple } from './owl/tuple.js'

type GuardedType<T extends (_: unknown) => boolean> = T extends (
    _: unknown
) => _ is infer U
    ? U
    : never

export const num = custom<number>(Number.isFinite)

export const whole = custom<number>(Number.isInteger)

export const int = custom<number>(
    and(
        num,
        custom(($: any) => Number.isInteger(cal.blur($)))
    )
)

export const dec = custom<number>($ => num($) && !int($))

export const terminating = custom<number>($ => num($) && cal.sigfig($) < 10)

export const rational = custom<number>($ => num($) && cal.isRational($))

export const irrational = custom<number>($ => num($) && !cal.isRational($))

export const odd = custom<number>(
    $ => int($) && Math.abs(cal.blur($)) % 2 === 1
)

export const even = custom<number>(
    $ => int($) && Math.abs(cal.blur($)) % 2 === 0
)

export const prob = custom<number>($ => num($) && $ >= 0 && $ <= 1)

export const sq = custom<number>($ => int($) && int(Math.sqrt($)))

export const positive = custom<number>($ => num($) && $ > 0)

export const positiveInt = custom<number>($ => int($) && $ > 0)

export const nonNegative = custom<number>($ => num($) && $ >= 0)

export const nonNegativeInt = custom<number>($ => int($) && $ >= 0)

export const negative = custom<number>($ => num($) && $ < 0)

export const negativeInt = custom<number>($ => int($) && $ < 0)

export const nonPositive = custom<number>($ => num($) && $ <= 0)

export const nonPositiveInt = custom<number>($ => int($) && $ <= 0)

export const zero = custom<number>($ => num($) && Math.abs($) < 1e-14)

export const nonZero = custom<number>($ => num($) && !zero($))

export const nonZeroInt = custom<number>($ => int($) && !zero($))

export const between = (min: number, max: number) =>
    custom<number>(
        $ => num($) && $ >= min && $ <= max,
        `between(${min},${max})`
    )

export const absBetween = (min: number, max: number) =>
    custom<number>(
        $ => num($) && Math.abs($) >= min && Math.abs($) <= max,
        `absBetween(${min},${max})`
    )

// JS native type

export const str = custom<string>($ => typeof $ === 'string')

export const bool = custom<boolean>($ => typeof $ === 'boolean')

export const emptyObject = custom<{}>(
    $ =>
        object()($) &&
        !!$ &&
        $.constructor === Object &&
        Object.keys($).length === 0
)

// trivial

export const pass = ($: unknown) => true

export const fail = ($: unknown) => false

// // relation

export const distinct = ($: unknown[]) => $.isUniqEqual()

// special text

export const alphabet = custom<string>(
    $ => str($) && $.length === 1 && $.toLowerCase() !== $.toUpperCase()
)

export const ineq = custom<Ineq>(
    or(
        anyOf('>', '<', '>=', '<=', '\\gt', '\\lt', '\\ge', '\\le'),
        tuple(bool, bool)
    )
)

export const dfrac = custom<string>($ => {
    const f = String.raw`-?\\dfrac{(-?\d+\.?\d*)}{(-?\d+\.?\d*)}`
    return str($) && !!$.match(new RegExp(f, 'g'))
})

export const constraint = custom<Constraint>(tuple(num, num, ineq, num))

export const constraints = custom<Constraint[]>(array(constraint))

export const field = custom<Field>(tuple(num, num, num))

export const quadrantCode = custom<QuadrantCode>(anyOf(1, 2, 3, 4))

export const quadrantName = custom<QuadrantName>(anyOf('I', 'II', 'III', 'IV'))

export const quadrant = custom<QuadrantCode | QuadrantName>(
    or(quadrantCode, quadrantName)
)

export const trig = custom<TrigFunc>(anyOf('sin', 'cos', 'tan'))

export const roman = custom<string>(
    anyOf('I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X')
)

export const base = custom<string>(
    $ => str($) && $.match(/[\{\}0-9A-Z]+\_\{[0-9]+\}/g) !== null
)

// Math Types

export const couple = custom<[number, number]>(tuple(num, num))

export const triple = custom<[number, number, number]>(tuple(num, num, num))

export const combo = custom<[boolean, boolean, boolean]>(
    tuple(bool, bool, bool)
)

export const ntuple = custom<number[]>(array(num))

export const interval = custom<interval>($ => couple($) && $[0] <= $[1])

export const point2D = custom<Point2D>(couple)

export const point2Ds = custom<Point2D[]>(array(point2D))

export const point3D = custom<Point3D>(triple)

export const point3Ds = custom<Point3D[]>(array(point3D))

export const polar = custom<PolarPoint>($ => couple($) && $[0] >= 0)

export const fraction = custom<Fraction>(couple)

export const properFraction = custom<Fraction>($ => fraction($) && $[1] !== 0)

export const vector = custom<Point2D>(couple)

export const vector3D = custom<Point3D>(triple)

export const triangleSides = custom<[number, number, number]>($ => {
    if (!triple($)) return false
    let [a, b, c] = $
    return $.every(positive) && a + b > c && b + c > a && c + a > b
})

export const monomial = custom<monomial>(object({ coeff: num }))

export const polynomial = custom<polynomial>(array(monomial))

export const compoundInequality = custom<CompoundInequality>(
    tuple(anyOf('AND', 'OR'), ineq, num, ineq, num, str)
)

export const trigValue = custom<TrigValue>(tuple(trig, or(num, str)))

export const trigExp = custom<TrigExp>(tuple(trig, num, num, str))

export const quantity = custom<quantity>(object({ val: num, unit: str }))
