import _ from 'lodash'

function combinations<T>(collection: T[], n: 2): [T, T][]
function combinations<T>(collection: T[], n: 3): [T, T, T][]
function combinations<T>(collection: T[], n: number): T[][] {
    let array = _.values(collection)
    if (array.length < n) return []

    function recur(array: T[], n: number): T[][] {
        if (--n < 0) return [[] as T[]]
        let combinations: T[][] = []
        array = array.slice()
        while (array.length - n) {
            let value = array.shift()!
            recur(array, n).forEach(combination => {
                combination.unshift(value)
                combinations.push(combination)
            })
        }
        return combinations
    }
    return recur(array, n)
}

function uniqDeep<T>(array: T[]): T[] {
    return _.uniqWith(array, _.isEqual)
}

function isUniq(array: any[]): boolean {
    return _.uniq(array).length === array.length
}

function isUniqDeep(array: any[]): boolean {
    return _.uniqWith(array, _.isEqual).length === array.length
}

function count<T>(array: T[], item: T): number {
    return array.filter($ => $ === item).length
}

function cyclicAt<T>(array: T[], index: number): T | undefined {
    let n = array.length
    if (n === 0) return undefined
    while (index < 0) {
        index += n
    }
    while (index > n - 1) {
        index -= n
    }
    return array[index]
}

_.mixin({ combinations, uniqDeep, isUniq, isUniqDeep, count, cyclicAt })

declare module 'lodash' {
    interface LoDashStatic {
        combinations: typeof combinations
        uniqDeep: typeof uniqDeep
        isUniq: typeof isUniq
        isUniqDeep: typeof isUniqDeep
        count: typeof count
        cyclicAt: typeof cyclicAt
    }
}
