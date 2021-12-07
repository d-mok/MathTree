

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

        sutat2(s = 's', u = 'u', t = 't', a = 'a', $ = '****') {
            let args = [s, u, t, a]
            let [_s, _u, _t, _a] = $
            return [
                makeFn(args, (s, u, t, a) => s - u * t - 0.5 * a * t * t),
                makeLatex([s, u, t, a, t], '@=@@+\\dfrac{1}{2}@@^2', [_s, _u, _t, _a, _t].join(), ':||||')
            ]
        },

        suvt(s = 's', u = 'u', v = 'v', t = 't', $ = '****') {
            let args = [s, u, v, t]
            return [
                makeFn(args, (s, u, v, t) => s - 0.5 * (u + v) * t),
                makeLatex(args, '@=\\dfrac{1}{2}(@+@)@', $, ':::|')
            ]
        }


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

    }


}

declare global {
    var PhyEq: PhyEqCls
}
globalThis.PhyEq = new PhyEqCls()
