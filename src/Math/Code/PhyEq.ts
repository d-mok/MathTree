
function makeFn(args: string[], body: string): zeroFunction {
    const paras = '(' + args.join(',') + ')'
    return new Function("return " + paras + "=>" + body)()
}

// function surround(variable: string): string {
//     const [h, ...t] = variable
//     return h + '(' + t.join('') + ')'
// }

// function pad(variable: string): string {
//     const h = variable[0]
//     if (h === '*' || h === '$') return variable
//     return '*' + variable
// }

// function pure(variable: string): string {
//     return variable.replaceAll('*', '').replaceAll('$', '')
// }

// function pads(...vars: string[]): string[] {
//     return vars.map(pad)
// }

// function pures(...vars: string[]): string[] {
//     return vars.map(pure)
// }

type eq = [func: zeroFunction, latex: string]


class PhyEqCls {

    /**
     * s = vt
     */
    svt(s = 's', v = 'v', t = 't', $ = '***'): eq {
        return [
            makeFn([s, v, t], `${s}-${v}*${t}`),
            `${$[0]}${s}=${$[1]}(${v})${$[2]}(${t})`
        ]
    }

    /**
     * θ = ωt
     */
    θωt(θ = 'θ', ω = 'ω', t = 't', $ = '$$$'): eq {
        return [
            makeFn([θ, ω, t], `${θ}-${ω}*${t}`),
            `${$[0]}${θ}=${$[1]}(${ω})${$[2]}(${t})`
        ]
    }

    /**
     * ω = 2π/T
     */
    ωT(ω = 'ω', T = 'T', $ = '$$'): eq {
        return [
            makeFn([ω, T], `${ω}-2*Math.PI*${T}`),
            `${$[0]}${ω}=\\dfrac{2π}{${$[2]}${T}}`
        ]
    }

    /**
     * s = rθ
     */
    srθ(s = 's', r = 'r', θ = 'θ', $ = '**$'): eq {
        return [
            makeFn([s, r, θ], `${s}-${r}*${θ}`),
            `${$[0]}${s}=${$[1]}(${r})${$[2]}(${θ})`
        ]
    }

    /**
     * v = rω
     */
    vrω(v = 'v', r = 'r', ω = 'ω', $ = '***'): eq {
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