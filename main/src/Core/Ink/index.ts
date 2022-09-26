// export function printIneq(greater: boolean, equal: boolean): Ineq {
//     if (greater && equal) return '\\ge'
//     if (greater && !equal) return '\\gt'
//     if (!greater && equal) return '\\le'
//     if (!greater && !equal) return '\\lt'
//     throw 'never'
// }

// export function parseIneq(text: Ineq): [greater: boolean, equal: boolean] {
//     let greater = text.includes('g') || text.includes('>')
//     let equal = text.includes('e') || text.includes('=')
//     return [greater, equal]
// }

export function printDfrac(
    numerator: number,
    denominator: number,
    upSign = false
): string {
    let p = numerator
    let q = denominator
    if (p === 0) return '0'
    ;[p, q] = cal.toFraction(p / q)
    if (q === 1) return p.toString()
    if (upSign) {
        return '\\dfrac{' + p + '}{' + q + '}'
    } else {
        return p > 0
            ? '\\dfrac{' + p + '}{' + q + '}'
            : '-\\dfrac{' + Math.abs(p) + '}{' + q + '}'
    }
}

// export function parseDfrac(dfrac: string): Fraction {
//     if (!owl.dfrac(dfrac)) throw 'not dfrac'
//     const d = String.raw`-?\d+\.?\d*`
//     const f = String.raw`-?\\dfrac{(-?\d+\.?\d*)}{(-?\d+\.?\d*)}`
//     dfrac = dfrac.match(new RegExp(f, 'g'))![0]
//     const matches = dfrac.match(new RegExp(d, 'g'))!
//     const u = dfrac.charAt(0) === '-' ? -1 : 1
//     const p = Number(matches[0]) * u
//     const q = Number(matches[1])
//     if (!(owl.num(p) && owl.num(q))) throw 'fail to parse dfrac'
//     return [p, q]
// }

export function printCombo(combo: [boolean, boolean, boolean]): string {
    let [a, b, c] = combo
    if (a && b && c) return 'I, II and III'
    if (a && b && !c) return 'I and II only'
    if (a && !b && c) return 'I and III only'
    if (a && !b && !c) return 'I only'
    if (!a && b && c) return 'II and III only'
    if (!a && b && !c) return 'II only'
    if (!a && !b && c) return 'III only'
    if (!a && !b && !c) return 'None of the above'
    throw 'never'
}

export function printTrigValue(T: TrigValue): string {
    if (typeof T[1] === 'number') {
        return '\\' + T[0] + ' ' + T[1] + '°'
    } else {
        return '\\' + T[0] + ' ' + T[1]
    }
}

export function printTrigExp(T: TrigExp): string {
    return '\\' + T[0] + '(' + T[1] + '°' + (T[2] > 0 ? '+' : '-') + T[3] + ')'
}

export function printOrTrigRoots(roots: (number | undefined)[]): string {
    roots = roots.filter(owl.num)
    roots = roots.map(x => Round(x!, 5))
    let ss = roots.map(x => x + '°')
    if (ss.length === 0) return 'no solution'
    if (ss.length === 1) return ss[0]
    let last = ss.pop()
    return ss.join(',') + '~\\text{or}~' + last
}

export function printSurd(num: number): string {
    let [p, q] = cal.toSurd(num)
    let T: string
    if (p === 1) {
        T = q === 1 ? '1' : '\\sqrt{' + q + '}'
    } else if (p === -1) {
        T = q === 1 ? '-1' : '-\\sqrt{' + q + '}'
    } else {
        T = q === 1 ? p.toString() : p + '\\sqrt{' + q + '}'
    }
    return T
}

export function printPointPolar(point: Point2D): string {
    let [r, q] = RectToPol(point)
    q = cal.blur(q)
    return `(${printSurd(r)},${q}°)`
}

export function printConstraint(
    con: Constraint,
    align = false,
    replaceEqual = false
): string {
    let [a, b, i, c] = con
    let j: string = INEQUAL.print(i)
    if (replaceEqual) j = '='
    if (align) j = ' & ' + j
    if (a === 0 && b === 0) return ` 0 ${j} ${c} `
    if (a !== 0 && b === 0) return ` ${a}x ${j} ${c} `
    if (a === 0 && b !== 0) return ` ${b}y ${j} ${c} `
    return ` ${a}x + ${b}y ${j} ${c} `
}

export function printConstraints(cons: Constraint[]): string {
    let T = ''
    T += ' \\left\\{ \\begin{aligned} '
    for (let c of cons) {
        T += printConstraint(c, true) + ' \\\\ '
    }
    T += ' \\end{aligned} \\right. '
    return T
}

export function printLabeledValue(
    obj: LabeledValue,
    order = 1,
    isAngle: boolean = false
): string {
    let value = obj[0]
    let label = obj[order]
    let T = label + ' = ' + value
    if (isAngle) T += '°'
    return T
}

export function printPrimeFactors(num: number): string {
    if (num === 1) return String(1)
    let factors = PrimeFactors(num)
    const primes = [...new Set(factors)]
    return primes
        .map(p => [p, Freq(factors, p)])
        .map(([p, n]) => p + '^{' + n + '}')
        .join(' \\times ')
}

export function printMonomial(mono: monomial, fraction: boolean): string {
    let keys = Object.keys(mono).filter($ => $ !== 'coeff')
    keys.sort()
    let vars = keys.map($ => ({ name: $, power: mono[$] }))
    let coeff = mono.coeff

    if (!fraction) {
        let T = String(mono.coeff)

        for (let { name, power } of vars) {
            if (power === 0) {
                continue
            } else if (power === 1) {
                T += name
            } else {
                T += name + '^{' + power + '}'
            }
        }
        return T
    } else {
        let [p, q] = cal.toFraction(coeff)
        let needFrac = q !== 1 || vars.some($ => $.power < 0)
        if (!needFrac) {
            return printMonomial(mono, false)
        }
        let a = '' // numerator
        let b = '' // denominator
        a = String(Math.abs(p))
        b = String(q)
        for (let { name, power } of vars) {
            if (power === 0) {
                continue
            } else if (power === 1) {
                a += name
            } else if (power > 0) {
                a += name + '^{' + power + '}'
            } else {
                b += name + '^{' + -power + '}'
            }
        }
        return (p < 0 ? '-' : '') + `\\dfrac{${a}}{${b}}`
    }
}

export function printPolynomial(poly: polynomial, fraction: boolean): string {
    return poly
        .filter(M => M.coeff !== 0)
        .map(M => printMonomial(M, fraction))
        .join('+')
}
