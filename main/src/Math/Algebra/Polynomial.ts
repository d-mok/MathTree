import { dice } from 'fate'
import { printPolynomial } from '../../Core/ink.js'
import _ from 'lodash'

function getVars(mono: monomial): { name: string; power: number }[] {
    let keys = Object.keys(mono).filter($ => $ !== 'coeff')
    keys.sort()
    return keys.map($ => ({ name: $, power: mono[$] }))
}

function getDeg(mono: monomial): number {
    let powers = getVars(mono).map($ => $.power)
    return Sum(...powers)
}

export function getMaxDeg(poly: polynomial): number {
    let degs = poly.map($ => getDeg($))
    return Math.max(...degs)
}

function getSize(mono: monomial): number {
    let s = getDeg(mono)
    let order = 1
    for (let { name, power } of getVars(mono)) {
        order = order / 100
        s += order * power
    }
    return s
}

/**
 * a random polynomial object
 * ```
 * RndPolynomial(5, ['x', 'y'], 3, 9))
 * // may return 7xy+3x^2y^3-2xy^3
 * ```
 */
export function RndPolynomial(
    degree: number,
    vars: string[] = ['x'],
    terms: number = degree + 1,
    maxCoeff: number = 9
): polynomial {
    function randomPartition(n: number): number[] {
        let len = vars.length
        if (n === 0) return Array(len).fill(0)
        return RndPartition(n, len, true)
    }

    function randomMono(degree: number) {
        let M: monomial = { coeff: RndZ(1, maxCoeff) }
        let degs = randomPartition(degree)
        vars.forEach((v, i) => (M[v] = degs[i]))
        return M
    }

    return dice(() => randomMono(RndN(0, degree)))
        .unique(M => getVars(M))
        .coherent(P => getMaxDeg(P) === degree)
        .rolls(terms)
}

/**
 * a string of the polynomial object
 * ```
 * PolyPrint([x^5, 2x^6, 3x^7])
 * // x^{5}+2x^{6}+3x^{7}
 * ```
 */
export function PolyPrint(poly: polynomial): string {
    return printPolynomial(poly, false)
}

/**
 * a polynomial object sorted by power
 * ```
 * PolySort([2x^6, x^5, 3x^7])
 * //  [x^5, 2x^6, 3x^7]
 * ```
 */
export function PolySort(poly: polynomial, desc = true): polynomial {
    poly = JSON.clone(poly)
    if (desc) {
        return SortBy(poly, M => -getSize(M))
    } else {
        return SortBy(poly, M => getSize(M))
    }
}

/**
 * a function of the polynomial, for substitution
 * ```
 * func = PolyFunction([2x^6, x^5, 3x^7])
 * func({x:2}) // 272
 * ```
 */
export function PolyFunction(
    poly: polynomial
): (values: { [_: string]: number }) => number {
    poly = JSON.clone(poly)

    function funcMono(mono: monomial) {
        return (input: { [_: string]: number }) => {
            let x = mono.coeff
            for (let { name, power } of getVars(mono)) {
                x = x * input[name] ** power
            }
            return x
        }
    }
    return (values: { [_: string]: number }): number => {
        return Sum(...poly.map(M => funcMono(M)(values)))
    }
}

/**
 * combine like terms in polynomial
 * ```
 * PolySimplify([x^5, 2x^6, 3x^5])
 * // [4x^5, 2x^6]
 * ```
 */
export function PolySimplify(poly: polynomial): polynomial {
    poly = JSON.clone(poly)
    let arr: polynomial = []

    function signature(M: monomial) {
        return JSON.stringify(getVars(M))
    }
    function findLikeTerm(M: monomial) {
        let sign = signature(M)
        return arr.find(m => signature(m) === sign)
    }
    for (let M of poly) {
        let like = findLikeTerm(M)
        if (like) {
            like.coeff += M.coeff
        } else {
            arr.push(M)
        }
    }
    return arr.filter(m => m.coeff !== 0)
}
