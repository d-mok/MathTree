

function makeFn(args: string[], body: (...args: any[]) => any): zeroFunction {
    const paras = args.join(',')
    return new Function("return (" + paras + ") => (" + body.toString() + ').apply(null,[' + args + '])')()
}


function makeLatex(args: string[], template: string, units: string, brackets: string): string {
    let T = template
    for (let i = 0; i < args.length; i++) {
        const [l, r] = brackets[i] === '|' ? ['(', ')'] : ['', '']
        const u = units[i]
        T = T.replace('@', u + l + args[i] + r)
    }
    return T
}


type eq = [func: zeroFunction, latex: string]


export class PhyEqCls {

    /**
     * s = vt
     */
    svt(s = 's', v = 'v', t = 't', $ = '***'): eq {
        let args = [s, v, t]
        return [
            makeFn(args, (s, v, t) => s - v * t),
            makeLatex(args, '@=@@', $, ':||')
        ]
    }


    /**
     * θ = ωt
     */
    θωt(θ = 'θ', ω = 'ω', t = 't', $ = '$$$'): eq {
        let args = [θ, ω, t]
        return [
            makeFn(args, (θ, ω, t) => θ - ω * t),
            makeLatex(args, '@=@@', $, ':||')
        ]
    }

    /**
     * ω = 2π/T
     */
    ωT(ω = 'ω', T = 'T', $ = '$$'): eq {
        let args = [ω, T]
        return [
            makeFn(args, (ω, T) => ω - 2 * Math.PI / T),
            makeLatex(args, '@=\\dfrac{2π}{@}', $, '::')
        ]
    }

    /**
     * s = rθ
     */
    srθ(s = 's', r = 'r', θ = 'θ', $ = '**$'): eq {
        let args = [s, r, θ]

        return [
            makeFn(args, (s, r, θ) => s - r * θ),
            makeLatex(args, '@=@@', $, ':||')
        ]
    }

    /**
     * v = rω
     */
    vrω(v = 'v', r = 'r', ω = 'ω', $ = '***'): eq {
        let args = [v, r, ω]
        return [
            makeFn(args, (v, r, ω) => v - r * ω),
            makeLatex(args, '@=@@', $, ':||')
        ]
    }



    /**
     * a = vω
     */
    avω(a = 'a', v = 'v', ω = 'ω', $ = '***'): eq {
        let args = [a, v, ω]
        return [
            makeFn(args, (a, v, ω) => a - v * ω),
            makeLatex(args, '@=@@', $, ':||')
        ]
    }

    /**
     * a = v^2/r
     */
    avr(a = 'a', v = 'v', r = 'r', $ = '***'): eq {
        let args = [a, v, r]
        return [
            makeFn(args, (a, v, r) => a - v * v / r),
            makeLatex(args, '@=\\dfrac{@^2}{@}', $, ':|:')
        ]
    }

    /**
     * a = rω^2
     */
    arω(a = 'a', r = 'r', ω = 'ω', $ = '***'): eq {
        let args = [a, r, ω]
        return [
            makeFn(args, (a, r, ω) => a - r * ω * ω),
            makeLatex(args, '@=@@^2', $, ':||')
        ]
    }

    /**
     * F = mvω
     */
    Fmvω(F = 'F', m = 'm', v = 'v', ω = 'ω', $ = '****'): eq {
        let args = [F, m, v, ω]
        return [
            makeFn(args, (F, m, v, ω) => F - m * v * ω),
            makeLatex(args, '@=@@@', $, ':|||')
        ]
    }

    /**
     * F = mv^2/r
     */
    Fmvr(F = 'F', m = 'm', v = 'v', r = 'r', $ = '****'): eq {
        let args = [F, m, v, r]
        return [
            makeFn(args, (F, m, v, r) => F - m * v * v / r),
            makeLatex(args, '@=\\dfrac{@@^2}{@}', $, ':||:')
        ]
    }

    /**
     * F = mrω^2
     */
    Fmrω(F = 'F', m = 'm', r = 'r', ω = 'ω', $ = '****'): eq {
        let args = [F, m, r, ω]
        return [
            makeFn(args, (F, m, r, ω) => F - m * r * ω * ω),
            makeLatex(args, '@=@@@^2', $, ':|||')
        ]
    }


}

declare global {
    var PhyEq: PhyEqCls
}
globalThis.PhyEq = new PhyEqCls()
