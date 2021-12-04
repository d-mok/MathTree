import { err, join, str, brand, transferBrand, makeStaticDecorator, getClassStaticNames } from '../util'

function catchString(f: fnBranded, vals: any[], e: string): Error {
    return err(f,
        'args = (' + join(vals) + ')',
        'throw: ' + e,
    )
}

function catchErrObj(f: fnBranded, vals: any[], e: Error): Error {
    return err(f,
        'args = (' + join(vals) + ')',
        'throw: ' + e.name,
        'message: ' + e.message
    )
}

function catchAny(f: fnBranded, vals: any[], e: any): Error {
    return err(f,
        'args = (' + join(vals) + ')',
        'throw: ' + str(e)
    )
}


function isError(e: any): e is Error {
    return typeof e === 'object' && e !== null && 'name' in e && 'message' in e
}

function isContractError(e: any): e is Error {
    return isError(e) && e.name === 'ContractError'
}

function catchErr(f: fnBranded, vals: any[], e: unknown): Error {
    if (isContractError(e))
        return e
    if (typeof e === 'string')
        return catchString(f, vals, e)
    if (isError(e))
        return catchErrObj(f, vals, e)
    return catchAny(f, vals, e)
}

export function capture<F extends fn>(f: F): F {
    brand(f)
    const nf = (...args: any[]) => {
        try {
            return f(...args)
        } catch (e) {
            throw catchErr(f, args, e)
        }
    }
    transferBrand(f, nf)
    return nf as F
}




export function captureIt(): StaticDecorator {
    return makeStaticDecorator($ => capture($))
}

export function captureAll() {
    return function (constructor: Function) {
        for (let key of getClassStaticNames(constructor)) {
            let descriptor = Object.getOwnPropertyDescriptor(constructor, key)
            if (descriptor !== undefined) {
                descriptor.value = capture(descriptor.value)
                Object.defineProperty(constructor, key, descriptor)
            }
        }
    }
}