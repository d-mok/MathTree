

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


    Motion = {


        /**
         * v = u + at
         */
        vuat(v = 'v', u = 'u', a = 'a', t = 't', $ = '****'): eq {
            let args = [v, u, a, t]
            return [
                makeFn(args, (v, u, a, t) => v - u - a * t),
                makeLatex(args, '@=@+@@', $, '::||')
            ]
        },

        /**
         * v^2 = u^2 + 2as
         */
        vu2as(v = 'v', u = 'u', a = 'a', s = 's', $ = '****'): eq {
            let args = [v, u, a, s]
            return [
                makeFn(args, (v, u, a, s) => v ** 2 - u ** 2 - 2 * a * s),
                makeLatex(args, '@^2=@^2+2@@', $, '||||')
            ]
        },

        /**
         * s = ut + 0.5at^2
         */
        sutat2(s = 's', u = 'u', t = 't', a = 'a', $ = '****') {
            let args = [s, u, t, a]
            let [_s, _u, _t, _a] = $
            return [
                makeFn(args, (s, u, t, a) => s - u * t - 0.5 * a * t * t),
                makeLatex([s, u, t, a, t], '@=@@+\\dfrac{1}{2}@@^2', [_s, _u, _t, _a, _t].join(''), ':||||')
            ]
        },

        /**
         * s = 0.5(u+v)t
         */
        suvt(s = 's', u = 'u', v = 'v', t = 't', $ = '****') {
            let args = [s, u, v, t]
            return [
                makeFn(args, (s, u, v, t) => s - 0.5 * (u + v) * t),
                makeLatex(args, '@=\\dfrac{1}{2}(@+@)@', $, ':::|')
            ]
        },


        /**
         * s  = 0.5at^2
         */
        sat2(s = 's', a = 'a', t = 't', $ = '***') {
            let args = [s, a, t]
            return [
                makeFn(args, (s, a, t) => s - 0.5 * a * t * t),
                makeLatex(args, '@=\\dfrac{1}{2}@@^2', $, ':||')
            ]
        },


        /**
         * v = at
         */
        vat(v = 'v', a = 'a', t = 't', $ = '***'): eq {
            let args = [v, a, t]
            return [
                makeFn(args, (v, a, t) => v - a * t),
                makeLatex(args, '@=@@', $, ':||')
            ]
        },


        /**
         * v^2 = 2as
         */
        v2as(v = 'v', a = 'a', s = 's', $ = '***'): eq {
            let args = [v, a, s]
            return [
                makeFn(args, (v, a, s) => v ** 2 - 2 * a * s),
                makeLatex(args, '@^2=2@@', $, '|||')
            ]
        },
    }



    Force = {


        /**
         * F = ma
         */
        Fma(F = 'F', m = 'm', a = 'a', $ = '***'): eq {
            let args = [F, m, a]
            return [
                makeFn(args, (F, m, a) => F - m * a),
                makeLatex(args, '@=@@', $, ':||')
            ]
        },

    }

    CircularMotion = {

        /**
         * s = vt
         */
        svt(s = 's', v = 'v', t = 't', $ = '***'): eq {
            let args = [s, v, t]
            return [
                makeFn(args, (s, v, t) => s - v * t),
                makeLatex(args, '@=@@', $, ':||')
            ]
        },


        /**
         * θ = ωt
         */
        θωt(θ = 'θ', ω = 'ω', t = 't', $ = '$$$'): eq {
            let args = [θ, ω, t]
            return [
                makeFn(args, (θ, ω, t) => θ - ω * t),
                makeLatex(args, '@=@@', $, ':||')
            ]
        },

        /**
         * ω = 2π/T
         */
        ωT(ω = 'ω', T = 'T', $ = '$$'): eq {
            let args = [ω, T]
            return [
                makeFn(args, (ω, T) => ω - 2 * Math.PI / T),
                makeLatex(args, '@=\\dfrac{2π}{@}', $, '::')
            ]
        },

        /**
         * s = rθ
         */
        srθ(s = 's', r = 'r', θ = 'θ', $ = '**$'): eq {
            let args = [s, r, θ]

            return [
                makeFn(args, (s, r, θ) => s - r * θ),
                makeLatex(args, '@=@@', $, ':||')
            ]
        },

        /**
         * v = rω
         */
        vrω(v = 'v', r = 'r', ω = 'ω', $ = '***'): eq {
            let args = [v, r, ω]
            return [
                makeFn(args, (v, r, ω) => v - r * ω),
                makeLatex(args, '@=@@', $, ':||')
            ]
        },



        /**
         * a = vω
         */
        avω(a = 'a', v = 'v', ω = 'ω', $ = '***'): eq {
            let args = [a, v, ω]
            return [
                makeFn(args, (a, v, ω) => a - v * ω),
                makeLatex(args, '@=@@', $, ':||')
            ]
        },

        /**
         * a = v^2/r
         */
        avr(a = 'a', v = 'v', r = 'r', $ = '***'): eq {
            let args = [a, v, r]
            return [
                makeFn(args, (a, v, r) => a - v * v / r),
                makeLatex(args, '@=\\dfrac{@^2}{@}', $, ':|:')
            ]
        },

        /**
         * a = rω^2
         */
        arω(a = 'a', r = 'r', ω = 'ω', $ = '***'): eq {
            let args = [a, r, ω]
            return [
                makeFn(args, (a, r, ω) => a - r * ω * ω),
                makeLatex(args, '@=@@^2', $, ':||')
            ]
        },

        /**
         * F = mvω
         */
        Fmvω(F = 'F', m = 'm', v = 'v', ω = 'ω', $ = '****'): eq {
            let args = [F, m, v, ω]
            return [
                makeFn(args, (F, m, v, ω) => F - m * v * ω),
                makeLatex(args, '@=@@@', $, ':|||')
            ]
        },

        /**
         * F = mv^2/r
         */
        Fmvr(F = 'F', m = 'm', v = 'v', r = 'r', $ = '****'): eq {
            let args = [F, m, v, r]
            return [
                makeFn(args, (F, m, v, r) => F - m * v * v / r),
                makeLatex(args, '@=\\dfrac{@@^2}{@}', $, ':||:')
            ]
        },

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


    Gravitation = {

        /**
         * F = GMm/r^2
         */
        FGMmr2(F = 'F', M = 'M', m = 'm', r = 'r', $ = '****'): eq {
            let args = [F, M, m, r]
            return [
                makeFn(args, (F, M, m, r) => F - PhyConst.G * M * m / (r ** 2)),
                makeLatex(args, '@=\\dfrac{G@@}{@^2}', $, ':|||')
            ]
        },

        /**
         * F = GMm/(R+h)^2
         */
        FGMmRh2(F = 'F', M = 'M', m = 'm', R = 'R', h = 'h', $ = '*****'): eq {
            let args = [F, M, m, R, h]
            return [
                makeFn(args, (F, M, m, R, h) => F - PhyConst.G * M * m / ((R + h) ** 2)),
                makeLatex(args, '@=\\dfrac{G@@}{(@+@)^2}', $, ':||::')
            ]
        },

        /**
         * g = GM/r^2
         */
        gGMr2(g = 'g', M = 'M', r = 'r', $ = '***'): eq {
            let args = [g, M, r]
            return [
                makeFn(args, (g, M, r) => g - PhyConst.G * M / (r ** 2)),
                makeLatex(args, '@=\\dfrac{G@}{@^2}', $, ':||')
            ]
        },

        /**
         * g = GM/(R+h)^2
         */
        gGMRh2(g = 'g', M = 'M', R = 'R', h = 'h', $ = '****'): eq {
            let args = [g, M, R, h]
            return [
                makeFn(args, (g, M, R, h) => g - PhyConst.G * M / ((R + h) ** 2)),
                makeLatex(args, '@=\\dfrac{G@}{(@+@)^2}', $, ':|::')
            ]
        },


        /**
         * F = mg
         */
        Fmg(F = 'F', m = 'm', g = 'g', $ = '***'): eq {
            let args = [F, m, g]
            return [
                makeFn(args, (F, m, g) => F - m * g),
                makeLatex(args, '@=@@', $, ':||')
            ]
        },



        /**
         * GMm/r2 = mv2/r
         */
        GMmr2v2r(M = 'M', r = 'r', v = 'v', $ = '***'): eq {
            let args = [M, r, v]
            let [_M, _r, _v] = $
            $ = [_M, _r, _v, _r].join('')
            return [
                makeFn(args, (M, r, v) => PhyConst.G * M / r / r - v * v / r),
                makeLatex([M, r, v, r], '\\dfrac{G@m}{@^2}=\\dfrac{m@^2}{@}', $, '|||:')
            ]
        },


        /**
         * GMm/r2 = mrω2
         */
        GMmr2rω2(M = 'M', r = 'r', ω = 'ω', $ = '***'): eq {
            let args = [M, r, ω]
            let [_M, _r, _ω] = $
            $ = [_M, _r, _r, _ω].join('')
            return [
                makeFn(args, (M, r, ω) => PhyConst.G * M / r / r - r * ω * ω),
                makeLatex([M, r, r, ω], '\\dfrac{G@m}{@^2}=m@@^2', $, '||||')
            ]
        },



    }




    Radioactive = {

        /**
         * N = n(1/2)^(t/T)
         */
        NntT(N = 'N', n = 'n', t = 't', T = 'T', $ = '****'): eq {
            let args = [N, n, t, T]
            return [
                makeFn(args, (N, n, T, t) => N - (n * 0.5 ** (t / T))),
                makeLatex(args, '@=@\\left(\\dfrac{1}{2}\\right)^\\dfrac{@}{@}', $, '::::')
            ]
        },

        /**
         * A = a(1/2)^(t/T)
         */
        AatT(A = 'A', a = 'a', t = 't', T = 'T', $ = '****'): eq {
            let args = [A, a, t, T]
            return [
                makeFn(args, (A, a, T, t) => A - (a * 0.5 ** (t / T))),
                makeLatex(args, '@=@\\left(\\dfrac{1}{2}\\right)^\\dfrac{@}{@}', $, '::::')
            ]
        },


        /**
         * A = kN
         */
        AkN(A = 'A', k = 'k', N = 'N', $ = '***'): eq {
            let args = [A, k, N]
            return [
                makeFn(args, (A, k, N) => A - k * N),
                makeLatex(args, '@=@@', $, ':||')
            ]
        },


        /**
         * kT = ln2
         */
        kTln2(k = 'k', T = 'T', $ = '**'): eq {
            let args = [k, T]
            return [
                makeFn(args, (k, T) => k * T - Math.log(2)),
                makeLatex(args, '@@=\\ln2', $, ':||')
            ]
        },



    }


}

declare global {
    var PhyEq: PhyEqCls
}
globalThis.PhyEq = new PhyEqCls()
