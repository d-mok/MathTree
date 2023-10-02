import _ from 'lodash'
import * as math from 'mathjs'

export const num = ($: unknown): $ is number => Number.isFinite($)

export const whole = ($: unknown): $ is number => Number.isInteger($)

export const int = ($: unknown): $ is number =>
    num($) && Number.isInteger(cal.blur($))

export const dec = ($: unknown): $ is number => num($) && !int($)

export const terminating = ($: unknown): $ is number =>
    num($) && cal.sigfig($) < 10

export const rational = ($: unknown): $ is number => num($) && cal.isRational($)

export const irrational = ($: unknown): $ is number =>
    num($) && !cal.isRational($)

export const odd = ($: unknown): $ is number =>
    int($) && Math.abs(cal.blur($)) % 2 === 1

export const even = ($: unknown): $ is number =>
    int($) && Math.abs(cal.blur($)) % 2 === 0

export const prob = ($: unknown): $ is number => num($) && $ >= 0 && $ <= 1

export const sq = ($: unknown): $ is number => int($) && int(Math.sqrt($))

export const positive = ($: unknown): $ is number => num($) && $ > 0

export const positiveInt = ($: unknown): $ is number => int($) && $ > 0

export const nonNegative = ($: unknown): $ is number => num($) && $ >= 0

export const nonNegativeInt = ($: unknown): $ is number => int($) && $ >= 0

export const negative = ($: unknown): $ is number => num($) && $ < 0

export const negativeInt = ($: unknown): $ is number => int($) && $ < 0

export const nonPositive = ($: unknown): $ is number => num($) && $ <= 0

export const nonPositiveInt = ($: unknown): $ is number => int($) && $ <= 0

export const zero = ($: unknown): $ is number => num($) && Math.abs($) < 1e-14

export const nonZero = ($: unknown): $ is number => num($) && !zero($)

export const nonZeroInt = ($: unknown): $ is number => int($) && !zero($)

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

export const str = ($: unknown): $ is string => typeof $ === 'string'

export const bool = ($: unknown): $ is boolean => typeof $ === 'boolean'

export const object = ($: unknown): $ is Object =>
    typeof $ === 'object' && $ !== null

export const emptyObject = ($: unknown): $ is Object =>
    object($) && !!$ && $.constructor === Object && Object.keys($).length === 0

export const array = ($: unknown): $ is any[] => Array.isArray($)

export const arrayOfLength = (length: number) =>
    build(
        `arrayOfLength(${length})`,
        ($: unknown): $ is any[] => array($) && $.length === length
    )

export const arrayWith = (predicate: ($: unknown) => boolean) =>
    build(
        `arrayWith(${predicate.name})`,
        ($: unknown): $ is any[] => array($) && $.every(predicate)
    )

// Math Types

export const couple = ($: unknown): $ is [number, number] =>
    arrayOfLength(2)($) && arrayWith(num)($)

export const triple = ($: unknown): $ is [number, number, number] =>
    arrayOfLength(3)($) && arrayWith(num)($)

export const combo = ($: unknown): $ is [boolean, boolean, boolean] =>
    arrayOfLength(3)($) && arrayWith(bool)($)

export const ntuple = ($: unknown): $ is number[] => arrayWith(num)($)

export const interval = ($: unknown): $ is interval => couple($) && $[0] <= $[1]

export const point2D = ($: unknown): $ is Point2D => couple($)

export const point2Ds = ($: unknown): $ is Point2D[] => arrayWith(point2D)($)

export const point3D = ($: unknown): $ is Point3D => triple($)

export const point3Ds = ($: unknown): $ is Point3D[] => arrayWith(point3D)($)

export const polar = ($: unknown): $ is PolarPoint => couple($) && $[0] >= 0

export const fraction = ($: unknown): $ is Fraction => couple($)

export const properFraction = ($: unknown): $ is Fraction =>
    fraction($) && $[1] !== 0

