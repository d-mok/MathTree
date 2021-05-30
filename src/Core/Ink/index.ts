

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
        return "\\" + T[0] + " " + T[1] + " \\degree"
    } else {
        return "\\" + T[0] + " " + T[1]
    }
}


export function printTrigExp(T: TrigExp): string {
    return "\\" + T[0] + "(" + T[1] + " \\degree" + (T[2] > 0 ? '+' : '-') + T[3] + ")"
}


export function printOrTrigRoots(roots: (number | undefined)[]): string {
    roots = roots.filter(owl.num)
    roots = roots.map(x => Round(x!, 5))
    let ss = roots.map(x => x + ' \\degree')
    if (ss.length === 0) return "no solution"
    if (ss.length === 1) return ss[0]
    let last = ss.pop()
    return ss.join(',') + '~\\text{or}~' + last
}

