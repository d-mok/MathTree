import _ from 'lodash'
import * as math from 'mathjs'

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

/**
 * =============================
 * MATH
 * =============================
 */

function blur(num: number): number {
    return cal.blur(num)
}

function hcf(nums: number[]): number {
    if (nums.length === 0) return NaN
    if (nums.length === 1) return nums[0]
    //@ts-ignore
    return math.gcd(...nums)
}

function lcm(nums: number[]): number {
    if (nums.length === 0) return NaN
    if (nums.length === 1) return nums[0]
    //@ts-ignore
    return math.lcm(...nums)
}

function toFraction(num: number): [numerator: number, deno: number] {
    return cal.toFraction(num)
}

function median(nums: number[]): number {
    return math.median(...nums)
}

function mode(nums: number[]): number[] {
    return math.mode(...nums)
}

function std(nums: number[]): number {
    return math.std(nums, 'uncorrected')
}

/**
 * Return an array of integral ratio. All inputs will be forced into fraction first.
 * ```
 * [2,4,6].ratio() // [1,2,3]
 * [0,4,6].ratio() // [0,2,3]
 * [1.5,2.5,3.5].ratio() // [3,5,7]
 * ```
 */
function toIntRatio(nums: number[]): number[] {
    if (_.without(nums, 0).length === 0) return [...nums]
    let fracs = nums.map(_.toFraction)
    let denos = fracs.map($ => $[1])
    let multiple = _.lcm(denos)
    let ints = nums.map($ => $ * multiple).map(_.blur)
    let HCF = _.hcf(ints)
    return ints.map($ => $ / HCF).map(_.blur)
}

declare module 'lodash' {
    interface LoDashStatic {
        blur: typeof blur
        hcf: typeof hcf
        lcm: typeof lcm
        toFraction: typeof toFraction
        toIntRatio: typeof toIntRatio
        median: typeof median
        mode: typeof mode
        std: typeof std
    }
}

_.mixin({ blur, hcf, lcm, toFraction, toIntRatio, median, mode, std })