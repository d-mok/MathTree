const VariableError = Error('A variable is used before a value is defined.')
VariableError.name = 'VariableError'

function isVarError(e: unknown) {
    return e instanceof Error && e.message.startsWith('Cannot convert a Symbol value to')
}

function assembleCtx(code: string, contexts: object[]): string {
    let T = '"use strict";'
    contexts.forEach((ctx, i) => {
        T += Object.keys(ctx).map(_ => `let ${_} = this[${i}].${_};`).join('')
    })
    T += code + '\n;'
    contexts.forEach((ctx, i) => {
        T += Object.keys(ctx).map(_ => `this[${i}].${_} = ${_};`).join('')
    })
    return T
}

/** Run the code under contexts. The contexts can be mutated in-place. */
export function evalCtx(code: string, ...contexts: object[]): void {

    try {
        const fullCode = assembleCtx(code, contexts)
        const fn = new Function(fullCode)
        fn.call(contexts)
    } catch (e) {
        throw isVarError(e) ? VariableError : e
    }

}

/** Evaluate one expression under contexts. The contexts can be mutated in-place. */
export function exprCtx(code: string, ...contexts: object[]): any {
    let result = { ____xxxRESULTxxx____: undefined }
    evalCtx('____xxxRESULTxxx____ = ' + code, result, ...contexts)
    return result.____xxxRESULTxxx____
}


/** Evaluate one expression under contexts. The code is HTML decoded first. */
export function exprCtxHTML(code: string, ...contexts: object[]): any {
    code = code
        .replaceAll('&amp;', '&')
        .replaceAll('&lt;', '<')
        .replaceAll('&gt;', '>')
        .replaceAll('&#39;', "'")
        .replaceAll('&quot;', '"')
    return exprCtx(code, ...contexts)
}