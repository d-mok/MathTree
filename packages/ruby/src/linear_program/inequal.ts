
export type Ineq = '\\ge' | '\\gt' | '\\le' | '\\lt' | '>=' | '<=' | '>' | '<'
type IneqCode = [greater: boolean, equal: boolean]


function toCode(ineq: Ineq): IneqCode {
    if (ineq === '\\ge') return [true, true]
    if (ineq === '\\gt') return [true, false]
    if (ineq === '\\le') return [false, true]
    if (ineq === '\\lt') return [false, false]
    if (ineq === '>=') return [true, true]
    if (ineq === '>') return [true, false]
    if (ineq === '<=') return [false, true]
    if (ineq === '<') return [false, false]
    throw 'cannot recognise ineq symbol!'
}


function toIneq(code: IneqCode): Ineq {
    let [g, e] = code
    if (g && e) return '\\ge'
    if (g && !e) return '\\gt'
    if (!g && e) return '\\le'
    if (!g && !e) return '\\lt'
    throw 'cannot recognise code!'
}


class InequalSign {

    private code: IneqCode = [true, true]

    constructor(sign: Ineq) {
        this.code = toCode(sign)
    }

    /**
     * Check if me is > or >=.
     */
    greaterThan(): boolean {
        return this.code[0]
    }

    /**
     * Check if me is < or <=.
     */
    lessThan(): boolean {
        return !this.code[0]
    }

    /**
     * Check if me allow equal.
     */
    canEqual(): boolean {
        return this.code[1]
    }

    /**
     * Return me, as `Ineq`.
     */
    print(): Ineq {
        return toIneq(this.code)
    }

    /**
     * Return the strict version of me, as `Ineq`.
     */
    strict(): Ineq {
        let [g, e] = this.code
        return toIneq([g, false])
    }

    /**
     * Return the loose version of me, as `Ineq`.
     */
    loose(): Ineq {
        let [g, e] = this.code
        return toIneq([g, true])
    }

    /**
     * Return the flip version of me, as `Ineq`.
     */
    flip(): Ineq {
        let [g, e] = this.code
        return toIneq([!g, e])
    }

    /**
     * Check if `a` and `b` satisfy my comparison.
     */
    compare(a: number, b: number): boolean {
        let [g, e] = this.code
        if (g && e) return a >= b
        if (g && !e) return a > b
        if (!g && e) return a <= b
        if (!g && !e) return a < b
        throw 'never, cannot recognise code!'
    }

}

/**
 * Return an `InequalSign` instance.
 */
export function ineq(sign: Ineq): InequalSign {
    return new InequalSign(sign)
}
