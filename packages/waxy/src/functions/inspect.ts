import { err, join, brand, transferBrand, makeStaticDecorator } from '../util'
import { matchTreaty, treaty } from '../assertion'


function e(f: fnBranded, vals: any[], msg: string): Error {
    return err(f,
        'args = (' + join(vals) + ')',
        'violate: ' + msg
    )
}

function match(f: fnBranded, vals: any[], treaty: treaty): void {
    const pass = matchTreaty(vals, treaty)
    if (pass !== true)
        throw e(f, vals, pass)
}

export function inspect<F extends fn>(f: F, treaty: treaty<F>): F {
    brand(f)
    const nf = (...args: any[]) => {
        match(f, args, treaty)
        return f(...args)
    }
    transferBrand(f, nf)
    return nf as F
}


export function inspectIt(treaty: treaty): StaticDecorator {
    return makeStaticDecorator($ => inspect($, treaty))
}
