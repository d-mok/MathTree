



export const num = (_: any) => Number.isFinite(_)

export const whole = (_: any) => Number.isInteger(_)

export const int = (_: any) => num(_) && Number.isInteger(ant.correct(_))

export const dec = (_: any) => num(_) && !int(_)

export const terminating = (_: any) => num(_) && ant.sigfig(_) < 10

export const rational = (_: any) => num(_) && ant.fracable(_)

export const irrational = (_: any) => num(_) && !ant.fracable(_)

export const odd = (_: any) => int(_) && Math.abs(ant.correct(_)) % 2 === 1

export const even = (_: any) => int(_) && Math.abs(ant.correct(_)) % 2 === 0

export const prob = (_: any) => num(_) && _ >= 0 && _ <= 1

export const sq = (_: any) => int(_) && int(Math.sqrt(_))

export const positive = (_: any) => num(_) && _ > 0

export const positiveInt = (_: any) => int(_) && _ > 0

export const nonNegative = (_: any) => num(_) && _ >= 0

export const nonNegativeInt = (_: any) => int(_) && _ >= 0

export const negative = (_: any) => num(_) && _ < 0

export const negativeInt = (_: any) => int(_) && _ < 0

export const nonPositive = (_: any) => num(_) && _ <= 0

export const nonPositiveInt = (_: any) => int(_) && _ <= 0

export const nonZero = (_: any) => num(_) && _ !== 0

export const nonZeroInt = (_: any) => int(_) && _ !== 0

export const between = (min: number, max: number) => build(`between(${min},${max})`,
    (_: any) => num(_) && _ >= min && _ <= max
)


export const absBetween = (min: number, max: number) => build(`absBetween(${min},${max})`,
    (_: any) => num(_) && Math.abs(_) >= min && Math.abs(_) <= max
)





// JS native type



export const str = (_: any) => typeof _ === 'string'

export const bool = (_: any) => typeof _ === 'boolean'

export const emptyObject = (_: any) => !!_ && _.constructor === Object && Object.keys(_).length === 0

export const array = (_: any) => Array.isArray(_)

export const arrayOfLength = (length: number) => build(`arrayOfLength(${length})`,
    (_: any) => array(_) && _.length === length
)


export const arrayWith = (predicate: (_: any) => boolean) => build(`arrayWith(${predicate.name})`,
    (_: any) => array(_) && _.every(predicate)
)



// Math Types

export const couple = (_: any) => arrayOfLength(2)(_) && arrayWith(num)(_)

export const triple = (_: any) => arrayOfLength(3)(_) && arrayWith(num)(_)

export const ntuple = (_: any) => arrayWith(num)(_)

export const interval = (_: any) => couple(_) && _[0] <= _[1]

export const point = (_: any) => couple(_)

export const polar = (_: any) => couple(_) && _[0] >= 0

export const fraction = (_: any) => couple(_)

export const properFraction = (_: any) => fraction(_) && _[1] !== 0

export const vector = (_: any) => couple(_)

export const triangleSides = (_: any) => {
    let [a, b, c] = _
    return triple(_) &&
        _.every(positive) &&
        a + b > c &&
        b + c > a &&
        c + a > b
}

// trivial

export const pass = (_: any) => true

export const fail = (_: any) => false



// relation

export const distinct = (_: any[]) => newList(_).isDistinct()

export const distinctBy = (keyFunc: (_: any) => any) =>
    build('distinctBy_' + (keyFunc.name || keyFunc.toString()),
        (..._: any[]) => newList(_, keyFunc).isDistinct()
    )

// special text

export const ineq = (_: any): _ is Ineq => ['>', '<', '>=', '<=', '\\gt', '\\lt', '\\ge', '\\le'].includes(_)

export const dfrac = (_: any) => {
    const f = String.raw`-?\\dfrac{(-?\d+\.?\d*)}{(-?\d+\.?\d*)}`
    return str(_) && _.match(new RegExp(f, 'g'))
}

export const constraint = (_: any) => arrayOfLength(4)(_) && num(_[0]) && num(_[1]) && ineq(_[2]) && num(_[3])

export const quadrantCode = (_: any) => [1, 2, 3, 4].includes(_)

export const quadrantName = (_: any) => ['I', 'II', 'III', 'IV'].includes(_)

export const quadrant = (_: any) => quadrantCode(_) || quadrantName(_)

export const trig = (_: any) => ['sin', 'cos', 'tan'].includes(_)

export const roman = (_: any) => ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'].includes(_)






// functor

function build<F extends (...args: any[]) => any>(funcName: string, func: F): F {
    const holder = { [funcName](...args: any[]) { return func(...args) } }
    return holder[funcName] as F
}


export function and(pds: predicate[], name?: string): predicate {
    name ??= '(' + pds.map(f => f.name).join(' && ') + ')'
    return build(name, (_: any) => pds.every(p => p(_)))
}


export function or(pds: predicate[], name?: string): predicate {
    name ??= '(' + pds.map(f => f.name).join(' || ') + ')'
    return build(name, (_: any) => pds.some(p => p(_)))
}

export function every(pd: predicate, name?: string): predicate {
    name ??= '(every.' + pd.name + ')'
    return build(name, (_: any) => _.every(pd))
}