export const vector = ($: unknown): $ is Point2D => couple($)

export const vector3D = ($: unknown): $ is Point3D => triple($)

export const triangleSides = ($: unknown) => {
    if (!triple($)) return false
    let [a, b, c] = $
    return $.every(positive) && a + b > c && b + c > a && c + a > b
}

export const monomial = ($: unknown): $ is monomial => object($) && 'coeff' in $

export const polynomial = ($: unknown): $ is polynomial =>
    arrayWith(monomial)($)

export const compoundInequality = ($: unknown): $ is CompoundInequality =>
    arrayOfLength(6)($) &&
    ($[0] === 'AND' || $[0] === 'OR') &&
    ineq($[1]) &&
    num($[2]) &&
    ineq($[3]) &&
    num($[4]) &&
    str($[5])

export const trigValue = ($: unknown): $ is TrigValue =>
    arrayOfLength(2)($) && trig($[0]) && (num($[1]) || str($[1]))

export const trigExp = ($: unknown): $ is TrigExp =>
    arrayOfLength(4)($) && trig($[0]) && num($[1]) && num($[2]) && str($[3])

export const quantity = ($: unknown): $ is quantity =>
    object($) && 'val' in $ && 'unit' in $

// trivial

export const pass = ($: unknown) => true

export const fail = ($: unknown) => false

// // relation

export const distinct = ($: unknown[]) => _.isUniqDeep($)

// special text

export const alphabet = ($: unknown): $ is string =>
    str($) && $.length === 1 && $.toLowerCase() !== $.toUpperCase()

export const ineq = ($: unknown): $ is Ineq =>
    (str($) &&
        ['>', '<', '>=', '<=', '\\gt', '\\lt', '\\ge', '\\le'].includes($)) ||
    (arrayOfLength(2)($) && arrayWith(bool)($))

export const dfrac = ($: unknown): $ is string => {
    const f = String.raw`-?\\dfrac{(-?\d+\.?\d*)}{(-?\d+\.?\d*)}`
    return str($) && !!$.match(new RegExp(f, 'g'))
}

export const constraint = ($: unknown): $ is Constraint =>
    arrayOfLength(4)($) && num($[0]) && num($[1]) && ineq($[2]) && num($[3])

export const constraints = ($: unknown): $ is Constraint[] =>
    arrayWith(constraint)($)

export const field = ($: unknown): $ is Field => triple($)

export const quadrantCode = ($: unknown): $ is QuadrantCode =>
    int($) && [1, 2, 3, 4].includes($)

export const quadrantName = ($: unknown): $ is QuadrantName =>
    str($) && ['I', 'II', 'III', 'IV'].includes($)

export const quadrant = ($: unknown): $ is QuadrantCode | QuadrantName =>
    quadrantCode($) || quadrantName($)

export const trig = ($: unknown): $ is TrigFunc =>
    str($) && ['sin', 'cos', 'tan'].includes($)

export const roman = ($: unknown): $ is string =>
    str($) &&
    ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'].includes($)

export const base = ($: unknown): $ is string =>
    str($) && $.match(/[\{\}0-9A-Z]+\_\{[0-9]+\}/g) !== null

// functor

function build<F extends predicate>(funcName: string, func: F): F {
    const holder = {
        [funcName](arg: unknown) {
            return func(arg)
        },
    }
    return holder[funcName] as F
}

export function and(pds: predicate[], name?: string): predicate {
    name ??= '(' + pds.map(f => f.name).join(' && ') + ')'
    return build(name, ($: unknown) => pds.every(p => p($)))
}

export function or(pds: predicate[], name?: string): predicate {
    name ??= '(' + pds.map(f => f.name).join(' || ') + ')'
    return build(name, ($: unknown) => pds.some(p => p($)))
}

export function every(pd: predicate, name?: string): predicate {
    name ??= '(every.' + pd.name + ')'
    return build(name, ($: unknown) => array($) && $.every(pd))
}
