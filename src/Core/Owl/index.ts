
/**
 * @category Numeracy
 * @return correct for floating point error
 * ```typescript
 * Blur(0.1+0.2) // 0.3
 * Blur(0.81-1) // -0.19
 * Blur(1.1**2) // 1.21
 * ```
 */
function Blur(value: any, accuracy = 12): (typeof value) {
    if (typeof value !== 'number') return value
    if (!isFinite(value)) return value
    // value = parseFloat(value.toFixed(accuracy));
    value = parseFloat(value.toPrecision(accuracy));
    return value
}
globalThis.Blur = Blur




export const num = (_: any) => Number.isFinite(_)

export const whole = (_: any) => Number.isInteger(_)

export const int = (_: any) => Number.isInteger(Blur(_))

export const dec = (_: any) => num(_) && !int(_)

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


export const point = (_: any) => couple(_)

export const fraction = (_: any) => couple(_)

export const properFraction = (_: any) => fraction(_) && _[1] !== 0

export const vector = (_: any) => couple(_)

// compose

export const and = (...predicates: predicate[]) => (_: any) => predicates.every(p => p(_))

export const or = (...predicates: predicate[]) => (_: any) => predicates.some(p => p(_))

export const not = (predicate: predicate) => (_: any) => !predicate(_)


// trivial

export const pass = (_: any) => true

export const fail = (_: any) => false


// /**
//  * @category Assertion
//  * @return check if the item is a IneqSign string
//  * ```typescript
//  * IsIneqSign('>') // true
//  * IsIneqSign('\\ge') // true
//  * IsIneqSign(true) // false
//  * IsIneqSign('=>') // false
//  * ```
//  */
// function IsIneqSign(...items: any[]): boolean {
//     return items.every(
//         x => [
//             '>', '<', '>=', '<=',
//             '\\gt', '\\lt', '\\ge', '\\le'
//         ].includes(x)
//     );
// }
// globalThis.IsIneqSign = IsIneqSign




// /**
//  * @category Assertion
//  * @return check if the item is a Dfrac string
//  * ```typescript
//  * IsDfrac('\\dfrac{1}{2}') // true
//  * IsDfrac('\\dfrac{x}{2}') // false
//  * ```
//  */
// function IsDfrac(...items: any[]): boolean {
//     const d = String.raw`-?\d+\.?\d*`
//     const f = String.raw`-?\\dfrac{(-?\d+\.?\d*)}{(-?\d+\.?\d*)}`
//     return items.every(x => IsString(x) && x.match(new RegExp(f, 'g')))
// }
// globalThis.IsDfrac = IsDfrac


// /**
//  * @category Assertion
//  * @return check if the item is a constraint (LP)
//  * ```typescript
//  * IsConstraint([1,2,'>',3]) // true
//  * IsConstraint([1,2,3]) // false
//  * IsConstraint([1,2,'=>',3]) // false
//  * ```
//  */
// function IsConstraint(...items: any[]): boolean {
//     return items.every(
//         x => IsArrayOfLength(4)(x) &&
//             IsNum(x[0], x[1], x[3]) &&
//             IsIneqSign(x[2])
//     );
// }
// globalThis.IsConstraint = IsConstraint

