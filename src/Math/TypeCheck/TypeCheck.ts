
var SHOULD_LOG = false
globalThis.SHOULD_LOG = SHOULD_LOG


class CustomError extends Error {
    constructor(name: string, message: string) {
        super(message);
        this.name = name
    }
}


class CustomMathError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'MathError';
    }
}

function MathError(message: string) {
    return new CustomMathError(message)
}
globalThis.MathError = MathError


function Should(condition: boolean, msg: string = "Should condition failed!") {
    if (!condition) {
        let caller = (new Error()).stack!.split("\n")[2].trim().split(" ")[1]
        // let caller = 'function'
        caller = caller ?? 'Anonymous '
        throw MathError('[Function ' + caller + '] ' + msg)
    }
}
globalThis.Should = Should


