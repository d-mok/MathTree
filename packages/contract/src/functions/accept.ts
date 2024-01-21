import { err, join, brand, transferBrand, makeStaticDecorator } from '../util.js'
import { matchRule, rule } from '../assertion/index.js'


function e(f: fnBranded, argValues: any[], returnValue: unknown, msg: string): Error {
    return err(f,
        'args = (' + join(argValues) + ')',
        'return = ' + returnValue,
        'violate: ' + msg
    )
}


function match(f: fnBranded, argValues: any[], returnValue: unknown, rule: rule): void {
    const pass = matchRule(returnValue, rule)
    if (pass !== true)
        throw e(f, argValues, returnValue, pass)
}

export function accept<F extends fn>(f: F, rule: rule): F {
    brand(f)
    const nf = (...args: any[]) => {
        const result = f(...args)
        match(f, args, result, rule)
        return result
    }
    transferBrand(f, nf)
    return nf as F
}



export function acceptIt(rule: rule): StaticDecorator {
    return makeStaticDecorator($ => accept($, rule))
}