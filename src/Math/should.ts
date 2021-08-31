
var SHOULD_LOG = false
globalThis.SHOULD_LOG = SHOULD_LOG


class CustomErrorCls extends Error {
    constructor(name: string, message: string) {
        super(message);
        this.name = name
    }
}

function CustomError(name: string, message: string) {
    return new CustomErrorCls(name, message)
}
globalThis.CustomError = CustomError

function toError(e: unknown): Error {
    if (e instanceof Error) {
        return e
    } else if (typeof e === 'string') {
        return CustomError('UnknownError', e)
    } else {
        return CustomError('UnknownError', JSON.stringify(e))
    }
}
globalThis.toError = toError

function MathError(message: string) {
    return new CustomErrorCls('MathError', message)
}
globalThis.MathError = MathError



function Should(condition: boolean, msg: string = "Should condition failed!"): asserts condition {
    if (!condition) {
        let caller = (new Error()).stack!.split("\n")[2].trim().split(" ")[1]
        // let caller = 'function'
        caller = caller ?? 'Anonymous '
        throw MathError(caller + ': ' + msg)
    }
}
globalThis.Should = Should


