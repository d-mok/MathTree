export function evalCtx(code, errorProxy, ...contexts) {
    function evaluateEval() {
        let execCode = '';
        contexts.forEach((ctx, i) => {
            execCode += Object.keys(ctx).map(_ => `let ${_} = this[${i}].${_};`).join('');
        });
        execCode += code + ';';
        contexts.forEach((ctx, i) => {
            execCode += Object.keys(ctx).map(_ => `this[${i}].${_} = ${_};`).join('');
        });
        return eval(execCode);
    }
    try {
        evaluateEval.call(contexts);
    }
    catch (e) {
        throw errorProxy(e);
    }
}
// let newContext = evalCtx('console.log(b);c=44', {b:1,c:3})
//# sourceMappingURL=index.js.map