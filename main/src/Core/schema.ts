import * as v from 'valibot'

export const num = v.pipe(v.number(), v.custom(Number.isFinite))

export const int = v.pipe(
    num,
    v.check($ => Number.isInteger($.blur()))
)

export const positive = v.pipe(num, v.gtValue(0))

// JS native type

export const str = v.string()

export const bool = v.boolean()

// special text

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

export const constraint = v.strictTuple([num, num, ineq, num])

export const constraints = v.array(constraint)

export const trig = v.union([
    v.literal('sin'),
    v.literal('cos'),
    v.literal('tan'),
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

export const point2D = couple

export const point2Ds = v.array(point2D)

export const point3D = triple

export const point3Ds = v.array(point3D)

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

export const trigExp = v.strictTuple([
    trig,
    num,
    v.union([v.literal(1), v.literal(-1)]),
    str,
])

export const quantity = v.object({ val: num, unit: str })

// testing

function xxx(_: unknown) {
    return v.is(quantity, _)
}
