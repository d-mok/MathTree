export type Ineq =
    | '\\ge'
    | '\\gt'
    | '\\le'
    | '\\lt'
    | '>='
    | '<='
    | '>'
    | '<'
    | [greater: boolean, equal: boolean]

/**
 * Check if me is > or >=.
 */
export function greaterThan(ineq: Ineq): boolean {
    if (typeof ineq === 'string') {
        return ineq.includes('>') || ineq.includes('g')
    } else {
        return ineq[0]
    }
}

/**
 * Check if me allow equal.
 */
export function canEqual(ineq: Ineq): boolean {
    if (typeof ineq === 'string') {
        return ineq.includes('=') || ineq.includes('e')
    } else {
        return ineq[1]
    }
}

/**
 * Return me, as string.
 */
export function print(ineq: Ineq): string & Ineq {
    let g = greaterThan(ineq)
    let e = canEqual(ineq)
    return `\\${g ? 'g' : 'l'}${e ? 'e' : 't'}`
}

/**
 * Return the strict version of me, as `Ineq`.
 */
export function strict(ineq: Ineq): Ineq {
    return [greaterThan(ineq), false]
}

/**
 * Return the loose version of me, as `Ineq`.
 */
export function loose(ineq: Ineq): Ineq {
    return [greaterThan(ineq), true]
}

/**
 * Return the flip version of me, as `Ineq`.
 */
export function flip(ineq: Ineq): Ineq {
    return [!greaterThan(ineq), canEqual(ineq)]
}

/**
 * Check if `a` and `b` satisfy my comparison.
 */
export function compare(a: number, ineq: Ineq, b: number): boolean {
    let g = greaterThan(ineq)
    let e = canEqual(ineq)
    if (g && e) return a >= b
    if (g && !e) return a > b
    if (!g && e) return a <= b
    if (!g && !e) return a < b
    throw 'never, cannot recognise code!'
}
