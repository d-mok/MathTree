import _ from 'lodash';

export function Clone<T>(object: T): T {
    return _.cloneDeep(object)
}



class ListCls<T> extends Array<T>{
    private key: (_: T) => any

    constructor(
        arr: T[],
        keyFunc: (_: T) => any = x => JSON.stringify(x)
    ) {
        super()
        this.push(...arr)
        this.key = keyFunc
    }

    isDistinct(): boolean {
        return this.length === this.distinctLength()
    }

    distinctLength(): number {
        return this.distinct().length
    }

    distinct(): T[] {
        return _.uniqBy(this, this.key);
    }

    pairs(): [T, T][] {
        let len = this.length
        let arr: [T, T][] = []
        for (let i = 0; i < len; i++) {
            for (let j = i + 1; j < len; j++) {
                arr.push([this[i], this[j]])
            }
        }
        return arr
    }

    pairsEvery(relation: (a: T, b: T) => boolean): boolean {
        return this.pairs().every(p => relation(p[0], p[1]))
    }



    pluck(index: keyof T): any[] {
        return this.map(x => x[index])
    }

}

// strange name to avoid conflist with frontend
function newList<T>(
    arr: T[],
    keyFunc: (_: T) => any = x => JSON.stringify(x)
): ListCls<T> {
    return new ListCls(arr, keyFunc)
}



type alias<T> = ListCls<T>

declare global {
    type List<T> = alias<T>
    var newList: <T>(arr: T[], keyFunc?: (_: T) => any) => ListCls<T>
}
globalThis.newList = newList

export { }