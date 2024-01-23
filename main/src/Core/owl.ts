import _ from 'lodash'

function GUARD<T>(pd: predicate) {
    return (_: unknown): _ is T => pd(_)
}

export const num = GUARD<number>(Number.isFinite)

export const whole = GUARD<number>(Number.isInteger)

export const int = GUARD<number>(and(num, $ => Number.isInteger(cal.blur($))))

export const dec = GUARD<number>($ => num($) && !int($))

export const terminating = GUARD<number>($ => num($) && cal.sigfig($) < 10)

export const rational = GUARD<number>($ => num($) && cal.isRational($))

export const irrational = GUARD<number>($ => num($) && !cal.isRational($))

export const odd = GUARD<number>($ => int($) && Math.abs(cal.blur($)) % 2 === 1)

export const even = GUARD<number>(
    $ => int($) && Math.abs(cal.blur($)) % 2 === 0
)

export const prob = GUARD<number>($ => num($) && $ >= 0 && $ <= 1)

export const sq = GUARD<number>($ => int($) && int(Math.sqrt($)))

export const positive = GUARD<number>($ => num($) && $ > 0)

export const positiveInt = GUARD<number>($ => int($) && $ > 0)

export const nonNegative = GUARD<number>($ => num($) && $ >= 0)

export const nonNegativeInt = GUARD<number>($ => int($) && $ >= 0)

export const negative = GUARD<number>($ => num($) && $ < 0)

export const negativeInt = GUARD<number>($ => int($) && $ < 0)

export const nonPositive = GUARD<number>($ => num($) && $ <= 0)

export const nonPositiveInt = GUARD<number>($ => int($) && $ <= 0)

export const zero = GUARD<number>($ => num($) && Math.abs($) < 1e-14)

export const nonZero = GUARD<number>($ => num($) && !zero($))

export const nonZeroInt = GUARD<number>($ => int($) && !zero($))

export const between = (min: number, max: number) =>
    build(
        `between(${min},${max})`,
        ($: unknown): $ is number => num($) && $ >= min && $ <= max
    )

export const absBetween = (min: number, max: number) =>
    build(
        `absBetween(${min},${max})`,
        ($: unknown): $ is number =>
            num($) && Math.abs($) >= min && Math.abs($) <= max
    )

// JS native type

export const str = GUARD<string>($ => typeof $ === 'string')

export const bool = GUARD<boolean>($ => typeof $ === 'boolean')

export const object = (schema?: Record<string, ($: unknown) => boolean>) =>
    build(
        schema !== undefined
            ? `object(${Object.entries(schema)
                  .map(([k, v]) => v + ':' + v.name)
                  .join(',')})`
            : 'object',
        ($: unknown): $ is Record<string, any> =>
            schema !== undefined
                ? typeof $ === 'object' &&
                  $ !== null &&
                  Object.entries(schema).every(
                      ([k, v]) => k in $ && v(($ as any)[k])
                  )
                : typeof $ === 'object' && $ !== null
    )

export const emptyObject = GUARD<object>(
    $ =>
        object()($) &&
        !!$ &&
        $.constructor === Object &&
        Object.keys($).length === 0
)

export const array = (predicate?: ($: unknown) => boolean) =>
    build(
        predicate !== undefined ? `array(${predicate.name})` : 'array',
        ($: unknown): $ is any[] =>
            predicate !== undefined
                ? Array.isArray($) && $.every(predicate)
                : Array.isArray($)
    )

export const tuple = (...predicates: (($: unknown) => boolean)[]) =>
    build(
        `tuple(${predicates.map(p => p.name).join(',')})`,
        ($: unknown): $ is any[] =>
            Array.isArray($) &&
            $.length === predicates.length &&
            $.every((v, i) => predicates[i](v))
    )

// trivial

export const pass = ($: unknown) => true

export const fail = ($: unknown) => false

// // relation

export const distinct = ($: unknown[]) => $.isUniqEqual()

// special text

