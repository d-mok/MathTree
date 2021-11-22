


export const num = (_: unknown): _ is number => Number.isFinite(_)

export const whole = (_: unknown): _ is number => Number.isInteger(_)

export const int = (_: unknown): _ is number => num(_) && Number.isInteger(cal.blur(_))

export const dec = (_: unknown): _ is number => num(_) && !int(_)

export const terminating = (_: unknown): _ is number => num(_) && cal.sigfig(_) < 10

export const rational = (_: unknown): _ is number => num(_) && cal.isRational(_)

export const irrational = (_: unknown): _ is number => num(_) && !cal.isRational(_)

export const odd = (_: unknown): _ is number => int(_) && Math.abs(cal.blur(_)) % 2 === 1

export const even = (_: unknown): _ is number => int(_) && Math.abs(cal.blur(_)) % 2 === 0

export const prob = (_: unknown): _ is number => num(_) && _ >= 0 && _ <= 1

export const sq = (_: unknown): _ is number => int(_) && int(Math.sqrt(_))

export const positive = (_: unknown): _ is number => num(_) && _ > 0

export const positiveInt = (_: unknown): _ is number => int(_) && _ > 0

export const nonNegative = (_: unknown): _ is number => num(_) && _ >= 0

export const nonNegativeInt = (_: unknown): _ is number => int(_) && _ >= 0

export const negative = (_: unknown): _ is number => num(_) && _ < 0

export const negativeInt = (_: unknown): _ is number => int(_) && _ < 0

export const nonPositive = (_: unknown): _ is number => num(_) && _ <= 0

export const nonPositiveInt = (_: unknown): _ is number => int(_) && _ <= 0

export const zero = (_: unknown): _ is number => num(_) && Math.abs(_) < 1e-14

export const nonZero = (_: unknown): _ is number => num(_) && !zero(_)

export const nonZeroInt = (_: unknown): _ is number => int(_) && !zero(_)

export const between = (min: number, max: number) => build(`between(${min},${max})`,
    (_: unknown): _ is number => num(_) && _ >= min && _ <= max
)

export const absBetween = (min: number, max: number) => build(`absBetween(${min},${max})`,
    (_: unknown): _ is number => num(_) && Math.abs(_) >= min && Math.abs(_) <= max
)




// JS native type



export const str = (_: unknown): _ is string => typeof _ === 'string'

export const bool = (_: unknown): _ is boolean => typeof _ === 'boolean'

export const object = (_: unknown): _ is Object => typeof _ === 'object' && _ !== null

export const emptyObject = (_: unknown): _ is Object => object(_) && !!_ && _.constructor === Object && Object.keys(_).length === 0

export const array = (_: unknown): _ is any[] => Array.isArray(_)

export const arrayOfLength = (length: number) => build(`arrayOfLength(${length})`,
    (_: unknown): _ is any[] => array(_) && _.length === length
)


export const arrayWith = (predicate: (_: unknown) => boolean) => build(`arrayWith(${predicate.name})`,
    (_: unknown): _ is any[] => array(_) && _.every(predicate)
)



// Math Types

export const couple = (_: unknown): _ is [number, number] => arrayOfLength(2)(_) && arrayWith(num)(_)

export const triple = (_: unknown): _ is [number, number, number] => arrayOfLength(3)(_) && arrayWith(num)(_)

export const combo = (_: unknown): _ is [boolean, boolean, boolean] => arrayOfLength(3)(_) && arrayWith(bool)(_)

export const ntuple = (_: unknown): _ is number[] => arrayWith(num)(_)

export const interval = (_: unknown): _ is interval => couple(_) && _[0] <= _[1]

export const point2D = (_: unknown): _ is Point2D => couple(_)

export const point2Ds = (_: unknown): _ is Point2D[] => arrayWith(point2D)(_)

export const point3D = (_: unknown): _ is Point3D => triple(_)

export const polar = (_: unknown): _ is PolarPoint => couple(_) && _[0] >= 0

export const fraction = (_: unknown): _ is Fraction => couple(_)

