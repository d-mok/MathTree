const VariableError = Error('A variable is used before a value is defined.')
VariableError.name = 'VariableError'

function isVarError(e: unknown) {
    return e instanceof Error && e.message.startsWith('Cannot convert a Symbol value to')
}

function assembleCtx(code: string, contexts: object[]): string {
    let T = ''
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
export function evalCtx(_myCODE_: string, ..._myCONTEXTS_: object[]): void {

    function evaluateEval() {
        return eval(assembleCtx(_myCODE_, _myCONTEXTS_))
    }

    try {
        evaluateEval.call(_myCONTEXTS_)
    } catch (e) {
        throw isVarError(e) ? VariableError : e
    }

}

/** Evaluate one expression under contexts. The contexts can be mutated in-place. */
export function exprCtx(_myCODE_: string, ..._myCONTEXTS_: object[]): any {
    let _xxxresultxxx_ = { ____xxxRESULTxxx____: undefined }
    evalCtx('____xxxRESULTxxx____ = ' + _myCODE_, _xxxresultxxx_, ..._myCONTEXTS_)
    return _xxxresultxxx_.____xxxRESULTxxx____
}


/** Evaluate one expression under contexts. The code is HTML decoded first. */
export function exprCtxHTML(_myCODE_: string, ..._myCONTEXTS_: object[]): any {
    _myCODE_ = _myCODE_
        .replaceAll('&amp;', '&')
        .replaceAll('&lt;', '<')
        .replaceAll('&gt;', '>')
        .replaceAll('&#39;', "'")
        .replaceAll('&quot;', '"')
    return exprCtx(_myCODE_, ..._myCONTEXTS_)
}
