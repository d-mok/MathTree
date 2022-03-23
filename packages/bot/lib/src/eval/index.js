const VariableError = Error('A variable is used before a value is defined.');
VariableError.name = 'VariableError';
function isVarError(e) {
    return e instanceof Error && e.message.startsWith('Cannot convert a Symbol value to');
}
function assembleCtx(code, ...contexts) {
    let T = '';
    contexts.forEach((ctx, i) => {
        T += Object.keys(ctx).map(_ => `let ${_} = this[${i}].${_};`).join('');
    });
    T += code + ';';
    contexts.forEach((ctx, i) => {
        T += Object.keys(ctx).map(_ => `this[${i}].${_} = ${_};`).join('');
    });
    return T;
}
/** Run the code under contexts. The contexts can be mutated in-place. */
export function evalCtx(_myCODE_, ..._myCONTEXTS_) {
    function evaluateEval() {
        return eval(assembleCtx(_myCODE_));
    }
    try {
        evaluateEval.call(_myCONTEXTS_);
    }
    catch (e) {
        throw isVarError(e) ? VariableError : e;
    }
}
/** Evaluate one expression under contexts. The contexts can be mutated in-place. */
export function exprCtx(_myCODE_, ..._myCONTEXTS_) {
    let _xxxresultxxx_ = { ____xxxRESULTxxx____: undefined };
    evalCtx('____xxxRESULTxxx____ = ' + _myCODE_, _xxxresultxxx_, ..._myCONTEXTS_);
    return _xxxresultxxx_.____xxxRESULTxxx____;
}
function htmlDecode(str) {
    return str
        .replaceAll('&amp;', '&')
        .replaceAll('&lt;', '<')
        .replaceAll('&gt;', '>')
        .replaceAll('&#39;', "'")
        .replaceAll('&quot;', '"');
}
/** Evaluate one expression under contexts. The code is HTML decoded first. */
export function exprCtxHTML(_myCODE_, ..._myCONTEXTS_) {
    _myCODE_ = htmlDecode(_myCODE_);
    return exprCtx(_myCODE_, ..._myCONTEXTS_);
}
//# sourceMappingURL=index.js.map