export const properFraction = (_: unknown): _ is Fraction => fraction(_) && _[1] !== 0

export const vector = (_: unknown): _ is Point2D => couple(_)

export const vector3D = (_: unknown): _ is Point3D => triple(_)

export const triangleSides = (_: unknown) => {
    if (!triple(_)) return false
    let [a, b, c] = _
    return _.every(positive) &&
        a + b > c &&
        b + c > a &&
        c + a > b
}

export const monomial = (_: unknown): _ is MonomialCls<any> => object(_) && ('coeff' in _) && ('vars' in _)

export const polynomial = (_: unknown): _ is polynomial<any> => arrayWith(monomial)(_)


export const trigValue = (_: unknown): _ is TrigValue => arrayOfLength(2)(_) && trig(_[0]) && (num(_[1]) || str(_[1]))

export const trigExp = (_: unknown): _ is TrigExp => arrayOfLength(4)(_) && trig(_[0]) && num(_[1]) && num(_[2]) && str(_[3])

export const labeledValue1 = (_: unknown): _ is LabeledValue1 => arrayOfLength(2)(_) && num(_[0]) && str(_[1])

export const labeledValue2 = (_: unknown): _ is LabeledValue2 => arrayOfLength(3)(_) && num(_[0]) && str(_[1]) && str(_[2])

export const labeledValue = (_: unknown): _ is LabeledValue => labeledValue1(_) || labeledValue2(_)

export const quantity = (_: unknown): _ is quantity => object(_) && ('val' in _) && ('unit' in _)



// trivial

export const pass = (_: unknown) => true

export const fail = (_: unknown) => false



// relation

export const distinct = (_: unknown[]) => toList(_).duplessDeep()

// special text

export const alphabet = (_: unknown): _ is string => str(_) && _.length === 1 && (_.toLowerCase() !== _.toUpperCase())

export const ineq = (_: unknown): _ is Ineq => str(_) && ['>', '<', '>=', '<=', '\\gt', '\\lt', '\\ge', '\\le'].includes(_)

export const dfrac = (_: unknown): _ is string => {
    const f = String.raw`-?\\dfrac{(-?\d+\.?\d*)}{(-?\d+\.?\d*)}`
    return str(_) && !!_.match(new RegExp(f, 'g'))
}

export const constraint = (_: unknown): _ is Constraint => arrayOfLength(4)(_) && num(_[0]) && num(_[1]) && ineq(_[2]) && num(_[3])

export const constraints = (_: unknown): _ is Constraint[] => arrayWith(constraint)(_)

export const field = (_: unknown): _ is Field => triple(_)

export const quadrantCode = (_: unknown): _ is QuadrantCode => int(_) && [1, 2, 3, 4].includes(_)

export const quadrantName = (_: unknown): _ is QuadrantName => str(_) && ['I', 'II', 'III', 'IV'].includes(_)

export const quadrant = (_: unknown): _ is QuadrantCode | QuadrantName => quadrantCode(_) || quadrantName(_)

export const trig = (_: unknown): _ is TrigFunc => str(_) && ['sin', 'cos', 'tan'].includes(_)

export const roman = (_: unknown): _ is string => str(_) && ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'].includes(_)

export const base = (_: unknown): _ is string => str(_) && _.match(/[0-9A-Z]+\_\{[0-9]+\}/g) !== null




// functor

function build<F extends predicate>(funcName: string, func: F): F {
    const holder = { [funcName](arg: unknown) { return func(arg) } }
    return holder[funcName] as F
}


export function and(pds: predicate[], name?: string): predicate {
    name ??= '(' + pds.map(f => f.name).join(' && ') + ')'
    return build(name, (_: unknown) => pds.every(p => p(_)))
}


export function or(pds: predicate[], name?: string): predicate {
    name ??= '(' + pds.map(f => f.name).join(' || ') + ')'
    return build(name, (_: unknown) => pds.some(p => p(_)))
}

export function every(pd: predicate, name?: string): predicate {
    name ??= '(every.' + pd.name + ')'
    return build(name, (_: unknown) => array(_) && _.every(pd))
}


