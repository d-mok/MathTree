import * as v from 'valibot'
import * as schema from './schema.js'

export { array } from './owl/array.js'
export { tuple } from './owl/tuple.js'

function is<
    T,
    S extends v.BaseSchema<any, any, any> = v.BaseSchema<any, any, any>
>(schema: S) {
    return (_: unknown): _ is T => v.is(schema, _)
}

export const num = is<number>(schema.num)
export const whole = is<number>(schema.whole)
export const int = is<number>(schema.int)
export const dec = is<number>(schema.dec)
export const terminating = is<number>(schema.terminating)
export const rational = is<number>(schema.rational)
export const irrational = is<number>(schema.irrational)
export const odd = is<number>(schema.odd)
export const even = is<number>(schema.even)
export const prob = is<number>(schema.prob)
export const sq = is<number>(schema.sq)
export const positive = is<number>(schema.positive)
export const positiveInt = is<number>(schema.positiveInt)
export const nonNegative = is<number>(schema.nonNegative)
export const nonNegativeInt = is<number>(schema.nonNegativeInt)
export const negative = is<number>(schema.negative)
export const negativeInt = is<number>(schema.negativeInt)
export const nonPositive = is<number>(schema.nonPositive)
export const nonPositiveInt = is<number>(schema.nonPositiveInt)
export const zero = is<number>(schema.zero)
export const nonZero = is<number>(schema.nonZero)
export const nonZeroInt = is<number>(schema.nonZeroInt)

export const between = (min: number, max: number) => ($: unknown) =>
    num($) && $ >= min && $ <= max

export const absBetween = (min: number, max: number) => ($: unknown) =>
    num($) && Math.abs($) >= min && Math.abs($) <= max

// JS native type

export const str = is<string>(schema.str)
export const bool = is<boolean>(schema.bool)
export const emptyObject = is<{}>(schema.emptyObject)

// trivial

export const pass = ($: unknown) => true

export const fail = ($: unknown) => false

// relation

export const distinct = is<unknown[]>(schema.distinct)

// special text

export const alphabet = is<string>(schema.alphabet)
export const ineq = is<Ineq>(schema.ineq)
export const dfrac = is<string>(schema.dfrac)
export const constraint = is<Constraint>(schema.constraint)
export const constraints = is<Constraint[]>(schema.constraints)
export const field = is<Field>(schema.field)
export const quadrantCode = is<QuadrantCode>(schema.quadrantCode)
export const quadrantName = is<QuadrantName>(schema.quadrantName)
export const quadrant = is<QuadrantCode | QuadrantName>(schema.quadrant)
export const trig = is<TrigFunc>(schema.trig)
export const roman = is<string>(schema.roman)
export const base = is<string>(schema.base)

// Math Types

export const couple = is<[number, number]>(schema.couple)
export const triple = is<[number, number, number]>(schema.triple)
export const combo = is<[boolean, boolean, boolean]>(schema.combo)
export const ntuple = is<number[]>(schema.ntuple)
export const interval = is<interval>(schema.interval)
export const point2D = is<Point2D>(schema.point2D)
export const point2Ds = is<Point2D[]>(schema.point2Ds)
export const point3D = is<Point3D>(schema.point3D)
export const point3Ds = is<Point3D[]>(schema.point3Ds)
export const polar = is<PolarPoint>(schema.polar)
export const fraction = is<Fraction>(schema.fraction)
export const properFraction = is<Fraction>(schema.properFraction)
export const vector = is<Point2D>(schema.vector)
export const vector3D = is<Point3D>(schema.vector3D)
export const triangleSides = is<[number, number, number]>(schema.triangleSides)
export const monomial = is<monomial>(schema.monomial)
export const polynomial = is<polynomial>(schema.polynomial)
export const compoundInequality = is<CompoundInequality>(
    schema.compoundInequality
)
export const trigValue = is<TrigValue>(schema.trigValue)
export const trigExp = is<TrigExp>(schema.trigExp)
export const quantity = is<quantity>(schema.quantity)
