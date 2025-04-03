import _ from 'lodash'
import * as math from 'mathjs'

export function symbol(v: varObj): string {
    if (v.subscript.length > 0) return v.display + '_{' + v.subscript + '}'
    return v.display
}

export function short(v: varObj): string {
    // val
    let value = Round(v.val, 3).blur()
    let abs = Math.abs(value)
    return String(abs >= 10000 || abs <= 0.01 ? Sci(value) : value)
}

export function long(v: varObj): string {
    // val + unit
    return short(v) + v.unit
}

export function full(v: varObj): string {
    // sym = val + unit
    return symbol(v) + ' = ' + long(v)
}

export function whole(v: varObj): string {
    // name = val + unit
    return '\\text{' + v.name + '}' + ' = ' + long(v)
}

export function rich(v: varObj): string {
    return '\\text{' + v.name + '}~' + symbol(v) + ' = ' + long(v)
}

function writeSymbol(v: varObj, latex: string): string {
    let s = symbol(v)
    return latex
        .replaceAll('*(' + v.sym + ')', s)
        .replaceAll('*' + v.sym, s)
        .replaceAll('$(' + v.sym + ')', s)
        .replaceAll('$' + v.sym, s)
}

function writeValue(v: varObj, latex: string): string {
    let S = short(v)
    let L = long(v)
    return latex
        .replaceAll('*(' + v.sym + ')', '(' + S + ')')
        .replaceAll('*' + v.sym, S)
        .replaceAll('$(' + v.sym + ')', '(' + L + ')')
        .replaceAll('$' + v.sym, L)
}

export function write(vGrp: varGrp, latex: string, showVars: string[] = []) {
    let T = latex
    for (let v of _.sortBy(Object.keys(vGrp), $ => -vGrp[$].sym.length)) {
        T = showVars.includes(v)
            ? writeValue(vGrp[v], T)
            : writeSymbol(vGrp[v], T)
    }
    return T
}

export function printSystem(
    vGrp: varGrp,
    latexs: string[],
    givens: string[] = []
): string {
    let eqs = latexs.map($ => write(vGrp, $, givens))
    return eqs.length === 1 ? eqs[0] : latexBraced(eqs)
}

export function printSystemSol(vGrp: varGrp, vars: string[]): string {
    return latexBraced(vars.map($ => full(vGrp[$])))
}

export function latexAligned(texts: string[]): string {
    let T = ''
    T += '\\begin{aligned}'
    for (let t of texts) T += t + ' \\\\ '
    T += ' \\end{aligned}'
    T = T.replaceAll('=', '&=')
    T = T.replaceAll('&&=', '&=')
    return T
}

export function latexBraced(texts: string[]): string {
    return '\\left\\{' + latexAligned(texts) + '\\right.'
}
