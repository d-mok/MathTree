
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

    Circular_vrω(v = 'v', r = 'r', ω = 'ω', $ = '***'): eq {
        return [
            makeFn([v, r, ω], `${v}-${r}*${ω}`),
            `${$[0]}${v}=${$[1]}(${r})${$[2]}(${ω})`
        ]
    }

}

declare global {
    var PhyEq: PhyEqCls
}
globalThis.PhyEq = new PhyEqCls()


export { }