export const alphabet = GUARD<string>(
    $ => str($) && $.length === 1 && $.toLowerCase() !== $.toUpperCase()
)

export const ineq = GUARD<Ineq>(
    or(
        anyOf('>', '<', '>=', '<=', '\\gt', '\\lt', '\\ge', '\\le'),
        tuple(bool, bool)
    )
)

export const dfrac = GUARD<string>($ => {
    const f = String.raw`-?\\dfrac{(-?\d+\.?\d*)}{(-?\d+\.?\d*)}`
    return str($) && !!$.match(new RegExp(f, 'g'))
})

export const constraint = GUARD<Constraint>(tuple(num, num, ineq, num))

export const constraints = GUARD<Constraint[]>(array(constraint))

export const field = GUARD<Field>(tuple(num, num, num))

export const quadrantCode = GUARD<QuadrantCode>(anyOf(1, 2, 3, 4))

export const quadrantName = GUARD<QuadrantName>(anyOf('I', 'II', 'III', 'IV'))

export const quadrant = GUARD<QuadrantCode | QuadrantName>(
    or(quadrantCode, quadrantName)
)

export const trig = GUARD<TrigFunc>(anyOf('sin', 'cos', 'tan'))

export const roman = GUARD<string>(
    anyOf('I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X')
)

export const base = GUARD<string>(
    $ => str($) && $.match(/[\{\}0-9A-Z]+\_\{[0-9]+\}/g) !== null
)

// Math Types

export const couple = GUARD<[number, number]>(tuple(num, num))

export const triple = GUARD<[number, number, number]>(tuple(num, num, num))

export const combo = GUARD<[boolean, boolean, boolean]>(tuple(bool, bool, bool))

export const ntuple = GUARD<number[]>(array(num))

export const interval = GUARD<interval>($ => couple($) && $[0] <= $[1])

export const point2D = GUARD<Point2D>(couple)

export const point2Ds = GUARD<Point2D[]>(array(point2D))

export const point3D = GUARD<Point3D>(triple)

export const point3Ds = GUARD<Point3D[]>(array(point3D))

export const polar = GUARD<PolarPoint>($ => couple($) && $[0] >= 0)

export const fraction = GUARD<Fraction>(couple)

export const properFraction = GUARD<Fraction>($ => fraction($) && $[1] !== 0)

export const vector = GUARD<Point2D>(couple)

export const vector3D = GUARD<Point3D>(triple)

export const triangleSides = GUARD<[number, number, number]>($ => {
    if (!triple($)) return false
    let [a, b, c] = $
    return $.every(positive) && a + b > c && b + c > a && c + a > b
})

export const monomial = GUARD<monomial>(object({ coeff: num }))

export const polynomial = GUARD<polynomial>(array(monomial))

export const compoundInequality = GUARD<CompoundInequality>(
    tuple(anyOf('AND', 'OR'), ineq, num, ineq, num, str)
)

export const trigValue = GUARD<TrigValue>(tuple(trig, or(num, str)))

export const trigExp = GUARD<TrigExp>(tuple(trig, num, num, str))

export const quantity = GUARD<quantity>(object({ val: num, unit: str }))

// functor

function build<F extends predicate>(funcName: string, func: F): F {
    const holder = {
        [funcName](arg: unknown) {
            return func(arg)
        },
    }
    return holder[funcName] as F
}

export function and(...pds: predicate[]): predicate {
    let name = '(' + pds.map(f => f.name).join(' && ') + ')'
    let p = ($: unknown) => pds.every(p => p($))
    return build(name, p)
}

export function or(...pds: predicate[]): predicate {
    let name = '(' + pds.map(f => f.name).join(' || ') + ')'
    let p = ($: unknown) => pds.some(p => p($))
    return build(name, p)
}

export function anyOf(...vals: any[]): predicate {
    let name = 'anyOf(' + vals.map(v => v.toString()).join(',') + ')'
    let p = ($: unknown) => vals.includes($)
    return build(name, p)
}
