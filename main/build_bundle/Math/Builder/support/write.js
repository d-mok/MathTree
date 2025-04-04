import _ from 'lodash';
export function symbol(v) {
    if (v.subscript.length > 0)
        return v.display + '_{' + v.subscript + '}';
    return v.display;
}
export function short(v) {
    // val
    let value = Round(v.val, 3);
    let abs = Math.abs(value);
    return String(abs >= 10000 || abs <= 0.01 ? Sci(value) : value);
}
export function long(v) {
    // val + unit
    return short(v) + v.unit;
}
export function full(v) {
    // sym = val + unit
    return symbol(v) + ' = ' + long(v);
}
export function whole(v) {
    // name = val + unit
    return '\\text{' + v.name + '}' + ' = ' + long(v);
}
export function rich(v) {
    return '\\text{' + v.name + '}~' + symbol(v) + ' = ' + long(v);
}
function writeSymbol(v, latex) {
    let s = symbol(v);
    return latex
        .replaceAll('*(' + v.sym + ')', s)
        .replaceAll('*' + v.sym, s)
        .replaceAll('$(' + v.sym + ')', s)
        .replaceAll('$' + v.sym, s);
}
function writeValue(v, latex) {
    let S = short(v);
    let L = long(v);
    return latex
        .replaceAll('*(' + v.sym + ')', '(' + S + ')')
        .replaceAll('*' + v.sym, S)
        .replaceAll('$(' + v.sym + ')', '(' + L + ')')
        .replaceAll('$' + v.sym, L);
}
export function write(vGrp, latex, showVars = []) {
    let T = latex;
    for (let v of _.sortBy(Object.keys(vGrp), $ => -vGrp[$].sym.length)) {
        T = showVars.includes(v)
            ? writeValue(vGrp[v], T)
            : writeSymbol(vGrp[v], T);
    }
    return T;
}
export function printSystem(vGrp, latexs, givens = []) {
    let eqs = latexs.map($ => write(vGrp, $, givens));
    return eqs.length === 1 ? eqs[0] : latexBraced(eqs);
}
export function printSystemSol(vGrp, vars) {
    return latexBraced(vars.map($ => full(vGrp[$])));
}
export function latexAligned(texts) {
    let T = '';
    T += '\\begin{aligned}';
    for (let t of texts)
        T += t + ' \\\\ ';
    T += ' \\end{aligned}';
    T = T.replaceAll('=', '&=');
    T = T.replaceAll('&&=', '&=');
    return T;
}
export function latexBraced(texts) {
    return '\\left\\{' + latexAligned(texts) + '\\right.';
}
