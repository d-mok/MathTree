
function makeFn(args: string[], body: string): zeroFunction {
    const paras = '(' + args.join(',') + ')'
    return new Function("return " + paras + "=>" + body)()
}


function makeFn2(args: string[], body: (...args: any[]) => any): zeroFunction {
    const paras = '(' + args.join(',') + ')'
    return new Function("return " + paras + "=> body" + paras)()
}


type eq = [func: zeroFunction, latex: string]


export class PhyEqCls {

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
            makeFn([ω, T], `${ω}-2*Math.PI/${T}`),
            `${$[0]}${ω}=\\dfrac{2π}{${$[1]}${T}}`
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


    /**
     * v = rω
     */
    vrω2(v = 'v', r = 'r', ω = 'ω', $ = '***'): eq {
        return [
            makeFn2([v, r, ω], (v, r, ω) => v - r * ω),
            `${$[0]}${v}=${$[1]}(${r})${$[2]}(${ω})`
        ]
    }

    /**
     * a = vω
     */
    avω(a = 'a', v = 'v', ω = 'ω', $ = '***'): eq {
        return [
            makeFn([a, v, ω], `${a}-${v}*${ω}`),
            `${$[0]}${a}=${$[1]}(${v})${$[2]}(${ω})`
        ]
    }

    /**
     * a = v^2/r
     */
    avr(a = 'a', v = 'v', r = 'r', $ = '***'): eq {
        return [
            makeFn([a, v, r], `${a}-${v}*${v}/${r}`),
            `${$[0]}${a}=\\dfrac{${$[1]}(${v})^2}{${$[2]}${r}}`
        ]
    }

    /**
     * a = rω^2
     */
    arω(a = 'a', r = 'r', ω = 'ω', $ = '***'): eq {
        return [
            makeFn([a, r, ω], `${a}-${r}*${ω}*${ω}`),
            `${$[0]}${a}=${$[1]}(${r})${$[2]}(${ω})^2`
        ]
    }

    /**
     * F = mvω
     */
    Fmvω(F = 'F', m = 'm', v = 'v', ω = 'ω', $ = '****'): eq {
        return [
            makeFn([F, m, v, ω], `${F}-${m}*${v}*${ω}`),
            `${$[0]}${F}=${$[1]}(${m})${$[2]}(${v})${$[3]}(${ω})`
        ]
    }

    /**
     * F = mv^2/r
     */
    Fmvr(F = 'F', m = 'm', v = 'v', r = 'r', $ = '****'): eq {
        return [
            makeFn([F, m, v, r], `${F}-${m}*${v}*${v}/${r}`),
            `${$[0]}${F}=\\dfrac{${$[1]}(${m})${$[2]}(${v})^2}{${$[3]}${r}}`
        ]
    }

    /**
     * F = mrω^2
     */
    Fmrω(F = 'F', m = 'm', r = 'r', ω = 'ω', $ = '****'): eq {
        return [
            makeFn([F, m, r, ω], `${F}-${m}*${r}*${ω}*${ω}`),
            `${$[0]}${F}=${$[1]}(${m})${$[2]}(${r})${$[3]}(${ω})^2`
        ]
    }


}

declare global {
    var PhyEq: PhyEqCls
}
globalThis.PhyEq = new PhyEqCls()
