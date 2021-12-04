export function positive($: any): boolean {
    return $ > 0
}

export function negative($: any): boolean {
    return $ < 0
}

export function isDistinct($: any): boolean {
    let [a, b, c] = $
    return a !== b && b !== c && a !== c
}

export function makeAdd() {
    return function add(a: number, b: number, c: number = 0) {
        if (a > 100) throw Error('a is too large!')
        if (a > 90) throw 'a is too large!'
        return a + b + c
    }
}
