

export function printIneq(greater: boolean, equal: boolean): Ineq {
    if (greater && equal) return '\\ge'
    if (greater && !equal) return '\\gt'
    if (!greater && equal) return '\\le'
    if (!greater && !equal) return '\\lt'
    throw 'never'
}

export function parseIneq(text: Ineq): [greater: boolean, equal: boolean] {
    let greater = text.includes('g') || text.includes('>')
    let equal = text.includes('e') || text.includes('=')
    return [greater, equal]
}

export function printDfrac(numerator: number, denominator: number, upSign = false): string {
    let p = numerator
    let q = denominator
    if (p === 0) return '0';
    [p, q] = ant.simpFrac(p, q)
    if (q === 1) return p.toString()
    if (upSign) {
        return '\\dfrac{' + p + '}{' + q + '}'
    } else {
        return p > 0 ?
            '\\dfrac{' + p + '}{' + q + '}' :
            '-\\dfrac{' + Math.abs(p) + '}{' + q + '}'
    }
}


export function parseDfrac(dfrac: string): Fraction {
    if (!owl.dfrac(dfrac)) throw 'not dfrac'
    const d = String.raw`-?\d+\.?\d*`
    const f = String.raw`-?\\dfrac{(-?\d+\.?\d*)}{(-?\d+\.?\d*)}`
    dfrac = dfrac.match(new RegExp(f, 'g'))![0]
    const matches = dfrac.match(new RegExp(d, 'g'))!
    const u = dfrac.charAt(0) === '-' ? -1 : 1
    const p = Number(matches[0]) * u
    const q = Number(matches[1])
    if (!(owl.num(p) && owl.num(q))) throw 'fail to parse dfrac'
    return [p, q]
}

export function printCombo(combo: [boolean, boolean, boolean]) {
    let [a, b, c] = combo
    if (a && b && c) return 'I, II and III'
    if (a && b && !c) return 'I and II only'
    if (a && !b && c) return 'I and III only'
    if (a && !b && !c) return 'I only'
    if (!a && b && c) return 'II and III only'
    if (!a && b && !c) return 'II only'
    if (!a && !b && c) return 'III only'
    if (!a && !b && !c) return 'None of the above'
}