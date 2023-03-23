import _ from 'lodash'
import * as math from 'mathjs'
import * as cal from '../cal'


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
    }
}

_.mixin({ blur, hcf, lcm, toFraction, toIntRatio })
