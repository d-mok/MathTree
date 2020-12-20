


class CustumMathError extends Error {
    public name: string = "MathError"
    public message: string = ""
    public stack: string = ""
    constructor(message: string) {
        super(message);
        this.name = 'MathError';
    }
}

function MathError(message: string) {
    return new CustumMathError(message)
}
globalThis.MathError = MathError

class CustumDesignError extends Error {
    public name: string = "DesignError"
    public message: string = ""
    public stack: string = ""
    constructor(message: string) {
        super(message);
        this.name = 'DesignError';
    }
}

function DesignError(message: string) {
    return new CustumDesignError(message)
}
globalThis.DesignError = DesignError



function Must(condition: boolean, msg: string = "Must condition failed!") {
    if (!condition) throw DesignError(msg)
}
globalThis.Must = Must

function Should(condition: boolean, msg: string = "Should condition failed!") {
    if (!condition) throw MathError(msg)
}
globalThis.Should = Should


