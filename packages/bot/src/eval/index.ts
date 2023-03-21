import { getAllVars, getAllDeclaredVars } from './ts'

const VariableError = Error('A variable is used before a value is defined.')
VariableError.name = 'VariableError'

function isVarError(e: unknown) {
    return (
        e instanceof Error &&
        e.message.startsWith('Cannot convert a Symbol value to')
    )
}

function assembleCtx(code: string, contexts: object[]): string {
    let allVars = getAllVars(code)
    let contextVars = contexts.flatMap($ => Object.keys($))
    let declaredVars = getAllDeclaredVars(code)

    // for backward compatible alphabets
    let missingAlphabetVars: string[] = []
    // @ts-ignore
    if (global.AUTO_ALPHABETS !== false)
        missingAlphabetVars = allVars
            .filter($ => $.length === 1)
            .filter($ => !contextVars.includes($))
            .filter($ => !declaredVars.includes($))

    let newVars = [...declaredVars]
    // for backward compatible alphabets
    newVars = [...newVars, ...missingAlphabetVars]

    // console.log(newVars)

    let T = '"use strict";'
    contexts.forEach((ctx, i) => {
        T += Object.keys(ctx)
            .map(k => `let ${k} = this[${i}].${k};`)
            .join('')
    })

    // for backward compatible alphabets
    for (let k of missingAlphabetVars) {
        T += `let ${k} = Symbol();`
    }

    T += code + '\n;'

    contexts.forEach((ctx, i) => {
        T += Object.keys(ctx)
            .map(k => `this[${i}].${k} = ${k};`)
            .join('')
    })

    T += `this.newVars = {};`
    for (let k of newVars) {
        T += `try { this.newVars.${k} = ${k} } catch (e) { }`
    }
    return T
}

/** Run the code under contexts.
 * The contexts can be mutated in-place.
 * Return all top level variables declared.
 */
export function evalCtx(code: string, ...contexts: object[]): object {
    try {
        const fullCode = assembleCtx(code, contexts)
        const fn = new Function(fullCode)
        fn.call(contexts)
        // @ts-ignore
        return contexts.newVars
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
