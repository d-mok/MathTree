
function makeFn(args: string[], body: string): zeroFunction {
    const paras = '(' + args.join(',') + ')'
    return new Function("return " + paras + "=>" + body)()
}

function surround(variable: string): string {
    const [h, ...t] = variable
    return h + '(' + t.join('') + ')'
}

function pad(variable: string): string {
    const h = variable[0]
    if (h === '*' || h === '$') return variable
    return '*' + variable
}

function pure(variable: string): string {
    return variable.replaceAll('*', '').replaceAll('$', '')
}

function pads(...vars: string[]): string[] {
    return vars.map(pad)
}

function pures(...vars: string[]): string[] {
    return vars.map(pure)
}

type eq = [func: zeroFunction, latex: string]


class PhyEqCls {

    Circular_angular_speed(v = '*v', r = '*r', ω = '*ω'): eq {
        let [_v, _r, _ω] = pads(v, r, ω)
        _r = surround(_r)
        _ω = surround(_ω);
        [v, r, ω] = pures(v, r, ω)
        return [
            makeFn([v, r, ω], `${v}-${r}*${ω}`),
            `${_v}=${r}${ω}`
        ]
    }

}

declare global {
    var PhyEq: PhyEqCls
}
globalThis.PhyEq = new PhyEqCls()


export { }