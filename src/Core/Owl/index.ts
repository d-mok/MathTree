



export const num = (_: any) => Number.isFinite(_)

export const whole = (_: any) => Number.isInteger(_)

export const int = (_: any) => Number.isInteger(ant.correct(_))

export const dec = (_: any) => num(_) && !int(_)

export const rational = (_: any) => num(_) && ant.fracable(_)

export const irrational = (_: any) => num(_) && !ant.fracable(_)

export const odd = (_: any) => int(_) && Math.abs(_) % 2 === 1

export const even = (_: any) => int(_) && Math.abs(_) % 2 === 0

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

export const between = (min: number, max: number) => (_: any) => num(_) && _ >= min && _ <= max


// JS native type



export const str = (_: any) => typeof _ === 'string'

export const bool = (_: any) => typeof _ === 'boolean'

export const emptyObject = (_: any) => !!_ && _.constructor === Object && Object.keys(_).length === 0

export const array = (_: any) => Array.isArray(_)

export const arrayOfLength = (length: number) => (_: any) => array(_) && _.length === length

export const arrayWith = (predicate: (_: any) => boolean) => (_: any) => array(_) && _.every(predicate)



// Math Types

export const couple = (_: any) => arrayOfLength(2)(_) && arrayWith(num)(_)

export const triple = (_: any) => arrayOfLength(3)(_) && arrayWith(num)(_)

export const ntuple = (_: any) => arrayWith(num)(_)

export const interval = (_: any) => couple(_) && _[0] <= _[1]

export const point = (_: any) => couple(_)

export const fraction = (_: any) => couple(_)

export const properFraction = (_: any) => fraction(_) && _[1] !== 0

export const vector = (_: any) => couple(_)


// trivial

export const pass = (_: any) => true

export const fail = (_: any) => false



// relation

export const distinct = (..._: any[]) => List(_).isDistinct()

export const distinctBy = (keyFunc: (_: any) => any) => (..._: any[]) => List(_, keyFunc).isDistinct()

// special text

export const ineqSign = (_: any) => ['>', '<', '>=', '<=', '\\gt', '\\lt', '\\ge', '\\le'].includes(_)

export const dfrac = (_: any) => {
    const d = String.raw`-?\d+\.?\d*`
    const f = String.raw`-?\\dfrac{(-?\d+\.?\d*)}{(-?\d+\.?\d*)}`
    return str(_) && _.match(new RegExp(f, 'g'))
}

export const constraint = (_: any) => arrayOfLength(4)(_) && num(_[0]) && num(_[1]) && ineqSign(_[2]) && num(_[3])




