import { err, str, brand, transferBrand, makeStaticDecorator } from '../util'
import { matchRule, rule } from '../assertion'


function getToTail(arr: any[], index: number) {
    const n = arr.length - 1
    const i = Math.min(index, n)
    return arr[i]
}


function e(f: fnBranded, argIndex: number, argValue: unknown, msg: string): Error {
    return err(f,
        'arg[' + argIndex + '] = ' + str(argValue),
        'violate: ' + msg
    )
}


function match(f: fnBranded, argIndex: number, argValue: unknown, rule: rule): void {
    const pass = matchRule(argValue, rule)
    if (pass !== true)
        throw e(f, argIndex, argValue, pass)
}


export function check<F extends fn>(f: F, rules: rule[]): F {
    brand(f)
    const nf = (...args: any[]) => {
        args.forEach((v, i) =>
            match(f, i, v, getToTail(rules, i))
        )
        return f(...args)
    }
    transferBrand(f, nf)
    return nf as F
}


export function checkIt(...rules: rule[]): StaticDecorator {
    return makeStaticDecorator($ => check($, rules))
}
