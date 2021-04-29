

export function Clone<T>(object: T): T {
    return JSON.parse(JSON.stringify(object))
}





export class List<T> extends Array<T>{
    private key: (item: T) => any = x => x

    constructor(arr: T[]) {
        super()
        this.push(...arr)
    }

    isDistinct(): boolean {
        return this.length === this.distinctLength()
    }

    distinctLength(): number {
        return this.distinct().length
    }

    distinct(): T[] {
        let newArr: T[] = []
        const exist = (item: T) => newArr.some(x => this.key(x) === this.key(item))
        for (let item of this) {
            if (!exist(item)) newArr.push(item)
        }
        return newArr
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

    pluck(index: keyof T): any[] {
        return this.map(x => x[index])
    }

}



