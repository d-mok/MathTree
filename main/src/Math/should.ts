class CustomErrorCls extends Error {
    constructor(name: string, message: string) {
        super(message)
        this.name = name
    }
}

export function CustomError(name: string, message: string) {
    return new CustomErrorCls(name, message)
}

export function toError(e: unknown): Error {
    if (e instanceof Error) {
        return e
    } else if (typeof e === 'string') {
        return CustomError('UnknownError', e)
    } else {
        return CustomError('UnknownError', JSON.stringify(e))
    }
}

export function MathError(message: string) {
    return new CustomErrorCls('MathError', message)
}
