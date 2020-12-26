
var SHOULD_LOG = false
globalThis.SHOULD_LOG = SHOULD_LOG



class CustumMathError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'MathError';
    }
}

function MathError(message: string) {
    return new CustumMathError(message)
}
globalThis.MathError = MathError


function Should(condition: boolean, msg: string = "Should condition failed!") {
    if (!condition) throw MathError(msg)
}
globalThis.Should = Should


